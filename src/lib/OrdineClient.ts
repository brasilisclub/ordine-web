import Swagger from 'swagger-client';

const CONSTANTS = {
  CACHE_DURATION_MS: 24 * 60 * 60 * 1000, // 24h
  LOCAL_STORAGE_SPEC_KEY: 'ordine_swagger_spec',
  LOCAL_STORAGE_TIMESTAMP_KEY: 'ordine_swagger_spec_timestamp',
} as const;

interface ApiResponse {
  status: number;
  body: any;
  headers: Record<string, string>;
}

type SwaggerApiMethod = (parameters?: Record<string, unknown>) => Promise<ApiResponse>;

interface SwaggerSpec {
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

class OrdineClientError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'OrdineClientError';
  }
}

class OrdineClient {
  private swaggerClient: { 
    apis: Record<string, Record<string, SwaggerApiMethod>> 
  } | null = null;
  private initialized = false;
  private cachedSpec: SwaggerSpec | null = null;

  private constructor() {}

  private static instance: OrdineClient;

  public static getInstance(): OrdineClient {
    if (!OrdineClient.instance) {
      OrdineClient.instance = new OrdineClient();
      OrdineClient.instance.initializeSync().catch(console.error);
    }
    return OrdineClient.instance;
  }

  private getEnvConfig(): { 
    apiBaseScheme: string; 
    apiBaseHost: string; 
    swaggerSpecPath: string 
  } {
    const apiBaseScheme = process.env.NEXT_PUBLIC_API_SCHEME;
    const apiBaseHost = process.env.NEXT_PUBLIC_API_HOST;
    const swaggerSpecPath = process.env.NEXT_PUBLIC_DOCS_PATH;

    if (!apiBaseScheme || !apiBaseHost || !swaggerSpecPath) {
      throw new OrdineClientError('Missing required API configuration environment variables');
    }

    return { apiBaseScheme, apiBaseHost, swaggerSpecPath };
  }

  private isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  }

  private getCachedSpec(): SwaggerSpec | null {
    if (this.cachedSpec) return this.cachedSpec;
    if (!this.isBrowser()) return null;

    try {
      const cachedSpecString = localStorage.getItem(CONSTANTS.LOCAL_STORAGE_SPEC_KEY);
      const cachedTimestamp = localStorage.getItem(CONSTANTS.LOCAL_STORAGE_TIMESTAMP_KEY);

      if (cachedSpecString && cachedTimestamp) {
        const timestamp = parseInt(cachedTimestamp, 10);

        if (Date.now() - timestamp < CONSTANTS.CACHE_DURATION_MS) {
          return JSON.parse(cachedSpecString);
        }
      }
    } catch (error) {
      console.error('Failed to retrieve cached Swagger spec:', error);
    }

    return null;
  }

  private cacheSpec(spec: SwaggerSpec): void {
    this.cachedSpec = spec;

    if (!this.isBrowser()) return;

    try {
      localStorage.setItem(CONSTANTS.LOCAL_STORAGE_SPEC_KEY, JSON.stringify(spec));
      localStorage.setItem(CONSTANTS.LOCAL_STORAGE_TIMESTAMP_KEY, Date.now().toString());
    } catch (error) {
      console.error('Failed to cache Swagger spec:', error);
    }
  }

  private async initializeSync(): Promise<void> {
    const { apiBaseScheme, apiBaseHost, swaggerSpecPath } = this.getEnvConfig();
    const swaggerSpecUrl = `${apiBaseScheme}${apiBaseHost}${swaggerSpecPath}`;

    try {
      const spec: SwaggerSpec = this.getCachedSpec() || await this.fetchAndCacheSpec(swaggerSpecUrl);

      const modifiedSpec: SwaggerSpec = {
        ...spec,
        schemes: [apiBaseScheme.replace('://', '')],
        host: apiBaseHost.replace(/^(https?:\/\/)/, '')
      };

      this.swaggerClient = await Swagger({
        spec: modifiedSpec,
      }) as { 
        apis: Record<string, Record<string, SwaggerApiMethod>> 
      };

      this.initialized = true;
    } catch (error) {
      console.error('Error initializing OrdineClient:', error);
    }
  }

  private async fetchAndCacheSpec(url: string): Promise<SwaggerSpec> {
    const response = await fetch(url);
    if (!response.ok) {
      throw new OrdineClientError(`HTTP error! status: ${response.status}`);
    }

    const fetchedSpec = await response.json() as SwaggerSpec;
    this.cacheSpec(fetchedSpec);
    return fetchedSpec;
  }

  public getApi(apiName: string): Record<string, SwaggerApiMethod> | null {
    if (!this.initialized || !this.swaggerClient) {
      console.warn('Swagger client not initialized');
      return null;
    }
    const api = this.swaggerClient.apis[apiName];
    if (!api) {
      console.warn(`API ${apiName} not found`);
      return null;
    }

    return api;
  }

  public getAvailableApis(): string[] {
    return this.initialized && this.swaggerClient 
      ? Object.keys(this.swaggerClient.apis)
      : [];
  }

  public isInitialized(): boolean {
    return this.initialized;
  }

  public async waitForInitialization(): Promise<void> {
    return new Promise<void>((resolve) => {
      const checkInitialization = () => {
        if (this.initialized) {
          resolve();
        } else {
          setTimeout(checkInitialization, 100);
        }
      };
      checkInitialization();
    });
  }
}

const ordineClient = OrdineClient.getInstance();
export default ordineClient;
