import Home from "./pages/Home.jsx";
import Contact from "./pages/Contact.jsx"
import Skill from "./pages/Skill.jsx"
import Projects from "./pages/Projects.jsx"
import Resume from "./pages/Resume.jsx"
import About from "./pages/About.jsx"
import AdminPanel from "./pages/AdminPanel.jsx";
import AdminLogin from "./pages/AdminLogin.jsx";
import NotFound from "./pages/NotFound.jsx";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { ThemeProvider } from "./context/ThemeContext";
import ThemeSwitcher from "./components/ThemeSwitcher";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('adminToken');
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

const App = () => {
  return (
    <ThemeProvider>
      <BrowserRouter>
        {/* Global Theme Switcher - appears on all pages */}
        <ThemeSwitcher />

        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="/contact" element={<Contact />}></Route>
          <Route path="/skills" element={<Skill />}></Route>
          <Route path="/projects" element={<Projects />}></Route>
          <Route path="/resume" element={<Resume />}></Route>

          <Route path="/login" element={<AdminLogin />}></Route>
          <Route path="/admin" element={
            <ProtectedRoute>
              <AdminPanel />
            </ProtectedRoute>
          }></Route>

          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App;