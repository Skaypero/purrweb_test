import {
  Body,
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { LoginService } from '../service/LoginService';
import { LoginResponse } from 'src/response/LoginResponse';
import { LoginRequest } from 'src/request/LoginRequest';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller()
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post('signin')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Аутентификация' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: LoginResponse,
  })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  async signIn(@Body() loginRequest: LoginRequest): Promise<LoginResponse> {
    try {
      const accessToken: string = await this.loginService.signIn(
        loginRequest.email,
        loginRequest.password,
      );
      return new LoginResponse(accessToken);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.UNAUTHORIZED);
    }
  }
}
