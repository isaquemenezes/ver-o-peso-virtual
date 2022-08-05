import React, {Component} from "react";
import {Barraca, noVerOPeso, TipoBarraca} from "../lib/modelos";
import CartaoBarraca from "./tiles/barraca";
import {Link} from "react-router-dom";
import {Button, TextField, Typography} from "@mui/material";

type _Props = {};
type _State = { termoBusca: string };

export default class ComponenteBarracas extends Component<_Props, _State> {
  constructor(props: _Props) {
    super(props);
    this.state = {termoBusca: ''};
  }

  render() {
    const barracas: Barraca[] = [
      {
        idFeirante: '0',
        nome: 'Barraca do Pedro',
        localizacao: noVerOPeso({numero: '84'}),
        tipos: [TipoBarraca.artesanatos],
      },
      {
        idFeirante: '0',
        nome: 'Boteco da Sandra',
        localizacao: noVerOPeso({numero: '27'}),
        tipos: [TipoBarraca.comidas],
      },
      {
        idFeirante: '0',
        nome: 'Barraca do Diego',
        localizacao: noVerOPeso({numero: '10'}),
        tipos: [TipoBarraca.roupas],
      },
      {
        idFeirante: '0',
        nome: 'Box da Lúcia',
        localizacao: noVerOPeso({numero: '234'}),
        tipos: [TipoBarraca.comidas],
      }
    ];
    return (
        <div>
          <div style={{display: "flex", margin: "20px 40px", alignItems: "center"}}>
            <Typography variant="h3" component="div" style={{display: "flex", flexGrow: 1}}>
              Ver-o-Peso Virtual
            </Typography>
            <Link to="/login">
              <Button variant="contained">Sou feirante</Button>
            </Link>
          </div>
          <TextField
              style={{display: "flex", flex: "1", margin: "10px 20px"}}
              label="Pesquisar barraca"
              variant="outlined"
              onChange={(e) => this.setState({termoBusca: e.target.value})}
          />
          <div>
            {barracas
                .filter((barraca) => barraca.nome.toLowerCase().includes(this.state.termoBusca.toLowerCase()))
                .map((barraca) => <CartaoBarraca barraca={barraca}/>)}
          </div>
        </div>
    );
  }
}