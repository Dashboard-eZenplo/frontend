import { z, ZodType } from 'zod';
import { IHRManager } from '../types/HRManager';

export const hrManagerValidation: ZodType<IHRManager> = z
  .object({
    cnpj: z
      .string()
      .min(1, 'Campo obrigatório.')
      .transform((value) => value.replace(/[^\d]/g, ''))
      .refine((value) => value.length === 14, 'O CNPJ deve ter exatamente 14 dígitos.'),
    name: z.string().min(1, 'Campo obrigatório.'),
    email: z.string().min(1, 'Campo obrigatório.').email('E-mail inválido.'),
    password: z
      .string()
      .min(1, 'Campo obrigatório.')
      .min(8, 'A senha deve ter no mínimo 8 caracteres.'),
    repeatPassword: z
      .string()
      .min(1, 'Campo obrigatório.')
      .min(8, 'A senha deve ter no mínimo 8 caracteres.')
  })
  .refine((data) => data.password === data.repeatPassword, {
    message: 'As senhas devem ser iguais.',
    path: ['repeatPassword']
  });
