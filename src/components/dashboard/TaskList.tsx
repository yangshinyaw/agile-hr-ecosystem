import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Clock, AlertCircle, MoreVertical } from "lucide-react";
import { Task } from "@/pages/Tasks";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const getPriorityColor = (priority: Task["priority"]) => {
  switch (priority) {
    case "high":
      return "bg-destructive text-destructive-foreground";
    case "medium":
      return "bg-warning text-warning-foreground";
    case "low":
      return "bg-success text-success-foreground";
  }
};

const getStatusIcon = (status: Task["status"]) => {
  switch (status) {
    case "completed":
      return <CheckCircle2 className="w-5 h-5 text-success" />;
    case "in-progress":
      return <Clock className="w-5 h-5 text-warning" />;
    case "pending":
      return <AlertCircle className="w-5 h-5 text-destructive" />;
  }
};

interface TaskListProps {
  title: string;
  tasks: Task[];
  onStatusChange?: (taskId: string, newStatus: Task["status"]) => void;
}

export const TaskList = ({ title, tasks, onStatusChange }: TaskListProps) => {
  const handleStatusClick = (task: Task) => {
    if (!onStatusChange) return;
    
    const statusOrder: Task["status"][] = ["pending", "in-progress", "completed"];
    const currentIndex = statusOrder.indexOf(task.status);
    const nextStatus = statusOrder[(currentIndex + 1) % statusOrder.length];
    
    onStatusChange(task.id, nextStatus);
  };

  return (
    <Card className="p-6 hover:shadow-lg transition-shadow duration-300">
      <h2 className="text-2xl font-bold mb-6">{title}</h2>
      <div className="space-y-4">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="group flex items-center justify-between p-4 bg-white rounded-lg border border-gray-100 hover:border-primary/20 transition-all duration-300 hover:shadow-md"
          >
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                className="cursor-pointer hover:bg-gray-100"
                onClick={() => handleStatusClick(task)}
              >
                {getStatusIcon(task.status)}
              </Button>
              <div>
                <h3 className="font-medium group-hover:text-primary transition-colors">
                  {task.title}
                </h3>
                <p className="text-sm text-gray-500">Due {task.deadline}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Badge className={`${getPriorityColor(task.priority)} capitalize`}>
                {task.priority}
              </Badge>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="hover:bg-gray-100">
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => handleStatusClick(task)}>
                    Change Status
                  </DropdownMenuItem>
                  <DropdownMenuItem>Edit Task</DropdownMenuItem>
                  <DropdownMenuItem className="text-destructive">
                    Delete Task
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};