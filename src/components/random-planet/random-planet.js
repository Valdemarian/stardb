import React, { Component } from 'react';
import SwapiService from '../../services/swapi-service';
import Spinner from '../spinner';
import ErrorIndicator from '../error-indicator';
import PropTypes from 'prop-types';

import './random-planet.css';

export default class RandomPlanet extends Component {

  swapiService = new SwapiService();//создаем экземпляр обьекта API клиента(инициализация)

  state = {
    planet: {},//создаем пустой обьект
    loading: true,// загрузка компонента
    error: false//состояние ошибки
  };
  //в конструкторе код запускается автоматически перед рендерингом
  // constructor() {
  //   super();
  // }

  componentDidMount(){
    const { updateInterval } = this.props;//время таймера заданное через defaultProps
    this.updatePlanet(); //автоматически выполняем метод в конструкторе при рендиренге страницы
    this.interval = setInterval(this.updatePlanet, updateInterval);//таймер картинок, запросы данных к api
  }

  componentWillUnmount(){//удвление ресурсов при удалении компонента
    clearInterval(this.interval)//метод удаления таймера
  }

  //метод изменения state, заргузка планеты показывает прелоадер
  onPlanetLoaded = (planet) => {
    this.setState({ 
      planet,//устанавливает новый сформировавшийся state
      loading: false })//загрузка данных в компоненте завершена, прелоудер отключен
  }

  onError = (err) => {
    this.setState({
      error: true,
      loading: false
    })
  }

  //метод загрузки данных
  updatePlanet = () => {//запросы данных к api
    const id = Math.floor(Math.random()*17) + 2;//id данных с api который 
                                                  //формируется рандомно от 2 до 25+2(27)
    this.swapiService//обращение к api-клиенту
      .getPlanet(id)//обращение к методу класса api-клиента
      .then(this.onPlanetLoaded)// вызывает метод с новым id который устанавливает state
      .catch(this.onError);// показ ошибки
  }


  render() {
    const { planet, loading, error } = this.state;

    const hasData = !(loading || error);//данные отображаются только тогда, когда нету ни загрузки ни ошибки

    const errorMessage = error ? <ErrorIndicator /> : null;//если error = true, то отображается ErrorIndicator
    const spinner = loading ? <Spinner /> : null;//если loading = true, то отображается spinner
    //содержимое компонента с данными --- <PlanetView planet={planet}/>
    const content = hasData ? <PlanetView planet={planet}/> : null;//если hasData=true,то отображается content


       //показываем спиннер загрузки
      //показываем содержание контент компонента
    return (
      <div className="random-planet jumbotron rounded">
        {spinner}
        {content}
        {errorMessage}
      </div>
    );
  }
}

  //defaultProps
  RandomPlanet.defaultProps = {
    updateInterval: 2500
  }

  //propTypes
  RandomPlanet.propTypes = {
    updateInterval: PropTypes.number
  }


//компонент с контентом
const PlanetView = ({planet}) => {//передвем массив planet в виде props
  const { id, name, population, rotationPeriod, diameter} = planet;//деструктурируем нужные нам значения 
                                                                    //сразу из planet
  return (
    <React.Fragment>
      <img className="planet-image"
            alt=" "
             src={`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`} />
        <div>
          <h4>{name}</h4>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <span className="term">Population</span>
              <span>{population}</span>
            </li>
            <li className="list-group-item">
              <span className="term">Rotation Period</span>
              <span>{rotationPeriod}</span>
            </li>
            <li className="list-group-item">
              <span className="term">Diameter</span>
              <span>{diameter}</span>
            </li>
          </ul>
        </div>
    </React.Fragment>
    );
};
