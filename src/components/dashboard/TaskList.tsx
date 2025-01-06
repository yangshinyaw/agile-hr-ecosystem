import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Clock, AlertCircle } from "lucide-react";
import { Task } from "@/pages/Tasks";

const getPriorityColor = (priority: Task["priority"]) => {
  switch (priority) {
    case "high":
      return "bg-destructive/10 text-destructive border-destructive/20";
    case "medium":
      return "bg-warning/10 text-warning border-warning/20";
    case "low":
      return "bg-success/10 text-success border-success/20";
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
    <Card className="overflow-hidden">
      <div className="p-6 bg-white dark:bg-gray-800">
        <h2 className="text-xl font-semibold">{title}</h2>
      </div>
      <div className="p-6 space-y-4">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="group flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-100 dark:border-gray-700 hover:border-primary/20 dark:hover:border-primary/20 transition-all hover:shadow-md"
          >
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                className="opacity-70 group-hover:opacity-100 transition-opacity"
                onClick={() => handleStatusClick(task)}
              >
                {getStatusIcon(task.status)}
              </Button>
              <div>
                <h3 className="font-medium">{task.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Due {task.deadline}</p>
              </div>
            </div>
            <Badge className={`${getPriorityColor(task.priority)} capitalize`}>
              {task.priority}
            </Badge>
          </div>
        ))}
        {tasks.length === 0 && (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            No tasks found
          </div>
        )}
      </div>
    </Card>
  );
};