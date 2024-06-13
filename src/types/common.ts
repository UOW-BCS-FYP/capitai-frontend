export type SortOrder = 'asc' | 'desc';

export type FetchRequestType<T> = {
  query?: string; // search query
  sortBy?: keyof T; // sort by
  sortOrder?: SortOrder; // sort order
  page?: number; // current page
  rowsPerPage?: number; // rows per page
  isRegular?: String; //budget ctgy & expinc
  isActivated?: String; //budget ctgy & expinc
  dateStart?: string; //i&s date range filter
  dateEnd?: string; //i&s date range filter
  subject?: string; //i&s
  isIncome?: string; //i&s
  category?: string; //i&s
  min?: number;
  max?: number;
};

export type FetchResponseType<T> = {
  data: T[];
  total: number;
};