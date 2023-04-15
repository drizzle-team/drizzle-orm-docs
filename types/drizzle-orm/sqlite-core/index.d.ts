/// <reference types="node" />
/// <reference types="bun-types" />
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
type SelectedFieldsFlat$1<TColumn extends AnyColumn> = Record<string, TColumn | SQL | SQL.Aliased>;
type SelectedFields$1<TColumn extends AnyColumn, TTable extends Table> = Record<string, SelectedFieldsFlat$1<TColumn>[string] | TTable | SelectedFieldsFlat$1<TColumn>>;
type SelectedFieldsOrdered$1<TColumn extends AnyColumn> = {
    path: string[];
    field: TColumn | SQL | SQL.Aliased;
}[];

type UpdateSet = Record<string, SQL | Param | null | undefined>;
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
interface DrizzleTypeError<T> {
    $brand: 'DrizzleTypeError';
    message: T;
}
type ValueOrArray<T> = T | T[];
type Or<T1, T2> = T1 extends true ? true : T2 extends true ? true : false;
type Writable<T> = {
    -readonly [P in keyof T]: T[P];
};

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
type BuildColumns<TTableName extends string, TConfigMap extends Record<string, AnyColumnBuilder>> = Simplify<{
    [Key in keyof TConfigMap]: BuildColumn<TTableName, TConfigMap[Key]>;
}>;
type ChangeColumnTableName<TColumn extends AnyColumn, TAlias extends string> = ColumnKind<TColumn['_']['hkt'], Simplify<Update<TColumn['_']['config'], {
    tableName: TAlias;
}>>>;

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
type UpdateColConfig<T extends ColumnBaseConfig, TUpdate extends Partial<ColumnBaseConfig>> = Update<T, TUpdate>;
type AnyColumn<TPartial extends Partial<ColumnBaseConfig> = {}> = Column<ColumnHKT, Required<Update<ColumnBaseConfig, TPartial>>>;
type GetColumnData<TColumn extends AnyColumn, TInferMode extends 'query' | 'raw' = 'query'> = TInferMode extends 'raw' ? TColumn['_']['data'] : TColumn['_']['notNull'] extends true ? TColumn['_']['data'] : TColumn['_']['data'] | null;

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
        selectedFields: SelectedFields$1<AnyColumn, Table>;
        query: SQL | undefined;
    });
}

