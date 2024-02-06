import { useState, useEffect } from "react";
import { useRegisterMutation } from "../../api/divasApi";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCredentials } from "../app/slice";

function Register() {
  const [player, setPlayer] = useState({
    username: "",
    password: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [register, { data, isSuccess }] = useRegisterMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, password } = player;
    await register({
      username,
      password,
    }).unwrap();
    setPlayer({ username: "", password: "" });
  };

  useEffect(() => {
    if (isSuccess) {
      dispatch(setCredentials(data));
      navigate("/account");
    }
  }, [isSuccess]);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h2>Register</h2>
        <label>
          Username:
          <input
            value={player.username}
            onChange={(e) => setPlayer({ ...player, username: e.target.value })}
            required
          />
        </label>
        <label>
          password:
          <input
            value={player.password}
            onChange={(e) => setPlayer({ ...player, password: e.target.value })}
            required
          />
        </label>
        <button>Register</button>
      </form>
    </>
  );
}

export default Register;
