import * as Yup from "yup";

const REQUIRED_FIELDS = 'Este campo es obligatorio';
const LETTERS_SPACES = 'Este campo solo puede contener letras y espacios';
const NO_SPACES = 'Este campo no puede contener solo espacios';
const INVALID_EMAIL = 'El correo electrónico no es válido';
const WORLDS_NOT_ALLOWED = 'El campo contiene palabras no permitidas';
const CHARACTERS_NOT_ALLOWED = "Este campo no puede contener los caracteres '<' o '>'";
const INVISIBLE_CHARACTERS = 'Este campo no puede contener caracteres invisibles';
const CONSECUTIVE_SPACES = "Este campo no puede contener espacios consecutivos";


export const addUserSchema = Yup.object({
    name: Yup.string()
        .required(REQUIRED_FIELDS)
        .test(
            'no-leading-trailing-spaces',
            'No se permiten espacios al inicio o al final',
            (value) => value && value === value.trim()
        )
        .matches(
            /^[^\u3164\u200B\uFEFF]*$/,
            INVISIBLE_CHARACTERS
        )
        .matches(
            /^(?!.*-.*-)[A-Za-z0-9 -]*$/,
            LETTERS_SPACES
        )
        .min(3, 'El nombre debe tener al menos 3 caracteres')
        .max(30, 'El nombre no puede exceder los 30 caracteres')
        .matches(
            /^[^<>]*$/,
            CHARACTERS_NOT_ALLOWED
        )
        .notOneOf(['Script', 'script'], WORLDS_NOT_ALLOWED)
        .matches(
            /^\S+(?: \S+)*$/,
            CONSECUTIVE_SPACES
        ),
    lastname: Yup.string()
        .required(REQUIRED_FIELDS)
        .test(
            'no-leading-trailing-spaces',
            'No se permiten espacios al inicio o al final',
            (value) => value && value === value.trim()
        )
        .matches(
            /^[^\u3164\u200B\uFEFF]*$/,
            INVISIBLE_CHARACTERS
        )
        .matches(
            /^(?!.*-.*-)[A-Za-z0-9 -]*$/,
            LETTERS_SPACES
        )
        .min(3, 'El apellido debe tener al menos 3 caracteres')
        .max(30, 'El apellido no puede exceder los 30 caracteres')
        .matches(
            /^[^<>]*$/,
            CHARACTERS_NOT_ALLOWED
        )
        .notOneOf(['Script', 'script'], WORLDS_NOT_ALLOWED)
        .matches(
            /^\S+(?: \S+)*$/,
            CONSECUTIVE_SPACES
        ),
    email: Yup.string()
        .email(INVALID_EMAIL)
        .required(REQUIRED_FIELDS)
        .test(
            'no-leading-trailing-spaces',
            'No se permiten espacios al inicio o al final',
            (value) => value && value === value.trim()
        )
        .matches(
            /^[^\u3164\u200B\uFEFF]*$/,
            INVISIBLE_CHARACTERS
        )
        .matches(
            /^[^<>]*$/,
            CHARACTERS_NOT_ALLOWED
        )
        .notOneOf(['Script', 'script'], WORLDS_NOT_ALLOWED)
        .matches(
            /^\S+(?: \S+)*$/,
            CONSECUTIVE_SPACES
        ),
    role: Yup.string()
        .required(REQUIRED_FIELDS),
});

export const editUserSchema = Yup.object({
    name: Yup.string()
        .required(REQUIRED_FIELDS)
        .test(
            'no-leading-trailing-spaces',
            'No se permiten espacios al inicio o al final',
            (value) => value && value === value.trim()
        )
        .matches(
            /^[^\u3164\u200B\uFEFF]*$/,
            INVISIBLE_CHARACTERS
        )
        .matches(
            /^(?!.*-.*-)[A-Za-z0-9 -]*$/,
            LETTERS_SPACES
        )
        .min(3, 'El nombre debe tener al menos 3 caracteres')
        .max(30, 'El nombre no puede exceder los 30 caracteres')
        .matches(
            /^[^<>]*$/,
            CHARACTERS_NOT_ALLOWED
        )
        .notOneOf(['Script', 'script'], WORLDS_NOT_ALLOWED)
        .matches(
            /^\S+(?: \S+)*$/,
            CONSECUTIVE_SPACES
        ),
    lastname: Yup.string()
        .required(REQUIRED_FIELDS)
        .test(
            'no-leading-trailing-spaces',
            'No se permiten espacios al inicio o al final',
            (value) => value && value === value.trim()
        )
        .matches(
            /^[^\u3164\u200B\uFEFF]*$/,
            INVISIBLE_CHARACTERS
        )
        .matches(
            /^(?!.*-.*-)[A-Za-z0-9 -]*$/,
            LETTERS_SPACES
        )
        .min(3, 'El apellido debe tener al menos 3 caracteres')
        .max(30, 'El apellido no puede exceder los 30 caracteres')
        .matches(
            /^[^<>]*$/,
            CHARACTERS_NOT_ALLOWED
        )
        .notOneOf(['Script', 'script'], WORLDS_NOT_ALLOWED)
        .matches(
            /^\S+(?: \S+)*$/,
            CONSECUTIVE_SPACES
        ),
    role: Yup.string()
        .required(REQUIRED_FIELDS),
});

export const editUserInfoSchema = Yup.object({
    name: Yup.string()
    .required(REQUIRED_FIELDS)
    .test(
        'no-leading-trailing-spaces',
        'No se permiten espacios al inicio o al final',
        (value) => value && value === value.trim()
    ) 
    .matches(
        /^[^\u3164\u200B\uFEFF]*$/,
        INVISIBLE_CHARACTERS
    )
    .matches(
        /^(?!.*-.*-)[A-Za-z0-9 -]*$/,
        LETTERS_SPACES
    )
    .min(3, 'El nombre debe tener al menos 3 caracteres')
    .max(30, 'El nombre no puede exceder los 30 caracteres')
    .matches(
        /^[^<>]*$/,
        CHARACTERS_NOT_ALLOWED
    )
    .notOneOf(['Script', 'script'], WORLDS_NOT_ALLOWED)
    .matches(
        /^\S+(?: \S+)*$/,
        CONSECUTIVE_SPACES
    ),
    lastname: Yup.string()
        .required(REQUIRED_FIELDS)
        .test(
            'no-leading-trailing-spaces',
            'No se permiten espacios al inicio o al final',
            (value) => value && value === value.trim()
        ) 
        .matches(
            /^[^\u3164\u200B\uFEFF]*$/,
            INVISIBLE_CHARACTERS
        )
        .matches(
            /^(?!.*-.*-)[A-Za-z0-9 -]*$/,
            LETTERS_SPACES
        )
        .min(3, 'El apellido debe tener al menos 3 caracteres')
        .max(30, 'El apellido no puede exceder los 30 caracteres')
        .matches(
            /^[^<>]*$/,
            CHARACTERS_NOT_ALLOWED
        )
        .notOneOf(['Script', 'script'], WORLDS_NOT_ALLOWED)
        .matches(
            /^\S+(?: \S+)*$/,
            CONSECUTIVE_SPACES
        ),
});