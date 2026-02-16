// amplify/functions/chatbot-go/resource.ts
import { defineFunction } from '@aws-amplify/backend';
//import { execSync } from 'node:child_process';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';
import { Duration } from 'aws-cdk-lib';
import { Code, Function, Runtime } from 'aws-cdk-lib/aws-lambda';
import { PolicyStatement } from 'aws-cdk-lib/aws-iam'; // Allows you to add IAM policies to the function

const functionDir = path.dirname(fileURLToPath(import.meta.url));

export const chatbotGo = defineFunction(
    (scope) => {
      const chatbotGoFunction = new Function(scope, 'chatbot-go', {
        handler: 'bootstrap',
        runtime: Runtime.PROVIDED_AL2023,
        timeout: Duration.seconds(30),
        code: Code.fromAsset(functionDir),  // Just use the directory as-is
      });

      // Add Secrets Manager permissions
      chatbotGoFunction.addToRolePolicy(new PolicyStatement({
        actions: ['secretsmanager:GetSecretValue'],
        resources: [
          'arn:aws:secretsmanager:*:*:secret:OPENAI_API_KEY_SECRET*'
        ]
      }));
  
      return chatbotGoFunction;
    },
    { resourceGroupName: 'data' }
  );