package main

import (
    "context"
    "encoding/json"
    "fmt"
    "log"
    "os"

    "github.com/aws/aws-lambda-go/lambda"
    "github.com/aws/aws-sdk-go-v2/config"
    "github.com/aws/aws-sdk-go-v2/service/secretsmanager"
    openai "github.com/sashabaranov/go-openai"
)

const (
    defaultSystemPrompt = "You are a helpful assistant that can answer questions and help with tasks."
    defaultModel        = "gpt-4o-mini"
    defaultTemperature  = 0.2
    defaultMaxTokens    = 2048
)

// Message represents a chat message
type Message struct {
    Role    string `json:"role"`
    Content string `json:"content"`
}

// Event represents the Lambda event structure
type Event struct {
    Arguments Arguments `json:"arguments"`
}

// Arguments contains the request parameters
type Arguments struct {
    Messages          []Message `json:"messages"`
    SystemPrompt      *string   `json:"systemPrompt,omitempty"`
    InitializeSession bool      `json:"initializeSession,omitempty"`
}

// Response represents the Lambda response
type Response struct {
    Message   string     `json:"message"`
    Citations []Citation `json:"citations"`
}

// Citation represents a source citation
type Citation struct {
    Title string `json:"title"`
    URI   string `json:"uri"`
}

// SecretsManagerClient wraps AWS Secrets Manager operations
type SecretsManagerClient struct {
    client *secretsmanager.Client
}

// NewSecretsManagerClient creates a new Secrets Manager client
func NewSecretsManagerClient(ctx context.Context) (*SecretsManagerClient, error) {
    cfg, err := config.LoadDefaultConfig(ctx)
    if err != nil {
        return nil, fmt.Errorf("unable to load SDK config: %w", err)
    }

    return &SecretsManagerClient{
        client: secretsmanager.NewFromConfig(cfg),
    }, nil
}

// GetSecret retrieves a secret value from AWS Secrets Manager
func (s *SecretsManagerClient) GetSecret(ctx context.Context, secretName string) (string, error) {
    input := &secretsmanager.GetSecretValueInput{
        SecretId: &secretName,
    }

    result, err := s.client.GetSecretValue(ctx, input)
    if err != nil {
        return "", fmt.Errorf("failed to retrieve secret %s: %w", secretName, err)
    }

    if result.SecretString == nil {
        return "", fmt.Errorf("secret %s has no string value", secretName)
    }

    return *result.SecretString, nil
}

// GetOpenAIAPIKey retrieves the OpenAI API key from Secrets Manager
func GetOpenAIAPIKey(ctx context.Context) (string, error) {
    smClient, err := NewSecretsManagerClient(ctx)
    if err != nil {
        return "", err
    }

    secretName := getEnv("OPENAI_SECRET_NAME", "OPENAI_API_KEY_SECRET")
    secretString, err := smClient.GetSecret(ctx, secretName)
    if err != nil {
        return "", err
    }

    // Parse the JSON secret
    var secretData map[string]string
    if err := json.Unmarshal([]byte(secretString), &secretData); err != nil {
        return "", fmt.Errorf("failed to parse secret JSON: %w", err)
    }

    apiKey, exists := secretData["OPENAI_API_KEY"]
    if !exists {
        return "", fmt.Errorf("OPENAI_API_KEY not found in secret")
    }

    return apiKey, nil
}

// ChatGPTClient wraps OpenAI API operations
type ChatGPTClient struct {
    client *openai.Client
}

// NewChatGPTClient creates a new ChatGPT client
func NewChatGPTClient(apiKey string) *ChatGPTClient {
    return &ChatGPTClient{
        client: openai.NewClient(apiKey),
    }
}

// AskChatGPT sends messages to ChatGPT and returns the response
func (c *ChatGPTClient) AskChatGPT(ctx context.Context, messages []Message, systemPrompt string) (*Response, error) {
    log.Println("ask_chatgpt")

    // Build OpenAI messages
    openaiMessages := []openai.ChatCompletionMessage{
        {
            Role:    openai.ChatMessageRoleSystem,
            Content: systemPrompt,
        },
    }

    for _, msg := range messages {
        role := msg.Role
        if role == "" {
            role = "user"
        }
        openaiMessages = append(openaiMessages, openai.ChatCompletionMessage{
            Role:    role,
            Content: msg.Content,
        })
    }

    // Get configuration from environment
    model := getEnv("OPENAI_MODEL", defaultModel)
    temperature := getEnvFloat("OPENAI_TEMP", defaultTemperature)

    // Create chat completion request
    req := openai.ChatCompletionRequest{
        Model:       model,
        Messages:    openaiMessages,
        Temperature: float32(temperature),
        MaxTokens:   defaultMaxTokens,
    }

    resp, err := c.client.CreateChatCompletion(ctx, req)
    if err != nil {
        return nil, fmt.Errorf("failed to create chat completion: %w", err)
    }

    if len(resp.Choices) == 0 {
        return nil, fmt.Errorf("no response choices returned")
    }

    messageText := resp.Choices[0].Message.Content

    return &Response{
        Message:   messageText,
        Citations: []Citation{}, // ChatGPT doesn't provide citations by default
    }, nil
}

// Handler is the Lambda handler function
func Handler(ctx context.Context, event Event) (*Response, error) {
    log.Println("Received event")

    // Handle session initialization
    if event.Arguments.InitializeSession {
        log.Println("Initializing session")
        return &Response{
            Message:   "Session initialized",
            Citations: []Citation{},
        }, nil
    }

    // Extract messages
    messages := event.Arguments.Messages
    if len(messages) == 0 {
        return &Response{
            Message:   "No messages found in request",
            Citations: []Citation{},
        }, nil
    }

    log.Println("Messages received")

    // Get system prompt
    systemPrompt := defaultSystemPrompt
    if event.Arguments.SystemPrompt != nil && *event.Arguments.SystemPrompt != "" {
        systemPrompt = *event.Arguments.SystemPrompt
    }

    // Get OpenAI API key
    apiKey, err := GetOpenAIAPIKey(ctx)
    if err != nil {
        return nil, fmt.Errorf("failed to get OpenAI API key: %w", err)
    }

    // Create ChatGPT client and get response
    chatClient := NewChatGPTClient(apiKey)
    response, err := chatClient.AskChatGPT(ctx, messages, systemPrompt)
    if err != nil {
        return nil, fmt.Errorf("failed to get ChatGPT response: %w", err)
    }

    log.Printf("bot_response_msg: %s", response.Message)

    return response, nil
}

// Helper functions

func getEnv(key, fallback string) string {
    if value := os.Getenv(key); value != "" {
        return value
    }
    return fallback
}

func getEnvFloat(key string, fallback float64) float64 {
    if value := os.Getenv(key); value != "" {
        var f float64
        if _, err := fmt.Sscanf(value, "%f", &f); err == nil {
            return f
        }
    }
    return fallback
}

func main() {
    lambda.Start(Handler)
}