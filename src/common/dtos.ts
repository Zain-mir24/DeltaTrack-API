import { ApiPropertyOptional } from '@nestjs/swagger';

export enum Order {
  ASC = 'ASC',
  DESC = 'DESC',
}

export class PageOptionsDto {
  @ApiPropertyOptional({ enum: Order, default: Order.ASC })
  readonly order?: Order = Order.ASC;

  @ApiPropertyOptional({
    minimum: 1,
    default: 1,
  })
  readonly page?: number = 1;

  @ApiPropertyOptional({
    minimum: 1,
    maximum: 50,
    default: 10,
  })
  readonly pageSize?: number = 10;

  @ApiPropertyOptional()
  readonly search?: string;

  get skip(): number {
    return ((this.page ?? 1) - 1) * (this.pageSize ?? 10);
  }
}

