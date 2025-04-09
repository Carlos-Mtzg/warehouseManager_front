import * as Yup from "yup";

const REQUIRED_FIELDS = 'Este campo es obligatorio';
const LETTERS_SPACES = 'Este campo solo puede contener letras y espacios';
const NO_SPACES = 'Este campo no puede contener solo espacios';
const INVALID_EMAIL = 'El correo electrónico no es válido';
const WORLDS_NOT_ALLOWED = 'El campo contiene palabras no permitidas';
const CHARACTERS_NOT_ALLOWED = "Este campo no puede contener los caracteres '<' o '>'";
const INVISIBLE_CHARACTERS = 'Este campo no puede contener caracteres invisibles';
const CONSECUTIVE_SPACES = "Este campo no puede contener espacios consecutivos";

export const addCategorySchema = Yup.object({
    categoryName: Yup.string()
        .required(REQUIRED_FIELDS)
        .matches(
            /^[^\u3164\u200B\uFEFF]*$/,
            INVISIBLE_CHARACTERS
        )
        .matches(
            /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
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
        )
        .trim(NO_SPACES),
});

export const addSupplierSchema = Yup.object({
    name: Yup.string()
        .required(REQUIRED_FIELDS)
        .matches(
            /^[^\u3164\u200B\uFEFF]*$/,
            INVISIBLE_CHARACTERS
        )
        .matches(
            /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
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
        )
        .trim(NO_SPACES),
    email: Yup.string()
        .email(INVALID_EMAIL)
        .required(REQUIRED_FIELDS)
        .matches(
            /^[^<>]*$/,
            CHARACTERS_NOT_ALLOWED
        )
        .notOneOf(['Script', 'script'], WORLDS_NOT_ALLOWED)
        .trim(NO_SPACES),
})

export const productEntriesSchema = Yup.object({
    selectedSupplier: Yup.string().required(REQUIRED_FIELDS),
    selectedCategory: Yup.string().required(REQUIRED_FIELDS),
    products: Yup.array().of(
        Yup.object({
            productName: Yup.string()
                .required(REQUIRED_FIELDS)
                .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, 'Solo letras y espacios')
                .min(3, 'Debe tener al menos 3 caracteres')
                .max(30, 'No puede exceder los 30 caracteres'),
            measurementUnit: Yup.string()
                .required(REQUIRED_FIELDS)
                .min(3, 'Debe tener al menos 3 caracteres')
                .max(30, 'No puede exceder los 30 caracteres'),
            quantity: Yup.number()
                .required(REQUIRED_FIELDS)
                .positive('Debe ser un número positivo')
                .integer('Debe ser un número entero'),
            unitPrice: Yup.number()
                .required(REQUIRED_FIELDS)
                .positive('Debe ser un número positivo')
                .test(
                    'is-decimal',
                    'Debe tener como máximo dos decimales',
                    (value) => /^\d+(\.\d{1,2})?$/.test(value)
                ),
        })
    ),
});