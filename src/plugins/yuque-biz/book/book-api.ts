import { request } from '@plugins/yuque-request';
import { getDefaultBookSlug } from '../util';

export type BookCreateParams = {
  name: string;
  slug?: string;
  description?: string;
};

export class BookApi {
  async getLastestEditBook() {
    const res: any = await request({
      url: '/api/recent/list',
      config: {
        method: 'GET',
        data: {
          offset: 0,
          limit: 1,
          action: 'Edit',
          type: 'Doc',
        },
      },
    });

    return res?.data?.list?.[0]?.book;
  }

  async createBook(book: BookCreateParams) {
    const res: any = await request({
      url: '/api/books',
      config: {
        method: 'POST',
        data: {
          type: 'Book',
          name: book.name,
          slug: book.slug || getDefaultBookSlug(),
          description: book.description || '',
        },
      },
    });

    return res?.data;
  }
}