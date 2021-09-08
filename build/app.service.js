"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var common_1 = require("@nestjs/common");
var config_1 = require("./config");
var pg_1 = require("pg");
var AppService = /** @class */ (function () {
    function AppService(
    //@Inject('API_KEY') private apiKey: string,
    clientPg, //INYECTANDO CLIENT QUE SERIA POSTGRE
    tasks, configService) {
        this.clientPg = clientPg;
        this.tasks = tasks;
        this.configService = configService;
    } //SE INYECTA EL VALOR QUE SE QUIERE USAR A TRAVÉS DE TODA LA APP
    AppService.prototype.getHello = function () {
        var apiKey = this.configService.apiKey;
        return "Hello World! " + apiKey;
    };
    AppService.prototype.getTasks = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.clientPg.query('SELECT * FROM task', function (err, res) {
                if (err) {
                    reject(err);
                }
                resolve(res.rows);
            });
        });
    };
    AppService = __decorate([
        common_1.Injectable(),
        __param(0, common_1.Inject('PG')),
        __param(1, common_1.Inject('TASKS')),
        __param(2, common_1.Inject(config_1.default.KEY)),
        __metadata("design:paramtypes", [pg_1.Client, Array, void 0])
    ], AppService);
    return AppService;
}());
exports.AppService = AppService;
//# sourceMappingURL=app.service.js.map