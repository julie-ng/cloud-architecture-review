# Cloud Architecture Review 

| Environment | Status |
|:--|:--|
| Dev | [![🚀 Continuous Delivery (CD)](https://github.com/julie-ng/cloud-architecture-review/actions/workflows/cd.yaml/badge.svg?branch=main)](https://github.com/julie-ng/cloud-architecture-review/actions/workflows/cd.yaml) |
| Staging | [![🚀 Continuous Delivery (CD)](https://github.com/julie-ng/cloud-architecture-review/actions/workflows/cd.yaml/badge.svg?branch=staging)](https://github.com/julie-ng/cloud-architecture-review/actions/workflows/cd.yaml) |


A Proof of Concept app that allows users to answer questions to receive a score that's not a binary checklist, but rather an assessment based on trade-offs.

<img src="./docs/images/review-app-poc.png" alt="Review App Proof of Concept" width="600">

_Note: this is just a proof of concept and the content should be treated as fillers and placeholders_

##  Setup

### Local Development

First install Dependences

```bash
npm install
```

Then start the Nuxt.js Server

```
npm run nuxt:dev
```

#### Testing Production Builds

In the cloud, the app is served via Express so we can include a `/health` endpoint. To test if the app still works locally, run:

```
npm run nuxt:build
npm run express:dev
```

### Production

The best docs are code itself. See 🐳 [Dockerfile](./Dockerfile) and ☸️ [manifests/deployment.yaml](manifests/deployment.yaml)


## Infrastructure

Note: the `architecture-review` namespace should exist before running Terraform.

### Resources Created

The Terraform infrastructure as code performs the following:

- **Azure Container Registry**  
  just for this application (because its lifecycle should be different from the AKS clusters)

- **Service Principals**  
  - to use in CI/CD to push/pull images to _this_ container registry `cloudkubereviews` 
  - contributor access to `architecture-review` namespace in shared cluster

### Role Based Access Control (RBAC)

The following are managed in *this* repository's Infrastructure as Code.

| Security Principal | Role | Scope |
|:--|:--|:--|
| `cloudkube-dev-r9er-cluster-agentpool` | [AcrPull](https://docs.microsoft.com/azure/container-registry/container-registry-roles?tabs=azure-cli) | `cloudkubereviews` Container Registry |
|`cloudkube-staging-d7c-cluster-agentpool`  | [AcrPull](https://docs.microsoft.com/azure/container-registry/container-registry-roles?tabs=azure-cli) | `cloudkubereviews` Container Registry |
| `cloudkube-arch-review-ci-dev-sp` | [AcrPush](https://docs.microsoft.com/azure/container-registry/container-registry-roles?tabs=azure-cli) | `cloudkubereviews` Container Registry |
| `cloudkube-arch-review-ci-staging-sp` | [AcrPush](https://docs.microsoft.com/azure/container-registry/container-registry-roles?tabs=azure-cli) | `cloudkubereviews` Container Registry |
| `cloudkube-arch-review-ci-dev-sp` | [AKS Cluster User Role](https://docs.microsoft.com/azure/aks/manage-azure-rbac#create-role-assignments-for-users-to-access-cluster)* | `cloudkube-dev-r9er-cluster` |
| `cloudkube-arch-review-ci-staging-sp` | [AKS Cluster User Role](https://docs.microsoft.com/azure/aks/manage-azure-rbac#create-role-assignments-for-users-to-access-cluster)* | `cloudkube-staging-d7c-cluster` |
| `cloudkube-arch-review-ci-dev-sp` | [AKS RBAC Writer](https://docs.microsoft.com/azure/aks/manage-azure-rbac#create-role-assignments-for-users-to-access-cluster) | `architecture-review` namespace in dev cluster |
| `cloudkube-arch-review-ci-staging-sp` | [AKS RBAC Writer](https://docs.microsoft.com/azure/aks/manage-azure-rbac#create-role-assignments-for-users-to-access-cluster) | `architecture-review` namespace in staging cluster |

_[*Required read-only role for non-interactive cluster login](https://docs.microsoft.com/azure/aks/control-kubeconfig-access)_

### Governance Considerations

- The infrastructure as code (IaC) in this repo is not intended for CI/CD automation or configuration management. Thus the Terraform state file is local. 
  
- This IaC is designed to be run by an Administrator with elevated permissions not just for this repository, but also for the corresponding Kubernetes clusters, [which are managed in a different repository](https://github.com/julie-ng/cloudkube-aks-clusters).

- The Azure Container Registry's [admin account is disabled](https://docs.microsoft.com/azure/container-registry/container-registry-authentication?tabs=azure-cli#admin-account).
- The AKS clusters are AAD integrated and [local accounts are disabled](https://docs.microsoft.com/azure/aks/managed-aad#disable-local-accounts-preview).

## NuxtJS App Structure

You can create the following extra directories, some of which have special behaviors. Only `pages` is required; you can delete them if you don't want to use their functionality.

- #### `assets/`
  The assets directory contains your uncompiled assets such as Stylus or Sass files, images, or fonts ([docs](https://nuxtjs.org/docs/2.x/directory-structure/assets)).

- #### `components/`
  The components directory contains your Vue.js components. Components make up the different parts of your page and can be reused and imported into your pages, layouts and even other components ([docs](https://nuxtjs.org/docs/2.x/directory-structure/components)).

- #### `layouts/`
  Layouts are a great help when you want to change the look and feel of your Nuxt app, whether you want to include a sidebar or have distinct layouts for mobile and desktop ([docs](https://nuxtjs.org/docs/2.x/directory-structure/layouts)).


- #### `pages/`
  This directory contains your application views and routes. Nuxt will read all the `*.vue` files inside this directory and setup Vue Router automatically ([docs](https://nuxtjs.org/docs/2.x/get-started/routing)).

- #### `plugins/`
  The plugins directory contains JavaScript plugins that you want to run before instantiating the root Vue.js Application. This is the place to add Vue plugins and to inject functions or constants. Every time you need to use `Vue.use()`, you should create a file in `plugins/` and add its path to plugins in `nuxt.config.js` ([docs](https://nuxtjs.org/docs/2.x/directory-structure/plugins)).

- #### `static/`
  This directory contains your static files. Each file inside this directory is mapped to `/`.

  Example: `/static/robots.txt` is mapped as `/robots.txt` ([docs](https://nuxtjs.org/docs/2.x/directory-structure/static)).

- #### `store/`
  This directory contains your Vuex store files. Creating a file in this directory automatically activates Vuex ([docs](https://nuxtjs.org/docs/2.x/directory-structure/store)).
