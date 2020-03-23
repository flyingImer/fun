import * as cdk from '@aws-cdk/core';
import { CfnBudget } from '@aws-cdk/aws-budgets';

export interface AccountBillingAlertStackProps extends cdk.StackProps {
    emails: Array<string>;
}

export class AccountBillingAlertStack extends cdk.Stack {
    constructor(scope: cdk.Construct, id: string, props: AccountBillingAlertStackProps) {
        super(scope, id, props);

        // The code that defines your stack goes here
        const budgetData: CfnBudget.BudgetDataProperty = {
            budgetType: 'COST',
            timeUnit: 'MONTHLY',
            budgetLimit: {
                amount: 5,
                unit: 'USD'
            }
        };

        const notifications: Array<CfnBudget.NotificationWithSubscribersProperty> = [
            {
                notification: {
                    notificationType: 'FORECASTED',
                    comparisonOperator: 'GREATER_THAN',
                    threshold: 100,
                    thresholdType: 'PERCENTAGE'
                },
                subscribers: [
                    ...props.emails.map(x => ({
                        address: x,
                        subscriptionType: 'EMAIL'
                    }))
                ]
            }
        ];

        new CfnBudget(this, 'budget', {
            budget: budgetData,
            notificationsWithSubscribers: notifications
        });
    }
}
