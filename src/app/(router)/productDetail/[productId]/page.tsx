"use client";

import { useParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { axiosProductById, Product } from "@/src/utils/getAllProduct";

export default function ProductDetail() {
  const { productId } = useParams();

  const {
    data: product,
    isLoading,
    error,
  } = useQuery<Product>({
    queryKey: ["product", productId],
    queryFn: () => axiosProductById(productId as string),
    enabled: !!productId,
  });


  console.log(product);

  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>데이터를 불러오는 중 오류가 발생했습니다.</div>;
  if (!product) return <div>상품을 찾을 수 없습니다.</div>;

  return (
    <div className="w-[1200px] h-[1257px] mx-auto mt-[20px] ">
      <div className="flex flex-row w-[1200px] h-[496px] ">
        <Image
          src="/productdetailImage.png"
          alt="productdetailImage"
          className="cursor-pointer rounded-lg"
          width={486}
          height={486}
        />
        <div className="ml-[24px]">
          <div className="text-[24px] font-semibold leading-[32px] text-left text-[#1F2937]">
            {product.name}
          </div>
          <div className="text-[40px] font-semibold leading-[47.73px] text-left text-[#1F2937] mt-[16px]">
            {product.price.toLocaleString()}원
          </div>
          <div className="border-b border-[#E5E7EB] w-[100] mx-auto mt-[16px] "></div>
          <div className="text-[16px] font-semibold leading-[26px] text-left text-[#4B5563] mt-[16px]">
            상품소개
          </div>
          <div className="text-[16px] font-normal leading-[26px] text-left text-[#4B5563] mt-[16px]">
            {product.description}
          </div>
          <div className="text-[16px] font-semibold leading-[26px] text-left text-[#4B5563] mt-[16px]">
            상품 태그
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {product?.tags?.map((tag, index) => (
              <div
                key={index}
                className="h-[36px] rounded-[26px] bg-[#F3F4F6] px-[16px] py-[6px] flex items-center justify-start text-[#1F2937] font-[500] text-[16px]"
              >
                #{tag}
              </div>
            ))}
          </div>
          <div className="mt-[62px] w-[690px] flex flex-row justify-between items-center">
            <div className="flex">
              <Image
                src="/userImage.png"
                alt="userImage"
                className=""
                width={40}
                height={40}
              />
              <div className="ml-[16px]">
                <div>{product.user?.nickname}</div>
                <div>
                  {new Date(product.createdAt).toLocaleDateString("ko-KR")}
                </div>
              </div>
            </div>
            <div className="flex gap-[10px] items-center rounded-[35px] border border-[#E5E7EB] px-[12px] py-[4px]">
              <Image
                src="/like.png"
                alt="like"
                className=""
                width={32}
                height={32}
              />
              <div className="text-[16px] font-[500] leading-[26px] text-left text-[#6B7280]">
                {product.like}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
