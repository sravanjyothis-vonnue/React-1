import { LoginHeader } from "./loginHeader";
import { useAuth } from "../constext/authContext";
import { useNavigate } from "react-router-dom";

export function Login() {
  const navigate = useNavigate();
  const { login, success } = useAuth();

  async function handleOnSubmit(data: FormData) {
    login(data);
  }

  async function handleForgot(data: string) {
    fetch("https://8t6gkm38-4000.inc1.devtunnels.ms/auth/forgot", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: data,
      }),
    });
  }

  return (
    <div className="loginBackground">
      <LoginHeader />
      <div className="loginBody">
        <div className="loginFormContainer">
          <div className={success ? "hideError" : "showError"}>
            <p className="errorText">Wrong credentials!</p>
          </div>
          <form action="/" onSubmit={(e) => e.preventDefault()} id="loginForm">
            <div className="welcome">Welcome!</div>
            <label htmlFor="userName" id="userName">
              UserName :{" "}
            </label>
            <input
              type="text"
              className="formInput"
              style={{ borderColor: "whitesmoke" }}
              name="username"
              id="username"
            />
            <p className="errorDisplay"></p>
            <label htmlFor="password" id="password">
              Password :{" "}
            </label>
            <input
              type="password"
              className="formInput"
              style={{ borderColor: "whitesmoke" }}
              id="password"
              name="password"
            />
            <p className="errorDisplay"></p>

            <button
              className="formButton"
              style={{ width: 258 }}
              onClick={() => {
                handleOnSubmit(
                  new FormData(
                    document.getElementById("loginForm") as HTMLFormElement,
                  ),
                );
              }}
            >
              Login
            </button>
            <button
              style={{ width: 258, marginTop: 10 }}
              className="signUpButton"
              onClick={() => {
                navigate("/signup");
              }}
            >
              Sign Up
            </button>
            <button
              className="formButton"
              id="forgotButton"
              onClick={() => {
                const username = document.getElementById(
                  "username",
                ) as HTMLInputElement;
                handleForgot(username.value);
              }}
            >
              forgot password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
