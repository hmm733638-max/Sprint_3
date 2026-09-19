import { HttpMethod } from './HttpMethod';

export type HttpQueryValue = string | number | boolean | undefined;

export interface HttpRequest<TBody = unknown> {
  readonly method: HttpMethod;

  readonly path: string;

  readonly body?: TBody;

  readonly headers?: Readonly<Record<string, string>>;

  readonly query?: Readonly<Record<string, HttpQueryValue>>;
}
