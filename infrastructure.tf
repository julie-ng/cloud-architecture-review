# =======
#  Setup
# =======

terraform {
  required_providers {
    azurerm = {
      version = ">= 2.76.0"
      source  = "hashicorp/azurerm"
    }
  }
}

provider "azurerm" {
  features {}
}

data "azurerm_client_config" "current" {}

# ===========
#  Variables
# ===========

locals {
  location = "North Europe"
  rg_name  = "aks-architect-rg"
  acr_name = "aksarchitect"
  sp_name  = "aks-architect-ci-acr-sp"
  kubelets = {
    dev = {
      name           = "cloudkube-dev-r9er-cluster-agentpool"
      resource_group = "cloudkube-dev-r9er-managed-rg"
    }
    staging = {
      name           = "cloudkube-staging-d7c-cluster-agentpool"
      resource_group = "cloudkube-staging-d7c-managed-rg"
    }
  }
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
  display_name = local.sp_name
  owners       = [data.azuread_client_config.current.object_id]
}

resource "azuread_service_principal" "ci" {
  application_id               = azuread_application.ci.application_id
  app_role_assignment_required = false
  owners                       = [data.azuread_client_config.current.object_id]
}

# ==================
#  Role Assignments
# ==================

resource "azurerm_role_assignment" "ci_acr" {
  scope                = azurerm_container_registry.acr.id
  role_definition_name = "AcrPush"
  principal_id         = azuread_service_principal.ci.object_id
}

data "azurerm_user_assigned_identity" "kubelets" {
  for_each            = local.kubelets
  name                = each.value.name
  resource_group_name = each.value.resource_group
}

resource "azurerm_role_assignment" "kubelets_acr_pull" {
  for_each             = local.kubelets
  scope                = azurerm_container_registry.acr.id
  role_definition_name = "AcrPull"
  principal_id         = data.azurerm_user_assigned_identity.kubelets[each.key].principal_id
}
