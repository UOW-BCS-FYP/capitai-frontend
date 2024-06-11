export type ConsultantAttachement = {
  icon?: string;
  file?: string;
  fileSize?: string;
};

export type ConsultantMessage = {
  createdAt?: any;
  msg: string;
  senderId: number | string;
  type: string;
  attachments: ConsultantAttachement[];
  id: string;
};

export interface FinancialConsultant {
  id: number | string;
  name: string;
  status: 'online' | 'offline' | 'busy' | 'away';
  thumb: string;
  recent: boolean;
  excerpt: string;
  // chatHistory?: any[];
  messages: ConsultantMessage[];
}

export type SortOrder = 'asc' | 'desc';

export type FetchFinancialConsultantRequestType = {
  query?: string; // search query
  sortBy?: keyof FinancialConsultant; // sort by
  sortOrder?: SortOrder; // sort order
  page?: number; // current page
  rowsPerPage?: number; // rows per page
};

export type FetchFinancialConsultantResponseType = {
  data: FinancialConsultant[];
  total: number;
};
