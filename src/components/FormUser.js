import React from 'react';
import { Field, reduxForm } from 'redux-form';

const validate = values => {
    const errors = {}
    if (!values.name) {
        errors.name = 'Debe ingresar un dato'
    } else if (values.name.length < 2) {
        errors.name = 'El nombre debe ser mayor a 2 caracteres'
    }
    if (!values.email) {
        errors.email = 'Debe ingresar un dato'
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Debe Ingresar un email válido'
    }
    if (!values.phone) {
        errors.phone = 'Debe ingresar un dato'
    } else if (!/^(0|[1-9][0-9]{9})$/i.test(values.phone)) {
        errors.phone = 'Debe ingresar un teléfono válido'
    }
    if (!values.age) {
        errors.age = 'Debe ingresar un dato'
    } else if (values.age < 18 || values.age > 100) {
        errors.age = 'La edad debe ser mayor a 18 años y menor a 100 años'
    }
    return errors
}

const renderField = ({ input, label, placeholder, type, meta: { touched, error, warning } }) => (
    <div className="col-75 between-data">
        <label className="text-label-input">{label}</label>
        <div className="between-input relative">
            <input {...input} placeholder={placeholder} type={type} className="input-data" />
        </div>
        {touched && ((error && <span className="text-error">{error}</span>) || (warning && <span>{warning}</span>))}
    </div>
)

let FormUser = props => {
    const { handleSubmit, status } = props;

    return (
        <form onSubmit={handleSubmit} className="style-form">
            <div className="row width-row">
                <div className="col-50">
                    <label className="text-label-welcome">Hola bienvenido sabemos que quieres viajar en un {status}. Por favor diligencia el siguiente formulario:</label>
                </div>
            </div>

            <div className="row">
                <Field name="name" component={renderField} type="text" label='Nombre' />
            </div>

            <div className="row">
                <Field name="email" component={renderField} type="text" label='Email' />
            </div>

            <div className="row">
                <Field name="phone" component={renderField} type="text" label='Teléfono' />
            </div>

            <div className="row">
                <Field name="age" component={renderField} type="text" label='Edad' />
            </div>

            <div className="row">
                <div className="col-50 aligne-btn">
                    <button type="submit" className="form_btn">Guardar</button>
                </div>
            </div>
        </form>
    )
}
FormUser = reduxForm({
    form: 'user',
    validate,
})(FormUser);

export default FormUser;