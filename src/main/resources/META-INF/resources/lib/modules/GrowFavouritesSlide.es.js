import React from 'react';

import GrowFavouritesCard from './GrowFavouritesCard.es';

class GrowFavouritesSlide extends React.Component {
  
	constructor(props) {
		super(props);
		
		this.state = {
			data: this.props.data
		};
	}

  render() {
	  
	const { data } = this.state; 
	  
    return (
		<div className="grow-favourites-slide">
			
			{data.map((cardData, key) => 
				<div className="row" key={"row-"+this.props.slideIndex+"-"+key}>
					<div className="col-sm" key={"col-"+this.props.slideIndex+"-"+key}>
						<GrowFavouritesCard
							key={"growfavouritescard-"+this.props.slideIndex+"-"+key}
							spritemap={this.props.spritemap}
							portalUrl={this.props.portalUrl}
							handleStarClick={this.props.handleStarClick}
							cardData={cardData}
							articleAuthor={cardData.articleAuthor}
							articleAuthorAvatar={cardData.authorAvatar}
							articleCreateDate={cardData.createDate}
							articleTitle={cardData.articleTitle}
							articleCategory={cardData.articleCategory}
							star={cardData.star}
							id={cardData.id}
						/>
					</div>
				</div>
			)}
			
		</div>
    )
  }

}

export default GrowFavouritesSlide;