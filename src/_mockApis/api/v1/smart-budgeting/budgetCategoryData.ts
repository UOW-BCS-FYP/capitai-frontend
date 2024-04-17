import mock from '../../../mock';

export type BudgetCategoryType = {
    id: number;
    title: string;
    amount: number;
    isActivated: boolean;
}

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
mock.onGet('/api/v1/smart-budgeting/budget-category').reply(() => {
    return [200, BudgetCategoryData];
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
mock.onDelete('/api/v1/smart-budgeting/budget-category').reply((request) => {
    const { id } = JSON.parse(request.data);
    const index = BudgetCategoryData.findIndex((budgetCategory) => budgetCategory.id === id);
    if (index > -1) {
        BudgetCategoryData.splice(index, 1);
        return [200, id];
    }
    return [400];
});

export default BudgetCategoryData;
