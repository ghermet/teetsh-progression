import { ProgrammationsApi } from './programmations-api';

/**
 * Main API client for the Teetsh educational platform.
 *
 * Provides a centralized interface to all API endpoints, currently focusing
 * on educational progressions. Handles authentication and base URL configuration
 * for the Strapi CMS backend.
 */
export class Api {
  /** Authentication token for all requests */
  #authToken: string;
  /** Base URL for all API endpoints */
  baseURL: string;
  /** API client for programmation-related operations */
  programmations: ProgrammationsApi;

  /**
   * Creates a new Api instance with authentication.
   *
   * Initializes the main API client and sets up sub-clients for different
   * resource types (currently just progressions).
   *
   * @param authToken - Bearer token for authentication with the Strapi API
   * @throws {Error} When authToken is not provided or empty
   */
  constructor(authToken: string, baseURL: string) {
    if (!authToken?.trim()) {
      throw new Error('API authToken is required');
    }
    if (!baseURL?.trim()) {
      throw new Error('API baseURL is required');
    }
    this.#authToken = authToken;
    this.baseURL = baseURL;
    this.programmations = new ProgrammationsApi(this.baseURL, this.#authToken);
  }
}
