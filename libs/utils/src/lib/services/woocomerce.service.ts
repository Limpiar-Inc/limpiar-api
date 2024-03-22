import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { stringify } from 'flatted';
const axios = require('axios');

@Injectable()
export class WoocomerseService {
  private token: string;
  constructor(private readonly configService: ConfigService) {
    this.token = this.configService.get<string>('WOOCOMERSE_TOKEN');
  }

  public async putRequest(url: string, body?: any, parametrs?: string) {
    console.log(url, parametrs);
    try {
      let data = JSON.stringify(body);
      let config = {
        method: 'put',
        // maxBodyLength: Infinity,
        url: `https://limpiar.online/wp-json/wc/v3/${url}/${parametrs}`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: this.token,
        },
        data: data,
      };

      return await axios.request(config);
    } catch (err) {
      throw new BadRequestException(err.response.data);
    }
  }

  public async getRequestQuery(url: string, query: string) {
    try {
      let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `https://limpiar.online/wp-json/wc/v3/${url}?${query}`,
        headers: {
          Authorization: this.token,
        },
      };

      const data = await axios.request(config);
      return data;
    } catch (err) {
      throw new BadRequestException(err.response.data);
    }
  }
  public async getRequest(url: string, parameters?: string) {
    try {
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
    } catch (err) {
      throw new BadRequestException(err.response.data);
    }
  }
  public async postRequst(url: string, body: object) {
    try {
      // let data = stringify(body);
      let data = JSON.stringify(body);
      let config = {
        method: 'post',
        // maxBodyLength: Infinity,
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
