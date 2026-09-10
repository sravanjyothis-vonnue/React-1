import { LoginHeader } from "./loginHeader";
import { useAuth } from "../constext/authContext";

export function Login() {
  const { login, success } = useAuth();

  async function handleOnSubmit(data: FormData) {
    login(data);
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
