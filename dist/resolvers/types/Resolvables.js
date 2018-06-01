"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isResolvable(object) {
    return 'evaluate' in object;
}
exports.isResolvable = isResolvable;
var ResolvableSequence = /** @class */ (function () {
    function ResolvableSequence(resolvers) {
        this.resolvables = resolvers.map(function (resolver) {
            if (isResolvable(resolver)) {
                return resolver;
            }
            else {
                return new SimpleResolvable(resolver);
            }
        });
    }
    ResolvableSequence.prototype.resolved = function () {
        var _this = this;
        return function (root, args, context, info) {
            var firstToResolve = _this.resolvables.shift();
            return _this.resolvables.reduce(function (previousResolver, currentResolvable) {
                return previousResolver.then(function () { return currentResolvable.evaluate(root, args, context, info); });
            }, firstToResolve.evaluate(root, args, context, info));
        };
    };
    return ResolvableSequence;
}());
exports.ResolvableSequence = ResolvableSequence;
var SimpleResolvable = /** @class */ (function () {
    function SimpleResolvable(resolver) {
        this.resolver = resolver;
    }
    SimpleResolvable.prototype.evaluate = function (root, args, context, info) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            try {
                return Promise.resolve(_this.resolver(root, args, context, info))
                    .then(function (result) { return resolve(result); }, function (error) { return reject(error); });
            }
            catch (e) {
                return reject(e);
            }
        });
    };
    return SimpleResolvable;
}());
exports.SimpleResolvable = SimpleResolvable;
//# sourceMappingURL=Resolvables.js.map