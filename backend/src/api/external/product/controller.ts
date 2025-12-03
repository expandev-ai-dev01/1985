/**
 * @summary
 * API controller for Product entity (External).
 * Handles public product catalog listing.
 *
 * @module api/external/product/controller
 */

import { Request, Response, NextFunction } from 'express';
import { successResponse, isServiceError, errorResponse } from '@/utils';
import { productList, productGetById } from '@/services/product';

/**
 * @api {get} /api/external/products List Products (Catalog)
 * @apiName ListProducts
 * @apiGroup Product
 *
 * @apiParam {Number} [page=1] Page number
 * @apiParam {Number} [limit=12] Items per page
 * @apiParam {String} [sort=recentes] Sort option (recentes, preco_asc, preco_desc, nome_asc)
 * @apiParam {Number} [category_id] Filter by category ID
 * @apiParam {String} [search] Search term for name/description
 *
 * @apiSuccess {Boolean} success Success flag (always true)
 * @apiSuccess {Object[]} data List of products
 * @apiSuccess {String} data.id Unique identifier
 * @apiSuccess {String} data.name Product name
 * @apiSuccess {Number} data.price Product price
 * @apiSuccess {String} data.mainImageUrl Main image URL
 * @apiSuccess {String} data.categoryName Category name
 * @apiSuccess {String} data.dimensions Product dimensions
 * @apiSuccess {Object} metadata Pagination metadata
 * @apiSuccess {Number} metadata.page Current page
 * @apiSuccess {Number} metadata.pageSize Items per page
 * @apiSuccess {Number} metadata.total Total items
 * @apiSuccess {Number} metadata.totalPages Total pages
 *
 * @apiError {Boolean} success Success flag (always false)
 * @apiError {String} error.code Error code (VALIDATION_ERROR)
 * @apiError {String} error.message Error message
 */
export async function listHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const data = await productList(req.query);
    res.json(successResponse(data.data, data.metadata));
  } catch (error) {
    if (isServiceError(error)) {
      res.status(error.statusCode).json(errorResponse(error.message, error.code, error.details));
      return;
    }
    next(error);
  }
}

/**
 * @api {get} /api/external/products/:id Get Product Details
 * @apiName GetProduct
 * @apiGroup Product
 *
 * @apiParam {String} id Product UUID
 *
 * @apiSuccess {Boolean} success Success flag (always true)
 * @apiSuccess {String} data.id Unique identifier
 * @apiSuccess {String} data.name Product name
 * @apiSuccess {String} data.referenceCode Reference code
 * @apiSuccess {String} data.description Product description
 * @apiSuccess {String} data.priceDisplay Price display text
 * @apiSuccess {String} data.mainImageUrl Main image URL
 * @apiSuccess {String[]} data.images Gallery images
 * @apiSuccess {Object} data.dimensions Dimensions object
 * @apiSuccess {Number} data.dimensions.height Height in cm
 * @apiSuccess {Number} data.dimensions.width Width in cm
 * @apiSuccess {Number} data.dimensions.depth Depth in cm
 * @apiSuccess {Number} [data.weight] Weight in kg
 * @apiSuccess {String[]} data.materials List of materials
 * @apiSuccess {String[]} [data.finishes] List of finishes
 * @apiSuccess {Object[]} [data.downloadableFiles] List of files
 * @apiSuccess {String} data.categoryName Category name
 * @apiSuccess {Object[]} data.relatedProducts Related products
 *
 * @apiError {Boolean} success Success flag (always false)
 * @apiError {String} error.code Error code (NOT_FOUND | VALIDATION_ERROR)
 * @apiError {String} error.message Error message
 */
export async function getHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const data = await productGetById(req.params);
    res.json(successResponse(data));
  } catch (error) {
    if (isServiceError(error)) {
      res.status(error.statusCode).json(errorResponse(error.message, error.code, error.details));
      return;
    }
    next(error);
  }
}
