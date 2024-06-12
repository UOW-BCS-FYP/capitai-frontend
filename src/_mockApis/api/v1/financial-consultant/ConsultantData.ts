import mock from '../../../mock';
import bg1 from 'src/assets/images/blog/blog-img1.jpg';
import fakeChart from 'src/assets/images/financial-consultant/fake-chart.jpg'
import user1 from 'src/assets/images/profile/user-1.jpg';
import user2 from 'src/assets/images/profile/user-2.jpg';
// import user3 from 'src/assets/images/profile/user-3.jpg';
// import user4 from 'src/assets/images/profile/user-4.jpg';
// import user5 from 'src/assets/images/profile/user-5.jpg';
import adobe from 'src/assets/images/chat/icon-adobe.svg';
import chrome from 'src/assets/images/chat/icon-chrome.svg';
import figma from 'src/assets/images/chat/icon-figma.svg';
import java from 'src/assets/images/chat/icon-javascript.svg';
import zip from 'src/assets/images/chat/icon-zip-folder.svg';
// import { Chance } from 'chance';
import type { FetchFinancialConsultantRequestType, FinancialConsultant } from 'src/types/financial-consultant';
import { sub } from 'date-fns';
import { uniqueId } from 'lodash';

// const chance = new Chance();

// english names start with 'C':
// https://www.behindthename.com/names

const ConsultantData: FinancialConsultant[] = [
  {
    id: 1,
    name: 'Carson Capit',
    status: 'online',
    thumb: user1,
    recent: false,
    excerpt: 'AI Financial Consultant',
    messages: [
      {
        createdAt: sub(new Date(), { hours: 1 }),
        msg: 'Hi, i am AI powered financial advisor, Carson Capit',
        senderId: 1,
        type: 'text',
        attachments: [
          { icon: adobe, file: 'service-task.pdf', fileSize: '2MB' },
          { icon: chrome, file: 'homepage-design.fig', fileSize: '3MB' },
          { icon: figma, file: 'about-us.htmlf', fileSize: '1KB' },
          { icon: java, file: 'work-project.zip', fileSize: '20MB' },
          { icon: zip, file: 'custom.js', fileSize: '2MB' },
        ],
        id: uniqueId(),
      },
      {
        createdAt: sub(new Date(), { minutes: 30 }),
        msg: 'How can i help you today?',
        senderId: 1,
        type: 'text',
        attachments: [],
        id: uniqueId(),
      },
      {
        createdAt: sub(new Date(), { minutes: 6 }),
        msg: 'Should i invest in bitcoin? the price is going up',
        senderId: uniqueId(),
        type: 'text',
        attachments: [],
        id: uniqueId(),
      },
      {
        msg: fakeChart,
        senderId: uniqueId(),
        type: 'image',
        attachments: [],
        id: uniqueId(),
      },
      {
        createdAt: sub(new Date(), { minutes: 5 }),
        msg: 'Your provided image seem like a scam, please be careful',
        senderId: 1,
        type: 'text',
        attachments: [],
        id: uniqueId(),
      },
    ],
  },
  {
    id: 2,
    name: 'Sunny Capit',
    status: 'away',
    thumb: user2,
    recent: true,
    excerpt: 'AI Investment Strategist',
    messages: [
      {
        createdAt: sub(new Date(), { hours: 1 }),
        msg: 'Hi, i would like to invest in stock market, can you help me?',
        senderId: uniqueId(),
        type: 'text',
        attachments: [
          { icon: adobe, file: 'service-task.pdf', fileSize: '2MB' },
          { icon: chrome, file: 'homepage-design.fig', fileSize: '3MB' },
          { icon: java, file: 'work-project.zip', fileSize: '20MB' },
          { icon: zip, file: 'custom.js', fileSize: '2MB' },
        ],
        id: uniqueId(),
      },
      {
        createdAt: sub(new Date(), { minutes: 30 }),
        msg: 'Hi, i am Sunny Capit, AI powered investment strategist. I can help you with that.',
        senderId: 2,
        type: 'text',
        attachments: [],
        id: uniqueId(),
      },
      {
        createdAt: sub(new Date(), { minutes: 30 }),
        msg: 'I would like to know your risk tolerance and investment goal.',
        senderId: 2,
        type: 'text',
        attachments: [],
        id: uniqueId(),
      },
      {
        createdAt: sub(new Date(), { minutes: 6 }),
        msg: 'I am a risk taker, i would like to invest in high risk high return stocks',
        senderId: uniqueId(),
        type: 'text',
        attachments: [],
        id: uniqueId(),
      },
      {
        msg: 'Ok, i will provide you with a list of high risk high return stocks. Please be careful with the stocks, they are very volatile',
        senderId: 2,
        type: 'text',
        attachments: [],
        id: uniqueId(),
      },
      {
        msg: bg1,
        senderId: 2,
        type: 'image',
        attachments: [],
        id: uniqueId(),
      },
      {
        createdAt: sub(new Date(), { minutes: 1 }),
        msg: 'Thank you for the advice',
        senderId: uniqueId(),
        type: 'text',
        attachments: [],
        id: uniqueId(),
      },
    ],
  }
];

// mock.onGet('/api/data/financial-consultant/ConsultantData').reply(() => {
//   return [200, ConsultantData];
// });

// get all consultant chats
mock.onGet("/api/v1/financial-consultant/consultant-chat").reply((request) => {
  const { query, sortBy, sortOrder, page, rowsPerPage }: FetchFinancialConsultantRequestType = {
    query: "",
    sortBy: undefined,
    sortOrder: "asc",
    page: 0,
    rowsPerPage: 10,
    ...request.params,
  };
  let temp = ConsultantData;
  if (query) {
    temp = temp.filter((consultant) => consultant.name.toLowerCase().includes(query.toLowerCase()));
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

export default ConsultantData;
