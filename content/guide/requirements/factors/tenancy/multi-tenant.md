---
title: Multi-tenant Cluster
description: Cluster is used to host multiple workloads and/or multiple teams
complexity:  100
security: -25
cost: 0
operations: 100
---

## Multi-tenancy Model

Multi-tenancy is incredibly complex. Here is one example, Ingress, which manages external access to your cluster. 

In the diagrams below, 

- this triangle <img src="/images/tenancy-ingress.png" alt="" width="20"> represents [Ingress objects](https://kubernetes.io/docs/concepts/services-networking/ingress/), which actually exist across logical boundaries like namespaces. 
- yellow and blue present different tenants (teams in this scenario)
- different shapes indicate different _types_ of workloads, e.g. web vs jobs. 

For example, If there is a single Ingress controller and both teams have ability to create Ingress objects, **what stops blue team from publishing a yellow.app.com route?**

<figure>
	<img src="/images/tenancy-multi-1.png" alt="Example Multi-tenant cluster with **shared** Ingress controllers" width="400">
	<figcaption>Example Multi-tenant cluster with <strong>shared</strong> Ingress controllers</figcaption>
</figure>

To avoid this problem, some people will have dedicated ingress controllers per tenant and may even split their hardware (node pools). Opinionated Julie: it's starting to look like the first picture, no?

<figure>
	<img src="/images/tenancy-multi-2.png" alt="Example Multi-tenant cluster with separate Ingress controllers" width="400">
	<figcaption>Example Multi-tenant cluster with <strong>separate</strong> Ingress controllers</figcaption>
</figure>

Note: most cloud provider docs focus on "nodes" and "pods" which are further away from customer's requirements. Diagrams are just a quick sketch late at night. I should add blue ingress triangles in the first diagram.

#### Consequences

Brain dump:

- workloads die together
- resource-heavy and chatty neighbors?
- how will you split costs?
- security
  - networking
  - ingress example