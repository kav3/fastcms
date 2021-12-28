import { Direction } from "../common/enums";

export enum FieldType {
    TEXT,
    PASSWORD,
    SELECT
}

export interface Field {
    name: string,
    value: string | number | boolean,
    type: FieldType,
    dir: Direction,
    validators: ((any) => string | null)[],
    valid: boolean,
    errors: string[]
}

export default function useField() {
    const field: Field = {
        name: "",
        value: ref(""),
        type: FieldType.TEXT,
        dir: Direction.LTR,
        validators: [],
        valid: false,
        errors: []
    }

    // TODO: !
    watch(field.value, value => {
        field.errors = field.validators.map(validator => validator(value)).filter(Boolean) as string[];
        field.valid = field.errors.length == 0;
    })

    return field
}
