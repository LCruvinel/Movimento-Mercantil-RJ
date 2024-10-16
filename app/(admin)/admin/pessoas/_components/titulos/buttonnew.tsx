import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { UserPlus } from "lucide-react";

import Loader from "@/components/loader";
import { toast } from "@/components/ui/use-toast";

const formSchema = z.object({
  titulo: z.string().min(1, { message: "Selecione um título de Nobreza" }),
});

export default function NovoTitulo(props: { mutate: () => void }) {
  const { mutate } = props;
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      titulo: "",
    },
  });

  async function handleSubmit(values: z.infer<typeof formSchema>) {
    setSubmitting(true);
    const result = await fetch("/api/titulo_nobreza/create", {
      method: "POST",
      body: JSON.stringify(values),
    });

    if (result.ok) {
      setOpen(false);
      form.reset();
      mutate();
      toast({
        className: "bg-green-200",
        title: "Sucesso",
        duration: 5000,
        description: "Título criado com sucesso",
      });
    } else {
      toast({
        variant: "destructive",
        title: "Erro",
        duration: 5000,
        description: "Erro ao criar título",
      });
    }
    setSubmitting(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="self-end w-full transition-all duration-500 bg-gradient-to-r from-blue-400 to-blue-600 rounded-xl md:w-fit hover:scale-105 hover:bg-gradient-to-l hover:from-blue-400 hover:to-blue-600">
          Novo Título <UserPlus size={24} className="ml-2" />
        </Button>
      </DialogTrigger>
      <DialogContent
        className="w-11/12 p-6 rounded-lg max-h-[95%] overflow-y-scroll"
        onInteractOutside={(e) => {
          e.preventDefault();
        }}
      >
        <DialogHeader>
          <DialogTitle className="text-blue-500">
            Criar novo Título de Nobreza
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="flex flex-col gap-2"
          >
            <FormField
              control={form.control}
              name="titulo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Título de Nobreza</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: Rei" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="self-end mt-2 bg-blue-500 rounded-2xl hover:bg-blue-600 w-fit"
              disabled={submitting}
            >
              Criar {submitting && <Loader classProp="ml-2 w-6 h-6" />}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
