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
import './financial-consultant/ConsultantData';
import './goal-tracker/GoalTrackerData';

mock.onAny().passThrough();
