const colorValidate = (color) =>{
const errors ={};
if (color.name?.trim() === "") {
    errors.name = "Debe agregar un color"
};
if (color.name?.length > 100) {
    errors.name = "El nombre del color es demasiado largo!"
};
if(color.availity < 0 || !/^\d+(\.\d{1,2})?$/.test(color.availity)){
    errors.availity = "La disponibilidad no puede ser menor a 0";
};
return errors;
};

export default colorValidate;