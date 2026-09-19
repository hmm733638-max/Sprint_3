import { HttpRequest } from './HttpRequest';

import { HttpResponse } from './HttpResponse';

export interface HttpClient {
  request<TResponse, TBody = unknown>(
    request: HttpRequest<TBody>,
  ): Promise<HttpResponse<TResponse>>;
}
