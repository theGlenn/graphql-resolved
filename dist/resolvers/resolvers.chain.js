"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var resolvers_assembler_1 = require("./resolvers.assembler");
var ResolversChain = /** @class */ (function () {
    function ResolversChain(independantsResolvers) {
        this.independantsResolvers = independantsResolvers;
    }
    ResolversChain.prototype.with = function (resolversToApply) {
        return this.independantsResolvers.map(function (resolver) { return resolversToApply.concat([resolver]).reduce(function (previousResolver, currentResolver) {
            return resolvers_assembler_1.ResolversAssembler.assemble({
                before: previousResolver,
                next: currentResolver
            });
        }); });
    };
    return ResolversChain;
}());
exports.ResolversChain = ResolversChain;
//# sourceMappingURL=resolvers.chain.js.map