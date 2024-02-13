# Transaction Management Frontend - LII

Your task is to build a frontend app that allows the recording of financial transactions and viewing the transaction history by connecting to a hosted Transaction Management API.

You will be required to use the React Framework for this assessment.

### Frontend requirements

The transaction list must display the withdrawn or deposited amount for each transaction, along with the affected account ID. It must also render the current balance for the last submitted transaction.

Here's the UI mockup with hints:

![Transaction Management App Frontend](https://user-images.githubusercontent.com/450319/139797772-4e4b2744-447c-411f-9b04-7028ba5e89a1.png)

Feel free to tweak the UI, but please ensure that the following HTML is in place.

#### The form for submitting transactions

```html
<form ... >
  <input data-type="account-id" ... />
  <input data-type="amount" ... />
  <input data-type="transaction-submit" type="submit" ... />
</form>
```

Both input **fields should be cleared** after the form is submitted.

#### Transactions list

Every newly submitted transaction should go on **the top of the list** and should have an enclosing `<div />` with the following structure:

```html
<div 
  data-type="transaction"
  data-account-id="${transaction-account-id}"
  data-amount="${transaction-amount}"
  data-balance="${current-account-balance}" ...>
  ...
</div>
```

- `${transaction-account-id}` - account id of the corresponding transaction.
- `${transaction-amount}` - transaction amount.
- `${current-account-balance}` - the current account balance right after submitting the transaction (only show for the last submitted transaction).

### The API to integrate with

<details>
<summary>Untoggle to see request examples</summary>

##### Get historical transactions

```
GET https://infra.devskills.app/api/accounting/transactions
```

##### Create a new transaction

```
POST https://infra.devskills.app/api/accounting/transaction
Content-Type: application/json

{
  "account_id": "0afd02d3-6c59-46e7-b7bc-893c5e0b7ac2",
  "amount": 7
}
```

##### Get a transaction by id

```
GET https://infra.devskills.app/api/accounting/transactions/7c94635a-40a3-4c87-888a-42c3ce5b9750
```

##### Get an account by id
```
GET https://infra.devskills.app/api/accounting/accounts/0afd02d3-6c59-46e7-b7bc-893c5e0b7ac2
```

</details>

## Additional requirements

- Do your best to make the [provided E2E tests](cypress/e2e/test.cy.js) pass.
- Implement client-side validation of the form data.
- Implement error handling for the cases when the API cannot be reached or returns a server error.
- Unit test one module of choice. There is no need to test the whole app, as we only want to understand what you take into consideration when writing unit tests.
- Avoid duplication and extract re-usable modules where it makes sense. We want to see your approach to creating a codebase that is easy to maintain.

## Getting started

<details>
  <summary>If you run into a problem</summary>
  
  Navigate to [our community on GitHub](https://github.com/orgs/DevSkillsHQ/discussions/categories/help) to get assistance.

</details>

<details>
  <summary>Import a starter project</summary>

  We have created a set of starter projects with different tech stacks to help you get started quickly.

  To import a starter project:
  
  1. Go to the "Actions" tab of your GitHub repository and select the "Setup boilerplate" workflow in the left side panel.
  2. In the "Run workflow" dropdown, select the desired boilerplate along with the branch name where you want the boilerplate to be imported (e.g., `implementation`) and click the "Run workflow" button (you can find all starter projects' definitions [here](https://help.alvalabs.io/en/articles/7972852-supported-coding-test-boilerplates)).
  
  After the workflow has finished, your selected boilerplate will be imported to the specified branch, and you can continue from there.
  
  
  > ⚠️ **Custom setup**
  > 
  > If you instead want to set up a custom project, complete the steps below to make the E2E tests run correctly:
  > 1. Update the `baseUrl` (where your frontend runs) in [cypress.config.js](cypress.config.js).
  > 2. Update the `apiUrl` (where your backend runs) in [cypress.config.js](cypress.config.js).
  > 3. Update the [`build`](package.json#L5) and [`start`](package.json#L6) scripts in [package.json](package.json) to respectively build and start your app.
  
</details>

<details>
  <summary>Prepare for coding</summary>

  To get this repository to your local machine, clone it with `git clone`.

  Alternatively, spin up a pre-configured in-browser IDE by clicking on the "Code" tab in this repository and then "Create codespace on {branch_name}".
  
  ![CleanShot 2023-10-13 at 00 00 32@2x](https://github.com/DevSkillsHQ/transaction-management-fullstack-level-1/assets/1162212/598ff1ae-238d-4691-8b7c-eb2228fdefac)

</details>

<details>
  <summary>Running the E2E tests</summary>

  > ⚠️ Before executing the tests, ensure [Node](https://nodejs.org/en) is installed and your app is running.

  ```bash
  npm install
  npm run test
  ```

</details>

## Submitting your solution for review

1. Create a new `implementation` branch on this repository and push your code there.
2. Create a new pull request from `implementation` **without merging it**.
3. Document the tech decisions you've made by creating a new review on your PR ([see how](https://www.loom.com/share/94ae305e7fbf45d592099ac9f40d4274)).
4. Indicate in your PR if your tests are running or not (or how many are running)
5. Await further instructions from the hiring team.

## Time estimate

Between 2 - 3 hours + the time to set up the project/environment (we suggest importing one of the provided project starters to save time).

However, there is no countdown. The estimate is for you to plan your time. Please note however, how long you take to complete the assessment plays a role in your evaulation.

---

Authored by [Alva Labs](https://www.alvalabs.io/).
