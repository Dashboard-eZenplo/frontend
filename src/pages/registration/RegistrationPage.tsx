import { Button, TextField } from '@mui/material';
import LogotipoEzenplo from '../../assets/logo-ezenplo.png';
import { KeyboardReturn } from '@mui/icons-material';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { hrManagerValidation } from '../../utils/validationSchemas';
import { IHRManager } from '../../types/HRManager';
import { useState } from 'react';

export default function RegistrationPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm<IHRManager>({
    resolver: zodResolver(hrManagerValidation)
  });
  const [cnpjValue, setCnpjValue] = useState('');

  const createHRManager = (data: IHRManager) => {
    console.log(data);
  };

  const formatCNPJ = (value: string) => {
    return value
      .replace(/\D/g, '')
      .replace(/^(\d{2})(\d)/, '$1.$2')
      .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
      .replace(/\.(\d{3})(\d)/, '.$1/$2')
      .replace(/(\d{4})(\d)/, '$1-$2')
      .replace(/(-\d{2})\d+?$/, '$1');
  };

  const handleCNPJChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const formattedCNPJ = formatCNPJ(event.target.value);
    setCnpjValue(formattedCNPJ);
    setValue('cnpj', formattedCNPJ);
  };

  return (
    <div className="w-full min-h-screen flex">
      <section className="hidden lg:flex w-1/2 items-center justify-center bg-primary">
        <img
          src={LogotipoEzenplo}
          className="max-w-96 2xl:max-w-[30rem] w-full"
          alt="Logotipo eZenplo"
        />
      </section>
      <section className="w-full lg:w-1/2 p-10 lg:py-16 text-zinc-700 flex flex-col items-center justify-center">
        <div className="max-w-[34rem] xl:max-w-[30rem] 2xl:max-w-[34rem] w-full flex flex-col items-center">
          <div className="w-full flex justify-end mb-4">
            <KeyboardReturn className="cursor-pointer" />
          </div>

          <h1 className="font-bold text-[2.2rem] md:text-[2.6rem] mb-4 2xl:mb-12">Cadastro</h1>

          <form
            onSubmit={handleSubmit(createHRManager)}
            className="w-full flex flex-col items-center gap-6"
          >
            <div className="w-full">
              <TextField
                label="CNPJ"
                variant="standard"
                className="w-full"
                placeholder="digite o CNPJ a ser cadastrado"
                error={!!errors.cnpj}
                value={cnpjValue}
                onChange={handleCNPJChange}
              />
              {errors.cnpj && (
                <span className="text-red-500 mt-[0.2rem] block">{errors.cnpj.message}</span>
              )}
            </div>

            <div className="w-full">
              <TextField
                label="Nome Fantasia"
                variant="standard"
                className="w-full"
                placeholder="digite o nome fantasia da empresa a ser cadastrado"
                error={!!errors.name}
                {...register('name')}
              />
              {errors.name && (
                <span className="text-red-500 mt-[0.2rem] block">{errors.name.message}</span>
              )}
            </div>

            <div className="w-full">
              <TextField
                label="E-mail"
                variant="standard"
                className="w-full"
                placeholder="digite o e-mail a ser cadastrado"
                error={!!errors.email}
                {...register('email')}
              />
              {errors.email && (
                <span className="text-red-500 mt-[0.2rem] block">{errors.email.message}</span>
              )}
            </div>

            <div className="w-full">
              <TextField
                label="Senha"
                variant="standard"
                className="w-full"
                placeholder="digite a senha a ser cadastrada"
                error={!!errors.password}
                type="password"
                {...register('password')}
              />
              {errors.password && (
                <span className="text-red-500 mt-[0.2rem] block">{errors.password.message}</span>
              )}
            </div>

            <div className="w-full">
              <TextField
                label="Repita a senha"
                variant="standard"
                className="w-full"
                placeholder="repita a senha a ser cadastrada"
                error={!!errors.repeatPassword}
                type="password"
                {...register('repeatPassword')}
              />
              {errors.repeatPassword && (
                <span className="text-red-500 mt-[0.2rem] block">
                  {errors.repeatPassword.message}
                </span>
              )}
            </div>

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
              type="submit"
            >
              Cadastrar
            </Button>
          </form>
        </div>
      </section>
    </div>
  );
}
