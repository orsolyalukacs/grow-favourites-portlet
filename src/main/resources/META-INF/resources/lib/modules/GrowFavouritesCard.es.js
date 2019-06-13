import React from 'react';
import GrowIcon from "./GrowIcon.es";

class GrowFavouritesCard extends React.Component {
	
	constructor(props) {
		super(props);
	
		this.state = {
			star: this.props.star
		};
		
		this._handleStarClick = this._handleStarClick.bind(this);
	}
	
	_handleStarClick() {
		this.setState(state => ({
		  star: !state.star
		}));
		
		this.props.cardData.star = !this.props.cardData.star;
			
		this.props.handleStarClick(this.props.cardData);
	}

	render() {
		return (
			<div
			  className={"grow-favourite-card card card-" + this.props.articleCategory.toLowerCase() + " mr-2 ml-2"}
			>
				<div className="card-body">
				  <div className="autofit-row autofit-padded mb-2">
					<div className="autofit-col">
					  <div className="autofit-section">
						<img className="img-fluid sticker sticker-primary sticker-xl rounded-circle"
							  src={this.props.articleAuthorAvatar} />
					  </div>
					</div>
				  
					<div className="autofit-col autofit-col-expand">
					  <div className="autofit-section text-secondary">
						<span className="grow-favourite-card-author text-truncate">{this.props.articleAuthor}</span>
						<div className="break">{this.props.articleCreateDate}</div>
					  </div>
					</div>
					<div className="autofit-section">
					  <button className="btn btn-outline-secondary btn-outline-borderless" type="button" onClick={this._handleStarClick}>
						  {this.state.star && (
							<GrowIcon
							  spritemap={this.props.spritemap}
							  classes="lexicon-icon inline-item"
							  iconName="star"
							/>
						  )}
						  {this.state.star == false && (
							<GrowIcon
							spritemap={this.props.spritemap}
							classes="lexicon-icon inline-item"
							iconName="star-o"
							/>
						  )}
					  </button>
					  <button className="btn btn-outline-secondary btn-outline-borderless" type="button">
							{(() => {
							  switch(this.props.articleCategory) {
								  case 'Excellence':
								  return <GrowIcon
									  spritemap={this.props.spritemap}
									  classes="lexicon-icon inline-item inline-item-before icon-excellence"
									  iconName="sheets"
								  />;
								  case 'Learn':
								  return <GrowIcon
									  spritemap={this.props.spritemap}
									  classes="lexicon-icon inline-item inline-item-before icon-learn"
									  iconName="info-book"
								  />;
								  case 'People':
								  return <GrowIcon
									  spritemap={this.props.spritemap}
									  classes="lexicon-icon inline-item inline-item-before icon-people"
									  iconName="user"
								  />;
								  default:
								  return <GrowIcon
									  spritemap={this.props.spritemap}
									  classes="lexicon-icon inline-item inline-item-before icon-share"
									  iconName="share"
								  />;
							  }
						  })()}
					  </button>
					</div>
				  </div>

				  <div className="autofit-row autofit-padded">
						<div className="autofit-col autofit-col-expand">
							<div className="autofit-section">
								<a href={this.props.portalUrl + "/" + this.props.articleCategory + "/" +this.props.articleTitle.split(' ').join('+').toLowerCase()}>
									<h2>{this.props.articleTitle}</h2>
								</a>
							</div>
						</div>
				  </div>
				</div>
			</div>
		)
	}

}

export default GrowFavouritesCard;