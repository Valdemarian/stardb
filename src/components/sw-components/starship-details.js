//В ЭТО МКОМПОНЕНТЕ МЫ ВЫНОСИМ В ОТДЕЛЬНЫЕ ПЕРЕМЕННЫЕ КАЖДУЮ КАРТОЧКУ.
import React from 'react';
import ItemDetails, {Record} from '../item-details/item-details';
import { withSwapiService} from '../hoc-helper/';


//СВОЙСТВО ЭЛЕМЕНТ (ВНУТРИ НЕГО CHILDREN) ИСПОЛЬЗУЕМ CONTEXT(вынесен в hoc) ВМЕСТО PROPS
const StarshipDetails = (props) => {//передаем props

	// const {getStarship, getStarshipImage} = swapiService;//достаем из props(деструктурируем)

	return(
		<ItemDetails {...props}>
	        <Record field="model" label="Model" />
	        <Record field="length" label="Length" />
	        <Record field="costInCredits" label="Cost" />
	    </ItemDetails>
	)			
};

const mapMethodsToProps = (swapiService) => {

	return {
		getData: swapiService.getStarship,
		getImageUrl: swapiService.getStarshipImage
	}
}

//StarshipDetails обернутый в HOC c <consumer /> и mapMethodsToProps(props)
export default withSwapiService(mapMethodsToProps)(StarshipDetails);