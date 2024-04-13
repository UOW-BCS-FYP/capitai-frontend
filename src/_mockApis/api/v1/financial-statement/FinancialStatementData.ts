import { PersonalFinanceStatementType } from "src/types/financial-statement";
import mock from "../../../mock";

const FinancialStatementData: PersonalFinanceStatementType[] = [
  {
    id: 1,
    openingBalance: 1000,
    totalCredit: 500,
    totalDebit: 200,
    closingBalance: 1300,
    month: 'January',
    year: 2021,
    userId: '1',
    createdAt: '2021-01-01',
    updatedAt: '2021-01-01'
  },
  {
    id: 2,
    openingBalance: 1300,
    totalCredit: 1000,
    totalDebit: 700,
    closingBalance: 1600,
    month: 'February',
    year: 2021,
    userId: '1',
    createdAt: '2021-02-01',
    updatedAt: '2021-02-01'
  },
  {
    id: 3,
    openingBalance: 1600,
    totalCredit: 800,
    totalDebit: 300,
    closingBalance: 2100,
    month: 'March',
    year: 2021,
    userId: '1',
    createdAt: '2021-03-01',
    updatedAt: '2021-03-01'
  },
  {
    id: 4,
    openingBalance: 2100,
    totalCredit: 1200,
    totalDebit: 500,
    closingBalance: 2800,
    month: 'April',
    year: 2021,
    userId: '1',
    createdAt: '2021-04-01',
    updatedAt: '2021-04-01'
  },
  {
    id: 5,
    openingBalance: 2800,
    totalCredit: 1500,
    totalDebit: 800,
    closingBalance: 2500,
    month: 'May',
    year: 2021,
    userId: '1',
    createdAt: '2021-05-01',
    updatedAt: '2021-05-01'
  },
  {
    id: 6,
    openingBalance: 2500,
    totalCredit: 2000,
    totalDebit: 1000,
    closingBalance: 3500,
    month: 'June',
    year: 2021,
    userId: '1',
    createdAt: '2021-06-01',
    updatedAt: '2021-06-01'
  },
  {
    id: 7,
    openingBalance: 3500,
    totalCredit: 2500,
    totalDebit: 1500,
    closingBalance: 4500,
    month: 'July',
    year: 2021,
    userId: '1',
    createdAt: '2021-07-01',
    updatedAt: '2021-07-01'
  },
  {
    id: 8,
    openingBalance: 4500,
    totalCredit: 3000,
    totalDebit: 2000,
    closingBalance: 5500,
    month: 'August',
    year: 2021,
    userId: '1',
    createdAt: '2021-08-01',
    updatedAt: '2021-08-01'
  },
  {
    id: 9,
    openingBalance: 5500,
    totalCredit: 3500,
    totalDebit: 2500,
    closingBalance: 6500,
    month: 'September',
    year: 2021,
    userId: '1',
    createdAt: '2021-09-01',
    updatedAt: '2021-09-01'
  },
  {
    id: 10,
    openingBalance: 6500,
    totalCredit: 4000,
    totalDebit: 3000,
    closingBalance: 7500,
    month: 'October',
    year: 2021,
    userId: '1',
    createdAt: '2021-10-01',
    updatedAt: '2021-10-01'
  },
  {
    id: 11,
    openingBalance: 7500,
    totalCredit: 4500,
    totalDebit: 3500,
    closingBalance: 8500,
    month: 'November',
    year: 2021,
    userId: '1',
    createdAt: '2021-11-01',
    updatedAt: '2021-11-01'
  },
  {
    id: 12,
    openingBalance: 8500,
    totalCredit: 5000,
    totalDebit: 4000,
    closingBalance: 9500,
    month: 'December',
    year: 2021,
    userId: '1',
    createdAt: '2021-12-01',
    updatedAt: '2021-12-01'
  }
];

mock.onGet('/api/financial-statement').reply(200, FinancialStatementData);
