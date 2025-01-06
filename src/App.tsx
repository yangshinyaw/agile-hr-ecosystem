import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "@/pages/Index";
import Tasks from "@/pages/Tasks";
import Notifications from "@/pages/Notifications";
import Calendar from "@/pages/Calendar";
import Employees from "@/pages/Employees";
import Performance from "@/pages/Performance";
import Documents from "@/pages/Documents";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/employees" element={<Employees />} />
        <Route path="/performance" element={<Performance />} />
        <Route path="/documents" element={<Documents />} />
      </Routes>
    </Router>
  );
}

export default App;