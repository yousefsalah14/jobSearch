export const validation = (schema) => {
    return (req, res, next) => {
        const data = { ...req.body, ...req.params, ...req.query };
        const validationResult = schema.validate(data, { abortEarly: false });

        if (validationResult.error) {
            const errorMessages = validationResult.error.details.map((errorObj) => errorObj.message);
            return next({ message: errorMessages, status: 400 }); 
        }
        
        return next();
    };
};
