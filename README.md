## Entwicklen

Development Server starten:

```bash
npm run dev
```

## Bauen

Production Server bauen:

```bash
npm run build
```

Preview vom Production Server starten:

```bash
npm run preview
```

## Deployen

Production Server starten:

Wichtig ist eine ENV-File mitzugeben, um die DB und die Ablage der Dateien zu konfigurieren

```bash
node --env-file=<file> build
```

## Prisma (ORM)

Benutzeroberfläche für die DB

```bash
npx prisma studio
```

Änderungen migrieren

```bash
npx prisma migrate dev --name <name>
```

Client generieren

```bash
npx prisma generate
```

## Environment Variablen

### DATABASE_URL

Für die Prisma DB

### HOST | PORT | ORIGIN

https://kit.svelte.dev/docs/adapter-node#environment-variables

## Auslieferung

- /build
- /node_modules <- generieren mit npm ci --omit dev / dann den generierten Prisma Client aus Projekt reintun, also /node_modules/.prisma
- /photos <- benamen wie man will und dann in env File eintragen
- /prisma <- schema.prisma und migrations Ordner sind wichtig
- .env <- Config
- package.json
- package-lock.json

## DB befüllen

```bash
npx prisma migrate deploy
```
