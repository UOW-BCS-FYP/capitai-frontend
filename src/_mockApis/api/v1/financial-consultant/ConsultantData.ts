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
import type { ChatsType } from 'src/types/financial-consultant';
import { sub } from 'date-fns';
import { uniqueId } from 'lodash';

// const chance = new Chance();

// english names start with 'C':
// https://www.behindthename.com/names

const ConsultantData: ChatsType[] = [
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
        attachment: [
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
        attachment: [],
        id: uniqueId(),
      },
      {
        createdAt: sub(new Date(), { minutes: 6 }),
        msg: 'Should i invest in bitcoin? the price is going up',
        senderId: uniqueId(),
        type: 'text',
        attachment: [],
        id: uniqueId(),
      },
      {
        msg: fakeChart,
        senderId: uniqueId(),
        type: 'image',
        attachment: [],
        id: uniqueId(),
      },
      {
        createdAt: sub(new Date(), { minutes: 5 }),
        msg: 'Your provided image seem like a scam, please be careful',
        senderId: 1,
        type: 'text',
        attachment: [],
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
        attachment: [
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
        attachment: [],
        id: uniqueId(),
      },
      {
        createdAt: sub(new Date(), { minutes: 30 }),
        msg: 'I would like to know your risk tolerance and investment goal.',
        senderId: 2,
        type: 'text',
        attachment: [],
        id: uniqueId(),
      },
      {
        createdAt: sub(new Date(), { minutes: 6 }),
        msg: 'I am a risk taker, i would like to invest in high risk high return stocks',
        senderId: uniqueId(),
        type: 'text',
        attachment: [],
        id: uniqueId(),
      },
      {
        msg: 'Ok, i will provide you with a list of high risk high return stocks. Please be careful with the stocks, they are very volatile',
        senderId: 2,
        type: 'text',
        attachment: [],
        id: uniqueId(),
      },
      {
        msg: bg1,
        senderId: 2,
        type: 'image',
        attachment: [],
        id: uniqueId(),
      },
      {
        createdAt: sub(new Date(), { minutes: 1 }),
        msg: 'Thank you for the advice',
        senderId: uniqueId(),
        type: 'text',
        attachment: [],
        id: uniqueId(),
      },
    ],
  },
  // {
  //   id: 3,
  //   name: 'David Smith',
  //   status: 'busy',
  //   thumb: user3,
  //   recent: false,
  //   excerpt: 'Hacker',
  //   messages: [
  //     {
  //       createdAt: sub(new Date(), { hours: 10 }),
  //       msg: chance.sentence({ words: 5 }),
  //       senderId: 1,
  //       type: 'text',
  //       attachment: [
  //         { icon: adobe, file: 'service-task.pdf', fileSize: '2MB' },
  //         { icon: zip, file: 'custom.js', fileSize: '2MB' },
  //       ],
  //       id: uniqueId(),
  //     },
  //     {
  //       createdAt: sub(new Date(), { minutes: 30 }),
  //       msg: chance.sentence({ words: 10 }),
  //       senderId: 1,
  //       type: 'text',
  //       attachment: [],
  //       id: uniqueId(),
  //     },
  //     {
  //       createdAt: sub(new Date(), { minutes: 6 }),
  //       msg: chance.sentence({ words: 5 }),
  //       senderId: 3,
  //       type: 'text',
  //       attachment: [],
  //       id: uniqueId(),
  //     },
  //     {
  //       createdAt: sub(new Date(), { minutes: 6 }),
  //       msg: chance.sentence({ words: 5 }),
  //       senderId: 3,
  //       type: 'text',
  //       attachment: [],
  //       id: uniqueId(),
  //     },

  //   ],
  // },
  // {
  //   id: 4,
  //   name: 'Maria Rodriguez',
  //   status: 'offline',
  //   thumb: user4,
  //   recent: true,
  //   excerpt: 'Please wait outside of the house',
  //   messages: [
  //     {
  //       createdAt: sub(new Date(), { hours: 1 }),
  //       msg: chance.sentence({ words: 5 }),
  //       senderId: 1,
  //       type: 'text',
  //       attachment: [],
  //       id: uniqueId(),
  //     },
  //     {
  //       createdAt: sub(new Date(), { hours: 10 }),
  //       msg: chance.sentence({ words: 5 }),
  //       senderId: 4,
  //       type: 'text',
  //       attachment: [
  //         { icon: java, file: 'work-project.zip', fileSize: '20MB' },
  //         { icon: zip, file: 'custom.js', fileSize: '2MB' },
  //       ],
  //       id: uniqueId(),
  //     },
  //     {
  //       createdAt: sub(new Date(), { hours: 11 }),
  //       msg: bg1,
  //       senderId: uniqueId(),
  //       type: 'image',
  //       attachment: [],
  //       id: uniqueId(),
  //     },
  //     {
  //       createdAt: sub(new Date(), { minutes: 6 }),
  //       msg: chance.sentence({ words: 5 }),
  //       senderId: 4,
  //       type: 'text',
  //       attachment: [],
  //       id: uniqueId(),
  //     },
  //     {
  //       createdAt: sub(new Date(), { minutes: 1 }),
  //       msg: chance.sentence({ words: 7 }),
  //       senderId: 3,
  //       type: 'text',
  //       attachment: [],
  //       id: uniqueId(),
  //     },
  //   ],
  // },
  // {
  //   id: 5,
  //   name: 'Robert Smith',
  //   status: 'online',
  //   thumb: user5,
  //   recent: true,
  //   excerpt: 'Front End Developer',
  //   messages: [
  //     {
  //       createdAt: sub(new Date(), { hours: 1 }),
  //       msg: chance.sentence({ words: 5 }),
  //       senderId: 1,
  //       type: 'text',
  //       attachment: [
  //         { icon: adobe, file: 'service-task.pdf', fileSize: '2MB' },
  //         { icon: chrome, file: 'homepage-design.fig', fileSize: '3MB' },
  //         { icon: figma, file: 'about-us.htmlf', fileSize: '1KB' },
  //         { icon: java, file: 'work-project.zip', fileSize: '20MB' },
  //         { icon: zip, file: 'custom.js', fileSize: '2MB' },
  //       ],
  //       id: uniqueId(),
  //     },
  //     {
  //       createdAt: sub(new Date(), { minutes: 30 }),
  //       msg: chance.sentence({ words: 10 }),
  //       senderId: 1,
  //       type: 'text',
  //       attachment: [],
  //       id: uniqueId(),
  //     },
  //     {
  //       createdAt: sub(new Date(), { minutes: 6 }),
  //       msg: chance.sentence({ words: 5 }),
  //       senderId: uniqueId(),
  //       type: 'text',
  //       attachment: [],
  //       id: uniqueId(),
  //     },
  //     {
  //       msg: bg1,
  //       senderId: 5,
  //       type: 'image',
  //       attachment: [],
  //       id: uniqueId(),
  //     },
  //     {
  //       createdAt: sub(new Date(), { minutes: 5 }),
  //       msg: chance.sentence({ words: 5 }),
  //       senderId: 5,
  //       type: 'text',
  //       attachment: [],
  //       id: uniqueId(),
  //     },
  //   ],
  // },
  // {
  //   id: 6,
  //   name: 'Joseph Sarah',
  //   status: 'busy',
  //   thumb: user1,
  //   recent: false,
  //   excerpt: 'Graphics Designer',
  //   messages: [
  //     {
  //       createdAt: sub(new Date(), { hours: 10 }),
  //       msg: chance.sentence({ words: 5 }),
  //       senderId: 1,
  //       type: 'text',
  //       attachment: [
  //         { icon: chrome, file: 'homepage-design.fig', fileSize: '3MB' },
  //         { icon: java, file: 'work-project.zip', fileSize: '20MB' },
  //         { icon: zip, file: 'custom.js', fileSize: '2MB' },
  //       ],
  //       id: uniqueId(),
  //     },
  //     {
  //       msg: bg1,
  //       senderId: uniqueId(),
  //       type: 'image',
  //       attachment: [],
  //       id: uniqueId(),
  //     },
  //     {
  //       createdAt: sub(new Date(), { minutes: 5 }),
  //       msg: chance.sentence({ words: 5 }),
  //       senderId: 1,
  //       type: 'text',
  //       attachment: [],
  //       id: uniqueId(),
  //     },
  //     {
  //       createdAt: sub(new Date(), { minutes: 2 }),
  //       msg: chance.sentence({ words: 5 }),
  //       senderId: 6,
  //       type: 'text',
  //       attachment: [],
  //       id: uniqueId(),
  //     },
  //   ],
  // },
  // {
  //   id: 7,
  //   name: 'Thomas Smith',
  //   status: 'away',
  //   thumb: user2,
  //   recent: true,
  //   excerpt: 'Back End Developer',
  //   messages: [
  //     {
  //       createdAt: sub(new Date(), { hours: 10 }),
  //       msg: chance.sentence({ words: 5 }),
  //       senderId: 1,
  //       type: 'text',
  //       attachment: [
  //         { icon: adobe, file: 'service-task.pdf', fileSize: '2MB' },
  //         { icon: chrome, file: 'homepage-design.fig', fileSize: '3MB' },
  //       ],
  //       id: uniqueId(),
  //     },
  //     {
  //       createdAt: sub(new Date(), { hours: 1 }),
  //       msg: chance.sentence({ words: 10 }),
  //       senderId: 1,
  //       type: 'text',
  //       attachment: [],
  //       id: uniqueId(),
  //     },
  //     {
  //       createdAt: sub(new Date(), { minutes: 15 }),
  //       msg: chance.sentence({ words: 5 }),
  //       senderId: 7,
  //       type: 'text',
  //       attachment: [],
  //       id: uniqueId(),
  //     },
  //     {
  //       createdAt: sub(new Date(), { minutes: 10 }),
  //       msg: chance.sentence({ words: 5 }),
  //       senderId: 7,
  //       type: 'text',
  //       attachment: [],
  //       id: uniqueId(),
  //     },
  //   ],
  // },
  // {
  //   id: 8,
  //   name: 'David Elizabeth',
  //   status: 'offline',
  //   thumb: user3,
  //   recent: false,
  //   excerpt: 'Theme Developer',
  //   messages: [
  //     {
  //       createdAt: sub(new Date(), { hours: 10 }),
  //       msg: chance.sentence({ words: 5 }),
  //       senderId: 1,
  //       type: 'text',
  //       attachment: [
  //         { icon: adobe, file: 'service-task.pdf', fileSize: '2MB' },
  //         { icon: java, file: 'work-project.zip', fileSize: '20MB' },
  //         { icon: zip, file: 'custom.js', fileSize: '2MB' },
  //       ],
  //       id: uniqueId(),
  //     },
  //     {
  //       createdAt: sub(new Date(), { hours: 6 }),
  //       msg: chance.sentence({ words: 5 }),
  //       senderId: 3,
  //       type: 'text',
  //       attachment: [],
  //       id: uniqueId(),
  //     },
  //     {
  //       createdAt: sub(new Date(), { hours: 6 }),
  //       msg: chance.sentence({ words: 5 }),
  //       senderId: 1,
  //       type: 'text',
  //       attachment: [],
  //       id: uniqueId(),
  //     },
  //     {
  //       createdAt: sub(new Date(), { minutes: 1 }),
  //       msg: chance.sentence({ words: 5 }),
  //       senderId: 8,
  //       type: 'text',
  //       attachment: [],
  //       id: uniqueId(),
  //     },
  //   ],
  // },
  // {
  //   id: 9,
  //   name: 'Charles Martha',
  //   status: 'online',
  //   thumb: user4,
  //   recent: false,
  //   excerpt: 'Administrator',
  //   messages: [
  //     {
  //       createdAt: sub(new Date(), { hours: 10 }),
  //       msg: chance.sentence({ words: 5 }),
  //       senderId: 1,
  //       type: 'text',
  //       attachment: [
  //         { icon: java, file: 'work-project.zip', fileSize: '20MB' },
  //         { icon: zip, file: 'custom.js', fileSize: '2MB' },
  //       ],
  //       id: uniqueId(),
  //     },
  //     {
  //       createdAt: sub(new Date(), { hours: 8 }),
  //       msg: chance.sentence({ words: 5 }),
  //       senderId: 3,
  //       type: 'text',
  //       attachment: [],
  //       id: uniqueId(),
  //     },
  //     {
  //       createdAt: sub(new Date(), { hours: 8 }),
  //       msg: chance.sentence({ words: 5 }),
  //       senderId: 3,
  //       type: 'text',
  //       attachment: [],
  //       id: uniqueId(),
  //     },
  //     {
  //       createdAt: sub(new Date(), { minutes: 5 }),
  //       msg: chance.sentence({ words: 5 }),
  //       senderId: 9,
  //       type: 'text',
  //       attachment: [],
  //       id: uniqueId(),
  //     },
  //     {
  //       createdAt: sub(new Date(), { minutes: 2 }),
  //       msg: chance.sentence({ words: 5 }),
  //       senderId: 9,
  //       type: 'text',
  //       attachment: [],
  //       id: uniqueId(),
  //     },
  //   ],
  // },
  // {
  //   id: 10,
  //   name: 'Samuel Eliza',
  //   status: 'online',
  //   thumb: user5,
  //   recent: false,
  //   excerpt: 'Doctor',
  //   messages: [
  //     {
  //       createdAt: sub(new Date(), { hours: 10 }),
  //       msg: chance.sentence({ words: 5 }),
  //       senderId: 1,
  //       type: 'text',
  //       attachment: [
  //         { icon: adobe, file: 'service-task.pdf', fileSize: '2MB' },
  //         { icon: zip, file: 'custom.js', fileSize: '2MB' },
  //       ],
  //       id: uniqueId(),
  //     },
  //     {
  //       createdAt: sub(new Date(), { hours: 11 }),
  //       msg: chance.sentence({ words: 5 }),
  //       senderId: 3,
  //       type: 'text',
  //       attachment: [],
  //       id: uniqueId(),
  //     },
  //     {
  //       createdAt: sub(new Date(), { hours: 6 }),
  //       msg: chance.sentence({ words: 5 }),
  //       senderId: 3,
  //       type: 'text',
  //       attachment: [],
  //       id: uniqueId(),
  //     },
  //     {
  //       createdAt: sub(new Date(), { hours: 6 }),
  //       msg: chance.sentence({ words: 5 }),
  //       senderId: 3,
  //       type: 'text',
  //       attachment: [],
  //       id: uniqueId(),
  //     },
  //     {
  //       createdAt: sub(new Date(), { minutes: 6 }),
  //       msg: chance.sentence({ words: 5 }),
  //       senderId: 10,
  //       type: 'text',
  //       attachment: [],
  //       id: uniqueId(),
  //     },
  //   ],
  // },
];

mock.onGet('/api/data/financial-consultant/ConsultantData').reply(() => {
  return [200, ConsultantData];
});

export default ConsultantData;
