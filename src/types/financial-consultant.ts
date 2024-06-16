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
  llm?: SocketChatType;
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

export interface SocketChatType {
  chain_start: {
    data: {
      input: string;
    }
  },
  chat_model_start: {
    data: string;
  },
  llm_new_token: string,
  llm_end: {
    data: {
      output: string | null;
    }
  },
  agent_finish: {
    output: string;
  }[],
  chain_end: {
    data: string;
    intermediate_steps: string[];
  },
  agent_id: string;
  message_id: string;
  agent_action: {
    tool: string;
    input: {
      symbol: string;
    }
  }[];
  tool_start: {
    tool: string;
    input: string;
  }[];
  tool_end: string[];
}