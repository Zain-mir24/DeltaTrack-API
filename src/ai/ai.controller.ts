import {
  Controller,
  Get,
  Query,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { AiService } from './ai.service';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { ApiTags, ApiQuery, ApiAcceptedResponse } from '@nestjs/swagger';
import { ErrorsSummaryResponseDto } from './dto/create-ai.dto';

@ApiTags('AI')
@Controller('ai')
export class AiController {
  constructor(private readonly aiService: AiService) {}

  /**
   * Get an AI-generated summary of errors for an application in a date range.
   *
   * Example:
   *   GET /ai/errors-summary?applicationId=1&from=2026-01-01T00:00:00.000Z&to=2026-01-07T23:59:59.999Z
   * If from/to are omitted, it will default to "this week" (last 7 days).
   */
  @Get('errors-summary')
  @UseGuards(JwtAuthGuard)
  @ApiQuery({
    name: 'applicationId',
    type: Number,
    required: true,
    example: 1,
    description: 'Application ID',
  })
  @ApiQuery({
    name: 'from',
    type: String,
    required: false,
    example: '2026-01-01T00:00:00.000Z',
    description: 'Start date (ISO string). Defaults to last 7 days if omitted.',
  })
  @ApiQuery({
    name: 'to',
    type: String,
    required: false,
    example: '2026-01-07T23:59:59.999Z',
    description: 'End date (ISO string). Defaults to now if omitted.',
  })
  @ApiAcceptedResponse({
    description: 'AI-generated summary of errors',
    type: ErrorsSummaryResponseDto,
  })
  async getErrorsSummary(
    @Query('applicationId', ParseIntPipe) applicationId: number,
    @Query('from') from?: string,
    @Query('to') to?: string,
  ) {
    let fromDate: Date;
    let toDate: Date;

    if (from && to) {
      fromDate = new Date(from);
      toDate = new Date(to);
    } else {
      // Default: last 7 days (this week-like range)
      toDate = new Date();
      fromDate = new Date();
      fromDate.setDate(toDate.getDate() - 7);
    }

    return this.aiService.summarizeErrorsForRange(
      applicationId,
      fromDate,
      toDate,
    );
  }
}
