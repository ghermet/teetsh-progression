import type { ProgrammationResponse } from '../types/programmation.types';

/**
 * API client for managing educational progressions (programmations).
 *
 * Provides methods to interact with the Strapi CMS backend for fetching
 * programmation data including subjects, domains, periods, and learning items.
 */
export class ProgrammationsApi {
  /** Authentication token for API requests */
  #authToken: string;
  /** Base URL for programmations API endpoints */
  baseURL: string;

  /**
   * Creates a new ProgrammationsApi instance.
   *
   * @param baseURL - The base URL of the Strapi API
   * @param authToken - Bearer token for authentication
   */
  constructor(baseURL: string, authToken: string) {
    this.baseURL = `${baseURL}/programmations`;
    this.#authToken = authToken;
  }

  /**
   * Fetches a single programmation by its ID.
   *
   * Retrieves complete programmation data including metadata, periods, subjects,
   * domains, and learning items from the Strapi CMS.
   *
   * @param id - The unique identifier of the programmation
   * @returns Promise resolving to the programmation response with data and metadata
   * @throws Will throw an error if the request fails or returns invalid JSON
   */
  async findOne(
    id: string,
    init?: RequestInit
  ): Promise<ProgrammationResponse> {
    const res = await fetch(`${this.baseURL}/${id}`, {
      headers: {
        Authorization: `Bearer ${this.#authToken}`,
      },
      ...init,
    });
    return res.json();
  }
}
