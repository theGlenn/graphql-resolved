"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var resolvers_check_1 = require("./../resolvers.check");
var chain_1 = require("./chain");
exports.apply = function (args) {
    var resolversToApply = args.resolvers, independantResolvers = args.to;
    if (resolvers_check_1.isApplyArgs(args)) {
        throw new Error("Invalid arguments: should be an Array or object of shape\n    {\n      using: Resolvers\n      into : ResolversMap\n    }");
    }
    var chainedResolvers = {};
    for (var key in independantResolvers) {
        var resolver = independantResolvers[key];
        chainedResolvers[key] = chain_1.chain(resolversToApply.concat([resolver]));
    }
    return chainedResolvers;
};
//# sourceMappingURL=apply.js.map