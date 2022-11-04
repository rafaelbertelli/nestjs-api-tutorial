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

Copiar o .env
Subir o container
Aplicar a migration
