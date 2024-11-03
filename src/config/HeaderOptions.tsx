import { Logout, SupervisorAccountOutlined, FilterAlt } from '@mui/icons-material';

export const defaultHeaderOptions = {
  logoutOnly: [{ title: '', to: '/logout', icon: <Logout /> }],
  userHeaderOptions: [
    {
      title: 'Gerenciamento Usuários',
      to: '/upload',
      icon: <SupervisorAccountOutlined />
    },
    { title: '', to: '/logout', icon: <Logout /> }
  ],
  HRUserOptions: [
    {
      title: 'Filtros',
      to: '/dashboard',
      icon: <FilterAlt />
    },
    { title: '', to: '/logout', icon: <Logout /> }
  ]
};
