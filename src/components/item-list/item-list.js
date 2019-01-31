//ОТОБРАЖЕНИЕ ItemList
import React from 'react';
import './item-list.css';

const ItemList = (props) => {

    const { data, onItemSelected, children: renderLabel } = props;

    const items = data.map((item) => {//создание нового массива map принимающего на вход item 

      const {id} = item;//вытаскиваем id из item 
      const label = renderLabel(item);//передаем наш метод

      // key={id}
      // onClick={() => onItemSelected(id)}>//по клику передает id в компонент item-details
      return (
        <li className="list-group-item"
            key={id}
            onClick={() => onItemSelected(id)}>
          {label}
        </li>
      );
    });//положем в переменную - наш метод создания массива 

    //отображение li в ul
    return (
      <ul className="item-list list-group">
        {items}
      </ul>
    );
  };

  //defaultProps
  ItemList.defaultProps = {
    onItemSelected: () => {}
  }

  export default ItemList;  

// const { getAllPeople } = new SwapiService();//достаем нужные нам данные с API - клиента

// export default withData(ItemList, getAllPeople);//возвращаем(отображаем) компонент высшего плрядка(обертку) 
// //с переданными ему компонентом для отображения и данными.


