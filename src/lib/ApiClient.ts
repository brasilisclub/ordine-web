import Swagger from "swagger-client";
import { SwaggerSpec, SwaggerApiMethod } from "@/types/api";

const CONSTANTS = {
  CACHE_DURATION_MS: 24 * 60 * 60 * 1000, // 24h
  LOCAL_STORAGE_SPEC_KEY: "ordine_swagger_spec",
  LOCAL_STORAGE_TIMESTAMP_KEY: "ordine_swagger_spec_timestamp",
} as const;

class ClientError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ClientError";
  }
}

class Client {
  private swaggerClient: {
    apis: Record<string, Record<string, SwaggerApiMethod>>;
  } | null = null;
  private initialized = false;
  private initializationPromise: Promise<void> | null = null;
  private cachedSpec: SwaggerSpec | null = null;

  private constructor() {
    this.initializationPromise = this.initializeSync();
  }

  private static instance: Client;

  public static getInstance(): Client {
    if (!Client.instance) {
      Client.instance = new Client();
    }
    return Client.instance;
  }

  private getEnvConfig(): {
    apiBaseScheme: string;
    apiBaseHost: string;
    swaggerSpecPath: string;
  } {
    const apiBaseScheme = process.env.NEXT_PUBLIC_API_SCHEME;
    const apiBaseHost = process.env.NEXT_PUBLIC_API_HOST;
    const swaggerSpecPath = process.env.NEXT_PUBLIC_DOCS_PATH;

    if (!apiBaseScheme || !apiBaseHost || !swaggerSpecPath) {
      throw new ClientError(
        "Missing required API configuration environment variables",
      );
    }

    return { apiBaseScheme, apiBaseHost, swaggerSpecPath };
  }

  private isBrowser(): boolean {
    return typeof window !== "undefined" && typeof localStorage !== "undefined";
  }

  private getCachedSpec(): SwaggerSpec | null {
    if (this.cachedSpec) return this.cachedSpec;
    if (!this.isBrowser()) return null;

    try {
      const cachedSpecString = localStorage.getItem(
        CONSTANTS.LOCAL_STORAGE_SPEC_KEY,
      );
      const cachedTimestamp = localStorage.getItem(
        CONSTANTS.LOCAL_STORAGE_TIMESTAMP_KEY,
      );

      if (cachedSpecString && cachedTimestamp) {
        const timestamp = parseInt(cachedTimestamp, 10);

        if (Date.now() - timestamp < CONSTANTS.CACHE_DURATION_MS) {
          return JSON.parse(cachedSpecString);
        }
      }
    } catch (error) {
      console.error("Failed to retrieve cached Swagger spec:", error);
    }

    return null;
  }

  private cacheSpec(spec: SwaggerSpec): void {
    this.cachedSpec = spec;

    if (!this.isBrowser()) return;

    try {
      localStorage.setItem(
        CONSTANTS.LOCAL_STORAGE_SPEC_KEY,
        JSON.stringify(spec),
      );
      localStorage.setItem(
        CONSTANTS.LOCAL_STORAGE_TIMESTAMP_KEY,
        Date.now().toString(),
      );
    } catch (error) {
      console.error("Failed to cache Swagger spec:", error);
    }
  }

  private async initializeSync(): Promise<void> {
    if (this.initialized) return;

    const { apiBaseScheme, apiBaseHost, swaggerSpecPath } = this.getEnvConfig();
    const swaggerSpecUrl = `${apiBaseScheme}${apiBaseHost}${swaggerSpecPath}`;

    try {
      const spec: SwaggerSpec =
        this.getCachedSpec() || (await this.fetchAndCacheSpec(swaggerSpecUrl));

      const modifiedSpec: SwaggerSpec = {
        ...spec,
        schemes: [apiBaseScheme.replace("://", "")],
        host: apiBaseHost.replace(/^(https?:\/\/)/, ""),
      };

      this.swaggerClient = (await Swagger({
        spec: modifiedSpec,
      })) as {
        apis: Record<string, Record<string, SwaggerApiMethod>>;
      };

      this.initialized = true;
    } catch (error) {
      console.error("Error initializing Client:", error);
      throw new ClientError("Failed to initialize API client");
    }
  }

  private async fetchAndCacheSpec(url: string): Promise<SwaggerSpec> {
    const response = await fetch(url);
    if (!response.ok) {
      throw new ClientError(`HTTP error! status: ${response.status}`);
    }

    const fetchedSpec = (await response.json()) as SwaggerSpec;
    this.cacheSpec(fetchedSpec);
    return fetchedSpec;
  }

  public async getApi(
    apiName: string,
  ): Promise<Record<string, SwaggerApiMethod>> {
    await this.waitForInitialization();

    if (!this.swaggerClient) {
      throw new ClientError("Swagger client not initialized");
    }

    const api = this.swaggerClient.apis[apiName];
    if (!api) {
      throw new ClientError(`API ${apiName} not found`);
    }

    return api;
  }

  public async getAvailableApis(): Promise<string[]> {
    await this.waitForInitialization();
    return this.swaggerClient ? Object.keys(this.swaggerClient.apis) : [];
  }

  public isInitialized(): boolean {
    return this.initialized;
  }

  public async waitForInitialization(): Promise<void> {
    if (this.initialized) return;
    if (!this.initializationPromise) {
      this.initializationPromise = this.initializeSync();
    }
    return this.initializationPromise;
  }
}

const client = Client.getInstance();
export default client;
