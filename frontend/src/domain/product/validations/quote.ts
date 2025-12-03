import { z } from 'zod';

export const quoteSchema = z.object({
  name: z.string('Nome é obrigatório').min(3, 'Nome deve ter pelo menos 3 caracteres'),
  email: z.string('E-mail é obrigatório').email('E-mail inválido'),
  phone: z.string('Telefone é obrigatório').min(10, 'Telefone inválido'),
  message: z.string('Mensagem é obrigatória').min(10, 'Mensagem muito curta'),
});
