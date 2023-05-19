import React from 'react';
import { AiOutlineCloseCircle } from 'react-icons/ai';

export default function LoginForm(props) {
  return (
    <div className='login'>
      <div>
        <AiOutlineCloseCircle className='close-button' onClick={props.onClose} />
        <b>Авторизація</b> <br /><br />
        <form action='http://localhost/login.php' method='post'>

          <input type="text" name="login" placeholder='Введіть ваш логін' required/>

          <br /> <br />

          <input type="password" name="password" placeholder='Введіть ваш пароль' required/>

          <br /> <br />

          <input className='submit' type="submit" value="Авторизуватися" />

        </form>
      </div>
    </div>
  );
}