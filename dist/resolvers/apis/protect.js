"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _1 = require("./");
exports.protect = function (_a) {
    var it = _a.it, all = _a.all, using = _a.using;
    if (it) {
        return _1.chain(using.concat([it]));
    }
    else if (all) {
        return _1.apply({ resolvers: using, to: all });
    }
    throw new Error("Invalid arguments: should be an object of shape\n  {\n    it?: ResolverFunction<R>\n    all?: ResolversMap\n    using: Resolvers\n  }");
};
//# sourceMappingURL=protect.js.map