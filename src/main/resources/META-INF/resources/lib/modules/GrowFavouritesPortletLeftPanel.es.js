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
			
				{}
				<div className="text-secondary strong">{this.props.length > 0 ? 'Browse your most favourite articles' : 'In order to use this feature, save a few articles as favourite by clicking on the star button'}</div>
			</div>
		)
	}

}

export default GrowFavouritesPortletLeftPanel;