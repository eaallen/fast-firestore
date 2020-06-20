import React from 'react';
import {AppContext} from './Firebase'

// this is used to enable firebase.js to be accessed from anyother Component 
export default function withFirebase(Component) {
	return function contextComponent(props) {
		return (
			<AppContext.Consumer>
				{(context) => <Component {...props} context={context} />}
			</AppContext.Consumer>
		)
	}
}