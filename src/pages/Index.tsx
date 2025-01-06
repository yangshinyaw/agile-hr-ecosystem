import { Layout } from "@/components/Layout";
import { StatCard } from "@/components/dashboard/StatCard";
import { TaskList } from "@/components/dashboard/TaskList";
import { TaskForm } from "@/components/dashboard/TaskForm";
import { CheckCircle2, Clock, AlertCircle, Plus } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Task } from "./Tasks";

const Index = () => {
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

  const handleTaskCreated = (newTask: Task) => {
    setTasks(prevTasks => [newTask, ...prevTasks]);
  };

  const pendingTasks = tasks.filter(task => task.status === "pending").length;
  const inProgressTasks = tasks.filter(task => task.status === "in-progress").length;
  const completedTasks = tasks.filter(task => task.status === "completed").length;

  return (
    <Layout>
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-gray-600 mt-1">Welcome back, HR Manager</p>
          </div>
          <TaskForm onTaskCreated={handleTaskCreated} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard
            title="Pending Tasks"
            value={pendingTasks}
            icon={<Clock className="w-8 h-8" />}
            description={pendingTasks === 1 ? "1 task pending" : `${pendingTasks} tasks pending`}
          />
          <StatCard
            title="In Progress"
            value={inProgressTasks}
            icon={<AlertCircle className="w-8 h-8" />}
            description={inProgressTasks === 1 ? "1 task in progress" : `${inProgressTasks} tasks in progress`}
          />
          <StatCard
            title="Completed"
            value={completedTasks}
            icon={<CheckCircle2 className="w-8 h-8" />}
            description={completedTasks === 1 ? "1 task completed" : `${completedTasks} tasks completed`}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TaskList 
            title="My Tasks" 
            tasks={tasks.filter(task => task.status !== "completed")}
            onStatusChange={handleStatusChange}
          />
          <TaskList 
            title="Completed Tasks" 
            tasks={tasks.filter(task => task.status === "completed")}
            onStatusChange={handleStatusChange}
          />
        </div>
      </div>
    </Layout>
  );
};

export default Index;