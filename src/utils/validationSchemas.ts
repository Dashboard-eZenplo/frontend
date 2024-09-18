import { z, ZodType } from 'zod';
import { IHRManager } from '../types/HRManager';

export const hrManagerValidation: ZodType<IHRManager> = z.object({
  cnpj: z
    .string()
    .min(1, 'Campo obrigatório.')
    .transform((value) => value.replace(/[^\d]/g, ''))
    .refine((value) => value.length === 14, 'CNPJ inválido.'),
  name: z.string().min(1, 'Campo obrigatório.'),
  phone: z
    .string()
    .min(1, 'Campo obrigatório.')
    .transform((value) => value.replace(/[^\d]/g, ''))
    .refine((value) => value.length === 11, 'Número de telefone inválido.'),
  email: z.string().min(1, 'Campo obrigatório.').email('E-mail inválido.'),
  password: z
    .string()
    .min(1, 'Campo obrigatório.')
    .min(8, 'A senha deve ter no mínimo 8 caracteres.')
});
