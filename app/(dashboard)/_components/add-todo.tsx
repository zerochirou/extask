"use client";

import z from "zod";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Calendar } from "@/components/ui/calendar";
import { useState, useTransition } from "react";
import { createTodo } from "@/types/todo";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { handleTaskSubmit } from "./handle-task-submit";
import { ChevronDownIcon, Plus } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export function AddTodo() {
  const [isUseDescription, setIsUseDescription] = useState<boolean>(false);
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [isPending, startTransition] = useTransition();
  const form = useForm({
    resolver: zodResolver(createTodo),
    defaultValues: { priority: false, description: "" },
  });
  const onSubmit = (data: z.infer<typeof createTodo>) => {
    startTransition(async () => {
      await handleTaskSubmit(data);
      form.reset();
    });
  };

  if (isPending) toast.success("Tugas berhasil dibuat!");

  return (
    <div>
      <Sheet>
        <SheetTrigger asChild>
          <Button className="px-6">
            <Plus className="w-4 h-4" />
            Tambah Tugas
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Tambah Spesifik</SheetTitle>
            <SheetDescription>Tambahkan tugas secara spesifik</SheetDescription>
          </SheetHeader>

          <div className="grid flex-1 auto-rows-min gap-6 px-4">
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-3 mb-4">
                <Label htmlFor="task" className="px-1">
                  Tugas
                </Label>
                <Input
                  id="task"
                  {...form.register("task")}
                  defaultValue={"Belajar Matematika 📖"}
                />
              </div>

              {/* Date */}
              <div className="flex flex-col gap-2">
                <div className="flex flex-col gap-3 mb-4 w-full">
                  <Label htmlFor="date" className="px-1">
                    Deadline
                  </Label>
                  <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        id="date"
                        className="w-full justify-between font-normal"
                      >
                        {date ? date.toLocaleDateString() : "Select date"}
                        <ChevronDownIcon />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent
                      className="w-auto overflow-hidden p-0"
                      align="start"
                    >
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={(d: Date | undefined) => {
                          setDate(d);
                          if (d) {
                            form.setValue("date", d);
                          }
                        }}
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                {/* Time */}
                <div className="flex flex-col w-full gap-3 mb-4">
                  <Label htmlFor="time" className="px-1">
                    Time
                  </Label>
                  <Input
                    className="w-full"
                    id="time"
                    type="time"
                    {...form.register("time")}
                    step="1"
                  />
                </div>
              </div>

              {/* Switch */}

              <div className="flex flex-col gap-3 mb-4">
                <Label htmlFor="note" className="px-1">
                  Catatan
                </Label>
                {isUseDescription && (
                  <Textarea
                    className="h-40"
                    id="note"
                    {...form.register("description")}
                  />
                )}
                <Button variant={'secondary'} onClick={() => setIsUseDescription(!isUseDescription)} size={'sm'}>add description</Button>
              </div>

              <Card
                className={cn(
                  "flex flex-row justify-center items-center gap-1 mb-4",
                  form.getValues("priority") ? "bg-primary/40" : ""
                )}
              >
                <Label htmlFor="priority" className="px-1">
                  Prioritas
                </Label>
                <Switch
                  id="priority"
                  checked={form.watch("priority")}
                  onCheckedChange={(val: boolean) =>
                    form.setValue("priority", val)
                  }
                />
              </Card>

              <Button type="submit" className="w-full" disabled={isPending}>
                {isPending ? "Loading..." : "Save"}
              </Button>
            </form>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
