# Customer Invitation System

## Overview

This TypeScript program identifies and invites customers located within a specified radius from the FINTECH CO. company. The program reads customer data from a file, calculates the Great-Circle Distance, and invites customers within a 100km radius.

## Prerequisites

- Node.js and npm installed

## Installation

1. Clone the repository:

   ```bash
   git clone [repository_url]
   cd customer-invitation-system
   Install dependencies:
   ```

## Bash

npm install

## Run

To run the program:
npx tsx InvitationSystem.ts

To view the queue of invitees:
node ./subscriber.js

## Using RabbitMQ as a broker system

Setup RabbitMQ locally and use default the settings provided by rabbitMQ

## Usage

Place the customer data in a file named somecustomer.txt in the root directory. Follow the format in the sample files:
The program includes various sample files such as sample.txt, customers.txt, somecustomers.txt.
You can choose to use any of the sample files however you need to change the directory in the program
Note: somecustomers is the default file used

## Configuration

Adjust the maxDistanceInKm property in CustomerInvitationSystem class for a different radius.
