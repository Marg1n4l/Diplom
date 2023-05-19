import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Items from './components/Items';
import Categories from './components/Categories';
import ShowInfo from './components/ShowInfo';
import User from './components/User';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      allitems: [],
      currentItems: [],
      showInfo: false,
      info: {},
      orders: [],
      userItems: [],

    };
    this.state.currentItems = this.state.allitems;
    this.addToOrder = this.addToOrder.bind(this);
    this.deleteOrder = this.deleteOrder.bind(this);
    this.chooseCategory = this.chooseCategory.bind(this);
    this.onShowInfo = this.onShowInfo.bind(this);
  }

  

  componentDidMount() {
    const userBalance = localStorage.getItem('userBalance');
    if (userBalance) {
      this.setState({ userBalance: parseInt(userBalance) });
    }


    fetch("http://localhost/getitems.php")
      .then((response) => response.json())
      .then((data) => {
        const items = data.map((item) => ({
          id: item.id,
          title: item.title,
          description: item.description,
          price: item.price,
          img: item.img,
          category: item.category,
        }));
        this.setState({ allitems: items, currentItems: items, isLoading: false });
      })
      .catch((error) => console.log(error));
  }

  render() {
    const { isLoading, currentItems, showInfo, info, orders, userItems } = this.state;
    return (
      <div className="wrapper">
        <User onDelete={this.deleteOrder} orders={orders} userItems={userItems} userBalance={this.state.userBalance} />
        <Header userItems={this.state.userItems} />
        <Categories chooseCategory={this.chooseCategory} />
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <Items onShowInfo={this.onShowInfo} allitems={currentItems} onAdd={this.addToOrder} />
        )}
        {showInfo && <ShowInfo onAdd={this.addToOrder} onShowInfo={this.onShowInfo} item={info} />}
        <Footer />
      </div>
    );
  }

  onShowInfo(item) {
    this.setState({ info: item });
    this.setState({ showInfo: !this.state.showInfo });
  }

  chooseCategory(category) {
    if (category === "all") {
      this.setState({ currentItems: this.state.allitems });
      return;
    }

    this.setState({
      currentItems: this.state.allitems.filter((el) => el.category === category),
    });
  }

  deleteOrder(id) {
    this.setState({ orders: this.state.orders.filter((el) => el.id !== id) });
  }

  addToOrder(item) {
    let isInArray = false;
    this.state.orders.forEach((el) =>{
      if(el.id === item.id)
        isInArray = true
    })
    if(!isInArray)
      this.setState({orders: [...this.state.orders, item]})
  }

}

export default App;