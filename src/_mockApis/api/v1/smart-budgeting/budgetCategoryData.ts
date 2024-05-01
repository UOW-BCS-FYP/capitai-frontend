import { BudgetCategoryType, FetchBudgetCategoryRequestType } from 'src/types/smart-budgeting';
import mock from '../../../mock';

const BudgetCategoryData: BudgetCategoryType[] = [
    {
        id: 1,
        title:
            'rent',
        amount: 10000,
        isActivated: true
    },
    {
        id: 2,
        title:
            'transportation',
        amount: 200,
        isActivated: true
    },
    {
        id: 3,
        title:
            'food',
        amount: 3000,
        isActivated: true
    },
    {
        id: 4,
        title:
            'water bill',
        amount: 300,
        isActivated: true
    },
    {
        id: 5,
        title:
            'other',
        amount: 500,
        isActivated: true
    },
];

// GET : Fetch all budget category
mock.onGet('/api/v1/smart-budgeting/budget-category').reply((request) => {
    const { query, sortBy, sortOrder, page, rowsPerPage }: FetchBudgetCategoryRequestType = {
        query: "",
        sortBy: undefined,
        sortOrder: "asc",
        page: 0,
        rowsPerPage: 10,
        ...request.params,
    };
    let temp = BudgetCategoryData;
    if (query) {
        temp = temp.filter((budgetCategory) => budgetCategory.title.toLowerCase().includes(query.toLowerCase()));
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

// POST : Add new budget category
mock.onPost('/api/v1/smart-budgeting/budget-category').reply((request) => {
    const { title, amount, isActivated } = JSON.parse(request.data);
    const id = BudgetCategoryData.length + 1;
    const newBudgetCategory = {
        id,
        title,
        amount,
        isActivated
    };
    BudgetCategoryData.push(newBudgetCategory);
    return [200, newBudgetCategory];
});

// PUT : Update budget category
mock.onPut('/api/v1/smart-budgeting/budget-category').reply((request) => {
    const { id, title, amount, isActivated } = JSON.parse(request.data);
    const index = BudgetCategoryData.findIndex((budgetCategory) => budgetCategory.id === id);
    if (index > -1) {
        BudgetCategoryData[index] = { id, title, amount, isActivated };
        return [200, BudgetCategoryData[index]];
    }
    return [400];
});

// DELETE : Delete budget category
mock.onDelete('/api/v1/smart-budgeting/budget-category/*').reply((request) => {
    const match = request.url?.match(/\/api\/v1\/smart-budgeting\/budget-category\/([^\/]*)/);
    const id = match ? parseInt(match[1]) : 0;
    const index = BudgetCategoryData.findIndex((budgetCategory) => budgetCategory.id === id);
    if (index > -1) {
        BudgetCategoryData.splice(index, 1);
        return [200, id];
    }
    return [400];
});

export default BudgetCategoryData;
