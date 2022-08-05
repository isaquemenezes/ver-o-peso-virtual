import ArrowBack from '@mui/icons-material/ArrowBack';
import React, {Component} from "react";
import {Link} from "react-router-dom";
import {Button, TextField, Typography} from "@mui/material";

type _Props = {};
type _State = {};

export default class ComponenteCadastro extends Component<_Props, _State> {
  render() {
    return <div>
      <div style={{display: "flex", margin: "20px 40px", alignItems: "center"}}>
        <ArrowBack
            style={{padding: "0 40px 0 0"}}
            onClick={(_) => window.history.back()}/>
        <Typography variant="h3" component="div" style={{display: "flex", flexGrow: 1}}>
          Entrar no sistema
        </Typography>
      </div>
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
          <Link to="/cadastro/">
            <Button
                style={{padding: "10px 30px"}}
                variant="outlined">Não tenho cadastro</Button>
          </Link>
        </div>
      </div>
    </div>;
  }
}