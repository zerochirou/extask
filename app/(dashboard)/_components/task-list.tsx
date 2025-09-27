"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { dateAdapter } from "@/lib/dateAdapter";
import { cn } from "@/lib/utils";
import { deleteTodo, finsishTodo } from "../_action/todo-action";
import { Loader2, Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { useTransition } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export function TaskList(props: {
  id: string;
  task: string;
  isPriority: boolean;
  status: boolean;
  deadline: string;
  description?: string;
}) {
  const { formattedDate, formattedTime } = dateAdapter(props.deadline);
  const [isDeletePending, startDeleteTransition] = useTransition();
  const [isFinishPending, startFinishTransition] = useTransition();
  const handleDelete = () => {
    startDeleteTransition(async () => {
      await deleteTodo(props.id);
      toast.success("Tugas telah dihapus!");
    });
  };
  const handleFinish = () => {
    startFinishTransition(async () => {
      await finsishTodo(props.id);
      toast.success(
        <p>
          <span className="font-bold">{props.task}</span> telah anda selesaikan!
        </p>
      );
    });
  };

  return (
    <Card className={cn(props.status ? "opacity-50" : "opacity-100")}>
      <CardContent>
        <div className="sm:flex flex-row  sm:items-center sm:justify-between mb-4">
          <CardTitle className="text-xl">{props.task}</CardTitle>
          <div className="flex flex-wrap items-center gap-2 mt-2 sm:mt-0">
            {props.isPriority && <Badge>Prioritas</Badge>}
            <Badge variant={"secondary"}>{formattedDate}</Badge>
            <Badge variant={"secondary"}>{formattedTime}</Badge>
            <Badge variant={"secondary"}>
              {props.status ? "Sudah" : "Belum"} selesai
            </Badge>
          </div>
        </div>
        {props.description && (
          <div className="prose" >
            <CardDescription>
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {props.description}
              </ReactMarkdown>
            </CardDescription>
          </div>
        )}
        <div className="flex flex-row items-center gap-2 mt-4">
          <Dialog>
            <DialogTrigger asChild>
              {props.status ? (
                <Button size={"sm"} disabled>
                  Finish
                </Button>
              ) : (
                <Button size={"sm"}>Finish</Button>
              )}
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Apakah anda yakin?</DialogTitle>
                <DialogDescription>
                  Aksi yang akan anda lakukan ini tidak dapat mengembalikan
                  lagi!
                </DialogDescription>
                <Button size={"sm"} className="w-full" onClick={handleFinish}>
                  {isFinishPending ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    "Finish"
                  )}
                </Button>
              </DialogHeader>
            </DialogContent>
          </Dialog>
          <Dialog>
            <DialogTrigger asChild>
              <Button
                className="opacity-100"
                size={"sm"}
                variant={"destructive"}
              >
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
                  size={"sm"}
                  variant={"destructive"}
                  onClick={handleDelete}
                >
                  {isDeletePending ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Trash2 />
                  )}
                </Button>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
      </CardContent>
    </Card>
  );
}
