export const getProductImageAction = (imageName: string): string => {
  return imageName.includes('http') ? imageName : `${import.meta.env.VITE_PRODUCTS_API_URL}/files/product/${imageName}`;
}
