import ArrowBack from "@mui/icons-material/ArrowBack";
import {Typography} from "@mui/material";
import React from "react";

type _Props = { voltar?: boolean, titulo: string };
type _State = {};

export default class Cabecalho extends React.Component<_Props, _State> {
  render() {
    return <div style={{display: "flex", margin: "20px 40px", alignItems: "center"}}>
      {this.props.voltar
          ? <ArrowBack
              style={{padding: "0 40px 0 0"}}
              onClick={(_) => window.history.back()}/>
          : null}
      <Typography variant="h3" component="div" style={{display: "flex", flexGrow: 1}}>
        {this.props.titulo}
      </Typography>
    </div>;
  }
}
