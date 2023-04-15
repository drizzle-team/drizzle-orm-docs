/// <reference types="node" />
/// <reference types="bun-types" />
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
type Or<T1, T2> = T1 extends true ? true : T2 extends true ? true : false;
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
type MakeColumnConfig<T extends ColumnBuilderBaseConfig, TTableName extends string> = Simplify<Pick<T, keyof ColumnBuilderBaseConfig> & {
    tableName: TTableName;
}>;
interface ColumnBuilderHKTBase {
    config: unknown;
    _type: unknown;
    _columnHKT: unknown;
}
type ColumnBuilderKind<THKT extends ColumnBuilderHKTBase, TConfig extends ColumnBuilderBaseConfig> = (THKT & {
    config: TConfig;
})['_type'];
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
type UpdateCBConfig<T extends ColumnBuilderBaseConfig, TUpdate extends Partial<ColumnBuilderBaseConfig>> = Update<T, TUpdate>;

interface ColumnBaseConfig extends ColumnBuilderBaseConfig {
    tableName: string;
}
interface ColumnHKTBase {
    config: unknown;
    _type: unknown;
}
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

type TableConfig = TableConfig$1<AnySQLiteColumn>;
declare class SQLiteTable<T extends TableConfig> extends Table<T> {
}
type AnySQLiteTable<TPartial extends Partial<TableConfig> = {}> = SQLiteTable<UpdateTableConfig<TableConfig, TPartial>>;

type UpdateDeleteAction = 'cascade' | 'restrict' | 'no action' | 'set null' | 'set default';

interface ReferenceConfig {
    ref: () => AnySQLiteColumn;
    actions: {
        onUpdate?: UpdateDeleteAction;
        onDelete?: UpdateDeleteAction;
    };
}
interface SQLiteColumnHKT extends ColumnHKTBase {
    _type: SQLiteColumn<SQLiteColumnHKT, Assume<this['config'], ColumnBaseConfig>>;
}
declare abstract class SQLiteColumnBuilder<THKT extends ColumnBuilderHKTBase, T extends ColumnBuilderBaseConfig, TRuntimeConfig extends object = {}, TTypeConfig extends object = {}> extends ColumnBuilder<THKT, T, TRuntimeConfig, TTypeConfig & {
    sqliteBrand: 'SQLiteColumnBuilder';
}> {
    private foreignKeyConfigs;
    references(ref: ReferenceConfig['ref'], actions?: ReferenceConfig['actions']): this;
}
declare abstract class SQLiteColumn<THKT extends ColumnHKTBase, T extends ColumnBaseConfig, TRuntimeConfig extends object = {}> extends Column<THKT, T, TRuntimeConfig, {
    sqliteBrand: 'SQLiteColumn';
}> {
}
type AnySQLiteColumn<TPartial extends Partial<ColumnBaseConfig> = {}> = SQLiteColumn<SQLiteColumnHKT, Required<Update<ColumnBaseConfig, TPartial>>>;

type BlobMode = 'buffer' | 'json';
interface SQLiteBlobJsonBuilderHKT extends ColumnBuilderHKTBase {
    _type: SQLiteBlobJsonBuilder<Assume<this['config'], ColumnBuilderBaseConfig>>;
    _columnHKT: SQLiteBlobJsonHKT;
}
interface SQLiteBlobJsonHKT extends ColumnHKTBase {
    _type: SQLiteBlobJson<Assume<this['config'], ColumnBaseConfig>>;
}
type SQLiteBlobJsonBuilderInitial<TName extends string> = SQLiteBlobJsonBuilder<{
    name: TName;
    data: unknown;
    driverParam: Buffer;
    notNull: false;
    hasDefault: false;
}>;
declare class SQLiteBlobJsonBuilder<T extends ColumnBuilderBaseConfig> extends SQLiteColumnBuilder<SQLiteBlobJsonBuilderHKT, T> {
}
declare class SQLiteBlobJson<T extends ColumnBaseConfig> extends SQLiteColumn<SQLiteBlobJsonHKT, T> {
    protected $sqliteColumnBrand: 'SQLiteBlobJson';
    getSQLType(): string;
    mapFromDriverValue(value: Buffer): T['data'];
    mapToDriverValue(value: T['data']): Buffer;
}
interface SQLiteBlobBufferBuilderHKT extends ColumnBuilderHKTBase {
    _type: SQLiteBlobBufferBuilder<Assume<this['config'], ColumnBuilderBaseConfig>>;
    _columnHKT: SQLiteBlobBufferHKT;
}
interface SQLiteBlobBufferHKT extends ColumnHKTBase {
    _type: SQLiteBlobBuffer<Assume<this['config'], ColumnBaseConfig>>;
}
type SQLiteBlobBufferBuilderInitial<TName extends string> = SQLiteBlobBufferBuilder<{
    name: TName;
    data: Buffer;
    driverParam: Buffer;
    notNull: false;
    hasDefault: false;
}>;
declare class SQLiteBlobBufferBuilder<T extends ColumnBuilderBaseConfig> extends SQLiteColumnBuilder<SQLiteBlobBufferBuilderHKT, T> {
}
declare class SQLiteBlobBuffer<T extends ColumnBaseConfig> extends SQLiteColumn<SQLiteBlobBufferHKT, T> {
    getSQLType(): string;
}
interface BlobConfig<TMode extends BlobMode = BlobMode> {
    mode: TMode;
}
declare function blob<TName extends string, TMode extends BlobMode = 'buffer'>(name: TName, config?: BlobConfig<TMode>): TMode extends 'buffer' ? SQLiteBlobBufferBuilderInitial<TName> : SQLiteBlobJsonBuilderInitial<TName>;