declare class Subquery<TAlias extends string = string, TSelectedFields = unknown> {
    _: {
        brand: 'Subquery';
        selectedFields: TSelectedFields;
        alias: TAlias;
    };
    constructor(sql: SQL, selection: SelectedFields$1<AnyColumn, Table>, alias: string, isWith?: boolean);
}
declare class WithSubquery<TAlias extends string = string, TSelection = unknown> extends Subquery<TAlias, TSelection> {
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

declare class CheckBuilder {
    name: string;
    value: SQL;
    protected brand: 'SQLiteConstraintBuilder';
    constructor(name: string, value: SQL);
    build(table: AnySQLiteTable): Check;
}
declare class Check {
    table: AnySQLiteTable;
    _: {
        brand: 'SQLiteCheck';
    };
    readonly name: string;
    readonly value: SQL;
    constructor(table: AnySQLiteTable, builder: CheckBuilder);
}
declare function check<TTableName extends string>(name: string, value: SQL): CheckBuilder;

interface IndexConfig {
    name: string;
    columns: IndexColumn[];
    unique: boolean;
    where: SQL | undefined;
}
type IndexColumn = AnySQLiteColumn | SQL;
declare class IndexBuilderOn {
    private name;
    private unique;
    constructor(name: string, unique: boolean);
    on(...columns: [IndexColumn, ...IndexColumn[]]): IndexBuilder;
}
declare class IndexBuilder {
    _: {
        brand: 'SQLiteIndexBuilder';
    };
    constructor(name: string, columns: IndexColumn[], unique: boolean);
    /**
     * Condition for partial index.
     */
    where(condition: SQL): this;
}
declare class Index {
    _: {
        brand: 'SQLiteIndex';
    };
    readonly config: IndexConfig & {
        table: AnySQLiteTable;
    };
    constructor(config: IndexConfig, table: AnySQLiteTable);
}
declare function index(name: string): IndexBuilderOn;
declare function uniqueIndex(name: string): IndexBuilderOn;

declare function primaryKey<TTableName extends string, TColumns extends AnySQLiteColumn<{
    tableName: TTableName;
}>[]>(...columns: TColumns): PrimaryKeyBuilder;
declare class PrimaryKeyBuilder {
    _: {
        brand: 'SQLitePrimaryKeyBuilder';
    };
    constructor(columns: AnySQLiteColumn[]);
}
declare class PrimaryKey {
    readonly table: AnySQLiteTable;
    readonly columns: AnySQLiteColumn<{}>[];
    constructor(table: AnySQLiteTable, columns: AnySQLiteColumn<{}>[]);
    getName(): string;
}

type SQLiteTableExtraConfig = Record<string, IndexBuilder | CheckBuilder | ForeignKeyBuilder | PrimaryKeyBuilder>;
type TableConfig = TableConfig$1<AnySQLiteColumn>;
declare class SQLiteTable<T extends TableConfig> extends Table<T> {
}
type AnySQLiteTable<TPartial extends Partial<TableConfig> = {}> = SQLiteTable<UpdateTableConfig<TableConfig, TPartial>>;
type SQLiteTableWithColumns<T extends TableConfig> = SQLiteTable<T> & {
    [Key in keyof T['columns']]: T['columns'][Key];
};
declare function sqliteTable<TTableName extends string, TColumnsMap extends Record<string, AnySQLiteColumnBuilder>>(name: TTableName, columns: TColumnsMap, extraConfig?: (self: BuildColumns<TTableName, TColumnsMap>) => SQLiteTableExtraConfig): SQLiteTableWithColumns<{
    name: TTableName;
    schema: undefined;
    columns: BuildColumns<TTableName, TColumnsMap>;
}>;
declare function sqliteTableCreator(customizeTableName: (name: string) => string): typeof sqliteTable;

type UpdateDeleteAction = 'cascade' | 'restrict' | 'no action' | 'set null' | 'set default';
type Reference = () => {
    readonly columns: AnySQLiteColumn[];
    readonly foreignTable: AnySQLiteTable;
    readonly foreignColumns: AnySQLiteColumn[];
};
declare class ForeignKeyBuilder {
    _: {
        brand: 'SQLiteForeignKeyBuilder';
        foreignTableName: 'TForeignTableName';
    };
    constructor(config: () => {
        columns: AnySQLiteColumn[];
        foreignColumns: AnySQLiteColumn[];
    }, actions?: {
        onUpdate?: UpdateDeleteAction;
        onDelete?: UpdateDeleteAction;
    } | undefined);
    onUpdate(action: UpdateDeleteAction): this;
    onDelete(action: UpdateDeleteAction): this;
}
declare class ForeignKey {
    readonly table: AnySQLiteTable;
    readonly reference: Reference;
    readonly onUpdate: UpdateDeleteAction | undefined;
    readonly onDelete: UpdateDeleteAction | undefined;
    constructor(table: AnySQLiteTable, builder: ForeignKeyBuilder);
    getName(): string;
}
type ColumnsWithTable<TTableName extends string, TColumns extends AnySQLiteColumn[]> = {
    [Key in keyof TColumns]: AnySQLiteColumn<{
        tableName: TTableName;
    }>;
};
declare function foreignKey<TTableName extends string, TForeignTableName extends string, TColumns extends [AnySQLiteColumn<{
    tableName: TTableName;
}>, ...AnySQLiteColumn<{
    tableName: TTableName;
}>[]]>(config: () => {
    columns: TColumns;
    foreignColumns: ColumnsWithTable<TForeignTableName, TColumns>;
}): ForeignKeyBuilder;

interface ReferenceConfig {
    ref: () => AnySQLiteColumn;
    actions: {
        onUpdate?: UpdateDeleteAction;
        onDelete?: UpdateDeleteAction;
    };
}
interface SQLiteColumnBuilderHKT extends ColumnBuilderHKTBase {
    _type: SQLiteColumnBuilder<SQLiteColumnBuilderHKT, Assume<this['config'], ColumnBuilderBaseConfig>>;
    _columnHKT: SQLiteColumnHKT;
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
type AnySQLiteColumnBuilder<TPartial extends Partial<ColumnBuilderBaseConfig> = {}> = SQLiteColumnBuilder<SQLiteColumnBuilderHKT, Required<Update<ColumnBuilderBaseConfig, TPartial>>>;
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

declare abstract class QueryBuilder<TSelection> implements SQLWrapper {
    _: {
        selectedFields: TSelection;
    };
    abstract getSQL(): SQL;
}

type JoinType = 'inner' | 'left' | 'right' | 'full';
type JoinNullability = 'nullable' | 'not-null';
type ApplyNullability<T, TNullability extends JoinNullability> = TNullability extends 'nullable' ? T | null : TNullability extends 'null' ? null : T;
type ApplyNullabilityToColumn<TColumn extends AnyColumn, TNullability extends JoinNullability> = TNullability extends 'not-null' ? TColumn : ColumnKind<TColumn['_']['hkt'], UpdateColConfig<TColumn['_']['config'], {
    notNull: TNullability extends 'nullable' ? false : TColumn['_']['notNull'];
}>>;
type ApplyNotNullMapToJoins<TResult, TNullabilityMap extends Record<string, JoinNullability>> = Simplify<{
    [TTableName in keyof TResult & keyof TNullabilityMap & string]: ApplyNullability<TResult[TTableName], TNullabilityMap[TTableName]>;
}>;
type SelectMode = 'partial' | 'single' | 'multiple';
type SelectResult<TResult, TSelectMode extends SelectMode, TNullabilityMap extends Record<string, JoinNullability>> = TSelectMode extends 'partial' ? SelectPartialResult<TResult, TNullabilityMap> : TSelectMode extends 'single' ? SelectResultFields<TResult> : ApplyNotNullMapToJoins<SelectResultFields<TResult>, TNullabilityMap>;
type IsUnion<T, U extends T = T> = (T extends any ? (U extends T ? false : true) : never) extends false ? false : true;
type Not<T extends boolean> = T extends true ? false : true;
type SelectPartialResult<TFields, TNullability extends Record<string, JoinNullability>> = TNullability extends TNullability ? {
    [Key in keyof TFields]: TFields[Key] extends infer TField ? TField extends AnyTable ? TField['_']['name'] extends keyof TNullability ? ApplyNullability<SelectResultFields<TField['_']['columns']>, TNullability[TField['_']['name']]> : never : TField extends AnyColumn ? TField['_']['tableName'] extends keyof TNullability ? ApplyNullability<SelectResultField<TField>, TNullability[TField['_']['tableName']]> : never : TField extends SQL | SQL.Aliased ? SelectResultField<TField> : TField extends Record<string, any> ? TField[keyof TField] extends AnyColumn<{
        tableName: infer TTableName extends string;
    }> | SQL | SQL.Aliased ? Not<IsUnion<TTableName>> extends true ? ApplyNullability<SelectResultFields<TField>, TNullability[TTableName]> : SelectPartialResult<TField, TNullability> : never : never : never;
} : never;
type MapColumnsToTableAlias<TColumns extends Record<string, AnyColumn | SQL | SQL.Aliased>, TAlias extends string> = Simplify<{
    [Key in keyof TColumns]: TColumns[Key] extends AnyColumn ? ChangeColumnTableName<Assume<TColumns[Key], AnyColumn>, TAlias> : TColumns[Key];
}>;
type AddAliasToSelection<TSelection, TAlias extends string> = Equal<TSelection, any> extends true ? any : Simplify<{
    [Key in keyof TSelection]: TSelection[Key] extends AnyColumn ? ChangeColumnTableName<TSelection[Key], TAlias> : TSelection[Key] extends SQL | SQL.Aliased ? TSelection[Key] : TSelection[Key] extends Record<string, AnyColumn | SQL | SQL.Aliased> ? MapColumnsToTableAlias<TSelection[Key], TAlias> : never;
}>;
type AppendToResult<TTableName extends string | undefined, TResult, TJoinedName extends string | undefined, TSelectedFields extends SelectedFields$1<AnyColumn, Table>, TOldSelectMode extends SelectMode> = TOldSelectMode extends 'partial' ? TResult : TOldSelectMode extends 'single' ? (TTableName extends string ? Record<TTableName, TResult> : TResult) & (TJoinedName extends string ? Record<TJoinedName, TSelectedFields> : TSelectedFields) : TResult & (TJoinedName extends string ? Record<TJoinedName, TSelectedFields> : TSelectedFields);
type BuildSubquerySelection<TSelection, TNullability extends Record<string, JoinNullability>> = TSelection extends never ? any : Simplify<{
    [Key in keyof TSelection]: TSelection[Key] extends SQL ? DrizzleTypeError<'You cannot reference this field without assigning it an alias first - use `.as(<alias>)`'> : TSelection[Key] extends SQL.Aliased ? TSelection[Key] : TSelection[Key] extends AnyColumn ? ApplyNullabilityToColumn<TSelection[Key], TNullability[TSelection[Key]['_']['tableName']]> : TSelection[Key] extends Record<string, AnyColumn | SQL | SQL.Aliased> ? BuildSubquerySelection<TSelection[Key], TNullability> : never;
}>;
type SetJoinsNullability<TNullabilityMap extends Record<string, JoinNullability>, TValue extends JoinNullability> = {
    [Key in keyof TNullabilityMap]: TValue;
};
type AppendToNullabilityMap<TJoinsNotNull extends Record<string, JoinNullability>, TJoinedName extends string | undefined, TJoinType extends JoinType> = TJoinedName extends string ? 'left' extends TJoinType ? TJoinsNotNull & {
    [name in TJoinedName]: 'nullable';
} : 'right' extends TJoinType ? SetJoinsNullability<TJoinsNotNull, 'nullable'> & {
    [name in TJoinedName]: 'not-null';
} : 'inner' extends TJoinType ? TJoinsNotNull & {
    [name in TJoinedName]: 'not-null';
} : 'full' extends TJoinType ? SetJoinsNullability<TJoinsNotNull, 'nullable'> & {
    [name in TJoinedName]: 'nullable';
} : never : TJoinsNotNull;
type GetSelectTableName<TTable extends AnyTable | Subquery | View | SQL> = TTable extends AnyTable ? TTable['_']['name'] : TTable extends Subquery ? TTable['_']['alias'] : TTable extends View ? TTable['_']['name'] : TTable extends SQL ? undefined : never;
type GetSelectTableSelection<TTable extends AnyTable | Subquery | View | SQL> = TTable extends AnyTable ? TTable['_']['columns'] : TTable extends Subquery | View ? TTable['_']['selectedFields'] : TTable extends SQL ? {} : never;
type SelectResultField<T, TDeep extends boolean = true> = T extends DrizzleTypeError<any> ? T : T extends AnyTable ? Equal<TDeep, true> extends true ? SelectResultField<T['_']['columns'], false> : never : T extends AnyColumn ? GetColumnData<T> : T extends SQL | SQL.Aliased ? T['_']['type'] : T extends Record<string, any> ? Equal<TDeep, true> extends true ? SelectResultFields<T, false> : never : never;
type SelectResultFields<TSelectedFields, TDeep extends boolean = true> = Simplify<{
    [Key in keyof TSelectedFields & string]: SelectResultField<TSelectedFields[Key], TDeep>;
}>;

interface MigrationMeta {
    sql: string[];
    folderMillis: number;
    hash: string;
    bps: boolean;
}

interface PreparedQueryConfig {
    type: 'sync' | 'async';
    run: unknown;
    all: unknown[];
    get: unknown;
    values: unknown[][];
}
declare abstract class PreparedQuery<T extends PreparedQueryConfig> {
    abstract run(placeholderValues?: Record<string, unknown>): ResultKind<T['type'], T['run']>;
    abstract all(placeholderValues?: Record<string, unknown>): ResultKind<T['type'], T['all']>;
    abstract get(placeholderValues?: Record<string, unknown>): ResultKind<T['type'], T['get']>;
    abstract values(placeholderValues?: Record<string, unknown>): ResultKind<T['type'], T['values']>;
}
declare abstract class SQLiteSession<TResultKind extends 'sync' | 'async' = 'sync' | 'async', TRunResult = unknown> {
    constructor(
    /** @internal */
    dialect: SQLiteDialect);
    abstract prepareQuery(query: Query, fields: SelectedFieldsOrdered | undefined, tx: Transaction<TResultKind, TRunResult> | undefined): PreparedQuery<PreparedQueryConfig & {
        type: TResultKind;
    }>;
    prepareOneTimeQuery(query: Query, fields: SelectedFieldsOrdered | undefined, tx: Transaction<TResultKind, TRunResult> | undefined): PreparedQuery<PreparedQueryConfig & {
        type: TResultKind;
    }>;
    abstract transaction(transaction: (tx: Transaction<TResultKind, TRunResult>) => void | Promise<void>): ResultKind<TResultKind, void>;
    run(query: SQL, tx?: Transaction<TResultKind, TRunResult>): ResultKind<TResultKind, TRunResult>;
    all<T = unknown>(query: SQL, tx?: Transaction<TResultKind, TRunResult>): ResultKind<TResultKind, T[]>;
    get<T = unknown>(query: SQL, tx?: Transaction<TResultKind, TRunResult>): ResultKind<TResultKind, T>;
    values<T extends any[] = unknown[]>(query: SQL, tx?: Transaction<TResultKind, TRunResult>): ResultKind<TResultKind, T[]>;
}
declare abstract class Transaction<TResultKind extends 'sync' | 'async' = 'sync' | 'async', TRunResult = unknown> {
    protected session: SQLiteSession<TResultKind, TRunResult>;
    constructor(session: SQLiteSession<TResultKind, TRunResult>);
    run(query: SQL): ResultKind<TResultKind, TRunResult>;
    all<T = unknown>(query: SQL): ResultKind<TResultKind, T[]>;
    get<T = unknown>(query: SQL): ResultKind<TResultKind, T>;
    values<T extends any[] = unknown[]>(query: SQL): ResultKind<TResultKind, T[]>;
}
interface ResultHKT {
    readonly $brand: 'SQLiteResultHKT';
    readonly config: unknown;
    readonly type: unknown;
}
interface SyncResultHKT extends ResultHKT {
    readonly type: this['config'];
}
interface AsyncResultHKT extends ResultHKT {
    readonly type: Promise<this['config']>;
}
type ResultKind<TType extends 'sync' | 'async', TResult> = (('sync' extends TType ? SyncResultHKT : AsyncResultHKT) & {
    readonly config: TResult;
})['type'];

declare abstract class SQLiteDialect {
    escapeName(name: string): string;
    escapeParam(num: number): string;
    escapeString(str: string): string;
    buildDeleteQuery({ table, where, returning }: SQLiteDeleteConfig): SQL;
    buildUpdateSet(table: AnySQLiteTable, set: UpdateSet): SQL;
    buildUpdateQuery({ table, set, where, returning }: SQLiteUpdateConfig): SQL;
    /**
     * Builds selection SQL with provided fields/expressions
     *
     * Examples:
     *
     * `select <selection> from`
     *
     * `insert ... returning <selection>`
     *
     * If `isSingleTable` is true, then columns won't be prefixed with table name
     */
    private buildSelection;
    buildSelectQuery({ withList, fieldsList, where, having, table, joins, orderBy, groupBy, limit, offset }: SQLiteSelectConfig): SQL;
    buildInsertQuery({ table, values, onConflict, returning }: SQLiteInsertConfig): SQL;
    sqlToQuery(sql: SQL): Query;
}
declare class SQLiteSyncDialect extends SQLiteDialect {
    migrate(migrations: MigrationMeta[], session: SQLiteSession<'sync'>): void;
}
declare class SQLiteAsyncDialect extends SQLiteDialect {
    migrate(migrations: MigrationMeta[], session: SQLiteSession<'async'>): Promise<void>;
}

interface SQLiteDeleteConfig {
    where?: SQL | undefined;
    table: AnySQLiteTable;
    returning?: SelectedFieldsOrdered;
}
interface SQLiteDelete<TTable extends AnySQLiteTable, TResultType extends 'sync' | 'async', TRunResult, TReturning = undefined> extends SQLWrapper {
}
declare class SQLiteDelete<TTable extends AnySQLiteTable, TResultType extends 'sync' | 'async', TRunResult, TReturning = undefined> implements SQLWrapper {
    private table;
    private session;
    private dialect;
    private config;
    constructor(table: TTable, session: SQLiteSession, dialect: SQLiteDialect);
    where(where: SQL | undefined): Omit<this, 'where'>;
    returning(): Omit<SQLiteDelete<TTable, TResultType, TRunResult, InferModel<TTable>>, 'where' | 'returning'>;
    returning<TSelectedFields extends SelectedFieldsFlat>(fields: TSelectedFields): Omit<SQLiteDelete<TTable, TResultType, TRunResult, SelectResultFields<TSelectedFields>>, 'where' | 'returning'>;
    toSQL(): Omit<Query, 'typings'>;
    prepare(): PreparedQuery<{
        type: TResultType;
        run: TRunResult;
        all: TReturning extends undefined ? never : TReturning[];
        get: TReturning extends undefined ? never : TReturning | undefined;
        values: TReturning extends undefined ? never : any[][];
    }>;
    run: ReturnType<this['prepare']>['run'];
    all: ReturnType<this['prepare']>['all'];
    get: ReturnType<this['prepare']>['get'];
    values: ReturnType<this['prepare']>['values'];
}

interface SQLiteUpdateConfig {
    where?: SQL | undefined;
    set: UpdateSet;
    table: AnySQLiteTable;
    returning?: SelectedFieldsOrdered;
}
type SQLiteUpdateSetSource<TTable extends AnySQLiteTable> = Simplify<{
    [Key in keyof TTable['_']['columns']]?: GetColumnData<TTable['_']['columns'][Key], 'query'> | SQL;
}>;
declare class SQLiteUpdateBuilder<TTable extends AnySQLiteTable, TResultType extends 'sync' | 'async', TRunResult> {
    protected table: TTable;
    protected session: SQLiteSession;
    protected dialect: SQLiteDialect;
    readonly _: {
        readonly table: TTable;
    };
    constructor(table: TTable, session: SQLiteSession, dialect: SQLiteDialect);
    set(values: SQLiteUpdateSetSource<TTable>): SQLiteUpdate<TTable, TResultType, TRunResult>;
}
interface SQLiteUpdate<TTable extends AnySQLiteTable, TResultType extends 'sync' | 'async', TRunResult, TReturning = undefined> extends SQLWrapper {
}
declare class SQLiteUpdate<TTable extends AnySQLiteTable, TResultType extends 'sync' | 'async', TRunResult, TReturning = undefined> implements SQLWrapper {
    private session;
    private dialect;
    readonly _: {
        readonly table: TTable;
    };
    private config;
    constructor(table: TTable, set: UpdateSet, session: SQLiteSession, dialect: SQLiteDialect);
    where(where: SQL | undefined): Omit<this, 'where'>;
    returning(): Omit<SQLiteUpdate<TTable, TResultType, TRunResult, InferModel<TTable>>, 'where' | 'returning'>;
    returning<TSelectedFields extends SelectedFields>(fields: TSelectedFields): Omit<SQLiteUpdate<TTable, TResultType, TRunResult, SelectResultFields<TSelectedFields>>, 'where' | 'returning'>;
    toSQL(): Omit<Query, 'typings'>;
    prepare(): PreparedQuery<{
        type: TResultType;
        run: TRunResult;
        all: TReturning extends undefined ? never : TReturning[];
        get: TReturning extends undefined ? never : TReturning;
        values: TReturning extends undefined ? never : any[][];
    }>;
    run: ReturnType<this['prepare']>['run'];
    all: ReturnType<this['prepare']>['all'];
    get: ReturnType<this['prepare']>['get'];
    values: ReturnType<this['prepare']>['values'];
}

interface SQLiteInsertConfig<TTable extends AnySQLiteTable = AnySQLiteTable> {
    table: TTable;
    values: Record<string, Param | SQL>[];
    onConflict?: SQL;
    returning?: SelectedFieldsOrdered;
}
type SQLiteInsertValue<TTable extends AnySQLiteTable> = Simplify<{
    [Key in keyof InferModel<TTable, 'insert'>]: InferModel<TTable, 'insert'>[Key] | SQL | Placeholder;
}>;
declare class SQLiteInsertBuilder<TTable extends AnySQLiteTable, TResultType extends 'sync' | 'async', TRunResult> {
    protected table: TTable;
    protected session: SQLiteSession;
    protected dialect: SQLiteDialect;
    constructor(table: TTable, session: SQLiteSession, dialect: SQLiteDialect);
    values(value: SQLiteInsertValue<TTable>): SQLiteInsert<TTable, TResultType, TRunResult>;
    values(values: SQLiteInsertValue<TTable>[]): SQLiteInsert<TTable, TResultType, TRunResult>;
    /**
     * @deprecated Pass the array of values without spreading it.
     */
    values(...values: SQLiteInsertValue<TTable>[]): SQLiteInsert<TTable, TResultType, TRunResult>;
}
interface SQLiteInsert<TTable extends AnySQLiteTable, TResultType extends 'sync' | 'async', TRunResult, TReturning = undefined> extends SQLWrapper {
}
declare class SQLiteInsert<TTable extends AnySQLiteTable, TResultType extends 'sync' | 'async', TRunResult, TReturning = undefined> implements SQLWrapper {
    private session;
    private dialect;
    readonly _: {
        readonly table: TTable;
        readonly resultType: TResultType;
        readonly runResult: TRunResult;
        readonly returning: TReturning;
    };
    private config;
    constructor(table: TTable, values: SQLiteInsertConfig['values'], session: SQLiteSession, dialect: SQLiteDialect);
    returning(): Omit<SQLiteInsert<TTable, TResultType, TRunResult, InferModel<TTable>>, 'returning' | `onConflict${string}`>;
    returning<TSelectedFields extends SelectedFieldsFlat>(fields: TSelectedFields): Omit<SQLiteInsert<TTable, TResultType, TRunResult, SelectResultFields<TSelectedFields>>, 'returning' | `onConflict${string}`>;
    onConflictDoNothing(config?: {
        target?: IndexColumn | IndexColumn[];
        where?: SQL;
    }): this;
    onConflictDoUpdate(config: {
        target?: IndexColumn | IndexColumn[];
        where?: SQL;
        set: SQLiteUpdateSetSource<TTable>;
    }): this;
    toSQL(): Simplify<Omit<Query, 'typings'>>;
    prepare(): PreparedQuery<{
        type: TResultType;
        run: TRunResult;
        all: TReturning extends undefined ? never : TReturning[];
        get: TReturning extends undefined ? never : TReturning;
        values: TReturning extends undefined ? never : any[][];
    }>;
    run: ReturnType<this['prepare']>['run'];
    all: ReturnType<this['prepare']>['all'];
    get: ReturnType<this['prepare']>['get'];
    values: ReturnType<this['prepare']>['values'];
}

type SubqueryWithSelection<TSelection, TAlias extends string> = Subquery<TAlias, AddAliasToSelection<TSelection, TAlias>> & AddAliasToSelection<TSelection, TAlias>;
type WithSubqueryWithSelection<TSelection, TAlias extends string> = WithSubquery<TAlias, AddAliasToSelection<TSelection, TAlias>> & AddAliasToSelection<TSelection, TAlias>;

type CreateSQLiteSelectFromBuilderMode<TBuilderMode extends 'db' | 'qb', TTableName extends string | undefined, TResultType extends 'sync' | 'async', TRunResult, TSelection, TSelectMode extends SelectMode> = TBuilderMode extends 'db' ? SQLiteSelect<TTableName, TResultType, TRunResult, TSelection, TSelectMode> : SQLiteSelectQueryBuilder<SQLiteSelectQueryBuilderHKT, TTableName, TResultType, TRunResult, TSelection, TSelectMode>;
declare class SQLiteSelectBuilder<TSelection extends SelectedFields | undefined, TResultType extends 'sync' | 'async', TRunResult, TBuilderMode extends 'db' | 'qb' = 'db'> {
    private fields;
    private session;
    private dialect;
    private withList;
    constructor(fields: TSelection, session: SQLiteSession | undefined, dialect: SQLiteDialect, withList?: Subquery[]);
    from<TFrom extends AnySQLiteTable | Subquery | SQLiteViewBase | SQL>(source: TFrom): CreateSQLiteSelectFromBuilderMode<TBuilderMode, GetSelectTableName<TFrom>, TResultType, TRunResult, TSelection extends undefined ? GetSelectTableSelection<TFrom> : TSelection, TSelection extends undefined ? 'single' : 'partial'>;
}
declare abstract class SQLiteSelectQueryBuilder<THKT extends SQLiteSelectHKTBase, TTableName extends string | undefined, TResultType extends 'sync' | 'async', TRunResult, TSelection, TSelectMode extends SelectMode, TNullabilityMap extends Record<string, JoinNullability> = TTableName extends string ? Record<TTableName, 'not-null'> : {}> extends QueryBuilder<BuildSubquerySelection<TSelection, TNullabilityMap>> {
    private isPartialSelect;
    protected session: SQLiteSession | undefined;
    protected dialect: SQLiteDialect;
    readonly _: {
        readonly selectMode: TSelectMode;
        readonly selection: TSelection;
        readonly selectedFields: BuildSubquerySelection<TSelection, TNullabilityMap>;
    };
    protected config: SQLiteSelectConfig;
    protected joinsNotNullableMap: Record<string, boolean>;
    private tableName;
    constructor(table: SQLiteSelectConfig['table'], fields: SQLiteSelectConfig['fields'], fieldsList: SQLiteSelectConfig['fieldsList'], isPartialSelect: boolean, session: SQLiteSession | undefined, dialect: SQLiteDialect, withList: Subquery[]);
    private createJoin;
    leftJoin: JoinFn<THKT, TTableName, TResultType, TRunResult, TSelectMode, "left", TSelection, TNullabilityMap>;
    rightJoin: JoinFn<THKT, TTableName, TResultType, TRunResult, TSelectMode, "right", TSelection, TNullabilityMap>;
    innerJoin: JoinFn<THKT, TTableName, TResultType, TRunResult, TSelectMode, "inner", TSelection, TNullabilityMap>;
    fullJoin: JoinFn<THKT, TTableName, TResultType, TRunResult, TSelectMode, "full", TSelection, TNullabilityMap>;
    where(where: ((aliases: TSelection) => SQL | undefined) | SQL | undefined): this;
    having(having: ((aliases: TSelection) => SQL | undefined) | SQL | undefined): this;
    groupBy(builder: (aliases: TSelection) => ValueOrArray<AnySQLiteColumn | SQL | SQL.Aliased>): this;
    groupBy(...columns: (AnySQLiteColumn | SQL)[]): this;
    orderBy(builder: (aliases: TSelection) => ValueOrArray<AnySQLiteColumn | SQL | SQL.Aliased>): this;
    orderBy(...columns: (AnySQLiteColumn | SQL)[]): this;
    limit(limit: number | Placeholder): this;
    offset(offset: number | Placeholder): this;
    toSQL(): Simplify<Omit<Query, 'typings'>>;
    as<TAlias extends string>(alias: TAlias): SubqueryWithSelection<BuildSubquerySelection<TSelection, TNullabilityMap>, TAlias>;
}
interface SQLiteSelect<TTableName extends string | undefined, TResultType extends 'sync' | 'async', TRunResult, TSelection, TSelectMode extends SelectMode = 'single', TNullabilityMap extends Record<string, JoinNullability> = TTableName extends string ? Record<TTableName, 'not-null'> : {}> extends SQLiteSelectQueryBuilder<SQLiteSelectHKT, TTableName | undefined, TResultType, TRunResult, TSelection, TSelectMode, TNullabilityMap> {
}
declare class SQLiteSelect<TTableName extends string | undefined, TResultType extends 'sync' | 'async', TRunResult, TSelection, TSelectMode extends SelectMode = 'single', TNullabilityMap extends Record<string, JoinNullability> = TTableName extends string ? Record<TTableName, 'not-null'> : {}> extends SQLiteSelectQueryBuilder<SQLiteSelectHKT, TTableName, TResultType, TRunResult, TSelection, TSelectMode, TNullabilityMap> {
    prepare(): PreparedQuery<{
        type: TResultType;
        run: TRunResult;
        all: SelectResult<TSelection, TSelectMode, TNullabilityMap>[];
        get: SelectResult<TSelection, TSelectMode, TNullabilityMap>;
        values: any[][];
    }>;
    run: ReturnType<this['prepare']>['run'];
    all: ReturnType<this['prepare']>['all'];
    get: ReturnType<this['prepare']>['get'];
    values: ReturnType<this['prepare']>['values'];
}

declare class QueryBuilderInstance {
    private dialect;
    private SQLiteSelectBuilder;
    constructor();
    $with<TAlias extends string>(alias: TAlias): {
        as<TSelection>(qb: QueryBuilder<TSelection> | ((qb: QueryBuilderInstance) => QueryBuilder<TSelection>)): WithSubqueryWithSelection<TSelection, TAlias>;
    };
    with(...queries: WithSubquery[]): {
        select: {
            (): SQLiteSelectBuilder<undefined, 'sync', void, 'qb'>;
            <TSelection extends SelectedFields>(fields: TSelection): SQLiteSelectBuilder<TSelection, "sync", void, "qb">;
        };
    };
    select(): SQLiteSelectBuilder<undefined, 'sync', void, 'qb'>;
    select<TSelection extends SelectedFields>(fields: TSelection): SQLiteSelectBuilder<TSelection, 'sync', void, 'qb'>;
    private getDialect;
}
declare const queryBuilder: QueryBuilderInstance;

interface ViewBuilderConfig {
    algorithm?: 'undefined' | 'merge' | 'temptable';
    definer?: string;
    sqlSecurity?: 'definer' | 'invoker';
    withCheckOption?: 'cascaded' | 'local';
}
declare class ViewBuilderCore<TConfig extends {
    name: string;
    columns?: unknown;
}> {
    protected name: TConfig['name'];
    readonly _: {
        readonly name: TConfig['name'];
        readonly columns: TConfig['columns'];
    };
    constructor(name: TConfig['name']);
    protected config: ViewBuilderConfig;
}
declare class ViewBuilder<TName extends string = string> extends ViewBuilderCore<{
    name: TName;
}> {
    as<TSelection extends SelectedFields>(qb: QueryBuilder<TSelection> | ((qb: QueryBuilderInstance) => QueryBuilder<TSelection>)): SQLiteViewWithSelection<TName, false, AddAliasToSelection<TSelection, TName>>;
}
declare class ManualViewBuilder<TName extends string = string, TColumns extends Record<string, AnySQLiteColumnBuilder> = Record<string, AnySQLiteColumnBuilder>> extends ViewBuilderCore<{
    name: TName;
    columns: TColumns;
}> {
    private columns;
    constructor(name: TName, columns: TColumns);
    existing(): SQLiteViewWithSelection<TName, true, BuildColumns<TName, TColumns>>;
    as(query: SQL): SQLiteViewWithSelection<TName, false, BuildColumns<TName, TColumns>>;
}
declare abstract class SQLiteViewBase<TName extends string = string, TExisting extends boolean = boolean, TSelection = unknown> extends View<TName, TExisting, TSelection> {
    _: View<TName, TExisting, TSelection>['_'] & {
        viewBrand: 'SQLiteView';
    };
}
declare const SQLiteViewConfig: unique symbol;
declare class SQLiteView<TName extends string = string, TExisting extends boolean = boolean, TSelection = unknown> extends SQLiteViewBase<TName, TExisting, TSelection> {
    [SQLiteViewConfig]: ViewBuilderConfig | undefined;
    constructor({ sqliteConfig, config }: {
        sqliteConfig: ViewBuilderConfig | undefined;
        config: {
            name: TName;
            schema: string | undefined;
            selectedFields: SelectedFields;
            query: SQL | undefined;
        };
    });
}
type SQLiteViewWithSelection<TName extends string, TExisting extends boolean, TSelection> = SQLiteView<TName, TExisting, TSelection> & TSelection;
declare function sqliteView<TName extends string>(name: TName): ViewBuilder<TName>;
declare function sqliteView<TName extends string, TColumns extends Record<string, AnySQLiteColumnBuilder>>(name: TName, columns: TColumns): ManualViewBuilder<TName, TColumns>;

declare function getTableConfig<TTable extends AnySQLiteTable>(table: TTable): {
    columns: AnySQLiteColumn[];
    indexes: Index[];
    foreignKeys: ForeignKey[];
    checks: Check[];
    primaryKeys: PrimaryKey[];
    name: string;
};
type OnConflict = 'rollback' | 'abort' | 'fail' | 'ignore' | 'replace';
declare function getViewConfig<TName extends string = string, TExisting extends boolean = boolean>(view: SQLiteView<TName, TExisting>): {
    algorithm?: "undefined" | "merge" | "temptable" | undefined;
    definer?: string | undefined;
    sqlSecurity?: "definer" | "invoker" | undefined;
    withCheckOption?: "local" | "cascaded" | undefined;
    name: TName;
    schema: string | undefined;
    selectedFields: SelectedFields$1<AnyColumn, Table<TableConfig$1<AnyColumn>>>;
    isExisting: TExisting;
    query: TExisting extends true ? undefined : SQL<unknown>;
};

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

interface JoinsValue {
    on: SQL | undefined;
    table: AnySQLiteTable | Subquery | SQL;
    alias: string | undefined;
    joinType: JoinType;
}
type AnySQLiteSelect = SQLiteSelect<any, any, any, any, any, any>;
type BuildAliasTable<TTable extends AnyTable, TAlias extends string> = SQLiteTableWithColumns<Assume<UpdateTableConfig<TTable['_']['config'], {
    name: TAlias;
    columns: MapColumnsToTableAlias<TTable['_']['columns'], TAlias>;
}>, TableConfig>>;
interface SQLiteSelectConfig {
    withList: Subquery[];
    fields: SelectedFields;
    fieldsList: SelectedFieldsOrdered;
    where?: SQL;
    having?: SQL;
    table: AnySQLiteTable | Subquery | SQLiteViewBase | SQL;
    limit?: number | Placeholder;
    offset?: number | Placeholder;
    joins: JoinsValue[];
    orderBy: (AnySQLiteColumn | SQL | SQL.Aliased)[];
    groupBy: (AnySQLiteColumn | SQL | SQL.Aliased)[];
}
type JoinFn<THKT extends SQLiteSelectHKTBase, TTableName extends string | undefined, TResultType extends 'sync' | 'async', TRunResult, TSelectMode extends SelectMode, TJoinType extends JoinType, TSelection, TNullabilityMap extends Record<string, JoinNullability>> = <TJoinedTable extends AnySQLiteTable | Subquery | SQL, TJoinedName extends GetSelectTableName<TJoinedTable> = GetSelectTableName<TJoinedTable>>(table: TJoinedTable, on: ((aliases: TSelection) => SQL | undefined) | SQL | undefined) => SQLiteSelectKind<THKT, TTableName, TResultType, TRunResult, AppendToResult<TTableName, TSelection, TJoinedName, TJoinedTable extends AnySQLiteTable ? TJoinedTable['_']['columns'] : TJoinedTable extends Subquery ? Assume<TJoinedTable['_']['selectedFields'], SelectedFields> : never, TSelectMode>, TSelectMode extends 'partial' ? TSelectMode : 'multiple', AppendToNullabilityMap<TNullabilityMap, TJoinedName, TJoinType>>;
type SelectedFieldsFlat = SelectedFieldsFlat$1<AnySQLiteColumn>;
type SelectedFields = SelectedFields$1<AnySQLiteColumn, AnySQLiteTable>;
type SelectedFieldsOrdered = SelectedFieldsOrdered$1<AnySQLiteColumn>;
interface SQLiteSelectHKTBase {
    tableName: string | undefined;
    resultType: 'sync' | 'async';
    runResult: unknown;
    selection: unknown;
    selectMode: SelectMode;
    nullabilityMap: unknown;
    _type: unknown;
}
type SQLiteSelectKind<T extends SQLiteSelectHKTBase, TTableName extends string | undefined, TResultType extends 'sync' | 'async', TRunResult, TSelection, TSelectMode extends SelectMode, TNullabilityMap extends Record<string, JoinNullability>> = (T & {
    tableName: TTableName;
    resultType: TResultType;
    runResult: TRunResult;
    selection: TSelection;
    selectMode: TSelectMode;
    nullabilityMap: TNullabilityMap;
})['_type'];
interface SQLiteSelectQueryBuilderHKT extends SQLiteSelectHKTBase {
    _type: SQLiteSelectQueryBuilder<this, this['tableName'], this['resultType'], this['runResult'], this['selection'], this['selectMode'], Assume<this['nullabilityMap'], Record<string, JoinNullability>>>;
}
interface SQLiteSelectHKT extends SQLiteSelectHKTBase {
    _type: SQLiteSelect<this['tableName'], this['resultType'], this['runResult'], this['selection'], this['selectMode'], Assume<this['nullabilityMap'], Record<string, JoinNullability>>>;
}

declare function alias<TTable extends AnySQLiteTable, TAlias extends string>(table: TTable, alias: TAlias): BuildAliasTable<TTable, TAlias>;

declare class BaseSQLiteDatabase<TResultType extends 'sync' | 'async', TRunResult> {
    constructor(
    /** @internal */
    dialect: {
        sync: SQLiteSyncDialect;
        async: SQLiteAsyncDialect;
    }[TResultType], 
    /** @internal */
    session: SQLiteSession<TResultType, TRunResult>);
    $with<TAlias extends string>(alias: TAlias): {
        as<TSelection>(qb: QueryBuilder<TSelection> | ((qb: QueryBuilderInstance) => QueryBuilder<TSelection>)): WithSubqueryWithSelection<TSelection, TAlias>;
    };
    with(...queries: WithSubquery[]): {
        select: {
            (): SQLiteSelectBuilder<undefined, TResultType, TRunResult>;
            <TSelection extends SelectedFields>(fields: TSelection): SQLiteSelectBuilder<TSelection, TResultType, TRunResult, "db">;
        };
    };
    select(): SQLiteSelectBuilder<undefined, TResultType, TRunResult>;
    select<TSelection extends SelectedFields>(fields: TSelection): SQLiteSelectBuilder<TSelection, TResultType, TRunResult>;
    update<TTable extends AnySQLiteTable>(table: TTable): SQLiteUpdateBuilder<TTable, TResultType, TRunResult>;
    insert<TTable extends AnySQLiteTable>(into: TTable): SQLiteInsertBuilder<TTable, TResultType, TRunResult>;
    delete<TTable extends AnySQLiteTable>(from: TTable): SQLiteDelete<TTable, TResultType, TRunResult>;
    run(query: SQLWrapper): ResultKind<TResultType, TRunResult>;
    all<T extends any = unknown>(query: SQLWrapper): ResultKind<TResultType, T[]>;
    get<T extends any = unknown>(query: SQLWrapper): ResultKind<TResultType, T>;
    values<T extends any[] = unknown[]>(query: SQLWrapper): ResultKind<TResultType, T[]>;
}

declare class UniqueBuilder<TTableName extends string> {
    name: string;
    column: AnySQLiteColumn;
    _: {
        brand: 'SQLiteUniqueBuilder';
        tableName: TTableName;
    };
    constructor(name: string, column: AnySQLiteColumn);
}
type AnyUniqueBuilder<TTableName extends string = string> = UniqueBuilder<TTableName>;
declare class Unique<TTableName extends string> {
    table: AnySQLiteTable<{
        name: TTableName;
    }>;
    readonly name: string;
    readonly column: AnySQLiteColumn;
    constructor(table: AnySQLiteTable<{
        name: TTableName;
    }>, builder: UniqueBuilder<TTableName>);
}
type BuildUnique<T extends AnyUniqueBuilder> = Unique<T['_']['tableName']>;
type AnyUnique = Unique<string>;
declare function unique<TTableName extends string>(name: string, column: AnySQLiteColumn<{
    tableName: TTableName;
}>): UniqueBuilder<TTableName>;

export { AnySQLiteColumn, AnySQLiteSelect, AnySQLiteTable, AnyUnique, AnyUniqueBuilder, BaseSQLiteDatabase, BlobConfig, BuildAliasTable, BuildUnique, Check, CheckBuilder, ConvertCustomConfig, CustomTypeParams, CustomTypeValues, ForeignKey, ForeignKeyBuilder, Index, IndexBuilder, IndexBuilderOn, IndexColumn, IndexConfig, IntegerConfig, JoinFn, JoinsValue, ManualViewBuilder, OnConflict, PreparedQuery, PreparedQueryConfig, PrimaryKey, PrimaryKeyBuilder, PrimaryKeyConfig, QueryBuilderInstance, Reference, ResultKind, SQLiteAsyncDialect, SQLiteBaseInteger, SQLiteBaseIntegerBuilder, SQLiteBlobBuffer, SQLiteBlobBufferBuilder, SQLiteBlobBufferBuilderHKT, SQLiteBlobBufferBuilderInitial, SQLiteBlobBufferHKT, SQLiteBlobJson, SQLiteBlobJsonBuilder, SQLiteBlobJsonBuilderHKT, SQLiteBlobJsonBuilderInitial, SQLiteBlobJsonHKT, SQLiteColumn, SQLiteCustomColumn, SQLiteCustomColumnBuilder, SQLiteCustomColumnBuilderHKT, SQLiteCustomColumnHKT, SQLiteCustomColumnInnerConfig, SQLiteDelete, SQLiteDeleteConfig, SQLiteDialect, SQLiteInsert, SQLiteInsertBuilder, SQLiteInsertConfig, SQLiteInsertValue, SQLiteInteger, SQLiteIntegerBuilder, SQLiteIntegerBuilderHKT, SQLiteIntegerBuilderInitial, SQLiteIntegerHKT, SQLiteNumeric, SQLiteNumericBuilder, SQLiteNumericBuilderHKT, SQLiteNumericBuilderInitial, SQLiteNumericHKT, SQLiteReal, SQLiteRealBuilder, SQLiteRealBuilderHKT, SQLiteRealBuilderInitial, SQLiteRealHKT, SQLiteSelect, SQLiteSelectBuilder, SQLiteSelectConfig, SQLiteSelectHKT, SQLiteSelectHKTBase, SQLiteSelectKind, SQLiteSelectQueryBuilder, SQLiteSelectQueryBuilderHKT, SQLiteSession, SQLiteSyncDialect, SQLiteTable, SQLiteTableExtraConfig, SQLiteTableWithColumns, SQLiteText, SQLiteTextBuilder, SQLiteTextBuilderHKT, SQLiteTextBuilderInitial, SQLiteTextConfig, SQLiteTextHKT, SQLiteTimestamp, SQLiteTimestampBuilder, SQLiteTimestampBuilderHKT, SQLiteTimestampBuilderInitial, SQLiteTimestampHKT, SQLiteUpdate, SQLiteUpdateBuilder, SQLiteUpdateConfig, SQLiteUpdateSetSource, SQLiteView, SQLiteViewBase, SQLiteViewConfig, SQLiteViewWithSelection, SelectedFields, SelectedFieldsFlat, SelectedFieldsOrdered, SubqueryWithSelection, TableConfig, Transaction, Unique, UniqueBuilder, UpdateDeleteAction, ViewBuilder, ViewBuilderConfig, ViewBuilderCore, WithSubqueryWithSelection, alias, blob, check, customType, foreignKey, getTableConfig, getViewConfig, index, int, integer, numeric, primaryKey, queryBuilder, real, sqliteTable, sqliteTableCreator, sqliteView, text, unique, uniqueIndex };
