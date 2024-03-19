import {
  BadRequestException,
  ConflictException,
  Inject,
  Injectable,
} from '@nestjs/common';
import { OTP_REPOSITORY, USERS_REPOSITORY } from '../constants';
import { UsersRepository } from '../repositories/user.repository';
import { SigninDto, SignupDto } from '../dtos';
import {
  CRYPTO_SERVICE,
  JWT_SERVICE,
  MAIL_SERVIC,
  WOOCOMERCE_SERVICE,
} from 'libs/utils/src/lib/constants';
import { CryptoLibService, JwtLibService } from 'libs/utils/src/lib';
import { MailService } from 'libs/utils/src/lib/services/mail.service';
import { OtpRepository } from '../repositories/otp.repository';
import { WoocomerseService } from 'libs/utils/src/lib/services/woocomerce.service';
const axios = require('axios');

@Injectable()
export class AuthLibService {
  public constructor(
    @Inject(USERS_REPOSITORY) private readonly usersRepository: UsersRepository,
    @Inject(CRYPTO_SERVICE) private readonly cryptoService: CryptoLibService,
    @Inject(JWT_SERVICE) private readonly jwtService: JwtLibService,
    @Inject(MAIL_SERVIC) private readonly mailService: MailService,
    @Inject(OTP_REPOSITORY) private readonly otpRepository: OtpRepository,
    @Inject(WOOCOMERCE_SERVICE)
    private readonly woocomerseService: WoocomerseService,
  ) {}

  public async login(login: SigninDto) {
    try {
      const userExsists = await this.usersRepository.usersEntity.findOne({
        where: { email: login.email },
      });
      if (!userExsists) {
        throw new BadRequestException('user doesnot exsists');
      }
      const dehashedPassword = await this.cryptoService.comparePassword(
        login.password,
        userExsists.password,
      );
      if (!dehashedPassword) {
        throw new BadRequestException('password doesnot match');
      }

      const generatedAcssesToken = await this.jwtService.sign({
        id: userExsists.id,
        email: userExsists.email,
      });

      const data = await this.woocomerseService.getRequest(
        'customers',
        userExsists.woocomerceId.toString(),
      );

      return {
        succses: true,
        data: { accsesToken: generatedAcssesToken, user: data.data },
      };
    } catch (err) {
      throw err;
    }
  }

  public async resetPasswordV1(mail: string) {
    try {
      await this.otpRepository.otpEntity.delete({ email: mail });

      const otp = this.cryptoService.generateOtpCode();

      await this.mailService.sendMeil(mail, '', otp.toString());
      return { succses: true, data: { message: 'otp sent to mail' } };
    } catch (err) {
      throw err;
    }
  }

  public async validateOtp(otp: number, password: string) {
    try {
      const otpExsists = await this.otpRepository.otpEntity.findOne({
        where: { otp: otp.toString() },
      });
      if (!otpExsists) {
        throw new BadRequestException('wrong otp');
      }

      const newPassword = await this.cryptoService.hashPassword(password);

      const user = await this.usersRepository.usersEntity.findOne({
        where: { email: otpExsists.email },
      });
      if (!user) {
        throw new BadRequestException('given mail is not valid in system');
      }
      user.password = newPassword;
      await this.usersRepository.usersEntity.save(user);
      await this.otpRepository.delete(otpExsists.id);
      return {
        succses: true,
        data: { message: 'user password has been updated' },
      };
    } catch (err) {
      throw err;
    }
  }
  public async signup(signupDto: SignupDto) {
    try {
      let data = {
        email: signupDto.email,
        first_name: signupDto.firstName,
        last_name: signupDto.lastName,
        username: signupDto.userName,
        phone: signupDto.phone,
        service_address: signupDto.serviceAddress,
      };

      const response = await this.woocomerseService.postRequst(
        'customers',
        data,
      );

      const woocomerceId = response.data.id;

      const userNameAlreadyExsists =
        await this.usersRepository.usersEntity.findOne({
          where: [{ userName: signupDto.userName }, { email: signupDto.email }],
        });

      if (userNameAlreadyExsists) {
        throw new ConflictException(
          'username or email already exsists in system',
        );
      }

      const hashedPassword = await this.cryptoService.hashPassword(
        signupDto.password,
      );

      const entityData = this.usersRepository.usersEntity.create({
        userName: signupDto.userName,
        password: hashedPassword,
        email: signupDto.email,
        woocomerceId: woocomerceId,
      });

      const registaredUser = await this.usersRepository.create(entityData);
      const generatedAcssesToken = await this.jwtService.sign({
        id: registaredUser.id,
        email: registaredUser.email,
      });

      return {
        succses: true,
        data: { accsesToken: generatedAcssesToken, user: response.data },
      };
    } catch (err) {
      console.log(err);
      console.log(err.response.data);
      throw new BadRequestException(err.response.data);
    }
  }
}
