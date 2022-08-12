import "./feirante.css";
import {ErrorMessage, Form, Field, Formik} from "formik";
import React from "react";
import {Barraca, TipoBarraca} from "../../lib/modelos";
import * as Yup from "yup";
import {withRouter, WithRouterProps} from "../../lib/withRouter";
import Cabecalho from "../tiles/cabecalho";
import {Button, Checkbox, FormControlLabel, FormGroup, Stack, TextField, Typography} from "@mui/material";
import {FieldProps} from "formik/dist/Field";
import container, {constantes, interfaces} from "../../lib/ioc";

type _Props = { id: string | undefined };
type _State = {};
type _Params = WithRouterProps<_Props>;

class FormularioFeirante extends React.Component<_Params, _State> {
  render() {
    const {match} = this.props;
    return <Formulario id={match.params.id}/>;
  }
}

export default withRouter(FormularioFeirante);

class Formulario extends React.Component<_Props, _State> {
  render() {
    return <div>
      <Cabecalho voltar titulo="Cadastrar barraca"/>
      <Formik<Barraca>
          initialValues={{
            nome: '',
            localizacao: {
              estado: 'Pará',
              cidade: 'Belém',
              bairro: '',
              logradouro: '',
              complemento: '',
              numero: '',
            },
            tipos: [],
            idFeirante: '0',
          }}
          validationSchema={Yup.object({
            nome: Yup.string().required('Insira este campo.'),
            tipos: Yup.array().min(1, 'Selecione uma categoria.'),
            localizacao: Yup.object({
              logradouro: Yup.string().required('Insira este campo.'),
              complemento: Yup.string().required('Insira este campo.'),
              numero: Yup.string().required('Insira este campo.'),
              bairro: Yup.string().required('Insira este campo.'),
              cidade: Yup.string().required('Insira este campo.'),
              estado: Yup.string().required('Insira este campo.'),
            }),
          })}
          onSubmit={(barraca, {setSubmitting}) => {
            container
                .get<interfaces.Database>(constantes.SERVICO_DATABASE)
                .barracas
                .create(barraca)
                .then(_ => {
                  setSubmitting(false);
                  alert('Barraca cadastrada com sucesso!');
                  window.history.back();
            })

          }}>
        {({isSubmitting}) => (
            <Form style={{margin: "0 30px"}}>
              <Stack spacing="20px">
                <Stack>
                  <CampoTexto chave="nome" label="Nome da barraca"/>
                </Stack>
                <Stack spacing="15px">
                  <Typography variant="h5">Endereço</Typography>
                  <CampoTexto chave="localizacao.complemento" label="Complemento"/>
                  <CampoTexto chave="localizacao.logradouro" label="Logradouro"/>
                  <CampoTexto chave="localizacao.numero" label="Número"/>
                  <CampoTexto chave="localizacao.bairro" label="Bairro"/>
                  <CampoTexto chave="localizacao.cidade" label="Cidade"/>
                  <CampoTexto chave="localizacao.estado" label="Estado"/>
                </Stack>
                <Stack>
                  <Typography variant="h5">Categorias</Typography>
                  <FormGroup>
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
                            return <FormControlLabel control={<CampoSelecao chave="tipos"/>} label={legenda}/>;
                          })}
                  </FormGroup>
                  <ErrorMessage name="tipos"/>
                </Stack>
                <Button type="submit" variant="contained">Cadastrar</Button>
              </Stack>
            </Form>
        )}
      </Formik>
    </div>;
  }
}

class CampoTexto extends React.Component<{ chave: string, label: string }, {}> {
  render() {
    return <Stack>
      <Field name={this.props.chave}>
        {({field}: FieldProps) => <TextField type="text" name={this.props.chave} label={this.props.label} defaultValue={field.value} onChange={(e) => field.onChange(e)}/>}
      </Field>
      <ErrorMessage name={this.props.chave} component="div"/>
    </Stack>;
  }
}

class CampoSelecao extends React.Component<{chave: string}, {}> {
  render() {
    return <Field name={this.props.chave}>
      {({field}: FieldProps) => <Checkbox name="tipos" checked={field.checked} onChange={(e) => field.onChange(e)}/>}
    </Field>
  }
}