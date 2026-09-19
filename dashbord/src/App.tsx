import "./App.css";
import { Datafetch } from "./context/issueContext";
import { Shell } from "./components/shell";
import { Routes, Route, Outlet } from "react-router-dom";
import { Team } from "./components/team";
import { Login } from "./components/login";
import { Profile } from "./components/profile";
import { ViewIssue } from "./components/viewIssue";
import { Not_Found } from "./components/notFound";
import { Reset } from "./components/reset";
import { Authenticate } from "./context/authContext";
import { ProtectedRoute } from "./context/protectedRoute";
import { SignUp } from "./components/signup";
import { MagicLink } from "./components/magicLink";

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
        <Route path="/reset" element={<Reset />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/magicLink" element={<MagicLink />} />
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
