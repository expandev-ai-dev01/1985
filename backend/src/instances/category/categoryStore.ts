/**
 * @summary
 * In-memory store instance for Category entity.
 * Provides singleton pattern for data storage without database.
 *
 * @module instances/category/categoryStore
 */

export interface CategoryRecord {
  id: number;
  name: string;
  active: boolean;
}

class CategoryStore {
  private records: CategoryRecord[] = [];

  constructor() {
    // Seed data
    this.records = [
      { id: 1, name: 'Sala de Estar', active: true },
      { id: 2, name: 'Quarto', active: true },
      { id: 3, name: 'Cozinha', active: true },
      { id: 4, name: 'Escritório', active: true },
      { id: 5, name: 'Banheiro', active: true },
      { id: 6, name: 'Área Externa', active: true },
    ];
  }

  getAll(): CategoryRecord[] {
    return this.records;
  }

  getById(id: number): CategoryRecord | undefined {
    return this.records.find((r) => r.id === id);
  }
}

export const categoryStore = new CategoryStore();
