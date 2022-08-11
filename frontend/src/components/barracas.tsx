import React, {Component} from "react";
import {Barraca, TipoBarraca} from "../lib/modelos";
import CartaoBarraca from "./tiles/barraca";
import {Link} from "react-router-dom";
import DoneIcon from '@mui/icons-material/Done';
import {Button, Chip, TextField, Typography} from "@mui/material";
import container, {constantes, interfaces, Modelo} from "../lib/ioc";

type _Props = {};

type _EstadoCarregando = {
  estado: 'carregando',
}

type _EstadoCarregado = {
  estado: 'carregado',
  barracas: Modelo<Barraca>[],
  termoBusca: string,
  categorias: Set<TipoBarraca>,
}

type _Estado = _EstadoCarregando | _EstadoCarregado;

export default class ComponenteBarracas extends Component<_Props, _Estado> {
  constructor(props: _Props) {
    super(props);
    this.state = {estado: 'carregando'};
    container
        .get<interfaces.Database>(constantes.SERVICO_DATABASE)
        .barracas
        .readAll()
        .then(barracas => this.setState({
          estado: 'carregado',
          barracas,
          termoBusca: '',
          categorias: new Set(),
        }));
  }

  private filtra(estado: _EstadoCarregado): Modelo<Barraca>[] {
    let resultado = Array.from(estado.barracas);
    const termoBusca = estado.termoBusca.trim();
    if (termoBusca) {
      resultado = resultado
          .filter(barraca => barraca.dados.nome.toLowerCase().includes(termoBusca.toLowerCase()));
    }

    const categorias = estado.categorias;
    if (categorias.size) {
      resultado = resultado
          .filter(barraca => Array.from(categorias).every((tipo) => barraca.dados.tipos.includes(tipo)))
    }
    return resultado;
  }

  render() {
    const estado = this.state;
    if (estado.estado === 'carregando') {
      return <p>Carregando...</p>;
    }

    const barracasFiltradas = this.filtra(estado);
    const textoPesquisa = (() => {
      const contador = barracasFiltradas.length;
      const prefixo = contador === 0 ? 'Nenhuma' : `${contador}`;
      const sufixo = contador < 2 ? '' : 's';
      return `${prefixo} barraca${sufixo} encontrada${sufixo}`;
    })();

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
              onChange={(e) => {
                this.setState({...this.state, termoBusca: e.target.value});
              }}
          />
          <div style={{display: "flex", flexDirection: "row", padding: "0 20px"}}>
            {Object.keys(TipoBarraca)
                .filter((chave) => !isNaN(Number(TipoBarraca[chave as keyof typeof TipoBarraca])))
                .map((chave) => TipoBarraca[chave as keyof typeof TipoBarraca])
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
                  const has = estado.categorias.has(tipo);
                  return <Chip
                      style={{margin: "0 5px"}}
                      label={legenda}
                      icon={has ? <DoneIcon/> : undefined}
                      onClick={(_) => {
                        const categorias = new Set(estado.categorias);
                        if (categorias.has(tipo)) {
                          categorias.delete(tipo);
                        } else {
                          categorias.add(tipo);
                        }
                        this.setState({...this.state, categorias});
                      }}
                      variant="outlined"/>;
                })}
          </div>
          {estado.barracas.length !== barracasFiltradas.length
              ? <Typography
                  style={{margin: "0 20px"}}
                  component="div">{textoPesquisa}</Typography>
              : null}
          <div>
            {barracasFiltradas
                .map((barraca) => <CartaoBarraca id={barraca.id} barraca={barraca.dados}/>)}
          </div>
        </div>
    );
  }
}