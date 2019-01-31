import React, { Component } from 'react';

import ItemList from '../item-list';
import ItemDetails from '../item-details';
import ErrorIndicator from '../error-indicator';
import Row from '../row';
import ErrorBoundry from '../error-boundry';



import './people-page.css';

import SwapiService from '../../services/swapi-service';


export default class PeoplePage extends Component {

  swapiService = new SwapiService();//создаем экземпляр обьекта API клиента(инициализация)

  state = {
    selectedPerson: 4,//state показа персонажа (id)
  };


  //метод смены state на полученный id
  onPersonSelected = (selectedPerson) => {//принимаем selectedPerson id из компонента item-list
    this.setState({ selectedPerson });//меняет стейт selectedPerson на этот id (на который кликнули)
  };

  render() {

//  <ItemList onItemSelected={this.onPersonSelected} /> --- получаем id из компонента ItemList
//  <PersonDetails personId={this.state.selectedPerson} /> ---- передаем id в компонент PersonDetails

    const itemList = (//вывели в константу содержание левого блока
          <ItemList 
            onItemSelected={this.onPersonSelected} 
            getData={this.swapiService.getAllPeople}
            renderItem={({name, birthYear }) => `${name} (${birthYear})`}/>
      );

    //вывели в константу содержание правого блока, обрабатывается ошибка только в правом блоке (<ErrorBoundry>)
    const itemDetails = (
      <ErrorBoundry>
        <ItemDetails itemId={this.state.selectedPerson} />
      </ErrorBoundry>
    );
    

    return (
      <div>
        <Row left={itemList} right={itemDetails} />
      </div>

    );
  }
}


