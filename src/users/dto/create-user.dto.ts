import { ApiProperty } from '@nestjs/swagger';
export class CreateUserDto {
  @ApiProperty()
  readonly username: string;

  @ApiProperty()
  readonly password: string;
  @ApiProperty()
  readonly email: string;

  @ApiProperty()
  readonly verified: boolean;
  @ApiProperty()
  readonly role: string;
}
