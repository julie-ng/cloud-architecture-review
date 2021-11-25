---
title: What is your networking model?
short_title: Networking Model
description: Azure CNI vs Kubenet...longer helping text if people don't understand what this question means.
type: radio
answer: unset
factors:
- path: 'networking/azure-cni'
- path: 'networking/kubenet'
---

In this introduction paragraph explain why this decision is critical and common gotchas, best practices e.g. IP address planning, etc. The goal of this page is not to be comprehensive but to provide an overview of common factors to consider when making this decision. Instead of repeating the content, we provide deep links into the Azure docs.

Note: the paragraphs below are copy and paste frome Azure docs.

### Resources

- [Azure Docs: AKS Networking Concepts](https://docs.microsoft.com/en-us/azure/aks/concepts-network)
- [Azure Docs: Use kubenet networking with your own IP address ranges in Azure Kubernetes Service (AKS)](https://docs.microsoft.com/en-us/azure/aks/configure-kubenet)