import { Layout } from "@/components/Layout";
import { StatCard } from "@/components/dashboard/StatCard";
import { TaskList } from "@/components/dashboard/TaskList";
import { TaskForm } from "@/components/dashboard/TaskForm";
import { CheckCircle2, Clock, AlertCircle, Search } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Task } from "./Tasks";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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

  const [searchQuery, setSearchQuery] = useState("");
  const [priorityFilter, setPriorityFilter] = useState<string>("all");
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

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPriority = priorityFilter === "all" || task.priority === priorityFilter;
    return matchesSearch && matchesPriority;
  });

  const pendingTasks = filteredTasks.filter(task => task.status === "pending").length;
  const inProgressTasks = filteredTasks.filter(task => task.status === "in-progress").length;
  const completedTasks = filteredTasks.filter(task => task.status === "completed").length;

  return (
    <Layout>
      <div className="space-y-8 animate-fade-in">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Dashboard
              </h1>
              <p className="text-gray-600 mt-2 text-lg">Welcome back, HR Manager</p>
            </div>
            <TaskForm onTaskCreated={handleTaskCreated} />
          </div>

          {/* Search and Filter Section */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search tasks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priorities</SelectItem>
                <SelectItem value="high">High Priority</SelectItem>
                <SelectItem value="medium">Medium Priority</SelectItem>
                <SelectItem value="low">Low Priority</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard
            title="Pending Tasks"
            value={pendingTasks}
            icon={<Clock className="w-8 h-8" />}
            description={`${pendingTasks} task${pendingTasks === 1 ? '' : 's'} pending`}
            className="bg-warning/10 hover:bg-warning/20 transition-colors"
          />
          <StatCard
            title="In Progress"
            value={inProgressTasks}
            icon={<AlertCircle className="w-8 h-8" />}
            description={`${inProgressTasks} task${inProgressTasks === 1 ? '' : 's'} in progress`}
            className="bg-primary/10 hover:bg-primary/20 transition-colors"
          />
          <StatCard
            title="Completed"
            value={completedTasks}
            icon={<CheckCircle2 className="w-8 h-8" />}
            description={`${completedTasks} task${completedTasks === 1 ? '' : 's'} completed`}
            className="bg-success/10 hover:bg-success/20 transition-colors"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TaskList 
            title="My Tasks" 
            tasks={filteredTasks.filter(task => task.status !== "completed")}
            onStatusChange={handleStatusChange}
          />
          <TaskList 
            title="Completed Tasks" 
            tasks={filteredTasks.filter(task => task.status === "completed")}
            onStatusChange={handleStatusChange}
          />
        </div>
      </div>
    </Layout>
  );
};

export default Index;