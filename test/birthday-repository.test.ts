import test from 'node:test';
import assert from 'node:assert/strict';
import { BirthdayRepository } from '../src/database/birthday.repository.js';

test('BirthdayRepository maps a document into a Friend shape', () => {
  const repository = new BirthdayRepository();
  const friend = repository.toFriend({
    _id: { toString: () => 'mongo-id' },
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

  assert.equal(friend.id, 1);
  assert.equal(friend.name, 'Aman');
  assert.equal(friend.nickname, 'Ami');
});
