import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import store from "./store";
import GlobalStyles from "./styles/GlobalStyles";
import App from "./App";
import setupInterceptors from "./redux/services/setupInterceptors";

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

root.render(
  <Provider store={store}>
    <GlobalStyles />
    <App />
  </Provider>
);
setupInterceptors(store);
