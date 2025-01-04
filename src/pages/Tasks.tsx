import { Layout } from "@/components/Layout";
import { TaskList } from "@/components/dashboard/TaskList";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export interface Task {
  id: string;
  title: string;
  priority: "high" | "medium" | "low";
  deadline: string;
  status: "pending" | "in-progress" | "completed";
}

const Tasks = () => {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "1",
      title: "Review Q2 Performance Reports",
      priority: "high" as const,
      deadline: "Tomorrow at 5 PM",
      status: "pending" as const,
    },
    {
      id: "2",
      title: "Schedule Team Building Event",
      priority: "medium" as const,
      deadline: "Next Week",
      status: "in-progress" as const,
    },
    {
      id: "3",
      title: "Update Employee Handbook",
      priority: "low" as const,
      deadline: "Next Month",
      status: "completed" as const,
    },
  ]);

  const { toast } = useToast();

  const handleStatusChange = (taskId: string, newStatus: Task["status"]) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, status: newStatus } : task
    ));
    toast({
      title: "Task Updated",
      description: "Task status has been successfully updated.",
    });
  };

  return (
    <Layout>
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Tasks</h1>
            <p className="text-gray-600 mt-1">Manage your team's tasks</p>
          </div>
          <Button className="bg-primary hover:bg-primary/90">
            <Plus className="w-4 h-4 mr-2" />
            Create Task
          </Button>
        </div>
        <TaskList 
          title="All Tasks" 
          tasks={tasks}
          onStatusChange={handleStatusChange}
        />
      </div>
    </Layout>
  );
};

export default Tasks;