"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.verifyDimensions = exports.imageExist = void 0;
var path_1 = __importDefault(require("path"));
var fs = __importStar(require("fs"));
//function to search if image is present in directory
var imageExist = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var imagesPath, picNames, urlName, isPicFound, resizedArray;
    return __generator(this, function (_a) {
        imagesPath = path_1.default.join(__dirname, '../../images');
        picNames = fs.readdirSync(imagesPath);
        urlName = req.query.filename;
        isPicFound = false;
        //check filename parameter exists
        if (!req.query.filename) {
            res.status(400).send('no filename is given');
            //return to prevent rest of code running
            return [2 /*return*/];
        }
        resizedArray = [];
        picNames.forEach(function (pic) {
            //picture name
            var fileName = path_1.default.parse(pic).name;
            if (fileName === urlName) {
                //get extension
                var ext = path_1.default.parse(pic).ext;
                //set exten as the extension of the picture to pass it to the get
                res.locals.exten = ext;
                //set isfound = true to pass to the next
                isPicFound = true;
            }
            //search for resized pictures and send to getImage
            if (fileName.slice(0, urlName.length) === urlName) {
                //name of part after fileName in case of resized image
                var dimName = fileName.slice(urlName.length);
                console.log(fileName.slice(0, urlName.length));
                //if conditions to make sure it is a resized image not an error
                //test first letter is W followed by a number then an H is the string followed by a number
                //number check is done using to lower and to upper case as they true on letters only
                //if both are equal in type
                if (dimName.charAt(0) === 'W' &&
                    dimName.charAt(1).toLowerCase() === dimName.charAt(1).toUpperCase() &&
                    dimName.includes('H')) {
                    var heightNum = dimName.indexOf('H');
                    if (dimName.charAt(heightNum + 1).toLowerCase() ===
                        dimName.charAt(heightNum + 1).toUpperCase()) {
                        //send resized file name
                        resizedArray.push(fileName);
                    }
                }
            }
        });
        //send resized array to get function
        res.locals.resizedArray = resizedArray;
        //exited loop without finding picture
        if (!isPicFound) {
            res.status(404).send("Picture ".concat(urlName, " not found\n    available images: ").concat(picNames));
            return [2 /*return*/];
        }
        else {
            next();
        }
        return [2 /*return*/];
    });
}); };
exports.imageExist = imageExist;
var verifyDimensions = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var height, width;
    return __generator(this, function (_a) {
        res.locals.validHeight = false;
        res.locals.validWidth = false;
        if (req.query.height) {
            height = req.query.height;
            //check height is a number
            if (isNaN(parseInt(height))) {
                res.status(400).send('please enter a number for the height');
            }
            else if (parseInt(height) <= 0) {
                //height is number less than 0 so negative
                res.status(400).send('please provide a positive height');
            }
            else {
                //if height is positive it is valid
                res.locals.validHeight = true;
                console.log('height tamam');
            }
        }
        //check if width only
        if (req.query.width) {
            width = req.query.width;
            //check width is a number
            if (isNaN(parseInt(width))) {
                res.status(400).send('please enter a number for the width');
            }
            else if (parseInt(width) <= 0) {
                //width is number less than 0 so negative
                res.status(400).send('please provide a positive width');
            }
            else {
                //if width is positive it is valid
                res.locals.validWidth = true;
                console.log('width tamam');
            }
        }
        // we have the valid width or length so return
        //console.log(res.locals.validHeight, res.locals.validWidth);
        return [2 /*return*/, next()];
    });
}); };
exports.verifyDimensions = verifyDimensions;
