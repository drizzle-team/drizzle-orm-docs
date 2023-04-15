type Update<T, TUpdate> = Simplify<Omit<T, keyof TUpdate> & TUpdate>;
/**
@see Simplify
*/
interface SimplifyOptions {
    /**
    Do the simplification recursively.

    @default false
    */
    deep?: boolean;
}
type Flatten<AnyType, Options extends SimplifyOptions = {}> = Options['deep'] extends true ? {
    [KeyType in keyof AnyType]: Simplify<AnyType[KeyType], Options>;
} : {
    [KeyType in keyof AnyType]: AnyType[KeyType];
};
/**
Useful to flatten the type output to improve type hints shown in editors. And also to transform an interface into a type to aide with assignability.

@example
```
import type {Simplify} from 'type-fest';

type PositionProps = {
    top: number;
    left: number;
};

type SizeProps = {
    width: number;
    height: number;
};

// In your editor, hovering over `Props` will show a flattened object with all the properties.
type Props = Simplify<PositionProps & SizeProps>;
```

Sometimes it is desired to pass a value as a function argument that has a different type. At first inspection it may seem assignable, and then you discover it is not because the `value`'s type definition was defined as an interface. In the following example, `fn` requires an argument of type `Record<string, unknown>`. If the value is defined as a literal, then it is assignable. And if the `value` is defined as type using the `Simplify` utility the value is assignable.  But if the `value` is defined as an interface, it is not assignable because the interface is not sealed and elsewhere a non-string property could be added to the interface.

If the type definition must be an interface (perhaps it was defined in a third-party npm package), then the `value` can be defined as `const value: Simplify<SomeInterface> = ...`. Then `value` will be assignable to the `fn` argument.  Or the `value` can be cast as `Simplify<SomeInterface>` if you can't re-declare the `value`.

@example
```
import type {Simplify} from 'type-fest';

interface SomeInterface {
    foo: number;
    bar?: string;
    baz: number | undefined;
}

type SomeType = {
    foo: number;
    bar?: string;
    baz: number | undefined;
};

const literal = {foo: 123, bar: 'hello', baz: 456};
const someType: SomeType = literal;
const someInterface: SomeInterface = literal;

function fn(object: Record<string, unknown>): void {}

fn(literal); // Good: literal object type is sealed
fn(someType); // Good: type is sealed
fn(someInterface); // Error: Index signature for type 'string' is missing in type 'someInterface'. Because `interface` can be re-opened
fn(someInterface as Simplify<SomeInterface>); // Good: transform an `interface` into a `type`
```

@link https://github.com/microsoft/TypeScript/issues/15300

@category Object
*/
type Simplify<AnyType, Options extends SimplifyOptions = {}> = Flatten<AnyType> extends AnyType ? Flatten<AnyType, Options> : AnyType;
type Assume<T, U> = T extends U ? T : U;
type Equal<X, Y> = (<T>() => T extends X ? 1 : 2) extends (<T>() => T extends Y ? 1 : 2) ? true : false;
type Writable<T> = {
    -readonly [P in keyof T]: T[P];
};

interface TableConfig$1<TColumn extends AnyColumn = AnyColumn> {
    name: string;
    schema: string | undefined;
    columns: Record<string, TColumn>;
}
type UpdateTableConfig<T extends TableConfig$1, TUpdate extends Partial<TableConfig$1>> = Required<Update<T, TUpdate>>;
declare class Table<T extends TableConfig$1 = TableConfig$1> {
    readonly _: {
        readonly brand: 'Table';
        readonly config: T;
        readonly name: T['name'];
        readonly schema: T['schema'];
        readonly columns: T['columns'];
        readonly model: {
            select: InferModel<Table<T>>;
            insert: InferModel<Table<T>, 'insert'>;
        };
    };
    constructor(name: string, schema?: string);
}
type AnyTable<TPartial extends Partial<TableConfig$1> = {}> = Table<UpdateTableConfig<TableConfig$1, TPartial>>;
type MapColumnName<TName extends string, TColumn extends AnyColumn, TDBColumNames extends boolean> = TDBColumNames extends true ? TColumn['_']['name'] : TName;
type InferModel<TTable extends AnyTable, TInferMode extends 'select' | 'insert' = 'select', TConfig extends {
    dbColumnNames: boolean;
} = {
    dbColumnNames: false;
}> = TInferMode extends 'insert' ? Simplify<{
    [Key in keyof TTable['_']['columns'] & string as RequiredKeyOnly<MapColumnName<Key, TTable['_']['columns'][Key], TConfig['dbColumnNames']>, TTable['_']['columns'][Key]>]: GetColumnData<TTable['_']['columns'][Key], 'query'>;
} & {
    [Key in keyof TTable['_']['columns'] & string as OptionalKeyOnly<MapColumnName<Key, TTable['_']['columns'][Key], TConfig['dbColumnNames']>, TTable['_']['columns'][Key]>]?: GetColumnData<TTable['_']['columns'][Key], 'query'>;
}> : {
    [Key in keyof TTable['_']['columns'] & string as MapColumnName<Key, TTable['_']['columns'][Key], TConfig['dbColumnNames']>]: GetColumnData<TTable['_']['columns'][Key], 'query'>;
};

type RequiredKeyOnly<TKey extends string, T extends AnyColumn> = T extends AnyColumn<{
    notNull: true;
    hasDefault: false;
}> ? TKey : never;
type OptionalKeyOnly<TKey extends string, T extends AnyColumn> = TKey extends RequiredKeyOnly<TKey, T> ? never : TKey;
type SelectedFieldsFlat<TColumn extends AnyColumn> = Record<string, TColumn | SQL | SQL.Aliased>;
type SelectedFields<TColumn extends AnyColumn, TTable extends Table> = Record<string, SelectedFieldsFlat<TColumn>[string] | TTable | SelectedFieldsFlat<TColumn>>;

declare abstract class View<TName extends string = string, TExisting extends boolean = boolean, TSelection = unknown> {
    _: {
        brand: 'View';
        viewBrand: string;
        name: TName;
        existing: TExisting;
        selectedFields: TSelection;
    };
    constructor({ name, schema, selectedFields, query }: {
        name: TName;
        schema: string | undefined;
        selectedFields: SelectedFields<AnyColumn, Table>;
        query: SQL | undefined;
    });
}

declare class Subquery<TAlias extends string = string, TSelectedFields = unknown> {
    _: {
        brand: 'Subquery';
        selectedFields: TSelectedFields;
        alias: TAlias;
    };
    constructor(sql: SQL, selection: SelectedFields<AnyColumn, Table>, alias: string, isWith?: boolean);
}

interface BuildQueryConfig {
    escapeName(name: string): string;
    escapeParam(num: number, value: unknown): string;
    escapeString(str: string): string;
    prepareTyping?: (encoder: DriverValueEncoder<unknown, unknown>) => QueryTypingsValue;
    paramStartIndex?: {
        value: number;
    };
    inlineParams?: boolean;
}
type QueryTypingsValue = 'json' | 'decimal' | 'time' | 'timestamp' | 'uuid' | 'date' | 'none';
interface Query {
    sql: string;
    params: unknown[];
    typings?: QueryTypingsValue[];
}
interface SQLWrapper {
    getSQL(): SQL;
}
declare class StringChunk {
    readonly value: string[];
    constructor(value: string | string[]);
}
type GetDecoderResult<T> = T extends DriverValueDecoder<infer TData, any> | DriverValueDecoder<infer TData, any>['mapFromDriverValue'] ? TData : never;
/**
 * Any DB name (table, column, index etc.)
 */
