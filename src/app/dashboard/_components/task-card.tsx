'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { BookmarkCheck, Loader2, Trash2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { toast } from 'sonner';
import { useTransition } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { dateAdapter } from '@/lib/lib-adapter';
import { deleteTask, finishedTask } from '@/action/task-action';
import { useTheme } from 'next-themes';

export function TaskCard({
  id,
  task,
  isPriority,
  status,
  deadline,
  description,
}: {
  id: string;
  task: string;
  isPriority: boolean;
  status: boolean;
  deadline: string;
  description?: string;
}) {
  const { theme } = useTheme();
  const [isFinishPending, startFinishTransition] = useTransition();
  const [isDeletePending, startDeleteTransition] = useTransition();
  const handleFinish = async () => {
    startFinishTransition(async () => {
      finishedTask(id);
      toast.success(`${task} was finished!`);
    });
  };
  const handleDelete = async () => {
    startDeleteTransition(async () => {
      deleteTask(id);
      toast.success(`${task} was deleted!`);
    });
  };
  return (
    <Card className={`${cn(status && 'bg-muted opacity-50')}`}>
      <CardContent>
        <div className="sm:flex flex-row  sm:items-center sm:justify-between mb-4">
          <CardTitle className="text-xl">{task}</CardTitle>
          <div className="flex flex-wrap items-center gap-2 mt-2 sm:mt-0">
            {isPriority && <Badge>{isPriority ? 'Prioritas' : ''}</Badge>}
            <Badge variant={'secondary'}>{dateAdapter(deadline)}</Badge>
          </div>
        </div>
        <div className="prose prose-cyan prose-stone dark:prose-invert">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {description}
          </ReactMarkdown>
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex flex-row items-center gap-2 mt-4">
          <Dialog>
            <DialogTrigger asChild>
              <Button size={'sm'}>
                <BookmarkCheck /> Finish
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Apakah anda yakin sudah selesai?</DialogTitle>
                <DialogDescription>
                  Aksi yang akan anda lakukan ini tidak dapat mengembalikan
                  lagi!
                </DialogDescription>
                <Button size={'sm'} className="w-full" onClick={handleFinish}>
                  {isFinishPending ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <BookmarkCheck />
                  )}{' '}
                  Finish
                </Button>
              </DialogHeader>
            </DialogContent>
          </Dialog>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="opacity-100" size={'sm'} variant={'secondary'}>
                <Trash2 />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Apakah anda yakin?</DialogTitle>
                <DialogDescription>
                  Aksi yang akan anda lakukan ini tidak dapat mengembalikan
                  lagi!
                </DialogDescription>
                <Button
                  size={'sm'}
                  variant={'destructive'}
                  onClick={handleDelete}
                >
                  {isDeletePending ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Trash2 />
                  )}{' '}
                  Hapus
                </Button>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
      </CardFooter>
    </Card>
  );
}
