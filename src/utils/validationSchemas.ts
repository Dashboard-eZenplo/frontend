import { z, ZodType } from 'zod';
import { IHRManager } from '../types/HRManager';

export const hrManagerValidation: ZodType<IHRManager> = z
  .object({
    cnpj: z
      .string()
      .nonempty('Campo obrigatório.')
      .transform((value) => value.replace(/[^\d]/g, ''))
      .refine((value) => value.length === 14, {
        message: 'O CNPJ deve ter exatamente 14 dígitos.'
      }),
    name: z.string().nonempty('Campo obrigatório.'),
    email: z
      .string()
      .nonempty('Campo obrigatório.')
      .email({ message: 'E-mail inválido.' })
      .nonempty('Campo obrigatório.'),
    password: z
      .string()
      .nonempty('Campo obrigatório.')
      .min(8, 'A senha deve ter no mínimo 8 caracteres.'),
    repeatPassword: z
      .string()
      .nonempty('Campo obrigatório.')
      .min(8, 'A senha deve ter no mínimo 8 caracteres.')
      .nonempty('Campo obrigatório.')
  })
  .refine((data) => data.password === data.repeatPassword, {
    message: 'As senhas devem ser iguais.',
    path: ['repeatPassword']
  });