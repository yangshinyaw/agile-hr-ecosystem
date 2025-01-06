import { 
  Home, 
  CheckSquare, 
  Calendar as CalendarIcon, 
  Bell, 
  Users, 
  BarChart, 
  FileText,
  LogOut
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const menuItems = [
  { title: "Dashboard", icon: Home, url: "/" },
  { title: "Tasks", icon: CheckSquare, url: "/tasks" },
  { title: "Calendar", icon: CalendarIcon, url: "/calendar" },
  { title: "Notifications", icon: Bell, url: "/notifications" },
  { title: "Employees", icon: Users, url: "/employees" },
  { title: "Performance", icon: BarChart, url: "/performance" },
  { title: "Documents", icon: FileText, url: "/documents" },
];

export function AppSidebar() {
  const location = useLocation();

  return (
    <Sidebar className="border-r border-gray-200 dark:border-gray-800">
      <SidebarContent>
        <div className="p-6">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/70 text-transparent bg-clip-text">HR Hub</h1>
        </div>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link
                      to={item.url}
                      className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                        location.pathname === item.url 
                          ? "bg-primary/10 text-primary" 
                          : "hover:bg-gray-100 dark:hover:bg-gray-800"
                      }`}
                    >
                      <item.icon className="w-5 h-5" />
                      <span className="font-medium">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <button className="w-full flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 transition-colors">
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}