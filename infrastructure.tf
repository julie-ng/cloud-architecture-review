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

# provider "azuread" {
#   tenant_id = "00000000-0000-0000-0000-000000000000"
# }

data "azurerm_client_config" "current" {}

# ===========
#  Variables
# ===========

locals {
  location = "North Europe"
  rg_name  = "aks-architect-rg"
  acr_name = "aksarchitect"
  sp_name  = "aks-architect-ci-acr-sp"

  environments = {
    dev = {
      sp_name         = "aks-architect-ci-dev-sp"
      kubelet_mi_name = "cloudkube-dev-r9er-cluster-agentpool"
      kubelet_rg      = "cloudkube-dev-r9er-managed-rg"
    }
    staging = {
      sp_name         = "aks-architect-ci-staging-sp"
      kubelet_mi_name = "cloudkube-staging-d7c-cluster-agentpool"
      kubelet_rg      = "cloudkube-staging-d7c-managed-rg"
    }
  }

  # kubelets = {
  #   dev = {
  #     name           = "cloudkube-dev-r9er-cluster-agentpool"
  #     resource_group = "cloudkube-dev-r9er-managed-rg"
  #   }
  #   staging = {
  #     name           = "cloudkube-staging-d7c-cluster-agentpool"
  #     resource_group = "cloudkube-staging-d7c-managed-rg"
  #   }
  # }

  sp_key_vault_name = "cloudkube-devops-kv"
  sp_key_vault_rg   = "cloudkube-shared-rg"

  default_tags = {
    public = true
    demo   = true
    iac    = "terraform"
  }
}

# Resource Group
# --------------

resource "azurerm_resource_group" "rg" {
  name     = local.rg_name
  location = local.location
  tags     = local.default_tags
}

# Azure Container Registry
# ------------------------

resource "azurerm_container_registry" "acr" {
  name                = local.acr_name
  resource_group_name = azurerm_resource_group.rg.name
  location            = azurerm_resource_group.rg.location
  sku                 = "Basic"
  admin_enabled       = false
  tags                = local.default_tags
}

# Service Principal for CI
# ------------------------

data "azuread_client_config" "current" {}

resource "azuread_application" "ci" {
  for_each     = local.environments
  display_name = local.environments[each.key].sp_name
  owners       = [data.azuread_client_config.current.object_id]
}

resource "azuread_service_principal" "ci" {
  for_each                     = local.environments
  application_id               = azuread_application.ci[each.key].application_id
  app_role_assignment_required = false
  owners                       = [data.azuread_client_config.current.object_id]
}

# Store password in Key Vault so we can access it
# and configure for Azure DevOps

data "azurerm_key_vault" "cloudkube_devops" {
  name                = local.sp_key_vault_name
  resource_group_name = local.sp_key_vault_rg
}

resource "azuread_service_principal_password" "ci" {
  for_each             = local.environments
  service_principal_id = azuread_service_principal.ci[each.key].object_id
}

resource "azurerm_key_vault_secret" "sp_secret" {
  for_each     = local.environments
  name         = local.environments[each.key].sp_name
  value        = azuread_service_principal_password.ci[each.key].value
  key_vault_id = data.azurerm_key_vault.cloudkube_devops.id
}

# ==================
#  Role Assignments
# ==================

resource "azurerm_role_assignment" "ci_acr" {
  for_each             = local.environments
  scope                = azurerm_container_registry.acr.id
  role_definition_name = "AcrPush"
  principal_id         = azuread_service_principal.ci[each.key].object_id
}

data "azurerm_user_assigned_identity" "kubelets" {
  for_each            = local.environments
  name                = each.value.kubelet_mi_name
  resource_group_name = each.value.kubelet_rg
}

resource "azurerm_role_assignment" "kubelets_acr_pull" {
  for_each             = local.environments
  scope                = azurerm_container_registry.acr.id
  role_definition_name = "AcrPull"
  principal_id         = data.azurerm_user_assigned_identity.kubelets[each.key].principal_id
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

output "service_principals" {
  value = [for sp in azuread_service_principal.ci : {
    client_id    = sp.application_id
    display_name = sp.display_name

  }]
}
