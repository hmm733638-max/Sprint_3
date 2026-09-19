import { HttpClient } from '../../../../core/network/HttpClient';

import { LoginRequestDto } from '../../../dto/auth/LoginRequestDto';

import { LoginResponseDto } from '../../../dto/auth/LoginResponseDto';

import { InvalidRemoteResponseError } from '../../../errors/InvalidRemoteResponseError';

import { AuthRemoteDataSource } from './AuthRemoteDataSource';

export class FakeStoreAuthRemoteDataSource implements AuthRemoteDataSource {
  constructor(private readonly httpClient: HttpClient) {}

  async login(request: LoginRequestDto): Promise<LoginResponseDto> {
    const response = await this.httpClient.request<LoginResponseDto, LoginRequestDto>({
      method: 'POST',
      path: '/auth/login',
      body: request,
    });

    if (
      response.data === null ||
      typeof response.data.token !== 'string' ||
      response.data.token.length === 0
    ) {
      throw new InvalidRemoteResponseError('Fake Store no devolvió un token válido.');
    }

    return response.data;
  }
}
