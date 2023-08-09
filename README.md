# play-yard

## Description
Playground for testing TypeORM with PostgreSQL

Base on [TypeORM Crash Course - TypeScript & Node ORM](https://youtu.be/JaTbzPcyiOE)


# Compile and Run

## Docker

### Build Image
```bash
    docker build --pull --rm -f "Dockerfile" -t playyard:latest "."
```

### Run Container
```bash
    docker run --env-file .env --rm -p 3000:3000/tcp playyard:latest
```

