import {Barraca, TipoBarraca} from "../../lib/modelos";
import React, {Component} from "react";

type _Props = { barraca: Barraca };
type _State = {};

export default class CartaoBarraca extends Component<_Props, _State> {
  render() {
    const barraca: Barraca = this.props.barraca;
    return <div>
      <p>{barraca.nome}</p>
      <p>{(() => {
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
      })()}</p>
    </div>;
  }
}