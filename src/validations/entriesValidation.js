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
    selectedSupplier: Yup.string()
        .required(REQUIRED_FIELDS),
    selectedCategory: Yup.string()
        .required(REQUIRED_FIELDS),
    productName: Yup.string()
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
    measurementUnit: Yup.string()
        .required(REQUIRED_FIELDS)
        .matches(
            /^[^\u3164\u200B\uFEFF]*$/,
            INVISIBLE_CHARACTERS
        )
        .matches(
            /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
            LETTERS_SPACES
        )
        .min(3, 'Este campo debe tener al menos 3 caracteres')
        .max(30, 'Este campo no puede exceder los 30 caracteres')
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
    quantity: Yup.string()
        .required(REQUIRED_FIELDS)
        .matches(/^\d+$/, 'Este campo solo puede contener números'),
    unitPrice: Yup.string()
        .required(REQUIRED_FIELDS)
        .matches(/^\d+(\.\d{1,2})?$/, 'Este campo solo puede contener números y hasta dos decimales'),
});