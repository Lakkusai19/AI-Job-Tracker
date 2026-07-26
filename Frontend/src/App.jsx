import { BrowserRouter, Routes, Route } from "react-router-dom";
import AIAssistant from "./pages/AIAssistant";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Jobs from "./pages/Jobs";
import AddJob from "./pages/AddJob";
import EditJob from "./pages/EditJob";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />    
        <Route path="/jobs" element={<Jobs />} /> 
        <Route path="/jobs/add" element={<AddJob />} />
        <Route path="/jobs/edit/:id" element={<EditJob />} />
        <Route path="/ai-assistant" element={<AIAssistant />} />
      </Routes>
    </BrowserRouter>
  );
}




export default App;

