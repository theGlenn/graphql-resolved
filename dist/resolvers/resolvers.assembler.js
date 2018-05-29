"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
;
var ResolversAssembler = /** @class */ (function () {
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
//# sourceMappingURL=resolvers.assembler.js.map