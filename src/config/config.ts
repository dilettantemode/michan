import { Octokit } from '@octokit/rest';
import { getAppEnv, AppEnv } from './app';
import { getGitHubEnv, GitHubEnv } from './github';

let configInstance: {
  appEnv: AppEnv;
  githubEnv: GitHubEnv;
  octokit: Octokit;
} | null = null;

const getConfig = () => {
  if (!configInstance) {
    const appEnv = getAppEnv();
    const githubEnv = getGitHubEnv();
    
    configInstance = {
      appEnv,
      githubEnv,
      octokit: new Octokit({
        auth: githubEnv.github_token,
      }),
    };
  }
  return configInstance;
};

export default getConfig();