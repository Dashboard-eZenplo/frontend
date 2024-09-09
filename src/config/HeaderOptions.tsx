import { Logout, SupervisorAccountOutlined, FileDownloadOutlined, FileUploadOutlined } from '@mui/icons-material';

export const defaultHeaderOptions = {
    logoutOnly: [
        { title: '', to: '/logout', icon: <Logout /> }
    ],
    userManagement: [
        { title: 'Gerenciamento Usuários', to: '/user-management', icon: <SupervisorAccountOutlined /> },
        { title: '', to: '/logout', icon: <Logout /> }
    ],
    csvManagement: [
        { title: 'Download Modelo', to: '/csv/download-csv', icon: <FileDownloadOutlined /> },
        { title: 'Upload Modelo', to: '/csv/upload-csv', icon: <FileUploadOutlined /> },
        { title: '', to: '/logout', icon: <Logout /> }
    ]
};