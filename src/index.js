import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './component/App';
import * as serviceWorker from './serviceWorker';
import { Provider } from "react-redux";
import { CreateStore } from "./store";
import Firebase, { FirebaseContext } from './component/Firebase';

class FirebaseInitializer extends React.Component {
    constructor(props) {
        super(props);
        this.state = { firebase: null }
    }

    componentWillMount() {
        this.setState({
            firebase: new Firebase(),
        })
    }

    render() {
        const { firebase } = this.state;
        if (firebase !== null) {
            return (
                < FirebaseContext.Provider value={firebase}>
                    <Provider store={CreateStore}>
                        <App />
                    </Provider>
                </FirebaseContext.Provider>
            )
        } else {
            return null;
        }
    }
}

export default FirebaseInitializer;

ReactDOM.render(
    <FirebaseInitializer />
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
