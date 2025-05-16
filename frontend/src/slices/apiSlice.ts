import {
  BaseQueryFn,
  createApi,
  EndpointBuilder as ReduxEndpointBuilder,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";

import { BASE_URL } from "../../constants.ts";

type EndpointBuilder = ReduxEndpointBuilder<
  BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError>,
  never,
  "api"
>;

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as { auth: { userInfo?: { token?: string } } })
      .auth.userInfo?.token;

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    return headers;
  },
});

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ["Product", "Order", "User"],
  endpoints: (builder: EndpointBuilder) => ({
    placeholder: builder.query<null, void>({
      query: () => "/",
    }),
  }),
});
