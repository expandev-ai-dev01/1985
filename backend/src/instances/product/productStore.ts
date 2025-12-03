/**
 * @summary
 * In-memory store instance for Product entity.
 * Provides singleton pattern for data storage without database.
 *
 * @module instances/product/productStore
 */

export interface ProductDimensions {
  height: number;
  width: number;
  depth: number;
}

export interface ProductFile {
  fileName: string;
  fileType: string;
  fileSize: string;
  fileUrl: string;
}

export interface ProductRecord {
  id: string;
  name: string;
  referenceCode: string;
  description: string;
  price: number;
  dimensions: ProductDimensions;
  weight?: number;
  materials: string[];
  finishes?: string[];
  mainImageUrl: string;
  additionalImages: string[];
  downloadableFiles?: ProductFile[];
  categoryId: number;
  collectionId?: number;
  relatedProductIds?: string[];
  active: boolean;
  dateCreated: string;
}

class ProductStore {
  private records: ProductRecord[] = [];

  constructor() {
    // Seed data
    const now = new Date().toISOString();
    this.records = [
      {
        id: '550e8400-e29b-41d4-a716-446655440000',
        name: 'Sofá Retrátil 3 Lugares Conforto',
        referenceCode: 'SOF-001',
        description: 'Sofá extremamente confortável com assentos retráteis e encosto reclinável.',
        price: 2499.9,
        dimensions: { height: 95, width: 210, depth: 100 },
        weight: 85.5,
        materials: ['Madeira Eucalipto', 'Espuma D33', 'Veludo'],
        finishes: ['Cinza', 'Bege', 'Azul Marinho'],
        mainImageUrl:
          'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=2070&auto=format&fit=crop',
        additionalImages: [
          'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?q=80&w=2070&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1550226891-ef816aed4a98?q=80&w=2070&auto=format&fit=crop',
        ],
        categoryId: 1,
        active: true,
        dateCreated: now,
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440001',
        name: 'Mesa de Jantar Madeira Maciça',
        referenceCode: 'MES-002',
        description: 'Mesa elegante para 6 lugares, acabamento em verniz fosco.',
        price: 1899.0,
        dimensions: { height: 78, width: 160, depth: 90 },
        weight: 45.0,
        materials: ['Madeira Maciça', 'Verniz'],
        mainImageUrl:
          'https://images.unsplash.com/photo-1617806118233-18e1de247200?q=80&w=1932&auto=format&fit=crop',
        additionalImages: [],
        categoryId: 3,
        active: true,
        dateCreated: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440002',
        name: 'Cadeira de Escritório Ergonômica',
        referenceCode: 'CAD-003',
        description: 'Cadeira com ajustes de altura e inclinação, ideal para longas jornadas.',
        price: 899.5,
        dimensions: { height: 110, width: 60, depth: 60 },
        weight: 12.0,
        materials: ['Metal', 'Plástico', 'Tela Mesh'],
        mainImageUrl:
          'https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?q=80&w=2070&auto=format&fit=crop',
        additionalImages: [],
        downloadableFiles: [
          {
            fileName: 'Manual de Montagem',
            fileType: 'PDF',
            fileSize: '1.2 MB',
            fileUrl: 'https://example.com/manual-cadeira.pdf',
          },
        ],
        categoryId: 4,
        active: true,
        dateCreated: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440003',
        name: 'Cama Queen Size Estofada',
        referenceCode: 'CAM-004',
        description: 'Cama com cabeceira estofada em linho cinza.',
        price: 3200.0,
        dimensions: { height: 120, width: 160, depth: 200 },
        materials: ['Madeira', 'Linho', 'Espuma'],
        mainImageUrl:
          'https://images.unsplash.com/photo-1505693416388-b0346efee535?q=80&w=2070&auto=format&fit=crop',
        additionalImages: [],
        categoryId: 2,
        active: true,
        dateCreated: new Date(Date.now() - 259200000).toISOString(), // 3 days ago
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440004',
        name: 'Poltrona Decorativa Veludo',
        referenceCode: 'POL-005',
        description: 'Poltrona moderna com pés palito e tecido aveludado.',
        price: 750.0,
        dimensions: { height: 85, width: 70, depth: 75 },
        materials: ['Madeira', 'Veludo'],
        mainImageUrl:
          'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?q=80&w=1974&auto=format&fit=crop',
        additionalImages: [],
        categoryId: 1,
        active: true,
        dateCreated: new Date(Date.now() - 345600000).toISOString(), // 4 days ago
      },
      {
        id: '550e8400-e29b-41d4-a716-446655440005',
        name: 'Guarda-Roupa Casal com Espelho',
        referenceCode: 'GUA-006',
        description: 'Amplo espaço interno com 3 portas de correr.',
        price: 2100.0,
        dimensions: { height: 230, width: 240, depth: 55 },
        materials: ['MDF', 'Espelho'],
        mainImageUrl:
          'https://images.unsplash.com/photo-1595428774223-ef52624120d2?q=80&w=1974&auto=format&fit=crop',
        additionalImages: [],
        categoryId: 2,
        active: true,
        dateCreated: new Date(Date.now() - 432000000).toISOString(), // 5 days ago
      },
    ];
  }

  getAll(): ProductRecord[] {
    return this.records;
  }

  getById(id: string): ProductRecord | undefined {
    return this.records.find((r) => r.id === id);
  }
}

export const productStore = new ProductStore();
