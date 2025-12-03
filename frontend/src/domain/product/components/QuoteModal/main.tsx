import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { MessageSquareIcon } from 'lucide-react';

import { Button } from '@/core/components/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/core/components/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/core/components/form';
import { Input } from '@/core/components/input';
import { Textarea } from '@/core/components/textarea';
import { quoteSchema } from '../../validations/quote';

type QuoteFormInput = z.input<typeof quoteSchema>;
type QuoteFormOutput = z.output<typeof quoteSchema>;

interface QuoteModalProps {
  productName: string;
  referenceCode: string;
}

export function QuoteModal({ productName, referenceCode }: QuoteModalProps) {
  const form = useForm<QuoteFormInput, any, QuoteFormOutput>({
    resolver: zodResolver(quoteSchema),
    mode: 'onBlur',
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      message: `Olá, gostaria de solicitar um orçamento para o produto: ${productName} (Ref: ${referenceCode}).`,
    },
  });

  const onSubmit = (data: QuoteFormOutput) => {
    // In a real implementation, this would call an API endpoint
    console.log('Quote Request:', { ...data, productName, referenceCode });
    toast.success('Solicitação enviada com sucesso! Entraremos em contato em breve.');
    form.reset();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="lg" className="w-full sm:w-auto">
          <MessageSquareIcon className="size-4 mr-2" />
          Solicitar Orçamento
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Solicitar Orçamento</DialogTitle>
          <DialogDescription>
            Preencha o formulário abaixo para receber mais informações sobre{' '}
            <strong>{productName}</strong>.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome Completo</FormLabel>
                  <FormControl>
                    <Input placeholder="Seu nome" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>E-mail</FormLabel>
                    <FormControl>
                      <Input placeholder="seu@email.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Telefone</FormLabel>
                    <FormControl>
                      <Input placeholder="(00) 00000-0000" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mensagem</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Escreva sua mensagem..."
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end pt-2">
              <Button type="submit" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? 'Enviando...' : 'Enviar Solicitação'}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
