"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var resolvers_check_1 = require("./resolvers.check");
;
var ResolversAssembler = (function () {
    function ResolversAssembler() {
    }
    ResolversAssembler.assemble = function (_a) {
        var before = _a.before, next = _a.next;
        return function (root, args, context, info) { return new Promise(function (resolve, reject) {
            try {
                return Promise.resolve(before(root, args, context, info))
                    .then(function () { return next(root, args, context, info); })
                    .then(function (result) { return resolve(result); }, function (error) { return reject(error); });
            }
            catch (e) {
                return reject(e);
            }
        }); };
    };
    return ResolversAssembler;
}());
exports.ResolversAssembler = ResolversAssembler;
var ResolversChain = (function () {
    function ResolversChain(independantsResolvers) {
        this.independantsResolvers = independantsResolvers;
    }
    ResolversChain.prototype.with = function (resolversToApply) {
        return this.independantsResolvers.map(function (resolver) { return resolversToApply.concat([resolver]).reduce(function (previousResolver, currentResolver) {
            return ResolversAssembler.assemble({
                before: previousResolver,
                next: currentResolver
            });
        }); });
    };
    return ResolversChain;
}());
exports.ResolversChain = ResolversChain;
exports.chain = function (resolvers) {
    if (resolvers_check_1.isArray(resolvers)) {
        var lastToResolve = resolvers.pop();
        return new ResolversChain([lastToResolve]).with(resolvers)[0];
    }
    throw new Error("Invalid arguments: should be an Array or object of shape\n  {\n    using: Resolvers\n    into : ResolversMap\n  }");
};
exports.apply = function (args) {
    var resolversToApply = args.resolvers, independantResolvers = args.to;
    if (resolvers_check_1.isApplyArgs(args)) {
        throw new Error("Invalid arguments: should be an Array or object of shape\n    {\n      using: Resolvers\n      into : ResolversMap\n    }");
    }
    var chainedResolvers = {};
    for (var key in independantResolvers) {
        var resolver = independantResolvers[key];
        chainedResolvers[key] = exports.chain(resolversToApply.concat([resolver]));
    }
    return chainedResolvers;
};
exports.protect = function (_a) {
    var it = _a.it, all = _a.all, using = _a.using;
    if (it) {
        return exports.chain(using.concat([it]));
    }
    else if (all) {
        return exports.apply({ resolvers: using, to: all });
    }
    throw new Error("Invalid arguments: should be an object of shape\n  {\n    it?: ResolverFunction<R>\n    all?: ResolversMap\n    using: Resolvers\n  }");
};
//# sourceMappingURL=resolvers.js.map