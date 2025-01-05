import { Layout } from "@/components/Layout";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { TaskForm } from "@/components/dashboard/TaskForm";
import { Task } from "./Tasks";

interface Meeting {
  id: string;
  title: string;
  date: Date;
  attendees: string[];
}

const Calendar = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [meetings, setMeetings] = useState<Meeting[]>([
    {
      id: "1",
      title: "Team Performance Review",
      date: new Date(),
      attendees: ["John Doe", "Jane Smith", "Bob Johnson"],
    },
    {
      id: "2",
      title: "Recruitment Planning",
      date: new Date(Date.now() + 86400000),
      attendees: ["Alice Brown", "Charlie Davis"],
    },
  ]);

  const [tasks, setTasks] = useState<Task[]>([]);
  const { toast } = useToast();

  const handleDateSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
    console.log("Selected date:", selectedDate);
    
    const tasksForDate = tasks.filter(task => {
      const taskDate = new Date(task.deadline);
      return selectedDate && 
        taskDate.getDate() === selectedDate.getDate() &&
        taskDate.getMonth() === selectedDate.getMonth() &&
        taskDate.getFullYear() === selectedDate.getFullYear();
    });

    if (tasksForDate.length > 0) {
      toast({
        title: "Tasks for this date",
        description: `${tasksForDate.length} task(s) scheduled`,
      });
    }
  };

  const handleTaskCreated = (newTask: Task) => {
    console.log("New task created:", newTask);
    setTasks(prevTasks => [...prevTasks, newTask]);
    toast({
      title: "Task Created",
      description: "Task has been added to your calendar",
    });
  };

  // Combine meetings and tasks for display
  const getEventsForDisplay = () => {
    const taskEvents = tasks.map(task => ({
      id: task.id,
      title: task.title,
      date: new Date(task.deadline),
      type: 'task',
      priority: task.priority,
      status: task.status
    }));

    const meetingEvents = meetings.map(meeting => ({
      ...meeting,
      type: 'meeting'
    }));

    return [...taskEvents, ...meetingEvents].sort((a, b) => 
      a.date.getTime() - b.date.getTime()
    );
  };

  const events = getEventsForDisplay();

  return (
    <Layout>
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Calendar</h1>
            <p className="text-gray-600 mt-1">Manage meetings and tasks</p>
          </div>
          <div className="flex gap-4">
            <TaskForm onTaskCreated={handleTaskCreated} />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="p-6 lg:col-span-2">
            <CalendarComponent
              mode="single"
              selected={date}
              onSelect={handleDateSelect}
              className="rounded-md border"
            />
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Upcoming Events</h2>
            <div className="space-y-4">
              {events.map((event) => (
                <div
                  key={event.id}
                  className={`p-4 border rounded-lg transition-colors ${
                    event.type === 'task' 
                      ? `border-${(event as any).priority === 'high' ? 'red' : (event as any).priority === 'medium' ? 'yellow' : 'green'}-500/50` 
                      : 'border-blue-500/50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">{event.title}</h3>
                    <span className="text-xs px-2 py-1 rounded-full bg-gray-100">
                      {event.type === 'task' ? 'Task' : 'Meeting'}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    {event.date.toLocaleDateString()} at {event.date.toLocaleTimeString()}
                  </p>
                  {event.type === 'meeting' && (
                    <div className="mt-2">
                      <p className="text-sm text-gray-600">
                        Attendees: {(event as Meeting).attendees.join(", ")}
                      </p>
                    </div>
                  )}
                  {event.type === 'task' && (
                    <div className="mt-2">
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        (event as any).status === 'completed' ? 'bg-green-100 text-green-800' :
                        (event as any).status === 'in-progress' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {(event as any).status}
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Calendar;