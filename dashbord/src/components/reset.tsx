import { LoginHeader } from "./loginHeader";
import { useNavigate } from "react-router-dom";

export function Reset() {
  const navigate = useNavigate();
  const params = new URLSearchParams(window.location.search);
  const token = params.get("token");

  function handleOnClick(data: string) {
    fetch("https://8t6gkm38-4000.inc1.devtunnels.ms/auth/reset", {
      method: "PATCH",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        password: data,
        token: token,
      }),
    }).then((res) => (res.ok ? navigate("/") : null));
  }

  return (
    <>
      <div className="loginBackground">
        <LoginHeader />
        <div className="loginBody">
          <div className="loginFormContainer"></div>
          <form action="/" onSubmit={(e) => e.preventDefault()} id="loginForm">
            <div className="welcome">Reset Password</div>

            <label htmlFor="password">Password : </label>
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
                const password = document.getElementById(
                  "password",
                ) as HTMLInputElement;
                handleOnClick(password.value);
              }}
            >
              Reset
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
