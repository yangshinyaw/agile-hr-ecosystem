import { Layout } from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bell, CheckCircle2, Clock, AlertTriangle } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface Notification {
  id: string;
  title: string;
  message: string;
  type: "task" | "deadline" | "mention" | "system";
  status: "unread" | "read";
  timestamp: string;
}

const Notifications = () => {
  const { toast } = useToast();
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      title: "New Task Assigned",
      message: "You have been assigned to review Q2 Performance Reports",
      type: "task",
      status: "unread",
      timestamp: "2 hours ago"
    },
    {
      id: "2",
      title: "Deadline Approaching",
      message: "Team Building Event planning needs to be completed by tomorrow",
      type: "deadline",
      status: "unread",
      timestamp: "5 hours ago"
    },
    {
      id: "3",
      title: "Mentioned in a comment",
      message: "@hrmanager Please review the updated employee handbook",
      type: "mention",
      status: "read",
      timestamp: "1 day ago"
    }
  ]);

  const getNotificationIcon = (type: Notification["type"]) => {
    switch (type) {
      case "task":
        return <CheckCircle2 className="w-5 h-5 text-primary" />;
      case "deadline":
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case "mention":
        return <Bell className="w-5 h-5 text-blue-500" />;
      case "system":
        return <AlertTriangle className="w-5 h-5 text-red-500" />;
    }
  };

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(notif => 
      notif.id === id ? { ...notif, status: "read" } : notif
    ));
    toast({
      title: "Notification marked as read",
      description: "The notification has been updated.",
    });
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notif => ({ ...notif, status: "read" })));
    toast({
      title: "All notifications marked as read",
      description: "All notifications have been updated.",
    });
  };

  const unreadCount = notifications.filter(n => n.status === "unread").length;

  return (
    <Layout>
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Notifications</h1>
            <p className="text-gray-600 mt-1">
              You have {unreadCount} unread {unreadCount === 1 ? 'notification' : 'notifications'}
            </p>
          </div>
          {unreadCount > 0 && (
            <Button onClick={markAllAsRead}>
              Mark all as read
            </Button>
          )}
        </div>

        <div className="space-y-4">
          {notifications.map((notification) => (
            <Card key={notification.id} className={`p-4 ${notification.status === 'unread' ? 'bg-primary/5' : ''}`}>
              <div className="flex items-start gap-4">
                <div className="mt-1">
                  {getNotificationIcon(notification.type)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">
                      {notification.title}
                      {notification.status === "unread" && (
                        <Badge variant="default" className="ml-2">New</Badge>
                      )}
                    </h3>
                    <span className="text-sm text-gray-500">{notification.timestamp}</span>
                  </div>
                  <p className="text-gray-600 mt-1">{notification.message}</p>
                </div>
                {notification.status === "unread" && (
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => markAsRead(notification.id)}
                  >
                    Mark as read
                  </Button>
                )}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Notifications;