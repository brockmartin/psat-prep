import AnthropicVertex from '@anthropic-ai/vertex-sdk'
import { GoogleAuth } from 'google-auth-library'

const PROJECT_ID = 'fxei-meta-project'
const REGION = 'us-east5'

let clientInstance: AnthropicVertex | null = null

/**
 * Returns an initialized AnthropicVertex client, or null if credentials
 * are not available. The client is lazily created and cached for reuse.
 *
 * Supports two credential modes:
 * - GOOGLE_CREDENTIALS_JSON: inline service-account JSON (for Vercel / serverless)
 * - GOOGLE_APPLICATION_CREDENTIALS: path to a service-account JSON file (local dev)
 */
export function getAIClient(): AnthropicVertex | null {
  if (clientInstance) {
    return clientInstance
  }

  const credentialsJson = process.env.GOOGLE_CREDENTIALS_JSON
  const credentialsFile = process.env.GOOGLE_APPLICATION_CREDENTIALS

  if (!credentialsJson && !credentialsFile) {
    console.warn(
      '[AI] No Google credentials found. Set GOOGLE_CREDENTIALS_JSON or GOOGLE_APPLICATION_CREDENTIALS.',
    )
    return null
  }

  try {
    const options: ConstructorParameters<typeof AnthropicVertex>[0] = {
      projectId: PROJECT_ID,
      region: REGION,
    }

    if (credentialsJson) {
      const credentials = JSON.parse(credentialsJson)
      options.googleAuth = new GoogleAuth({
        credentials,
        scopes: 'https://www.googleapis.com/auth/cloud-platform',
      })
    }

    clientInstance = new AnthropicVertex(options)
    return clientInstance
  } catch (error) {
    console.warn('[AI] Failed to initialize Vertex client:', error)
    return null
  }
}
