"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
;
var Chainable = /** @class */ (function () {
    function Chainable(resolver) {
        this.resolver = resolver;
    }
    Chainable.prototype.after = function (resolversToApply) {
        var resolvers = resolversToApply.concat([this.resolver]);
        return resolvers.reduce(function (previousResolver, currentResolver) {
            return Chainable.assemble({
                before: previousResolver,
                next: currentResolver
            });
        });
    };
    Chainable.assemble = function (_a) {
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
    return Chainable;
}());
exports.default = Chainable;
//# sourceMappingURL=Chainable.js.map