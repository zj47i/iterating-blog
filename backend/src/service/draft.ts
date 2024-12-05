import { DeleteDraft, GetDrafts, PostDraft, PutDraft } from '@blog/interface';
import { Injectable } from '@nestjs/common';
import { PrismaProvider } from '../provider/prisma';

@Injectable()
export class DraftService {
  constructor(private readonly prisma: PrismaProvider) {}
  async putDraft(draft: PutDraft.Input, writer: string) {
    const lastDraft = await this.prisma.draft.findUniqueOrThrow({
      where: {
        id: draft.id,
      },
    });
    await this.prisma.draftHistory.create({
      data: {
        title: lastDraft.title,
        content: lastDraft.content,
        writer: lastDraft.writer,
        draftId: lastDraft.id,
        owner: lastDraft.owner,
        createdAt: lastDraft.createdAt,
        updatedAt: lastDraft.updatedAt,
        action: 'EDIT',
      },
    });
    return this.prisma.draft.update({
      where: {
        id: draft.id,
        writer,
      },
      data: {
        title: draft.title,
        content: draft.content,
      },
    });
  }
  async deleteDraft(draft: DeleteDraft.Input, writer: string) {
    const lastDraft = await this.prisma.draft.findUniqueOrThrow({
      where: {
        id: draft.id,
      },
    });
    await this.prisma.draftHistory.create({
      data: {
        title: lastDraft.title,
        content: lastDraft.content,
        writer: lastDraft.writer,
        draftId: lastDraft.id,
        owner: lastDraft.owner,
        createdAt: lastDraft.createdAt,
        updatedAt: lastDraft.updatedAt,
        action: 'DELETE',
      },
    });
    return this.prisma.draft.delete({
      where: {
        id: lastDraft.id,
        writer,
      },
    });
  }
  async getDraft(id: number) {
    return this.prisma.draft.findFirstOrThrow({
      where: {
        id,
      },
    });
  }
  async getDrafts(query: GetDrafts.Input) {
    const [drafts, count] = await Promise.all([
      this.prisma.draft.findMany({
        take: query.pagination.take,
        skip: query.pagination.skip,
        orderBy: {
          createdAt: 'desc',
        },
      }),
      this.prisma.draft.count(),
    ]);

    return {
      drafts,
      count,
    };
  }

  async postDraft(draft: PostDraft.Input, writer: string, owner: string) {
    return await this.prisma.draft.create({
      data: {
        title: draft.title,
        content: draft.content,
        writer,
        owner,
      },
    });
  }
}
