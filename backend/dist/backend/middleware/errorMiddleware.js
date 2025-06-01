import { DEFAULT_ERROR_MESSAGE } from "../../shared/constants.js";
const notFound = (req, res, next) => {
    const error = new Error(`Dropped stitch! ${req.originalUrl} isn’t on our pattern.`);
    res.status(404);
    next(error);
};
const errorHandler = (err, req, res, next) => {
    let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    let message = err.message || DEFAULT_ERROR_MESSAGE;
    if (err.name === "CastError" && err.kind === "ObjectId") {
        message = "This yarn is not in our stash. Product not found.";
        statusCode = 404;
    }
    res.status(statusCode).json({
        message,
        stack: process.env.NODE_ENV === "production" ? null : err.stack,
    });
};
export { notFound, errorHandler };
