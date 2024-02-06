import { useEffect, useState } from "react";
import { useLoginMutation } from "../../api/divasApi";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCredentials } from "../app/slice";

function Login() {
  const [user, setUser] = useState({ username: "", password: "" });

  const [login, { data, isSuccess }] = useLoginMutation();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login({ ...user })
      .unwrap()
      .then((res) => console.log(res))
      .catch((rejected) => console.error(rejected));
  };

  useEffect(() => {
    if (isSuccess) {
      dispatch(setCredentials(data));
      navigate("/account");
    }
  }, [isSuccess]);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>
        <label>
          Username:
          <input
            onChange={(e) => setUser({ ...user, username: e.target.value })}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
        </label>
        <button>Login</button>
      </form>
    </div>
  );
}

export default Login;
