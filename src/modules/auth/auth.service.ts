import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { ConflictException, NotFoundException, BadRequestException, HttpException } from '@nestjs/common/exceptions';
import { JwtService } from '@nestjs/jwt';
import { ProjectConstant, RoleType, Status } from '../../constants';
import { UnverifiedUsersService } from 'modules/unverified-users/unverified-users.service';
import { GeneratorProvider } from 'providers';

import { UserService } from './../user/user.service';
import { SignUpDTO } from './dto/sign-up.dto';
import { VerifyOtpDTO } from './dto/verify-otp.dto';
import { JwtSignPayload } from 'interfaces/jwt.interface';
import { ApiConfigService } from 'shared/api-config.service';
import { getSuccessResponse } from 'utils';
import { UserOtpService } from 'modules/user-otp/user-otp.service';
import dayjs from 'dayjs';
import { SignInDTO } from './dto/sign-in.dto';
import { use } from 'passport';
import { ForgetPasswordRequest } from './dto/forget-password.dto';
import { AdminSignInRequest } from './dto/admin-signin.dto';
import { AdminService } from 'modules/admin/admin.service';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly unverifiedUserService: UnverifiedUsersService,
    private readonly apiConfigService: ApiConfigService,
    private userOtpService: UserOtpService,
    private readonly adminService: AdminService
  ) { }


  async sendOtpSignUp(signUpRequest: SignUpDTO) {
    const { email } = signUpRequest

    const user = await this.userService.findOne({ where: { email } })
    if (user === null) {
      const otp = GeneratorProvider.generateRandomSixDigitNumber()

      const user = await this.unverifiedUserService.findOne({ where: { email } })
      if (user) {
        await this.unverifiedUserService.update({ email }, { ...signUpRequest, otp })
        return getSuccessResponse({ message: 'OTP Sent Successfully', response: {} })

      } else {
        await this.unverifiedUserService.save({ ...signUpRequest, otp })
        return getSuccessResponse({ message: 'OTP Sent Successfully', response: {} })

      }
    } else {
      throw new ConflictException(ProjectConstant.EmailIdAlreadyRegistered)
    }

  }

  async signIn(signInRequest: SignInDTO) {
    const { email, password } = signInRequest
    const user = await this.userService.findOne({ where: { email } })
    if (user && user.password === password) {
      const authToken = this.getJWT({ id: user.id, role: user.role })
      const message = 'User Authentication Done.'
      return getSuccessResponse({ message, response: { authToken } })
    } else {
      throw new BadRequestException('Invalid Credentials.')
    }
  }

  async verifyOtp(verifyOtpRequest: VerifyOtpDTO) {

    const { email, otp } = verifyOtpRequest

    const user = await this.userService.findOne({ where: { email } })
    if (user) {
      const isOtpValid = await this.userOtpService.isOtpValid(email)
      if (isOtpValid === true) {
        const response = {
          authToken: this.getJWT({ id: user.id, role: user.role })
        }

        const message = 'OTP Verification Successfull.'

        return getSuccessResponse({ message, response })
      } else {

        throw new BadRequestException('Invalid OTP.')
      }
    } else {
      const unverifiedUser = await this.unverifiedUserService.findOne({ where: { email } })
      if (unverifiedUser === null) {
        throw new NotFoundException(ProjectConstant.UserNotFound)
      } else {
        if (unverifiedUser.otp == otp) {
          const user = await this.userService.createUser({ ...unverifiedUser })
          const response = {
            authToken: this.getJWT({ id: user.id, role: user.role })
          }

          const message = 'OTP Verification Successfull'

          return getSuccessResponse({
            message, response
          })
        } else {
          throw new BadRequestException('Invalid OTP')
        }
      }
    }

  }

  async sendOtpForgetPassword(forgetPasswordRequest: ForgetPasswordRequest) {
    const { email } = forgetPasswordRequest
    const user = await this.userService.findOne({ where: { email } })
    if (user) {
      const otp = GeneratorProvider.generateRandomSixDigitNumber()
      console.log('otp', otp)
      this.userOtpService.update({ user }, { status: Status.INACTIVE })
      await this.userOtpService.save({ otp, user })
      return getSuccessResponse({ message: 'OTP Sent Successfully.', response: {} })
    } else {
      throw new NotFoundException(ProjectConstant.UserNotFound)
    }

  }
  async adminSignIn(adminSignIn: AdminSignInRequest) {
    const { email, password } = adminSignIn
    const admin = await this.adminService.findOne({ where: { email, password } })
    if (admin) {

      const response = {
        authToken: this.getJWT({ id: admin.id, role: admin.role })
      }
      return getSuccessResponse({ message: 'Successfull Sign In.', response })
    } else {
      throw new BadRequestException('Invalid Credentials.')
    }

  }

  getJWT(payload: JwtSignPayload) {
    const { expiresIn, secret } = this.apiConfigService.JwtConfiguration
    return this.jwtService.sign(payload, {
      expiresIn, secret
    })
  }

  temp(p: any) {
    return p
  }

}
