// src/services/fileService.ts

import api from '../utils/api';

/**
 * Uploads a CSV file to the server.
 *
 * @param file - The CSV file to upload.
 * @returns A promise resolving to the server response.
 * @throws An error if the upload fails.
 */
export const uploadCsv = async (file: File): Promise<any> => {
  try {
    const formData = new FormData();
    formData.append('file', file);

    const response = await api.post('/csv/upload-csv/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  } catch (error: any) {
    if (error.response && error.response.data) {
      const { detail, message } = error.response.data;
      // FastAPI may return 'detail' or 'message' depending on the error
      throw new Error(detail || message || 'Failed to upload CSV file.');
    }
    console.error('Error while uploading CSV:', error);
    throw new Error('An unexpected error occurred while uploading the CSV file.');
  }
};

/**
 * Downloads the CSV template from the server.
 *
 * @returns A promise that resolves when the download is initiated.
 * @throws An error if the download fails.
 */
export const downloadCsvTemplate = async (): Promise<void> => {
  try {
    const response = await api.get('/csv/download-csv-template/', {
      responseType: 'blob', // Important for handling binary data
    });

    // Extract filename from the Content-Disposition header if available
    const contentDisposition = response.headers['content-disposition'];
    let filename = 'template.csv'; // Default filename

    if (contentDisposition) {
      const filenameMatch = contentDisposition.match(/filename="?(.+)"?/);
      if (filenameMatch && filenameMatch[1]) {
        filename = filenameMatch[1];
      }
    }

    // Create a URL for the blob and trigger a download
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', filename); // Set the filename
    document.body.appendChild(link);
    link.click();
    link.parentNode?.removeChild(link);
    window.URL.revokeObjectURL(url); // Clean up the URL object
  } catch (error: any) {
    if (error.response && error.response.data) {
      const { detail, message } = error.response.data;
      throw new Error(detail || message || 'Failed to download CSV template.');
    }
    console.error('Error while downloading CSV template:', error);
    throw new Error('An unexpected error occurred while downloading the CSV template.');
  }
};
