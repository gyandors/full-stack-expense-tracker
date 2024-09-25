import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";

import "./index.css";
import App from "./App";
import AuthContextProvider from "./contexts/AuthContext";
import store from "./store";

createRoot(document.getElementById("root")).render(
  <AuthContextProvider>
    <Provider store={store}>
      <App />
    </Provider>
  </AuthContextProvider>
);
