import { defineBackend } from '@aws-amplify/backend';
import { auth } from './auth/resource';
import { data } from './data/resource';
import { chatBot } from './functions/chatbot/resource';
import { myGoFunction } from './functions/my-go-function/resource';
import { chatbotGo } from './functions/chatbot-go/resource';

/**
 * @see https://docs.amplify.aws/react/build-a-backend/ to add storage, functions, and more
 */
defineBackend({
  auth,
  data,
  chatBot,
  myGoFunction,
  chatbotGo,
});
