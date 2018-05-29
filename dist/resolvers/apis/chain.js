"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var resolvers_chain_1 = require("./../resolvers.chain");
var resolvers_check_1 = require("./../resolvers.check");
exports.chain = function (resolvers) {
    if (resolvers_check_1.isArray(resolvers)) {
        var lastToResolve = resolvers.pop();
        return new resolvers_chain_1.ResolversChain([lastToResolve]).with(resolvers)[0];
    }
    throw new Error("Invalid arguments: should be an Array or object of shape\n  {\n    using: Resolvers\n    into : ResolversMap\n  }");
};
//# sourceMappingURL=chain.js.map