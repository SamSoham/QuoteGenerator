import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { createTheme,ThemeProvider } from '@mui/material';
import { BrowserRouter } from "react-router-dom";

const theme = createTheme({
  typography:{
    fontFamily:"'Poppins', sans-serif"
  }
})

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <Provider store={store}>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
    <App />
    </BrowserRouter>
    </ThemeProvider>
    </Provider>
  </>
);
