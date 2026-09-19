import { LoginRequestDto } from '../../../dto/auth/LoginRequestDto';

import { LoginResponseDto } from '../../../dto/auth/LoginResponseDto';

export interface AuthRemoteDataSource {
  login(request: LoginRequestDto): Promise<LoginResponseDto>;
}
