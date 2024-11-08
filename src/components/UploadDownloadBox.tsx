import { useRef, useState, ChangeEvent, DragEvent } from 'react';
import { Button } from '@mui/material';
interface UploadDownloadBoxProps {
  onFileSelect: (file: File | null) => void;
}

const UploadDownloadBox: React.FC<UploadDownloadBoxProps> = ({ onFileSelect }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>('');

  const MAX_FILE_SIZE_MB = 5;

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      const fileSizeMB = file.size / (1024 * 1024);
      if (fileSizeMB > MAX_FILE_SIZE_MB) {
        setError(`O arquivo "${file.name}" excede o tamanho máximo de ${MAX_FILE_SIZE_MB}MB.`);
        onFileSelect(null);
        return;
      }
      if (
        !file.name.toLowerCase().endsWith('.csv') ||
        (file.type !== 'text/csv' && file.type !== 'application/vnd.ms-excel')
      ) {
        setError('Apenas arquivos .csv são permitidos.');
        onFileSelect(null);
        return;
      }
      setFileName(file.name);
      setError(null);
      onFileSelect(file);
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
      handleFileChange({ target: { files } } as ChangeEvent<HTMLInputElement>);
    }
  };

  return (
    <div className="flex flex-col items-center text-zinc-700">
      <div
        className={`border border-black rounded-lg h-[400px] lg:h-[450px] w-full xl:w-[1300px] flex flex-col items-center justify-between bg-white p-4 ${dragActive ? 'bg-gray-100' : 'bg-white'
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
          <p className="text-[16px] md:text-[23px] lg:text-[28px] text-center mb-5">
            (apenas arquivos .csv baixados do template)
          </p>

          <div className="mt-20">
            <p className="text-[20px] md:text-[30px] lg:text-[35px] font-medium">OU</p>
          </div>
        </div>

        <div className="flex flex-col items-center">
          <Button
            onClick={handleButtonClick}
            className="w-[300px] h-[35px] md:w-[360px] md:h-[45px] lg:w-[500px] lg:h-[55px] xl:w-[600px] xl:h-[65px]"
            variant="contained"
          >
            Meus Arquivos
          </Button>
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept=".csv"
            onChange={handleFileChange}
            multiple={false}
          />

          {error && (
            <p className="mt-2 text-center text-red-500 text-[16px] md:text-[20px] lg:text-[25px]">
              {error}
            </p>
          )}

          {fileName && !error && (
            <p className="mt-2 text-center text-green-500 text-[16px] md:text-[20px] lg:text-[25px]">
              {fileName} pronto para envio!
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UploadDownloadBox;
