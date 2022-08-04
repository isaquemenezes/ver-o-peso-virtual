import React, {Component} from "react";
import {Link} from "react-router-dom";

type _Props = {};
type _State = {};

export default class ComponenteCadastro extends Component<_Props, _State> {
  render() {
    return <div className="App">
      <h1>Entrar no sistema</h1>
      <div>
        <input placeholder="E-mail"/>
        <input placeholder="Senha"/>
        <button>Entrar</button>
      </div>
      <Link to='/cadastro/0'>
        <button>Não tenho cadastro</button>
      </Link>
    </div>;
  }
}