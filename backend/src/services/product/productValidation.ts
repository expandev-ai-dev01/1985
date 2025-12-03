/**
 * @summary
 * Validation schemas for Product service.
 *
 * @module services/product/productValidation
 */

import { z } from 'zod';
import { PRODUCT_SORT_OPTIONS } from '@/constants/product';

export const productListSchema = z.object({
  page: z.coerce.number().int().positive().optional().default(1),
  limit: z.coerce.number().int().positive().max(100).optional().default(12),
  sort: z
    .enum([
      PRODUCT_SORT_OPTIONS.RECENT,
      PRODUCT_SORT_OPTIONS.PRICE_ASC,
      PRODUCT_SORT_OPTIONS.PRICE_DESC,
      PRODUCT_SORT_OPTIONS.NAME_ASC,
    ])
    .optional()
    .default(PRODUCT_SORT_OPTIONS.RECENT),
  category_id: z.coerce.number().int().positive().optional(),
  search: z.string().optional(),
});

export const productGetSchema = z.object({
  id: z.string().uuid(),
});

export type ProductListInput = z.infer<typeof productListSchema>;
export type ProductGetInput = z.infer<typeof productGetSchema>;
