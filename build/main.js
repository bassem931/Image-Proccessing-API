"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var getImage_1 = __importDefault(require("./routes/getImage"));
//create server
var app = (0, express_1.default)();
var port = 3000;
//use Routes
//main route
app.use('/image', getImage_1.default);
app.get('/', function (_req, res) {
    res.send('Main route');
});
app.listen(port, function () {
    console.log("Server started at port ".concat(port));
});
exports.default = app;
