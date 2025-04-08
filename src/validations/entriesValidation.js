import * as Yup from "yup";

const REQUIRED_FIELDS = 'Este campo obligatorio';
const LETTERS_SPACES = 'Este campo solo puede contener letras y espacios';
const NO_SPACES = 'Este campo no puede contener solo espacios';
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