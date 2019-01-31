//НОС С ДАННЫМИ(принимает и обертывает в данные)
import React from 'react';
import { SwapiServiceConsumer } from '../swapi-service-context';

const withSwapiService = (mapMethodsToProps) => (Wrapped) => {

	return (props) => {
		return(
			//ОБОРАЧИВАЕМ В CONTEXT(Consumer)
			<SwapiServiceConsumer>
				{
					(swapiService) => {
						const serviceProps = mapMethodsToProps(swapiService);

						return(
							<Wrapped {...props} {...serviceProps} />
						)
					}
				}
			</SwapiServiceConsumer >
		);
	}
};

export default withSwapiService;
