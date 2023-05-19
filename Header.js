import React, { useState, useEffect} from 'react'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import { AiFillStar } from 'react-icons/ai'
import { AiFillPhone } from 'react-icons/ai'
import { TbCircleLetterL } from 'react-icons/tb'
import { BsTelegram } from 'react-icons/bs'
import { BsInstagram } from 'react-icons/bs'
import { BsFacebook } from 'react-icons/bs'
import FinishedOrders from './FinishedOrders'


export default function Header(props) {
  let [aboutUs, openAboutUs] = useState(false)
  let [contacts, openContacts] = useState(false)
  let [account, openAccount] = useState(false)
  let [userId, setUserId] = useState(null);
  let userItems = props.userItems;

  let username = localStorage.getItem('username');
  const phone = localStorage.getItem('phone');
  const city = localStorage.getItem('city');
  const date = localStorage.getItem('date');
  const postal = localStorage.getItem('postal');
  const role = localStorage.getItem('role');


  useEffect(() => {
    const savedUserId = getCookie('user_id');
    setUserId(savedUserId);
    if (savedUserId) {
      fetch(`http://localhost/getuser.php?id=${savedUserId}`)
        .then(response => response.json())
        .then(data => {
          localStorage.setItem('role', data.role)
          localStorage.setItem('phone', data.phone);
          localStorage.setItem('city', data.city);
          localStorage.setItem('date', data.date);
          localStorage.setItem('postal', data.postal);
        })
    }
    
  }, []);

  function getCookie(name) {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.startsWith(name + '=')) {
        return cookie.substring(name.length + 1);
      }
    }
    return null;
  }

  const showInfo = (el) => {
    if (el === "null"){
      el = "-----"
    } 
    return el;
  }

  const checkAdmin = (user) => {
    if (user === 'admin'){
      username = false;
      return true;
    } else {
      return false;
    }
  }

  const checkUser = (name, role) => {
    if (name === null){
      if (checkAdmin(role) === false){
        return true;
      }
    }
    return false;
  }    

  return (
    <header>
        <img src='./img/brain.png' className='brain'/>
        <span className='logo' onClick={() => openAboutUs(aboutUs = !aboutUs)}>МізкоГрай</span>
        <div>

            <ul className='nav'>
                <li onClick={() => openAboutUs(aboutUs = !aboutUs)}>Про нас</li>
                {aboutUs && (
                  <div className='about'>
                    <div>
                      <AiOutlineCloseCircle className='close-button' onClick = {() => openAboutUs(aboutUs = !aboutUs)} />
                      <b>Основна інформація</b> <br /> <br />
                      Цей інтернет-магазин розробив студент групи 121-19-2 <br />
                      спеціальності 121 "Інженерія програмного забезпечення" <br />
                      Національного технічного університету "Дніпровська політехніка"<br />
                      Крикля Володимир Андрійович.<br /> <br />
                      Проект було розроблено у рамках написання кваліфікаційної роботи.<br />
                      На даному етапі розробки не має за мету отримання<br />
                      комерційної вигоди. <br /> <br />
                      <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d5292.216262417401!2d35.0648301!3d48.4544548!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40dbe2d6b66f138d%3A0x98b973a9561df40f!2z0J3QsNGG0ZbQvtC90LDQu9GM0L3QuNC5INGC0LXRhdC90ZbRh9C90LjQuSDRg9C90ZbQstC10YDRgdC40YLQtdGCIMKr0JTQvdGW0L_RgNC-0LLRgdGM0LrQsCDQv9C-0LvRltGC0LXRhdC90ZbQutCwwrs!5e0!3m2!1suk!2sua!4v1683044484353!5m2!1suk!2sua" width="100%" height="450" border="0" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>                    </div>
                  </div>
                )}
                <li onClick={() => openContacts(contacts = !contacts)}>Контакти</li>
                {contacts && (
                  <div className='contacts'>
                    <div>
                      <AiOutlineCloseCircle className='close-button' onClick = {() => openContacts(contacts = !contacts)} />
                      Зв'язатися з розробником можна за наступними <u>контактами</u>:<br /> <br />

                      <b>Телефон:</b> <AiFillPhone/> <br /> <br />
                      Kyivstar <AiFillStar/> <br />
                      +380(98)-739-26-37 <br />
                      Lifecell <TbCircleLetterL/> <br />
                      +380(93)-563-90-20 <br /> <br />

                      <b>Телеграм:</b> <BsTelegram/> <br /> <br />
                      <a href="https://t.me/marg1n4l">@marg1n4l</a> <br /> <br />

                      <b>Інстаграм:</b> <BsInstagram/> <br /> <br />
                      <a href="https://www.instagram.com/_marg1n4l_">@_marg1n4l_</a> <br /> <br />

                      <b>Facebook:</b> <BsFacebook/> <br /> <br />
                      <a href="https://www.facebook.com/profile.php?id=100037813683424">Volodymyr Kryklia</a>
                      
                      
                    </div>
                  </div>
                  )}
                <li onClick={() => openAccount(account = !account)}>Особистий кабінет</li>
                {account && (
                  <div className='account'> 
                  {checkUser(username, role) && ( 
                      <div>
                      <AiOutlineCloseCircle className='close-button' onClick = {() => openAccount(account = !account)} />
                      <b>Увійдіть до аккаунту для відображення додаткової інформації.</b> 
                      </div>
                    )}  
                  {checkAdmin(role) && (
                    <div className='admin'>
                      <AiOutlineCloseCircle className='close-button' onClick = {() => openAccount(account = !account)} />
                      <b className='name'>Панель керування товарами</b> <br /> <br />
                      <div>
                        <form className='admin-item' action='http://localhost/additem.php' method='post'>

                          <b>Додавання нового товару:</b> <br /> <br />

                          <input type="text" name="title" placeholder='Назва' />

                          <br /> <br />

                          <input type="text" name="description" placeholder='Опис' />

                          <br /> <br />

                          <input type="number" name="price" placeholder='Ціна' />

                          <br /> <br />

                          <input type="text" name="img" placeholder='Фото' />

                          <br /> <br />

                          <input type="text" name="category" placeholder='Категорія' />

                          <br /> <br />

                          <input className='submit' type="submit" value="Додати" />

                        </form>
                      </div>
                      <div>
                        <form className='admin-item' action='http://localhost/deleteitem.php' method='post'>

                          <b>Видалення товару:</b> <br /> <br />

                          <input type="text" name="title" placeholder='Назва' />

                          <br /> <br />

                          <input className='submit' type="submit" value="Видалити" />

                        </form>
                      </div>
                      <div>
                        <form className='admin-item' action='http://localhost/updateitem.php' method='post'>

                        <b>Редагування товару:</b> <br /> <br />

                        <input type="text" name="ontitle" placeholder='Введіть назву товару' />

                        <br /> <br />

                        Внесіть нові дані про товар:

                        <br /> <br />

                        <input type="text" name="title" placeholder='Назва' />

                        <br /> <br />

                        <input type="text" name="description" placeholder='Опис' />

                        <br /> <br />

                        <input type="number" name="price" placeholder='Ціна' />

                        <br /> <br />

                        <input type="text" name="img" placeholder='Фото' />

                        <br /> <br />

                        <input type="text" name="category" placeholder='Категорія' />

                        <br /> <br />

                        <input className='submit' type="submit" value="Редагувати" />

                        </form>
                      </div>
                    </div>
                  )}
                    {username && (
                        <div>
                          <AiOutlineCloseCircle className='close-button' onClick = {() => openAccount(account = !account)} />
                          <b className='name'>{username}</b> <br /> <br />
                          <b>Додаткова інформація:</b> <br /> <br />
                          Телефон:<br />
                          {showInfo(phone)}
                          <br /> <br />
                          Місто:<br /> 
                          {showInfo(city)}
                          <br /> <br />
                          Пошта:<br />
                          {showInfo(postal)}
                          <br /> <br />
                          Дата народження:<br />
                          {showInfo(date)}
                          <br /> <br />
                          
                          <form className='red' action={`http://localhost/getinfo.php?userId=${getCookie('user_id')}`} method='post'>

                            <b>Доповнення інформації</b> <br /> <br />

                            <input type="text" name="phone" placeholder='Введіть номер вашого телефону' />

                            <br /> <br />

                            <input type="text" name="city" placeholder='Введіть назву вашого міста' />

                            <br /> <br />

                            <input type="text" name="postal" placeholder='Введіть ваш поштовий індекс' />

                            <br /> <br />

                            <input type="date" name="date" placeholder='Введіть дату вашого народження' />

                            <br /> <br />

                            <input className='submit' type="submit" value="Редагувати" />

                          </form>
                          <b className='youror'>Ваші покупки:</b>  
                          <FinishedOrders userItems={userItems}/>
                        </div>          
                    )}
                    
                  </div>
                  )}
            </ul>

        </div>
        <div className='presentation'></div>
    </header>
  )
}
