import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
const axios = require('axios');

@Injectable()
export class WoocomerseService {
  private token: string;
  constructor(private readonly configService: ConfigService) {
    this.token = this.configService.get<string>('WOOCOMERSE_TOKEN');
  }

  public async getRequest(url: string, parameters?: string) {
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `https://limpiar.online/wp-json/wc/v3/${url}/${parameters}`,
      headers: {
        Authorization: this.token,
      },
    };

    const data = await axios.request(config);
    return data;
  }
  public async postRequst(url: string, body: object) {
    try {
      let data = body;

      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `https://limpiar.online/wp-json/wc/v3/${url}`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: this.token,
        },
        data: data,
      };

      const response = await axios.request(config);
      return response;
    } catch (err) {
      throw new BadRequestException(err.response.data);
    }
  }
}
