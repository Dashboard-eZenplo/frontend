import { Button, TextField } from '@mui/material';
import LogotipoEzenplo from '../../assets/logo-ezenplo.png';
import { KeyboardReturn } from '@mui/icons-material';

export default function RegistrationPage() {
  return (
    <div className="w-full h-full flex">
      <section className="hidden xl:flex w-1/2 items-center justify-center bg-primary">
        <img
          src={LogotipoEzenplo}
          className="max-w-96 xxl:max-w-[30rem] w-full"
          alt="logo branca da ezenplo"
        />
      </section>
      <section className="w-full xl:w-1/2 p-10 xl:p-0 text-zinc-700 flex flex-col items-center justify-center">
        <div className="max-w-[34rem] xl:max-w-[30rem] xxl:max-w-[34rem] w-full flex flex-col items-center">
          <div className="w-full flex justify-end mb-4">
            <KeyboardReturn className="cursor-pointer" />
          </div>

          <h1 className="font-bold text-[2.2rem] md:text-[2.6rem] mb-4 xl:mb-8">Cadastro</h1>

          <form className="w-full flex flex-col items-center gap-6">
            <TextField
              label="CNPJ"
              variant="standard"
              className="w-full"
              placeholder="digite o CNPJ a ser cadastrado"
              required
            />
            <TextField
              label="Nome Fantasia"
              variant="standard"
              className="w-full"
              placeholder="digite o nome fantasia da empresa a ser cadastrado"
              required
            />
            <TextField
              label="E-mail"
              variant="standard"
              className="w-full"
              placeholder="digite o e-mail a ser cadastrado"
              required
            />
            <TextField
              label="Senha"
              variant="standard"
              className="w-full"
              placeholder="digite a senha a ser cadastrada"
              required
            />
            <TextField
              label="Repita a senha"
              variant="standard"
              className="w-full"
              placeholder="repita a senha a ser cadastrada"
              required
            />

            <Button
              variant="contained"
              style={{
                marginTop: '2.5rem',
                padding: '0.6rem',
                fontFamily: 'inherit',
                textTransform: 'none',
                fontSize: '1rem'
              }}
              className="w-full"
            >
              Cadastrar
            </Button>
          </form>
        </div>
      </section>
    </div>
  );
}
