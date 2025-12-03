import { useQuery } from '@tanstack/react-query';
import { productService } from '../../services/productService';

export const useProductDetails = (id: string | undefined) => {
  return useQuery({
    queryKey: ['product', id],
    queryFn: () => {
      if (!id) throw new Error('Product ID is required');
      return productService.getById(id);
    },
    enabled: !!id,
  });
};
