import React, {Component} from "react";
import {Link} from "react-router-dom";
import {Button, TextField} from "@mui/material";
import Cabecalho from './tiles/cabecalho';

type _Props = {};
type _State = {};

export default class ComponenteCadastro extends Component<_Props, _State> {
  render() {
    return <div>
      <Cabecalho voltar titulo="Entrar no sistema"/>
      <div style={{alignSelf: "center"}}>
        <TextField
            style={{display: "flex", flex: "1", margin: "10px 20px"}}
            label="E-mail"
            variant="outlined"
        />
        <TextField
            style={{display: "flex", flex: "1", margin: "10px 20px"}}
            label="Senha"
            variant="outlined"
        />
        <div style={{display: "flex", margin: "20px"}}>
          <Button
              style={{padding: "10px 30px"}}
              variant="contained">Entrar</Button>
          <div style={{display: "flex", flexGrow: 1}}/>
          <Link to="/cadastro/0">
            <Button
                style={{padding: "10px 30px"}}
                variant="outlined">Não tenho cadastro</Button>
          </Link>
        </div>
      </div>
    </div>;
  }
}