import { Layout } from "@/components/Layout";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

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

  const { toast } = useToast();

  const handleDateSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
    toast({
      title: "Date Selected",
      description: `Selected date: ${selectedDate?.toLocaleDateString()}`,
    });
  };

  return (
    <Layout>
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Calendar</h1>
            <p className="text-gray-600 mt-1">Manage meetings and events</p>
          </div>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Schedule Meeting
          </Button>
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
            <h2 className="text-xl font-semibold mb-4">Upcoming Meetings</h2>
            <div className="space-y-4">
              {meetings.map((meeting) => (
                <div
                  key={meeting.id}
                  className="p-4 border rounded-lg hover:border-primary/20 transition-colors"
                >
                  <h3 className="font-medium">{meeting.title}</h3>
                  <p className="text-sm text-gray-500 mt-1">
                    {meeting.date.toLocaleDateString()}
                  </p>
                  <div className="mt-2">
                    <p className="text-sm text-gray-600">
                      Attendees: {meeting.attendees.join(", ")}
                    </p>
                  </div>
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