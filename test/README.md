# Wathershopper Automation

This repository contains Cypress automation scripts for testing the [Wathershopper] web application. The tests focus on automating the product purchase flow based on the displayed weather and verifying key functionalities like cart management, Stripe payment processing, and others.

## Project Overview
The **Wathershopper** web app allows users to purchase sunscreens and moisturizers based on the current temperature. This project automates the process of:
1. Identifying the cheapest sunscreen or moisturizer based on SPF levels.
2. Adding selected items to the cart.
3. Completing the purchase using Stripe payment integration.

## Prerequisites
To run this project locally, you'll need:
- **Node.js** (v12 or higher)
- **npm** (Node Package Manager)
- **Cypress** (installed as a dev dependency)