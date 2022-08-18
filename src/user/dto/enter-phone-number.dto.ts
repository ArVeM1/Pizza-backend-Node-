import { IsString } from 'class-validator';

export class EnterPhoneNumberDto {
  @IsString()
  phone: string;
}

export class CheckSMSCodeDto {
  @IsString()
  phone: string;

  @IsString()
  code: string;
}
