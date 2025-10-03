'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ChevronDown, Flame, Loader2, SquarePen } from 'lucide-react';
import { Controller, useForm } from 'react-hook-form';
import { format } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import z from 'zod';
import { createTaskSchema } from '@/types/task';
import { zodResolver } from '@hookform/resolvers/zod';
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { useState, useTransition } from 'react';
import { createTask } from '@/action/task-action';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

export function CreateTask() {
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState<boolean>(false);
  const form = useForm<z.infer<typeof createTaskSchema>>({
    resolver: zodResolver(createTaskSchema),
    defaultValues: {
      task: '', // string default
      description: '', // string default
      deadline: undefined, // boleh undefined/null kalau date optional
      priority: false,
    },
  });
  const handleCreateTask = (data: z.infer<typeof createTaskSchema>) => {
    startTransition(async () => {
      createTask(data);
      toast.success('success!');
      setOpen(false);
    });
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <SquarePen /> Create Task
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[95vw] sm:max-w-lg px-4 py-4">
        <DialogTitle>Create Task</DialogTitle>
        <DialogDescription>create your task and save it</DialogDescription>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleCreateTask)}
            className="space-y-6"
          >
            {/* Task */}
            <FormField
              control={form.control}
              name="task"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tugas</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Task name" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Deadline + Priority */}
            <div className="flex flex-col sm:flex-row items-stretch gap-4">
              <FormField
                control={form.control}
                name="deadline"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Deadline</FormLabel>
                    <FormControl>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full justify-between font-normal"
                          >
                            {field.value instanceof Date ? (
                              format(field.value, 'PPP')
                            ) : (
                              <span>Pilih tanggal</span>
                            )}
                            <ChevronDown className="ml-2 h-4 w-4 opacity-50" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex flex-col flex-1 gap-2">
                <FormLabel>Priority</FormLabel>
                <Controller
                  name="priority"
                  control={form.control}
                  render={({ field }) => (
                    <Button
                      type="button"
                      variant={field.value ? 'default' : 'outline'}
                      onClick={() => field.onChange(!field.value)}
                      className="w-full"
                    >
                      {field.value ? (
                        <div className="flex items-center justify-center gap-2">
                          <Flame /> Prioritas
                        </div>
                      ) : (
                        'Bukan Prioritas'
                      )}
                    </Button>
                  )}
                />
              </div>
            </div>

            {/* Note */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Catatan</FormLabel>
                  <FormControl>
                    <Textarea
                      className="h-32 resize-none"
                      placeholder="Tambahkan catatan tambahan..."
                      {...field}
                      value={field.value}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button className="w-full" disabled={isPending}>
              {isPending ? (
                <Loader2 className="w-20 h-20 animate-spin" />
              ) : (
                <SquarePen />
              )}{' '}
              Simpan
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
