import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
interface registerCred {
  username: string;
  password: string;
}

export function SignUp() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<registerCred>();

  function onSubmit(data: registerCred) {
    fetch("https://8t6gkm38-4000.inc1.devtunnels.ms/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: data.username,
        password: data.password,
      }),
    })
      .then(() => {
        toast("User registered", { duration: 3000 });
      })
      .then(() => {
        navigate("/");
      });
  }

  return (
    <>
      <div className="loginBackground">
        <div className="signupHeader">SIGN UP</div>
        <div className="registerFormContainer">
          <form onSubmit={handleSubmit(onSubmit)} className="signUpForm">
            <div className="FormHeader">HELLO THERE,</div>
            <label htmlFor="signupUserName" id="userName">
              Username :
            </label>
            <input
              {...register("username", {
                required: true,
                maxLength: 20,
                minLength: 5,
              })}
              className="userName"
            />
            <p>
              {errors.username && errors.username.type == "required" && (
                <span className="error">This field is required</span>
              )}
              {errors.username && errors.username.type == "minLength" && (
                <span className="error">
                  This field require atleast 5 characters
                </span>
              )}
              {errors.username && errors.username.type == "maxLength" && (
                <span className="error">
                  This field only accepts upto 20 characters
                </span>
              )}
            </p>
            <label htmlFor="signupPassword" id="password">
              Password :
            </label>
            <input
              {...register("password", {
                required: true,
                maxLength: 20,
                minLength: 5,
              })}
              className="password"
            />

            <p>
              {errors.password && errors.password.type == "required" && (
                <span className="error">This field is required</span>
              )}
              {errors.password && errors.password.type == "minLength" && (
                <span className="error">
                  This field require atleast 5 characters
                </span>
              )}
              {errors.password && errors.password.type == "maxLength" && (
                <span className="error">
                  This field only accepts upto 20 characters
                </span>
              )}
            </p>
            <button className="signUpButton" style={{ width: 256 }}>
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
