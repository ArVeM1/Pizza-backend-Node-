import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import {
  CheckSMSCodeDto,
  EnterPhoneNumberDto,
} from './dto/enter-phone-number.dto';
import { JwtAuthGuard } from './jwt/guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/send-sms')
  sendSMSCode(@Body() dto: EnterPhoneNumberDto) {
    return this.userService.sendSMSCode(dto.phone);
  }

  @Patch('/check-code')
  checkSMSCode(@Body() dto: CheckSMSCodeDto) {
    return this.userService.checkSMSCode(dto.phone, dto.code);
  }

  @Get('/me')
  @UseGuards(JwtAuthGuard)
  getMe(@Request() req: Express.Request) {
    return this.userService.getMe((req.user as any).id);
  }
}
