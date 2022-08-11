import React from "react";
import Cabecalho from "./tiles/cabecalho";
import {withRouter, WithRouterProps} from "../lib/withRouter";
import {Barraca, TipoBarraca} from "../lib/modelos";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import container, {constantes, interfaces} from "../lib/ioc";
import {Divider, Rating, Stack, Typography} from "@mui/material";

type _Props = { id: string };

type _EstadoCarregando = { estado: 'carregando' };
type _EstadoCarregado = { estado: 'carregado', barraca: Barraca }
type _Estado = _EstadoCarregando | _EstadoCarregado;

type _Params = WithRouterProps<_Props>;

class TelaBarraca extends React.Component<_Params, _Estado> {
  render() {
    const {match} = this.props;
    return <Tela id={match.params.id}/>;
  }
}

export default withRouter(TelaBarraca);


class Tela extends React.Component<_Props, _Estado> {
  constructor(props: _Props) {
    super(props);
    this.state = {estado: 'carregando'};
    container
        .get<interfaces.Database>(constantes.SERVICO_DATABASE)
        .barracas
        .read(props.id)
        .then(barraca => this.setState({estado: 'carregado', barraca: barraca}));
  }

  render() {
    const estado = this.state;
    if (estado.estado === 'carregando') {
      return <p>Carregando...</p>;
    }
    const legendaLocal = `${estado.barraca.localizacao.cidade}, ${estado.barraca.localizacao.estado}`;
    return <div>
      <Cabecalho voltar titulo="Ver barraca"/>
      <div style={{display: 'flex', flexDirection: 'row', margin: '0 20px'}}>
        <Stack style={{flex: 3}} spacing="30px">
          <Stack>
            <Typography variant="h5">Endereço</Typography>
            <Typography variant="h6">{estado.barraca.localizacao.complemento}</Typography>
            <Typography variant="subtitle1">{estado.barraca.localizacao.logradouro}</Typography>
            <Typography variant="subtitle1">{estado.barraca.localizacao.numero}</Typography>
            <Typography variant="subtitle1">{estado.barraca.localizacao.bairro}</Typography>
          </Stack>
          <Stack>
            <Typography variant="h5">Categorias</Typography>
            {estado.barraca.tipos
                .map((tipo) => {
                  const legenda: string = (() => {
                    switch (tipo) {
                      case TipoBarraca.roupas:
                        return 'Roupas';
                      case TipoBarraca.artesanatos:
                        return 'Artesanatos';
                      case TipoBarraca.comidas:
                        return 'Comidas';
                    }
                  })();
                  return <Typography variant="subtitle1">{legenda}</Typography>;
                })}
          </Stack>
        </Stack>
        <Divider style={{margin: '0 50px'}} orientation="vertical" flexItem/>
        <Stack style={{flex: 7}} spacing="10px">
          <Stack direction="row">
            <Typography style={{flex: 4}} variant="h5">{estado.barraca.nome}</Typography>
            <Stack direction="row">
              <LocationOnIcon/>
              <Typography style={{margin: "0 10px", flex: 6}} variant="subtitle1">{legendaLocal}</Typography>
            </Stack>
          </Stack>
          <Stack>
            <Typography component="legend">Avaliações</Typography>
            <Rating name="read-only" value={Math.random() * 5} readOnly />
          </Stack>
        </Stack>

      </div>
    </div>;
  }
}