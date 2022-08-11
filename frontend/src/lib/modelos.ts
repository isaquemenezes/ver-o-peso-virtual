type Id = string;

export function noVerOPeso(props: Pick<Endereco, 'complemento' | 'numero'>): Endereco {
  return {
    logradouro: 'Blvd. Castilhos França',
    complemento: props.complemento ?? 'Mercado Ver-o-Peso',
    numero: props.numero,
    bairro: 'Campina',
    cidade: 'Belém',
    estado: 'PA',
  };
}

export type Endereco = {
  logradouro: string,
  complemento?: string | undefined,
  numero?: string | undefined,
  bairro: string,
  cidade: string,
  estado: string,
};

export type Feirante = {
  id: Id,
  nome: string,
  contato: string,
  email: string | undefined,
};

export enum TipoBarraca {
  artesanatos,
  comidas,
  roupas,
}

export type Barraca = {
  nome: string,
  tipos: TipoBarraca[],
  localizacao: Endereco,
  idFeirante: Id,
};
