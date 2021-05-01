import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";
import rootReducer from "./reducers/index.js";
import rootSaga from "./saga/index";
import { createLogger } from "redux-logger";
const logger = createLogger();
const sagaMiddleware = createSagaMiddleware();
let middleware = [];
if (process.env.NODE_ENV === "development") {
  middleware = [...middleware, sagaMiddleware, logger];
} else {
  middleware = [...middleware, sagaMiddleware];
}
const store = compose(applyMiddleware(...middleware))(createStore)(rootReducer);

sagaMiddleware.run(rootSaga);

export default store;
