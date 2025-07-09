export class PageResponse<T> {
  constructor(
    public content: T[] = [],
    public elementsSize = 0,
    public elementsTotal = 0,
    public pageNumber = 0,
    public pageSize = 10,
    public pageTotal = 0,
    public first = true,
    public last = true,
    public empty = true
  ) {}

  static empty<T>(): PageResponse<T> {
    return new PageResponse<T>();
  }

  static of<T>(content: T[], pageNumber = 0, pageSize = 10): PageResponse<T> {
    const totalElements = content.length;
    const totalPages = Math.ceil(totalElements / pageSize);
    const isEmpty = totalElements === 0;

    return new PageResponse<T>(
      content,
      totalElements, // elementsSize
      totalElements, // elementsTotal
      pageNumber,
      pageSize,
      totalPages,
      pageNumber === 0,
      pageNumber >= totalPages - 1,
      isEmpty
    );
  }

  static map<U, T>(response: PageResponse<U>, mapper: (item: U) => T): PageResponse<T> {
    return new PageResponse<T>(
      response.content.map(mapper),
      response.elementsSize,
      response.elementsTotal,
      response.pageNumber,
      response.pageSize,
      response.pageTotal,
      response.first,
      response.last,
      response.empty
    );
  }
}
