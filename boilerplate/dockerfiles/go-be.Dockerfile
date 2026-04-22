FROM golang:1.23-bookworm AS builder

WORKDIR /app

COPY go.mod go.sum* ./
RUN go mod download

COPY . .

RUN CGO_ENABLED=0 GOOS=linux go build -o /out/app ./cmd/app

FROM gcr.io/distroless/static-debian12

WORKDIR /app

COPY --from=builder /out/app /app/app

EXPOSE 8000

CMD ["/app/app"]
