import axios from 'axios';
import api from '../utils/api';

/**
 * Interface para os dados de erro retornados pela API.
 */
interface ApiErrorData {
  detail?: string;
  message?: string;
}

/**
 * Faz o upload de um arquivo CSV para o servidor.
 *
 * @param file - O arquivo CSV a ser enviado.
 * @returns Uma promessa que resolve com a resposta do servidor.
 * @throws Um erro se o upload falhar.
 */
export const uploadCsv = async (file: File): Promise<any> => {
  try {
    const formData = new FormData();
    formData.append('file', file);

    const response = await api.post('/csv/upload-csv/', formData);
    return response.data;
  } catch (error: unknown) {
    handleApiError(error, 'Falha ao fazer upload do arquivo CSV.');
  }
};

/**
 * Faz o download do template CSV do servidor.
 *
 * @returns Uma promessa que resolve quando o download é iniciado.
 * @throws Um erro se o download falhar.
 */
export const downloadCsvTemplate = async (): Promise<void> => {
  try {
    const response = await api.get<Blob>('/csv/download-csv-template/', {
      responseType: 'blob',
    });

    const filename = extractFilename(response.headers['content-disposition']) || 'template.csv';

    initiateFileDownload(response.data, filename, 'text/csv;charset=utf-8;');
  } catch (error: unknown) {
    handleApiError(error, 'Falha ao baixar o template CSV.');
  }
};

/**
 * Extrai o nome do arquivo a partir do cabeçalho Content-Disposition.
 *
 * @param contentDisposition - O valor do cabeçalho Content-Disposition.
 * @returns O nome do arquivo, se encontrado.
 */
const extractFilename = (contentDisposition?: string): string | null => {
  if (!contentDisposition) return null;

  const filenameMatch = contentDisposition.match(/filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/);
  if (filenameMatch && filenameMatch[1]) {
    return filenameMatch[1].replace(/['"]/g, '');
  }
  return null;
};

/**
 * Inicia o download de um arquivo no navegador.
 *
 * @param data - Os dados do arquivo (Blob).
 * @param filename - O nome do arquivo para salvar.
 * @param mimeType - O tipo MIME do arquivo.
 */
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

/**
 * Manipula erros provenientes da API.
 *
 * @param error - O erro capturado.
 * @param defaultMessage - A mensagem de erro padrão.
 * @throws Um erro com a mensagem apropriada.
 */
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
