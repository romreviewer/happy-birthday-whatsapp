# WhatsApp Birthday Bot

A TypeScript and MongoDB service that finds friends whose birthday is today and sends a birthday wish to a WhatsApp group on a daily schedule.

## Features

- Finds active friends whose birthday matches the current date.
- Uses the configured IANA timezone (for example, `Asia/Kolkata`) when deciding which date is “today”.
- Loads friends from a MongoDB `friends` collection.
- Generates a personalised message using a nickname when one is available.
- Runs automatically from a configurable cron schedule.
- Validates the cron expression, timezone, and WhatsApp group ID at startup.
- Includes a mock WhatsApp client for safe local development.
- Has automated tests for birthday matching, timezone handling, message generation, and MongoDB document mapping.

## Requirements

- Node.js 18 or later
- A MongoDB instance or MongoDB Atlas cluster
- A WhatsApp group identifier (the current client logs messages locally; see [Production notes](#production-notes))

## Getting started

1. Install dependencies:
   ```bash
   npm install
   ```
2. Copy the example environment file:
   ```bash
   cp .env.example .env
   ```
3. Configure `.env`:

   ```env
   TIMEZONE=Asia/Kolkata
   BIRTHDAY_CHECK_CRON=0 9 * * *
   WHATSAPP_GROUP_ID=your_group_identifier
   MONGO_URI=mongodb://127.0.0.1:27017
   MONGO_DB_NAME=birthday_bot
   ```

4. Add active friends to the `friends` collection. A document uses this shape:

   ```json
   {
     "id": 1,
     "name": "Aman",
     "nickname": "Ami",
     "birth_day": 14,
     "birth_month": 7,
     "birth_year": 1997,
     "whatsapp_id": null,
     "active": 1,
     "created_at": "2026-01-01T00:00:00.000Z",
     "updated_at": "2026-01-01T00:00:00.000Z"
   }
   ```

5. Run the bot. It remains running and executes at `BIRTHDAY_CHECK_CRON`:

   ```bash
   npm run dev
   ```

For the compiled application, use:

```bash
npm run build
npm start
```

## Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Run the TypeScript source locally. |
| `npm test` | Run the automated test suite. |
| `npm run build` | Compile TypeScript into `dist/`. |
| `npm start` | Run the compiled service. |
| `npm run birthday:check` | Run one birthday check and exit (run `npm run build` first). |

## GitHub Actions scheduling

This repository includes a GitHub Actions workflow that runs the birthday check
every day at 9:00 AM Asia/Kolkata (3:30 AM UTC). You can also start it manually
from the repository's **Actions** tab.

Before enabling it, add these repository secrets under **Settings → Secrets and
variables → Actions**:

- `MONGO_URI`
- `MONGO_DB_NAME`
- `WHATSAPP_GROUP_ID`

The workflow runs `npm ci`, `npm run build`, and `npm run birthday:check`.

## Production notes

- The bundled WhatsApp client is a mock and only logs messages. Replace it with a real WhatsApp integration before deploying.
- Do not commit `.env`; it is excluded by `.gitignore`. Use deployment secrets for MongoDB credentials and other sensitive values.
- Add idempotent wish-history storage before enabling retries or another scheduler,
  to prevent duplicate messages.

## Roadmap

- Replace the mock WhatsApp client with a real integration
- Add a wish-history collection with an idempotency lock, so retries or multiple
  bot instances cannot send duplicate wishes
- Deploy the long-running process (or invoke an equivalent scheduled job)
