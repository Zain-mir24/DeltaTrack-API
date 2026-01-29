import { ApiProperty } from '@nestjs/swagger';

class ErrorsByTypeDto {
  @ApiProperty({ example: 26 })
  error: number;

  @ApiProperty({ example: 3 })
  warning: number;
}

export class ErrorsSummaryResponseDto {
  @ApiProperty({
    example: '2026-01-01T00:00:00.000Z',
  })
  from: string;

  @ApiProperty({
    example: '2026-01-20T00:00:00.000Z',
  })
  to: string;

  @ApiProperty({ example: 29 })
  total: number;

  @ApiProperty({ type: ErrorsByTypeDto })
  byType: ErrorsByTypeDto;

  @ApiProperty({
    type: [String],
    example: [
      '[error] The operation is insecure (source: https://myapp.example.com/static/components/Header.js)',
      '[warning] Warning: Each child in a list should have a unique "key" prop',
    ],
  })
  sampleMessages: string[];

  @ApiProperty({
    example: 'Summary (high level)\n- 29 error events recorded from Jan 1–20...',
  })
  aiSummary: string;
}
