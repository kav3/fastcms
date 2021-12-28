import useField, { FieldType } from "./useField"
import useForm from "./useForm"
import { minMaxLength } from "./useValidation";
import { LoginMode } from "../common/enums"

export default function useLogin(api = "/users/auth") {
    const config = useRuntimeConfig()
    const store = useStore()

    const usernameField = useField();
    usernameField.name = "username";
    usernameField.validators = [minMaxLength(3, 15)];

    const nameField = useField();
    nameField.name = "name";
    nameField.type = FieldType.TEXT;
    nameField.validators = [minMaxLength(2, 20)];

    const passwordField = useField();
    passwordField.name = "password";
    passwordField.type = FieldType.PASSWORD;
    passwordField.validators = [minMaxLength(6, 30)];

    const mode = ref(LoginMode.USERNAME);
    let fields = [usernameField];

    const { form, isValid, toPostForm, createForm } = useForm(fields);

    watch(mode, value => {
        switch (mode.value) {
            case LoginMode.USERNAME:
                fields = [usernameField];
                break;
            case LoginMode.LOGIN:
                fields = [passwordField];
                break;
            case LoginMode.REGISTER:
                fields = [nameField, passwordField];
                break;
        }

        form.value = createForm(fields);

    }, { immediate: true })


    const submit = async () => {
        console.log(form.value)

        let b = toPostForm(form.value);
        b.mode = mode.value;

        if (isValid) {
            const { data } = await useFetch(api, { baseURL: config.BASE_URL, method: "POST", body: b });
            switch (mode.value) {
                case 0:
                    mode.value = data.value.exist ? 1 : 2;
                    break;
                case 1:
                case 2:
                    if (data.value.token) {
                        // save token and redirect
                        store.methods.setToken(data.value.token);
                    }
                    break;
            }
        }
    }

    return { form, submit, isValid }
}