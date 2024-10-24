import { useRef, useState, ChangeEvent, DragEvent } from 'react';
import { uploadCsv } from '../services/fileService';

interface UploadDownloadBoxProps {
  onUploadSuccess?: (response: any) => void;
  onUploadError?: (error: any) => void;
}

const UploadDownloadBox: React.FC<UploadDownloadBoxProps> = ({
  onUploadSuccess,
  onUploadError,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState<boolean>(false);
  const [uploading, setUploading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>('');

  const MAX_FILE_SIZE_MB = 5;

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      uploadFiles(files);
    }
  };

  const handleDrag = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    if (event.type === 'dragenter' || event.type === 'dragover') {
      setDragActive(true);
    } else if (event.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setDragActive(false);
    const files = event.dataTransfer.files;
    if (files && files.length > 0) {
      uploadFiles(files);
    }
  };

  const uploadFiles = async (files: FileList) => {
    setError(null);

    const fileArray = Array.from(files);

    for (const file of fileArray) {
      const fileSizeMB = file.size / (1024 * 1024);
      if (fileSizeMB > MAX_FILE_SIZE_MB) {
        setError(`O arquivo "${file.name}" excede o tamanho máximo de ${MAX_FILE_SIZE_MB}MB.`);
        return;
      }
    }

    const invalidFiles = fileArray.filter(
      (file) =>
        !file.name.toLowerCase().endsWith('.csv') ||
        (file.type !== 'text/csv' && file.type !== 'application/vnd.ms-excel')
    );

    if (invalidFiles.length > 0) {
      const invalidFileNames = invalidFiles.map((file) => file.name).join(', ');
      setError(`Apenas arquivos .csv são permitidos. Arquivos inválidos: ${invalidFileNames}`);
      return;
    }

    setUploading(true);

    try {
      const file = fileArray[0];
      setFileName(file.name);

      const response = await uploadCsv(file);

      if (onUploadSuccess) {
        onUploadSuccess(response);
      }

      alert('Arquivo enviado com sucesso!');
    } catch (err: any) {
      console.error('Erro no upload:', err);
      setError(err.message || 'Ocorreu um erro durante o upload.');
      if (onUploadError) {
        onUploadError(err);
      }
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  return (
    <div className="flex flex-col items-center text-zinc-700">
      <div
        className={`border border-black rounded-lg h-[400px] lg:h-[450px] w-full xl:w-[1300px] flex flex-col items-center justify-between bg-white p-4 ${
          dragActive ? 'bg-gray-100' : 'bg-white'
        }`}
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
      >
        <div className="flex flex-col items-center">
          <p className="text-[20px] md:text-[20px] lg:text-[40px] font-semibold mb-1">
            Arraste & Solte arquivos aqui
          </p>
          <p className="text-[16px] md:text-[23px] lg:text-[28px] text-center">
            (apenas arquivos .csv baixados do template)
          </p>

          <div className="mt-[90px]">
            <p className="text-[20px] md:text-[30px] lg:text-[35px] font-medium">OU</p>
          </div>
        </div>

        <div className="flex flex-col items-center">
          <button
            onClick={handleButtonClick}
            className="bg-primary text-white rounded-lg text-[20px] md:text-[25px] lg:text-[30px] flex items-center justify-center border-0
                        w-[190px] md:w-[250px] lg:w-[350px] h-[45px] md:h-[60px] lg:h-[70px] cursor-pointer disabled:opacity-50"
            disabled={uploading}
          >
            {uploading ? 'Enviando...' : 'Meus Arquivos'}
          </button>
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept=".csv"
            onChange={handleFileChange}
            multiple={false}
          />

          {uploading && (
            <p className="mt-2 text-center text-[18px] md:text-[25px] lg:text-[30px]">
              Enviando arquivos...
            </p>
          )}

          {error && (
            <p className="mt-2 text-center text-red-500 text-[16px] md:text-[20px] lg:text-[25px]">
              {error}
            </p>
          )}

          {fileName && !error && (
            <p className="mt-2 text-center text-green-500 text-[16px] md:text-[20px] lg:text-[25px]">
              {fileName} enviado com sucesso!
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UploadDownloadBox;