type ConvertCustomConfig<TName extends string, T extends Partial<CustomTypeValues>> = Simplify<{
    name: TName;
    data: T['data'];
    driverParam: T['driverData'];
    notNull: T['notNull'] extends true ? true : false;
    hasDefault: T['default'] extends true ? true : false;
}>;
interface SQLiteCustomColumnInnerConfig {
    customTypeValues: CustomTypeValues;
}
interface SQLiteCustomColumnBuilderHKT extends ColumnBuilderHKTBase {
    _type: SQLiteCustomColumnBuilder<Assume<this['config'], ColumnBuilderBaseConfig>>;
    _columnHKT: SQLiteCustomColumnHKT;
}
interface SQLiteCustomColumnHKT extends ColumnHKTBase {
    _type: SQLiteCustomColumn<Assume<this['config'], ColumnBaseConfig>>;
}
declare class SQLiteCustomColumnBuilder<T extends ColumnBuilderBaseConfig> extends SQLiteColumnBuilder<SQLiteCustomColumnBuilderHKT, T, {
    fieldConfig: CustomTypeValues['config'];
    customTypeParams: CustomTypeParams<any>;
}, {
    sqliteColumnBuilderBrand: 'SQLiteCustomColumnBuilderBrand';
}> {
    constructor(name: T['name'], fieldConfig: CustomTypeValues['config'], customTypeParams: CustomTypeParams<any>);
}
declare class SQLiteCustomColumn<T extends ColumnBaseConfig> extends SQLiteColumn<SQLiteCustomColumnHKT, T> {
    protected $sqliteColumnBrand: 'SQLiteCustomColumn';
    private sqlName;
    private mapTo?;
    private mapFrom?;
    constructor(table: AnySQLiteTable<{
        name: T['tableName'];
    }>, config: SQLiteCustomColumnBuilder<T>['config']);
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
 * Custom sqlite database data type generator
 */
declare function customType<T extends CustomTypeValues = CustomTypeValues>(customTypeParams: CustomTypeParams<T>): Equal<T['configRequired'], true> extends true ? <TName extends string>(dbName: TName, fieldConfig: T['config']) => SQLiteCustomColumnBuilder<ConvertCustomConfig<TName, T>> : <TName extends string>(dbName: TName, fieldConfig?: T['config']) => SQLiteCustomColumnBuilder<ConvertCustomConfig<TName, T>>;

type OnConflict = 'rollback' | 'abort' | 'fail' | 'ignore' | 'replace';

interface PrimaryKeyConfig {
    autoIncrement?: boolean;
    onConflict?: OnConflict;
}
declare abstract class SQLiteBaseIntegerBuilder<THKT extends ColumnBuilderHKTBase, T extends ColumnBuilderBaseConfig, TRuntimeConfig extends object = {}> extends SQLiteColumnBuilder<THKT, T, TRuntimeConfig & {
    autoIncrement: boolean;
}> {
    constructor(name: T['name']);
    primaryKey(config?: PrimaryKeyConfig): ColumnBuilderKind<THKT, UpdateCBConfig<T, {
        notNull: true;
        hasDefault: true;
    }>>;
}
declare abstract class SQLiteBaseInteger<THKT extends ColumnHKTBase, T extends ColumnBaseConfig, TRuntimeConfig extends object = {}> extends SQLiteColumn<THKT, T, TRuntimeConfig & {
    autoIncrement: boolean;
}> {
    readonly autoIncrement: boolean;
    getSQLType(): string;
}
interface SQLiteIntegerBuilderHKT extends ColumnBuilderHKTBase {
    _type: SQLiteIntegerBuilder<Assume<this['config'], ColumnBuilderBaseConfig>>;
    _columnHKT: SQLiteIntegerHKT;
}
interface SQLiteIntegerHKT extends ColumnHKTBase {
    _type: SQLiteInteger<Assume<this['config'], ColumnBaseConfig>>;
}
type SQLiteIntegerBuilderInitial<TName extends string> = SQLiteIntegerBuilder<{
    name: TName;
    data: number;
    driverParam: number;
    notNull: false;
    hasDefault: false;
}>;
declare class SQLiteIntegerBuilder<T extends ColumnBuilderBaseConfig> extends SQLiteBaseIntegerBuilder<SQLiteIntegerBuilderHKT, T> {
    build<TTableName extends string>(table: AnySQLiteTable<{
        name: TTableName;
    }>): SQLiteInteger<MakeColumnConfig<T, TTableName>>;
}
declare class SQLiteInteger<T extends ColumnBaseConfig> extends SQLiteBaseInteger<SQLiteIntegerHKT, T> {
}
interface SQLiteTimestampBuilderHKT extends ColumnBuilderHKTBase {
    _type: SQLiteTimestampBuilder<Assume<this['config'], ColumnBuilderBaseConfig>>;
    _columnHKT: SQLiteTimestampHKT;
}
interface SQLiteTimestampHKT extends ColumnHKTBase {
    _type: SQLiteTimestamp<Assume<this['config'], ColumnBaseConfig>>;
}
type SQLiteTimestampBuilderInitial<TName extends string> = SQLiteTimestampBuilder<{
    name: TName;
    data: Date;
    driverParam: number;
    notNull: false;
    hasDefault: false;
}>;
declare class SQLiteTimestampBuilder<T extends ColumnBuilderBaseConfig> extends SQLiteBaseIntegerBuilder<SQLiteTimestampBuilderHKT, T, {
    mode: 'timestamp' | 'timestamp_ms';
}> {
    constructor(name: T['name'], mode: 'timestamp' | 'timestamp_ms');
    /**
     * @deprecated Use `default()` with your own expression instead.
     *
     * Adds `DEFAULT (cast((julianday('now') - 2440587.5)*86400000 as integer))` to the column, which is the current epoch timestamp in milliseconds.
     */
    defaultNow(): ColumnBuilderKind<this['_']['hkt'], UpdateCBConfig<T, {
        hasDefault: true;
    }>>;
    build<TTableName extends string>(table: AnySQLiteTable<{
        name: TTableName;
    }>): SQLiteTimestamp<MakeColumnConfig<T, TTableName>>;
}
declare class SQLiteTimestamp<T extends ColumnBaseConfig> extends SQLiteBaseInteger<SQLiteTimestampHKT, T, {
    mode: 'timestamp' | 'timestamp_ms';
}> {
    readonly mode: 'timestamp' | 'timestamp_ms';
    mapFromDriverValue(value: number): Date;
    mapToDriverValue(value: Date): number;
}
interface IntegerConfig<TMode extends 'number' | 'timestamp' | 'timestamp_ms' = 'number' | 'timestamp' | 'timestamp_ms'> {
    mode: TMode;
}
declare function integer<TName extends string, TMode extends IntegerConfig['mode']>(name: TName, config?: IntegerConfig<TMode>): Or<Equal<TMode, 'timestamp'>, Equal<TMode, 'timestamp_ms'>> extends true ? SQLiteTimestampBuilderInitial<TName> : SQLiteIntegerBuilderInitial<TName>;
declare const int: typeof integer;

interface SQLiteNumericBuilderHKT extends ColumnBuilderHKTBase {
    _type: SQLiteNumericBuilder<Assume<this['config'], ColumnBuilderBaseConfig>>;
    _columnHKT: SQLiteNumericHKT;
}
interface SQLiteNumericHKT extends ColumnHKTBase {
    _type: SQLiteNumeric<Assume<this['config'], ColumnBaseConfig>>;
}
type SQLiteNumericBuilderInitial<TName extends string> = SQLiteNumericBuilder<{
    name: TName;
    data: string;
    driverParam: string;
    notNull: false;
    hasDefault: false;
}>;
declare class SQLiteNumericBuilder<T extends ColumnBuilderBaseConfig> extends SQLiteColumnBuilder<SQLiteNumericBuilderHKT, T> {
}
declare class SQLiteNumeric<T extends ColumnBaseConfig> extends SQLiteColumn<SQLiteNumericHKT, T> {
    getSQLType(): string;
}
declare function numeric<TName extends string>(name: TName): SQLiteNumericBuilderInitial<TName>;

interface SQLiteRealBuilderHKT extends ColumnBuilderHKTBase {
    _type: SQLiteRealBuilder<Assume<this['config'], ColumnBuilderBaseConfig>>;
    _columnHKT: SQLiteRealHKT;
}
interface SQLiteRealHKT extends ColumnHKTBase {
    _type: SQLiteReal<Assume<this['config'], ColumnBaseConfig>>;
}
type SQLiteRealBuilderInitial<TName extends string> = SQLiteRealBuilder<{
    name: TName;
    data: number;
    driverParam: number;
    notNull: false;
    hasDefault: false;
}>;
declare class SQLiteRealBuilder<T extends ColumnBuilderBaseConfig> extends SQLiteColumnBuilder<SQLiteRealBuilderHKT, T> {
}
declare class SQLiteReal<T extends ColumnBaseConfig> extends SQLiteColumn<SQLiteRealHKT, T> {
    getSQLType(): string;
}
declare function real<TName extends string>(name: TName): SQLiteRealBuilderInitial<TName>;

interface SQLiteTextBuilderHKT extends ColumnBuilderHKTBase {
    _type: SQLiteTextBuilder<Assume<this['config'], ColumnBuilderBaseConfig>>;
    _columnHKT: SQLiteTextHKT;
}
interface SQLiteTextHKT extends ColumnHKTBase {
    _type: SQLiteText<Assume<this['config'], ColumnBaseConfig>>;
}
type SQLiteTextBuilderInitial<TName extends string, TEnum extends string[]> = SQLiteTextBuilder<{
    name: TName;
    data: TEnum[number];
    driverParam: string;
    enum: TEnum;
    notNull: false;
    hasDefault: false;
}>;
declare class SQLiteTextBuilder<T extends ColumnBuilderBaseConfig> extends SQLiteColumnBuilder<SQLiteTextBuilderHKT, T, {
    enum: string[];
}> {
    constructor(name: T['name'], config: SQLiteTextConfig<string[]>);
}
declare class SQLiteText<T extends ColumnBaseConfig> extends SQLiteColumn<SQLiteTextHKT, T> {
    readonly enum: string[];
    constructor(table: AnySQLiteTable<{
        name: T['tableName'];
    }>, config: SQLiteTextBuilder<T>['config']);
    getSQLType(): string;
}
interface SQLiteTextConfig<TEnum extends string[]> {
    enum?: TEnum;
}
declare function text<TName extends string, U extends string, T extends Readonly<[U, ...U[]]>>(name: TName, config?: SQLiteTextConfig<Writable<T>>): SQLiteTextBuilderInitial<TName, Writable<T>>;

export { AnySQLiteColumn, BlobConfig, ConvertCustomConfig, CustomTypeParams, CustomTypeValues, IntegerConfig, PrimaryKeyConfig, SQLiteBaseInteger, SQLiteBaseIntegerBuilder, SQLiteBlobBuffer, SQLiteBlobBufferBuilder, SQLiteBlobBufferBuilderHKT, SQLiteBlobBufferBuilderInitial, SQLiteBlobBufferHKT, SQLiteBlobJson, SQLiteBlobJsonBuilder, SQLiteBlobJsonBuilderHKT, SQLiteBlobJsonBuilderInitial, SQLiteBlobJsonHKT, SQLiteColumn, SQLiteCustomColumn, SQLiteCustomColumnBuilder, SQLiteCustomColumnBuilderHKT, SQLiteCustomColumnHKT, SQLiteCustomColumnInnerConfig, SQLiteInteger, SQLiteIntegerBuilder, SQLiteIntegerBuilderHKT, SQLiteIntegerBuilderInitial, SQLiteIntegerHKT, SQLiteNumeric, SQLiteNumericBuilder, SQLiteNumericBuilderHKT, SQLiteNumericBuilderInitial, SQLiteNumericHKT, SQLiteReal, SQLiteRealBuilder, SQLiteRealBuilderHKT, SQLiteRealBuilderInitial, SQLiteRealHKT, SQLiteText, SQLiteTextBuilder, SQLiteTextBuilderHKT, SQLiteTextBuilderInitial, SQLiteTextConfig, SQLiteTextHKT, SQLiteTimestamp, SQLiteTimestampBuilder, SQLiteTimestampBuilderHKT, SQLiteTimestampBuilderInitial, SQLiteTimestampHKT, blob, customType, int, integer, numeric, real, text };
