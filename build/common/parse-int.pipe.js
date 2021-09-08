"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var common_1 = require("@nestjs/common");
var ParseIntPipe = /** @class */ (function () {
    function ParseIntPipe() {
    }
    ParseIntPipe.prototype.transform = function (value, metadata) {
        //VALUE: STRING PARA PARSEARLO A STRING
        var val = parseInt(value, 10); //REALIZA LA TRANSFORMACIÓN A STRING (LA BASE 10 SON LOS NUMEROS DEL 0 AL 9)
        if (isNaN(val)) {
            //VALIDACIÓN SI PUDO REALIZAR LA TRANSFORMACIÓN
            throw new common_1.BadRequestException(value + " is not an number"); //EXCEPTION
        }
        return val;
    };
    ParseIntPipe = __decorate([
        common_1.Injectable()
    ], ParseIntPipe);
    return ParseIntPipe;
}());
exports.ParseIntPipe = ParseIntPipe;
//# sourceMappingURL=parse-int.pipe.js.map