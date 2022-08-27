---
title: What is your disaster recovery strategy?
shortTitle: Disaster Recovery
description: In the unlikely event an Azure region is unavailable, how will your respond?
factors:
- slug: 'active-active'
- slug: 'active-passive'
- slug: 'redeploy'
- slug: 'wait'
---

## When do you need Disaster Recovery?

(Work in Progress. Some of this is business continuity, not just disaster recovery.)

Not everyone needs redudant infrastructure. It can be expensive and it increases the complexity of your architecture and deployments. There are two major reasons for redundancy

- **Legally required**  
	Some companies and organizations are required by laws and regulations to have a business continuity and disaster recovery plan. For example, my previous employer the Allianz is an insurer and "too big to fail" because many people depend on them for their health insurance, retirement, etc.

- **You promised your customers**  
	For example if you sell products online, you will probably use SaaS a credit card processor. And as a business owner, you expect this to be 100% available all the time. 

## What promises did you make?

In this section, explain what these agreements mean and how they work together.

| | Name | Meaning |
|:--|:--|:--|
| SLA | Service Level Agreement | What you promised your users/customers |
| SLO | Service Level Objectives | Your target performance |
| SLI | Service Level Indicators  | Numbers that measure your SLA/SLO performance |

What does it mean when your service is "down"? For example, if your application goes into read-only mode during database maintenance, is that considered uptime or downtime? There's no standard answer. It's actually _your choice_. 

## Does 100% uptime actually exist?

Your SLA decision is not to be taken lightly. Although 99% sounds great, it still amounts to nearly 4 days in a single year. 

| SLA	| Downtime per week	| Downtime per month| Downtime per year |
|--:|--:|--:|--:|
| 99%	| 1.68 hours | 7.2 hours | 3.65 days |
| 99.9%	| 10.1 minutes | 43.2 minutes | 8.76 hours |
| 99.95% | 5 minutes | 21.6 minutes | 4.38 hours |
| 99.99% | 1.01 minutes | 4.32 minutes | 52.56 minutes |
| 99.999%	| 6 seconds	| 25.9 seconds | 5.26 minutes |


### In Real Life… you don't need to throw more technology at the problem

Ask yourself - are you required to have a specific SLA? Most of us are neither Microsoft nor Netflix. And it's okay if our services are not 99%+ available. 

Additionally some of those numbers can come from deployments. In my career both at startups and large corporations, it was common to deploy outside of business hours e.g. at 5AM to minimize impact to users. You can run database maintenance at night. 

There's no one size fits all answer. Do what you're comfortable with and let's you focus on creating _business value_ during the day and let's you sleep well at night. Do not forget to optimize for developer well-being :-)

(Work in progress)

## Useful Resources

- [uptime.is - SLA and Uptime Calculator ](https://uptime.is/)
- [Azure Docs - Composite SLAs](https://docs.microsoft.com/azure/architecture/framework/resiliency/business-metrics#composite-slas)