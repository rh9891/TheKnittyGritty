import { USERS_URL } from "../../constants.ts";
import { apiSlice } from "./apiSlice.ts";
import type { LoginRequest, UserResponse } from "../types.ts";

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<UserResponse, LoginRequest>({
      query: (credentials) => ({
        url: `${USERS_URL}/login`,
        method: "POST",
        body: credentials,
      }),
    }),
    register: builder.mutation<UserResponse, LoginRequest>({
      query: (credentials) => ({
        url: `${USERS_URL}`,
        method: "POST",
        body: credentials,
      }),
    }),
    logout: builder.mutation<UserResponse, void>({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: "POST",
      }),
    }),
    profile: builder.mutation({
      query: (profile) => ({
        url: `${USERS_URL}/profile`,
        method: "PUT",
        body: profile,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useProfileMutation,
} = usersApiSlice;
