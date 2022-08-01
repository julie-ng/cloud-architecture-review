# =======
#  Setup
# =======

terraform {
  required_providers {
    azurerm = {
      version = ">= 2.76.0"
      source  = "hashicorp/azurerm"
    }
    azuread = {
      source  = "hashicorp/azuread"
      version = ">= 2.2.0"
    }
  }
}

provider "azurerm" {
  features {}
}


# ===========
#  Variables
# ===========

locals {
  location  = "North Europe"
  rg_name   = "aks-architect-rg"
  acr_name  = "aksarchitect"
  namespace = "aks-architect"

  environments = {
    dev = {
      sp_name = "aks-architect-ci-dev-sp"
      suffix  = "v2fy"
    }
    staging = {
      sp_name = "aks-architect-ci-staging-sp"
      suffix  = "fi9"
    }
  }

  default_tags = {
    public = true
    demo   = true
    iac    = "terraform"
  }
}


# ====================
#  Conainer Resources
# ====================

resource "azurerm_resource_group" "rg" {
  name     = local.rg_name
  location = local.location
  tags     = local.default_tags
}

resource "azurerm_container_registry" "acr" {
  name                = local.acr_name
  resource_group_name = azurerm_resource_group.rg.name
  location            = azurerm_resource_group.rg.location
  sku                 = "Basic"
  admin_enabled       = false
  tags                = local.default_tags
}

data "azurerm_kubernetes_cluster" "cloudkube" {
  for_each            = local.environments
  name                = "cloudkube-${each.key}-${each.value.suffix}-cluster" # e.g. cloudkube-dev-r9er-cluster
  resource_group_name = "cloudkube-${each.key}-${each.value.suffix}-rg"      # e.g. cloudkube-dev-r9er-rg
}


# ==========================
#  Service Principal for CI
# ==========================

data "azuread_client_config" "current" {}

resource "azuread_application" "ci" { # import id = App Registrations's Object ID
  for_each     = local.environments
  display_name = local.environments[each.key].sp_name
  owners       = [data.azuread_client_config.current.object_id]
}

resource "azuread_service_principal" "ci" { # import id = Entperise Application's Object ID
  for_each                     = local.environments
  application_id               = azuread_application.ci[each.key].application_id
  app_role_assignment_required = false
  owners                       = [data.azuread_client_config.current.object_id]
}


# ==================
#  Role Assignments
# ==================

# Get reference to cluster kubelets (managed in aks iac repo)
data "azurerm_user_assigned_identity" "kubelets" {
  for_each            = local.environments
  name                = "cloudkube-${each.key}-kubelet-mi"
  resource_group_name = "cloudkube-${each.key}-${each.value.suffix}-rg"
}

# Cluster kubelets can pull from our registry
resource "azurerm_role_assignment" "kubelets_acr_pull" {
  for_each             = local.environments
  scope                = azurerm_container_registry.acr.id
  role_definition_name = "AcrPull"
  principal_id         = data.azurerm_user_assigned_identity.kubelets[each.key].principal_id
}

# Kubelogin - Reader Role needed to list configs for az aks get-credentials
# https://docs.microsoft.com/en-us/azure/aks/control-kubeconfig-access
resource "azurerm_role_assignment" "kubelogin" {
  for_each             = local.environments
  scope                = data.azurerm_kubernetes_cluster.cloudkube[each.key].id
  role_definition_name = "Azure Kubernetes Service Cluster User Role"
  principal_id         = azuread_service_principal.ci[each.key].object_id
}

resource "azurerm_role_assignment" "namespace_contributor" {
  for_each             = local.environments
  scope                = "${data.azurerm_kubernetes_cluster.cloudkube[each.key].id}/namespaces/${local.namespace}"
  role_definition_name = "Azure Kubernetes Service RBAC Writer"
  principal_id         = azuread_service_principal.ci[each.key].object_id
}


# =========
#  Outputs
# =========

output "resource_group" {
  value = {
    name     = azurerm_resource_group.rg.name
    location = azurerm_resource_group.rg.location
  }
}

output "azure_container_registry" {
  value = {
    name          = azurerm_container_registry.acr.name
    admin_enabled = azurerm_container_registry.acr.admin_enabled
    sku           = azurerm_container_registry.acr.sku
    login_server  = azurerm_container_registry.acr.login_server
  }
}

output "service_principal_rbac" {
  value = [for k, v in local.environments : {
    display_name = azuread_service_principal.ci[k].display_name
    client_id    = azuread_service_principal.ci[k].application_id
    object_id    = azuread_service_principal.ci[k].object_id
    roles = [{
      name  = "Azure Kubernetes Service Cluster User Role"
      scope = data.azurerm_kubernetes_cluster.cloudkube[k].id
      }, {
      name  = "Azure Kubernetes Service RBAC Writer"
      scope = "${data.azurerm_kubernetes_cluster.cloudkube[k].id}/namespaces/${local.namespace}"
      }, {
      name  = "AcrPush"
      scope = azurerm_container_registry.acr.id
    }]
  }]
}

output "kubelet_rbac" {
  value = [for r in azurerm_role_assignment.kubelets_acr_pull : {
    id                   = r.id
    role_definition_name = r.role_definition_name
    scope                = r.scope
    principal_id         = r.principal_id
  }]
}