declare class Name {
    readonly value: string;
    protected brand: 'Name';
    constructor(value: string);
}
interface DriverValueDecoder<TData, TDriverParam> {
    mapFromDriverValue(value: TDriverParam): TData;
}
interface DriverValueEncoder<TData, TDriverParam> {
    mapToDriverValue(value: TData): TDriverParam | SQL;
}
interface DriverValueMapper<TData, TDriverParam> extends DriverValueDecoder<TData, TDriverParam>, DriverValueEncoder<TData, TDriverParam> {
}
/** Parameter value that is optionally bound to an encoder (for example, a column). */
declare class Param<TDataType = unknown, TDriverParamType = TDataType> {
    readonly value: TDataType;
    readonly encoder: DriverValueEncoder<TDataType, TDriverParamType>;
    protected brand: 'BoundParamValue';
    /**
     * @param value - Parameter value
     * @param encoder - Encoder to convert the value to a driver parameter
     */
    constructor(value: TDataType, encoder?: DriverValueEncoder<TDataType, TDriverParamType>);
}
type SQLChunk = StringChunk | SQLChunk[] | SQLWrapper | SQL | Table | View | Subquery | AnyColumn | Param | Name | undefined | FakePrimitiveParam | Placeholder;
declare class SQL<T = unknown> implements SQLWrapper {
    readonly queryChunks: SQLChunk[];
    _: {
        brand: 'SQL';
        type: T;
    };
    private shouldInlineParams;
    constructor(queryChunks: SQLChunk[]);
    append(query: SQL): this;
    toQuery(config: BuildQueryConfig): Query;
    buildQueryFromSourceParams(chunks: SQLChunk[], _config: BuildQueryConfig): Query;
    private mapInlineParam;
    getSQL(): SQL;
    as(alias: string): SQL.Aliased<T>;
    /**
     * @deprecated
     * Use ``sql<DataType>`query`.as(alias)`` instead.
     */
    as<TData>(): SQL<TData>;
    /**
     * @deprecated
     * Use ``sql<DataType>`query`.as(alias)`` instead.
     */
    as<TData>(alias: string): SQL.Aliased<TData>;
    mapWith<TDecoder extends DriverValueDecoder<any, any> | DriverValueDecoder<any, any>['mapFromDriverValue']>(decoder: TDecoder): SQL<GetDecoderResult<TDecoder>>;
    inlineParams(): this;
}
declare namespace SQL {
    class Aliased<T = unknown> implements SQLWrapper {
        readonly sql: SQL;
        readonly fieldAlias: string;
        _: {
            brand: 'SQL.Aliased';
            type: T;
        };
        constructor(sql: SQL, fieldAlias: string);
        getSQL(): SQL;
    }
}
declare class Placeholder<TName extends string = string, TValue = any> {
    readonly name: TName;
    protected: TValue;
    constructor(name: TName);
}

interface ColumnBuilderBaseConfig {
    name: string;
    data: unknown;
    driverParam: unknown;
    notNull: boolean;
    hasDefault: boolean;
}
interface ColumnBuilderHKTBase {
    config: unknown;
    _type: unknown;
    _columnHKT: unknown;
}
type ColumnBuilderKind<THKT extends ColumnBuilderHKTBase, TConfig extends ColumnBuilderBaseConfig> = (THKT & {
    config: TConfig;
})['_type'];
interface ColumnBuilderHKT extends ColumnBuilderHKTBase {
    _type: ColumnBuilder<ColumnBuilderHKT, Assume<this['config'], ColumnBuilderBaseConfig>>;
}
interface ColumnBuilderRuntimeConfig<TData> {
    name: string;
    notNull: boolean;
    default: TData | SQL | undefined;
    hasDefault: boolean;
    primaryKey: boolean;
}
declare abstract class ColumnBuilder<THKT extends ColumnBuilderHKTBase, T extends ColumnBuilderBaseConfig, TRuntimeConfig extends object = {}, TTypeConfig extends object = {}> {
    _: {
        brand: 'ColumnBuilder';
        config: T;
        hkt: THKT;
        columnHKT: THKT['_columnHKT'];
        name: T['name'];
        data: T['data'];
        driverParam: T['driverParam'];
        notNull: T['notNull'];
        hasDefault: T['hasDefault'];
    } & TTypeConfig;
    protected config: ColumnBuilderRuntimeConfig<T['data']> & TRuntimeConfig;
    constructor(name: T['name']);
    $type<TType extends T['data']>(): ColumnBuilderKind<THKT, Update<T, {
        data: TType;
    }>>;
    notNull(): ColumnBuilderKind<THKT, UpdateCBConfig<T, {
        notNull: true;
    }>>;
    default(value: T['data'] | SQL): ColumnBuilderKind<THKT, UpdateCBConfig<T, {
        hasDefault: true;
    }>>;
    primaryKey(): ColumnBuilderKind<THKT, UpdateCBConfig<T, {
        notNull: true;
    }>>;
}
type AnyColumnBuilder = ColumnBuilder<ColumnBuilderHKT, ColumnBuilderBaseConfig>;
type UpdateCBConfig<T extends ColumnBuilderBaseConfig, TUpdate extends Partial<ColumnBuilderBaseConfig>> = Update<T, TUpdate>;
type BuildColumn<TTableName extends string, TBuilder extends AnyColumnBuilder> = Assume<ColumnKind<Assume<TBuilder['_']['columnHKT'], ColumnHKTBase>, Simplify<{
    tableName: TTableName;
} & TBuilder['_']['config']>>, AnyColumn>;

interface ColumnBaseConfig extends ColumnBuilderBaseConfig {
    tableName: string;
}
interface ColumnHKTBase {
    config: unknown;
    _type: unknown;
}
type ColumnKind<T extends ColumnHKTBase, TConfig extends ColumnBaseConfig> = (T & {
    config: TConfig;
})['_type'];
interface ColumnHKT extends ColumnHKTBase {
    _type: Column<ColumnHKT, Assume<this['config'], ColumnBaseConfig>>;
}
declare abstract class Column<THKT extends ColumnHKTBase, T extends ColumnBaseConfig, TRuntimeConfig extends object = {}, TTypeConfig extends object = {}> implements DriverValueMapper<T['data'], T['driverParam']> {
    readonly table: Table;
    _: {
        hkt: THKT;
        brand: 'Column';
        config: T;
        tableName: T['tableName'];
        name: T['name'];
        data: T['data'];
        driverParam: T['driverParam'];
        notNull: T['notNull'];
        hasDefault: T['hasDefault'];
    } & TTypeConfig;
    readonly name: string;
    readonly primary: boolean;
    readonly notNull: boolean;
    readonly default: T['data'] | SQL | undefined;
    readonly hasDefault: boolean;
    protected config: ColumnBuilderRuntimeConfig<T['data']> & TRuntimeConfig;
    constructor(table: Table, config: ColumnBuilderRuntimeConfig<T['data']> & TRuntimeConfig);
    abstract getSQLType(): string;
    mapFromDriverValue(value: T['driverParam']): T['data'];
    mapToDriverValue(value: T['data']): T['driverParam'];
}
type AnyColumn<TPartial extends Partial<ColumnBaseConfig> = {}> = Column<ColumnHKT, Required<Update<ColumnBaseConfig, TPartial>>>;
type GetColumnData<TColumn extends AnyColumn, TInferMode extends 'query' | 'raw' = 'query'> = TInferMode extends 'raw' ? TColumn['_']['data'] : TColumn['_']['notNull'] extends true ? TColumn['_']['data'] : TColumn['_']['data'] | null;

type UpdateDeleteAction = 'cascade' | 'restrict' | 'no action' | 'set null' | 'set default';

interface ReferenceConfig {
    ref: () => AnyPgColumn;
    actions: {
        onUpdate?: UpdateDeleteAction;
        onDelete?: UpdateDeleteAction;
    };
}
interface PgColumnBuilderHKT extends ColumnBuilderHKTBase {
    _type: PgColumnBuilder<PgColumnBuilderHKT, Assume<this['config'], ColumnBuilderBaseConfig>>;
    _columnHKT: PgColumnHKT;
}
interface PgColumnHKT extends ColumnHKTBase {
    _type: PgColumn<PgColumnHKT, Assume<this['config'], ColumnBaseConfig>>;
}
declare abstract class PgColumnBuilder<THKT extends ColumnBuilderHKTBase, T extends ColumnBuilderBaseConfig, TRuntimeConfig extends object = {}, TTypeConfig extends object = {}> extends ColumnBuilder<THKT, T, TRuntimeConfig, TTypeConfig & {
    pgBrand: 'PgColumnBuilder';
}> {
    private foreignKeyConfigs;
    array(size?: number): PgArrayBuilder<{
        name: NonNullable<T['name']>;
        notNull: NonNullable<T['notNull']>;
        hasDefault: NonNullable<T['hasDefault']>;
        data: T['data'][];
        driverParam: T['driverParam'][] | string;
    }>;
    references(ref: ReferenceConfig['ref'], actions?: ReferenceConfig['actions']): this;
}
declare abstract class PgColumn<THKT extends ColumnHKTBase, T extends ColumnBaseConfig, TRuntimeConfig extends object = {}, TTypeConfig extends object = {}> extends Column<THKT, T, TRuntimeConfig, TTypeConfig & {
    pgBrand: 'PgColumn';
}> {
}
type AnyPgColumn<TPartial extends Partial<ColumnBaseConfig> = {}> = PgColumn<PgColumnHKT, Required<Update<ColumnBaseConfig, TPartial>>>;

