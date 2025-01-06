import { Layout } from "@/components/Layout";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Calendar as CalendarIcon } from "lucide-react";
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
      <div className="space-y-6">
        <div className="flex justify-between items-center bg-white p-6 rounded-lg shadow-sm">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Calendar</h1>
            <p className="text-gray-500 mt-1">Manage your schedule and tasks efficiently</p>
          </div>
          <div className="flex gap-4">
            <TaskForm onTaskCreated={handleTaskCreated} />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2 overflow-hidden">
            <div className="p-6 bg-white">
              <CalendarComponent
                mode="single"
                selected={date}
                onSelect={handleDateSelect}
                className="rounded-md border shadow-sm"
              />
            </div>
          </Card>

          <Card className="bg-white">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Upcoming Events</h2>
                <CalendarIcon className="text-gray-400 w-5 h-5" />
              </div>
              <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
                {events.map((event) => (
                  <div
                    key={event.id}
                    className={`p-4 rounded-lg transition-all hover:shadow-md ${
                      event.type === 'task' 
                        ? `border-l-4 ${
                            (event as any).priority === 'high' 
                              ? 'border-l-red-500 bg-red-50' 
                              : (event as any).priority === 'medium' 
                                ? 'border-l-yellow-500 bg-yellow-50' 
                                : 'border-l-green-500 bg-green-50'
                          }` 
                        : 'border-l-4 border-l-blue-500 bg-blue-50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-gray-900">{event.title}</h3>
                      <span className="text-xs px-2 py-1 rounded-full bg-white shadow-sm border">
                        {event.type === 'task' ? 'Task' : 'Meeting'}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-2">
                      {event.date.toLocaleDateString()} at {event.date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                    {event.type === 'meeting' && (
                      <div className="mt-3">
                        <p className="text-sm text-gray-600">
                          <span className="font-medium">Attendees:</span> {(event as Meeting).attendees.join(", ")}
                        </p>
                      </div>
                    )}
                    {event.type === 'task' && (
                      <div className="mt-3">
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
            </div>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Calendar;