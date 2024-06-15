import { InSRecordType } from 'src/types/smart-budgeting';
import mock from '../../../mock';

const InSRecordData: InSRecordType[] = [
    {
        id: 1,
        title: 'Rent Payment',
        amount: 10000,
        date: new Date(2021, 11, 17),
        subject: 'landlord',
        isIncome: false,
        category: 'rent',
    },
    {
        id: 2,
        title: 'MTR',
        amount: 10,
        date: new Date(2021, 11, 17),
        subject: 'MTR',
        isIncome: false,
        category: 'transport',
    },
    {
        id: 3,
        title: 'lunch',
        amount: 50,
        date: new Date(2021, 11, 17),
        subject: 'ABC restaurant',
        isIncome: false,
        category: 'food',
    },
    {
        id: 4,
        title: 'water bill payment',
        amount: 300,
        date: new Date(2021, 11, 17),
        subject: 'Water Supplies Department',
        isIncome: false,
        category: 'water bill',
    },
    {
        id: 5,
        title: 'wage',
        amount: 10000,
        date: new Date(2021, 1, 17),
        subject: 'manager',
        isIncome: true,
        category: 'wage',
    },
    {
        id: 6,
        title: 'stock exchange',
        amount: 10000,
        date: new Date(2021, 11, 17),
        subject: 'bank',
        isIncome: true,
        category: 'stocks',
    },
    {
        id: 7,
        title: 'website advertisement revenue',
        amount: 10000,
        date: new Date(2021, 11, 17),
        subject: 'google',
        isIncome: true,
        category: 'business',
    },
];

mock.onGet('/api/v1/smart-budgeting/income-spending-record').reply(() => {
    return [200, InSRecordData];
});

export default InSRecordData;
