import React, { useState, useEffect } from 'react';
import LoginForm from './LoginForm';
import RegistrationForm from './RegistrationForm';
import Balance from './Balance';
import AddBalance from './AddBalance';
import Order from './Order';
import { FaShoppingCart } from "react-icons/fa";


export default function User(props) {
  const [loginOn, openLogin] = useState(false);
  const [registerOn, openRegister] = useState(false);
  const [username, setUsername] = useState('');
  const [userBalance, setUserBalance] = useState(0);
  const [balanceToAdd, setBalanceToAdd] = useState(0);
  const [showAddBalanceForm, setShowAddBalanceForm] = useState(false);
  const [userId, setUserId] = useState(null);
  let [cartOpen, setCartOpen] = useState(false);
  let { orders, userItems } = props;

  useEffect(() => {
    const savedUserId = getCookie('user_id');
    const savedUsername = localStorage.getItem('username');
    const savedBalance = localStorage.getItem('userBalance');
    
    if (savedUserId) {
      fetch(`http://localhost/getuser.php?id=${savedUserId}`)
        .then(response => response.json())
        .then(data => {
          const userBalance = parseInt(data.balance, 10);
          const username = data.name;
          setUserBalance(userBalance);
          setUsername(username);
          setUserId(savedUserId);
          localStorage.setItem('username', username);
          localStorage.setItem('userBalance', userBalance.toString());
        })
        .catch(() => {
          if (savedBalance) {
            setUserBalance(parseInt(savedBalance)); 
          }
        });
    } else if (savedUsername) {
      setUsername(savedUsername);
      if (savedBalance) {
        setUserBalance(parseInt(savedBalance)); 
      }
    }
  }, []);
  
  useEffect(() => {
    if (userBalance !== null && userId) {
      fetch(`http://localhost/updatebalance.php?id=${userId}&balance=${userBalance}`)
        .then(response => response.json())
        .then(data => {
          console.log('Balance updated:', data);
        })
        .catch(error => {
          console.error('Error updating balance:', error);
        });
      localStorage.setItem('userBalance', userBalance.toString());
    }
  }, [userBalance, userId]);
  

  const handleLoginClose = () => {
    openLogin(false);
  };

  const handleRegisterClose = () => {
    openRegister(false);
  };

  const logout = () => {
    Promise.all([
      fetch('http://localhost/exit.php'),
      setUsername(''),
      document.cookie = 'user_id=;expires=Thu, 01 Jan 1970 00:00:01 GMT;',
      localStorage.clear(),
    ]);
  };

  const handleAddBalanceFormClose = () => {
    setShowAddBalanceForm(false);
  };

  const handleBalanceInputChange = (event) => {
    setBalanceToAdd(Number(event.target.value));
  };

  const handleAddBalance = (newBalance) => {
    const updatedBalance = userBalance + newBalance;
    setUserBalance(updatedBalance);
    localStorage.setItem('userBalance', updatedBalance.toString());
    setShowAddBalanceForm(false);
  };

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

  const buyAllInCart = (summ) => { 
    if (userBalance >= summ){
      const updatedBalance = userBalance - summ;
      setUserBalance(updatedBalance);
      localStorage.setItem('userBalance', updatedBalance.toString());
      for (var i = 0; i < orders.length; i++) {
        userItems.push(orders[i]);
      }
      orders = [];
      props.orders.length = 0;
    }
    else{
      alert('Недостатньо коштів!')
    }
  };

  const showOrders = (props) => {
    let summ = 0
    props.orders.forEach(el => summ += Number.parseFloat(el.price))
    return (<div>
      {props.orders.map(el =>(
      <Order onDelete={props.onDelete} key={el.id} item={el} />
      ))}
      <p className='summ'>У кошику: {new Intl.NumberFormat().format(summ)}₴</p>
      <div className='buy-button' onClick={() => buyAllInCart(summ)}>Придбати</div>
    </div>)
  }
  
  
  
  const showNothing = () => {
    return (<div className='empty'>
      <h2>Кошик порожній</h2>
    </div>
  
    )
  }

  return (
    <div>
      {username ? (
        
      <div>

      {showAddBalanceForm ? (
            <AddBalance onClose={handleAddBalanceFormClose} onAddBalance={handleAddBalance} onBalanceChange={handleBalanceInputChange} />
      ) : (
        <ul className='user'>
          <li>Привіт, {username}!</li>
          <li className='exit' onClick={() => setShowAddBalanceForm(true)}>Ваш баланс: <Balance userBalance={userBalance}/> ₴</li>
          <li><FaShoppingCart onClick={() => setCartOpen(cartOpen = !cartOpen)} className={`shop-cart-button ${cartOpen ? 'active' : ''}`} /></li>
          <li className='exit' onClick={logout}>Вийти</li>
        </ul>
      )}
      {cartOpen && (
              <div className={`shop-cart ${cartOpen ? 'show' : ''}`}>
                {props.orders.length > 0 ?
                  showOrders(props) : showNothing()
                }
              </div>
            )}
    </div>
      ) : (
        <ul className='log'>
          <li onClick={() => openLogin(!loginOn)}>Увійти</li>
          {loginOn && <LoginForm onClose={handleLoginClose} />}
          <li onClick={() => openRegister(!registerOn)}>Зареєструватися</li>
          {registerOn && <RegistrationForm onClose={handleRegisterClose} />}
        </ul>
      )}
    </div>
  );
}

