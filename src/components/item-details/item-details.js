import React, { Component } from 'react';

import Spinner from '../spinner';
import ErrorButton from "../error-button";


import './item-details.css';


export default class ItemDetails extends Component {

  // swapiService = new SwapiService();//создаем экземпляр обьекта API клиента(инициализация)

  state = {
    item: null,// персонаж
    loading: false,//спиннер
    image: null//картинка
  }

  componentDidMount(){
    this.updateItem()//загружаем стартового персонажа в начале работы омпонента, тут он null, 
    //                                                      а в people-page он selectedPerson: 4
  }

  componentDidUpdate(prevProps) {//равниваем если предыдущие props с новым props
    if (this.props.itemId !== prevProps.itemId ||//itemId поменялся
        this.props.getData !== prevProps.getData ||//getData(api) поменялся
        this.props.getImageUrl !== prevProps.getImageUrl) {// картинка поменялась
      this.updateItem();// и если старый props отличается от нового props, то делаем обновление state
    }
  }




  updateItem() {// метод обновления state персонажа
    this.startLoading();//включаем спиннер
    const { itemId, getData, getImageUrl } = this.props;//достаем из props otemId(item: null) и массив данных
    if (!itemId) {// если itemId это null, то мы не будем ничего обновлять
      return;
    }

    getData(itemId)//получить конкретного персонажа по id из массива
      .then((item) => {//наш state prson  в арргументе
        this.setState({ 
          item, //меняем стейт на id этого персонажа(then автоматически меняет id в utem)
          loading: false,//выключаем спиннер
          image: getImageUrl(item)
          });// устанавливает картинку url с номером item
      });
  }

  startLoading = () => {//метод включения спиннера
    this.setState({loading: true})
  }

  

  render() {

    const { item, image } = this.state;//деструктурируем state для работы

    if (!item) {
      return <h1>STAR WARS</h1>;// спиннер загружается в самом начале до инициализации компонента
    };


    const { name } = item;

    return (
      <div className="item-details card">
        <img className="item-image"
          src={image}
          alt="item"/>

        <div className="card-body">
          <h4>{name}</h4>
          <ul className="list-group list-group-flush">
            {
              React.Children.map(this.props.children, (child) => {
                return React.cloneElement(child, { item });
              })
            }
          </ul>
          <ErrorButton />
        </div>
      </div>
    );
  }
}


const Record = ({ item, field, label }) => {
  return (
      <li className="list-group-item">
        <span className="term">{label}</span>
        <span>{item[field]}</span>
      </li>
  )
};

// нельзя делать 2 дефолтных экспорта в одном файле, по этому делаем именной экспорт
export {
  Record
};


    
    // const hasData = !(loading);//данные отображаются только тогда, когда нету загрузки 
    // const spinner = loading ? <Spinner /> : null;//если loading = true, то отображается spinner
    // const content = hasData ? <ItemView item={item} image={image} children={this.props.children}/> : null;//если hasData=true,то отображается content


    // return (
    //   <div className="person-details card">
    //     {spinner}
    //     {content}
    //   </div>
    // )
    

// //компонент с контентом
// const ItemView = ({item, image, children}) => {//передвем массив person в виде props
//   const { id, name, gender,
//             birthYear, eyeColor } = item;//деструктурируем нужные значения из state массива person
//   return (
//     <React.Fragment>
//       <img className="person-image"
//           alt=" "
//           src={image} />

//         <div className="card-body">
//           <h4>{name}</h4>
//           <ul className="list-group list-group-flush">
//             {
//               React.Children.map(this.props.children, (child) => {
//                 return React.cloneElement(child, { item });
//               })
//             }
//           </ul>
//           <ErrorButton />
//         </div>
//     </React.Fragment>
//     );
// };