import { Field, TypeHint } from '@aws-sdk/client-rds-data';

type QueryTypingsValue = 'json' | 'decimal' | 'time' | 'timestamp' | 'uuid' | 'date' | 'none';

declare function getValueFromDataApi(row: Field): string | number | boolean | string[] | Uint8Array | null;
declare function typingsToAwsTypeHint(typings?: QueryTypingsValue): TypeHint | undefined;
declare function toValueParam(value: any, typings?: QueryTypingsValue): {
    value: Field;
    typeHint?: TypeHint;
};

export { getValueFromDataApi, toValueParam, typingsToAwsTypeHint };
