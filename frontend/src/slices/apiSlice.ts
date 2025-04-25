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

const baseQuery = fetchBaseQuery({ baseUrl: BASE_URL });

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ["Product", "Order", "User"],
  endpoints: (builder: EndpointBuilder) => ({
    placeholder: builder.query<null, void>({
      query: () => "/",
    }),
  }),
});
