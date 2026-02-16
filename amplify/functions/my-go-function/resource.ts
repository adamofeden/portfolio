// amplify/functions/my-go-function/resource.ts
import { defineFunction } from '@aws-amplify/backend';
//import { execSync } from 'node:child_process';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';
import { Duration } from 'aws-cdk-lib';
import { Code, Function, Runtime } from 'aws-cdk-lib/aws-lambda';

const functionDir = path.dirname(fileURLToPath(import.meta.url));

export const myGoFunction = defineFunction(
  (scope) => {
    const goFunction = new Function(scope, 'my-go-function', {
      handler: 'bootstrap',
      runtime: Runtime.PROVIDED_AL2023,
      timeout: Duration.seconds(30),
      code: Code.fromAsset(functionDir, {
        bundling: {
          image: Runtime.PROVIDED_AL2023.bundlingImage,
          command: [
            'bash', '-c',
            'GOOS=linux GOARCH=amd64 go build -o /asset-output/bootstrap main.go'
          ],
        },
      }),
    });

    return goFunction;
  },
  { resourceGroupName: 'data' }  // Optional, matches your chatbot
);