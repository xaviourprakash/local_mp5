import * as React from 'react';
import Layout from './components/layout/Layout';
import {BrowserRouter} from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}

export default App;
