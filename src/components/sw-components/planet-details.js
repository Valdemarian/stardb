//В ЭТО МКОМПОНЕНТЕ МЫ ВЫНОСИМ В ОТДЕЛЬНЫЕ ПЕРЕМЕННЫЕ КАЖДУЮ КАРТОЧКУ.
import React from 'react';
import ItemDetails, {Record} from '../item-details/item-details';
import { withSwapiService} from '../hoc-helper/';


//СВОЙСТВО ЭЛЕМЕНТ (ВНУТРИ НЕГО CHILDREN) ИСПОЛЬЗУЕМ CONTEXT ВМЕСТО PROPS
const PlanetDetails = (props) => {//передаем props

	// const {getPlanet, getPlanetImage} = swapiService;//достаем из props(деструктурируем)

	return(
		<ItemDetails {...props}>
	        <Record field="population" label="Population" />
	        <Record field="rotationPeriod" label="Rotation Period" />
	        <Record field="diameter" label="Diameter" />
	    </ItemDetails>
	)
};

const mapMethodsToProps = (swapiService) => {
	
	return {
		getData: swapiService.getPlanet,
		getImageUrl: swapiService.getPlanetImage
	}
}

//StarshipDetails обернутый в HOC c <consumer /> и mapMethodsToProps(props)
export default withSwapiService(mapMethodsToProps)(PlanetDetails);