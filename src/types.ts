export interface Friend {
  id: number;
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

export interface WishRecord {
  id: number;
  friend_id: number;
  wished_year: number;
  sent_at: string;
  status: string;
  message: string | null;
}
