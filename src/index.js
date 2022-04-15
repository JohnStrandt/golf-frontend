import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./store";
import GlobalStyles from "./styles/GlobalStyles";
import App from "./App";
import setupInterceptors from "./redux/services/setupInterceptors";

ReactDOM.render(
  <Provider store={store}>
    <GlobalStyles />
    <App />
  </Provider>,
  document.getElementById("root")
);
setupInterceptors(store);
