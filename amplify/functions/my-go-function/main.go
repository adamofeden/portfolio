package main
   
import (
	"context"
	"github.com/aws/aws-lambda-go/lambda"
)

// AppSync event structure
type AppSyncEvent struct {
	Arguments Arguments `json:"arguments"`
}

type Arguments struct {
	Name string `json:"name"`
}

type Response struct {
	Message string `json:"message"`
}

func handler(ctx context.Context, req AppSyncEvent) (Response, error) {
	return Response{Message: "Hello " + req.Arguments.Name}, nil
}

func main() {
	lambda.Start(handler)
}