type TableConfig = TableConfig$1<AnyPgColumn>;
declare class PgTable<T extends TableConfig> extends Table<T> {
}
type AnyPgTable<TPartial extends Partial<TableConfig> = {}> = PgTable<UpdateTableConfig<TableConfig, TPartial>>;

interface PgArrayBuilderHKT extends ColumnBuilderHKTBase {
    _type: PgArrayBuilder<Assume<this['config'], ColumnBuilderBaseConfig>>;
    _columnHKT: PgArrayHKT;
}
interface PgArrayHKT extends ColumnHKTBase {
    _type: PgArray<Assume<this['config'], ColumnBaseConfig>>;
}
declare class PgArrayBuilder<T extends ColumnBuilderBaseConfig> extends PgColumnBuilder<PgArrayBuilderHKT, T, {
    baseBuilder: PgColumnBuilder<PgColumnBuilderHKT, {
        name: T['name'];
        notNull: T['notNull'];
        hasDefault: T['hasDefault'];
        data: Assume<T['data'], unknown[]>[number];
        driverParam: Assume<T['driverParam'], unknown[]>[number];
    }>;
    size: number | undefined;
}> {
    constructor(name: string, baseBuilder: PgArrayBuilder<T>['config']['baseBuilder'], size: number | undefined);
}
declare class PgArray<T extends ColumnBaseConfig> extends PgColumn<PgArrayHKT, T, {}, {
    baseColumn: BuildColumn<string, Assume<PgColumnBuilder<PgColumnBuilderHKT, {
        name: T['name'];
        notNull: T['notNull'];
        hasDefault: T['hasDefault'];
        data: Assume<T['data'], unknown[]>[number];
        driverParam: Assume<T['driverParam'], unknown[]>[number];
    }>, AnyColumnBuilder>>;
}> {
    readonly baseColumn: AnyPgColumn;
    readonly range?: [number | undefined, number | undefined] | undefined;
    protected $pgColumnBrand: 'PgArray';
    readonly size: number | undefined;
    constructor(table: AnyPgTable<{
        name: T['tableName'];
    }>, config: PgArrayBuilder<T>['config'], baseColumn: AnyPgColumn, range?: [number | undefined, number | undefined] | undefined);
    getSQLType(): string;
    mapFromDriverValue(value: unknown[] | string): T['data'];
    mapToDriverValue(value: unknown[]): string;
}

interface PgBigInt53BuilderHKT extends ColumnBuilderHKTBase {
    _type: PgBigInt53Builder<Assume<this['config'], ColumnBuilderBaseConfig>>;
    _columnHKT: PgBigInt53HKT;
}
interface PgBigInt53HKT extends ColumnHKTBase {
    _type: PgBigInt53<Assume<this['config'], ColumnBaseConfig>>;
}
type PgBigInt53BuilderInitial<TName extends string> = PgBigInt53Builder<{
    name: TName;
    data: number;
    driverParam: number | string;
    notNull: false;
    hasDefault: false;
}>;
declare class PgBigInt53Builder<T extends ColumnBuilderBaseConfig> extends PgColumnBuilder<PgBigInt53BuilderHKT, T> {
}
declare class PgBigInt53<T extends ColumnBaseConfig> extends PgColumn<PgBigInt53HKT, T> {
    getSQLType(): string;
    mapFromDriverValue(value: number | string): number;
}
interface PgBigInt64BuilderHKT extends ColumnBuilderHKTBase {
    _type: PgBigInt64Builder<Assume<this['config'], ColumnBuilderBaseConfig>>;
    _columnHKT: PgBigInt64HKT;
}
interface PgBigInt64HKT extends ColumnHKTBase {
    _type: PgBigInt64<Assume<this['config'], ColumnBaseConfig>>;
}
type PgBigInt64BuilderInitial<TName extends string> = PgBigInt64Builder<{
    name: TName;
    data: bigint;
    driverParam: string;
    notNull: false;
    hasDefault: false;
}>;
declare class PgBigInt64Builder<T extends ColumnBuilderBaseConfig> extends PgColumnBuilder<PgBigInt64BuilderHKT, T> {
}
declare class PgBigInt64<T extends ColumnBaseConfig> extends PgColumn<PgBigInt64HKT, T> {
    getSQLType(): string;
    mapFromDriverValue(value: string): bigint;
}
interface PgBigIntConfig<T extends 'number' | 'bigint' = 'number' | 'bigint'> {
    mode: T;
}
declare function bigint<TName extends string, TMode extends PgBigIntConfig['mode']>(name: TName, config: PgBigIntConfig<TMode>): TMode extends 'number' ? PgBigInt53BuilderInitial<TName> : PgBigInt64BuilderInitial<TName>;

interface PgBigSerial53BuilderHKT extends ColumnBuilderHKTBase {
    _type: PgBigSerial53Builder<Assume<this['config'], ColumnBuilderBaseConfig>>;
    _columnHKT: PgBigSerial53HKT;
}
interface PgBigSerial53HKT extends ColumnHKTBase {
    _type: PgBigSerial53<Assume<this['config'], ColumnBaseConfig>>;
}
type PgBigSerial53BuilderInitial<TName extends string> = PgBigSerial53Builder<{
    name: TName;
    data: number;
    driverParam: number;
    notNull: true;
    hasDefault: true;
}>;
declare class PgBigSerial53Builder<T extends ColumnBuilderBaseConfig> extends PgColumnBuilder<PgBigSerial53BuilderHKT, T> {
    constructor(name: string);
}
declare class PgBigSerial53<T extends ColumnBaseConfig> extends PgColumn<PgBigSerial53HKT, T> {
    getSQLType(): string;
    mapFromDriverValue(value: number): number;
}
interface PgBigSerial64BuilderHKT extends ColumnBuilderHKTBase {
    _type: PgBigSerial64Builder<Assume<this['config'], ColumnBuilderBaseConfig>>;
    _columnHKT: PgBigSerial64HKT;
}
interface PgBigSerial64HKT extends ColumnHKTBase {
    _type: PgBigSerial64<Assume<this['config'], ColumnBaseConfig>>;
}
type PgBigSerial64BuilderInitial<TName extends string> = PgBigSerial64Builder<{
    name: TName;
    data: bigint;
    driverParam: string;
    notNull: true;
    hasDefault: true;
}>;
declare class PgBigSerial64Builder<T extends ColumnBuilderBaseConfig> extends PgColumnBuilder<PgBigSerial64BuilderHKT, T> {
    constructor(name: string);
}
declare class PgBigSerial64<T extends ColumnBaseConfig> extends PgColumn<PgBigSerial64HKT, T> {
    getSQLType(): string;
    mapFromDriverValue(value: string): bigint;
}
interface PgBigSerialConfig<T extends 'number' | 'bigint' = 'number' | 'bigint'> {
    mode: T;
}
declare function bigserial<TName extends string, TMode extends PgBigSerialConfig['mode']>(name: TName, config: PgBigSerialConfig<TMode>): TMode extends 'number' ? PgBigSerial53BuilderInitial<TName> : PgBigSerial64BuilderInitial<TName>;

interface PgBooleanBuilderHKT extends ColumnBuilderHKTBase {
    _type: PgBooleanBuilder<Assume<this['config'], ColumnBuilderBaseConfig>>;
    _columnHKT: PgBooleanHKT;
}
interface PgBooleanHKT extends ColumnHKTBase {
    _type: PgBoolean<Assume<this['config'], ColumnBaseConfig>>;
}
type PgBooleanBuilderInitial<TName extends string> = PgBooleanBuilder<{
    name: TName;
    data: boolean;
    driverParam: boolean;
    notNull: false;
    hasDefault: false;
}>;
declare class PgBooleanBuilder<T extends ColumnBuilderBaseConfig> extends PgColumnBuilder<PgBooleanBuilderHKT, T> {
}
declare class PgBoolean<T extends ColumnBaseConfig> extends PgColumn<PgBooleanHKT, T> {
    getSQLType(): string;
}
declare function boolean<TName extends string>(name: TName): PgBooleanBuilderInitial<TName>;

