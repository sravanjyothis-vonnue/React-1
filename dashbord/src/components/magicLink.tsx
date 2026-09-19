import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface linkCred {
  email: string;
}

export function MagicLink() {
  const { register, handleSubmit } = useForm<linkCred>();
  const [disable, setDisable] = useState(false);

  async function handleOnClick(email: linkCred) {
    console.log(email);
    setDisable(true);
    fetch("https://8t6gkm38-4000.inc1.devtunnels.ms/auth/magic-link", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email.email,
      }),
    }).then(() => {
      toast("Magic-Link send to your mail", { duration: 3000 });
    });
  }

  return (
    <div className="loginBackground">
      <div className="headerContainer">
        <div className="loginText">MAGIC-LINK LOGIN</div>
      </div>
      <div className="magicLinkContainer">
        <form onSubmit={handleSubmit(handleOnClick)} className="loginForm">
          <label htmlFor="email" id="userName" style={{ marginRight: 10 }}>
            Email :
          </label>
          <input
            {...register("email", {
              required: true,
            })}
            className="username"
            style={{ height: 40 }}
          />
          <button
            disabled={disable}
            className="signUpButton"
            style={{ width: 263 }}
          >
            {disable ? "Loading..." : "Send Link"}
          </button>
        </form>
      </div>
    </div>
  );
}
