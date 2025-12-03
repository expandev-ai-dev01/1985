/**
 * @summary
 * API controller for Category entity (External).
 * Handles public category listing.
 *
 * @module api/external/category/controller
 */

import { Request, Response, NextFunction } from 'express';
import { successResponse, isServiceError, errorResponse } from '@/utils';
import { categoryList } from '@/services/category';

/**
 * @api {get} /api/external/categories List Categories
 * @apiName ListCategories
 * @apiGroup Category
 *
 * @apiSuccess {Boolean} success Success flag (always true)
 * @apiSuccess {Object[]} data List of categories
 * @apiSuccess {Number} data.id Unique identifier
 * @apiSuccess {String} data.name Category name
 * @apiSuccess {Boolean} data.active Active status
 */
export async function listHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const data = await categoryList();
    res.json(successResponse(data));
  } catch (error) {
    if (isServiceError(error)) {
      res.status(error.statusCode).json(errorResponse(error.message, error.code, error.details));
      return;
    }
    next(error);
  }
}
