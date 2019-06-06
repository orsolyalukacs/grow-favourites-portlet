import React from 'react';
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';

import GrowFavouritesSlide from './GrowFavouritesSlide.es';
import GrowIcon from "./GrowIcon.es";

class GrowFavouritesCarousel extends React.Component {
	
	constructor(props) {
		super(props);
		
		this.state = {
			data: this.props.data,
			isLoading: this.props.isLoading
		};
	}

	render() {
		
		const { data, isLoading } = this.state;
	
		if (isLoading) {
			
			return (
				<p>Loading ...</p>
			);
			
		} else {
			
			let i=0,index=0;
			const growFavouritesSlides = []
			
			while(i< data.length){						
				
				let dataSlide = data.filter(function(value, idx, Arr) {
					return idx >= (0 + i) && idx < (this.props.cardsPerColumn + i);
				});
				
				growFavouritesSlides.push(
					<Slide index={index} key={index}>
						<GrowFavouritesSlide
							spritemap={this.props.spritemap}
							data={dataSlide}
							slideIndex={index}
						/>
					</Slide>
				);
				
				i += this.props.cardsPerColumn;
				index++;
			}
	
			return (
		
				<CarouselProvider
					naturalSlideWidth={400}
					naturalSlideHeight={520}
					totalSlides={index}
					visibleSlides={this.props.visibleSlides}
				>
					<ButtonBack
						className={"grow-favourites-carousel-button-back"}>
						<GrowIcon
							spritemap={this.props.spritemap}
							classes="lexicon-icon inline-item"
							iconName="angle-left"
						/>
					</ButtonBack>
					<Slider>
						{growFavouritesSlides}
					</Slider>		
					<ButtonNext
						className={"grow-favourites-carousel-button-next"}>
						<GrowIcon
							spritemap={this.props.spritemap}
							classes="lexicon-icon inline-item"
							iconName="angle-right"
						/>
					</ButtonNext>
				</CarouselProvider>
		

			)
		}
	}

}

export default GrowFavouritesCarousel;