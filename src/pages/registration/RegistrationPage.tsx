import { Alert, Button, Snackbar, SnackbarCloseReason, TextField } from '@mui/material';
import LogotipoEzenplo from '../../assets/logo-ezenplo.png';
import { KeyboardReturn } from '@mui/icons-material';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { hrManagerValidation } from '../../utils/validationSchemas';
import { IHRManager } from '../../types/HRManager';
import { formatCNPJ, formatPhone } from '../../utils/formatters';
import { useState } from 'react';
import { registerUser } from '../../services/userService';

export default function RegistrationPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset
  } = useForm<IHRManager>({
    resolver: zodResolver(hrManagerValidation)
  });
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');
  const [showSnackbar, setShowSnackbar] = useState(false);

  const handleShowSnackbar = (message: string, severity: 'success' | 'error') => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setShowSnackbar(true);
  };

  const handleCloseSnackbar = (
    _event?: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === 'clickaway') {
      return;
    }
    setShowSnackbar(false);
  };

  const handleFormSubmit = async (userData: IHRManager) => {
    try {
      await registerUser(userData);
      handleShowSnackbar('Usuário cadastrado com sucesso!', 'success');
      reset();
    } catch (e) {
      handleShowSnackbar('Erro ao cadastrar usuário.', 'error');
      console.log(e);
    }
  };

  const handleCNPJChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const formattedCNPJ = formatCNPJ(event.target.value);
    setValue('cnpj', formattedCNPJ);
  };

  const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const formattedPhone = formatPhone(event.target.value);
    setValue('phone', formattedPhone);
  };

  return (
    <div className="w-full min-h-screen flex">
      <section className="hidden lg:flex w-1/2 max-h-screen sticky top-0 items-center justify-center bg-primary">
        <img
          src={LogotipoEzenplo}
          className="max-w-96 2xl:max-w-[30rem] w-full"
          alt="Logotipo eZenplo"
        />
      </section>
      <section className="w-full lg:w-1/2 p-10 lg:py-16 text-zinc-700 flex justify-center">
        <div className="max-w-[34rem] xl:max-w-[30rem] 2xl:max-w-[34rem] w-full flex flex-col items-center justify-center">
          <div className="w-full flex justify-end mb-4">
            <KeyboardReturn className="cursor-pointer" />
          </div>

          <h1 className="font-bold text-[2.2rem] md:text-[2.6rem] mb-8 2xl:mb-12">Cadastro</h1>

          <form
            onSubmit={handleSubmit(handleFormSubmit)}
            className="w-full flex flex-col items-center gap-6"
          >
            <div className="w-full">
              <TextField
                label="CNPJ"
                variant="standard"
                className="w-full"
                placeholder="digite o CNPJ a ser cadastrado"
                error={!!errors.cnpj}
                {...register('cnpj')}
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
                label="Telefone"
                variant="standard"
                className="w-full"
                placeholder="digite o telefone a ser cadastrado"
                error={!!errors.phone}
                {...register('phone')}
                onChange={handlePhoneChange}
              />
              {errors.phone && (
                <span className="text-red-500 mt-[0.2rem] block">{errors.phone.message}</span>
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

            <Button
              variant="contained"
              sx={{
                marginTop: '2.5rem',
                padding: '0.6rem',
                fontFamily: 'inherit',
                textTransform: 'none',
                fontSize: '1rem'
              }}
              fullWidth
              type="submit"
            >
              Cadastrar
            </Button>

            <Snackbar open={showSnackbar} autoHideDuration={3000} onClose={handleCloseSnackbar}>
              <Alert
                sx={{
                  backgroundColor: `${snackbarSeverity === 'success' ? '#7ED298' : '#F3858C'}`
                }}
                onClose={handleCloseSnackbar}
                severity={snackbarSeverity}
                variant="filled"
              >
                {snackbarMessage}
              </Alert>
            </Snackbar>
          </form>
        </div>
      </section>
    </div>
  );
}
