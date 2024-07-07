import mock from './mock';
import './blog/blogData';
import './contacts/ContactsData';
import './chat/Chatdata';
import './notes/NotesData';
import './ticket/TicketData';
import './eCommerce/ProductsData';
import './email/EmailData';
import './userprofile/PostData';
import './userprofile/UsersData';

import './api/v1/smart-budgeting/expectedIncomeData'
import './api/v1/smart-budgeting/budgetCategoryData'
import './api/v1/smart-budgeting/InSRecordData'
import './api/v1/financial-consultant/ConsultantData';
import './api/v1/goal-tracker/GoalTrackerData';
import './api/v1/financial-statement/FinancialStatementData';
import './api/v1/notification/notificationData';

mock.onAny().passThrough();