interface PgCharBuilderHKT extends ColumnBuilderHKTBase {
    _type: PgCharBuilder<Assume<this['config'], ColumnBuilderBaseConfig>>;
    _columnHKT: PgCharHKT;
}
interface PgCharHKT extends ColumnHKTBase {
    _type: PgChar<Assume<this['config'], ColumnBaseConfig>>;
}
type PgCharBuilderInitial<TName extends string, TEnum extends string[]> = PgCharBuilder<{
    name: TName;
    data: TEnum[number];
    enum: TEnum;
    driverParam: string;
    notNull: false;
    hasDefault: false;
}>;
declare class PgCharBuilder<T extends ColumnBuilderBaseConfig> extends PgColumnBuilder<PgCharBuilderHKT, T, {
    length: number | undefined;
    enum: string[];
}> {
    constructor(name: string, length?: number);
}
declare class PgChar<T extends ColumnBaseConfig> extends PgColumn<PgCharHKT, T> {
    readonly length: number | undefined;
    readonly enum: string[];
    constructor(table: AnyPgTable<{
        name: T['tableName'];
    }>, config: PgCharBuilder<T>['config']);
    getSQLType(): string;
}
interface PgCharConfig<TEnum extends string[]> {
    length?: number;
    enum?: TEnum;
}
declare function char<TName extends string, U extends string, T extends Readonly<[U, ...U[]]>>(name: TName, config?: PgCharConfig<Writable<T>>): PgCharBuilderInitial<TName, Writable<T>>;

interface PgCidrBuilderHKT extends ColumnBuilderHKTBase {
    _type: PgCidrBuilder<Assume<this['config'], ColumnBuilderBaseConfig>>;
    _columnHKT: PgCidrHKT;
}
interface PgCidrHKT extends ColumnHKTBase {
    _type: PgCidr<Assume<this['config'], ColumnBaseConfig>>;
}
type PgCidrBuilderInitial<TName extends string> = PgCidrBuilder<{
    name: TName;
    data: string;
    driverParam: string;
    notNull: false;
    hasDefault: false;
}>;
declare class PgCidrBuilder<T extends ColumnBuilderBaseConfig> extends PgColumnBuilder<PgCidrBuilderHKT, T> {
}
declare class PgCidr<T extends ColumnBaseConfig> extends PgColumn<PgCidrHKT, T> {
    getSQLType(): string;
}
declare function cidr<TName extends string>(name: TName): PgCidrBuilderInitial<TName>;

type ConvertCustomConfig<TName extends string, T extends Partial<CustomTypeValues>> = Simplify<{
    name: TName;
    data: T['data'];
    driverParam: T['driverData'];
    notNull: T['notNull'] extends true ? true : false;
    hasDefault: T['default'] extends true ? true : false;
}>;
interface PgCustomColumnInnerConfig {
    customTypeValues: CustomTypeValues;
}
interface PgCustomColumnBuilderHKT extends ColumnBuilderHKTBase {
    _type: PgCustomColumnBuilder<Assume<this['config'], ColumnBuilderBaseConfig>>;
    _columnHKT: PgCustomColumnHKT;
}
interface PgCustomColumnHKT extends ColumnHKTBase {
    _type: PgCustomColumn<Assume<this['config'], ColumnBaseConfig>>;
}
declare class PgCustomColumnBuilder<T extends ColumnBuilderBaseConfig> extends PgColumnBuilder<PgCustomColumnBuilderHKT, T, {
    fieldConfig: CustomTypeValues['config'];
    customTypeParams: CustomTypeParams<any>;
}, {
    pgColumnBuilderBrand: 'PgCustomColumnBuilderBrand';
}> {
    constructor(name: T['name'], fieldConfig: CustomTypeValues['config'], customTypeParams: CustomTypeParams<any>);
}
declare class PgCustomColumn<T extends ColumnBaseConfig> extends PgColumn<PgCustomColumnHKT, T> {
    protected $pgColumnBrand: 'PgCustomColumn';
    private sqlName;
    private mapTo?;
    private mapFrom?;
    constructor(table: AnyPgTable<{
        name: T['tableName'];
    }>, config: PgCustomColumnBuilder<T>['config']);
    getSQLType(): string;
    mapFromDriverValue(value: T['driverParam']): T['data'];
    mapToDriverValue(value: T['data']): T['driverParam'];
}
type CustomTypeValues = {
    /**
     * Required type for custom column, that will infer proper type model
     *
     * Examples:
     *
     * If you want your column to be `string` type after selecting/or on inserting - use `data: string`. Like `text`, `varchar`
     *
     * If you want your column to be `number` type after selecting/or on inserting - use `data: number`. Like `integer`
     */
    data: unknown;
    /**
     * Type helper, that represents what type database driver is accepting for specific database data type
     */
    driverData?: unknown;
    /**
     * What config type should be used for {@link CustomTypeParams} `dataType` generation
     */
    config?: unknown;
    /**
     * Whether the config argument should be required or not
     * @default false
     */
    configRequired?: boolean;
    /**
     * If your custom data type should be notNull by default you can use `notNull: true`
     *
     * @example
     * const customSerial = customType<{ data: number, notNull: true, default: true }>({
     * 	  dataType() {
     * 	    return 'serial';
     *    },
     * });
     */
    notNull?: boolean;
    /**
     * If your custom data type has default you can use `default: true`
     *
     * @example
     * const customSerial = customType<{ data: number, notNull: true, default: true }>({
     * 	  dataType() {
     * 	    return 'serial';
     *    },
     * });
     */
    default?: boolean;
};
interface CustomTypeParams<T extends CustomTypeValues> {
    /**
     * Database data type string representation, that is used for migrations
     * @example
     * ```
     * `jsonb`, `text`
     * ```
     *
     * If database data type needs additional params you can use them from `config` param
     * @example
     * ```
     * `varchar(256)`, `numeric(2,3)`
     * ```
     *
     * To make `config` be of specific type please use config generic in {@link CustomTypeValues}
     *
     * @example
     * Usage example
     * ```
     *   dataType() {
     *     return 'boolean';
     *   },
     * ```
     * Or
     * ```
     *   dataType(config) {
     * 	   return typeof config.length !== 'undefined' ? `varchar(${config.length})` : `varchar`;
     * 	 }
     * ```
     */
    dataType: (config: T['config'] | (Equal<T['configRequired'], true> extends true ? never : undefined)) => string;
    /**
     * Optional mapping function, between user input and driver
     * @example
     * For example, when using jsonb we need to map JS/TS object to string before writing to database
     * ```
     * toDriver(value: TData): string {
     * 	 return JSON.stringify(value);
     * }
     * ```
     */
    toDriver?: (value: T['data']) => T['driverData'] | SQL;
    /**
     * Optional mapping function, that is responsible for data mapping from database to JS/TS code
     * @example
     * For example, when using timestamp we need to map string Date representation to JS Date
     * ```
     * fromDriver(value: string): Date {
     * 	return new Date(value);
     * },
     * ```
     */
    fromDriver?: (value: T['driverData']) => T['data'];
}
/**
 * Custom pg database data type generator
 */
declare function customType<T extends CustomTypeValues = CustomTypeValues>(customTypeParams: CustomTypeParams<T>): Equal<T['configRequired'], true> extends true ? <TName extends string>(dbName: TName, fieldConfig: T['config']) => PgCustomColumnBuilder<ConvertCustomConfig<TName, T>> : <TName extends string>(dbName: TName, fieldConfig?: T['config']) => PgCustomColumnBuilder<ConvertCustomConfig<TName, T>>;

declare abstract class PgDateColumnBaseBuilder<THKT extends ColumnBuilderHKTBase, T extends ColumnBuilderBaseConfig, TRuntimeConfig extends object = {}> extends PgColumnBuilder<THKT, T, TRuntimeConfig> {
    defaultNow(): ColumnBuilderKind<THKT, Simplify<Omit<T, "hasDefault"> & {
        hasDefault: true;
    }, {}>>;
}

