import { createStore , applyMiddleware} from 'redux'
import thunkMiddleware from 'redux-thunk';
import rootReducer from '../Reducer'

const createStoreWithMiddleware = applyMiddleware(thunkMiddleware)(createStore);//中间件

export default function configureStore(initialState) {
    const store = createStoreWithMiddleware(rootReducer, initialState)
    return store
}