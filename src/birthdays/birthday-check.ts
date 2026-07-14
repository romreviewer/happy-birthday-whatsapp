import { getBirthdayMatches } from './birthday.service.js';
import { BirthdayDocument, BirthdayRepository } from '../database/birthday.repository.js';
import { connectToMongo } from '../database/mongo.js';
import { generateBirthdayMessage } from '../messaging/message-generator.js';
import { WhatsAppClient } from '../messaging/whatsapp-client.js';

export interface BirthdayCheckConfig {
  groupId: string;
  timeZone: string;
}

export async function runBirthdayCheck(
  client: WhatsAppClient,
  repository: BirthdayRepository,
  { groupId, timeZone }: BirthdayCheckConfig,
): Promise<void> {
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
