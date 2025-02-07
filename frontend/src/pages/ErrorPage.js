import { Link, useNavigate } from 'react-router-dom';
import logo from '../images/logos/Logo-Error.svg';

import '../styles/HomePage.css';

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div className="error-page-bg">
      <div className='error-content'>
        <img className="error-logo" src={logo} alt=""/>
        <h1 className='error-title'>Oh No! That URL Does not Exist!</h1>
        <Link className="error-link" path="/home">Would you like to return to home?</Link>
      </div>
    </div>
  )
}

export default {ErrorPage};