import { uniqueId } from 'lodash';

interface MenuitemsType {
  [x: string]: any;
  id?: string;
  navlabel?: boolean;
  subheader?: string;
  title?: string;
  icon?: any;
  href?: string;
  children?: MenuitemsType[];
  chip?: string;
  chipColor?: string;
  variant?: string;
  external?: boolean;
}
import {
  IconAward,
  IconBoxMultiple,
  IconPoint,
  IconAlertCircle,
  IconNotes,
  IconCalendar,
  IconMail,
  IconTicket,
  IconEdit,
  IconGitMerge,
  IconCurrencyDollar,
  IconApps,
  IconFileDescription,
  IconFileDots,
  IconFiles,
  IconBan,
  IconStar,
  IconMoodSmile,
  IconBorderAll,
  IconBorderHorizontal,
  IconBorderInner,
  IconBorderVertical,
  IconBorderTop,
  IconUserCircle,
  IconPackage,
  IconMessage2,
  IconBasket,
  IconChartLine,
  IconChartArcs,
  IconChartCandle,
  IconChartArea,
  IconChartDots,
  IconChartDonut3,
  IconChartRadar,
  IconLogin,
  IconUserPlus,
  IconRotate,
  IconBox,
  IconShoppingCart,
  IconAperture,
  IconLayout,
  IconSettings,
  IconHelp,
  IconZoomCode,
  IconBoxAlignBottom,
  IconBoxAlignLeft,
  IconBorderStyle2,
  IconAppWindow,
  IconMessages
} from '@tabler/icons-react';

