import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Services } from '../../services/services';
import { Button, TextInput, Row } from 'react-materialize';

import ConstantsList from '../../../constants/Constants';

import { useToasts } from 'react-toast-notifications';

export const RegisterUserForm = () => {

    const { addToast } = useToasts();

    const registerSchema = Yup.object().shape({
        nombres: Yup.string().trim()
            .required('Este campo es obligatorio'),
        apellidos: Yup.string().trim()
            .required('Este campo es obligatorio'),
        correo: Yup.string().trim()
            .required('Este campo es obligatorio')
            .email('Correo electronico invalido')
            .min(5, 'Mínimo 5 caracteres'),
        clave: Yup.string()
            .required('Este campo es obligatorio')
            .matches('^(?=\\w*\\d)(?=\\w*[A-Z])(?=\\w*[a-z])\\S{8,20}$', 'La clave debe tener al entre 8 y 20 caracteres, un dígito, una letra minúscula y una letra mayúscula.')
    });

    const registerNewUser = (values) => {
        Services.newUser(values, ({ data }) => {
            // const { token } = data;
            // localStorage.setItem(ConstantsList.TOKEN_NAME, token);
            addToast('¡Usuario registrado con exito!', { appearance: 'success' });
            // window.location.href = "/alerta-enviada/activar-cuenta";
        }, (error) => {
            if (error.response) {
                const { status } = error.response;
                if (status === 409) {
                    addToast('Cuenta actualmente existente', { appearance: 'info' });
                } else if (status === 422) {
                    addToast('Valida la información, por favor', { appearance: 'warning' });
                } else if (status === 500) {
                    addToast('oh no :(, no eres tú somos nosotros, algo a ido mal', { appearance: 'error' });
                }
            } else {
                addToast('oh no :(, no eres tú somos nosotros, algo a ido mal', { appearance: 'error' });
            }
        });
    }

    const formik = useFormik({
        initialValues: {
            nombres: '',
            apellidos: '',
            correo: '',
            clave: '',
        },
        validationSchema: registerSchema,
        onSubmit: registerNewUser,
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            <Row>
                <TextInput label='Nombres:' name="nombres" id='nombres' s={12} m={6} l={6}
                    {...formik.getFieldProps('nombres')}
                    children={formik.touched.nombres && formik.errors.nombres ? (<span className="helper-text red-text">{formik.errors.nombres}</span>) : null}
                />
                <TextInput label='Apellidos:' name="apellidos" id='apellidos' s={12} m={6} l={6}
                    {...formik.getFieldProps('apellidos')}
                    children={formik.touched.apellidos && formik.errors.apellidos ? (<span className="helper-text red-text">{formik.errors.apellidos}</span>) : null}
                />
                <TextInput label='Correo:' email name="correo" id='correo' s={12} m={7} l={7}
                    {...formik.getFieldProps('correo')}
                    children={formik.touched.correo && formik.errors.correo ? (<span className="helper-text red-text">{formik.errors.correo}</span>) : null}
                />
                <TextInput label='Clave:' password name='clave' id='clave' s={12} m={5} l={5}
                    {...formik.getFieldProps('clave')}
                    children={formik.touched.clave && formik.errors.clave ? (<span className="helper-text red-text">{formik.errors.clave}</span>) : null}
                />
                <Button type='submit' className='col s12' disabled={!formik.isValid} >
                    Enviar
                </Button>
            </Row>
        </form>
    );
};