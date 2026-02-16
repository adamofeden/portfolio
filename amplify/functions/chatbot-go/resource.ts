// amplify/functions/chatbot-go/resource.ts
import { defineFunction } from '@aws-amplify/backend';
//import { execSync } from 'node:child_process';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';
import { Duration } from 'aws-cdk-lib';
import { Code, Function, Runtime } from 'aws-cdk-lib/aws-lambda';

const functionDir = path.dirname(fileURLToPath(import.meta.url));

export const chatbotGo = defineFunction(
    (scope) => {
      const chatbotGoFunction = new Function(scope, 'chatbot-go', {
        handler: 'bootstrap',
        runtime: Runtime.PROVIDED_AL2023,
        timeout: Duration.seconds(30),
        code: Code.fromAsset(functionDir),  // Just use the directory as-is
      });
  
      return chatbotGoFunction;
    },
    { resourceGroupName: 'data' }
  );