import { Link } from 'react-router-dom';

function Footer() {
  const year = new Date().getFullYear();
  return (
  <>
  <div>
    <h3>Thanks for playing our game!</h3>
    <h5>Developed by Fancy, Liliana, Elizabeth and Xolani</h5>
    <p>Any suggestions or other forms of feedback?? Send an email to ctrlaltdivas@gmail.com</p>
    <p>{`Copyright © 2023-${year} videogamedatabase.com`}</p>
    <div>
          <Link to="/home" className="home-button">
            Home
          </Link>
        </div>
        <div>
          <Link to="/leaderboard" className="leaderboard-button">
            Leaderboard
          </Link>
        </div>
  </div>
  </>
  );
}

export default Footer;
