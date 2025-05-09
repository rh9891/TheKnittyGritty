import { apiSlice } from "./apiSlice.ts";
import { ORDERS_URL } from "../../constants.ts";

export const ordersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (order) => ({
        url: ORDERS_URL,
        method: "POST",
        body: { ...order },
      }),
      invalidatesTags: ["Order"],
    }),
    getOrders: builder.query({
      query: () => ORDERS_URL,
      providesTags: ["Order"],
    }),
  }),
});

export const { useCreateOrderMutation, useGetOrdersQuery } = ordersApiSlice;
