"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderStatus = void 0;
var OrderStatus;
(function (OrderStatus) {
    OrderStatus["WAITING"] = "waiting";
    OrderStatus["CONFIRMED"] = "confirmed";
    OrderStatus["REJECTED_BY_ADMIN"] = "rejected_by_admin";
    OrderStatus["REJECTED_BY_USER"] = "rejected_by_user";
    OrderStatus["SHIPPED"] = "shipped";
    OrderStatus["DELIVERED"] = "delivered";
})(OrderStatus || (exports.OrderStatus = OrderStatus = {}));
//# sourceMappingURL=order-status.enum.js.map