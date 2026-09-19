import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import z from "zod";
import { useNavigate } from "react-router-dom";

const loginForm = z.object({
  username: z.string().min(4).max(20),
  password: z.string().min(8).max(20),
});

type loginCred = z.infer<typeof loginForm>;

interface AuthContextType {
  login: (data: FormData) => void;
  logout: () => void;
  setToken: Function;
  success: any;
  user: any;
  me: any;
  token: any;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function Authenticate({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(false);
  const [success, setSuccess] = useState(true);
  const [me, setme] = useState(null);
  const [token, setToken] = useState("");

  useEffect(() => {
    fetch("https://8t6gkm38-4000.inc1.devtunnels.ms/auth/me", {
      credentials: "include",
      headers: { Authorization: `Barear ${token}` },
    })
      .then((res) => (res.ok ? res.json() : null))
      .then((json) => {
        setUser(true);
        setme(json.message.role);
      })
      .then(() => navigate("/dashboard"))
      .catch(() => setUser(false));
  }, []);

  const login = async (data: FormData) => {
    const params = new URLSearchParams(window.location.search);
    if (!params.size) {
      const loginData: loginCred = {
        username: (data.get("username") as string) ?? "",
        password: (data.get("password") as string) ?? "",
      };

      const result = loginForm.safeParse(loginData);

      if (!result.success) {
        setSuccess(false);
        throw new Error("Validation Error");
      }
      try {
        const response = await fetch(
          "https://8t6gkm38-4000.inc1.devtunnels.ms/auth/login",
          {
            method: "POST",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              username: result.data.username,
              password: result.data.password,
            }),
          },
        );
        const data = await response.json();
        if (!response.ok) {
          setSuccess(false);
          throw new Error(`UNAUTHORIZED : ${data.error}`);
        }
        setToken(data.token);
        setUser(true);
        navigate("/dashboard");
        return;
      } catch (error) {
        console.error(`Login failed : ${error}`);

        setSuccess(false);
      }
    } else {
      const token = params.get("token");
      if (token) {
        setUser(true);
        setToken(token);
        navigate("/dashboard");
      } else {
        navigate("/");
      }
    }
  };

  const logout = () => {
    setUser(false);
    setme(null);
    setToken("");
  };

  return (
    <AuthContext.Provider
      value={{ login, logout, user, success, me, token, setToken }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const Auth = useContext(AuthContext);
  if (!Auth) {
    throw new Error("context data not found");
  }
  return Auth;
}
