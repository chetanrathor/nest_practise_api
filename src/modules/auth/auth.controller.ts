import { Body, Controller, Logger, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { endpoints } from 'constants/project-constants';

import { UserService } from './../user/user.service';
import { AuthService } from './auth.service';
import { AdminSignInRequest } from './dto/admin-signin.dto';
import { ForgetPasswordRequest } from './dto/forget-password.dto';
import { SignInDTO } from './dto/sign-in.dto';
import { SignUpDTO } from './dto/sign-up.dto';
import { VerifyOtpDTO } from './dto/verify-otp.dto';
@ApiTags('auth')
@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) { }

  @Post(endpoints.SignupSendOtp)
  sendOtpSignUp(@Body() signupRequest: SignUpDTO) {
    return this.authService.sendOtpSignUp(signupRequest)
  }

  @Post(endpoints.VerifyOtp)
  async verifyOtp(@Body() verifyOtpRequest: VerifyOtpDTO) {
    return await this.authService.verifyOtp(verifyOtpRequest)
  }

  @Post(endpoints.SignIn)
  async signIn(@Body() signInRequest: SignInDTO) {

    return await this.authService.signIn(signInRequest)
  }
  @Post(endpoints.ForgetPassword)
  async forgetPassword(@Body() forgetPassword: ForgetPasswordRequest) {
    return await this.authService.sendOtpForgetPassword(forgetPassword)
  }
  @Post(endpoints.AdminSignIn)
  async adminSignIn(@Body() adminSignIn: AdminSignInRequest) {
    return await this.authService.adminSignIn(adminSignIn)
  }



}
