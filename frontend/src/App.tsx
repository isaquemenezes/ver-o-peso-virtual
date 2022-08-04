import React from 'react';
import './App.css';
import TelaBarracas from "./components/barracas";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import TelaAutenticacao from "./components/autenticacao";
import FormularioFeirante from "./components/forms/feirante";

type _Props = {};
type _State = {};

export default class App extends React.Component<_Props, _State> {
  render() {
    return <BrowserRouter>
      <Routes>
        <Route path="/" element={<TelaBarracas/>}/>
        <Route path="/login" element={<TelaAutenticacao/>}/>
        <Route path="/cadastro/:id" element={<FormularioFeirante/>}/>
      </Routes>
    </BrowserRouter>;
  }
}
