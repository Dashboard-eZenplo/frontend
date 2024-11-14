import axios from 'axios';
import api from '../utils/api';

interface ApiErrorData {
  detail?: string;
  message?: string;
}

export const uploadCsv = async (file: File): Promise<any> => {
  try {
    const formData = new FormData();
    formData.append('file', file);

    const response = await api.post('/csv/upload-csv', formData);
    return response.data;
  } catch (error: unknown) {
    handleApiError(error, 'Falha ao fazer upload do arquivo CSV.');
  }
};

export const downloadCsvTemplate = async (): Promise<void> => {
  try {
    const response = await api.get<Blob>('/csv/download-csv-template', {
      responseType: 'blob'
    });

    const filename = extractFilename(response.headers['content-disposition']) || 'template.csv';

    initiateFileDownload(response.data, filename, 'text/csv;charset=utf-8;');
  } catch (error: unknown) {
    handleApiError(error, 'Falha ao baixar o template CSV.');
  }
};

const extractFilename = (contentDisposition?: string): string | null => {
  if (!contentDisposition) return null;

  const filenameMatch = contentDisposition.match(/filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/);
  if (filenameMatch && filenameMatch[1]) {
    return filenameMatch[1].replace(/['"]/g, '');
  }
  return null;
};

const initiateFileDownload = (data: Blob, filename: string, mimeType: string): void => {
  const blob = new Blob([data], { type: mimeType });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');

  link.href = url;
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  window.URL.revokeObjectURL(url);
};

const handleApiError = (error: unknown, defaultMessage: string): never => {
  if (axios.isAxiosError(error)) {
    const errorData = error.response?.data as ApiErrorData;
    const errorMessage = errorData?.detail || errorData?.message || defaultMessage;
    throw new Error(errorMessage);
  } else {
    console.error('Erro inesperado:', error);
    throw new Error(defaultMessage);
  }
};
