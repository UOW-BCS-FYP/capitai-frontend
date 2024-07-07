import mock from '../../../mock';
import { notificationType } from 'src/types/notification';

const NotificationData: notificationType[] = [
    {
        id: 1,
        title: 'Lunch time is now, warm reminder to record food spending today.',
        subtitle: 'Click to open I&S page',
        type: 'spending',
        url: '/smart-budgeting/income-n-spending'
    },
    {
        id: 2,
        title: 'A month has passed, warm reminder to review your budget plan.',
        subtitle: 'Click to open Budget Plan page',
        type: 'endOfMonth',
        url: '/smart-budgeting'
    },
    {
        id: 3,
        title: 'You have enough money for goal Tuition Fee, Congratutations!',
        subtitle: 'Click to open Goal Tracker page',
        type: 'goalReached',
        url: '/goal-tracker/stat'
    },
    {
        id: 4,
        title: 'Good morning, warm reminder to record your commute spending.',
        subtitle: 'Click to open I&S page',
        type: 'commute',
        url: '/smart-budgeting/income-n-spending'
    },
    {
        id: 5,
        title: 'Dinner time is now, warm reminder to record food spending today.',
        subtitle: 'Click to open I&S page',
        type: 'spending',
        url: '/smart-budgeting/income-n-spending'
    },
    {
        id: 6,
        title: 'You have enough money for goal Capital Building, Congratutations!',
        subtitle: 'Click to open Goal Tracker page',
        type: 'goalReached',
        url: '/goal-tracker/stat'
    },
    {
        id: 7,
        title: 'Good evening, warm reminder to record your commute spending.',
        subtitle: 'Click to open I&S page',
        type: 'commute',
        url: '/smart-budgeting/income-n-spending'
    },
];

mock.onGet('/api/v1/notif').reply(() => {
    const total = NotificationData.length;
    return [200, { data: NotificationData, total }];
});
//delete 1 notification
mock.onDelete(new RegExp(`/api/v1/notif/*`)).reply((request) => {
    const match = request.url?.match(/\/api\/v1\/notif\/([^\/]*)/);
    const id = match ? parseInt(match[1]) : 0;
    const index = NotificationData.findIndex((expInc) => expInc.id === id);
    if (index > -1) {
        NotificationData.splice(index, 1);
        return [200, id];
    }
    return [400];
});

export default NotificationData;
