import AnthropicVertex from '@anthropic-ai/vertex-sdk'

const PROJECT_ID = 'fxei-meta-project'
const REGION = 'us-east1'

let clientInstance: AnthropicVertex | null = null

/**
 * Returns an initialized AnthropicVertex client, or null if credentials
 * are not available. The client is lazily created and cached for reuse.
 *
 * Reads credentials from the GOOGLE_APPLICATION_CREDENTIALS env var,
 * which should point to a service-account JSON file.
 */
export function getAIClient(): AnthropicVertex | null {
  if (clientInstance) {
    return clientInstance
  }

  if (!process.env.GOOGLE_APPLICATION_CREDENTIALS) {
    console.warn(
      '[AI] GOOGLE_APPLICATION_CREDENTIALS is not set. AI features will be disabled.',
    )
    return null
  }

  try {
    clientInstance = new AnthropicVertex({
      projectId: PROJECT_ID,
      region: REGION,
    })
    return clientInstance
  } catch (error) {
    console.warn('[AI] Failed to initialize Vertex client:', error)
    return null
  }
}
