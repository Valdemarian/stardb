// import React from 'react';
// import { PlanetList } from '../sw-components';
// import { withRouter } from 'react-router-dom'

// const PlanetPage = ({ history }) => {

// 	return(
// 		<PlanetList onItemSelected={(id) => { history.push(id) }} />
// 	)
// }

// export default withRouter(PlanetPage);


// БЕЗ РОУТЕРА
import React, { Component } from 'react';
import { PlanetList, PlanetDetails } from '../sw-components'
import Row from '../row'

export default class PlanetsPage extends Component {

	state = {
		selectedItem: 2
	}

	onItemSelected = (selectedItem) => {
		this.setState({selectedItem})
	}

	render(){
		const { selectedItem } = this.state;

		return(
			<div>
				<h1>Planets</h1>
				<Row
					left={<PlanetList onItemSelected={this.onItemSelected} />} 
					right={<PlanetDetails itemId={selectedItem} />}
				/>
			</div>
		)
	}
}