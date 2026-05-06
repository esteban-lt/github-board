const SORT_OPTIONS = ['stars', 'forks', 'updated_at', 'name'] as const;
const ORDER_OPTIONS = ['asc', 'desc'] as const;

type Sort = typeof SORT_OPTIONS[number];
type Order = typeof ORDER_OPTIONS[number];

interface Options {
  page: number;
  limit: number;
  search?: string;
  language?: string;
  sort: Sort;
  order: Order;
}

export class GetRepositoriesDto {

  public readonly page: number;
  public readonly limit: number;
  public readonly search?: string;
  public readonly language?: string;
  public readonly sort: Sort;
  public readonly order: Order;

  private constructor(options: Options) {
    this.page = options.page;
    this.limit = options.limit;
    this.search = options.search;
    this.language = options.language;
    this.sort = options.sort;
    this.order = options.order;  
  }

  public static create(input: Record<string, unknown>): [string?, GetRepositoriesDto?] {
    const page = Number(input.page ?? 1);
    const limit = Number(input.limit ?? 25);
    const search = typeof input.search === 'string' ? input.search.trim() || undefined : undefined;
    const language = typeof input.language === 'string' ? input.language.trim() || undefined : undefined;
    const sort = (input.sort || 'updated_at') as Sort;
    const order = (input.order || 'desc') as Order;

    if(!Number.isInteger(page)) return ['Page must be an integer'];
    if(!Number.isInteger(limit)) return ['Limit must be an integer'];
    if(page < 1) return ['Page must be a positive number'];
    if(limit < 1 || limit > 100) return ['Limit must be between 1 and 100'];
    if(!SORT_OPTIONS.includes(sort)) return [`Sort must be one of: ${SORT_OPTIONS.join(', ')}`];
    if(!ORDER_OPTIONS.includes(order)) return [`Order must be  one of ${ORDER_OPTIONS.join(', ')}`];

    return [
      undefined, 
      new GetRepositoriesDto({
        page,
        limit,
        search,
        language,
        sort,
        order
      }
    )];
  }
}
