import "./App.css";
import { Shell } from "./components/shell";
import { Routes, Route } from "react-router-dom";
import { Team } from "./components/team";
import { Login } from "./components/login";
import { Profile } from "./components/profile";
import { ViewIssue } from "./components/viewIssue";
import { Not_Found } from "./components/notFound";
function App() {
  return (
    <Routes>
      <Route path="/dashbord" element={<Shell />} />
      <Route path="/team" element={<Team />} />
      <Route path="/" element={<Login />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/dashbord/:id" element={<ViewIssue />} />
      <Route path="*" element={<Not_Found />} />
    </Routes>
  );
}

export default App;
