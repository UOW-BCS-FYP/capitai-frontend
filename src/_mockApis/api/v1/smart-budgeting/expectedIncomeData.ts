import mock from '../../../mock';

export type ExpectedIncomeType = {
    id: number;
    title: string;
    amount: number;
    isActivated: boolean;
}

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

mock.onGet('/api/v1/smart-budgeting/expected-income').reply(() => {
    return [200, ExpectedIncomeData];
});


export default ExpectedIncomeData;
