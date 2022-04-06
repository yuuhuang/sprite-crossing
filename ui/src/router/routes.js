import pages from '@/pages'

export default [
  {
    name: 'home',
    path: '/',
    component: pages.Home,
    title: 'Home',
  },
  {
    name: 'create',
    path: '/create',
    component: pages.Create,
    title: 'Create',
  },
  {
    name: 'gallery',
    path: '/gallery',
    component: pages.Gallery,
    title: 'Gallery',
  },
  {
    name: 'community',
    path: '/community',
    component: pages.Community,
    title: 'Community',
  },
  {
    name: 'activity',
    path: '/activity',
    component: pages.Activity,
    title: 'Activity',
  },
  {
    name: 'profile',
    path: '/profile',
    component: pages.Profile,
  },
  {
    name: '404',
    path: '*',
    component: pages.NotFound,
  }
]