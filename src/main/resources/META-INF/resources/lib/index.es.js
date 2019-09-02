import React from "react";
import ReactDOM from "react-dom";
import axios from 'axios';
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import ReactResizeDetector from 'react-resize-detector';
import shortid from 'shortid';

import GrowFavouritesPortletLeftPanel from './modules/GrowFavouritesPortletLeftPanel.es';
import GrowFavouritesSlide from './modules/GrowFavouritesSlide.es';
import GrowIcon from "./modules/GrowIcon.es";

//ThemeDisplay data / API config / APP config -> refactor!
const SPRITEMAP = Liferay.ThemeDisplay.getPathThemeImages();
const PORTAL_URL = Liferay.ThemeDisplay.getCDNBaseURL();
const GROUP_ID = Liferay.ThemeDisplay.getCompanyGroupId();
const USER_ID = Liferay.ThemeDisplay.getUserId();

const CARDS_PER_COLUMN = 3;

const API = PORTAL_URL + "/o/favourites"; 
const GET_FAVOURITES_QUERY = API + "/getFavourites?groupId="+ GROUP_ID + "&userId=" + USER_ID;
const REMOVE_FROM_MYFAVOURITES_QUERY = API + "/removeFavourite?groupId=" + GROUP_ID + "&userId=" + USER_ID + "&assetEntryId=";
const GET_LIKED_QUERY = PORTAL_URL + "/o/grow-likes" + "/isAssetsLiked?assetEntryId=";

const RECOMMENDATION_TOGGLE_STAR_EVENT = 'recommendationtoggleStarEvent';
const FAVOURITES_TOGGLE_STAR_EVENT = 'favouritesToggleStarEvent';

class App extends React.Component {
	
	constructor(props) {
		super(props);
		
		this.state = {
			data: [],
			growFavouritesSlides: [],
			totalSlides: 1,
			isLoading: true,
			error: null,
			visibleSlides: 2
		};

		let instance = this;
		
		Liferay.on(
			RECOMMENDATION_TOGGLE_STAR_EVENT,
			function(event) {
				if(event && event.data) {
					instance.toggleStar(event.data);
				}
			}
		);

		this.setVisibleSlides = this.setVisibleSlides.bind(this);
    	this.onResize = this.onResize.bind(this);
		this.organizeSlides = this.organizeSlides.bind(this);
		this.handleStarClick = this.handleStarClick.bind(this);
		this.fireToggleStarEvent = this.fireToggleStarEvent.bind(this);
		this.toggleStar = this.toggleStar.bind(this);
	}

	setVisibleSlides(visibleSlides) {
        if (visibleSlides != this.state.visibleSlides) {
            this.setState({
                visibleSlides: visibleSlides,
                isLoading: false
            });
		}
		else {
			this.setState({isLoading: false})
		}
    }
    
    onResize(width) {
		this.setState({isLoading: true})
        if (width <= 768) {
            return this.setVisibleSlides(1);
		}
		else return this.setVisibleSlides(2);
    }

	organizeSlides() {
		let i=0,index=0;
		const growFavouritesSlides = []

		while(i< this.state.data.length){						

			let dataSlide = this.state.data.filter(function(value, idx, Arr) {
				return idx >= (0 + i) && idx < (CARDS_PER_COLUMN + i);
			});

			growFavouritesSlides.push(
				<Slide index={index} key={shortid.generate()}>
					<GrowFavouritesSlide
						spritemap={SPRITEMAP}
						portalUrl={PORTAL_URL}
						data={dataSlide}
						slideIndex={index}
						handleStarClick={this.handleStarClick}
					/>
				</Slide>
			);

			i += CARDS_PER_COLUMN;
			index++;
		}

		this.setState(prevState => ({
			growFavouritesSlides : growFavouritesSlides,
			totalSlides: index,
			isLoading: false
		}));
	}
	
	fireToggleStarEvent(data) {
		Liferay.fire(
			FAVOURITES_TOGGLE_STAR_EVENT,
			{
				data: data,
				isLoading: false
			}
		);
	}
	
	async handleStarClick(data) {
		
		if (data) {
			this.setState({ isLoading: true });
			
			await axios.delete(REMOVE_FROM_MYFAVOURITES_QUERY + data.id)
				.then(
					response => {
						let newData = this.state.data.filter(card => card.id !== data.id);
						
						this.setState({
							data: newData,
							isLoading: false
						});
						
						this.organizeSlides();
						
						this.fireToggleStarEvent(data);
					}
				)
				.catch(error => {
						this.setState({ error: error.message, isLoading: false });
						Liferay.Util.openToast(
							{
								message: error.message,
								title: Liferay.Language.get('error'),
								type: 'danger'
							}
						);
					});
		}
	}
	
	async toggleStar(data) {
		if (data) {
			this.setState({ isLoading: true });
		
			if (data.star) {
				this.setState(prevState => ({
					data: [data].concat(prevState.data),
				}));
			}
			else {
				this.setState(prevState => ({
					data: prevState.data.filter(card => card.id !== data.id),
				}));
			}
			
			await this.organizeSlides();
		}
	}
	
	async componentDidMount() {
		this.setState({ isLoading: true });

		await axios.get(GET_FAVOURITES_QUERY)
		.then(response => {
			let data = []
			response.data.map(article => {
				data.push(Object.assign({star: true}, article));
			});

			this.setState({
				data: data,
				isLoading: false
			})

			this.organizeSlides();
		})
		.catch(error => {
			this.setState({ error: error.message, isLoading: false });
			Liferay.Util.openToast(
				{
					message: error.message,
					title: Liferay.Language.get('error'),
					type: 'danger'
				}
			);
		});
	}

	render() {

		const {growFavouritesSlides, isLoading, error } = this.state;

		return (
			<div className="grow-favourites-portlet">
				<div className="container">
				  <div className="row">
					<div className="col-xl-4">
					
						<GrowFavouritesPortletLeftPanel length={this.state.growFavouritesSlides.length}/>
						
					</div>
					<div className="col-xl-8">
						<ReactResizeDetector handleWidth onResize={this.onResize} />

						{isLoading && (
							<div className="loading-indicator">
								<span aria-hidden="true" className="loading-animation"></span>
							</div>
						)}

						<CarouselProvider
							className={"grow-favourites-carousel"}
							naturalSlideWidth={400}
							naturalSlideHeight={520}
							totalSlides={this.state.totalSlides}
							visibleSlides={this.state.visibleSlides}
						>
							<ButtonBack
								className={"grow-favourites-carousel-button-back"}>
								<GrowIcon
									spritemap={SPRITEMAP}
									classes="lexicon-icon inline-item"
									iconName="angle-left"
								/>
							</ButtonBack>
							<Slider className={"grow-favourites-slider"}>
								{growFavouritesSlides}
							</Slider>		
							<ButtonNext
								className={"grow-favourites-carousel-button-next"}>
								<GrowIcon
									spritemap={SPRITEMAP}
									classes="lexicon-icon inline-item"
									iconName="angle-right"
								/>
							</ButtonNext>
						</CarouselProvider>
				
					</div>
				  </div>
				</div>
			</div>
		);
	}
}

export default function(elementId) {
	ReactDOM.render(<App />, document.getElementById(elementId));
}