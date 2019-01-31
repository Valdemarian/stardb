import React from 'react';
import { PersonList, PersonDetails } from '../sw-components'
import Row from '../row'
import { withRouter } from 'react-router-dom'

const PeoplePage = ({ history, match }) => {

	const { id } = 	match.params;

	return(
		<div>
			<h1>People</h1>
			<Row
				left={<PersonList onItemSelected={(id) => history.push(id)} />} 
				right={<PersonDetails itemId={id} />}
			/>
		</div>
	)
}

export default withRouter(PeoplePage);



//БЕЗ РОУТЕРА
// import React, { Component } from 'react';
// import { PersonList, PersonDetails } from '../sw-components'
// import Row from '../row'

// export default class PeoplePage extends Component {

// 	state = {
// 		selectedItem: 20
// 	}

// 	onItemSelected = (selectedItem) => {
// 		this.setState({selectedItem})
// 	}

// 	render(){
// 		const { selectedItem } = this.state;

// 		return(
// 			<Row
// 				left={<PersonList onItemSelected={this.onItemSelected} />} 
// 				right={<PersonDetails itemId={selectedItem} />}
// 			/>
// 		)
// 	}
// }

