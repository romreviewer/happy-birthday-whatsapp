import { Friend } from '../types.js';

export interface BirthdayDocument {
  _id?: { toString(): string };
  id?: number;
  name: string;
  birth_day: number;
  birth_month: number;
  birth_year: number | null;
  whatsapp_id: string | null;
  nickname: string | null;
  active: number;
  created_at: string;
  updated_at: string;
}

export class BirthdayRepository {
  toFriend(document: BirthdayDocument): Friend {
    return {
      id: document.id ?? 0,
      name: document.name,
      birth_day: document.birth_day,
      birth_month: document.birth_month,
      birth_year: document.birth_year,
      whatsapp_id: document.whatsapp_id,
      nickname: document.nickname,
      active: document.active,
      created_at: document.created_at,
      updated_at: document.updated_at,
    };
  }
}
