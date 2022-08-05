import {ErrorMessage, Field, Form, Formik} from "formik";
import React from "react";
import {Feirante} from "../../lib/modelos";
import {withRouter, WithRouterProps} from "../../lib/withRouter";
import Cabecalho from "../tiles/cabecalho";

type _Props = { id: string | undefined };
type _State = {};
type _Params = WithRouterProps<_Props>;

class FormularioFeirante extends React.Component<_Params, _State> {
  render() {
    const {match} = this.props;
    console.log(match);
    return <Formulario id={match.params.id}/>;
  }
}

export default withRouter(FormularioFeirante);

class Formulario extends React.Component<_Props, _State> {
  render() {
    return <div>
      <Cabecalho voltar titulo="Cadastrar feirante"/>
      <Formik<Feirante>
          initialValues={{
            nome: '',
            email: '',
            contato: '',
          }}
          validate={(feirante) => {
            const errors: Record<keyof Feirante, string | undefined> = {
              nome: undefined,
              email: undefined,
              contato: undefined,
            };
            if (!feirante.nome) {
              errors.nome = 'Insira este campo';
            }
            if (!feirante.email) {
              errors.email = 'Insira este campo';
            }
            if (!feirante.contato) {
              errors.contato = 'Insira este campo';
            }
            return errors;
          }}
          onSubmit={(feirante, {setSubmitting}) => {
            alert(feirante.nome);
            setSubmitting(false);
          }}>
        {({isSubmitting}) => (
            <Form>
              <Field type="text" name="nome"/>
              <ErrorMessage name="email" component="div"/>
              <Field type="email" name="email"/>
              <ErrorMessage name="email" component="div"/>
              <Field name="contato"/>
              <button type="submit" disabled={isSubmitting}>
                Enviar
              </button>
            </Form>
        )}
      </Formik>
    </div>;
  }
}