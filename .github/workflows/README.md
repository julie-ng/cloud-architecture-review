# GitHub Workflows

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
