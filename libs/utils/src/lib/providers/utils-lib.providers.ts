import { Provider } from '@nestjs/common';
import {
  CRYPTO_SERVICE,
  DATE_SERVICE,
  JWT_SERVICE,
  MAIL_SERVIC,
  WOOCOMERCE_SERVICE,
} from '../constants';
import { CryptoLibService, DateService, JwtLibService } from '../services';
import { MailService } from '../services/mail.service';
import { WoocomerseService } from '../services/woocomerce.service';

export const utilsLibProviders: Array<Provider> = [
  {
    provide: CRYPTO_SERVICE,
    useClass: CryptoLibService,
  },
  {
    provide: JWT_SERVICE,
    useClass: JwtLibService,
  },
  {
    provide: DATE_SERVICE,
    useClass: DateService,
  },
  { provide: MAIL_SERVIC, useClass: MailService },
  { provide: WOOCOMERCE_SERVICE, useClass: WoocomerseService },
];
