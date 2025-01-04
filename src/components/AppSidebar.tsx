import { 
  Home, 
  CheckSquare, 
  Calendar as CalendarIcon, 
  Bell, 
  Users, 
  BarChart, 
  FileText 
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
    <Sidebar>
      <SidebarContent>
        <div className="p-6">
          <h1 className="text-2xl font-bold text-primary">HR Hub</h1>
        </div>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link
                      to={item.url}
                      className={`flex items-center gap-3 ${
                        location.pathname === item.url ? "text-primary" : ""
                      }`}
                    >
                      <item.icon className="w-5 h-5" />
                      <span>{item.title}</span>
                    </Link>
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