
import { useQuery } from '@tanstack/react-query';

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

export interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

const fetchProducts = async (limit = 30, skip = 0, search = ''): Promise<ProductsResponse> => {
  const baseUrl = 'https://dummyjson.com/products';
  let url = `${baseUrl}?limit=${limit}&skip=${skip}`;
  
  if (search) {
    url = `${baseUrl}/search?q=${encodeURIComponent(search)}&limit=${limit}&skip=${skip}`;
  }
  
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }
  return response.json();
};

const fetchProductsByCategory = async (category: string, limit = 30): Promise<ProductsResponse> => {
  const response = await fetch(`https://dummyjson.com/products/category/${category}?limit=${limit}`);
  if (!response.ok) {
    throw new Error('Failed to fetch products by category');
  }
  return response.json();
};

export const useProducts = (limit = 30, skip = 0, search = '') => {
  return useQuery({
    queryKey: ['products', limit, skip, search],
    queryFn: () => fetchProducts(limit, skip, search),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useProductsByCategory = (category: string, limit = 30) => {
  return useQuery({
    queryKey: ['products', 'category', category, limit],
    queryFn: () => fetchProductsByCategory(category, limit),
    enabled: !!category,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useSearchProducts = (query: string, limit = 30) => {
  return useQuery({
    queryKey: ['products', 'search', query, limit],
    queryFn: () => fetchProducts(limit, 0, query),
    enabled: query.length > 0,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
