/**
 * @summary
 * Business logic for Category entity.
 * Handles operations related to product categories.
 *
 * @module services/category/categoryService
 */

import { categoryStore } from '@/instances';
import { CategoryListResponse } from './categoryTypes';

/**
 * @summary
 * Lists all active categories.
 *
 * @function categoryList
 * @module services/category
 *
 * @returns {Promise<CategoryListResponse[]>} List of active categories
 */
export async function categoryList(): Promise<CategoryListResponse[]> {
  const records = categoryStore.getAll();

  // Filter only active categories
  const activeCategories = records.filter((c) => c.active);

  return activeCategories.map((c) => ({
    id: c.id,
    name: c.name,
    active: c.active,
  }));
}
