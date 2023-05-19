import React, { useState }  from 'react'
import { AiOutlineCloseCircle } from 'react-icons/ai';

export default function AddBalance(props) {

    const [balanceToAdd, setBalanceToAdd] = useState('');

    const handleInputChange = (event) => {
        setBalanceToAdd(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const newBalance = parseInt(balanceToAdd);
        if (!newBalance || newBalance <= 0 || newBalance > 10000) {
          alert('Введіть коректну суму для поповнення!');
          return;
        }
        props.onAddBalance(newBalance);
        setBalanceToAdd('');
      };

    

  return (
    <div className='balance'>
      <div>
        <AiOutlineCloseCircle className='close-button' onClick={props.onClose} />
        <b>Бажаєте поповнити баланс?</b> <br /><br />
        <form onSubmit={handleSubmit}>
          <label>
            Введіть суму (від 1 до 10 000 грн): <br /><br />
            <input type='number' min='1' max='10000' value={balanceToAdd} onChange={handleInputChange}/> 
          </label> <br /><br />
          <button type='submit'>Поповнити</button>
        </form>
      </div>
    </div>
  )
}
