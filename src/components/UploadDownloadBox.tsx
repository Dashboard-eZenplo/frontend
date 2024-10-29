import React, { useState, useRef } from 'react';
import axios from 'axios';

const UploadDownloadBox = () => {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setError('');
      setSuccessMessage('');
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setError('Por favor, selecione um arquivo para upload.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('csv/upload-csv/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      console.log('Upload successful:', response.data);
      setSuccessMessage('Arquivo enviado com sucesso!');
      setFile(null);
    } catch (error: any) {
      console.error('Error uploading file:', error);
      const errorMessage = error.message || 'Falha ao fazer upload do arquivo.';
      setError(errorMessage);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files[0];
    if (droppedFile) {
      setFile(droppedFile);
      setError('');
      setSuccessMessage('');
    }
  };

  const openFileDialog = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const boxHeightClass = error || successMessage ? 'h-[550px]' : 'h-[500px]';

  return (
    <div className="flex flex-col items-center text-zinc-700">
      <div
        className={`border border-black rounded-lg ${boxHeightClass} w-full xl:w-[1300px] flex flex-col items-center justify-between bg-white p-4`}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <div className="flex flex-col items-center">
          <p className="text-[20px] md:text-[20px] lg:text-[40px] font-semibold mb-1">
            Arraste & Solte arquivos aqui
          </p>
          <p className="text-[16px] md:text-[23px] lg:text-[28px] text-center mb-5">
            (apenas arquivos .csv baixados do template)
          </p>

          <p className="text-[20px] md:text-[30px] lg:text-[35px] font-medium mb-5">ou</p>
        </div>

        <input
          type="file"
          accept=".csv"
          onChange={handleFileChange}
          style={{ display: 'none' }}
          ref={fileInputRef}
        />

        <button
          onClick={openFileDialog}
          className="bg-primary text-white rounded-lg text-[20px] md:text-[25px] lg:text-[30px] flex items-center justify-center border-0
                      w-[190px] md:w-[250px] lg:w-[350px] h-[45px] md:h-[60px] lg:h-[70px]"
        >
          Meus Arquivos
        </button>

        <p className="mt-2 text-center text-[18px] md:text-[25px] lg:text-[30px]">
          Faça upload pelos seus arquivos
        </p>

        {error && <p className="text-red-600">{error}</p>}
        {successMessage && <p className="text-green-600">{successMessage}</p>}
        {file && <p>Arquivo selecionado: {file.name}</p>}

        <button
          onClick={handleUpload}
          disabled={!file}
          className="mt-4 border border-primary text-primary rounded-lg text-[20px] md:text-[25px] lg:text-[30px] flex items-center justify-center 
                      w-[190px] md:w-[250px] lg:w-[350px] h-[45px] md:h-[60px] lg:h-[70px] hover:bg-primary hover:text-white transition duration-300 ease-in-out"
        >
          Enviar
        </button>
      </div>
    </div>
  );
};

export default UploadDownloadBox;
