import { HttpClient } from '../../core/network/HttpClient';
import { HttpRequest } from '../../core/network/HttpRequest';
import { HttpResponse } from '../../core/network/HttpResponse';

export class FakeHttpClient implements HttpClient {
  readonly requests: HttpRequest<unknown>[] = [];

  private readonly responses: HttpResponse<unknown>[] = [];

  enqueueResponse<TResponse>(response: HttpResponse<TResponse>): void {
    this.responses.push(response);
  }

  async request<TResponse, TBody = unknown>(
    request: HttpRequest<TBody>,
  ): Promise<HttpResponse<TResponse>> {
    this.requests.push(request);

    const response = this.responses.shift();

    if (!response) {
      throw new Error('FakeHttpClient no tiene una respuesta preparada.');
    }

    return response as HttpResponse<TResponse>;
  }
}
