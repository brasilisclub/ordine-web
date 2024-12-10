import Swagger from 'swagger-client';

class OrdineClient {
  private swaggerClient: any | null = null;
  private initialized: boolean = false;

  [key: string]: any;

  async initialize(): Promise<void> {
    if (this.initialized) return;
    const apiBaseScheme = process.env.NEXT_PUBLIC_API_SCHEME;
    const apiBaseHost = process.env.NEXT_PUBLIC_API_HOST;
    const swaggerSpecPath = process.env.NEXT_PUBLIC_DOCS_PATH;
    const swaggerSpecUrl = `${apiBaseScheme}${apiBaseHost}${swaggerSpecPath}`;

    try {
      const spec = await fetch(swaggerSpecUrl)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .catch((error) => {
          console.error('Failed to fetch Swagger specification:', error);
          throw error;
        });

      spec.scheme = apiBaseScheme;
      spec.host = apiBaseHost;

      this.swaggerClient = await Swagger({
        spec,
        requestInterceptor: (req: any) => {
          return req;
        },
        responseInterceptor: (res: any) => {
          return res;
        }
      });
      this.createApiMethods();
      this.initialized = true;
    } catch (error) {
      console.error('Error initializing OrdineClient:', error);
      throw error;
    }
  }

  private createApiMethods(): void {
    if (!this.swaggerClient) {
      throw new Error('OrdineClient is not initialized');
    }

    if (!this.swaggerClient.apis || Object.keys(this.swaggerClient.apis).length === 0) {
      console.warn('No APIs found in the Swagger client');
      return;
    }

    Object.keys(this.swaggerClient.apis).forEach((apiGroupName) => {
      const apiGroup = this.swaggerClient.apis[apiGroupName];

      Object.keys(apiGroup).forEach((apiMethodName) => {
        if (typeof apiGroup[apiMethodName] === 'function') {
          this[apiGroupName] = this[apiGroupName] || {};
          this[apiGroupName][apiMethodName] = async (params: any) => {
            try {
              console.log(`Calling ${apiGroupName}.${apiMethodName} with params:`, params);
              const apiResponse = await apiGroup[apiMethodName as keyof typeof apiGroup](params);
              return apiResponse.body;
            } catch (error) {
              console.error(`Error calling ${apiGroupName}.${apiMethodName}:`, error);
              throw error;
            }
          };
        }
      });
    });
  }

  getAvailableApis(): string[] {
    return this.swaggerClient ? Object.keys(this.swaggerClient.apis) : [];
  }
}

const ordineClientInstance = new OrdineClient();
export default ordineClientInstance;
