import * as crypto from 'crypto';
import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CryptoLibService {
  public comparePassword(password: string, hashedPassword: string) {
    return bcrypt.compare(password, hashedPassword);
  }

  public async hashPassword(payload: string, saltValue = 10) {
    const salt = await this.generateSaltValue(saltValue);
    return await bcrypt.hash(payload, salt);
  }

  private generateSaltValue(saltValue: number) {
    return bcrypt.genSalt(saltValue);
  }

  public generateOtpCode() {
    const min = 100000;
    const max = 999999;
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  public generateRandomByes(): Promise<string> {
    return new Promise((resolve, reject) => {
      const salt = crypto.randomBytes(16);

      crypto.pbkdf2('zaali', salt, 100000, 64, 'sha512', (err, derivedKey) => {
        if (err) {
          reject(err);
        }
        resolve(derivedKey.toString('base64'));
      });
    });
  }
}
