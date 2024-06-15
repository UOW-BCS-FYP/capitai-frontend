import { ExpectedIncomeType, FetchExpectedIncomeRequestType } from 'src/types/smart-budgeting';
import mock from '../../../mock';

const ExpectedIncomeData: ExpectedIncomeType[] = [
    {
        id: 1,
        title:
            'wage',
        amount: 10000,
        isRegular: true,
        intervalMonth: 1,
        isActivated: true
    },
    {
        id: 2,
        title:
            'stocks',
        amount: 20000,
        isRegular: true,
        intervalMonth: 3,
        isActivated: true
    },
    {
        id: 3,
        title:
        'business',
        amount: 30000,
        isRegular: false,
        isActivated: true
    },
];

mock.onGet('/api/v1/smart-budgeting/expected-income').reply((request) => {
    const { query, sortBy, sortOrder, page, rowsPerPage, isRegular, isActivated, min, max }: FetchExpectedIncomeRequestType = {
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

    if (isRegular === 'true')
        temp = temp.filter((budgetCategory) => budgetCategory.isRegular);
    else if (isRegular === 'false')
        temp = temp.filter((budgetCategory) => !budgetCategory.isRegular);

    if (isActivated === 'true')
        temp = temp.filter((budgetCategory) => budgetCategory.isActivated);
    else if (isActivated === 'false')
        temp = temp.filter((budgetCategory) => !budgetCategory.isActivated);

    if (min)
        temp = temp.filter((budgetCategory) => budgetCategory.amount >= min);

    if (max)
        temp = temp.filter((budgetCategory) => budgetCategory.amount <= max);

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

// POST : Add new expected income
mock.onPost('/api/v1/smart-budgeting/expected-income').reply((request) => {
    const { title, amount, isRegular, intervalMonth, isActivated } = JSON.parse(request.data);
    const id = ExpectedIncomeData.length + 1;
    const newBudgetCategory = {
        id,
        title,
        amount,
        isRegular,
        intervalMonth,
        isActivated
    };
    ExpectedIncomeData.push(newBudgetCategory);
    return [200, newBudgetCategory];
});

// DELETE : Delete expected income
mock.onDelete(new RegExp(`/api/v1/smart-budgeting/expected-income/*`)).reply((request) => {
    const match = request.url?.match(/\/api\/v1\/smart-budgeting\/expected-income\/([^\/]*)/);
    const id = match ? parseInt(match[1]) : 0;
    const index = ExpectedIncomeData.findIndex((expInc) => expInc.id === id);
    if (index > -1) {
        ExpectedIncomeData.splice(index, 1);
        return [200, id];
    }
    return [400];
});

// PUT : Update budget category
mock.onPut(new RegExp(`/api/v1/smart-budgeting/expected-income/*`)).reply((request) => {
    const match = request.url?.match(/\/api\/v1\/smart-budgeting\/expected-income\/([^\/]*)/);
    const idToEdit = match ? parseInt(match[1]) : 0;
    const index = ExpectedIncomeData.findIndex((expInc) => expInc.id === idToEdit);
    if (index > -1) {
        const { id, title, amount, isRegular, intervalMonth, isActivated } = JSON.parse(request.data);
        const index = ExpectedIncomeData.findIndex((expInc) => expInc.id === id);
        ExpectedIncomeData[index] = { id, title, amount, isRegular, intervalMonth, isActivated };
        return [200, ExpectedIncomeData[index]];
    }
    return [400];
});

export default ExpectedIncomeData;
