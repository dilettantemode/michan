export interface GitHubEnv {
  github_token: string | undefined;
  webhook_secret: string | undefined;
}

export function getGitHubEnv(): GitHubEnv {
  return {
    github_token: process.env.GITHUB_TOKEN,
    webhook_secret: process.env.GITHUB_WEBHOOK_SECRET,
  };
}
