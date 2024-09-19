import Header from '../../components/Header';

import { defaultHeaderOptions } from '../../config/HeaderOptions';

import { Delete } from '@mui/icons-material';

interface Company {
  empresa: string;
  email: string;
  contratos: number;
  telefone: string;
  cnpj: string;
  adicionais: string;
}

const companies: Company[] = [
  {
    empresa: 'Empresa Fictícia 1',
    email: 'emailempresa1@email.com',
    contratos: 4536,
    telefone: '55 99988-7766',
    cnpj: '00013271432432',
    adicionais: 'Adicionais empresa 1'
  },
  {
    empresa: 'Empresa Fictícia 1',
    email: 'emailempresa1@email.com',
    contratos: 4536,
    telefone: '55 99988-7766',
    cnpj: '00013271432432',
    adicionais: 'Adicionais empresa 1'
  },
  {
    empresa: 'Empresa Fictícia 1',
    email: 'emailempresa1@email.com',
    contratos: 4536,
    telefone: '55 99988-7766',
    cnpj: '00013271432432',
    adicionais: 'Adicionais empresa 1'
  },
  {
    empresa: 'Empresa Fictícia 1',
    email: 'emailempresa1@email.com',
    contratos: 4536,
    telefone: '55 99988-7766',
    cnpj: '00013271432432',
    adicionais: 'Adicionais empresa 1'
  },
  {
    empresa: 'Empresa Fictícia 1',
    email: 'emailempresa1@email.com',
    contratos: 4536,
    telefone: '55 99988-7766',
    cnpj: '00013271432432',
    adicionais: 'Adicionais empresa 1'
  },
  {
    empresa: 'Empresa Fictícia 1',
    email: 'emailempresa1@email.com',
    contratos: 4536,
    telefone: '55 99988-7766',
    cnpj: '00013271432432',
    adicionais: 'Adicionais empresa 1'
  },
  {
    empresa: 'Empresa Fictícia 1',
    email: 'emailempresa1@email.com',
    contratos: 4536,
    telefone: '55 99988-7766',
    cnpj: '00013271432432',
    adicionais: 'Adicionais empresa 1'
  },
  {
    empresa: 'Empresa Fictícia 1',
    email: 'emailempresa1@email.com',
    contratos: 4536,
    telefone: '55 99988-7766',
    cnpj: '00013271432432',
    adicionais: 'Adicionais empresa 1'
  },
  {
    empresa: 'Empresa Fictícia 1',
    email: 'emailempresa1@email.com',
    contratos: 4536,
    telefone: '55 99988-7766',
    cnpj: '00013271432432',
    adicionais: 'Adicionais empresa 1'
  },
  {
    empresa: 'Empresa Fictícia 1',
    email: 'emailempresa1@email.com',
    contratos: 4536,
    telefone: '55 99988-7766',
    cnpj: '00013271432432',
    adicionais: 'Adicionais empresa 1'
  }
];

function CompaniesPage() {
  return (
    <>
      <Header headerOptions={defaultHeaderOptions.logoutOnly} />
      <div className="container mx-auto p-4 text-[20px] w-11/12">
        <div className="mt-4 overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden border-4 border-[#BDBDBD] rounded-3xl">
              <table className="w-full bg-white shadow-md rounded-3xl overflow-hidden">
                <thead className="bg-[#333333] text-white text-[22px]">
                  <tr>
                    <th className="py-6 px-4 text-left w-1/6">Empresa</th>
                    <th className="py-6 px-4 text-left w-1/4">Email</th>
                    <th className="py-6 px-2 text-center w-24 whitespace-nowrap">Nº Contratos</th>
                    <th className="py-6 px-4 text-left w-1/6">Telefone</th>
                    <th className="py-6 px-4 text-left w-1/6">CNPJ</th>
                    <th className="py-6 px-4 text-left w-1/6">Adicionais</th>
                    <th className="py-6 px-4 text-left w-1/12"></th>
                  </tr>
                </thead>
                <tbody className="text-gray-700 font-bold bg-[#F5F5F5]">
                  {companies.map((company, index) => (
                    <tr
                      key={index}
                      className="border border-gray-400 hover:bg-[#007FFA] focus:bg-[#007FFA] hover:border-[#333333]"
                    >
                      <td className="py-3 px-4 break-words w-1/6">{company.empresa}</td>
                      <td className="py-3 px-4 break-words w-1/4">{company.email}</td>
                      <td className="py-3 px-2 break-words w-24 text-center">
                        {company.contratos}
                      </td>
                      <td className="py-3 px-4 break-words w-1/6">{company.telefone}</td>
                      <td className="py-3 px-4 break-words w-1/6">{company.cnpj}</td>
                      <td className="py-3 px-4 break-words w-1/6">{company.adicionais}</td>
                      <td className="py-3 px-4 break-words w-1/12">
                        <Delete onClick={() => handleDelete(index)} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

const handleDelete = (index: number) => {
  console.log('Delete row:', index);
};

export default CompaniesPage;
