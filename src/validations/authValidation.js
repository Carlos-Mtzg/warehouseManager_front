import * as Yup from "yup";

const REQUIRED_FIELDS = 'Este campo es obligatorio';
const NO_SPACES = 'Este campo no puede contener solo espacios';
const INVALID_EMAIL = 'El correo electrónico no es válido';
const WORLDS_NOT_ALLOWED = 'El campo contiene palabras no permitidas';
const CHARACTERS_NOT_ALLOWED = "Este campo no puede contener los caracteres '<' o '>'";

export const loginValidationSchema = Yup.object({
    email: Yup.string()
        .email(INVALID_EMAIL)
        .required(REQUIRED_FIELDS)
        .matches(
            /^[^<>]*$/,
            CHARACTERS_NOT_ALLOWED
        )
        .notOneOf(['Script', 'script'], WORLDS_NOT_ALLOWED)
        .trim(NO_SPACES),
    password: Yup.string()
        .required(REQUIRED_FIELDS)
        .matches(
            /^[^<>]*$/, CHARACTERS_NOT_ALLOWED
        )
        .notOneOf(['Script', 'script'], WORLDS_NOT_ALLOWED)
        .trim(NO_SPACES),
});


export const forgotPasswordSchema = Yup.object({
    email: Yup.string()
        .email(INVALID_EMAIL)
        .required(REQUIRED_FIELDS)
        .matches(
            /^[^<>]*$/, CHARACTERS_NOT_ALLOWED
        )
        .notOneOf(['Script', 'script'], WORLDS_NOT_ALLOWED)
        .trim(NO_SPACES),
});

export const passwordSchema = Yup.object({
    password: Yup.string()
        .required(REQUIRED_FIELDS)
        .matches(
            /^[^\u3164\u200B\uFEFF]*$/,
            'Este campo no puede contener caracteres invisibles'
        )
        .min(8, 'La contraseña debe tener al menos 8 caracteres')
        .matches(
            /[A-Z]/,
            'La contraseña debe contener al menos una letra mayúscula'
        )
        .matches(
            /[a-z]/,
            'La contraseña debe contener al menos una letra minúscula'
        )
        .matches(
            /^[^<>]*$/,
            CHARACTERS_NOT_ALLOWED
        )
        .matches(
            /[\W_]/,
            'La contraseña debe contener al menos un carácter especial (como !, @, #, $, etc.)'
        )
        .notOneOf(['Script', 'script'], WORLDS_NOT_ALLOWED)
        .trim(NO_SPACES),
    repeatPassword: Yup.string()
        .required(REQUIRED_FIELDS)
        .matches(
            /^[^\u3164\u200B\uFEFF]*$/,
            'Este campo no puede contener caracteres invisibles'
        )
        .notOneOf(['Script', 'script'], WORLDS_NOT_ALLOWED)
        .matches(
            /^[^<>]*$/,
            CHARACTERS_NOT_ALLOWED
        )
        .oneOf([Yup.ref('password')], 'Las contraseñas no coinciden'),
});