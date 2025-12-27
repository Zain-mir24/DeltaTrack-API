import { ApiProperty } from '@nestjs/swagger';
import { PageOptionsDto } from './dtos';

export class PageMetaDto {
  @ApiProperty()
  readonly page: number;

  @ApiProperty()
  readonly pageSize: number;

  @ApiProperty()
  readonly itemCount: number;

  @ApiProperty()
  readonly pageCount: number;

  @ApiProperty()
  readonly hasPreviousPage: boolean;

  @ApiProperty()
  readonly hasNextPage: boolean;

  constructor({ itemCount, pageOptionsDto }: { itemCount: number; pageOptionsDto: PageOptionsDto }) {
    this.page = pageOptionsDto.page ?? 1;
    this.pageSize = pageOptionsDto.pageSize ?? 10;
    this.itemCount = itemCount;
    this.pageCount = Math.ceil(this.itemCount / this.pageSize);
    this.hasPreviousPage = this.page > 1;
    this.hasNextPage = this.page < this.pageCount;
  }
}

