/**
 * Base response structure for all API endpoints
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface ServerResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}

/**
 * Success response helper
 */
export const createSuccessResponse = <T>(data: T): ServerResponse<T> => ({
  success: true,
  data,
});

/**
 * Error response helper
 */
export const createErrorResponse = <T>(error: string): ServerResponse<T> => ({
  success: false,
  error,
});
