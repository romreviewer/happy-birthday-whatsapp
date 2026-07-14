export interface WhatsAppClient {
  initialize(): Promise<void>;
  sendGroupMessage(groupId: string, message: string, mentions?: string[]): Promise<void>;
}

export class MockWhatsAppClient implements WhatsAppClient {
  async initialize(): Promise<void> {
    // no-op for local development
  }

  async sendGroupMessage(groupId: string, message: string, mentions?: string[]): Promise<void> {
    console.log(`[mock-whatsapp] sending to ${groupId}`, { message, mentions });
  }
}
