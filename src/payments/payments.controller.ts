import { UsersEntity } from '@app/auth/lib/entities';
import { CraetePaymentDto } from '@app/payments-lib/libs/dtos/craete-payment.dto';
import { PaymentsLibService } from '@app/payments-lib/libs/services/payments-lib.service';
import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CurrentUser } from 'libs/common/decorators/current-user.decorator';
import { AccessTokenGuard } from 'libs/common/guards/accses-token.guard';

@ApiTags('Payments')
@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsLibService) {}

  @Post()
  @UseGuards(AccessTokenGuard)
  public async test(
    @Body() data: CraetePaymentDto,
    @CurrentUser() user: UsersEntity,
  ) {
    return await this.paymentsService.processRequest(data, user);
  }
}
