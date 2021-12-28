import { Field } from "./useField";

// export interface Form extends Record<string, any> {
// }

// TODO: !
export const toPostForm = (form: Form) => {
    if (form) {
        const cloneForm = Object.assign({}, form);
        Object.keys(cloneForm).map(function (key, index) {
            cloneForm[key] = cloneForm[key].value.value.value;
        })
        return cloneForm;
    }
}

export default function useForm(fields: Field[]) {

    //const form: Form = fields.reduce((a, v) => ({ ...a, [v.name]: { value: v } }), {}) // value: for v-model writable error!

    const createForm = (fields) => fields.reduce((a, v) => ({ ...a, [v.name]: { value: v } }), {});

    const form = ref(createForm(fields))

    const isValid = ref(true)

    // watch(Object.values(form).map(x => x.value.value), value => {
    //     isValid.value = !Object.values(form).some(x => !x.value.valid)
    // }, { deep: true })

    watch(form, value => {
        isValid.value = true//!Object.values(form).some(x => !x.value.valid)
    }, { deep: true })

    return { form, isValid, toPostForm, createForm };
}