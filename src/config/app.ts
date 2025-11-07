export interface AppEnv {
  environment: string;
  port: number;
}

export function getAppEnv(): AppEnv {
  return {
    environment: process.env.NODE_ENV || 'development',
    port: parseInt(process.env.PORT || '3000', 10),
  };
}
