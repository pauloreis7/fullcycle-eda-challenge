FROM golang:1.20

WORKDIR /app

RUN apt-get update && apt-get install -y librdkafka-dev

COPY go.mod go.sum ./

RUN go mod download

COPY . .

RUN go build -o ./cmd/walletcore/main ./cmd/walletcore

CMD ["go", "run", "cmd/walletcore/main.go"]
