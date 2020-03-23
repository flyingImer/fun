#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { AccountBillingAlertStack } from '../lib/account-billing-alert-stack';

const app = new cdk.App();
new AccountBillingAlertStack(app, 'AccountBillingAlertStack', {
    emails: [ process.env.BILLING_ALERT_EMAIL! ],
});
