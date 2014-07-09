define(['underscore'], function (_) {
    'use strict';
    var lenDef = function (get, set) {
        var f = function (a) {
            return get(a);
        };
        f.get = f;
        f.set = set;
        f.mod = function (f, a) {
            return set(f(get(a)), a);
        };

        f.andThen = function (lenBC) {
            return lenDef(
                _.compose(lenBC, f),
                function (c, a) {
                    return f.mod(function (b) {
                        return lenBC.set(c, b);
                    }, a);
                }
            );
        };
        f.compose = function (LenCA) {
            return LenCA.andThen(f);
        };
        return f;
    };
    var trivial = lenDef(
        function (a) {
            return undefined;
        },
        function (b, a) {
            return a;
        }
    );
    var selfLen = lenDef(
        function (a) {
            return a;
        },
        function (newa, a) {
            return newa;
        }
    );
    var fieldLen = function (fieldName) {
        return lenDef(
            function (a) {
                return a[fieldName];
            },
            function (b, a) {
                var extendO = {};
                extendO[fieldName] = b;
                return _.chain(a).clone().extend(extendO).value();
            }
        );
    };
    var inverseConditionSingle = function (boolFuncSingle) {
        return function (a) {
            return !boolFuncSingle(a);
        };
    };
    var listElementLen = function (matcher) {
        return lenDef(
            function (l) {
                return _.find(l, matcher);
            },
            function (e, l) {
                var filtered = _.chain(l).filter(inverseConditionSingle(matcher));
                if (_.isUndefined(e)) {
                    return filtered.value();
                } else {
                    return filtered.union([e]).value();
                }

            }
        );
    };
    var matcherFromLen = function (len) {
        return function (valueToMatch) {
            return function (state) {
                return len.get(state) === valueToMatch;
            };
        };
    };
    var multiListLen = function (matcher) {
        return lenDef(
            function (l) {
                return _.filter(l, matcher);
            },
            function (eList, l) {
                return _.chain(l).filter(inverseConditionSingle(matcher)).union(eList).value();
            }
        );
    };

    var multiMatcherFromLen = function (len) {
        return function (valuesToMatch) {
            return function (state) {
                return _.contains(valuesToMatch, len.get(state));
            };
        };
    };

    return {
        len: lenDef,
        trivial: trivial,
        selfLen: selfLen,
        fieldLen: fieldLen,
        listElementLen: listElementLen,
        matcherFromLen: matcherFromLen,
        multiListLen: multiListLen,
        multiMatcherFromLen: multiMatcherFromLen
    };
});