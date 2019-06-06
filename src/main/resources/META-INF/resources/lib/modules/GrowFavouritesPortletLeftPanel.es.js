import React from 'react';
import GrowIcon from "./GrowIcon.es";

class GrowFavouritesPortletLeftPanel extends React.Component {
	
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="grow-favourites-porltet-left-panel">
			
				<h1 className="my-favourites">
					My<br />Favourites
				</h1>
			
				<div className="text-secondary strong">Browse your most favourite articles</div>
			</div>
		)
	}

}

export default GrowFavouritesPortletLeftPanel;