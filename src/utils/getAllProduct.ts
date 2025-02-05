import axiosInstance from "@/src/lib/axios";

export interface Product {
  id: string;
  name: string;
  price: number;
  like: number;
  imageUrl: string;
  description: string;
  tags: string[];
  userId: string;
  user: {
    nickname: string;
  };
  createdAt: string;
}

export const axiosProduct = async (): Promise<Product[]> => {
  const response = await axiosInstance.get("/product");
  return response.data;
};

export const axiosProductById = async (productId: string) => {
  const response = await axiosInstance.get(`/product/${productId}`);
  return response.data;
};
