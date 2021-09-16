# aks-designer

## Build Setup

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, check out the [documentation](https://nuxtjs.org).

## Node v14

Cannot use v16 until this bug for m1 macs is fixed [docker/for-mac#5831](https://github.com/docker/for-mac/issues/5831)


## Infrastructure

Note: the `aks-architect` namespace should exist before running Terraform.

### Resources Created

The Terraform infrastructure as code performs the following:

- **Azure Container Registry**  
  just for this application (because its lifecycle should be different from the AKS clusters)

- **RBAC - Kubelets can pull images**  
  grants AKS cluster kubelets permission to pull images from this repo

- **Service Principal**  
  - to use in CI/CD to push/pull images to _this_ container registry `aksarchitect` 
  - contributor access to `aks-architect` namespace in shared cluster

### Governance Considerations

- The infrastructure as code (IaC) in this repo is not intended for CI/CD automation or configuration management. Thus the Terraform state file is local. 
  
- This IaC is designed to be run by an Administrator with elevated permissions not just for this repository, but also for the corresponding Kubernetes clusters, [which are managed in a different repository](https://github.com/julie-ng/cloudkube-aks-clusters).

### Terraform Output

```
azure_container_registry = {
  "admin_enabled" = false
  "login_server" = "aksarchitect.azurecr.io"
  "name" = "aksarchitect"
  "sku" = "Basic"
}
kubelet_rbac = [
  {
    "principal_id" = "5c6fc67c-xxxx-xxxx-xxxx…"
    "role_definition_name" = "AcrPull"
    "scope" = "/subscriptions/<redacted>/resourceGroups/aks-architect-rg/providers/Microsoft.ContainerRegistry/registries/aksarchitect"
  },
  {
    "principal_id" = "25299f3c-xxxx-xxxx-xxxx…"
    "role_definition_name" = "AcrPull"
    "scope" = "/subscriptions/<redacted>/resourceGroups/aks-architect-rg/providers/Microsoft.ContainerRegistry/registries/aksarchitect"
  },
]
resource_group = {
  "location" = "northeurope"
  "name" = "aks-architect-rg"
}
service_principal_rbac = [
  {
    "client_id" = "124957cb-xxxx-xxxx-xxxx…"
    "display_name" = "aks-architect-ci-dev-sp"
    "object_id" = "09f8a6d6-xxxx-xxxx-xxxx…"
    "roles" = [
      {
        "name" = "Azure Kubernetes Service RBAC Writer"
        "scope" = "/subscriptions/<redacted>/resourcegroups/cloudkube-dev-r9er-rg/providers/Microsoft.ContainerService/managedClusters/cloudkube-dev-r9er-cluster/namespaces/aks-architect"
      },
      {
        "name" = "AcrPush"
        "scope" = "/subscriptions/<redacted>/resourceGroups/aks-architect-rg/providers/Microsoft.ContainerRegistry/registries/aksarchitect"
      },
    ]
  },
  {
    "client_id" = "f73964c7-xxxx-xxxx-xxxx…"
    "display_name" = "aks-architect-ci-staging-sp"
    "object_id" = "765d2e4f-xxxx-xxxx-xxxx…"
    "roles" = [
      {
        "name" = "Azure Kubernetes Service RBAC Writer"
        "scope" = "/subscriptions/<redacted>/resourcegroups/cloudkube-staging-d7c-rg/providers/Microsoft.ContainerService/managedClusters/cloudkube-staging-d7c-cluster/namespaces/aks-architect"
      },
      {
        "name" = "AcrPush"
        "scope" = "/subscriptions/<redacted>/resourceGroups/aks-architect-rg/providers/Microsoft.ContainerRegistry/registries/aksarchitect"
      },
    ]
  },
]
```

## Special Directories

You can create the following extra directories, some of which have special behaviors. Only `pages` is required; you can delete them if you don't want to use their functionality.

### `assets`

The assets directory contains your uncompiled assets such as Stylus or Sass files, images, or fonts.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/assets).

### `components`

The components directory contains your Vue.js components. Components make up the different parts of your page and can be reused and imported into your pages, layouts and even other components.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/components).

### `layouts`

Layouts are a great help when you want to change the look and feel of your Nuxt app, whether you want to include a sidebar or have distinct layouts for mobile and desktop.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/layouts).


### `pages`

This directory contains your application views and routes. Nuxt will read all the `*.vue` files inside this directory and setup Vue Router automatically.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/get-started/routing).

### `plugins`

The plugins directory contains JavaScript plugins that you want to run before instantiating the root Vue.js Application. This is the place to add Vue plugins and to inject functions or constants. Every time you need to use `Vue.use()`, you should create a file in `plugins/` and add its path to plugins in `nuxt.config.js`.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/plugins).

### `static`

This directory contains your static files. Each file inside this directory is mapped to `/`.

Example: `/static/robots.txt` is mapped as `/robots.txt`.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/static).

### `store`

This directory contains your Vuex store files. Creating a file in this directory automatically activates Vuex.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/store).
