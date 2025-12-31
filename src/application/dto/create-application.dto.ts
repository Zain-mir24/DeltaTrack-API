import { ApiProperty } from '@nestjs/swagger';

export class CreateApplicationDto {
  @ApiProperty({ description: 'Name of the application', example: 'My App' })
  readonly name: string;
  @ApiProperty({description:'This is the unique project key for the project',example:'MyKey_123'})
  readonly projectKey: string;
}
