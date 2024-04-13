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

import './smartBudgeting/expectedIncomeData'
import './smartBudgeting/budgetCategoryData'
import './smartBudgeting/I_SRecordData'
import './api/v1/financial-consultant/ConsultantData';
import './api/v1/goal-tracker/GoalTrackerData';
import './api/v1/financial-statement/FinancialStatementData';

mock.onAny().passThrough();
