"use client";

import { Calendar, CheckCircle2 } from "lucide-react";
import { Card } from "@/components/ui/card";

export function Header({
  completedCount,
  totalCount,
}: {
  completedCount: number;
  totalCount: number;
}) {
  return (
    <header className="mb-4">
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 blur-3xl opacity-30" />
        <div className="relative">
          <div className="flex sm:flex-row flex-col items-center justify-between mb-6 gap-2">
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-2 text-balance">
                Task Manager
              </h1>
              <p className="text-muted-foreground text-sm">
                Stay organized and productive with your daily tasks
              </p>
            </div>

            <div className="flex flex-wrap items-center sm:gap-4 gap-2">
              <Card className="flex flex-row items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary/10 to-accent/10 border-none shadow-none">
                <CheckCircle2 className="w-5 h-5 text-primary mr-2" />
                <div className="flex flex-col mr-4">
                  <span className="font-semibold text-base text-foreground">
                    {completedCount}/{totalCount}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    Completed
                  </span>
                </div>
                <div className="border-l h-8 mx-3 opacity-30" />
                <Calendar className="w-5 h-5 text-primary mr-2" />
                <div className="flex flex-col">
                  <span className="font-semibold text-base text-foreground">
                    {new Date().toLocaleDateString("en-US", {
                      weekday: "long",
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                  <span className="text-xs text-muted-foreground">Today</span>
                </div>
              </Card>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-muted rounded-full h-2">
            <div
              className="bg-primary h-2 rounded-full transition-all duration-500 ease-out"
              style={{
                width: `${
                  totalCount > 0 ? (completedCount / totalCount) * 100 : 0
                }%`,
              }}
            />
          </div>
        </div>
      </div>
    </header>
  );
}
