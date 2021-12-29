import { reactive, ref } from "vue"

export enum FieldType {
    TEXT,
    PASSWORD,
    SELECT
}

export enum Direction {
    LTR,
    RTL
}

export type Field = {
    name: string,
    value: any,
    type: FieldType,
    dir: Direction,
    validators: [],
    valid: false,
    errors: []
}

export function createField(name = "") {
    const field: Field = reactive({
        name: name,
        value: "",
        dir: Direction.LTR,
        type: FieldType.TEXT,
        validators: [],
        valid: false,
        errors: []
    });

    return field;
}

export const createForm = (fields: Field[]) =>
    fields.reduce((a, v) => ({ ...a, [v.name]: v }), {});

export default function useForm(fields: Field[]) {

    // const form = reactive(createForm(fields))
    const form = createForm(fields)

    const isValid = ref(true);

    return { form, isValid, createForm };
}