//В ЭТОМ КОМПОНЕНТУ МЫ СОБИРАЕМ КОМПОНЕНТЫ МАССИВОВ ЛЮДИ, ПЛАНЕТЫ, КОРАБЛИ, 
//В ОДИН КОМПОНЕНТ И ПОМЕЩАЕМ ИХ В ПЕРЕМЕННЫЕ 
import React from 'react';
import ItemList from '../item-list';
import { withData, withSwapiService, compose, withChildFunction } from '../hoc-helper';

// //Компонент ItemList с рендер функцией в компоненте обертке
// const ListWithChildren = widthChildFunction( ItemList, ({ name }) =><span>{name}</span> )

//рендер функция отрисовываем NAME
const renderName = ({ name }) => <span>{name}</span> ;
//рендер функция отрисовываем NAME и MODEL
const renderModelAndName = ({ model, name }) => <span>{name} ({model})</span> ;


//ДАННЫЕ PERSON
const mapPersonMethodsToProps = (swapiService) => {
  return {
    getData: swapiService.getAllPeople
  };
};
//ДАННЫЕ PLANET
const mapPlanetMethodsToProps = (swapiService) => {
  return {
    getData: swapiService.getAllPlanets
  };
};
//ДАННЫЕ STARSHIPS
const mapStarshipMethodsToProps = (swapiService) => {
  return {
    getData: swapiService.getAllStarships
  };
};

//ВАРИАНТ С ФУНКЦИЕЙ - COMPOSE
//компонент ItemList обернутый в НОС с данными mapPersonMethodsToProps
const PersonList =  compose(//функция - COMPOSE
                        withSwapiService(mapPersonMethodsToProps),//НОС с данными Person
                        withData,//НОС с логикой (отображения) для ItemList
                        withChildFunction(renderName)//НОС(обертка) принимающий renderName
                    )(ItemList);//отображение компонента ItemList (только рендеринг)

//компонент ItemList обернутый в НОС с данными mapPlanetMethodsToProps
const PlanetList =  compose(//функция - COMPOSE
                        withSwapiService(mapPlanetMethodsToProps),//НОС с данными Planet
                        withData,//НОС с логикой (отображения) для ItemList
                        withChildFunction(renderName)//НОС(обертка) принимающий renderName
                    )(ItemList);//отображение компонента ItemList (только рендеринг)

//компонент ItemList обернутый в НОС с данными mapStarshipMethodsToProps и отображающий NAME и MODEL
const StarshipList =  compose(//функция - COMPOSE
                          withSwapiService(mapStarshipMethodsToProps),//НОС с данными Starships
                          withData,//НОС с логикой (отображения) для ItemList
                          withChildFunction(renderModelAndName)//НОС(обертка) принимающий renderModelAndName
                      )(ItemList);//отображение компонента ItemList (только рендеринг)

export {
	PersonList,
	PlanetList,
	StarshipList
};



// ВАРИАНТ БЕЗ COMPOSE ФУНКЦИИ

// //компонент ListWithChildren обернутый в НОС с данными mapPersonMethodsToProps
// const PersonList = withSwapiService(mapPersonMethodsToProps)(//НАШИ ДАННЫЕ
//                       withData(//ОБЕРТКА В ОБЕРТКЕ
//                         withChildFunction(renderName)(//ОБЕРТКА В ОБЕРТКЕ
//                           ItemList)));

// //компонент ListWithChildren обернутый в НОС с данными mapPlanetMethodsToProps
// const PlanetList =  withSwapiService(mapPlanetMethodsToProps)(//НАШИ ДАННЫЕ
//                         withData(//ОБЕРТКА В ОБЕРТКЕ
//                           withChildFunction(renderName)(//ОБЕРТКА В ОБЕРТКЕ
//                             ItemList)));

// //компонент widthChildFunction обернутый в НОС с данными mapStarshipMethodsToProps и отображающий NAME и MODEL
// const StarshipList = withSwapiService(mapStarshipMethodsToProps)(//НАШИ ДАННЫЕ
//                         withData(//ОБЕРТКА В ОБЕРТКЕ
//                           withChildFunction(renderModelAndName)(//ОБЕРТКА В ОБЕРТКЕ
//                             ItemList)));