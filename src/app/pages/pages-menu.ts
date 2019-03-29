import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Dashboard',
    icon: 'nb-home',
    link: '/pages/dashboard',
    home: true,
  },
  {
    title: 'Meetingroom Profiles',
    icon: 'nb-compose',
    children: [
      {
        title: 'Meetingrooms',
        link: '/pages/meetingroom/meetingroom-list',
      },
    ],
  },
  {
    title: 'Device Profiles',
    icon: 'nb-compose',
    children: [
      {
        title: 'Devices',
        link: '/pages/device/device-list',
      },
    ],
  },
  {
    title: 'FEATURES',
    group: true,
  },
  {
    title: 'Auth',
    icon: 'nb-locked',
    children: [
      {
        title: 'Login',
        link: '/auth/login',
      },
      {
        title: 'Register',
        link: '/auth/register',
      },
      {
        title: 'Request Password',
        link: '/auth/request-password',
      },
      {
        title: 'Reset Password',
        link: '/auth/reset-password',
      },
    ],
  },
];
