import { createApi } from "@reduxjs/toolkit/query/react";
import { invokeBaseQuery } from "./base/invokeBaseQuery";
import { ALL_TAGS } from "./tags";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: invokeBaseQuery({ baseUrl: "/api/" }),
  tagTypes: ALL_TAGS,
  endpoints: () => ({}),
});
