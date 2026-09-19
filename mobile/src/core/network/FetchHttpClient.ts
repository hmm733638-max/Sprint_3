import { AppConfig } from '../config/AppConfig';

import { AppError } from '../errors/AppError';

import { HttpError } from '../errors/HttpError';

import { NetworkError } from '../errors/NetworkError';

import { TimeoutError } from '../errors/TimeoutError';

import { HttpClient } from './HttpClient';

import { HttpRequest, HttpQueryValue } from './HttpRequest';

import { HttpResponse } from './HttpResponse';

export class FetchHttpClient implements HttpClient {
  constructor(private readonly config: AppConfig) {}

  async request<TResponse, TBody = unknown>(
    request: HttpRequest<TBody>,
  ): Promise<HttpResponse<TResponse>> {
    const controller = new AbortController();

    const timeoutId = setTimeout(() => {
      controller.abort();
    }, this.config.requestTimeoutMs);

    try {
      const response = await fetch(this.buildUrl(request.path, request.query), {
        method: request.method,

        headers: this.buildHeaders(request.headers, request.body),

        body: this.serializeBody(request.body),

        signal: controller.signal,
      });

      const responseData = await this.parseResponse<TResponse>(response);

      if (!response.ok) {
        throw new HttpError(response.status, responseData);
      }

      return {
        status: response.status,

        data: responseData,

        headers: this.extractHeaders(response.headers),
      };
    } catch (error: unknown) {
      if (controller.signal.aborted) {
        throw new TimeoutError(this.config.requestTimeoutMs);
      }

      if (error instanceof AppError) {
        throw error;
      }

      throw new NetworkError(undefined, error);
    } finally {
      clearTimeout(timeoutId);
    }
  }

  private buildUrl(path: string, query?: Readonly<Record<string, HttpQueryValue>>): string {
    const normalizedBaseUrl = this.config.apiBaseUrl.replace(/\/+$/, '');

    const normalizedPath = path.startsWith('/') ? path : `/${path}`;

    const url = `${normalizedBaseUrl}${normalizedPath}`;

    if (!query) {
      return url;
    }

    const queryString = Object.entries(query)
      .filter(
        (entry): entry is [string, Exclude<HttpQueryValue, undefined>] => entry[1] !== undefined,
      )
      .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`)
      .join('&');

    if (!queryString) {
      return url;
    }

    return `${url}?${queryString}`;
  }

  private buildHeaders<TBody>(
    headers: Readonly<Record<string, string>> | undefined,
    body: TBody | undefined,
  ): Record<string, string> {
    const result = {
      ...headers,
    };

    if (body !== undefined && !result['Content-Type']) {
      result['Content-Type'] = 'application/json';
    }

    if (!result.Accept) {
      result.Accept = 'application/json';
    }

    return result;
  }

  private serializeBody<TBody>(body: TBody | undefined): string | undefined {
    if (body === undefined) {
      return undefined;
    }

    return JSON.stringify(body);
  }

  private async parseResponse<TResponse>(response: Response): Promise<TResponse | null> {
    const text = await response.text();

    if (!text) {
      return null;
    }

    try {
      return JSON.parse(text) as TResponse;
    } catch {
      return text as TResponse;
    }
  }

  private extractHeaders(headers: Headers): Readonly<Record<string, string>> {
    const result: Record<string, string> = {};

    headers.forEach((value, key) => {
      result[key] = value;
    });

    return result;
  }
}
