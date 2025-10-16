// Storage interface for portfolio (static site - no backend storage needed)
export interface IStorage {}

export class MemStorage implements IStorage {
  constructor() {}
}

export const storage = new MemStorage();
