import 'dotenv/config';
import cron from 'node-cron';
import { runBirthdayCheck } from './birthdays/birthday-check.js';
import { BirthdayRepository } from './database/birthday.repository.js';
import { MockWhatsAppClient } from './messaging/whatsapp-client.js';

const timeZone = process.env.TIMEZONE ?? 'Asia/Kolkata';
const cronExpression = process.env.BIRTHDAY_CHECK_CRON ?? '0 9 * * *';
function getRequiredEnvironment(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`${name} must be configured`);
  }

  return value;
}

const groupId = getRequiredEnvironment('WHATSAPP_GROUP_ID');

if (!cron.validate(cronExpression)) {
  throw new Error(`Invalid BIRTHDAY_CHECK_CRON expression: ${cronExpression}`);
}

function validateTimeZone(value: string): void {
  try {
    Intl.DateTimeFormat('en-CA', { timeZone: value });
  } catch {
    throw new Error(`Invalid TIMEZONE: ${value}`);
  }
}

validateTimeZone(timeZone);

async function main() {
  const client = new MockWhatsAppClient();
  await client.initialize();

  const repository = new BirthdayRepository();
  cron.schedule(cronExpression, () => {
    void runBirthdayCheck(client, repository, { groupId, timeZone }).catch((error: unknown) => {
      console.error('Birthday check failed', error);
    });
  }, { timezone: timeZone });

  console.log(`Birthday checks scheduled with "${cronExpression}" in ${timeZone}.`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
