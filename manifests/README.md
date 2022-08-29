# Kubernetes Manifests

This application is deployed to different [Azure Kubernetes clusters](https://docs.microsoft.com/en-us/azure/aks/intro-kubernetes) per environment.

### Kustomize

This app uses [kustomize](https://kustomize.io/) for Kubernetes native configuration management. 

This means we can run something like

```bash
kustomize build manifests/overlays/dev | envsubst | kubectl apply -f -
```

See [`./github/workflows/_deploy.yaml`](./../github/workflows/_deploy.yaml) for details about how this app is deployed.