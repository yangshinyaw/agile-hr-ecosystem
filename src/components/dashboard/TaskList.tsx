import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Clock, AlertCircle } from "lucide-react";
import { Task } from "@/pages/Tasks";

const getPriorityColor = (priority: Task["priority"]) => {
  switch (priority) {
    case "high":
      return "bg-destructive";
    case "medium":
      return "bg-warning";
    case "low":
      return "bg-success";
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
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      <div className="space-y-4">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-100 hover:border-primary/20 transition-colors"
          >
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                className="cursor-pointer"
                onClick={() => handleStatusClick(task)}
              >
                {getStatusIcon(task.status)}
              </Button>
              <div>
                <h3 className="font-medium">{task.title}</h3>
                <p className="text-sm text-gray-500">Due {task.deadline}</p>
              </div>
            </div>
            <Badge className={getPriorityColor(task.priority)}>
              {task.priority}
            </Badge>
          </div>
        ))}
      </div>
    </Card>
  );
};