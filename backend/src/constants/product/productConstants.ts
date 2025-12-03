/**
 * @summary
 * Constants for Product entity.
 * Defines sort options and validation limits.
 *
 * @module constants/product/productConstants
 */

/**
 * @interface ProductSortOptionsType
 * @description Available sort options for product listing.
 */
export const PRODUCT_SORT_OPTIONS = {
  RECENT: 'recentes',
  PRICE_ASC: 'preco_asc',
  PRICE_DESC: 'preco_desc',
  NAME_ASC: 'nome_asc',
} as const;

export type ProductSortOption = (typeof PRODUCT_SORT_OPTIONS)[keyof typeof PRODUCT_SORT_OPTIONS];

/**
 * @interface ProductLimitsType
 * @description Validation constraints for Product entity.
 */
export const PRODUCT_LIMITS = {
  NAME_MAX_LENGTH: 200,
  DESCRIPTION_MAX_LENGTH: 2000,
  DIMENSIONS_MAX_LENGTH: 100,
} as const;
