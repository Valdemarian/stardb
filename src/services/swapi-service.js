//класс api-клиента
 export default class SwapiService{

	_apiBase = 'https://swapi.co/api/';

//---------------ЗАПРОС ДАННЫХ С API-------------------------------------------------------

	getResource = async(url) => {//метод обращения к api c нужным нам url в аргументе
		const res = await fetch(`${this._apiBase}${url}`);//запрос НУЖНЫХ ДАННЫХ 
										//от fetch api к нашему api серверу с динамично меняющимся url

		//обработка ошибки отсутствия доступа
		if(!res.ok) {
			throw new Error(`could not fetch ${url}, received ${res.status}`);
		}

		return await res.json();// возврат НУЖНЫХ НАМ ДАННЫХ в формате json.
	}


//---------------ПОЛУЧЕНИЕ ДАННЫХ-------------------------------------------------------

	// запрос всего массива
	getArrayPeople = async() => {
		const elem = await this.getResource(`people/2/`);//превращаем в переменную
		return elem.results
			// .map(this._transformPerson)//создаем новую коллекцию map массив людей
			// .slice(0, 5);//показ элементов с 0 до 5
	}

	getPersonName = async(id) => {
		const person = await this.getResource(`people/${id}/`);//превращаем в переменную
		return this._transformPersonName(person);//трансформируем данные нужной нам переменной
	}


	//запрос всего массива(люди 10 штук)
	getAllPeople = async() => {
		const res = await this.getResource(`people/`);//превращаем в переменную
		return res.results
			.map(this._transformPerson)//создаем новую коллекцию map массив людей
			// .slice(0, 5);//показ элементов с 0 до 5
	}
	//запрос по id отдного элемента массива(человек)
	getPerson = async(id) => {
		const person = await this.getResource(`people/${id}/`);//превращаем в переменную
		return this._transformPerson(person);//трансформируем данные нужной нам переменной
	}
	//картинка людей
	getPersonImage = ({id}) => {
		return `https://starwars-visualguide.com/assets/img/characters/${id}.jpg`
	}
	


	//запрос всего массива(планеты)
	getAllPlanets = async() => {
		const res = await this.getResource(`planets/`);//превращаем в переменную
		return res.results
			.map(this._transformPlanet)//создаем новую коллекцию map массив планет
			// .slice(0, 5);//показ элементов с 0 до 5
	}
	//запрос по id отдного элемента массива(планета)
	getPlanet = async(id) => {
		const planet = await this.getResource(`planets/${id}/`);//превращаем в переменную
		return this._transformPlanet(planet);//трансформируем данные нужной нам переменной
	}
	//картинка Planet
	getPlanetImage = ({id}) => {
		return `https://starwars-visualguide.com/assets/img/planets/${id}.jpg`
	}



	//запрос всего массива(корабли)
	getAllStarships = async() => {
		const res = await this.getResource(`starships/`);//превращаем в переменную
		return res.results
			.map(this._transformStarship)//создаем новую коллекцию map массив кораблей
			// .slice(0, 5);//показ элементов с 0 до 5
	}
	//запрос по id отдного элемента массива(корабль)
	getStarship = async(id) => {
		const starship = await this.getResource(`starships/${id}/`);//превращаем в переменную
		return this._transformStarship(starship);//трансформируем данные нужной нам переменной
	}
	//картинка Starship
	getStarshipImage = ({id}) => {
		return `https://starwars-visualguide.com/assets/img/starships/${id}.jpg`
	}

//---------------СОЗДАНИЕ ID-------------------------------------------------------

	//формула создания id для нужных групп данных (planet, starships, people)
	_extractId = (item) => {
		const idRegExp = /\/([0-9]*)\/$/;//регулярное выражение с сайта https://regex101.com/
		return item.url.match(idRegExp)[1];//match(idRegExp)[1]----вставка регулярного выражения
	}


//---------------ТРАНСФОРМАЦИЯ ДАННЫХ-------------------------------------------------------



	//трансформируем данные сразу в API клиенте планеты
	_transformPlanet = (planet) => {//стрелочная функция позволяет не терять коктекст this

		return {
		  id: this._extractId(planet),
          name: planet.name, 
          population: planet.population,
          rotationPeriod: planet.rotation_period,
          diameter: planet.diameter
        }
	}

	//трансформируем данные сразу в API клиенте люди 
	_transformPersonName = (person) => {//стрелочная функция позволяет не терять коктекст this

		return {
	      id: this._extractId(person),
	      name: person.name,
	    }
	}

	//трансформируем данные сразу в API клиенте люди 
	_transformPerson = (person) => {//стрелочная функция позволяет не терять коктекст this

		return {
	      id: this._extractId(person),
	      name: person.name,
	      gender: person.gender,
	      birthYear: person.birth_year,
	      eyeColor: person.eye_color
	    }
	}

	//трансформируем данные сразу в API клиенте корабли
	_transformStarship = (starship) => { //стрелочная функция позволяет не терять коктекст this

		return {
	      id: this._extractId(starship),
	      name: starship.name,
	      model: starship.model,
	      manufacturer: starship.manufacturer,
	      costInCredits: starship.cost_in_credits,
	      length: starship.length,
	      crew: starship.crew,
	      passengers: starship.passengers,
	      cargoCapacity: starship.cargo_capacity
	    }
	}
}



// const swapi = new SwapiService();//создаем экземпляр класса

// swapi.getAllPeople().then((person) => {

// 		console.log(person);// вывод массива

// });

// const arr = [
// 	swapi.getPersonName(3).then((p) => {
// 		return p.name; //вывод конкретного элемента
// 	}),
// 	swapi.getPersonName(4).then((p) => {
// 		return p.name; //вывод конкретного элемента
// 	}),
// 	swapi.getPersonName(5).then((p) => {
// 		return p.name; //вывод конкретного элемента
// 	}),
// 	swapi.getPersonName(6).then((p) => {
// 		return p.name; //вывод конкретного элемента
// 	}),
// 	swapi.getPersonName(7).then((p) => {
// 		return p.name; //вывод конкретного элемента
// 	})
// ]

// console.log(arr)



