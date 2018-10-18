import React, { Component } from 'react';
import { Provider } from 'unstated';

import Store from './Store';
import Layout from './Layout';

class App extends Component {
	render() {
		return (
			<Provider>
				<Layout />
			</Provider>
		);
	}
}

export default App;
