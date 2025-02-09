import { producApi } from '@/api/productsApi.ts';
import type { Product } from '@/modules/products/interfaces/product.interface.ts';
import { getProductImageAction } from '@/modules/products/actions/index.ts';

export const getProductsAction = async (page: number = 1, limit: number = 10): Product[] => {
  try {
    console.log('llego 20', limit);
    const { data } = await producApi.get<Product[]>(`/products`, {
      params: {
        offset: page * limit,
        limit,
      },
    });
    console.log(data);
    return data.map((product: Product) => ({
      ...product,
      images: product.images.map(getProductImageAction),
    }));
  } catch (e) {
    console.log(e);
    throw new Error('Error getting products');
  }
};