interface PgDateBuilderHKT extends ColumnBuilderHKTBase {
    _type: PgDateBuilder<Assume<this['config'], ColumnBuilderBaseConfig>>;
    _columnHKT: PgDateHKT;
}
interface PgDateHKT extends ColumnHKTBase {
    _type: PgDate<Assume<this['config'], ColumnBaseConfig>>;
}
type PgDateBuilderInitial<TName extends string> = PgDateBuilder<{
    name: TName;
    data: Date;
    driverParam: string;
    notNull: false;
    hasDefault: false;
}>;
declare class PgDateBuilder<T extends ColumnBuilderBaseConfig> extends PgDateColumnBaseBuilder<PgDateBuilderHKT, T> {
}
declare class PgDate<T extends ColumnBaseConfig> extends PgColumn<PgDateHKT, T> {
    getSQLType(): string;
    mapFromDriverValue(value: string): Date;
    mapToDriverValue(value: Date): string;
}
interface PgDateStringBuilderHKT extends ColumnBuilderHKTBase {
    _type: PgDateStringBuilder<Assume<this['config'], ColumnBuilderBaseConfig>>;
    _columnHKT: PgDateStringHKT;
}
interface PgDateStringHKT extends ColumnHKTBase {
    _type: PgDateString<Assume<this['config'], ColumnBaseConfig>>;
}
type PgDateStringBuilderInitial<TName extends string> = PgDateStringBuilder<{
    name: TName;
    data: string;
    driverParam: string;
    notNull: false;
    hasDefault: false;
}>;
declare class PgDateStringBuilder<T extends ColumnBuilderBaseConfig> extends PgDateColumnBaseBuilder<PgDateStringBuilderHKT, T> {
}
declare class PgDateString<T extends ColumnBaseConfig> extends PgColumn<PgDateStringHKT, T> {
    getSQLType(): string;
}
declare function date<TName extends string>(name: TName, config?: {
    mode: 'string';
}): PgDateStringBuilderInitial<TName>;
declare function date<TName extends string>(TName: TName, config?: {
    mode: 'date';
}): PgDateBuilderInitial<TName>;

interface PgDoublePrecisionBuilderHKT extends ColumnBuilderHKTBase {
    _type: PgDoublePrecisionBuilder<Assume<this['config'], ColumnBuilderBaseConfig>>;
    _columnHKT: PgDoublePrecisionHKT;
}
interface PgDoublePrecisionHKT extends ColumnHKTBase {
    _type: PgDoublePrecision<Assume<this['config'], ColumnBaseConfig>>;
}
type PgDoublePrecisionBuilderInitial<TName extends string> = PgDoublePrecisionBuilder<{
    name: TName;
    data: number;
    driverParam: string | number;
    notNull: false;
    hasDefault: false;
}>;
declare class PgDoublePrecisionBuilder<T extends ColumnBuilderBaseConfig> extends PgColumnBuilder<PgDoublePrecisionBuilderHKT, T> {
}
declare class PgDoublePrecision<T extends ColumnBaseConfig> extends PgColumn<PgDoublePrecisionHKT, T> {
    getSQLType(): string;
    mapFromDriverValue(value: string | number): number;
}
declare function doublePrecision<TName extends string>(name: TName): PgDoublePrecisionBuilderInitial<TName>;

interface PgEnumColumnBuilderHKT extends ColumnBuilderHKTBase {
    _type: PgEnumColumnBuilder<Assume<this['config'], ColumnBuilderBaseConfig>>;
    _columnHKT: PgEnumColumnHKT;
}
interface PgEnumColumnHKT extends ColumnHKTBase {
    _type: PgEnumColumn<Assume<this['config'], ColumnBaseConfig>>;
}
type PgEnumColumnBuilderInitial<TName extends string, TValues extends string[]> = PgEnumColumnBuilder<{
    name: TName;
    data: TValues[number];
    enum: TValues;
    driverParam: string;
    notNull: false;
    hasDefault: false;
}>;
interface PgEnum<TValues extends [string, ...string[]]> {
    <TName extends string>(name: TName): PgEnumColumnBuilderInitial<TName, TValues>;
    readonly enumName: string;
    readonly enumValues: TValues;
}
declare function isPgEnum(obj: unknown): obj is PgEnum<[string, ...string[]]>;
declare class PgEnumColumnBuilder<T extends ColumnBuilderBaseConfig> extends PgColumnBuilder<PgEnumColumnBuilderHKT, T, {
    enumInstance: PgEnum<any>;
}> {
    constructor(name: string, enumInstance: PgEnum<any>);
}
declare class PgEnumColumn<T extends ColumnBaseConfig> extends PgColumn<PgEnumColumnHKT, T> {
    readonly enum: PgEnum<any>;
    constructor(table: AnyPgTable<{
        name: T['tableName'];
    }>, config: PgEnumColumnBuilder<T>['config']);
    getSQLType(): string;
}
declare function pgEnum<U extends string, T extends Readonly<[U, ...U[]]>>(enumName: string, values: T | Writable<T>): PgEnum<Writable<T>>;

interface PgInetBuilderHKT extends ColumnBuilderHKTBase {
    _type: PgInetBuilder<Assume<this['config'], ColumnBuilderBaseConfig>>;
    _columnHKT: PgInetHKT;
}
interface PgInetHKT extends ColumnHKTBase {
    _type: PgInet<Assume<this['config'], ColumnBaseConfig>>;
}
type PgInetBuilderInitial<TName extends string> = PgInetBuilder<{
    name: TName;
    data: string;
    driverParam: string;
    notNull: false;
    hasDefault: false;
}>;
declare class PgInetBuilder<T extends ColumnBuilderBaseConfig> extends PgColumnBuilder<PgInetBuilderHKT, T> {
}
declare class PgInet<T extends ColumnBaseConfig> extends PgColumn<PgInetHKT, T> {
    getSQLType(): string;
}
declare function inet<TName extends string>(name: TName): PgInetBuilderInitial<TName>;

interface PgIntegerBuilderHKT extends ColumnBuilderHKTBase {
    _type: PgIntegerBuilder<Assume<this['config'], ColumnBuilderBaseConfig>>;
    _columnHKT: PgIntegerHKT;
}
interface PgIntegerHKT extends ColumnHKTBase {
    _type: PgInteger<Assume<this['config'], ColumnBaseConfig>>;
}
type PgIntegerBuilderInitial<TName extends string> = PgIntegerBuilder<{
    name: TName;
    data: number;
    driverParam: number | string;
    hasDefault: false;
    notNull: false;
}>;
declare class PgIntegerBuilder<T extends ColumnBuilderBaseConfig> extends PgColumnBuilder<PgIntegerBuilderHKT, T> {
}
declare class PgInteger<T extends ColumnBaseConfig> extends PgColumn<PgIntegerHKT, T> {
    getSQLType(): string;
    mapFromDriverValue(value: number | string): number;
}
declare function integer<TName extends string>(name: TName): PgIntegerBuilderInitial<TName>;

