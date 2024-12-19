/* eslint-disable @typescript-eslint/no-explicit-any */
export interface ApiResponse {
  status: number;
  body: any;
  data: any;
  headers: Record<string, string>;
}

export interface SwaggerSpec {
  swagger: string;
  info: {
    title: string;
    version: string;
  };
  host?: string;
  basePath?: string;
  schemes?: string[];
  paths: Record<string, unknown>;
  [key: string]: unknown;
}

export type SwaggerApiMethod = (
  parameters?: Record<string, unknown>,
) => Promise<ApiResponse>;
