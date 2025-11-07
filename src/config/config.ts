import { getAppEnv, AppEnv } from './app';
import { getGitHubEnv, GitHubEnv } from './github';
import dotenv from 'dotenv';

let configInstance: {
  appEnv: AppEnv;
  githubEnv: GitHubEnv;
} | null = null;

const getConfig = () => {
  if (!configInstance) {
    dotenv.config();
    const appEnv = getAppEnv();
    const githubEnv = getGitHubEnv();
    
    configInstance = {
      appEnv,
      githubEnv,
    };
  }

  return configInstance;
};

export default getConfig();