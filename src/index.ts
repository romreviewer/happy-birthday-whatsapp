import 'dotenv/config';
import cron from 'node-cron';
import { getBirthdayMatches } from './birthdays/birthday.service.js';
import { BirthdayDocument, BirthdayRepository } from './database/birthday.repository.js';
import { connectToMongo } from './database/mongo.js';
import { generateBirthdayMessage } from './messaging/message-generator.js';
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

async function runBirthdayCheck(client: MockWhatsAppClient, repository: BirthdayRepository): Promise<void> {
  const db = await connectToMongo();
  const friendsCollection = db.collection<BirthdayDocument>('friends');
  const friends = (await friendsCollection.find({ active: 1 }).toArray()).map((doc) => repository.toFriend(doc));
  const matches = getBirthdayMatches(friends, new Date(), timeZone);

  if (matches.length === 0) {
    console.log('No birthdays today.');
    return;
  }

  for (const friend of matches) {
    const message = generateBirthdayMessage(friend);
    await client.sendGroupMessage(groupId, message);
    console.log(`Wished ${friend.name}`);
  }
}

async function main() {
  const client = new MockWhatsAppClient();
  await client.initialize();

  const repository = new BirthdayRepository();
  cron.schedule(cronExpression, () => {
    void runBirthdayCheck(client, repository).catch((error: unknown) => {
      console.error('Birthday check failed', error);
    });
  }, { timezone: timeZone });

  console.log(`Birthday checks scheduled with "${cronExpression}" in ${timeZone}.`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
