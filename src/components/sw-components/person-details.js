//В ЭТО МКОМПОНЕНТЕ МЫ ВЫНОСИМ В ОТДЕЛЬНЫЕ ПЕРЕМЕННЫЕ КАЖДУЮ КАРТОЧКУ.
import React from 'react';
import ItemDetails, {Record} from '../item-details/item-details';
import { withSwapiService} from '../hoc-helper/';


//СВОЙСТВО ЭЛЕМЕНТ (ВНУТРИ НЕГО CHILDREN) ИСПОЛЬЗУЕМ CONTEXT ВМЕСТО PROPS
const PersonDetails = (props) => {//передаем props

	// const {getPerson, getPersonImage} = swapiService;//достаем из props(деструктурируем)

	return(
		<ItemDetails {...props}>
			<Record field="gender" label="Gender" />
			<Record field="eyeColor" label="Eye Color" />
			<Record field="birthYear" label="Birth Year" />
		</ItemDetails>
	)
};

const mapMethodsToProps = (swapiService) => {
	
	return {
		getData: swapiService.getPerson,
		getImageUrl: swapiService.getPersonImage
	}
}

//StarshipDetails обернутый в HOC c <consumer /> и mapMethodsToProps(props)
export default withSwapiService(mapMethodsToProps)(PersonDetails);