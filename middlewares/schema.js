export const validateSchema = (schema) => (req, res, next) => {
    const { error } = schema.validate(req.body, {
        abortEarly: false,
        allowUnknown: false
    });
    if (error) {
        res.status(400).json(error.details);
    } else {
        next();
    }
}
