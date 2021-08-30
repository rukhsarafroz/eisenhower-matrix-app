import React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import EisenMatrix from "./containers/EisenMatrix";
import { persistor, store } from "./store";
import { SnackbarProvider } from "notistack";

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SnackbarProvider maxSnack={3}>
         <EisenMatrix/>
        </SnackbarProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;