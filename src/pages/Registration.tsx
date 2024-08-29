import { Button, TextField } from '@mui/material';
import Logo from '../assets/logo-ezenplo.png';
import { KeyboardReturn } from '@mui/icons-material';

export default function Registration() {
  return (
    <div className="w-full h-full flex">
      <section className="hidden xl:flex w-1/2 items-center justify-center bg-[#004bf9]">
        <img src={Logo} className="max-w-96 w-full" alt="logo branca da ezenplo" />
      </section>
      <section className="w-full xl:w-1/2 p-10 xl:p-0 text-zinc-700 flex flex-col items-center justify-center">
        <div className="max-w-[540px] xl:max-w-[480px] w-full flex flex-col items-center">
          <div className="w-full flex justify-end mb-4">
            <KeyboardReturn className="cursor-pointer" />
          </div>
          <h1 className="font-bold text-[2.2rem] md:text-[2.6rem] mb-8">Cadastro</h1>

          <div className="w-full flex flex-col items-center gap-6">
            <TextField label="CNPJ" variant="standard" className="w-full" />
            <TextField label="Nome Fantasia" variant="standard" className="w-full" />
            <TextField label="E-mail" variant="standard" className="w-full" />
            <TextField label="Senha" variant="standard" className="w-full" />
            <TextField label="Repita sua senha" variant="standard" className="w-full" />

            <Button
              variant="contained"
              style={{ marginTop: '40px', padding: '10px' }}
              className="w-full"
            >
              Cadastrar
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
