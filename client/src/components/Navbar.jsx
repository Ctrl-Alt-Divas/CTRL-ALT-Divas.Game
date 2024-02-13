import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setToken, updatePlayer } from "../app/slice";

function Navbar() {
  // token should be on the player object which is set on login
  const token = useSelector((it) => it.state?.token);

  const dispatch = useDispatch();

  // update player in state to be empty
  async function logout() {
    dispatch(updatePlayer(""));
    dispatch(setToken({ token: "" }));
  }

  return (
    <div className="bg-indigo-950 h-14 flex justify-between items-center pl-10 pr-10">
      <Link to="/">
        <div className="flex gap-2 items-center text-fuchsia-600 hover:bg-fuchsia-600 hover:text-slate-950 hover:rounded-md p-1">
          <img
            src="https://freepngtransparent.com/wp-content/uploads/2023/03/mario-png-62.png"
            width={30}
          />
          <p className="text-2xl">CTRL-ALT-DIVAS</p>
        </div>
      </Link>
      <div className="flex gap-10">
        <Link to="/" className="text-xl text-fuchsia-600 hover:text-cyan-500">
          Home
        </Link>
        <Link
          to="/gameplay"
          className="text-xl text-fuchsia-600 hover:text-cyan-500"
        >
          Game
        </Link>
        <Link
          to="/leaderboard"
          className="text-xl text-fuchsia-600 hover:text-cyan-500"
        >
          Leaderboard
        </Link>
        {!token && (
          <Link
            to="/login"
            className="text-xl text-fuchsia-600 hover:text-cyan-500"
          >
            Login
          </Link>
        )}
        {token && (
          <Link
            to="/account"
            className="text-xl text-fuchsia-600 hover:text-cyan-500"
          >
            Account
          </Link>
        )}
        {token && (
          <>
            <a
              onClick={() => logout()}
              href="/"
              className="text-xl text-fuchsia-600 hover:text-cyan-500"
            >
              Logout
            </a>
          </>
        )}
      </div>
    </div>
  );
}

export default Navbar;
