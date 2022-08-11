import React from "react";
import Cabecalho from "./tiles/cabecalho";
import {withRouter, WithRouterProps} from "../lib/withRouter";

type _Props = {id: string};
type _State = {};
type _Params = WithRouterProps<_Props>;

class TelaBarraca extends React.Component<_Params, _State> {
  render() {
    const {match} = this.props;
    return <Tela id={match.params.id}/>;
  }
}
export default withRouter(TelaBarraca);


class Tela extends React.Component<_Props, _State> {
  render() {
    return <div>
      <Cabecalho voltar titulo="Ver barraca"/>
    </div>;
  }
}