import { ExpectedIncomeType, FetchExpectedIncomeRequestType } from 'src/types/smart-budgeting';
import mock from '../../../mock';

const ExpectedIncomeData: ExpectedIncomeType[] = [
    {
        id: 1,
        title:
            'wage',
        amount: 10000,
        isActivated: true
    },
    {
        id: 2,
        title:
            'stocks',
        amount: 20000,
        isActivated: true
    },
    {
        id: 3,
        title:
        'business',
        amount: 30000,
        isActivated: true
    },
];

mock.onGet('/api/v1/smart-budgeting/expected-income').reply((request) => {
    const { query, sortBy, sortOrder, page, rowsPerPage }: FetchExpectedIncomeRequestType = {
        query: "",
        sortBy: undefined,
        sortOrder: "asc",
        page: 0,
        rowsPerPage: 10,
        ...request.params,
    };
    let temp = ExpectedIncomeData;
    if (query) {
        temp = temp.filter((record) => record.title.toLowerCase().includes(query.toLowerCase()));
    }
    if (sortBy) {
        temp = temp.sort((a, b) => {
            const aVal = a[sortBy] ?? 0;
            const bVal = b[sortBy] ?? 0;
            if (aVal < bVal) return sortOrder === "asc" ? -1 : 1;
            if (aVal > bVal) return sortOrder === "asc" ? 1 : -1;
            return 0;
        });
    }
    const total = temp.length;
    temp = temp.slice(page! * rowsPerPage!, page! * rowsPerPage! + rowsPerPage!);
    return [200, { data: temp, total }];
});


export default ExpectedIncomeData;
