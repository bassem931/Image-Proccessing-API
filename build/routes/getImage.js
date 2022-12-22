"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var path_1 = __importDefault(require("path"));
var validateMiddle_1 = require("../middlewares/validateMiddle");
var sharpModule_1 = require("./sharpModule");
//create route for images
var imageRoute = express_1.default.Router();
var resizeFunc = function (filePath, picName, width, height) { return __awaiter(void 0, void 0, void 0, function () {
    var directory, newName;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                directory = path_1.default.join(__dirname, '../../images/');
                return [4 /*yield*/, (0, sharpModule_1.resizeImg)(filePath, picName, width, height)];
            case 1:
                newName = _a.sent();
                return [2 /*return*/, path_1.default.join(directory, newName)];
        }
    });
}); };
var getResizedPicture = function (picName, width, height, resizedArray) { return __awaiter(void 0, void 0, void 0, function () {
    var isFound, requiredPic;
    return __generator(this, function (_a) {
        isFound = false;
        requiredPic = '';
        //search resized array for same picture dimensions
        resizedArray.forEach(function (picResize) {
            //get required name
            requiredPic = picName + "W".concat(width, "H").concat(height);
            if (picResize === requiredPic) {
                console.log(requiredPic);
                isFound = true;
                return requiredPic;
            }
        });
        if (isFound) {
            return [2 /*return*/, requiredPic];
        }
        else {
            return [2 /*return*/, 'not found'];
        }
        return [2 /*return*/];
    });
}); };
var getPicture = function (filePathOrigin, picName, width, height, resizedArray, res) { return __awaiter(void 0, void 0, void 0, function () {
    var directory, extension, requiredPic, requiredPicPath, sharpImg, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                directory = path_1.default.join(__dirname, '../../images/');
                extension = res.locals.exten;
                return [4 /*yield*/, getResizedPicture(picName, width, height, resizedArray)];
            case 1:
                requiredPic = _a.sent();
                console.log(requiredPic, 'rawaaa2');
                if (!(requiredPic !== 'not found')) return [3 /*break*/, 2];
                requiredPicPath = path_1.default.join(directory, requiredPic + extension);
                console.log(requiredPicPath);
                console.log('la2etak w eshtaretak');
                res.sendFile(requiredPicPath);
                return [3 /*break*/, 5];
            case 2:
                _a.trys.push([2, 4, , 5]);
                return [4 /*yield*/, resizeFunc(filePathOrigin, picName, width, height)];
            case 3:
                sharpImg = _a.sent();
                console.log('5osh sharp');
                res.sendFile(sharpImg);
                return [3 /*break*/, 5];
            case 4:
                error_1 = _a.sent();
                console.log(error_1);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
//get function to retrun image to user
imageRoute.get('/', validateMiddle_1.imageExist, validateMiddle_1.verifyDimensions, function (req, res) {
    //define picture name from url and extension
    var picName = req.query.filename;
    var extension = res.locals.exten;
    //define if height and weight is provided and valid
    var isValidHeight = res.locals.validHeight;
    var isValidWidth = res.locals.validWidth;
    //define image location and directory of images
    var filePath = path_1.default.join(__dirname, '../../images/', picName + extension);
    //get ispicresized for checking if resized image is already in the directory
    //const isPicResized = res.locals.isPicResized as boolean;
    // get metadata first then call async functions to change photos
    (0, sharpModule_1.getMetaData)(filePath).then(function (metaData) {
        if (isValidHeight || isValidWidth) {
            //get resized array
            var resizedArray = res.locals.resizedArray;
            //both width and height are available
            if (isValidHeight && isValidWidth) {
                console.log('hena?');
                //define needed width and length
                var width = parseInt(req.query.width);
                var height = parseInt(req.query.height);
                console.log(resizedArray);
                //if array is empty resize automatically
                if (resizedArray.length !== 0) {
                    console.log(resizedArray);
                    getPicture(filePath, picName, width, height, resizedArray, res);
                }
                else {
                    //5osh sharp 3ala tool
                    resizeFunc(filePath, picName, width, height).then(function (sharpImg) {
                        console.log('etsaraaaaf sharp');
                        res.sendFile(sharpImg);
                    });
                }
                //only width is defined
            }
            else if (!isValidHeight && isValidWidth) {
                //define needed width and length
                var width = parseInt(req.query.width);
                var height = parseInt(metaData === null || metaData === void 0 ? void 0 : metaData.height);
                //if array is empty resize automatically
                if (resizedArray.length !== 0) {
                    //call function to check if image is found or resize and return
                    getPicture(filePath, picName, width, height, resizedArray, res);
                }
                else {
                    //5osh sharp 3ala tool
                    resizeFunc(filePath, picName, width, height).then(function (sharpImg) {
                        console.log('etsaraaaaf sharp');
                        res.sendFile(sharpImg);
                    });
                }
                //only height is defined
            }
            else if (isValidHeight && !isValidWidth) {
                //define needed width and length
                var width = parseInt(metaData === null || metaData === void 0 ? void 0 : metaData.height);
                var height = parseInt(req.query.height);
                //call function to check if image is found or resize and return
                if (resizedArray.length !== 0) {
                    getPicture(filePath, picName, width, height, resizedArray, res);
                }
                else {
                    //5osh sharp 3ala tool
                    resizeFunc(filePath, picName, width, height).then(function (sharpImg) {
                        console.log('etsaraaaaf sharp');
                        res.sendFile(sharpImg);
                    });
                }
            }
            //go to resize function
        }
        else {
            //if both not available return original
            res.sendFile(filePath);
        }
        //can test more functionailty here
    });
});
exports.default = imageRoute;
