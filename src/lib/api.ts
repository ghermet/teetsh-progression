import { ProgrammationsApi } from './programmations-api';

/**
 * Main API client for the Teetsh educational platform.
 *
 * Provides a centralized interface to all API endpoints, currently focusing
 * on educational progressions. Handles authentication and base URL configuration
 * for the Strapi CMS backend.
 */
export class Api {
  #authToken: string;
  /** API client for progression-related operations */
  /** Base URL for all API endpoints */
  baseURL: string;
  /** Authentication token for all requests */
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
  constructor(authToken: string) {
    if (!authToken?.trim()) {
      throw new Error('Auth token not found');
    }
    this.#authToken = authToken;
    this.baseURL = 'https://strapi.teetsh.com/api';
    this.programmations = new ProgrammationsApi(this.baseURL, this.#authToken);
  }
}
