import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { DraftService } from '../service/draft';
import {
  PostDraft,
  GetDrafts,
  GetDraft,
  PutDraft,
  DeleteDraft,
} from '@blog/interface';
import { Address } from './decorator/address';
import { DEFAULT_OWNER_ADDRESS } from '../env';

@Controller()
export class DraftController {
  constructor(private readonly draftService: DraftService) {}

  @Post('/draft')
  async postDraft(
    @Body() body: PostDraft.Input,
    @Address() address: string,
  ): Promise<PostDraft.Output> {
    const draft = await this.draftService.postDraft(
      body,
      address,
      DEFAULT_OWNER_ADDRESS,
    );
    return {
      draft: {
        content: draft.content,
        title: draft.title,
        id: draft.id,
        createdAt: draft.createdAt,
        writer: draft.writer,
      },
    };
  }

  @Get('/drafts')
  @UseInterceptors()
  async getDrafts(@Query() query: GetDrafts.Input): Promise<GetDrafts.Output> {
    const pagination = query.pagination
      ? {
          take: Number(query.pagination.take) ?? 10,
          skip: Number(query.pagination.skip) ?? 0,
        }
      : {
          take: 10,
          skip: 0,
        };
    const { drafts, count } = await this.draftService.getDrafts({
      pagination,
    });
    return {
      drafts: drafts.map((draft) => ({
        content: draft.content,
        title: draft.title,
        id: draft.id,
        createdAt: draft.createdAt,
        writer: draft.writer,
      })),
      pagination: {
        total: count,
        take: pagination.take,
        skip: pagination.skip,
      },
    };
  }

  @Get('/draft')
  @UseInterceptors()
  async getDraft(@Query() query: GetDraft.Input): Promise<GetDraft.Output> {
    const draft = await this.draftService.getDraft(Number(query.id));
    return {
      draft: {
        content: draft.content,
        title: draft.title,
        id: draft.id,
        createdAt: draft.createdAt,
        writer: draft.writer,
      },
    };
  }

  @Put('/draft')
  async putDraft(
    @Body() body: PutDraft.Input,
    @Address() address: string,
  ): Promise<PutDraft.Output> {
    const draft = await this.draftService.putDraft(body, address);
    return {
      draft: {
        content: draft.content,
        title: draft.title,
        id: draft.id,
        createdAt: draft.createdAt,
        writer: draft.writer,
      },
    };
  }

  @Delete('/draft')
  async deleteDraft(
    @Body() body: DeleteDraft.Input,
    @Address() address: string,
  ) {
    await this.draftService.deleteDraft(body, address);
  }
}
