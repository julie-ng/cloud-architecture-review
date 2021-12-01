Thanks for filling out the review. The analysis below reflects *only* the questions you've answered.

### Understanding your score

Every decision, will have an effect on multiple dimensions: complexity, operations, security and cost. These dimensions are based on [Microsoft's Well Architected Framework](https://docs.microsoft.com/en-us/azure/architecture/framework/).

To help you understand, let's take Tenancy Model as an example. What happens when you selecct *multi-tenant* model?

- **Increases**  
  You choice has severly increased complexity and operations, which is generally the case when you share resources across domains.

- **Decreases**  
  You may not be aware of it, but your security will *decrease* because the resources are shared. The decrease may be minimal because there are ways to mitigate common challenges. But the security risk is increased relative to a single-tenant model.

- **Neutral**  
  For costs, I've considered the tenancy model to have "neutral" effect because often customers opt for separate nodepools per tenant, reducing one of most common drivers for this decision - to share resources.

Hopefully this helps you interpret the analysis below. It is designed to help you understand hte *consequences* of your decision. If you wish, you can change it and your score will update.


**Important Note**: numbers, e.g. -25 or +100 are there for debugging. In a production version I would replace them with simple "low, medium, high," labels.

---