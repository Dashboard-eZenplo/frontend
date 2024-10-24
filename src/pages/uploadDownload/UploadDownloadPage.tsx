import Background from '../../components/Background';
import Header from '../../components/Header';
import { defaultHeaderOptions } from '../../config/HeaderOptions';
import UploadDownloadBox from '../../components/UploadDownloadBox';
import Download from '../../assets/Download.png';
import { downloadCsvTemplate } from '../../services/fileService';

const UploadDownloadPage = () => {
  const handleDownload = async () => {
    try {
      await downloadCsvTemplate();
      alert('Template baixado com sucesso!');
    } catch (error: any) {
      console.error('Erro ao baixar o template:', error);
      alert(error.message || 'Ocorreu um erro ao baixar o template.');
    }
  };

  return (
    <Background>
      <Header headerOptions={defaultHeaderOptions.userHeaderOptions} />
      <div className="flex flex-col items-center">
        <div
          className="flex items-center justify-center mt-20 md:mt-20 lg:mt-24 cursor-pointer"
          onClick={handleDownload}
        >
          <p
            className="text-[16px] md:text-[25px] lg:text-[30px] font-semibold font-sofia-sans mr-2"
            style={{ color: '#333333' }}
          >
            Clique aqui para baixar o template
          </p>
          <img src={Download} alt="Download Icon" className="w-6 h-6 md:w-8 md:h-8 ml-2" />
        </div>

        <div className="flex flex-col items-center justify-center mt-4">
          <UploadDownloadBox />
        </div>
      </div>
    </Background>
  );
};

export default UploadDownloadPage;
