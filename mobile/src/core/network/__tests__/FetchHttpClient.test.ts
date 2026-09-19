import { afterEach, describe, expect, it, jest } from '@jest/globals';

import { AppConfig } from '../../config/AppConfig';
import { HttpError } from '../../errors/HttpError';
import { NetworkError } from '../../errors/NetworkError';

import { FetchHttpClient } from '../FetchHttpClient';

const config: AppConfig = {
  apiBaseUrl: 'https://example.com/',
  requestTimeoutMs: 1_000,
};

function createResponse(status: number, body: string): Response {
  const headers = {
    forEach(callback: (value: string, key: string) => void): void {
      callback('application/json', 'content-type');
    },
  };

  return {
    ok: status >= 200 && status < 300,
    status,
    headers,

    async text(): Promise<string> {
      return body;
    },
  } as unknown as Response;
}

describe('FetchHttpClient', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('sends an HTTP request and returns the parsed response', async () => {
    const fetchSpy = jest.spyOn(globalThis, 'fetch').mockResolvedValue(
      createResponse(
        200,
        JSON.stringify({
          id: 1,
        }),
      ),
    );

    const client = new FetchHttpClient(config);

    const response = await client.request<{ id: number }, { name: string }>({
      method: 'POST',

      path: '/products',

      query: {
        limit: 1,
        active: true,
        ignored: undefined,
      },

      body: {
        name: 'Phone',
      },
    });

    expect(fetchSpy).toHaveBeenCalledWith(
      'https://example.com/products?limit=1&active=true',

      expect.objectContaining({
        method: 'POST',

        headers: {
          'Content-Type': 'application/json',

          Accept: 'application/json',
        },

        body: JSON.stringify({
          name: 'Phone',
        }),

        signal: expect.anything(),
      }),
    );

    expect(response).toEqual({
      status: 200,

      data: {
        id: 1,
      },

      headers: {
        'content-type': 'application/json',
      },
    });
  });

  it('throws HttpError when the server returns an unsuccessful status', async () => {
    jest.spyOn(globalThis, 'fetch').mockResolvedValue(
      createResponse(
        401,
        JSON.stringify({
          message: 'Unauthorized',
        }),
      ),
    );

    const client = new FetchHttpClient(config);

    await expect(
      client.request({
        method: 'GET',
        path: '/private',
      }),
    ).rejects.toBeInstanceOf(HttpError);
  });

  it('throws NetworkError when fetch fails', async () => {
    jest.spyOn(globalThis, 'fetch').mockRejectedValue(new TypeError('Failed to fetch'));

    const client = new FetchHttpClient(config);

    await expect(
      client.request({
        method: 'GET',
        path: '/products',
      }),
    ).rejects.toBeInstanceOf(NetworkError);
  });
});
