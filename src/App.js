import React, { Component } from 'react';
import styled, { keyframes } from 'styled-components';
import { Provider, Subscribe } from 'unstated';

import Store from './Store';
import Layout from './Layout';
import Loading from './components/Loading';

class App extends Component {
	render() {
		return (
			<Provider>
				<Subscribe to={[Store]}>
					{store => (store.state.isLoading ? <Loading /> : <Layout />)}
				</Subscribe>
			</Provider>
		);
	}
}

export default App;
