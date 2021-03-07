export const formatData = value => {
    value = value.replace(/\D/g, "");
    value = value.replace(/(\d{2})(\d)/, "$1/$2");
    value = value.replace(/(\d{2})(\d)/, "$1/$2");

    return value;
};

export const formatCelular = (input) => {
    input = input.replace(/\D/g, "");
    input = input.replace(/(\d{0})(\d)/, "$1($2");
    input = input.replace(/(\d{2})(\d)/, "$1) $2");
    input = input.replace(/(\d{1})(\d{1,4})$/, "$1-$2");

    return input;
};