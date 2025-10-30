import type { BaseQueryFn } from "@reduxjs/toolkit/query/react";
import type { ServerResponse } from "../server-dtos/base.dto";
import { invoke } from "@forge/bridge";

interface InvokePayload {
  [key: string]: unknown;
}

export const invokeBaseQuery =
  (
    { baseUrl }: { baseUrl?: string } = { baseUrl: "/api" }
  ): BaseQueryFn<
    {
      url: string;
      data?: InvokePayload | undefined;
    },
    unknown,
    unknown
  > =>
  async ({ url, data }) => {
    try {
      const result: ServerResponse<unknown> = await invoke(
        `${baseUrl}${url}`,
        data
      );

      if (!result.success) {
        throw new Error(result.error);
      }

      return { data: result.data };
    } catch (error) {
      const err = error as Error;
      return {
        error: {
          status: err.message,
          data: err.message,
        },
      };
    }
  };
