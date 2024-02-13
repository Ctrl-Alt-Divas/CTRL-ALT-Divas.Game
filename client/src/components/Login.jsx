import { useEffect, useState } from "react";
import { useLoginMutation } from "../../api/divasApi";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCredentials } from "../app/slice";

function Login() {
  const [user, setUser] = useState({ username: "", password: "" });
  const [errorMsg, setErrorMsg] = useState("");

  const [login, { data, error, isSuccess, isError }] = useLoginMutation();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    await login({ ...user })
      .unwrap()
      .then((res) => console.log(res))
      .catch((rejected) => console.error(rejected));
  };
  useEffect(() => {
    if (isError) {
      if (error.data === "invalid password") {
        setErrorMsg(error.data);
      } else {
        setErrorMsg("invalid username");
      }
    }
  }, [isError]);
  useEffect(() => {
    if (isSuccess) {
      dispatch(setCredentials(data));
      navigate("/account");
    }
  }, [isSuccess]);

  return (
    <div>
      <form
        className="flex flex-col gap-5 items-center justify-center mt-20"
        onSubmit={handleSubmit}
      >
        <h2 className="text-fuchsia-500 text-4xl">Login</h2>
        {errorMsg && <p className="text-red-600">{errorMsg}</p>}
        <div className="flex gap-5">
          <label className="text-fuchsia-500 text-xl">Username:</label>
          <input
            autoFocus
            onChange={(e) => setUser({ ...user, username: e.target.value })}
          />
        </div>
        <div className="flex gap-5">
          <label className="text-fuchsia-500 text-xl">Password:</label>
          <input
            type="password"
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
        </div>
        <button className="text-white text-xl bg-fuchsia-500 p-1 rounded-lg">
          Login
        </button>
        <div className="flex gap-3">
          {" "}
          <p className="text-xl text-fuchsia-600">New to the game?</p>
          <a
            className="text-xl text-fuchsia-600 hover:text-cyan-500"
            href="/register"
          >
            Sign Up
          </a>
        </div>
      </form>
    </div>
  );
}

export default Login;
