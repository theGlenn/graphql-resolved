"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var types_1 = require("./../types");
var resolvers_check_1 = require("./../resolvers.check");
exports.chain = function (resolvers) {
    if (resolvers_check_1.isArray(resolvers)) {
        return new types_1.ResolvableSequence(resolvers).resolved();
    }
    throw new Error("Invalid arguments: should be an Array or object of shape\n  {\n    using: Resolvers\n    into : ResolversMap\n  }");
};
//# sourceMappingURL=chain.js.map