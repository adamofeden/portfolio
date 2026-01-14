// amplify/functions/chatbot/resource.ts
import { execSync } from 'node:child_process';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineFunction } from '@aws-amplify/backend';
import { DockerImage, Duration } from 'aws-cdk-lib';
import { Code, Function, Runtime } from 'aws-cdk-lib/aws-lambda';
//import { PolicyStatement } from 'aws-cdk-lib/aws-iam';

const functionDir = path.dirname(fileURLToPath(import.meta.url));

export const chatBot = defineFunction(
  (scope) =>{
    const chatBotFunction = new Function(scope, 'chatbot', {
      handler: 'index.handler',
      runtime: Runtime.PYTHON_3_11,
      timeout: Duration.seconds(120),
      description: 'chatbot',
      environment: {
        // Environment variables for Bedrock configuration
        GEMINI_REGION: 'eu-west-2', // Set your preferred region
        GEMINI_MODEL_ID: 'gemini-2.5-flash', // Set your preferred model
      },
      code: Code.fromAsset(functionDir, {
        bundling: {
          image: DockerImage.fromRegistry('public.ecr.aws/lambda/python:3.11'),
          command: [
            'bash', '-c',
            'pip install -r requirements.txt -t /asset-output && cp index.py /asset-output'
          ],
        },
      }),
      /*code: Code.fromAsset(functionDir, {
        bundling: {
          // For pure-Python deps you can bundle without Docker.
          // If you add native deps, plan to build in CI on Linux.
          image: DockerImage.fromRegistry('dummy'),
          local: {
            tryBundle(outputDir: string) {
              try{
                execSync(
                  `python -m pip install -r ${path.join(functionDir, 'requirements.txt')} -t ${outputDir} --platform manylinux2014_x86_64 --only-binary=:all:`
                );
                execSync(`cp ${path.join(functionDir, 'index.py')} ${outputDir}`); // Windows copy
                return true;
              } catch (error) {
                console.error('Error during bundling:', error);
                return false;
              }
            },
          },
        },
      }),*/
    });

    return chatBotFunction;
  },
  { resourceGroupName: 'data' }
);