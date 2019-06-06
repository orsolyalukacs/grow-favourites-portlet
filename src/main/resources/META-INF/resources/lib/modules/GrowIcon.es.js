import React from "react";


class GrowIcon extends React.Component {
    constructor(props) {
		super(props);
    }
    render() {
       
        return (
            <svg
            className={this.props.classes  + " lexicon-icon-" + this.props.iconName}
            focusable="false"
            role="presentation"
            >
                <use xlinkHref={this.props.spritemap + "/clay/icons.svg#" + this.props.iconName} />
            </svg>
        );
    }
}

export default GrowIcon