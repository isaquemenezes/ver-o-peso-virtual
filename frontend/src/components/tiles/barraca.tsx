import {Barraca, TipoBarraca} from "../../lib/modelos";
import React, {Component} from "react";
import {Typography, Card, CardContent, CardActions, Button} from '@mui/material';

type _Props = { barraca: Barraca };
type _State = {};

export default class CartaoBarraca extends Component<_Props, _State> {
  render() {
    const barraca: Barraca = this.props.barraca;
    return <Card sx={{ minWidth: 275 }}>
      <CardContent style={{textAlign: "left"}}>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Barraca
        </Typography>
        <Typography variant="h5" component="div">
          {barraca.nome}
        </Typography>
        <Typography variant="body2">{(() => {
          const labels = barraca.tipos.map((tipo) => {
            switch (tipo) {
              case TipoBarraca.artesanatos:
                return 'artesanatos';
              case TipoBarraca.comidas:
                return 'comidas';
              case TipoBarraca.roupas:
                return 'roupas';
            }
          });
          return <p>Inclui {labels.join(', ')}</p>;
        })()}</Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Ver barraca</Button>
      </CardActions>
    </Card>;
  }
}