interface PgTimestampBuilderHKT extends ColumnBuilderHKTBase {
    _type: PgTimestampBuilder<Assume<this['config'], ColumnBuilderBaseConfig>>;
    _columnHKT: PgTimestampHKT;
}
interface PgTimestampHKT extends ColumnHKTBase {
    _type: PgTimestamp<Assume<this['config'], ColumnBaseConfig>>;
}
type PgTimestampBuilderInitial<TName extends string> = PgTimestampBuilder<{
    name: TName;
    data: Date;
    driverParam: string;
    notNull: false;
    hasDefault: false;
}>;
declare class PgTimestampBuilder<T extends ColumnBuilderBaseConfig> extends PgDateColumnBaseBuilder<PgTimestampBuilderHKT, T, {
    withTimezone: boolean;
    precision: number | undefined;
}> {
    constructor(name: string, withTimezone: boolean, precision: number | undefined);
}
declare class PgTimestamp<T extends ColumnBaseConfig> extends PgColumn<PgTimestampHKT, T> {
    readonly withTimezone: boolean;
    readonly precision: number | undefined;
    constructor(table: AnyPgTable<{
        name: T['tableName'];
    }>, config: PgTimestampBuilder<T>['config']);
    getSQLType(): string;
    mapFromDriverValue: (value: string) => Date;
    mapToDriverValue: (value: Date) => string;
}
interface PgTimestampStringBuilderHKT extends ColumnBuilderHKTBase {
    _type: PgTimestampStringBuilder<Assume<this['config'], ColumnBuilderBaseConfig>>;
    _columnHKT: PgTimestampStringHKT;
}
interface PgTimestampStringHKT extends ColumnHKTBase {
    _type: PgTimestampString<Assume<this['config'], ColumnBaseConfig>>;
}
type PgTimestampStringBuilderInitial<TName extends string> = PgTimestampStringBuilder<{
    name: TName;
    data: string;
    driverParam: string;
    notNull: false;
    hasDefault: false;
}>;
declare class PgTimestampStringBuilder<T extends ColumnBuilderBaseConfig> extends PgDateColumnBaseBuilder<PgTimestampStringBuilderHKT, T, {
    withTimezone: boolean;
    precision: number | undefined;
}> {
    constructor(name: string, withTimezone: boolean, precision: number | undefined);
}
declare class PgTimestampString<T extends ColumnBaseConfig> extends PgColumn<PgTimestampStringHKT, T> {
    readonly withTimezone: boolean;
    readonly precision: number | undefined;
    constructor(table: AnyPgTable<{
        name: T['tableName'];
    }>, config: PgTimestampStringBuilder<T>['config']);
    getSQLType(): string;
}
type Precision = 0 | 1 | 2 | 3 | 4 | 5 | 6;
interface PgTimestampConfig<TMode extends 'date' | 'string' = 'date' | 'string'> {
    mode?: TMode;
    precision?: Precision;
    withTimezone?: boolean;
}
declare function timestamp<TName extends string, TMode extends PgTimestampConfig['mode'] & {}>(name: TName, config?: PgTimestampConfig<TMode>): Equal<TMode, 'string'> extends true ? PgTimestampStringBuilderInitial<TName> : PgTimestampBuilderInitial<TName>;

interface PgIntervalBuilderHKT extends ColumnBuilderHKTBase {
    _type: PgIntervalBuilder<Assume<this['config'], ColumnBuilderBaseConfig>>;
    _columnHKT: PgIntervalHKT;
}
interface PgIntervalHKT extends ColumnHKTBase {
    _type: PgInterval<Assume<this['config'], ColumnBaseConfig>>;
}
type PgIntervalBuilderInitial<TName extends string> = PgIntervalBuilder<{
    name: TName;
    data: string;
    driverParam: string;
    notNull: false;
    hasDefault: false;
}>;
declare class PgIntervalBuilder<T extends ColumnBuilderBaseConfig> extends PgColumnBuilder<PgIntervalBuilderHKT, T, {
    intervalConfig: IntervalConfig;
}> {
    constructor(name: T['name'], intervalConfig: IntervalConfig);
}
declare class PgInterval<T extends ColumnBaseConfig> extends PgColumn<PgIntervalHKT, T, {
    intervalConfig: IntervalConfig;
}> {
    readonly fields: IntervalConfig['fields'];
    readonly precision: IntervalConfig['precision'];
    getSQLType(): string;
}
interface IntervalConfig {
    fields?: 'year' | 'month' | 'day' | 'hour' | 'minute' | 'second' | 'year to month' | 'day to hour' | 'day to minute' | 'day to second' | 'hour to minute' | 'hour to second' | 'minute to second';
    precision?: Precision;
}
declare function interval<TName extends string>(name: TName, config?: IntervalConfig): PgIntervalBuilderInitial<TName>;

interface PgJsonBuilderHKT extends ColumnBuilderHKTBase {
    _type: PgJsonBuilder<Assume<this['config'], ColumnBuilderBaseConfig>>;
    _columnHKT: PgJsonHKT;
}
interface PgJsonHKT extends ColumnHKTBase {
    _type: PgJson<Assume<this['config'], ColumnBaseConfig>>;
}
type PgJsonBuilderInitial<TName extends string> = PgJsonBuilder<{
    name: TName;
    data: unknown;
    driverParam: unknown;
    notNull: false;
    hasDefault: false;
}>;
declare class PgJsonBuilder<T extends ColumnBuilderBaseConfig> extends PgColumnBuilder<PgJsonBuilderHKT, T> {
}
declare class PgJson<T extends ColumnBaseConfig> extends PgColumn<PgJsonHKT, T> {
    protected $pgColumnBrand: 'PgJson';
    constructor(table: AnyPgTable<{
        name: T['tableName'];
    }>, config: PgJsonBuilder<T>['config']);
    getSQLType(): string;
    mapToDriverValue(value: T['data']): string;
    mapFromDriverValue(value: T['data'] | string): T['data'];
}
declare function json<TName extends string>(name: TName): PgJsonBuilderInitial<TName>;

interface PgJsonbBuilderHKT extends ColumnBuilderHKTBase {
    _type: PgJsonbBuilder<Assume<this['config'], ColumnBuilderBaseConfig>>;
    _columnHKT: PgJsonbHKT;
}
interface PgJsonbHKT extends ColumnHKTBase {
    _type: PgJsonb<Assume<this['config'], ColumnBaseConfig>>;
}
type PgJsonbBuilderInitial<TName extends string> = PgJsonbBuilder<{
    name: TName;
    data: unknown;
    driverParam: unknown;
    notNull: false;
    hasDefault: false;
}>;
declare class PgJsonbBuilder<T extends ColumnBuilderBaseConfig> extends PgColumnBuilder<PgJsonbBuilderHKT, T> {
}
declare class PgJsonb<T extends ColumnBaseConfig> extends PgColumn<PgJsonbHKT, T> {
    protected $pgColumnBrand: 'PgJsonb';
    constructor(table: AnyPgTable<{
        name: T['tableName'];
    }>, config: PgJsonbBuilder<T>['config']);
    getSQLType(): string;
    mapToDriverValue(value: T['data']): string;
    mapFromDriverValue(value: T['data'] | string): T['data'];
}
declare function jsonb<TName extends string>(name: TName): PgJsonbBuilderInitial<TName>;

interface PgMacaddrBuilderHKT extends ColumnBuilderHKTBase {
    _type: PgMacaddrBuilder<Assume<this['config'], ColumnBuilderBaseConfig>>;
    _columnHKT: PgMacaddrHKT;
}
interface PgMacaddrHKT extends ColumnHKTBase {
    _type: PgMacaddr<Assume<this['config'], ColumnBaseConfig>>;
}
type PgMacaddrBuilderInitial<TName extends string> = PgMacaddrBuilder<{
    name: TName;
    data: string;
    driverParam: string;
    notNull: false;
    hasDefault: false;
}>;
declare class PgMacaddrBuilder<T extends ColumnBuilderBaseConfig> extends PgColumnBuilder<PgMacaddrBuilderHKT, T> {
}
declare class PgMacaddr<T extends ColumnBaseConfig> extends PgColumn<PgMacaddrHKT, T> {
    getSQLType(): string;
}
declare function macaddr<TName extends string>(name: TName): PgMacaddrBuilderInitial<TName>;

interface PgMacaddr8BuilderHKT extends ColumnBuilderHKTBase {
    _type: PgMacaddr8Builder<Assume<this['config'], ColumnBuilderBaseConfig>>;
    _columnHKT: PgMacaddr8HKT;
}
interface PgMacaddr8HKT extends ColumnHKTBase {
    _type: PgMacaddr8<Assume<this['config'], ColumnBaseConfig>>;
}
type PgMacaddr8BuilderInitial<TName extends string> = PgMacaddr8Builder<{
    name: TName;
    data: string;
    driverParam: string;
    notNull: false;
    hasDefault: false;
}>;
declare class PgMacaddr8Builder<T extends ColumnBuilderBaseConfig> extends PgColumnBuilder<PgMacaddr8BuilderHKT, T> {
}
declare class PgMacaddr8<T extends ColumnBaseConfig> extends PgColumn<PgMacaddr8HKT, T> {
    getSQLType(): string;
}
declare function macaddr8<TName extends string>(name: TName): PgMacaddr8BuilderInitial<TName>;

