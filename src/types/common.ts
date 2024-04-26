export type SortOrder = 'asc' | 'desc';

export type FetchRequestType<T> = {
  query?: string; // search query
  sortBy?: keyof T; // sort by
  sortOrder?: SortOrder; // sort order
  page?: number; // current page
  rowsPerPage?: number; // rows per page
};

export type FetchResponseType<T> = {
  data: T[];
  total: number;
};