import { PRODUCTS_URL, UPLOAD_URL } from "../../constants.ts";
import { apiSlice } from "./apiSlice.ts";
import { Product, ProductUpdateInput } from "../types.ts";

export const productApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<Product[], void>({
      query: () => ({
        url: PRODUCTS_URL,
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
  }),
});

export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useUploadProductImageMutation,
  useDeleteProductMutation,
} = productApiSlice;
