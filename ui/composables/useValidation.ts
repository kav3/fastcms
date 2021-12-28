const minLength = (min: number, error = `Value must be at least ${min} characters`) => {
    return (input: string) => input.length >= min ? null : error;
};

const minMaxLength = (min: number, max: number, error = `Value must be at least ${min} characters`) => {
    return (input: string) => input.length >= min && input.length <= max ? null : error;
};

const required = (err: string = "Required", error = "required") => minLength(1, error);

const isEmail = (error = "Must be a valid email address") => {
    const re = /\S+@\S+\.\S+/;
    return (input: string) => re.test(input) ? null : error;
}

export { minLength, minMaxLength, required, isEmail };