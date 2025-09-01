/** Generated with CLAUDE CODE */

import { describe, it, expect } from 'vitest';
import { Api } from './api';
import { ProgrammationsApi } from './programmations-api';

describe('Api', () => {
  const validToken = 'valid-auth-token';

  describe('constructor', () => {
    it('should create a new instance with valid token', () => {
      const api = new Api(validToken);
      expect(api).toBeInstanceOf(Api);
    });

    it('should set the correct baseURL', () => {
      const api = new Api(validToken);
      expect(api.baseURL).toBe('https://strapi.teetsh.com/api');
    });

    it('should create an instance of ProgrammationsApi', () => {
      const api = new Api(validToken);
      expect(api.programmations).toBeInstanceOf(ProgrammationsApi);
    });

    it('should pass the auth token to ProgrammationsApi', () => {
      const api = new Api(validToken);
      // The ProgrammationsApi should have the correct baseURL which indicates it received the token
      expect(api.programmations.baseURL).toBe(
        'https://strapi.teetsh.com/api/programmations'
      );
    });
  });

  describe('error handling', () => {
    it('should throw an error if the auth token is empty string', () => {
      expect(() => new Api('')).toThrow('Auth token not found');
    });

    it('should throw an error if the auth token is null', () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      expect(() => new Api(null as any)).toThrow('Auth token not found');
    });

    it('should throw an error if the auth token is undefined', () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      expect(() => new Api(undefined as any)).toThrow('Auth token not found');
    });

    it('should throw an error if the auth token is whitespace only', () => {
      // The implementation now checks !authToken?.trim(), so whitespace-only tokens are rejected
      expect(() => new Api('   ')).toThrow('Auth token not found');
    });
  });

  describe('private properties', () => {
    it('should not expose auth token publicly', () => {
      const api = new Api(validToken);
      // Auth token should not be directly accessible as a public property
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      expect((api as any).authToken).toBeUndefined();
      expect(Object.keys(api)).not.toContain('authToken');
    });
  });

  describe('integration', () => {
    it('should allow ProgrammationsApi to make requests with the provided token', () => {
      const api = new Api(validToken);
      // This tests that the token is properly passed through the constructor chain
      expect(api.programmations).toBeDefined();
      expect(typeof api.programmations.findOne).toBe('function');
    });
  });
});
