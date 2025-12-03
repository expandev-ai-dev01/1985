import { publicClient } from '@/core/lib/api';
import type { Product } from '../types';

/**
 * @service ProductService
 * @domain Product
 */
export const productService = {
  /**
   * Fetches product details by ID
   */
  async getById(id: string): Promise<Product> {
    const { data } = await publicClient.get(`/products/${id}`);
    return data.data;
  },
};
