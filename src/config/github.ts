export interface GitHubEnv {
  github_token: string | undefined;
  webhook_secret: string | undefined;
  github_app_id: string | undefined;
  github_app_private_key: string | undefined;
  github_installation_id: string | undefined;
}

export function getGitHubEnv(): GitHubEnv {
  const privateKey = process.env.GITHUB_APP_PRIVATE_KEY_B64;
  if (!privateKey) {
    throw new Error('GITHUB_APP_PRIVATE_KEY is not set');
  }
  const key = Buffer.from(privateKey, 'base64').toString('utf8');

  return {
    github_token: process.env.GITHUB_TOKEN,
    webhook_secret: process.env.GITHUB_WEBHOOK_SECRET,
    github_app_id: process.env.GITHUB_APP_ID,
    github_app_private_key: key,
    github_installation_id: process.env.GITHUB_APP_INSTALLATION_ID,
  };
}
