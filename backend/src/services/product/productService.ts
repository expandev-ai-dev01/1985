/**
 * @summary
 * Business logic for Product entity.
 * Handles catalog listing, filtering, sorting and pagination.
 *
 * @module services/product/productService
 */

import { productStore, categoryStore, ProductRecord } from '@/instances';
import { ServiceError } from '@/utils';
import { PRODUCT_SORT_OPTIONS } from '@/constants/product';
import { ProductListResponse, ProductDetailResponse } from './productTypes';
import { productListSchema, productGetSchema } from './productValidation';

/**
 * @summary
 * Lists products with filtering, sorting and pagination.
 *
 * @function productList
 * @module services/product
 *
 * @param {unknown} params - Query parameters for filtering and pagination
 * @returns {Promise<ProductListResponse>} Paginated list of products
 *
 * @throws {ServiceError} VALIDATION_ERROR (400) - When params fail validation
 */
export async function productList(params: unknown): Promise<ProductListResponse> {
  const validation = productListSchema.safeParse(params);

  if (!validation.success) {
    throw new ServiceError('VALIDATION_ERROR', 'Invalid parameters', 400, validation.error.errors);
  }

  const { page, limit, sort, category_id, search } = validation.data;

  // 1. Get all active products
  let products = productStore.getAll().filter((p) => p.active);

  // 2. Apply Category Filter
  if (category_id) {
    products = products.filter((p) => p.categoryId === category_id);
  }

  // 3. Apply Search Filter
  if (search) {
    const searchLower = search.toLowerCase();
    products = products.filter(
      (p) =>
        p.name.toLowerCase().includes(searchLower) ||
        p.description.toLowerCase().includes(searchLower)
    );
  }

  // 4. Apply Sorting
  products.sort((a, b) => {
    switch (sort) {
      case PRODUCT_SORT_OPTIONS.PRICE_ASC:
        return a.price - b.price;
      case PRODUCT_SORT_OPTIONS.PRICE_DESC:
        return b.price - a.price;
      case PRODUCT_SORT_OPTIONS.NAME_ASC:
        return a.name.localeCompare(b.name);
      case PRODUCT_SORT_OPTIONS.RECENT:
      default:
        // Sort by dateCreated desc (newest first)
        return new Date(b.dateCreated).getTime() - new Date(a.dateCreated).getTime();
    }
  });

  // 5. Pagination
  const total = products.length;
  const totalPages = Math.ceil(total / limit);
  const startIndex = (page - 1) * limit;
  const paginatedProducts = products.slice(startIndex, startIndex + limit);

  // 6. Map to Response
  const data = paginatedProducts.map((p) => {
    const category = categoryStore.getById(p.categoryId);
    return {
      id: p.id,
      name: p.name,
      price: p.price,
      mainImageUrl: p.mainImageUrl,
      categoryName: category ? category.name : 'Unknown',
      dimensions: `A: ${p.dimensions.height}cm L: ${p.dimensions.width}cm P: ${p.dimensions.depth}cm`,
    };
  });

  return {
    data,
    metadata: {
      page,
      pageSize: limit,
      total,
      totalPages,
    },
  };
}

/**
 * @summary
 * Retrieves detailed information for a specific product.
 *
 * @function productGetById
 * @module services/product
 *
 * @param {unknown} params - Request parameters containing product ID
 * @returns {Promise<ProductDetailResponse>} Detailed product information
 *
 * @throws {ServiceError} VALIDATION_ERROR (400) - When ID is invalid
 * @throws {ServiceError} NOT_FOUND (404) - When product does not exist
 */
export async function productGetById(params: unknown): Promise<ProductDetailResponse> {
  const validation = productGetSchema.safeParse(params);

  if (!validation.success) {
    throw new ServiceError('VALIDATION_ERROR', 'Invalid ID', 400, validation.error.errors);
  }

  const { id } = validation.data;
  const product = productStore.getById(id);

  if (!product) {
    throw new ServiceError('NOT_FOUND', 'Product not found', 404);
  }

  const category = categoryStore.getById(product.categoryId);

  // Related Products Logic
  // Priority: 1. Manual (relatedProductIds) -> 2. Collection -> 3. Category
  let related: ProductRecord[] = [];
  const allProducts = productStore.getAll().filter((p) => p.active && p.id !== id);

  if (product.relatedProductIds && product.relatedProductIds.length > 0) {
    related = allProducts.filter((p) => product.relatedProductIds!.includes(p.id));
  } else if (product.collectionId) {
    related = allProducts.filter((p) => p.collectionId === product.collectionId);
  }

  // Fallback to category if no related products found yet
  if (related.length === 0) {
    related = allProducts.filter((p) => p.categoryId === product.categoryId);
  }

  // Limit to 4 related products
  const relatedMapped = related.slice(0, 4).map((p) => ({
    id: p.id,
    name: p.name,
    mainImageUrl: p.mainImageUrl,
  }));

  return {
    id: product.id,
    name: product.name,
    referenceCode: product.referenceCode,
    description: product.description,
    priceDisplay: 'Sob Consulta',
    mainImageUrl: product.mainImageUrl,
    images: [product.mainImageUrl, ...product.additionalImages],
    dimensions: product.dimensions,
    weight: product.weight,
    materials: product.materials,
    finishes: product.finishes,
    downloadableFiles: product.downloadableFiles,
    categoryName: category ? category.name : 'Unknown',
    relatedProducts: relatedMapped,
  };
}
