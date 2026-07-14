import 'dotenv/config';
import { runBirthdayCheck } from './birthdays/birthday-check.js';
import { BirthdayRepository } from './database/birthday.repository.js';
import { closeMongo } from './database/mongo.js';
import { MockWhatsAppClient } from './messaging/whatsapp-client.js';

function getRequiredEnvironment(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`${name} must be configured`);
  }

  return value;
}

const timeZone = process.env.TIMEZONE ?? 'Asia/Kolkata';
const groupId = getRequiredEnvironment('WHATSAPP_GROUP_ID');

async function main(): Promise<void> {
  const client = new MockWhatsAppClient();
  await client.initialize();

  try {
    await runBirthdayCheck(client, new BirthdayRepository(), { groupId, timeZone });
  } finally {
    await closeMongo();
  }
}

main().catch((error: unknown) => {
  console.error('Birthday check failed', error);
  process.exitCode = 1;
});
