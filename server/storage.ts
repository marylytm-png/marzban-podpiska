// Storage interface for Marzban Subscription Proxy
// This app doesn't need persistent storage, only environment variables

export interface IStorage {
  // No storage methods needed for this proxy app
}

export class MemStorage implements IStorage {
  constructor() {}
}

export const storage = new MemStorage();