const Menuitems: MenuitemsType[] = [
  // {
  //   navlabel: true,
  //   subheader: 'Navigation',
  // },
  {
    navlabel: true,
    subheader: 'Menu',
  },
  {
    id: uniqueId(),
    title: 'Dashboard',
    icon: IconAperture,
    href: '/dashboard',
  },
  {
    id: uniqueId(),
    title: 'Smart Budgeting',
    icon: IconCurrencyDollar,
    href: '/smart-budgeting/',
    children: [
      {
        id: uniqueId(),
        title: 'Budget Plan',
        icon: IconPoint,
        href: '/smart-budgeting',
      },
      {
        id: uniqueId(),
        title: 'Income & Spending',
        icon: IconPoint,
        href: '/smart-budgeting/income-n-spending',
      },
    ],
  },
  {
    id: uniqueId(),
    title: 'Goal Tracker',
    icon: IconAward,
    href: '/goal-tracker/',
    children: [
      {
        id: uniqueId(),
        title: 'Goals',
        icon: IconPoint,
        href: '/goal-tracker/stat',
      },
      {
        id: uniqueId(),
        title: 'Create Goal',
        icon: IconPoint,
        href: '/goal-tracker/create',
      }
    ]
  },
  // {
  //   navlabel: true,
  //   subheader: 'Financial Services',
  // },
  {
    id: uniqueId(),
    title: 'Financial Advisor',
    icon: IconMessages,
    href: '/financial-consultant'
    // chip: 'AI',
    // chipColor: 'secondary',
  },
  // {
  //   id: uniqueId(),
  //   title: 'Investment Strategist',
  //   icon: IconChartDots,
  //   href: '/investment-strategist',
  //   chip: 'AI',
  //   chipColor: 'secondary',
  // },
  // {
  //   navlabel: true,
  //   subheader: 'Financial Reports',
  // },
  {
    id: uniqueId(),
    title: 'Financial Statement',
    icon: IconNotes,
    href: '/financial-statement',
  },

  {
    navlabel: true,
    subheader: 'Dashboards',
  },

  {
    id: uniqueId(),
    title: 'Modern',
    icon: IconAperture,
    href: '/dashboards/modern',
    chip: 'New',
    chipColor: 'secondary',
  },
  {
    id: uniqueId(),
    title: 'eCommerce',
    icon: IconShoppingCart,
    href: '/dashboards/ecommerce',
  },
  {
    navlabel: true,
    subheader: 'Apps',
  },
  {
    id: uniqueId(),
    title: 'Contacts',
    icon: IconPackage,
    chip: '2',
    chipColor: 'secondary',
    href: '/apps/contacts',
  },

  {
    id: uniqueId(),
    title: 'Blog',
    icon: IconChartDonut3,
    href: '/apps/blog/',
    children: [
      {
        id: uniqueId(),
        title: 'Posts',
        icon: IconPoint,
        href: '/apps/blog/posts',
      },
      {
        id: uniqueId(),
        title: 'Detail',
        icon: IconPoint,
        href: '/apps/blog/detail/streaming-video-way-before-it-was-cool-go-dark-tomorrow',
      },
    ],
  },
  {
    id: uniqueId(),
    title: 'Ecommerce',
    icon: IconBasket,
    href: '/apps/ecommerce/',
    children: [
      {
        id: uniqueId(),
        title: 'Shop',
        icon: IconPoint,
        href: '/apps/ecommerce/shop',
      },
      {
        id: uniqueId(),
        title: 'Detail',
        icon: IconPoint,
        href: '/apps/ecommerce/detail/1',
      },
      {
        id: uniqueId(),
        title: 'List',
        icon: IconPoint,
        href: '/apps/ecommerce/eco-product-list',
      },
      {
        id: uniqueId(),
        title: 'Checkout',
        icon: IconPoint,
        href: '/apps/ecommerce/eco-checkout',
      },
    ],
  },
  {
    id: uniqueId(),
    title: 'Chats',
    icon: IconMessage2,
    href: '/apps/chats',
  },
  {
    id: uniqueId(),
    title: 'Users',
    icon: IconUserCircle,
    href: '/user-profile',
    children: [
      {
        id: uniqueId(),
        title: 'Profile',
        icon: IconPoint,
        href: '/user-profile',
      },
      {
        id: uniqueId(),
        title: 'Followers',
        icon: IconPoint,
        href: '/apps/followers',
      },
      {
        id: uniqueId(),
        title: 'Friends',
        icon: IconPoint,
        href: '/apps/friends',
      },
      {
        id: uniqueId(),
        title: 'Gallery',
        icon: IconPoint,
        href: '/apps/gallery',
      },
    ],
  },
  {
    id: uniqueId(),
    title: 'Notes',
    icon: IconNotes,
    href: '/apps/notes',
  },
  {
    id: uniqueId(),
    title: 'Calendar',
    icon: IconCalendar,
    href: '/apps/calendar',
  },
  {
    id: uniqueId(),
    title: 'Email',
    icon: IconMail,
    href: '/apps/email',
  },
  {
    id: uniqueId(),
    title: 'Tickets',
    icon: IconTicket,
    href: '/apps/tickets',
  },
  {
    navlabel: true,
    subheader: 'Pages',
  },

  {
    id: uniqueId(),
    title: 'Treeview',
    icon: IconGitMerge,
    href: '/pages/treeview',
  },
  {
    id: uniqueId(),
    title: 'Pricing',
    icon: IconCurrencyDollar,
    href: '/pages/pricing',
  },
  {
    id: uniqueId(),
    title: 'Account Setting',
    icon: IconUserCircle,
    href: '/pages/account-settings',
  },
  {
    id: uniqueId(),
    title: 'FAQ',
    icon: IconHelp,
    href: '/pages/faq',
  },
  {
    id: uniqueId(),
    title: 'Landingpage',
    icon: IconAppWindow,
    href: '/landingpage',
  },
  {
    id: uniqueId(),
    title: 'Widgets',
    icon: IconLayout,
    href: '/widgets/cards',
    children: [
      {
        id: uniqueId(),
        title: 'Cards',
        icon: IconPoint,
        href: '/widgets/cards',
      },
      {
        id: uniqueId(),
        title: 'Banners',
        icon: IconPoint,
        href: '/widgets/banners',
      },
      {
        id: uniqueId(),
        title: 'Charts',
        icon: IconPoint,
        href: '/widgets/charts',
      },
    ],
  },
  {
    navlabel: true,
    subheader: 'Forms',
  },
  {
    id: uniqueId(),
    title: 'Form Elements',
    icon: IconApps,
    href: '/forms/form-elements/autocomplete',
    children: [
      {
        id: uniqueId(),
        title: 'Autocomplete',
        icon: IconPoint,
        href: '/forms/form-elements/autocomplete',
      },
      {
        id: uniqueId(),
        title: 'Button',
        icon: IconPoint,
        href: '/forms/form-elements/button',
      },
      {
        id: uniqueId(),
        title: 'Checkbox',
        icon: IconPoint,
        href: '/forms/form-elements/checkbox',
      },
      {
        id: uniqueId(),
        title: 'Radio',
        icon: IconPoint,
        href: '/forms/form-elements/radio',
      },
      {
        id: uniqueId(),
        title: 'Date Time',
        icon: IconPoint,
        href: '/forms/form-elements/date-time',
      },
      {
        id: uniqueId(),
        title: 'Slider',
        icon: IconPoint,
        href: '/forms/form-elements/slider',
      },
      {
        id: uniqueId(),
        title: 'Switch',
        icon: IconPoint,
        href: '/forms/form-elements/switch',
      },
    ],
  },
  {
    id: uniqueId(),
    title: 'Form Layout',
    icon: IconFileDescription,
    href: '/forms/form-layouts',
  },
  {
    id: uniqueId(),
    title: 'Form Horizontal',
    icon: IconBoxAlignBottom,
    href: '/forms/form-horizontal',
  },
  {
    id: uniqueId(),
    title: 'Form Vertical',
    icon: IconBoxAlignLeft,
    href: '/forms/form-vertical',
  },
  {
    id: uniqueId(),
    title: 'Form Custom',
    icon: IconFileDots,
    href: '/forms/form-custom',
  },
  {
    id: uniqueId(),
    title: 'Form Wizard',
    icon: IconFiles,
    href: '/forms/form-wizard',
  },
  {
    id: uniqueId(),
    title: 'Form Validation',
    icon: IconFiles,
    href: '/forms/form-validation',
  },
  {
    id: uniqueId(),
    title: 'Quill Editor',
    icon: IconEdit,
    href: '/forms/quill-editor',
  },
  {
    navlabel: true,
    subheader: 'Tables',
  },
  {
    id: uniqueId(),
    title: 'Basic',
    icon: IconBorderAll,
    href: '/tables/basic',
  },
  {
    id: uniqueId(),
    title: 'Collapsible',
    icon: IconBorderHorizontal,
    href: '/tables/collapsible',
  },
  {
    id: uniqueId(),
    title: 'Enhanced',
    icon: IconBorderInner,
    href: '/tables/enhanced',
  },
  {
    id: uniqueId(),
    title: 'Fixed Header',
    icon: IconBorderVertical,
    href: '/tables/fixed-header',
  },
  {
    id: uniqueId(),
    title: 'Pagination',
    icon: IconBorderTop,
    href: '/tables/pagination',
  },
  {
    id: uniqueId(),
    title: 'Search',
    icon: IconBorderStyle2,
    href: '/tables/search',
  },
  {
    navlabel: true,
    subheader: 'UI',
  },
  {
    id: uniqueId(),
    title: 'Ui Components',
    icon: IconBox,
    href: '/ui-components/alert',
    children: [
      {
        id: uniqueId(),
        title: 'Alert',
        icon: IconPoint,
        href: '/ui-components/alert',
      },
      {
        id: uniqueId(),
        title: 'Accordion',
        icon: IconPoint,
        href: '/ui-components/accordion',
      },
      {
        id: uniqueId(),
        title: 'Avatar',
        icon: IconPoint,
        href: '/ui-components/avatar',
      },
      {
        id: uniqueId(),
        title: 'Chip',
        icon: IconPoint,
        href: '/ui-components/chip',
      },
      {
        id: uniqueId(),
        title: 'Dialog',
        icon: IconPoint,
        href: '/ui-components/dialog',
      },
      {
        id: uniqueId(),
        title: 'List',
        icon: IconPoint,
        href: '/ui-components/list',
      },
      {
        id: uniqueId(),
        title: 'Popover',
        icon: IconPoint,
        href: '/ui-components/popover',
      },
      {
        id: uniqueId(),
        title: 'Rating',
        icon: IconPoint,
        href: '/ui-components/rating',
      },
      {
        id: uniqueId(),
        title: 'Tabs',
        icon: IconPoint,
        href: '/ui-components/tabs',
      },
      {
        id: uniqueId(),
        title: 'Tooltip',
        icon: IconPoint,
        href: '/ui-components/tooltip',
      },
      {
        id: uniqueId(),
        title: 'Transfer List',
        icon: IconPoint,
        href: '/ui-components/transfer-list',
      },
      {
        id: uniqueId(),
        title: 'Typography',
        icon: IconPoint,
        href: '/ui-components/typography',
      },
    ],
  },

  {
    navlabel: true,
    subheader: 'Charts',
  },
  {
    id: uniqueId(),
    title: 'Line',
    icon: IconChartLine,
    href: '/charts/line-chart',
  },
  {
    id: uniqueId(),
    title: 'Gredient',
    icon: IconChartArcs,
    href: '/charts/gredient-chart',
  },
  {
    id: uniqueId(),
    title: 'Area',
    icon: IconChartArea,
    href: '/charts/area-chart',
  },
  {
    id: uniqueId(),
    title: 'Candlestick',
    icon: IconChartCandle,
    href: '/charts/candlestick-chart',
  },
  {
    id: uniqueId(),
    title: 'Column',
    icon: IconChartDots,
    href: '/charts/column-chart',
  },
  {
    id: uniqueId(),
    title: 'Doughtnut & Pie',
    icon: IconChartDonut3,
    href: '/charts/doughnut-pie-chart',
  },
  {
    id: uniqueId(),
    title: 'RadialBar & Radar',
    icon: IconChartRadar,
    href: '/charts/radialbar-chart',
  },
  {
    navlabel: true,
    subheader: 'Auth',
  },
  
  {
    id: uniqueId(),
    title: 'Login',
    icon: IconLogin,
    href: '/auth/login',
    children: [
      {
        id: uniqueId(),
        title: 'Side Login',
        icon: IconPoint,
        href: '/auth/login',
      },
      {
        id: uniqueId(),
        title: 'Boxed Login',
        icon: IconPoint,
        href: '/auth/login2',
      },
    ],
  },
  {
    id: uniqueId(),
    title: 'Register',
    icon: IconUserPlus,
    href: '/auth/register',
    children: [
      {
        id: uniqueId(),
        title: 'Side Register',
        icon: IconPoint,
        href: '/auth/register',
      },
      {
        id: uniqueId(),
        title: 'Boxed Register',
        icon: IconPoint,
        href: '/auth/register2',
      },
    ],
  },
  {
    id: uniqueId(),
    title: 'Forgot Password',
    icon: IconRotate,
    href: '/auth/forgot-password',
    children: [
      {
        id: uniqueId(),
        title: 'Side Forgot Password',
        icon: IconPoint,
        href: '/auth/forgot-password',
      },
      {
        id: uniqueId(),
        title: 'Boxed Forgot Password',
        icon: IconPoint,
        href: '/auth/forgot-password2',
      },
    ],
  },

  {
    id: uniqueId(),
    title: 'Two Steps',
    icon: IconZoomCode,
    href: '/auth/two-steps',
    children: [
      {
        id: uniqueId(),
        title: 'Side Two Steps',
        icon: IconPoint,
        href: '/auth/two-steps',
      },
      {
        id: uniqueId(),
        title: 'Boxed Two Steps',
        icon: IconPoint,
        href: '/auth/two-steps2',
      },
    ]
  },
  {
    id: uniqueId(),
    title: 'Error',
    icon: IconAlertCircle,
    href: '/400',
  },
  {
    id: uniqueId(),
    title: 'Maintenance',
    icon: IconSettings,
    href: '/auth/maintenance',
  },
 
  {
    navlabel: true,
    subheader: 'Other',
  },
  {
    id: uniqueId(),
    title: 'Menu Level',
    icon: IconBoxMultiple,
    href: '/menulevel/',
    children: [
      {
        id: uniqueId(),
        title: 'Level 1',
        icon: IconPoint,
        href: '/l1',
      },
      {
        id: uniqueId(),
        title: 'Level 1.1',
        icon: IconPoint,
        href: '/l1.1',
        children: [
          {
            id: uniqueId(),
            title: 'Level 2',
            icon: IconPoint,
            href: '/l2',
          },
          {
            id: uniqueId(),
            title: 'Level 2.1',
            icon: IconPoint,
            href: '/l2.1',
            children: [
              {
                id: uniqueId(),
                title: 'Level 3',
                icon: IconPoint,
                href: '/l3',
              },
              {
                id: uniqueId(),
                title: 'Level 3.1',
                icon: IconPoint,
                href: '/l3.1',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: uniqueId(),
    title: 'Disabled',
    icon: IconBan,
    href: '/',
    disabled: true,
  },
  {
    id: uniqueId(),
    title: 'SubCaption',
    subtitle: 'This is the sutitle',
    icon: IconStar,
    href: '/',
  },

  {
    id: uniqueId(),
    title: 'Chip',
    icon: IconAward,
    href: '/',
    chip: '9',
    chipColor: 'primary',
  },
  {
    id: uniqueId(),
    title: 'Outlined',
    icon: IconMoodSmile,
    href: '/',
    chip: 'outline',
    variant: 'outlined',
    chipColor: 'primary',
  },
  {
    id: uniqueId(),
    title: 'External Link',
    external: true,
    icon: IconStar,
    href: 'https://google.com',
  },
];

export default Menuitems;
