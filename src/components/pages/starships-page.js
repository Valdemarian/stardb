import React from 'react';
import { StarshipList } from '../sw-components';
import { withRouter } from 'react-router-dom'

const StarshipPage = ({ history }) => {

	return(
		<div>
			<h1>Starships</h1>
			<StarshipList onItemSelected={(id) => { history.push(id) }} />
		</div>
	)
}

export default withRouter(StarshipPage);


//БЕЗ РОУТЕРА
// import React, { Component } from 'react';
// import { StarshipList, StarshipDetails } from '../sw-components'
// import Row from '../row'

// export default class StarshipPage extends Component {

// 	state = {
// 		selectedItem: 5
// 	}

// 	onItemSelected = (selectedItem) => {
// 		this.setState({selectedItem})
// 	}

// 	render(){
// 		const { selectedItem } = this.state;

// 		return(
// 			<Row
// 				left={<StarshipList onItemSelected={this.onItemSelected} />} 
// 				right={<StarshipDetails itemId={selectedItem} />}
// 			/>
// 		)
// 	}
// }