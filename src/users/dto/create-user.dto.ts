import { ApiProperty } from '@nestjs/swagger';
export class CreateUserDto {
  @ApiProperty()
  readonly username: string;

  @ApiProperty()
  readonly password: string;
  @ApiProperty()
  readonly email: string;

  @ApiProperty({ required: false })
  readonly verified?: boolean | null;
  @ApiProperty()
  readonly role: string;
}
