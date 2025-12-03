/**
 * @summary
 * External API routes configuration.
 * Handles public endpoints that don't require authentication.
 *
 * @module routes/externalRoutes
 */

import { Router } from 'express';
import * as categoryController from '@/api/external/category/controller';
import * as productController from '@/api/external/product/controller';

const router = Router();

/**
 * @rule {be-route-configuration}
 * Category routes - /api/external/categories
 */
router.get('/categories', categoryController.listHandler);

/**
 * @rule {be-route-configuration}
 * Product routes - /api/external/products
 */
router.get('/products', productController.listHandler);
router.get('/products/:id', productController.getHandler);

export default router;
