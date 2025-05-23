import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import { persistor, store } from "./redux/store";

import "./index.css";
import { PersistGate } from "redux-persist/integration/react";
import Preloader from "./components/Preloader";
import { ProductsProvider } from "./providers/ProductProvider";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <ProductsProvider>
      <Provider store={store}>
        <PersistGate loading={<Preloader />} persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    </ProductsProvider>
  </React.StrictMode>
);