interface PgNumericBuilderHKT extends ColumnBuilderHKTBase {
    _type: PgNumericBuilder<Assume<this['config'], ColumnBuilderBaseConfig>>;
    _columnHKT: PgNumericHKT;
}
interface PgNumericHKT extends ColumnHKTBase {
    _type: PgNumeric<Assume<this['config'], ColumnBaseConfig>>;
}
type PgNumericBuilderInitial<TName extends string> = PgNumericBuilder<{
    name: TName;
    data: string;
    driverParam: string;
    notNull: false;
    hasDefault: false;
}>;
declare class PgNumericBuilder<T extends ColumnBuilderBaseConfig> extends PgColumnBuilder<PgNumericBuilderHKT, T, {
    precision: number | undefined;
    scale: number | undefined;
}> {
    constructor(name: string, precision?: number, scale?: number);
}
declare class PgNumeric<T extends ColumnBaseConfig> extends PgColumn<PgNumericHKT, T> {
    readonly precision: number | undefined;
    readonly scale: number | undefined;
    constructor(table: AnyPgTable<{
        name: T['tableName'];
    }>, config: PgNumericBuilder<T>['config']);
    getSQLType(): string;
}
declare function numeric<TName extends string>(name: TName, config?: {
    precision: number;
    scale?: number;
} | {
    precision?: number;
    scale: number;
} | {
    precision: number;
    scale: number;
}): PgNumericBuilderInitial<TName>;
declare const decimal: typeof numeric;

interface PgRealBuilderHKT extends ColumnBuilderHKTBase {
    _type: PgRealBuilder<Assume<this['config'], ColumnBuilderBaseConfig>>;
    _columnHKT: PgRealHKT;
}
interface PgRealHKT extends ColumnHKTBase {
    _type: PgReal<Assume<this['config'], ColumnBaseConfig>>;
}
type PgRealBuilderInitial<TName extends string> = PgRealBuilder<{
    name: TName;
    data: number;
    driverParam: string | number;
    notNull: false;
    hasDefault: false;
}>;
declare class PgRealBuilder<T extends ColumnBuilderBaseConfig> extends PgColumnBuilder<PgRealBuilderHKT, T, {
    length: number | undefined;
}> {
    constructor(name: string, length?: number);
}
declare class PgReal<T extends ColumnBaseConfig> extends PgColumn<PgRealHKT, T> {
    constructor(table: AnyPgTable<{
        name: T['tableName'];
    }>, config: PgRealBuilder<T>['config']);
    getSQLType(): string;
    mapFromDriverValue: (value: string | number) => number;
}
declare function real<TName extends string>(name: TName): PgRealBuilderInitial<TName>;

type PgSerialBuilderInitial<TName extends string> = PgSerialBuilder<{
    name: TName;
    data: number;
    driverParam: number;
    notNull: true;
    hasDefault: true;
}>;
interface PgSerialBuilderHKT extends ColumnBuilderHKTBase {
    _type: PgSerialBuilder<Assume<this['config'], ColumnBuilderBaseConfig>>;
    _columnHKT: PgSerialHKT;
}
interface PgSerialBuilderHKT extends ColumnBuilderHKTBase {
    _type: PgSerialBuilder<Assume<this['config'], ColumnBuilderBaseConfig>>;
    _columnHKT: PgSerialHKT;
}
interface PgSerialHKT extends ColumnHKTBase {
    _type: PgSerial<Assume<this['config'], ColumnBaseConfig>>;
}
interface PgSerialHKT extends ColumnHKTBase {
    _type: PgSerial<Assume<this['config'], ColumnBaseConfig>>;
}
declare class PgSerialBuilder<T extends ColumnBuilderBaseConfig> extends PgColumnBuilder<PgSerialBuilderHKT, T> {
    constructor(name: string);
}
declare class PgSerial<T extends ColumnBaseConfig> extends PgColumn<PgSerialHKT, T> {
    getSQLType(): string;
}
declare function serial<TName extends string>(name: TName): PgSerialBuilderInitial<TName>;

interface PgSmallIntBuilderHKT extends ColumnBuilderHKTBase {
    _type: PgSmallIntBuilder<Assume<this['config'], ColumnBuilderBaseConfig>>;
    _columnHKT: PgSmallIntHKT;
}
interface PgSmallIntHKT extends ColumnHKTBase {
    _type: PgSmallInt<Assume<this['config'], ColumnBaseConfig>>;
}
type PgSmallIntBuilderInitial<TName extends string> = PgSmallIntBuilder<{
    name: TName;
    data: number;
    driverParam: number | string;
    notNull: false;
    hasDefault: false;
}>;
declare class PgSmallIntBuilder<T extends ColumnBuilderBaseConfig> extends PgColumnBuilder<PgSmallIntBuilderHKT, T> {
}
declare class PgSmallInt<T extends ColumnBaseConfig> extends PgColumn<PgSmallIntHKT, T> {
    getSQLType(): string;
    mapFromDriverValue: (value: number | string) => number;
}
declare function smallint<TName extends string>(name: TName): PgSmallIntBuilderInitial<TName>;

interface PgSmallSerialBuilderHKT extends ColumnBuilderHKTBase {
    _type: PgSmallSerialBuilder<Assume<this['config'], ColumnBuilderBaseConfig>>;
    _columnHKT: PgSmallSerialHKT;
}
interface PgSmallSerialHKT extends ColumnHKTBase {
    _type: PgSmallSerial<Assume<this['config'], ColumnBaseConfig>>;
}
type PgSmallSerialBuilderInitial<TName extends string> = PgSmallSerialBuilder<{
    name: TName;
    data: number;
    driverParam: number;
    notNull: false;
    hasDefault: false;
}>;
declare class PgSmallSerialBuilder<T extends ColumnBuilderBaseConfig> extends PgColumnBuilder<PgSmallSerialBuilderHKT, T> {
    constructor(name: string);
}
declare class PgSmallSerial<T extends ColumnBaseConfig> extends PgColumn<PgSmallSerialHKT, T> {
    getSQLType(): string;
}
declare function smallserial<TName extends string>(name: TName): PgSmallSerialBuilderInitial<TName>;

interface PgTextBuilderHKT extends ColumnBuilderHKTBase {
    _type: PgTextBuilder<Assume<this['config'], ColumnBuilderBaseConfig & PgTextBuilderConfig>>;
    _columnHKT: PgTextHKT;
}
interface PgTextHKT extends ColumnHKTBase {
    _type: PgText<Assume<this['config'], ColumnBaseConfig>>;
}
interface PgTextBuilderConfig {
    enum: string[];
}
type PgTextBuilderInitial<TName extends string, TEnum extends string[]> = PgTextBuilder<{
    name: TName;
    data: TEnum[number];
    enum: TEnum;
    driverParam: string;
    notNull: false;
    hasDefault: false;
}>;
declare class PgTextBuilder<T extends ColumnBuilderBaseConfig> extends PgColumnBuilder<PgTextBuilderHKT, T, {
    enum: string[];
}> {
    constructor(name: T['name'], config: PgTextConfig<string[]>);
}
declare class PgText<T extends ColumnBaseConfig> extends PgColumn<PgTextHKT, T> {
    readonly enum: string[];
    constructor(table: AnyPgTable<{
        name: T['tableName'];
    }>, config: PgTextBuilder<any>['config']);
    getSQLType(): string;
}
interface PgTextConfig<TEnum extends string[]> {
    enum?: TEnum;
}
declare function text<TName extends string, U extends string, T extends Readonly<[U, ...U[]]>>(name: TName, config?: PgTextConfig<Writable<T>>): PgTextBuilderInitial<TName, Writable<T>>;

interface PgTimeBuilderHKT extends ColumnBuilderHKTBase {
    _type: PgTimeBuilder<Assume<this['config'], ColumnBuilderBaseConfig>>;
    _columnHKT: PgTimeHKT;
}
interface PgTimeHKT extends ColumnHKTBase {
    _type: PgTime<Assume<this['config'], ColumnBaseConfig>>;
}
type PgTimeBuilderInitial<TName extends string> = PgTimeBuilder<{
    name: TName;
    data: string;
    driverParam: string;
    notNull: false;
    hasDefault: false;
}>;
declare class PgTimeBuilder<T extends ColumnBuilderBaseConfig> extends PgDateColumnBaseBuilder<PgTimeBuilderHKT, T, {
    withTimezone: boolean;
    precision: number | undefined;
}> {
    readonly withTimezone: boolean;
    readonly precision: number | undefined;
    constructor(name: T['name'], withTimezone: boolean, precision: number | undefined);
}
declare class PgTime<T extends ColumnBaseConfig> extends PgColumn<PgTimeHKT, T> {
    readonly withTimezone: boolean;
    readonly precision: number | undefined;
    constructor(table: AnyPgTable<{
        name: T['tableName'];
    }>, config: PgTimeBuilder<T>['config']);
    getSQLType(): string;
}
interface TimeConfig {
    precision?: Precision;
    withTimezone?: boolean;
}
declare function time<TName extends string>(name: TName, config?: TimeConfig): PgTimeBuilderInitial<TName>;

