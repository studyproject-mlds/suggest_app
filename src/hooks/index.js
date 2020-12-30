export {useApp} from './useApp';

import React from 'react';
import _ from 'lodash';

function deepCompareEquals(a, b) {
    // TODO: implement deep comparison here
    // something like lodash
    return _.isEqual(a, b);
}

// function compareIds(a, b) {
//     if (a?.length !== b?.length) return false;
//     // TODO: implement deep comparison here
//     // something like lodash
//     return deepCompareEquals(
//         a?.map((i) => i?.id),
//         b?.map((i) => i?.id),
//     );
// }

// function compareId(a, b) {
//     // TODO: implement deep comparison here
//     // something like lodash
//     return a?.id === b?.id;
// }

// function useDeepCompareMemoize(value) {
//     const ref = React.useRef();
//     // it can be done by using useMemo as well
//     // but useRef is rather cleaner and easier

//     console.log('compare ', value, ref.current);

//     if (!compareIds(value, ref.current)) {
//         ref.current = value;
//     }

//     return ref.current;
// }

// export function useDeepCompareEffect(callback, dependencies) {
//     console.log(dependencies);
//     React.useEffect(callback, dependencies.map(useDeepCompareMemoize));
// }

function checkDeps(deps) {
    if (!deps || !deps.length) {
        throw new Error(
            'useDeepCompareEffect should not be used with no dependencies. Use React.useEffect instead.',
        );
    }
    if (deps.every(isPrimitive)) {
        throw new Error(
            'useDeepCompareEffect should not be used with dependencies that are all primitive values. Use React.useEffect instead.',
        );
    }
}

function isPrimitive(val) {
    return val == null || /^[sbn]/.test(typeof val);
}

function useDeepCompareMemoize(value) {
    const ref = React.useRef();
    const signalRef = React.useRef(0);

    if (!deepCompareEquals(value, ref.current)) {
        ref.current = value;
        signalRef.current += 1;
    }

    return [signalRef.current];
}

export function useDeepCompareEffect(callback, dependencies) {
    // if (process.env.NODE_ENV !== 'production') {
    //     checkDeps(dependencies);
    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    return React.useEffect(callback, useDeepCompareMemoize(dependencies));
}
