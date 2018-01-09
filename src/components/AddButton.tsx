import * as React from 'react';

let ButtonImage = require('../images/AddButton.svg');

export interface AddButtonProps {
	onClick?: ()=>void;
}

export class AddButton extends React.Component<AddButtonProps,{}> {
	render() {
		return (
			<button onClick={this.props.onClick} className="add-button">	
				<img src={ButtonImage}/>								
			</button>
		);
	}
}