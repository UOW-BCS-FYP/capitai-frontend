import { FetchRequestType, FetchResponseType } from "./common";

export type BudgetCategoryType = {
  id?: number;
  title: string;
    amount: number;
    intervalMonth?: number;
    isBill: boolean;
    lastInterval?: number;
    isActivated: boolean;
}

export type FetchBudgetCategoryRequestType = FetchRequestType<BudgetCategoryType>;
export type FetchBudgetCategoryResponseType = FetchResponseType<BudgetCategoryType>;

export type ExpectedIncomeType = {
  id: number;
  title: string;
  amount: number;
  isActivated: boolean;
}

export type FetchExpectedIncomeRequestType = FetchRequestType<ExpectedIncomeType>;

export type InSRecordType = {
  id: number;
  title: string;
  amount: number;
  date: Date;
  subject: string;
  isIncome: boolean;
  category: string;
}

export type FetchInSRecordRequestType = FetchRequestType<InSRecordType>;
