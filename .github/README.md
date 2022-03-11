# GitHub Automation

## Security Concept

This repo has the following strategy, where a deployment target can be `dev`, `staging` or `production`.

- Each deployment target has its own Azure Kubernetes clsuter.
- Each deployment target has its own Service Principal (headless account), which has access stricted to the `aks-architect` namespace on that cluster.
- Each deployment target has its own [GitHub Environment](https://docs.github.com/en/actions/deployment/targeting-different-environments/using-environments-for-deployment)
- Each GitHub Environment is restricted to its corresponding branch, e.g. `dev` environemnt is tied to `main` branch.
- Each Service Principal is [federated](https://docs.microsoft.com/en-us/azure/active-directory/develop/workload-identity-federation-create-trust-github?tabs=azure-portal) to a GitHub environment

In this way, there are no secrets stored on GitHub.com. Instead the GitHub Workflow token (unique to each run) is swapped for an Azure access token. For details, see [Azure Workload identity federation > Configure an app to trust a GitHub repo](https://docs.microsoft.com/en-us/azure/active-directory/develop/workload-identity-federation-create-trust-github?tabs=azure-portal)

## GitHub Actions

### Why kubelogin and kubelogout custom actions?

- Installs and uses the [Azure kubelogin](https://github.com/Azure/kubelogin) tool, which is needed for non-interactive authentication on these Azure AD integrated clusters.
- Gets access credentials for the Kubernetes cluster and saves to the a custom [kubeconfig](https://kubernetes.io/docs/concepts/configuration/organize-cluster-access-kubeconfig/) file.
- Exports the location of this custom kubeconfig file so upstream jobs can use it for `kubectl`

It's probably not necessary to use a custom [kubeconfig](https://kubernetes.io/docs/concepts/configuration/organize-cluster-access-kubeconfig/) within the working directory. But I'm paranoid and prefer to do my own security housekeeping and explicitly delete tokens, especially on multi-tenant (i.e. shared) automation infrastructure.

## GitHub Workflows

⚠️ *Failing Edge Case - currently builds fails if git sha is only numbers because [Kubernetes spec](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.23/#envvar-v1-core) requires environment variables to be coerced into strings. Unfortunately `kustomize` is removing quotes.*

### Triggers and Deployments

| Workflow | Branch Triggers | Pull Request Triggers | Deployment |
|:--|:--|:--|:--|
| [`ci.yaml`](./workflows/ci.yaml) | &bull; `main`<br>&bull; `feat/*`<br>&bull; `fix/*` | `main` | No |
| [`cd.yaml`](./workflows/cd.yaml) | &bull; `main`<br>&bull; `staging`  | (none) | Yes |

### How to Configure

To configure the pipelines, see [`_config.yaml`](./workflows/_config.yaml) where you will find configuration blockers per environment, e.g.

```yaml
env:
  dev-cluster:            cloudkube-dev-r9er-cluster
  dev-resource-group:     cloudkube-dev-r9er-rg
  dev-url:                'https://aks-architect.dev.cloudkube.io/'
  dev-hostname:           aks-architect.dev.cloudkube.io
```

#### Branch Correlation

Also in the same [`_config.yaml`](./workflows/_config.yaml), find the lines that determine which variables set is used, e.g.

```yaml
steps:
- id: is-dev
  if: github.ref == 'refs/heads/main' # <=== CONFIGURE branch name
```

#### Docker Tags and Image Promotion

The Container Registry and tag prefixes are configured in [`_docker.yaml`](workflows/_docker.yaml)

```yaml
env:
  acr-registry: aksarchitect
  image-name: aksarchitect.azurecr.io/frontend
```

Generally, the image lifecycle is as follows

| Trigger | Example Tag | Details |
|:--|:--|:--|
| Push to `main` branch | `dev-e6c52a4` | git sha is appended to image name |
| Push to `staging` branch | `staging-e6c52a4` | pull existing dev image, re-tag prefix to `staging-` and push back to registry.|
| Push tag, e.g. `v0.1.0` | `0.1.0` | Follows semver. Will use git sha to promote staging image via re-taggin (to be implemented) |


## References

### Azure Docs

- [Workload identity federation (preview)](https://docs.microsoft.com/en-us/azure/active-directory/develop/workload-identity-federation) - have Azure trust GitHub identities
- [Configure an app to trust a GitHub repo (preview)](https://docs.microsoft.com/en-us/azure/active-directory/develop/workload-identity-federation-create-trust-github?tabs=azure-portal) - required setup in portal

### GitHub Docs

- [GitHub Docs: Configuring OpenID Connect in Azure](https://docs.github.com/en/actions/deployment/security-hardening-your-deployments/configuring-openid-connect-in-azure) - permissions required for trading GitHub JWT for Azure access token 
- GitHub Docs: Sharing variables 
  - [across steps in same job](https://docs.github.com/en/github-ae@latest/actions/using-workflows/workflow-commands-for-github-actions#setting-an-environment-variable) via `GITHUB_ENV`
  - [across jobs](https://docs.github.com/en/github-ae@latest/actions/using-workflows/workflow-syntax-for-github-actions#jobsjob_idoutputs) via `outputs`
- [GitHub Community: Re-usable workflows and environments](https://github.community/t/reusable-workflows-secrets-and-environments/203695/56)  
- [GitHub Blog: How to start using reusable workflows with GitHub Actions](https://github.blog/2022-02-10-using-reusable-workflows-github-actions/#Key_differences_between_reusable_workflows_and_composite_actions) >  Key Differences with Composite Actions
  - can use `if:` conditionals
  - can use `secrets`
