import { PRODUCTS_URL, UPLOAD_URL } from "../../../shared/constants.ts";
import { apiSlice } from "./apiSlice.ts";
import { Product, ProductUpdateInput } from "../types.ts";

type GetProductsQueryArgs = {
  pageNumber?: number;
};

type GetProductsResponse = {
  products: Product[];
  page: number;
  pages: number;
};

type ProductStatsResponse = {
  totalProducts: number;
  lowStockCount: number;
  outOfStockCount: number;
};

export const productApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<GetProductsResponse, GetProductsQueryArgs>({
      query: ({ pageNumber }) => ({
        url: PRODUCTS_URL,
        params: {
          pageNumber,
        },
      }),
      providesTags: ["Product"],
      keepUnusedDataFor: 5,
    }),
    getProductStats: builder.query<ProductStatsResponse, void>({
      query: () => ({
        url: `${PRODUCTS_URL}?preview=true`,
      }),
      providesTags: ["Product"],
      keepUnusedDataFor: 5,
    }),
    getProductById: builder.query<Product, string>({
      query: (id) => ({
        url: `${PRODUCTS_URL}/${id}`,
      }),
      keepUnusedDataFor: 5,
    }),
    createProduct: builder.mutation<Product, void>({
      query: () => ({
        url: PRODUCTS_URL,
        method: "POST",
      }),
      invalidatesTags: ["Product"],
    }),
    updateProduct: builder.mutation<Product, ProductUpdateInput>({
      query: (product) => ({
        url: `${PRODUCTS_URL}/${product._id}`,
        method: "PUT",
        body: product,
      }),
      invalidatesTags: ["Product"],
    }),
    uploadProductImage: builder.mutation<
      { message: string; image: string },
      FormData
    >({
      query: (formData) => ({
        url: UPLOAD_URL,
        method: "POST",
        body: formData,
      }),
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `${PRODUCTS_URL}/${id}`,
        method: "DELETE",
      }),
    }),
    createReview: builder.mutation({
      query: ({ productId, review }) => ({
        url: `${PRODUCTS_URL}/${productId}/reviews`,
        method: "POST",
        body: review,
      }),
      invalidatesTags: ["Product"],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductStatsQuery,
  useGetProductByIdQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useUploadProductImageMutation,
  useDeleteProductMutation,
  useCreateReviewMutation,
} = productApiSlice;
