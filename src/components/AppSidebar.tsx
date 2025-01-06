import { 
  Home, 
  CheckSquare, 
  Calendar as CalendarIcon, 
  Bell, 
  Users, 
  BarChart, 
  FileText,
  Menu
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
  SidebarTrigger,
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
    <Sidebar className="border-r border-gray-200">
      <SidebarContent>
        <div className="p-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            HR Hub
          </h1>
          <SidebarTrigger asChild>
            <button className="lg:hidden p-2 hover:bg-gray-100 rounded-md">
              <Menu className="w-5 h-5" />
            </button>
          </SidebarTrigger>
        </div>
        <SidebarGroup>
          <SidebarGroupLabel className="text-sm font-medium text-gray-500">Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <div>
                      <Link
                        to={item.url}
                        className={`flex items-center gap-3 px-4 py-2 rounded-md transition-colors ${
                          location.pathname === item.url 
                            ? "bg-primary/10 text-primary" 
                            : "hover:bg-gray-100"
                        }`}
                      >
                        <item.icon className="w-5 h-5" />
                        <span className="font-medium">{item.title}</span>
                      </Link>
                    </div>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}