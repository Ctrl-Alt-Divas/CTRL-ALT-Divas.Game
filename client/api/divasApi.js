import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const divasApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/api",
  }),
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (data) => ({
        url: `/auth/register`,
        method: "POST",
        body: { ...data },
      }),
    }),
    login: builder.mutation({
      query: (data) => ({
        url: "/auth/login",
        method: "POST",
        body: { ...data },
      }),
    }),
    score: builder.mutation({
      query: (data) => ({
        url: `/players/score`,
        method: "POST",
        body: { ...data },
      }),
    }),
    updateImage: builder.mutation({
      query: (data) => ({
        url: `/players/image`,
        method: "PATCH",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${data.token}`,
        },
        body: { ...data },
      }),
    }),
    getCharacters: builder.mutation({
      query: () => "/characters",
    }),
    getCharacterById: builder.query({
      query: (id) => `/characters/${id}`,
    }),
    getLeaderboard: builder.mutation({
      query: () => "/players/leaderboard",
    }),
  }),
});

export const {
  useUpdateImageMutation,
  useScoreMutation,
  useRegisterMutation,
  useLoginMutation,
  useGetCharacterByIdQuery,
  useGetCharactersMutation,
  useGetLeaderboardMutation,
} = divasApi;
