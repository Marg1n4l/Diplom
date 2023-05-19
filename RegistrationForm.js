import React from 'react';
import { AiOutlineCloseCircle } from 'react-icons/ai';

export default function RegistrationForm(props) {
  return (
    <div className='reg'>
        <div>
            <AiOutlineCloseCircle className='close-button' onClick={props.onClose} />
            <b>Реєстрація</b> <br></br> <br></br>
            <form action='http://localhost/register.php' method='post'>

                <input type="text" name="name" minLength="2" placeholder='Введіть ваше ім`я' required/>

                <br /> <br />

                <input type="text" name="login" placeholder='Введіть ваш логін' required/>

                <br /> <br />

                <input type="password" name="password" placeholder='Введіть ваш пароль' required/>

                <br /> <br />

                <input className='submit' type="submit" value="Зареєструвати" />

            </form>
        </div>
    </div>
  );
}