import test from 'node:test';
import assert from 'node:assert/strict';
import { getBirthdayMatches } from '../src/birthdays/birthday.service.js';

test('getBirthdayMatches returns friends for today', () => {
  const today = new Date('2026-07-14T10:00:00Z');
  const friends = [
    {
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
    },
    {
      id: 2,
      name: 'Rahul',
      nickname: 'R',
      birth_day: 15,
      birth_month: 7,
      birth_year: 1996,
      whatsapp_id: null,
      active: 1,
      created_at: '2024-01-01',
      updated_at: '2024-01-01',
    },
  ];

  const matches = getBirthdayMatches(friends, today);
  assert.equal(matches.length, 1);
  assert.equal(matches[0].name, 'Aman');
});

test('getBirthdayMatches uses the supplied timezone', () => {
  const friends = [{
    id: 1,
    name: 'Aman',
    nickname: null,
    birth_day: 15,
    birth_month: 7,
    birth_year: null,
    whatsapp_id: null,
    active: 1,
    created_at: '2024-01-01',
    updated_at: '2024-01-01',
  }];

  const matches = getBirthdayMatches(friends, new Date('2026-07-14T20:00:00Z'), 'Asia/Kolkata');
  assert.equal(matches.length, 1);
});
