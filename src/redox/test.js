const isFunction = (functionToCheck) => {
    return (
        functionToCheck &&
        {}.toString.call(functionToCheck) === '[object Function]'
    );
};

const isObject = (variable) => {
    return Object.prototype.toString.call(variable) === '[object Object]';
};

class SchemaTest {
    constructor(type, validate, optional = false) {
        this.type = type;
        this._validate = validate;
        this._optional = optional;
    }

    validate(value) {
        if (this._optional) {
            return true;
        }
        const rep = this._validate(value);
        if (rep) {
            return true;
        }
        return false;
    }

    optional(optional = true) {
        this._optional = optional;
        return this;
    }
}

SchemaTest.create = ({type, validate, ...others} = {}) => {
    const schema = new SchemaTest(type, validate);
    for (const key in others) {
        schema[key] = others[key];
    }
    return schema;
};

// atomic
const SchemaTestNumber = () =>
    SchemaTest.create({
        type: 'number',
        validate: (value) => {
            return value && !Number.isNaN(value) && typeof value === 'number';
        },
    });
// atomic
const SchemaTestBoolean = () =>
    SchemaTest.create({
        type: 'number',
        validate: (value) => {
            return typeof value === 'boolean';
        },
    });
// atomic
const SchemaTestString = () =>
    SchemaTest.create({
        type: 'string',
        validate: (value) => {
            if (typeof value === 'string' || value instanceof String) {
                return true;
            } else {
                return false;
            }
        },
    });

const SchemaTestOr = (...args) => {
    return SchemaTest.create({
        type: 'or',
        validate: (value) => {
            let valid = false;
            for (let i = 0; i < args.length; i++) {
                if (args[i].validate(value)) {
                    valid = true;
                    break;
                }
            }
            return valid;
        },
        validateWithCheck: (value) => {},
    });
};

// OLD NAIVE
// const SchemaTestAnd = (...args) => {
//     return SchemaTest.create({
//         type: 'and',
//         validate: (value) => {
//             let valid = true;
//             for (let i = 0; i < args.length; i++) {
//                 if (!args[i].validate()) {
//                     valid = false;
//                     break;
//                 }
//             }
//             return valid;
//         },
//     });
// };
// TODO
const SchemaTestAnd = (...args) => {
    return SchemaTest.create({
        type: 'and',
        validate: (value) => {
            let valid = true;
            if (args.length === 0) {
                return false;
            }
            for (let i = 0; i < args.length; i++) {
                if (!args[i].validate()) {
                    valid = false;
                    break;
                }
            }
            return valid;
        },
        validateWithCheck: (value) => {
            let valid = true;
            if (args.length === 0) {
                return false;
            }
            // check if Record, or KV
            const kvOrRecord = ['record', 'kv'];
            const kvOrRecordSchema = args.filter((schema) =>
                kvOrRecord.includes(schema),
            );

            const notKvOrRecordSchema = args.filter(
                (schema) => !kvOrRecord.includes(schema),
            );

            if (kvOrRecordSchema.length === 0) {
            }

            for (let i = 0; i < args.length; i++) {
                if (!args[i].validate(value)) {
                    valid = false;
                    break;
                }
            }
            return valid;
        },
    });
};

const SchemaTestRecord = (k, v) => {
    return SchemaTest.create({
        type: 'record',
        validate: (value) => {
            if (!isObject(value)) {
                throw new Error('value must be an object');
            }
            if (Object.keys(value).length === 0) {
                return false;
            }
            let valid = true;
            for (const keyValue in value) {
                const valueValue = value[keyValue];
                if (!k.validate(keyValue) || !v.validate(valueValue)) {
                    valid = false;
                    break;
                }
            }
            return valid;
        },
        validateWithCheck: (value) => {
            if (!isObject(value)) {
                throw new Error('value must be an object');
            }
            if (Object.keys(value).length === 0) {
                return [false, []];
            }
            let valid = false;
            let bad = [];
            for (const keyValue in value) {
                const valueValue = value[keyValue];
                if (!k.validate(keyValue) || !v.validate(valueValue)) {
                    // break;
                    bad.push(keyValue);
                } else {
                    valid = true;
                }
            }
            return [valid, bad];
        },
    });
};
// atomic
const SchemaTestFunc = (params, returnType) => {
    return SchemaTest.create({
        type: 'function',
        validate: (value) => {
            return isFunction(value);
        },
    });
};

const SchemaTestArgs = (typed) => {
    return SchemaTest.create({
        type: 'args',
        validate: (value) => {
            let valid = true;
            for (const valueI in value) {
                if (!typed.validate(valueI)) {
                    valid = false;
                    break;
                }
            }
            return valid;
        },
    });
};

