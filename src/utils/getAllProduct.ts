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

export interface Article {
  id: string;
  title: string;
  content: string;
  like: number;
  imageUrl: string;
  user: { nickname: string };
  createdAt: string;
}

// 모든상품가져오기
export const axiosProduct = async (): Promise<Product[]> => {
  const response = await axiosInstance.get("/product");
  return response.data;
};

//특정 상품 가져오기기
export const axiosProductById = async (productId: string) => {
  const response = await axiosInstance.get(`/product/${productId}`);
  return response.data;
};

//특정 상품의 댓글 가져오기
export const axiosProductComments = async (productId: string) => {
  const response = await axiosInstance.get(`/productComment/${productId}`);
  return response.data;
};

// 특정 상품에 댓글 작성하기
export const axiosCreateProductComment = async (
  productId: string,
  content: string
) => {
  const response = await axiosInstance.post("/productComment", {
    productId,
    content,
  });
  return response.data;
};

// 특정 상품의 댓글 삭제하기
export const axiosDeleteProductComment = async (commentId: string) => {
  const response = await axiosInstance.delete(`/productComment/${commentId}`);
  return response.data;
};

// 게시글 작성
export const axiosCreateArticle = async (
  userId: string,
  title: string,
  content: string
) => {
  const response = await axiosInstance.post("/article", {
    userId,
    title,
    content,
    imageUrl: "https://example.com/placeholder.jpg",
  });
  return response.data;
};

// 베스트 게시글 가져오기
export const getAllArticles = async (): Promise<Article[]> => {
  const response = await axiosInstance.get("/article/best");
  return response.data;
};

//모든 게시글 가져오기
export const axiosArticles = async (
  sort: "latest" | "like",
  search?: string
): Promise<Article[]> => {
  const response = await axiosInstance.get("/article", {
    params: { sort, search },
  });
  return response.data;
};
