import React, {Component} from "react";
import {Barraca, noVerOPeso, TipoBarraca} from "../lib/modelos";
import CartaoBarraca from "./tiles/barraca";
import {Link, Navigate} from "react-router-dom";
import DoneIcon from '@mui/icons-material/Done';
import {Button, Chip, TextField, Typography} from "@mui/material";

type _Props = {};
type _State = { idBarraca: string | undefined, termoBusca: string, categorias: Set<TipoBarraca> };

export default class ComponenteBarracas extends Component<_Props, _State> {
  constructor(props: _Props) {
    super(props);
    this.state = {idBarraca: undefined, termoBusca: '', categorias: new Set()};
  }

  private filtra(estado: _State, barracas: Barraca[]): Barraca[] {
    let resultado = Array.from(barracas);
    const termoBusca = estado.termoBusca.trim();
    if (termoBusca) {
      resultado = resultado
          .filter(barraca => barraca.nome.toLowerCase().includes(termoBusca.toLowerCase()));
    }

    const categorias = estado.categorias;
    if (categorias.size) {
      resultado = resultado
          .filter(barraca => Array.from(categorias).every((tipo) => barraca.tipos.includes(tipo)))
    }
    return resultado;
  }

  render() {
    const barracas: Barraca[] = [
      {
        id: '0',
        idFeirante: '0',
        nome: 'Barraca do Pedro',
        localizacao: noVerOPeso({numero: '84'}),
        tipos: [TipoBarraca.artesanatos],
      },
      {
        id: '1',
        idFeirante: '0',
        nome: 'Boteco da Sandra',
        localizacao: noVerOPeso({numero: '27'}),
        tipos: [TipoBarraca.comidas],
      },
      {
        id: '2',
        idFeirante: '0',
        nome: 'Barraca do Diego',
        localizacao: noVerOPeso({numero: '10'}),
        tipos: [TipoBarraca.roupas],
      },
      {
        id: '3',
        idFeirante: '0',
        nome: 'Box da Lúcia',
        localizacao: noVerOPeso({numero: '234'}),
        tipos: [TipoBarraca.comidas, TipoBarraca.roupas],
      }
    ];
    if (this.state.idBarraca) {
      return <Navigate to={`/barraca/${this.state.idBarraca}`} />;
    }

    const barracasFiltradas = this.filtra(this.state, barracas);
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
                  const has = this.state.categorias.has(tipo);
                  return <Chip
                      style={{margin: "0 5px"}}
                      label={legenda}
                      icon={has ? <DoneIcon/> : undefined}
                      onClick={(_) => {
                        const categorias = new Set(this.state.categorias);
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
          {barracas.length != barracasFiltradas.length
              ? <Typography
                  style={{margin: "0 20px"}}
                  component="div">{textoPesquisa}</Typography>
              : null}
          <div>
            {barracasFiltradas
                .map((barraca) => <CartaoBarraca
                    barraca={barraca}
                    aoVer={() => this.setState({...this.state, idBarraca: barraca.id})}
                />)}
          </div>
        </div>
    );
  }
}