interface PgUUIDBuilderHKT extends ColumnBuilderHKTBase {
    _type: PgUUIDBuilder<Assume<this['config'], ColumnBuilderBaseConfig>>;
    _columnHKT: PgUUIDHKT;
}
interface PgUUIDHKT extends ColumnHKTBase {
    _type: PgUUID<Assume<this['config'], ColumnBaseConfig>>;
}
type PgUUIDBuilderInitial<TName extends string> = PgUUIDBuilder<{
    name: TName;
    data: string;
    driverParam: string;
    notNull: false;
    hasDefault: false;
}>;
declare class PgUUIDBuilder<T extends ColumnBuilderBaseConfig> extends PgColumnBuilder<PgUUIDBuilderHKT, T> {
    /**
     * Adds `default gen_random_uuid()` to the column definition.
     */
    defaultRandom(): ReturnType<this['default']>;
}
declare class PgUUID<T extends ColumnBaseConfig> extends PgColumn<PgUUIDHKT, T> {
    getSQLType(): string;
}
declare function uuid<TName extends string>(name: TName): PgUUIDBuilderInitial<TName>;

interface PgVarcharBuilderHKT extends ColumnBuilderHKTBase {
    _type: PgVarcharBuilder<Assume<this['config'], ColumnBuilderBaseConfig>>;
    _columnHKT: PgVarcharHKT;
}
interface PgVarcharHKT extends ColumnHKTBase {
    _type: PgVarchar<Assume<this['config'], ColumnBaseConfig>>;
}
type PgVarcharBuilderInitial<TName extends string, TEnum extends string[]> = PgVarcharBuilder<{
    name: TName;
    data: TEnum[number];
    driverParam: string;
    enum: TEnum;
    notNull: false;
    hasDefault: false;
}>;
declare class PgVarcharBuilder<T extends ColumnBuilderBaseConfig> extends PgColumnBuilder<PgVarcharBuilderHKT, T, {
    length: number | undefined;
    enum: string[];
}> {
    constructor(name: string, config: PgVarcharConfig<string[]>);
}
declare class PgVarchar<T extends ColumnBaseConfig> extends PgColumn<PgVarcharHKT, T> {
    readonly length: number | undefined;
    readonly enum: string[];
    constructor(table: AnyPgTable<{
        name: T['tableName'];
    }>, config: PgVarcharBuilder<T>['config']);
    getSQLType(): string;
}
interface PgVarcharConfig<TEnum extends string[]> {
    length?: number;
    enum?: TEnum;
}
declare function varchar<TName extends string, U extends string, T extends Readonly<[U, ...U[]]>>(name: TName, config?: PgVarcharConfig<Writable<T>>): PgVarcharBuilderInitial<TName, Writable<T>>;

export { AnyPgColumn, ConvertCustomConfig, CustomTypeParams, CustomTypeValues, IntervalConfig, PgArray, PgArrayBuilder, PgArrayBuilderHKT, PgArrayHKT, PgBigInt53, PgBigInt53Builder, PgBigInt53BuilderHKT, PgBigInt53BuilderInitial, PgBigInt53HKT, PgBigInt64, PgBigInt64Builder, PgBigInt64BuilderHKT, PgBigInt64BuilderInitial, PgBigInt64HKT, PgBigSerial53, PgBigSerial53Builder, PgBigSerial53BuilderHKT, PgBigSerial53BuilderInitial, PgBigSerial53HKT, PgBigSerial64, PgBigSerial64Builder, PgBigSerial64BuilderHKT, PgBigSerial64BuilderInitial, PgBigSerial64HKT, PgBoolean, PgBooleanBuilder, PgBooleanBuilderHKT, PgBooleanBuilderInitial, PgBooleanHKT, PgChar, PgCharBuilder, PgCharBuilderHKT, PgCharBuilderInitial, PgCharConfig, PgCharHKT, PgCidr, PgCidrBuilder, PgCidrBuilderHKT, PgCidrBuilderInitial, PgCidrHKT, PgColumn, PgCustomColumn, PgCustomColumnBuilder, PgCustomColumnBuilderHKT, PgCustomColumnHKT, PgCustomColumnInnerConfig, PgDate, PgDateBuilder, PgDateBuilderHKT, PgDateBuilderInitial, PgDateHKT, PgDateString, PgDateStringBuilder, PgDateStringBuilderHKT, PgDateStringBuilderInitial, PgDateStringHKT, PgDoublePrecision, PgDoublePrecisionBuilder, PgDoublePrecisionBuilderHKT, PgDoublePrecisionBuilderInitial, PgDoublePrecisionHKT, PgEnum, PgEnumColumn, PgEnumColumnBuilder, PgEnumColumnBuilderHKT, PgEnumColumnBuilderInitial, PgEnumColumnHKT, PgInet, PgInetBuilder, PgInetBuilderHKT, PgInetBuilderInitial, PgInetHKT, PgInteger, PgIntegerBuilder, PgIntegerBuilderHKT, PgIntegerHKT, PgInterval, PgIntervalBuilder, PgIntervalBuilderHKT, PgIntervalBuilderInitial, PgIntervalHKT, PgJson, PgJsonBuilder, PgJsonBuilderHKT, PgJsonBuilderInitial, PgJsonHKT, PgJsonb, PgJsonbBuilder, PgJsonbBuilderHKT, PgJsonbBuilderInitial, PgJsonbHKT, PgMacaddr, PgMacaddr8, PgMacaddr8Builder, PgMacaddr8BuilderHKT, PgMacaddr8BuilderInitial, PgMacaddr8HKT, PgMacaddrBuilder, PgMacaddrBuilderHKT, PgMacaddrBuilderInitial, PgMacaddrHKT, PgNumeric, PgNumericBuilder, PgNumericBuilderHKT, PgNumericBuilderInitial, PgNumericHKT, PgReal, PgRealBuilder, PgRealBuilderHKT, PgRealBuilderInitial, PgRealHKT, PgSerial, PgSerialBuilder, PgSerialBuilderHKT, PgSerialBuilderInitial, PgSerialHKT, PgSmallInt, PgSmallIntBuilder, PgSmallIntBuilderHKT, PgSmallIntBuilderInitial, PgSmallIntHKT, PgSmallSerial, PgSmallSerialBuilder, PgSmallSerialBuilderHKT, PgSmallSerialBuilderInitial, PgSmallSerialHKT, PgText, PgTextBuilder, PgTextBuilderConfig, PgTextBuilderHKT, PgTextConfig, PgTextHKT, PgTime, PgTimeBuilder, PgTimeBuilderHKT, PgTimeBuilderInitial, PgTimeHKT, PgTimestamp, PgTimestampBuilder, PgTimestampBuilderHKT, PgTimestampBuilderInitial, PgTimestampConfig, PgTimestampHKT, PgTimestampString, PgTimestampStringBuilder, PgTimestampStringBuilderHKT, PgTimestampStringBuilderInitial, PgTimestampStringHKT, PgUUID, PgUUIDBuilder, PgUUIDBuilderHKT, PgUUIDBuilderInitial, PgUUIDHKT, PgVarchar, PgVarcharBuilder, PgVarcharBuilderHKT, PgVarcharBuilderInitial, PgVarcharConfig, PgVarcharHKT, Precision, TimeConfig, bigint, bigserial, boolean, char, cidr, customType, date, decimal, doublePrecision, inet, integer, interval, isPgEnum, json, jsonb, macaddr, macaddr8, numeric, pgEnum, real, serial, smallint, smallserial, text, time, timestamp, uuid, varchar };
