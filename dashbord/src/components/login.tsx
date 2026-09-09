import { LoginHeader } from "./loginHeader";
import z from "zod";
import { useState } from "react";

const loginForm = z.object({
  username: z.string().min(4).max(20),
  password: z.string().min(8).max(20),
});

type loginCred = z.infer<typeof loginForm>;

export function Login() {
  const [success, setSuccess] = useState(true);

  function handleOnSubmit(data: FormData) {
    let loginState = false;
    const login: loginCred = {
      username: data.get("username")?.toString() ?? "",
      password: data.get("password")?.toString() ?? "",
    };
    const result = loginForm.safeParse(login);

    if (!result.success) {
      setSuccess(false);
      throw new Error("Validation Error");
    }
    if (
      result.data.username == "username123" &&
      result.data.password == "password123"
    ) {
      loginState = true;
      window.location.pathname = "/dashbord";
    } else {
      setSuccess(false);
    }
    return;
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
            />
            <p className="errorDisplay"></p>
            <label htmlFor="password" id="password">
              Password :{" "}
            </label>
            <input
              type="password"
              className="formInput"
              style={{ borderColor: "whitesmoke" }}
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
          </form>
        </div>
      </div>
    </div>
  );
}
