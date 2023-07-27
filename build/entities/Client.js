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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Client = void 0;
const typeorm_1 = require("typeorm");
const Base_1 = require("./Base");
const Transaction_1 = require("./Transaction");
const Banker_1 = require("./Banker");
let Client = exports.Client = class Client extends Base_1.Base {
};
__decorate([
    (0, typeorm_1.Column)({
        type: 'numeric'
    }),
    __metadata("design:type", Number)
], Client.prototype, "balance", void 0);
__decorate([
    (0, typeorm_1.Column)({
        default: true,
        name: 'active'
    }),
    __metadata("design:type", Boolean)
], Client.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'simple-json',
        nullable: true
    }),
    __metadata("design:type", Object)
], Client.prototype, "metadata", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'simple-array',
        default: []
    }),
    __metadata("design:type", Array)
], Client.prototype, "familyMembers", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Transaction_1.Transaction, transaction => transaction.client),
    __metadata("design:type", Array)
], Client.prototype, "transactions", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => Banker_1.Banker),
    __metadata("design:type", Array)
], Client.prototype, "banekers", void 0);
exports.Client = Client = __decorate([
    (0, typeorm_1.Entity)('clients')
], Client);
//# sourceMappingURL=Client.js.map