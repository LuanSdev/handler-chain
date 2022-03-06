> ## Requirements

- it must have a method to execute the first method of chain
- it must return an object with a method to run the next method to continue the chain
- the data provided must be passed for each validation
- if any method of chain don't pass, the chain must be cancelled
- the validation could be executed in parallel or in sequence, for example:
  ```typescript
  await validationChain
    .execute(method1) //in sequence
    .next([method2, method3]); //in parallel
  ```
