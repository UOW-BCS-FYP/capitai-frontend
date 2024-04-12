import mock from '../mock';

export type budgetCategoryType = {
    id: number;
    title: string;
    amount: number;
    isActivated: boolean;
}

const BudgetCategoryData: budgetCategoryType[] = [
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
mock.onGet('/api/data/sbs/BudgetCategory').reply(() => {
    return [200, BudgetCategoryData];
});
export default BudgetCategoryData;
