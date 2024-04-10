const imageValidate = (currentImage) => {
    const errors = {};
    if (currentImage.trim() !== "") {
        
        if (!/\.(jpg|jpeg|png|gif)$/i.test(currentImage)) {
            errors.currentImg = "La imagen debe estar en formato .jpg, jpeg, png o gif"
        };
        if (!/^https:\/\//i.test(currentImage)) {
            errors.currentImg = "Este campo debe completarse con una URL"
        };
    }

    return errors;
};

export default imageValidate;