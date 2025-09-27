"use client";

import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useAuth } from "@/hooks/use-auth";
import { Calendar, CheckCircle2, Menu } from "lucide-react";

export function SiderbarNav({
  completedCount,
  totalCount,
}: {
  completedCount: number;
  totalCount: number;
}) {
  const { handleLogout } = useAuth();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant={"ghost"} size={"sm"}>
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Task Manager</SheetTitle>
          <SheetDescription className="border-b-2 pb-2">
            Stay organized and productive with your daily tasks
          </SheetDescription>
          <div className="flex flex-row items-center gap-4">
            <Card className="flex-1 shadow-none border-none bg-gradient-to-r from-primary/10 to-accent/10">
              <CardContent className="flex flex-col items-center justify-center gap-2 py-4">
                <CheckCircle2 className="w-6 h-6 text-primary" />
                <span className="font-semibold text-lg text-foreground">
                  {completedCount}/{totalCount}
                </span>
                <span className="text-xs text-muted-foreground">
                  Completed Tasks
                </span>
              </CardContent>
            </Card>
            <Card className="flex-1 shadow-none border-none bg-gradient-to-r from-accent/10 to-primary/10">
              <CardContent className="flex flex-col items-center justify-center gap-2 py-4">
                <Calendar className="w-6 h-6 text-primary" />
                <span className="font-semibold text-lg text-foreground">
                  {new Date().toLocaleDateString("en-US", {
                    weekday: "long",
                    month: "short",
                    day: "numeric",
                  })}
                </span>
                <span className="text-xs text-muted-foreground">Today</span>
              </CardContent>
            </Card>
          </div>
          <Button variant={"destructive"} onClick={handleLogout}>
            Logout
          </Button>
          <ModeToggle />
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
