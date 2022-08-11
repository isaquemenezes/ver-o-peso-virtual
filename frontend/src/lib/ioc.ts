import 'reflect-metadata';
import {v4} from "uuid";
import {Barraca, noVerOPeso, TipoBarraca} from "./modelos";
import {Container, inject, injectable, named} from "inversify";

export type Modelo<T> = {id: string, dados: T};

export namespace constantes {
  export const SERVICO_REPOSITORIO = Symbol.for('Repositorio');
  export const SERVICO_DATABASE = Symbol.for('Database');

  export const TAG_REPOSITORIO_BARRACA = 'TAG_REPOSITORIO_BARRACAS';
}

export namespace interfaces {
  export interface Database {
    barracas: Repositorio<Barraca>;
  }

  export interface Repositorio<T> {
    create(modelo: T): Promise<void>;

    read(id: String): Promise<T | undefined>;

    readAll(): Promise<Modelo<T>[]>;

    update(id: string, modelo: T): Promise<void>;

    delete(id: String): Promise<void>;
  }
}

namespace entidades {
  import Repositorio = interfaces.Repositorio;

  @injectable()
  export class BancoDados implements interfaces.Database {
    @inject(constantes.SERVICO_REPOSITORIO)
    @named(constantes.TAG_REPOSITORIO_BARRACA)
    public barracas!: Repositorio<Barraca>;
  }

  @injectable()
  export class RepositorioBarraca implements interfaces.Repositorio<Barraca> {
    private readonly modelos: Map<string, Barraca>;

    constructor() {
      this.modelos = new Map();
      this.modelos.set('0', {
        nome: 'Barraca do Pedro',
        localizacao: noVerOPeso({numero: '84'}),
        tipos: [TipoBarraca.artesanatos],
        idFeirante: '0',
      });
      this.modelos.set('1', {
        nome: 'Boteco da Sandra',
        localizacao: noVerOPeso({numero: '27'}),
        tipos: [TipoBarraca.comidas],
        idFeirante: '0',
      });
      this.modelos.set('2', {
        nome: 'Barraca do Diego',
        tipos: [TipoBarraca.roupas],
        localizacao: noVerOPeso({numero: '10'}),
        idFeirante: '2',
      });
      this.modelos.set('3', {
        nome: 'Box da Lúcia',
        tipos: [TipoBarraca.comidas, TipoBarraca.roupas],
        localizacao: noVerOPeso({numero: '234'}),
        idFeirante: '0',
      });
    }

    async create(modelo: Barraca): Promise<void> {
      const id = v4();
      this.modelos.set(id, modelo);
    }

    async delete(id: string): Promise<void> {
      this.modelos.delete(id);
    }

    async read(id: string): Promise<Barraca | undefined> {
      return this.modelos.get(id);
    }

    async readAll(): Promise<Modelo<Barraca>[]> {
      return Array.from(this.modelos.entries())
          .map(([id, dados]) => ({id, dados}));
    }

    async update(id: string, modelo: Barraca): Promise<void> {
      this.modelos.set(id, modelo);
    }
  }
}

const container = new Container();

container
    .bind<interfaces.Repositorio<Barraca>>(constantes.SERVICO_REPOSITORIO)
    .to(entidades.RepositorioBarraca)
    .whenTargetNamed(constantes.TAG_REPOSITORIO_BARRACA);

container
    .bind<interfaces.Database>(constantes.SERVICO_DATABASE)
    .to(entidades.BancoDados);


export default container;