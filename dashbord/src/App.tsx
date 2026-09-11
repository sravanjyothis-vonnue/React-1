import "./App.css";
import { Datafetch } from "../src/constext/issueContext";
import { Shell } from "./components/shell";
import { Routes, Route, Outlet } from "react-router-dom";
import { Team } from "./components/team";
import { Login } from "./components/login";
import { Profile } from "./components/profile";
import { ViewIssue } from "./components/viewIssue";
import { Not_Found } from "./components/notFound";
import { Authenticate } from "./constext/authContext";
import { ProtectedRoute } from "./constext/protectedRoute";

function DataLayout() {
  return (
    <Datafetch>
      <Outlet />
    </Datafetch>
  );
}

function App() {
  return (
    <Authenticate>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<DataLayout />}>
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Shell />} />
            <Route path="/team" element={<Team />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/dashboard/:id" element={<ViewIssue />} />
          </Route>
        </Route>
        <Route path="*" element={<Not_Found />} />
      </Routes>
    </Authenticate>
  );
}

export default App;
