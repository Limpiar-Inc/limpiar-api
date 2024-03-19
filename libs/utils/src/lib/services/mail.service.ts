import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createTransport } from 'nodemailer';

@Injectable()
export class MailService {
  constructor(private readonly configService: ConfigService) {}
  public async sendMeil(reciverMeil: string, context: string, token: string) {
    const transporter = createTransport({
      service: 'gmail',
      auth: {
        user: this.configService.get<string>('MAIL_USER'),
        pass: this.configService.get<string>('MAIL_PASSWORD'),
      },
    });

    // setup email data with unicode symbols
    let mailOptions = {
      from: process.env.MAIL, // sender address
      to: reciverMeil, // list of receivers
      subject: 'otp verification', // Subject line
      text: 'submit otp on our platform', // plain text body
      html: `<h1>Thank you for using our application<h1>
    <br>
      <span>otp code :${token} <span>
      
      `,
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, function (error: Error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
  }
}
