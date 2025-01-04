import { Layout } from "@/components/Layout";
import { StatCard } from "@/components/dashboard/StatCard";
import { TaskList } from "@/components/dashboard/TaskList";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Clock, AlertCircle, Plus } from "lucide-react";

// Mock data - in a real app this would come from an API
const mockTasks = [
  {
    id: "1",
    title: "Review Q2 Performance Reports",
    priority: "high",
    deadline: "Tomorrow at 5 PM",
    status: "pending",
  },
  {
    id: "2",
    title: "Schedule Team Building Event",
    priority: "medium",
    deadline: "Next Week",
    status: "in-progress",
  },
  {
    id: "3",
    title: "Update Employee Handbook",
    priority: "low",
    deadline: "Next Month",
    status: "completed",
  },
] as const;

const Index = () => {
  return (
    <Layout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-gray-600 mt-1">Welcome back, HR Manager</p>
          </div>
          <Button className="bg-primary hover:bg-primary/90">
            <Plus className="w-4 h-4 mr-2" />
            Create Task
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard
            title="Pending Tasks"
            value="12"
            icon={<Clock className="w-8 h-8" />}
            description="4 due today"
          />
          <StatCard
            title="In Progress"
            value="8"
            icon={<AlertCircle className="w-8 h-8" />}
            description="2 near deadline"
          />
          <StatCard
            title="Completed"
            value="24"
            icon={<CheckCircle2 className="w-8 h-8" />}
            description="This week"
          />
        </div>

        {/* Task Lists */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TaskList title="My Tasks" tasks={mockTasks} />
          <TaskList title="Team Tasks" tasks={mockTasks} />
        </div>
      </div>
    </Layout>
  );
};

export default Index;