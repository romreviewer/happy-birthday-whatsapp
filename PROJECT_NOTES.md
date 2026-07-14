# WhatsApp Birthday Bot Project Notes

## Overview
A starter TypeScript bot was created to send birthday wishes to a WhatsApp group for friends whose birthdays match the current day.

## Current implementation
- Built a small Node.js + TypeScript project
- Added birthday matching logic
- Added message generation for birthday wishes
- Added a mock WhatsApp sender for local testing
- Added tests for birthday matching, timezone handling, message generation, and document mapping
- Switched from SQLite to MongoDB for persistence
- Configured the project to use a MongoDB Atlas connection string from a local environment file
- Reads active friends from MongoDB when the scheduled check runs
- Schedules daily checks using the configured cron expression and timezone
- Validates the cron expression, timezone, and required WhatsApp group ID at startup
- Includes a GitHub Actions workflow that runs the check daily at 9:00 AM Asia/Kolkata

## Tech stack
- Node.js
- TypeScript
- MongoDB
- dotenv
- node-cron
- TypeScript test runner

## Local environment
The project uses a local `.env` file for configuration.

Example variables:
```env
TIMEZONE=Asia/Kolkata
BIRTHDAY_CHECK_CRON=0 9 * * *
WHATSAPP_GROUP_ID=your_group_identifier
MONGO_URI=mongodb+srv://...
MONGO_DB_NAME=birthday_bot
```

## Security note
Sensitive values such as Mongo credentials should not be committed to GitHub. Use a local `.env` file and GitHub Secrets for deployment.

## Verification
The project was verified with:
```bash
npm test && npm run build
```

## Remaining next steps
- Replace the mock WhatsApp sender with a real WhatsApp integration
- Add wish-history persistence with an idempotency lock to prevent duplicate sends
