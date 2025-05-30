"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const path_1 = __importDefault(require("path"));
const errorMiddleware_js_1 = require("./middleware/errorMiddleware.js");
const constants_js_1 = require("../shared/constants.js");
const db_js_1 = __importDefault(require("./config/db.js"));
const productRoutes_js_1 = __importDefault(require("./routes/productRoutes.js"));
const userRoutes_js_1 = __importDefault(require("./routes/userRoutes.js"));
const orderRoutes_js_1 = __importDefault(require("./routes/orderRoutes.js"));
const uploadRoutes_js_1 = __importDefault(require("./routes/uploadRoutes.js"));
dotenv_1.default.config();
const port = process.env.PORT || 5005;
(0, db_js_1.default)();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
app.use(constants_js_1.PRODUCTS_URL, productRoutes_js_1.default);
app.use(constants_js_1.USERS_URL, userRoutes_js_1.default);
app.use(constants_js_1.ORDERS_URL, orderRoutes_js_1.default);
app.use(constants_js_1.UPLOAD_URL, uploadRoutes_js_1.default);
app.get(constants_js_1.PAYPAL_URL, (_req, res) => {
    res.send({ clientId: process.env.PAYPAL_CLIENT_ID });
});
const __dirname = path_1.default.resolve();
app.use("/uploads", express_1.default.static(path_1.default.join(__dirname, "backend/uploads")));
if (process.env.NODE_ENV === "production") {
    app.use(express_1.default.static(path_1.default.join(__dirname, "frontend/build")));
    app.get("*", (_req, res) => {
        res.sendFile(path_1.default.join(__dirname, "frontend", "build", "index.html"));
    });
}
else {
    app.get("/", (_req, res) => {
        res.send("API is running...");
    });
}
app.use(errorMiddleware_js_1.notFound);
app.use(errorMiddleware_js_1.errorHandler);
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
