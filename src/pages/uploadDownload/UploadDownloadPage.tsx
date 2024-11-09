import Background from '../../components/Background';
import Header from '../../components/Header';
import { defaultHeaderOptions } from '../../config/HeaderOptions';
import UploadDownloadBox from '../../components/UploadDownloadBox';
import Download from '../../assets/Download.png';
import { downloadCsvTemplate, uploadCsv } from '../../services/fileService';
import { Button, Snackbar, Alert } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UploadDownloadPage = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const navigate = useNavigate();

  const handleDownload = async () => {
    try {
      await downloadCsvTemplate();
      alert('Template baixado com sucesso!');
    } catch (error: any) {
      console.error('Erro ao baixar o template:', error);
      alert(error.message || 'Ocorreu um erro ao baixar o template.');
    }
  };

  const handleFileSelect = (file: File | null) => {
    setSelectedFile(file);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert('Por favor, selecione um arquivo para enviar.');
      return;
    }

    setUploading(true);

    try {
      await uploadCsv(selectedFile);
      setUploadSuccess(true); // Exibe o Snackbar de sucesso
    } catch (error: any) {
      console.error('Erro ao enviar o arquivo:', error);
      alert(error.message || 'Ocorreu um erro ao enviar o arquivo.');
    } finally {
      setUploading(false);
    }
  };

  useEffect(() => {
    if (uploadSuccess) {
      const delayNavigate = setTimeout(() => {
        setUploadSuccess(false);
        navigate('/funcionarios');
      }, 1500);
      return () => clearTimeout(delayNavigate);
    }
  }, [uploadSuccess, navigate]);

  return (
    <Background>
      <Header headerOptions={defaultHeaderOptions.userHeaderOptions} />
      <div className="flex flex-col items-center">
        <div className="flex items-center justify-center mt-6" onClick={handleDownload}>
          <p
            className="text-[16px] md:text-[25px] lg:text-[30px] font-semibold font-sofia-sans mr-2"
            style={{ color: '#333333' }}
          >
            Clique aqui para baixar o template
          </p>
          <img src={Download} alt="Download Icon" className="w-6 h-6 md:w-8 md:h-8 ml-2" />
        </div>

        <div className="flex flex-col items-center justify-center mt-4">
          <UploadDownloadBox onFileSelect={handleFileSelect} />
          <div className="pt-6">
            <Button
              className="w-[300px] h-[35px] md:w-[360px] md:h-[45px] lg:w-[500px] lg:h-[55px] xl:w-[600px] xl:h-[65px]"
              variant="outlined"
              onClick={handleUpload}
              disabled={uploading || !selectedFile}
            >
              {uploading ? 'Enviando...' : 'Enviar'}
            </Button>
          </div>
        </div>
      </div>

      <Snackbar
        open={uploadSuccess}
        onClose={() => setUploadSuccess(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        autoHideDuration={1500}
      >
        <Alert onClose={() => setUploadSuccess(false)} severity="success" sx={{ width: '100%' }}>
          Arquivo enviado com sucesso!
        </Alert>
      </Snackbar>
    </Background>
  );
};

export default UploadDownloadPage;
