import test from 'node:test';
import assert from 'node:assert/strict';
import { generateBirthdayMessage } from '../src/messaging/message-generator.js';

test('generateBirthdayMessage personalizes message with nickname', () => {
  const message = generateBirthdayMessage({
    id: 1,
    name: 'Aman',
    nickname: 'Ami',
    birth_day: 14,
    birth_month: 7,
    birth_year: 1997,
    whatsapp_id: null,
    active: 1,
    created_at: '2024-01-01',
    updated_at: '2024-01-01',
  });

  assert.match(message, /Ami/);
  assert.match(message, /Happy Birthday/i);
});
