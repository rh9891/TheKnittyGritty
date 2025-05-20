import { USERS_URL } from "../../../shared/constants.ts";
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
    getUsers: builder.query<UserResponse[], void>({
      query: () => ({
        url: USERS_URL,
      }),
      providesTags: ["User"],
      keepUnusedDataFor: 5,
    }),
    deleteUser: builder.mutation<UserResponse, string>({
      query: (id) => ({
        url: `${USERS_URL}/${id}`,
        method: "DELETE",
      }),
    }),
    getUserById: builder.query<UserResponse, string>({
      query: (id) => ({
        url: `${USERS_URL}/${id}`,
      }),
      keepUnusedDataFor: 5,
    }),
    updateUser: builder.mutation<UserResponse, UserResponse>({
      query: (user) => ({
        url: `${USERS_URL}/${user._id}`,
        method: "PUT",
        body: user,
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useProfileMutation,
  useGetUsersQuery,
  useDeleteUserMutation,
  useGetUserByIdQuery,
  useUpdateUserMutation,
} = usersApiSlice;
