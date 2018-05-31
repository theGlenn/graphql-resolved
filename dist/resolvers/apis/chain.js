"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var resolvers_check_1 = require("./../resolvers.check");
var Chainable_1 = require("./../Chainable");
exports.chain = function (resolvers) {
    if (resolvers_check_1.isArray(resolvers)) {
        var lastToResolve = resolvers.pop();
        return new Chainable_1.default(lastToResolve).after(resolvers);
    }
    throw new Error("Invalid arguments: should be an Array or object of shape\n  {\n    using: Resolvers\n    into : ResolversMap\n  }");
};
//# sourceMappingURL=chain.js.map