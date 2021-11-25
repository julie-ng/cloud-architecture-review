---
title: Azure CNI
description: Use Azure Networking
complexity: 10
security: 10
price: 0
operations: 10
---

More information about Azure CNI, why Microsoft recommends it, etc.

![Diagram](https://docs.microsoft.com/en-us/azure/aks/media/concepts-network/advanced-networking-diagram.png)

> With Azure CNI, every pod gets an IP address from the subnet and can be accessed directly. These IP addresses must be planned in advance and unique across your network space. Each node has a configuration parameter for the maximum number of pods it supports. The equivalent number of IP addresses per node are then reserved up front. Without planning, this approach can lead to IP address exhaustion or the need to rebuild clusters in a larger subnet as your application demands grow.

> Unlike kubenet, traffic to endpoints in the same virtual network isn't NAT'd to the node's primary IP. The source address for traffic inside the virtual network is the pod IP. Traffic that's external to the virtual network still NATs to the node's primary IP.
