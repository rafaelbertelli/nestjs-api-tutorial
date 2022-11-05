```bash
sudo chmod +x .docker/start.sh
cp .env.example .env

docker compose up
npx prisma migrate dev

npm install
npm run start:dev
npm run start:prod
npm run test
npm run test:e2e
npm run test:cov
```

<https://www.youtube.com/watch?v=GHTA143_b-s>
2h42

Copiar o .env
Subir o container
Aplicar a migration

### Rodar o Prisma Studio com o banco de teste

```bash
npx dotenv -e .env.test -- prisma studio
```

### Sobe app (server+db)

```bash
docker compose up
# ou para subir com docker e rodando migration
npm run start:dev:docker
```

### Roda os testes e2e configurando um banco de teste

```bash
npm run test:e2e
```