const SchemaTestKV = (k, v) => {
    return SchemaTest.create({
        type: 'kv',
        validate: (value) => {
            if (!isObject(value)) {
                throw new Error('value must be an object');
            }
            const kValidate = Object.keys(value).map((ki) => k.validate(ki));
            if (!kValidate.some(Boolean)) {
                return false;
            }
            const vValidate = Object.values(value)
                .filter((vi, i) => kValidate[i])
                .map((vi) => v.validate(vi));
            if (!vValidate.some(Boolean)) {
                return false;
            }

            if (vValidate.length > 1) {
                return false;
            }

            return true;
        },
        validateWithCheck: (value) => {
            if (!isObject(value)) {
                throw new Error('value must be an object');
            }
            const kValidate = Object.keys(value).map((ki) => k.validate(ki));
            if (!kValidate.some(Boolean)) {
                return [false, Object.keys(value)];
            }

            const vValidate = Object.values(value).map(
                (vi, i) => kValidate[i] && v.validate(vi),
            );
            if (!vValidate.some(Boolean)) {
                return [false, Object.keys(value)];
            }

            if (vValidate.length > 1) {
                const ii = vValidate.indexOf(true);
                const t = Object.keys(value);
                t.splice(ii, 1);
                return [true, t];
            }

            return [true, []];
        },
    });
};

const SchemaTestObject = (obj) => {
    return SchemaTest.create({
        type: 'object',
        validate: (value) => {
            if (!isObject(value) || !isObject(obj)) {
                return false;
            }
            let valid = true;
            const valueKeys = Object.keys(value);

            for (const keyValue in obj) {
                const valueValue = obj[keyValue];
                if (
                    (!(keyValue in value) && !valueValue._optional) ||
                    (keyValue in value && !valueValue.validate(value[keyValue]))
                ) {
                    valid = false;
                    break;
                } else {
                    const index = valueKeys.indexOf(keyValue);
                    if (index > -1) {
                        valueKeys.splice(index, 1);
                    }
                }
            }

            if (valid && valueKeys.length > 0) {
                return false;
            }
            return valid;
        },
        validateWithCheck: (value) => {
            if (!isObject(value) || !isObject(obj)) {
                throw new Error('value and obj not object');
            }
            let valid = false;
            const valueKeys = Object.keys(value);

            for (const keyValue in obj) {
                const valueValue = obj[keyValue];
                if (
                    (!(keyValue in value) && !valueValue._optional) ||
                    (keyValue in value && !valueValue.validate(value[keyValue]))
                ) {
                    const a = 'rien';
                    // break;
                } else {
                    const index = valueKeys.indexOf(keyValue);
                    if (index > -1) {
                        valid = true;
                        valueKeys.splice(index, 1);
                    }
                }
            }

            // if (valid && valueKeys.length > 0) {
            //     return [true, valueKeys];
            // }
            return [valid, valueKeys];
        },
    });
};
// atomic
const SchemaTestUnknown = () =>
    SchemaTest.create({
        type: 'unknown',
        validate: (value) => {
            return true;
        },
    });

SchemaTest.String = SchemaTestString;
SchemaTest.Number = SchemaTestNumber;
SchemaTest.Or = SchemaTestOr;
SchemaTest.Record = SchemaTestRecord;
SchemaTest.Object = SchemaTestObject;
SchemaTest.KV = SchemaTestKV;
SchemaTest.Func = SchemaTestFunc;
SchemaTest.And = SchemaTestAnd;
SchemaTest.Args = SchemaTestArgs;
SchemaTest.Unknown = SchemaTestUnknown;
SchemaTest.Boolean = SchemaTestBoolean;

const RecordX = (typeX) =>
    SchemaTest.Record(
        SchemaTest.Or(SchemaTest.String(), SchemaTest.Number()),
        typeX,
    );

const FN = SchemaTest.Func(
    SchemaTest.Args(SchemaTest.Unknown()),
    SchemaTest.Unknown(),
);

const RecordObj = RecordX(FN);

const RecordAny = RecordX(SchemaTest.Unknown());

const ActionWithName = SchemaTest.And(
    SchemaTestObject({
        name: SchemaTest.String(),
    }),
    SchemaTest.KV(SchemaTest.String(), FN),
);

const Actions = SchemaTest.Or(RecordObj, RecordX(ActionWithName));

const Fu = SchemaTestObject({
    f: FN.optional(),
    fulfilled: FN.optional(),
    r: FN.optional(),
    reject: FN.optional(),
    p: FN.optional(),
    pending: FN.optional(),
});

////

const SliceOnlyFulfiled = RecordX(FN);

const SliceAll = RecordX(Fu);

// //

const SliceAllAndOnlyFulfilled = SchemaTest.Or(SliceOnlyFulfiled, SliceAll); // & TypeAllAndOnlyFulfilled;

const SliceNamespace = RecordX(SliceAllAndOnlyFulfilled); //& TypeNamespace;
// ///

const SliceOpts = SchemaTest.Object({
    initialState: RecordAny.optional(),
    noPrefix: SchemaTest.Boolean().optional(),
    prefix: SchemaTest.String().optional(),
});

const Slice = SchemaTest.And(
    SliceOpts,
    SchemaTest.Or(SliceAllAndOnlyFulfilled, SliceNamespace),
);

const OptionsCreateActions = SchemaTest.Object({
    actions: Actions,
    slice: Slice,
    name: SchemaTest.String().optional(),
});

/////////

const getMe = async ({api}) => {
    const res = await api.get('me/');
    return res.data;
};

const me = () => ({
    [getMe.name]: (state, {payload}) => {
        state.data = payload;
    },
});
const actions = {getMe};
const acc = {actions, slice: me};
