import React from 'react';
import GrowIcon from "./GrowIcon.es";

class GrowFavouritesPortletLeftPanel extends React.Component {
	
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="grow-favourites-portlet-left-panel">
			
				<h1 className="my-favourites">
					My<br />Favourites
				</h1>
			
				{}
				<div className="text-secondary strong">{this.props.length > 0 ? 'Browse your most favourite articles' : 'Save important articles as your favourites to easily access them on the welcome page'}</div>
			</div>
		)
	}

}

export default GrowFavouritesPortletLeftPanel;