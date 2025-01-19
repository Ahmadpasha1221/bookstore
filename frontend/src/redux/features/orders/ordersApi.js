import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const ordersApi = createApi({
  reducerPath: "ordersApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/api/orders",
    credentials: "include",
  }),
  tagTypes: ["orders"],
  endpoints: (builder) => ({
    postOrder: builder.mutation({
      query: (b) => ({
        url: "/create-order",
        method: "POST",
        body: b,
      }),
      invalidatesTags: ["orders"],
    }),
    getOrders: builder.query({
      query: (email) => `/${email}`,
      providesTags: ["orders"],
    }),
  }),
});
export const { usePostOrderMutation, useGetOrdersQuery } = ordersApi;
export default ordersApi;
