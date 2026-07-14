import { Friend } from '../types.js';

const templates = [
  '🎉 Happy Birthday, {name}! 🥳 Wishing you an amazing year ahead. Party pending! 🎂',
  '🥳 Happy Birthday, {name}! Hope you have a fantastic day and an even better year ahead! 🎉',
  '🎂 Happy Birthday, {name}! Wishing you lots of happiness, success, and good memories this year. 🎉',
];

export function generateBirthdayMessage(friend: Friend): string {
  const template = templates[Math.floor(Math.random() * templates.length)];
  const displayName = friend.nickname ?? friend.name;
  return template.replace('{name}', displayName);
}
