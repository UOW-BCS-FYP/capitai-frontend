import { FetchInSRecordRequestType, InSRecordType } from 'src/types/smart-budgeting';
import mock from '../../../mock';

const InSRecordData: InSRecordType[] = [
    {
        id: 1,
        title: 'rent payment',
        amount: 10000,
        date: new Date('2021-11-17'),
        subject: 'landlord',
        isIncome: false,
        category: 'rent',
    },
    {
        id: 2,
        title: 'MTR',
        amount: 10,
        date: new Date('2021-11-17'),
        subject: 'MTR',
        isIncome: false,
        category: 'transport',
    },
    {
        id: 3,
        title: 'lunch',
        amount: 50,
        date: new Date('2021-11-17'),
        subject: 'ABC restaurant',
        isIncome: false,
        category: 'food',
    },
    {
        id: 4,
        title: 'water bill payment',
        amount: 300,
        date: new Date('2021-11-17'),
        subject: 'Water Supplies Department',
        isIncome: false,
        category: 'water bill',
    },
    {
        id: 5,
        title: 'wage',
        amount: 10000,
        date: new Date('2021-11-17'),
        subject: 'manager',
        isIncome: true,
        category: 'wage',
    },
    {
        id: 6,
        title: 'stock exchange',
        amount: 10000,
        date: new Date('2021-11-17'),
        subject: 'bank',
        isIncome: true,
        category: 'stocks',
    },
    {
        id: 7,
        title: 'website advertisement revenue',
        amount: 10000,
        date: new Date('2021-11-17'),
        subject: 'google',
        isIncome: true,
        category: 'business',
    },
];

mock.onGet('/api/v1/smart-budgeting/income-spending-record').reply((request) => {
    const { query, sortBy, sortOrder, page, rowsPerPage, dateStart, dateEnd, isIncome, min, max }: FetchInSRecordRequestType = {
        query: "",
        sortBy: undefined,
        sortOrder: "asc",
        page: 0,
        rowsPerPage: 10,
        ...request.params,
    };
    let temp = InSRecordData;
    if (query) {
        temp = temp.filter((record) => record.title.toLowerCase().includes(query.toLowerCase()));
    }

    if (dateStart)
        temp = temp.filter((InSRecord) => (InSRecord.date as Date).getTime() >= dateStart.getTime());

    if (dateEnd)
        temp = temp.filter((InSRecord) => (InSRecord.date as Date).getTime() <= dateEnd.getTime());

    if (isIncome === 'true')
        temp = temp.filter((InSRecord) => InSRecord.isIncome);
    else if (isIncome === 'false')
        temp = temp.filter((InSRecord) => !InSRecord.isIncome);

    if (min)
        temp = temp.filter((InSRecord) => InSRecord.amount >= min);
    
    if (max)
        temp = temp.filter((InSRecord) => InSRecord.amount <= max);

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

mock.onPost('/api/v1/smart-budgeting/income-spending-record').reply((request) => {
    const { title, amount, subject, isIncome} = JSON.parse(request.data);
    const id = InSRecordData.length + 1;
    const category = 'other';
    const date = new Date();
    const newInSRecord = {
        id,
        title,
        amount,
        subject,
        isIncome,
        category,
        date
    };
    InSRecordData.push(newInSRecord);
    return [200, newInSRecord];
});

mock.onDelete(new RegExp(`/api/v1/smart-budgeting/income-spending-record/*`)).reply((request) => {
    const match = request.url?.match(/\/api\/v1\/smart-budgeting\/income-spending-record\/([^\/]*)/);
    const id = match ? parseInt(match[1]) : 0;
    const index = InSRecordData.findIndex((InSRecord) => InSRecord.id === id);
    if (index > -1) {
        InSRecordData.splice(index, 1);
        return [200, id];
    }
    return [400];
});

mock.onPut(new RegExp(`/api/v1/smart-budgeting/income-spending-record/*`)).reply((request) => {
    const match = request.url?.match(/\/api\/v1\/smart-budgeting\/income-spending-record\/([^\/]*)/);
    const idToEdit = match ? parseInt(match[1]) : 0;
    const index = InSRecordData.findIndex((InSRecord) => InSRecord.id === idToEdit);
    if (index > -1) {
        const { id, title, amount, subject } = JSON.parse(request.data);
        const index = InSRecordData.findIndex((InSRecord) => InSRecord.id === id);
        InSRecordData[index] = { id, ...InSRecordData[index], title, amount, subject, };
        return [200, InSRecordData[index]];
    }
    return [400];
});

export default InSRecordData;
