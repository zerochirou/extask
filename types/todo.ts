import z from "zod";

export type Todo = {
  id: string;
  task: string;
  status: boolean;
  priority: boolean;
  description: string;
  deadline: string;
  created_at: string;
};

export const createTodo = z
  .object({
    task: z.string(),
    priority: z.boolean().optional(),
    description: z.string(),
    date: z.date({ message: "Date is required" }),
    time: z.string().regex(/^\d{2}:\d{2}(:\d{2})?$/, "Invalid time format"),
  })
  .transform((data) => {  
    // Gabungkan date + time jadi timestamp
    const [hours, minutes, seconds = "00"] = data.time.split(":");
    const fullDate = new Date(data.date);

    fullDate.setHours(Number(hours));
    fullDate.setMinutes(Number(minutes));
    fullDate.setSeconds(Number(seconds));

    // Remove date and time from result, add deadline
    const { date, time, ...rest } = data;
    return {
      ...rest,
      deadline: `${fullDate.getFullYear()}-${String(fullDate.getMonth() + 1).padStart(2, "0")}-${String(fullDate.getDate()).padStart(2, "0")} ${String(fullDate.getHours()).padStart(2, "0")}:${String(fullDate.getMinutes()).padStart(2, "0")}:${String(fullDate.getSeconds()).padStart(2, "0")}`,
    };
  });
