"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chain_1 = require("./chain");
var isApplyArgs = function (args) { return ('resolvers' in args && 'into' in args); };
exports.apply = function (args) {
    var resolversToApply = args.resolvers, independantResolvers = args.to;
    if (isApplyArgs(args)) {
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