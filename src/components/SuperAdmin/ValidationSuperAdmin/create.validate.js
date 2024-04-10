const creteValidate = (product) => {
    const errors = {};
    if (product.name?.trim().length < 4) {
        errors.name = "El nombre del producto debe tener por lo menos 4 letras"
    };
    if (product.name?.length > 100) {
        errors.name = "El nombre del producto es demasiado largo!"
    };
 
    if (product.price === null) {
        errors.price = "Por favor determine un precio"
    };
    if (product.price < 1) {
        errors.price = "Por favor determine un precio mayor a 0"
    };
    if (!/^\d+(\.\d{1,2})?$/.test(product.price)) {
        errors.price = "El precio puede tener hasta dos decimales";
    };
    if (product.discount !== null) {
        if (product.discount >= 100) {
            errors.discount = "El descuento no puede ser o superar el %100"
        };
        if (!/^\d+(\.\d)?$/.test(product.discount)) {
            errors.discount = "El descuento puede tener hasta dos decimales";
        };
    };
    if (product.description?.trim().length < 10) {
        errors.description = "Ponga alguna descripción de por lo menos 10 caracteres";
    };
    if (!product.img.length) {
        errors.img = "Por favor agregue por lo menos una imagen"
    };
    if(product.available < 0 || !/^\d+(\.\d{1,2})?$/.test(product.available)){
        errors.available = "La disponibilidad no puede ser menor a 0";
    };
    if (product.source === 'skincares'){
        if (product.skinType.trim() === "") {
            errors.skinType = "Seleccione el tipo de piel"
        };
        if (product.crema.trim() === "") {
            errors.crema = "Ponga que tipo de crema es, si hidratante, reparadora, etc."
        };
    };
    return errors;
};

export default creteValidate;
