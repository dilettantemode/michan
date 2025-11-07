import { Request, Response } from 'express';
import crypto from 'crypto';
import config from '../config/config';
import { Octokit } from '@octokit/rest';

let octokitInstance: Octokit | null = null;
export const getOctokit = (): Octokit => {
  if (!octokitInstance) {
    octokitInstance = new Octokit({
      auth: config.githubEnv.github_token,
    });
  }
  return octokitInstance;
}

/**
 * Receives and verifies GitHub webhook payload
 * @param req Express request object
 * @param res Express response object
 */
export async function receiveWebhook(req: Request, res: Response): Promise<void> {
  const signature = req.headers['x-hub-signature-256'] as string;
  const webhookSecret = config.githubEnv.webhook_secret;

  if (!webhookSecret) {
    res.status(500).json({ error: 'Webhook secret not configured' });
    return;
  }

  if (!signature) {
    res.status(401).json({ error: 'Missing signature' });
    return;
  }

  // Verify webhook signature
  const payload = JSON.stringify(req.body);
  const hmac = crypto.createHmac('sha256', webhookSecret);
  const digest = 'sha256=' + hmac.update(payload).digest('hex');

  if (signature !== digest) {
    res.status(401).json({ error: 'Invalid signature' });
    return;
  }

  const event = req.headers['x-github-event'] as string;
  const payload_data = req.body;

  // Handle different webhook events
  if (event === 'pull_request') {
    // Process pull request event
    console.log(`Received PR event: ${payload_data.action} for PR #${payload_data.pull_request?.number}`);
    commentPR(payload_data.pull_request?.user?.login, payload_data.pull_request?.head?.repo?.name, payload_data.pull_request?.number, 'Hello, world!');
  }

  res.status(200).json({ received: true, event });
}

/**
 * Comments on a GitHub Pull Request
 * @param owner Repository owner
 * @param repo Repository name
 * @param prNumber Pull request number
 * @param comment Comment body
 */
export async function commentPR(
  owner: string,
  repo: string,
  prNumber: number,
  comment: string
): Promise<void> {
  try {
    await getOctokit().rest.issues.createComment({
      owner,
      repo,
      issue_number: prNumber,
      body: comment,
    });
    console.log(`Commented on PR #${prNumber} in ${owner}/${repo}`);
  } catch (error) {
    console.error(`Failed to comment on PR #${prNumber}:`, error);
    throw error;
  }
}

