import React, { Component } from 'react';

import Header from '../header';
import RandomPlanet from '../random-planet';
import ErrorIndicator from '../error-indicator';
import ErrorBoundry from '../error-boundry';
import { PeoplePage, PlanetsPage, StarshipsPage, LoginPage, SecretPage } from '../pages';
import { PersonDetails, PlanetDetails, StarshipDetails } from '../sw-components'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import './app.css';

import SwapiService from '../../services/swapi-service';
import DummySwapiService from '../../services/dummy-swapi-service';

import {SwapiServiceProvider} from '../swapi-service-context/'

export default class App extends Component {

  state = {
    showRandomPlanet: true,//показ скрытие компонента рандомная планета
    hasError: false,//ошибка
    swapiService: new SwapiService(),//создаем экземпляр обьекта API клиента(инициализация)
  // swapiService = new DummySwapiService();//создаем экземпляр обьекта API клиента(инициализация) ТЕСТ
    isLoggedIn: false
  };


  onLogin = () => {
    this.setState({
      isLoggedIn: true
    });
  };

  onServiceChange = () => {//метод смены API
   this.setState(({ swapiService }) => {//принимаем предыдущий state
    //если Service = SwapiService то меняем его на DummySwapiService и на оборот
      const Service = swapiService instanceof SwapiService ? DummySwapiService : SwapiService;

      return {
        swapiService: new Service()//возвращаем обновленный Service в state
      }
   })
  }

  toggleRandomPlanet = () => {//показ скрытие компонента рандомная планета
    this.setState((state) => {
      return {
        showRandomPlanet: !state.showRandomPlanet//меняем значение на противоположное
      }
    });
  };

  componentDidCatch() {
    this.setState({ hasError: true });//обработка ошибки
  }


  render() {

    const { isLoggedIn } = this.state;

    // const {
    //   getPerson, 
    //   getStarship, 
    //   getStarshipImage, 
    //   getPersonImage} = this.state.swapiService

    if (this.state.hasError) {//если есть ошибка то показываем компонент ОШИБКА
      return <ErrorIndicator />;
    }

    const planet = this.state.showRandomPlanet ? <RandomPlanet/> : null;


    //getData={this.swapiService.getAllPlanets}-------------ПОЛУЧЕНИЕ ДАННЫХ
    //renderItem={(item) => item.name} />-----------------ОТРИСОВКА ДАННЫХ
    //onItemSelected={() => {}} -----------ПЕРЕДАЧА ФУНКЦИИ В КОМПОНЕНТ КАК PROPS
    //Доводим отображение каждого компонета всего до ОДНОЙ переменной
    return (
      <div className="container">
        <ErrorBoundry>
          <SwapiServiceProvider value={this.state.swapiService}>
            <Router>
              <div className="stardb-app">
                <Header onServiceChange={this.onServiceChange} toggleRandomPlanet={this.toggleRandomPlanet}/>
                  {planet}

                <Switch>
                  <Route path="/" render={() => <h1>Welcome to StarDB</h1>} exact />

                  <Route path="/people/:id?" component={PeoplePage} exact />

                  <Route path="/planets" component={PlanetsPage} exact />

                  <Route path="/starships" component={StarshipsPage} exact />
                  <Route path="/starships/:id" 
                         render={({ match}) => {
                            const { id } = match.params;
                            return <StarshipDetails itemId={id} />
                         }} />

                  <Route path="/login"
                         render={() => (
                          <LoginPage isLoggedIn={isLoggedIn} 
                                     onLogin={this.onLogin}/> 
                         )} />

                  <Route path="/secret"
                         render={() => (
                          <SecretPage isLoggedIn={isLoggedIn} /> 
                         )} />

                  <Route render={() => <h1>Page not found</h1> }/>
                </Switch>
              </div>
            </Router>
          </SwapiServiceProvider>
        </ErrorBoundry>
      </div>
    );
  }
}













































 // return (
 //      <div className="container">
 //        <div className="stardb-app">
 //          <Header />
 //          { planet }

 //          <br/>

 //          <div>
 //            <button
 //              className="toggle-planet btn btn-warning btn-lg"
 //              onClick={this.toggleRandomPlanet}>
 //              Toggle Random Planet
 //            </button>
 //          </div>

 //          <br/>

 //          <Row 
 //            left={personDetails}
 //            right={starshipDetails} />

 //          <br/>

 //          <ItemList />
 //        </div>
 //      </div>
 //    );