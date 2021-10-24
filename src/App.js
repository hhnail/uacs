import './App.css';
import {Provider} from "react-redux";
import IndexRouter from './router/IndexRouter'
import store from './redux/store'

function App() {

    return (
        <Provider store={store}>
            <IndexRouter/>
        </Provider>
    );
}

export default App;
