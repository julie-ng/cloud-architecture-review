---
title: Kubenet
description: Standard Plugin
complexity: -10
security: 0
cost: 0
operations: -10
---

More information about Kubenet, advantages/differences to Azure CNI, etc.

> By default, AKS clusters use kubenet, and an Azure virtual network and subnet are created for you. With kubenet, nodes get an IP address from the Azure virtual network subnet. Pods receive an IP address from a logically different address space to the Azure virtual network subnet of the nodes. Network address translation (NAT) is then configured so that the pods can reach resources on the Azure virtual network. The source IP address of the traffic is NAT'd to the node's primary IP address. This approach greatly reduces the number of IP addresses that you need to reserve in your network space for pods to use.

