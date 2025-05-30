"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const colors_1 = __importDefault(require("colors"));
const db_js_1 = __importDefault(require("./config/db.js"));
const users_js_1 = __importDefault(require("./data/users.js"));
const products_js_1 = __importDefault(require("./data/products.js"));
const userModel_js_1 = __importDefault(require("./models/userModel.js"));
const productModel_js_1 = __importDefault(require("./models/productModel.js"));
const orderModel_js_1 = __importDefault(require("./models/orderModel.js"));
dotenv_1.default.config();
(0, db_js_1.default)();
const importData = async () => {
    try {
        await orderModel_js_1.default.deleteMany();
        await productModel_js_1.default.deleteMany();
        await userModel_js_1.default.deleteMany();
        const createdUsers = await userModel_js_1.default.insertMany(users_js_1.default);
        const adminUser = createdUsers[0]._id;
        const sampleProducts = products_js_1.default.map((product) => {
            return { ...product, user: adminUser };
        });
        await productModel_js_1.default.insertMany(sampleProducts);
        console.log(colors_1.default.green.inverse("Data imported."));
        process.exit();
    }
    catch (err) {
        console.error(colors_1.default.red.inverse(`${err}`));
        process.exit(1);
    }
};
const destroyData = async () => {
    try {
        await orderModel_js_1.default.deleteMany();
        await productModel_js_1.default.deleteMany();
        await userModel_js_1.default.deleteMany();
        console.log(colors_1.default.red.inverse("Data destroyed."));
        process.exit();
    }
    catch (err) {
        console.error(colors_1.default.red.inverse(`${err}`));
        process.exit(1);
    }
};
if (process.argv[2] === "-d") {
    destroyData();
}
else {
    importData();
}
