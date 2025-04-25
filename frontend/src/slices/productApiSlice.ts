import { PRODUCTS_URL } from "../../constants.ts";
import { apiSlice } from "./apiSlice.ts";
import { Product } from "../types.ts";

export const productApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<Product[], void>({
      query: () => ({
        url: PRODUCTS_URL,
      }),
      keepUnusedDataFor: 5,
    }),
    getProductById: builder.query<Product, string>({
      query: (id) => ({
        url: `${PRODUCTS_URL}/${id}`,
      }),
      keepUnusedDataFor: 5,
    }),
  }),
});
export const { useGetProductsQuery, useGetProductByIdQuery } = productApiSlice;
