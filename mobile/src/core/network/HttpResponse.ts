export interface HttpResponse<TData> {
  readonly status: number;

  readonly data: TData | null;

  readonly headers: Readonly<Record<string, string>>;
}
