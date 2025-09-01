/** Generated with CLAUDE CODE */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { ProgrammationsApi } from './programmations-api';
import type { ProgressionResponse } from '../types/progression.types';

// Mock data based on actual fixture structure
const mockProgressionResponse: ProgressionResponse = {
  data: {
    id: 271,
    name: "Progression d'Histoire par semaine pour CM1 et CM2 - Année 2",
    shortDescription: 'Test progression description',
    date: '2023-07-24',
    userId: 'test-user-id',
    nbOfUseLanding: 46,
    nbOfUseInApp: 824,
    schoolyearId: 'test-schoolyear-id',
    schoolId: 'test-school-id',
    programmationId: 'test-programmation-id',
    periodes: [
      {
        id: 'period-1',
        name: 'Semaine 1',
        color: 'blue-200',
        endDate: '2022-09-03T22:00:00Z',
        position: 0,
        startDate: '2022-08-31T22:00:00Z',
        programmationId: 'test-programmation-id',
      },
    ],
    matieres: [
      {
        id: 'matiere-1',
        name: 'Histoire',
        color: 'blue-300',
        position: 0,
        programmationId: 'test-programmation-id',
        domaines: [
          {
            id: 'domain-1',
            name: 'Histoire de France',
            color: 'blue-300',
            matiereId: 'matiere-1',
            items: [
              {
                id: 'item-1',
                value: '<p>Test content</p>',
                y: 0,
                Sequence: null,
                domaineId: 'domain-1',
                periodeId: 'period-1',
                FicheDePrep: null,
                attachments: [],
              },
            ],
          },
        ],
      },
    ],
    columnWidth: 200,
    fontSize: 'medium',
    view: 'timeline',
    invertedRowCol: false,
    niveau: 'CM1-CM2',
    createdAt: '2023-07-24T10:00:00Z',
    updatedAt: '2023-07-24T10:00:00Z',
    publishedAt: '2023-07-24T10:00:00Z',
    onePageMatiere: null,
    slug: 'test-progression',
    documentId: 'test-doc-id',
  },
  meta: {},
};

describe('ProgrammationsApi', () => {
  const baseURL = 'https://api.example.com';
  const authToken = 'test-token';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let fetchSpy: any;

  beforeEach(() => {
    fetchSpy = vi.spyOn(global, 'fetch');
  });

  afterEach(() => {
    fetchSpy.mockRestore();
  });

  describe('constructor', () => {
    it('should create a new instance with correct baseURL', () => {
      const api = new ProgrammationsApi(baseURL, authToken);
      expect(api).toBeInstanceOf(ProgrammationsApi);
      expect(api.baseURL).toBe('https://api.example.com/programmations');
    });

    it('should not expose the auth token publicly', () => {
      const api = new ProgrammationsApi(baseURL, authToken);
      // The auth token should not be directly accessible as a public property
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      expect((api as any).authToken).toBeUndefined();
      expect(Object.keys(api)).not.toContain('authToken');
    });
  });

  describe('findOne', () => {
    it('should call fetch with correct URL and headers', async () => {
      fetchSpy.mockResolvedValue({
        json: () => Promise.resolve(mockProgressionResponse),
        ok: true,
        status: 200,
      } as Response);

      const api = new ProgrammationsApi(baseURL, authToken);
      const result = await api.findOne('test-id');

      expect(fetchSpy).toHaveBeenCalledWith(
        'https://api.example.com/programmations/test-id',
        {
          headers: {
            Authorization: 'Bearer test-token',
          },
        }
      );

      expect(result).toEqual(mockProgressionResponse);
    });

    it('should pass through custom RequestInit options', async () => {
      fetchSpy.mockResolvedValue({
        json: () => Promise.resolve(mockProgressionResponse),
        ok: true,
        status: 200,
      } as Response);

      const api = new ProgrammationsApi(baseURL, authToken);
      const customInit: RequestInit = {
        method: 'GET',
        signal: new AbortController().signal,
      };

      await api.findOne('test-id', customInit);

      expect(fetchSpy).toHaveBeenCalledWith(
        'https://api.example.com/programmations/test-id',
        expect.objectContaining({
          headers: {
            Authorization: 'Bearer test-token',
          },
          method: 'GET',
          signal: expect.any(AbortSignal),
        })
      );
    });

    it('should return parsed JSON response', async () => {
      fetchSpy.mockResolvedValue({
        json: () => Promise.resolve(mockProgressionResponse),
        ok: true,
        status: 200,
      } as Response);

      const api = new ProgrammationsApi(baseURL, authToken);
      const result = await api.findOne('test-id');

      expect(result).toEqual(mockProgressionResponse);
      expect(result.data).toHaveProperty('id', 271);
      expect(result.data.periodes).toHaveLength(1);
      expect(result.data.matieres).toHaveLength(1);
    });

    it('should handle network errors', async () => {
      const networkError = new Error('Network error');
      fetchSpy.mockRejectedValue(networkError);

      const api = new ProgrammationsApi(baseURL, authToken);

      await expect(api.findOne('test-id')).rejects.toThrow('Network error');
    });

    it('should handle JSON parsing errors', async () => {
      fetchSpy.mockResolvedValue({
        json: () => Promise.reject(new Error('Invalid JSON')),
        ok: true,
        status: 200,
      } as Response);

      const api = new ProgrammationsApi(baseURL, authToken);

      await expect(api.findOne('test-id')).rejects.toThrow('Invalid JSON');
    });

    it('should handle HTTP error responses', async () => {
      fetchSpy.mockResolvedValue({
        json: () => Promise.resolve({ error: 'Not found' }),
        ok: false,
        status: 404,
        statusText: 'Not Found',
      } as Response);

      const api = new ProgrammationsApi(baseURL, authToken);
      const result = await api.findOne('non-existent-id');

      // The method doesn't throw on HTTP errors, it returns the JSON response
      expect(result).toEqual({ error: 'Not found' });
    });

    it('should handle empty response', async () => {
      fetchSpy.mockResolvedValue({
        json: () => Promise.resolve(null),
        ok: true,
        status: 200,
      } as Response);

      const api = new ProgrammationsApi(baseURL, authToken);
      const result = await api.findOne('test-id');

      expect(result).toBeNull();
    });
  });
});
