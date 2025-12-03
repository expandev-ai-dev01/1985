/**
 * @summary
 * Type definitions for Product service.
 *
 * @module services/product/productTypes
 */

import { ProductSortOption } from '@/constants/product';

export interface ProductListParams {
  page?: number;
  limit?: number;
  sort?: ProductSortOption;
  category_id?: number;
  search?: string;
}

export interface ProductListItem {
  id: string;
  name: string;
  price: number;
  mainImageUrl: string;
  categoryName: string;
  dimensions: string;
}

export interface ProductListResponse {
  data: ProductListItem[];
  metadata: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
}

export interface ProductDetailResponse {
  id: string;
  name: string;
  referenceCode: string;
  description: string;
  priceDisplay: string;
  mainImageUrl: string;
  images: string[];
  dimensions: {
    height: number;
    width: number;
    depth: number;
  };
  weight?: number;
  materials: string[];
  finishes?: string[];
  downloadableFiles?: {
    fileName: string;
    fileType: string;
    fileSize: string;
    fileUrl: string;
  }[];
  categoryName: string;
  relatedProducts: {
    id: string;
    name: string;
    mainImageUrl: string;
  }[];
}
