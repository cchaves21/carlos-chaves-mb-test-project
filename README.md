# carlos-chaves test challange for Mercedes-benz.io

### Introduction

This repository contains an automated UI test scenario using the tool [playwright](https://playwright.dev/)
The tests run in the three browsers in paralale (Chrome, Firefox and Safari)

### Configuration used in the environment:
- Nodejs v ^18.0.0 
- NPM v ^8.0.0
- Playwright v ˆ1.27.1

### how to run the tests
- *headed mode*:  `npx playwright test —- headed`
- *headless mode*:  `npx playwright test`

### How to see the reports

After running the tests will create a report with the execution data, to see it just run this command `npx playwright show-report`

If the test fails, a folder will be created with prints of all steps on ./test-results

### Notes

There are some improvements that I would make if I had more time such as:
1. Create a custom command to validate the price values removing it from the test script 
2. Add implicit waits
