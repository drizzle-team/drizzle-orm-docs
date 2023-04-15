import { ResultSetHeader } from 'mysql2/promise';

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
type SelectedFieldsFlat$1<TColumn extends AnyColumn> = Record<string, TColumn | SQL | SQL.Aliased>;
type SelectedFields$1<TColumn extends AnyColumn, TTable extends Table> = Record<string, SelectedFieldsFlat$1<TColumn>[string] | TTable | SelectedFieldsFlat$1<TColumn>>;
type SelectedFieldsOrdered$1<TColumn extends AnyColumn> = {
    path: string[];
    field: TColumn | SQL | SQL.Aliased;
}[];

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

declare class CheckBuilder {
    name: string;
    value: SQL;
    protected brand: 'MySqlConstraintBuilder';
    constructor(name: string, value: SQL);
}
declare class Check {
    table: AnyMySqlTable;
    readonly name: string;
    readonly value: SQL;
    constructor(table: AnyMySqlTable, builder: CheckBuilder);
}
declare function check(name: string, value: SQL): CheckBuilder;

interface IndexConfig {
    name: string;
    columns: IndexColumn[];
    /**
     * If true, the index will be created as `create unique index` instead of `create index`.
     */
    unique?: boolean;
    /**
     * If set, the index will be created as `create index ... using { 'btree' | 'hash' }`.
     */
    using?: 'btree' | 'hash';
    /**
     * If set, the index will be created as `create index ... algorythm { 'default' | 'inplace' | 'copy' }`.
     */
    algorythm?: 'default' | 'inplace' | 'copy';
    /**
     * If set, adds locks to the index creation.
     */
    lock?: 'default' | 'none' | 'shared' | 'exclusive';
}
type IndexColumn = AnyMySqlColumn | SQL;
declare class IndexBuilderOn {
    private name;
    private unique;
    constructor(name: string, unique: boolean);
    on(...columns: [IndexColumn, ...IndexColumn[]]): IndexBuilder;
}
interface AnyIndexBuilder {
    build(table: AnyMySqlTable): Index;
}
interface IndexBuilder extends AnyIndexBuilder {
}
declare class IndexBuilder implements AnyIndexBuilder {
    constructor(name: string, columns: IndexColumn[], unique: boolean);
    using(using: IndexConfig['using']): Omit<this, 'using'>;
    algorythm(algorythm: IndexConfig['algorythm']): Omit<this, 'algorythm'>;
    lock(lock: IndexConfig['lock']): Omit<this, 'lock'>;
}
declare class Index {
    readonly config: IndexConfig & {
        table: AnyMySqlTable;
    };
    constructor(config: IndexConfig, table: AnyMySqlTable);
}
type GetColumnsTableName<TColumns> = TColumns extends AnyMySqlColumn<{
    tableName: infer TTableName extends string;
}> | AnyMySqlColumn<{
    tableName: infer TTableName extends string;
}>[] ? TTableName : never;
declare function index(name: string): IndexBuilderOn;
declare function uniqueIndex(name: string): IndexBuilderOn;

declare function primaryKey<TTableName extends string, TColumns extends AnyMySqlColumn<{
    tableName: TTableName;
}>[]>(...columns: TColumns): PrimaryKeyBuilder;
declare class PrimaryKeyBuilder {
    constructor(columns: AnyMySqlColumn[]);
}
declare class PrimaryKey {
    readonly table: AnyMySqlTable;
    readonly columns: AnyMySqlColumn<{}>[];
    constructor(table: AnyMySqlTable, columns: AnyMySqlColumn<{}>[]);
    getName(): string;
}

type MySqlTableExtraConfig = Record<string, AnyIndexBuilder | CheckBuilder | ForeignKeyBuilder | PrimaryKeyBuilder>;
type TableConfig = TableConfig$1<AnyMySqlColumn>;
declare class MySqlTable<T extends TableConfig> extends Table<T> {
    protected $columns: T['columns'];
}
type AnyMySqlTable<TPartial extends Partial<TableConfig> = {}> = MySqlTable<UpdateTableConfig<TableConfig, TPartial>>;
type MySqlTableWithColumns<T extends TableConfig> = MySqlTable<T> & {
    [Key in keyof T['columns']]: T['columns'][Key];
};
declare function mysqlTableWithSchema<TTableName extends string, TSchemaName extends string | undefined, TColumnsMap extends Record<string, AnyMySqlColumnBuilder>>(name: TTableName, columns: TColumnsMap, extraConfig?: (self: BuildColumns<TTableName, TColumnsMap>) => MySqlTableExtraConfig, schema?: string): MySqlTableWithColumns<{
    name: TTableName;
    schema: TSchemaName;
    columns: BuildColumns<TTableName, TColumnsMap>;
}>;
declare function mysqlTable<TTableName extends string, TColumnsMap extends Record<string, AnyMySqlColumnBuilder>>(name: TTableName, columns: TColumnsMap, extraConfig?: (self: BuildColumns<TTableName, TColumnsMap>) => MySqlTableExtraConfig): MySqlTableWithColumns<{
    name: TTableName;
    schema: undefined;
    columns: BuildColumns<TTableName, TColumnsMap>;
}>;
declare function mysqlTableCreator(customizeTableName: (name: string) => string): typeof mysqlTable;

type UpdateDeleteAction = 'cascade' | 'restrict' | 'no action' | 'set null' | 'set default';
type Reference = () => {
    readonly columns: AnyMySqlColumn[];
    readonly foreignTable: AnyMySqlTable;
    readonly foreignColumns: AnyMySqlColumn[];
};
declare class ForeignKeyBuilder {
    constructor(config: () => {
        columns: AnyMySqlColumn[];
        foreignColumns: AnyMySqlColumn[];
    }, actions?: {
        onUpdate?: UpdateDeleteAction;
        onDelete?: UpdateDeleteAction;
    } | undefined);
    onUpdate(action: UpdateDeleteAction): this;
    onDelete(action: UpdateDeleteAction): this;
}
type AnyForeignKeyBuilder = ForeignKeyBuilder;
declare class ForeignKey {
    readonly table: AnyMySqlTable;
    readonly reference: Reference;
    readonly onUpdate: UpdateDeleteAction | undefined;
    readonly onDelete: UpdateDeleteAction | undefined;
    constructor(table: AnyMySqlTable, builder: ForeignKeyBuilder);
    getName(): string;
}
type ColumnsWithTable<TTableName extends string, TColumns extends AnyMySqlColumn[]> = {
    [Key in keyof TColumns]: AnyMySqlColumn<{
        tableName: TTableName;
    }>;
};
type GetColumnsTable<TColumns extends AnyMySqlColumn | AnyMySqlColumn[]> = (TColumns extends AnyMySqlColumn ? TColumns : TColumns extends AnyMySqlColumn[] ? TColumns[number] : never) extends AnyMySqlColumn<{
    tableName: infer TTableName extends string;
}> ? TTableName : never;
declare function foreignKey<TTableName extends string, TForeignTableName extends string, TColumns extends [AnyMySqlColumn<{
    tableName: TTableName;
}>, ...AnyMySqlColumn<{
    tableName: TTableName;
}>[]]>(config: {
    columns: TColumns;
    foreignColumns: ColumnsWithTable<TForeignTableName, TColumns>;
}): ForeignKeyBuilder;

interface ReferenceConfig {
    ref: () => AnyMySqlColumn;
    actions: {
        onUpdate?: UpdateDeleteAction;
        onDelete?: UpdateDeleteAction;
    };
}
interface MySqlColumnBuilderHKT extends ColumnBuilderHKTBase {
    _type: MySqlColumnBuilder<MySqlColumnBuilderHKT, Assume<this['config'], ColumnBuilderBaseConfig>>;
    _columnHKT: MySqlColumnHKT;
}
interface MySqlColumnHKT extends ColumnHKTBase {
    _type: MySqlColumn<MySqlColumnHKT, Assume<this['config'], ColumnBaseConfig>>;
}
declare abstract class MySqlColumnBuilder<THKT extends ColumnBuilderHKTBase, T extends ColumnBuilderBaseConfig, TRuntimeConfig extends object = {}, TTypeConfig extends Record<string, unknown> = {}> extends ColumnBuilder<THKT, T, TRuntimeConfig, TTypeConfig & {
    mysqlBrand: 'MySqlColumnBuilder';
}> {
    private foreignKeyConfigs;
    references(ref: ReferenceConfig['ref'], actions?: ReferenceConfig['actions']): this;
}
type AnyMySqlColumnBuilder<TPartial extends Partial<ColumnBuilderBaseConfig> = {}> = MySqlColumnBuilder<MySqlColumnBuilderHKT, Required<Update<ColumnBuilderBaseConfig, TPartial>>>;
declare abstract class MySqlColumn<THKT extends ColumnHKTBase, T extends ColumnBaseConfig, TRuntimeConfig extends object = {}> extends Column<THKT, T, TRuntimeConfig, {
    mysqlBrand: 'MySqlColumn';
}> {
}
type AnyMySqlColumn<TPartial extends Partial<ColumnBaseConfig> = {}> = MySqlColumn<MySqlColumnHKT, Required<Update<ColumnBaseConfig, TPartial>>>;
interface MySqlColumnWithAutoIncrementConfig {
    autoIncrement: boolean;
}
declare abstract class MySqlColumnBuilderWithAutoIncrement<THKT extends ColumnBuilderHKTBase, T extends ColumnBuilderBaseConfig, TRuntimeConfig extends object = {}> extends MySqlColumnBuilder<THKT, T, TRuntimeConfig & MySqlColumnWithAutoIncrementConfig> {
    constructor(name: NonNullable<T['name']>);
    autoincrement(): MySqlColumnBuilderWithAutoIncrement<THKT, UpdateCBConfig<T, {
        hasDefault: true;
    }>, TRuntimeConfig>;
}
declare abstract class MySqlColumnWithAutoIncrement<THKT extends ColumnHKTBase, T extends ColumnBaseConfig, TRuntimeConfig extends object = {}> extends MySqlColumn<THKT, T, MySqlColumnWithAutoIncrementConfig & TRuntimeConfig> {
    readonly autoIncrement: boolean;
}

interface MySqlBigInt53BuilderHKT extends ColumnBuilderHKTBase {
    _type: MySqlBigInt53Builder<Assume<this['config'], ColumnBuilderBaseConfig>>;
    _columnHKT: MySqlBigInt53HKT;
}
interface MySqlBigInt53HKT extends ColumnHKTBase {
    _type: MySqlBigInt53<Assume<this['config'], ColumnBaseConfig>>;
}
type MySqlBigInt53BuilderInitial<TName extends string> = MySqlBigInt53Builder<{
    name: TName;
    data: number;
    driverParam: number | string;
    notNull: false;
    hasDefault: false;
}>;
declare class MySqlBigInt53Builder<T extends ColumnBuilderBaseConfig> extends MySqlColumnBuilderWithAutoIncrement<MySqlBigInt53BuilderHKT, T> {
}
declare class MySqlBigInt53<T extends ColumnBaseConfig> extends MySqlColumnWithAutoIncrement<MySqlBigInt53HKT, T> {
    protected $mysqlColumnBrand: 'MySqlBigInt53';
    getSQLType(): string;
    mapFromDriverValue(value: number | string): number;
}
interface MySqlBigInt64BuilderHKT extends ColumnBuilderHKTBase {
    _type: MySqlBigInt64Builder<Assume<this['config'], ColumnBuilderBaseConfig>>;
    _columnHKT: MySqlBigInt64HKT;
}
interface MySqlBigInt64HKT extends ColumnHKTBase {
    _type: MySqlBigInt64<Assume<this['config'], ColumnBaseConfig>>;
}
type MySqlBigInt64BuilderInitial<TName extends string> = MySqlBigInt64Builder<{
    name: TName;
    data: bigint;
    driverParam: string;
    notNull: false;
    hasDefault: false;
}>;
declare class MySqlBigInt64Builder<T extends ColumnBuilderBaseConfig> extends MySqlColumnBuilderWithAutoIncrement<MySqlBigInt64BuilderHKT, T> {
}
declare class MySqlBigInt64<T extends ColumnBaseConfig> extends MySqlColumnWithAutoIncrement<MySqlBigInt64HKT, T> {
    getSQLType(): string;
    mapFromDriverValue(value: string): bigint;
}
interface MySqlBigIntConfig<T extends 'number' | 'bigint' = 'number' | 'bigint'> {
    mode: T;
}
declare function bigint<TName extends string, TMode extends MySqlBigIntConfig['mode']>(name: TName, config: MySqlBigIntConfig<TMode>): TMode extends 'number' ? MySqlBigInt53BuilderInitial<TName> : MySqlBigInt64BuilderInitial<TName>;

interface MySqlBinaryBuilderHKT extends ColumnBuilderHKTBase {
    _type: MySqlBinaryBuilder<Assume<this['config'], ColumnBuilderBaseConfig>>;
    _columnHKT: MySqlBinaryHKT;
}
interface MySqlBinaryHKT extends ColumnHKTBase {
    _type: MySqlBinary<Assume<this['config'], ColumnBaseConfig>>;
}
type MySqlBinaryBuilderInitial<TName extends string> = MySqlBinaryBuilder<{
    name: TName;
    data: string;
    driverParam: number | string;
    notNull: false;
    hasDefault: false;
}>;
declare class MySqlBinaryBuilder<T extends ColumnBuilderBaseConfig> extends MySqlColumnBuilder<MySqlBinaryBuilderHKT, T, MySqlBinaryConfig> {
    constructor(name: T['name'], length: number | undefined);
}
declare class MySqlBinary<T extends ColumnBaseConfig> extends MySqlColumn<MySqlBinaryHKT, T, MySqlBinaryConfig> {
    length: number | undefined;
    getSQLType(): string;
}
interface MySqlBinaryConfig {
    length?: number;
}
declare function binary<TName extends string>(name: TName, config?: MySqlBinaryConfig): MySqlBinaryBuilderInitial<TName>;

interface MySqlCharBuilderHKT extends ColumnBuilderHKTBase {
    _type: MySqlCharBuilder<Assume<this['config'], ColumnBuilderBaseConfig>>;
    _columnHKT: MySqlCharHKT;
}
interface MySqlCharHKT extends ColumnHKTBase {
    _type: MySqlChar<Assume<this['config'], ColumnBaseConfig>>;
}
type MySqlCharBuilderInitial<TName extends string, TEnum extends string[]> = MySqlCharBuilder<{
    name: TName;
    data: TEnum[number];
    driverParam: number | string;
    enum: TEnum;
    notNull: false;
    hasDefault: false;
}>;
declare class MySqlCharBuilder<T extends ColumnBuilderBaseConfig> extends MySqlColumnBuilder<MySqlCharBuilderHKT, T, MySqlCharConfig> {
    constructor(name: T['name'], config: MySqlCharConfig);
}
declare class MySqlChar<T extends ColumnBaseConfig> extends MySqlColumn<MySqlCharHKT, T, MySqlCharConfig> {
    readonly length: number | undefined;
    readonly enum: string[];
    getSQLType(): string;
}
interface MySqlCharConfig<TEnum extends string[] = string[]> {
    length?: number;
    enum?: TEnum;
}
declare function char<TName extends string, U extends string, T extends Readonly<[U, ...U[]]>>(name: TName, config?: MySqlCharConfig<Writable<T>>): MySqlCharBuilderInitial<TName, Writable<T>>;

interface MySqlBooleanBuilderHKT extends ColumnBuilderHKTBase {
    _type: MySqlBooleanBuilder<Assume<this['config'], ColumnBuilderBaseConfig>>;
    _columnHKT: MySqlBooleanHKT;
}
interface MySqlBooleanHKT extends ColumnHKTBase {
    _type: MySqlBoolean<Assume<this['config'], ColumnBaseConfig>>;
}
type MySqlBooleanBuilderInitial<TName extends string> = MySqlBooleanBuilder<{
    name: TName;
    data: boolean;
    driverParam: number | boolean;
    notNull: false;
    hasDefault: false;
}>;
declare class MySqlBooleanBuilder<T extends ColumnBuilderBaseConfig> extends MySqlColumnBuilder<MySqlBooleanBuilderHKT, T> {
}
declare class MySqlBoolean<T extends ColumnBaseConfig> extends MySqlColumn<MySqlBooleanHKT, T> {
    getSQLType(): string;
    mapFromDriverValue(value: number | boolean): boolean;
}
declare function boolean<TName extends string>(name: TName): MySqlBooleanBuilderInitial<TName>;

interface MySqlDecimalBuilderHKT extends ColumnBuilderHKTBase {
    _type: MySqlDecimalBuilder<Assume<this['config'], ColumnBuilderBaseConfig>>;
    _columnHKT: MySqlDecimalHKT;
}
interface MySqlDecimalHKT extends ColumnHKTBase {
    _type: MySqlDecimal<Assume<this['config'], ColumnBaseConfig>>;
}
type MySqlDecimalBuilderInitial<TName extends string> = MySqlDecimalBuilder<{
    name: TName;
    data: string;
    driverParam: string;
    notNull: false;
    hasDefault: false;
}>;
declare class MySqlDecimalBuilder<T extends ColumnBuilderBaseConfig> extends MySqlColumnBuilderWithAutoIncrement<MySqlDecimalBuilderHKT, T, MySqlDecimalConfig> {
    constructor(name: T['name'], precision?: number, scale?: number);
}
declare class MySqlDecimal<T extends ColumnBaseConfig> extends MySqlColumnWithAutoIncrement<MySqlDecimalHKT, T, MySqlDecimalConfig> {
    readonly precision: number | undefined;
    readonly scale: number | undefined;
    getSQLType(): string;
}
interface MySqlDecimalConfig {
    precision?: number;
    scale?: number;
}
declare function decimal<TName extends string>(name: TName, config?: MySqlDecimalConfig): MySqlDecimalBuilderInitial<TName>;

interface MySqlDoubleBuilderHKT extends ColumnBuilderHKTBase {
    _type: MySqlDoubleBuilder<Assume<this['config'], ColumnBuilderBaseConfig>>;
    _columnHKT: MySqlDoubleHKT;
}
interface MySqlDoubleHKT extends ColumnHKTBase {
    _type: MySqlDouble<Assume<this['config'], ColumnBaseConfig>>;
}
type MySqlDoubleBuilderInitial<TName extends string> = MySqlDoubleBuilder<{
    name: TName;
    data: number;
    driverParam: number | string;
    notNull: false;
    hasDefault: false;
}>;
declare class MySqlDoubleBuilder<T extends ColumnBuilderBaseConfig> extends MySqlColumnBuilderWithAutoIncrement<MySqlDoubleBuilderHKT, T, MySqlDoubleConfig> {
    constructor(name: T['name'], config: MySqlDoubleConfig | undefined);
}
declare class MySqlDouble<T extends ColumnBaseConfig> extends MySqlColumnWithAutoIncrement<MySqlDoubleHKT, T, MySqlDoubleConfig> {
    precision: number | undefined;
    scale: number | undefined;
    getSQLType(): string;
}
interface MySqlDoubleConfig {
    precision?: number;
    scale?: number;
}
declare function double<TName extends string>(name: TName, config?: MySqlDoubleConfig): MySqlDoubleBuilderInitial<TName>;

interface MySqlEnumColumnBuilderHKT extends ColumnBuilderHKTBase {
    _type: MySqlEnumColumnBuilder<Assume<this['config'], ColumnBuilderBaseConfig>>;
    _columnHKT: MySqlEnumColumnHKT;
}
interface MySqlEnumColumnHKT extends ColumnHKTBase {
    _type: MySqlEnumColumn<Assume<this['config'], ColumnBaseConfig>>;
}
type MySqlEnumColumnBuilderInitial<TName extends string, TEnum extends string[]> = MySqlEnumColumnBuilder<{
    name: TName;
    data: TEnum[number];
    driverParam: string;
    enum: TEnum;
    notNull: false;
    hasDefault: false;
}>;
declare class MySqlEnumColumnBuilder<T extends ColumnBuilderBaseConfig> extends MySqlColumnBuilder<MySqlEnumColumnBuilderHKT, T, {
    values: string[];
}> {
    constructor(name: T['name'], values: string[]);
}
declare class MySqlEnumColumn<T extends ColumnBaseConfig> extends MySqlColumn<MySqlEnumColumnHKT, T, {
    values: readonly string[];
}> {
    readonly values: readonly string[];
    getSQLType(): string;
}
declare function mysqlEnum<TName extends string, U extends string, T extends Readonly<[U, ...U[]]>>(name: TName, values: T | Writable<T>): MySqlEnumColumnBuilderInitial<TName, Writable<T>>;

interface MySqlFloatBuilderHKT extends ColumnBuilderHKTBase {
    _type: MySqlFloatBuilder<Assume<this['config'], ColumnBuilderBaseConfig>>;
    _columnHKT: MySqlFloatHKT;
}
interface MySqlFloatHKT extends ColumnHKTBase {
    _type: MySqlFloat<Assume<this['config'], ColumnBaseConfig>>;
}
type MySqlFloatBuilderInitial<TName extends string> = MySqlFloatBuilder<{
    name: TName;
    data: number;
    driverParam: number | string;
    notNull: false;
    hasDefault: false;
}>;
declare class MySqlFloatBuilder<T extends ColumnBuilderBaseConfig> extends MySqlColumnBuilderWithAutoIncrement<MySqlFloatBuilderHKT, T> {
}
declare class MySqlFloat<T extends ColumnBaseConfig> extends MySqlColumnWithAutoIncrement<MySqlFloatHKT, T> {
    getSQLType(): string;
}
declare function float<TName extends string>(name: TName): MySqlFloatBuilderInitial<TName>;

interface MySqlIntBuilderHKT extends ColumnBuilderHKTBase {
    _type: MySqlIntBuilder<Assume<this['config'], ColumnBuilderBaseConfig>>;
    _columnHKT: MySqlIntHKT;
}
interface MySqlIntHKT extends ColumnHKTBase {
    _type: MySqlInt<Assume<this['config'], ColumnBaseConfig>>;
}
type MySqlIntBuilderInitial<TName extends string> = MySqlIntBuilder<{
    name: TName;
    data: number;
    driverParam: number | string;
    notNull: false;
    hasDefault: false;
}>;
declare class MySqlIntBuilder<T extends ColumnBuilderBaseConfig> extends MySqlColumnBuilderWithAutoIncrement<MySqlIntBuilderHKT, T> {
}
declare class MySqlInt<T extends ColumnBaseConfig> extends MySqlColumnWithAutoIncrement<MySqlIntHKT, T> {
    getSQLType(): string;
    mapFromDriverValue(value: number | string): number;
}
declare function int<TName extends string>(name: TName): MySqlIntBuilderInitial<TName>;

interface MySqlJsonBuilderHKT extends ColumnBuilderHKTBase {
    _type: MySqlJsonBuilder<Assume<this['config'], ColumnBuilderBaseConfig>>;
    _columnHKT: MySqlJsonHKT;
}
interface MySqlJsonHKT extends ColumnHKTBase {
    _type: MySqlJson<Assume<this['config'], ColumnBaseConfig>>;
}
type MySqlJsonBuilderInitial<TName extends string> = MySqlJsonBuilder<{
    name: TName;
    data: unknown;
    driverParam: string;
    notNull: false;
    hasDefault: false;
}>;
declare class MySqlJsonBuilder<T extends ColumnBuilderBaseConfig> extends MySqlColumnBuilder<MySqlJsonBuilderHKT, T> {
}
declare class MySqlJson<T extends ColumnBaseConfig> extends MySqlColumn<MySqlJsonHKT, T> {
    getSQLType(): string;
    mapToDriverValue(value: T['data']): string;
}
declare function json<TName extends string>(name: TName): MySqlJsonBuilderInitial<TName>;

interface MySqlMediumIntBuilderHKT extends ColumnBuilderHKTBase {
    _type: MySqlMediumIntBuilder<Assume<this['config'], ColumnBuilderBaseConfig>>;
    _columnHKT: MySqlMediumIntHKT;
}
interface MySqlMediumIntHKT extends ColumnHKTBase {
    _type: MySqlMediumInt<Assume<this['config'], ColumnBaseConfig>>;
}
type MySqlMediumIntBuilderInitial<TName extends string> = MySqlMediumIntBuilder<{
    name: TName;
    data: number;
    driverParam: number | string;
    notNull: false;
    hasDefault: false;
}>;
declare class MySqlMediumIntBuilder<T extends ColumnBuilderBaseConfig> extends MySqlColumnBuilderWithAutoIncrement<MySqlMediumIntBuilderHKT, T> {
}
declare class MySqlMediumInt<T extends ColumnBaseConfig> extends MySqlColumnWithAutoIncrement<MySqlMediumIntHKT, T> {
    getSQLType(): string;
    mapFromDriverValue(value: number | string): number;
}
declare function mediumint<TName extends string>(name: TName): MySqlMediumIntBuilderInitial<TName>;

interface MySqlRealBuilderHKT extends ColumnBuilderHKTBase {
    _type: MySqlRealBuilder<Assume<this['config'], ColumnBuilderBaseConfig>>;
    _columnHKT: MySqlRealHKT;
}
interface MySqlRealHKT extends ColumnHKTBase {
    _type: MySqlReal<Assume<this['config'], ColumnBaseConfig>>;
}
type MySqlRealBuilderInitial<TName extends string> = MySqlRealBuilder<{
    name: TName;
    data: number;
    driverParam: number | string;
    notNull: false;
    hasDefault: false;
}>;
declare class MySqlRealBuilder<T extends ColumnBuilderBaseConfig> extends MySqlColumnBuilderWithAutoIncrement<MySqlRealBuilderHKT, T, MySqlRealConfig> {
    constructor(name: T['name'], config: MySqlRealConfig | undefined);
}
declare class MySqlReal<T extends ColumnBaseConfig> extends MySqlColumnWithAutoIncrement<MySqlRealHKT, T, MySqlRealConfig> {
    precision: number | undefined;
    scale: number | undefined;
    getSQLType(): string;
}
interface MySqlRealConfig {
    precision?: number;
    scale?: number;
}
declare function real<TName extends string>(name: TName, config?: MySqlRealConfig): MySqlRealBuilderInitial<TName>;

interface MySqlSerialBuilderHKT extends ColumnBuilderHKTBase {
    _type: MySqlSerialBuilder<Assume<this['config'], ColumnBuilderBaseConfig>>;
    _columnHKT: MySqlSerialHKT;
}
interface MySqlSerialHKT extends ColumnHKTBase {
    _type: MySqlSerial<Assume<this['config'], ColumnBaseConfig>>;
}
type MySqlSerialBuilderInitial<TName extends string> = MySqlSerialBuilder<{
    name: TName;
    data: number;
    driverParam: number;
    notNull: true;
    hasDefault: true;
}>;
declare class MySqlSerialBuilder<T extends ColumnBuilderBaseConfig> extends MySqlColumnBuilderWithAutoIncrement<MySqlSerialBuilderHKT, T> {
    constructor(name: T['name']);
}
declare class MySqlSerial<T extends ColumnBaseConfig> extends MySqlColumnWithAutoIncrement<MySqlSerialHKT, T> {
    getSQLType(): string;
    mapFromDriverValue(value: number | string): number;
}
declare function serial<TName extends string>(name: TName): MySqlSerialBuilderInitial<TName>;

interface MySqlSmallIntBuilderHKT extends ColumnBuilderHKTBase {
    _type: MySqlSmallIntBuilder<Assume<this['config'], ColumnBuilderBaseConfig>>;
    _columnHKT: MySqlSmallIntHKT;
}
interface MySqlSmallIntHKT extends ColumnHKTBase {
    _type: MySqlSmallInt<Assume<this['config'], ColumnBaseConfig>>;
}
type MySqlSmallIntBuilderInitial<TName extends string> = MySqlSmallIntBuilder<{
    name: TName;
    data: number;
    driverParam: number | string;
    notNull: false;
    hasDefault: false;
}>;
declare class MySqlSmallIntBuilder<T extends ColumnBuilderBaseConfig> extends MySqlColumnBuilderWithAutoIncrement<MySqlSmallIntBuilderHKT, T> {
}
declare class MySqlSmallInt<T extends ColumnBaseConfig> extends MySqlColumnWithAutoIncrement<MySqlSmallIntHKT, T> {
    getSQLType(): string;
    mapFromDriverValue(value: number | string): number;
}
declare function smallint<TName extends string>(name: TName): MySqlSmallIntBuilderInitial<TName>;

type MySqlTextColumnType = 'tinytext' | 'text' | 'mediumtext' | 'longtext';
interface MySqlTextBuilderHKT extends ColumnBuilderHKTBase {
    _type: MySqlTextBuilder<Assume<this['config'], ColumnBuilderBaseConfig>>;
    _columnHKT: MySqlTextHKT;
}
interface MySqlTextHKT extends ColumnHKTBase {
    _type: MySqlText<Assume<this['config'], ColumnBaseConfig>>;
}
type MySqlTextBuilderInitial<TName extends string, TEnum extends string[]> = MySqlTextBuilder<{
    name: TName;
    data: TEnum[number];
    driverParam: string;
    enum: TEnum;
    notNull: false;
    hasDefault: false;
}>;
declare class MySqlTextBuilder<T extends ColumnBuilderBaseConfig> extends MySqlColumnBuilder<MySqlTextBuilderHKT, T, {
    textType: MySqlTextColumnType;
    enum: string[];
}> {
    constructor(name: T['name'], textType: MySqlTextColumnType, config: MySqlTextConfig<string[]>);
}
declare class MySqlText<T extends ColumnBaseConfig> extends MySqlColumn<MySqlTextHKT, T, {
    textType: MySqlTextColumnType;
    enum: string[];
}> {
    private textType;
    readonly enum: string[];
    getSQLType(): string;
}
interface MySqlTextConfig<TEnum extends string[]> {
    enum?: TEnum;
}
declare function text<TName extends string, U extends string, T extends Readonly<[U, ...U[]]>>(name: TName, config?: MySqlTextConfig<Writable<T>>): MySqlTextBuilderInitial<TName, Writable<T>>;
declare function tinytext<TName extends string, U extends string, T extends Readonly<[U, ...U[]]>>(name: TName, config?: MySqlTextConfig<Writable<T>>): MySqlTextBuilderInitial<TName, Writable<T>>;
declare function mediumtext<TName extends string, U extends string, T extends Readonly<[U, ...U[]]>>(name: TName, config?: MySqlTextConfig<Writable<T>>): MySqlTextBuilderInitial<TName, Writable<T>>;
declare function longtext<TName extends string, U extends string, T extends Readonly<[U, ...U[]]>>(name: TName, config?: MySqlTextConfig<Writable<T>>): MySqlTextBuilderInitial<TName, Writable<T>>;

interface MySqlDateColumnBaseConfig {
    hasOnUpdateNow: boolean;
}
declare abstract class MySqlDateColumnBaseBuilder<THKT extends ColumnBuilderHKTBase, T extends ColumnBuilderBaseConfig, TRuntimeConfig extends object = {}> extends MySqlColumnBuilder<THKT, T, TRuntimeConfig & MySqlDateColumnBaseConfig> {
    defaultNow(): ColumnBuilderKind<THKT, Simplify<Omit<T, "hasDefault"> & {
        hasDefault: true;
    }, {}>>;
    onUpdateNow(): ColumnBuilderKind<THKT, UpdateCBConfig<T, {
        hasDefault: true;
    }>>;
}
declare abstract class MySqlDateBaseColumn<THKT extends ColumnHKTBase, T extends ColumnBaseConfig, TRuntimeConfig extends object = {}> extends MySqlColumn<THKT, T, MySqlDateColumnBaseConfig & TRuntimeConfig> {
    readonly hasOnUpdateNow: boolean;
}

interface MySqlTimestampBuilderHKT extends ColumnBuilderHKTBase {
    _type: MySqlTimestampBuilder<Assume<this['config'], ColumnBuilderBaseConfig>>;
    _columnHKT: MySqlTimestampHKT;
}
interface MySqlTimestampHKT extends ColumnHKTBase {
    _type: MySqlTimestamp<Assume<this['config'], ColumnBaseConfig>>;
}
type MySqlTimestampBuilderInitial<TName extends string> = MySqlTimestampBuilder<{
    name: TName;
    data: Date;
    driverParam: string | number;
    notNull: false;
    hasDefault: false;
}>;
declare class MySqlTimestampBuilder<T extends ColumnBuilderBaseConfig> extends MySqlDateColumnBaseBuilder<MySqlTimestampBuilderHKT, T, MySqlTimestampConfig> {
    constructor(name: T['name'], config: MySqlTimestampConfig | undefined);
}
declare class MySqlTimestamp<T extends ColumnBaseConfig> extends MySqlDateBaseColumn<MySqlTimestampHKT, T, MySqlTimestampConfig> {
    readonly fsp: number | undefined;
    getSQLType(): string;
    mapFromDriverValue(value: string): Date;
    mapToDriverValue(value: Date): string;
}
interface MySqlTimestampStringBuilderHKT extends ColumnBuilderHKTBase {
    _type: MySqlTimestampStringBuilder<Assume<this['config'], ColumnBuilderBaseConfig>>;
    _columnHKT: MySqlTimestampStringHKT;
}
interface MySqlTimestampStringHKT extends ColumnHKTBase {
    _type: MySqlTimestampString<Assume<this['config'], ColumnBaseConfig>>;
}
type MySqlTimestampStringBuilderInitial<TName extends string> = MySqlTimestampStringBuilder<{
    name: TName;
    data: string;
    driverParam: string | number;
    notNull: false;
    hasDefault: false;
}>;
declare class MySqlTimestampStringBuilder<T extends ColumnBuilderBaseConfig> extends MySqlDateColumnBaseBuilder<MySqlTimestampStringBuilderHKT, T, MySqlTimestampConfig> {
    constructor(name: T['name'], config: MySqlTimestampConfig | undefined);
}
declare class MySqlTimestampString<T extends ColumnBaseConfig> extends MySqlDateBaseColumn<MySqlTimestampStringHKT, T, MySqlTimestampConfig> {
    readonly fsp: number | undefined;
    getSQLType(): string;
}
type TimestampFsp = 0 | 1 | 2 | 3 | 4 | 5 | 6;
interface MySqlTimestampConfig<TMode extends 'string' | 'date' = 'string' | 'date'> {
    mode?: TMode;
    fsp?: TimestampFsp;
}
declare function timestamp<TName extends string, TMode extends MySqlTimestampConfig['mode'] & {}>(name: TName, config?: MySqlTimestampConfig<TMode>): Equal<TMode, 'string'> extends true ? MySqlTimestampStringBuilderInitial<TName> : MySqlTimestampBuilderInitial<TName>;

interface MySqlTinyIntBuilderHKT extends ColumnBuilderHKTBase {
    _type: MySqlTinyIntBuilder<Assume<this['config'], ColumnBuilderBaseConfig>>;
    _columnHKT: MySqlTinyIntHKT;
}
interface MySqlTinyIntHKT extends ColumnHKTBase {
    _type: MySqlTinyInt<Assume<this['config'], ColumnBaseConfig>>;
}
type MySqlTinyIntBuilderInitial<TName extends string> = MySqlTinyIntBuilder<{
    name: TName;
    data: number;
    driverParam: number | string;
    notNull: false;
    hasDefault: false;
}>;
declare class MySqlTinyIntBuilder<T extends ColumnBuilderBaseConfig> extends MySqlColumnBuilderWithAutoIncrement<MySqlTinyIntBuilderHKT, T> {
}
declare class MySqlTinyInt<T extends ColumnBaseConfig> extends MySqlColumnWithAutoIncrement<MySqlTinyIntHKT, T> {
    getSQLType(): string;
    mapFromDriverValue(value: number | string): number;
}
declare function tinyint<TName extends string>(name: TName): MySqlTinyIntBuilderInitial<TName>;

interface MySqlVarBinaryBuilderHKT extends ColumnBuilderHKTBase {
    _type: MySqlVarBinaryBuilder<Assume<this['config'], ColumnBuilderBaseConfig>>;
    _columnHKT: MySqlVarBinaryHKT;
}
interface MySqlVarBinaryHKT extends ColumnHKTBase {
    _type: MySqlVarBinary<Assume<this['config'], ColumnBaseConfig>>;
}
type MySqlVarBinaryBuilderInitial<TName extends string> = MySqlVarBinaryBuilder<{
    name: TName;
    data: number;
    driverParam: number | string;
    notNull: false;
    hasDefault: false;
}>;
declare class MySqlVarBinaryBuilder<T extends ColumnBuilderBaseConfig> extends MySqlColumnBuilder<MySqlVarBinaryBuilderHKT, T, MySqlVarbinaryOptions> {
}
declare class MySqlVarBinary<T extends ColumnBaseConfig> extends MySqlColumn<MySqlVarBinaryHKT, T, MySqlVarbinaryOptions> {
    length: number | undefined;
    getSQLType(): string;
}
interface MySqlVarbinaryOptions {
    length: number;
}
declare function varbinary<TName extends string>(name: TName, options: MySqlVarbinaryOptions): MySqlVarBinaryBuilderInitial<TName>;

interface MySqlVarCharBuilderHKT extends ColumnBuilderHKTBase {
    _type: MySqlVarCharBuilder<Assume<this['config'], ColumnBuilderBaseConfig>>;
    _columnHKT: MySqlVarCharHKT;
}
interface MySqlVarCharHKT extends ColumnHKTBase {
    _type: MySqlVarChar<Assume<this['config'], ColumnBaseConfig>>;
}
type MySqlVarCharBuilderInitial<TName extends string, TEnum extends string[]> = MySqlVarCharBuilder<{
    name: TName;
    data: TEnum[number];
    driverParam: number | string;
    enum: TEnum;
    notNull: false;
    hasDefault: false;
}>;
declare class MySqlVarCharBuilder<T extends ColumnBuilderBaseConfig> extends MySqlColumnBuilder<MySqlVarCharBuilderHKT, T, MySqlVarcharConfig> {
}
declare class MySqlVarChar<T extends ColumnBaseConfig> extends MySqlColumn<MySqlVarCharHKT, T, MySqlVarcharConfig> {
    readonly length: number | undefined;
    readonly enum: string[] | undefined;
    getSQLType(): string;
}
interface MySqlVarcharConfig<TEnum extends string[] = string[]> {
    length: number;
    enum?: TEnum;
}
declare function varchar<TName extends string, U extends string, T extends Readonly<[U, ...U[]]>>(name: TName, config: MySqlVarcharConfig<Writable<T>>): MySqlVarCharBuilderInitial<TName, Writable<T>>;

interface MySqlDateBuilderHKT extends ColumnBuilderHKTBase {
    _type: MySqlDateBuilder<Assume<this['config'], ColumnBuilderBaseConfig>>;
    _columnHKT: MySqlDateHKT;
}
interface MySqlDateHKT extends ColumnHKTBase {
    _type: MySqlDate<Assume<this['config'], ColumnBaseConfig>>;
}
type MySqlDateBuilderInitial<TName extends string> = MySqlDateBuilder<{
    name: TName;
    data: Date;
    driverParam: string | number;
    notNull: false;
    hasDefault: false;
}>;
declare class MySqlDateBuilder<T extends ColumnBuilderBaseConfig> extends MySqlColumnBuilder<MySqlDateBuilderHKT, T> {
}
declare class MySqlDate<T extends ColumnBaseConfig> extends MySqlColumn<MySqlDateHKT, T> {
    constructor(table: AnyMySqlTable<{
        name: T['tableName'];
    }>, config: MySqlDateBuilder<T>['config']);
    getSQLType(): string;
    mapFromDriverValue(value: string): Date;
}
interface MySqlDateStringBuilderHKT extends ColumnBuilderHKTBase {
    _type: MySqlDateStringBuilder<Assume<this['config'], ColumnBuilderBaseConfig>>;
    _columnHKT: MySqlDateStringHKT;
}
interface MySqlDateStringHKT extends ColumnHKTBase {
    _type: MySqlDateString<Assume<this['config'], ColumnBaseConfig>>;
}
type MySqlDateStringBuilderInitial<TName extends string> = MySqlDateStringBuilder<{
    name: TName;
    data: string;
    driverParam: string | number;
    notNull: false;
    hasDefault: false;
}>;
declare class MySqlDateStringBuilder<T extends ColumnBuilderBaseConfig> extends MySqlColumnBuilder<MySqlDateStringBuilderHKT, T> {
}
declare class MySqlDateString<T extends ColumnBaseConfig> extends MySqlColumn<MySqlDateStringHKT, T> {
    constructor(table: AnyMySqlTable<{
        name: T['tableName'];
    }>, config: MySqlDateStringBuilder<T>['config']);
    getSQLType(): string;
}
interface MySqlDateConfig<TMode extends 'date' | 'string' = 'date' | 'string'> {
    mode?: TMode;
}
declare function date<TName extends string, TMode extends MySqlDateConfig['mode'] & {}>(name: TName, config?: MySqlDateConfig<TMode>): Equal<TMode, 'string'> extends true ? MySqlDateStringBuilderInitial<TName> : MySqlDateBuilderInitial<TName>;

interface MySqlDateTimeBuilderHKT extends ColumnBuilderHKTBase {
    _type: MySqlDateTimeBuilder<Assume<this['config'], ColumnBuilderBaseConfig>>;
    _columnHKT: MySqlDateTimeHKT;
}
interface MySqlDateTimeHKT extends ColumnHKTBase {
    _type: MySqlDateTime<Assume<this['config'], ColumnBaseConfig>>;
}
type MySqlDateTimeBuilderInitial<TName extends string> = MySqlDateTimeBuilder<{
    name: TName;
    data: Date;
    driverParam: string | number;
    notNull: false;
    hasDefault: false;
}>;
declare class MySqlDateTimeBuilder<T extends ColumnBuilderBaseConfig> extends MySqlColumnBuilder<MySqlDateTimeBuilderHKT, T, MySqlDatetimeConfig> {
    constructor(name: T['name'], config: MySqlDatetimeConfig | undefined);
}
declare class MySqlDateTime<T extends ColumnBaseConfig> extends MySqlColumn<MySqlDateTimeHKT, T> {
    readonly fsp: number | undefined;
    constructor(table: AnyMySqlTable<{
        name: T['tableName'];
    }>, config: MySqlDateTimeBuilder<T>['config']);
    getSQLType(): string;
    mapFromDriverValue(value: string): Date;
}
interface MySqlDateTimeStringBuilderHKT extends ColumnBuilderHKTBase {
    _type: MySqlDateTimeStringBuilder<Assume<this['config'], ColumnBuilderBaseConfig>>;
    _columnHKT: MySqlDateTimeStringHKT;
}
interface MySqlDateTimeStringHKT extends ColumnHKTBase {
    _type: MySqlDateTimeString<Assume<this['config'], ColumnBaseConfig>>;
}
type MySqlDateTimeStringBuilderInitial<TName extends string> = MySqlDateTimeStringBuilder<{
    name: TName;
    data: string;
    driverParam: string | number;
    notNull: false;
    hasDefault: false;
}>;
declare class MySqlDateTimeStringBuilder<T extends ColumnBuilderBaseConfig> extends MySqlColumnBuilder<MySqlDateTimeStringBuilderHKT, T, MySqlDatetimeConfig> {
    constructor(name: T['name'], config: MySqlDatetimeConfig | undefined);
}
declare class MySqlDateTimeString<T extends ColumnBaseConfig> extends MySqlColumn<MySqlDateTimeStringHKT, T> {
    readonly fsp: number | undefined;
    constructor(table: AnyMySqlTable<{
        name: T['tableName'];
    }>, config: MySqlDateTimeStringBuilder<T>['config']);
    getSQLType(): string;
}
type DatetimeFsp = 0 | 1 | 2 | 3 | 4 | 5 | 6;
interface MySqlDatetimeConfig<TMode extends 'date' | 'string' = 'date' | 'string'> {
    mode?: TMode;
    fsp?: DatetimeFsp;
}
declare function datetime<TName extends string, TMode extends MySqlDatetimeConfig['mode'] & {}>(name: TName, config?: MySqlDatetimeConfig<TMode>): Equal<TMode, 'string'> extends true ? MySqlDateTimeStringBuilderInitial<TName> : MySqlDateTimeBuilderInitial<TName>;

interface MySqlTimeBuilderHKT extends ColumnBuilderHKTBase {
    _type: MySqlTimeBuilder<Assume<this['config'], ColumnBuilderBaseConfig>>;
    _columnHKT: MySqlTimeHKT;
}
interface MySqlTimeHKT extends ColumnHKTBase {
    _type: MySqlTime<Assume<this['config'], ColumnBaseConfig>>;
}
type MySqlTimeBuilderInitial<TName extends string> = MySqlTimeBuilder<{
    name: TName;
    data: string;
    driverParam: string | number;
    notNull: false;
    hasDefault: false;
}>;
declare class MySqlTimeBuilder<T extends ColumnBuilderBaseConfig> extends MySqlColumnBuilder<MySqlTimeBuilderHKT, T, TimeConfig> {
    constructor(name: T['name'], config: TimeConfig | undefined);
}
declare class MySqlTime<T extends ColumnBaseConfig> extends MySqlColumn<MySqlTimeHKT, T, TimeConfig> {
    readonly fsp: number | undefined;
    getSQLType(): string;
}
type TimeConfig = {
    fsp?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
};
declare function time<TName extends string>(name: TName, config?: TimeConfig): MySqlTimeBuilderInitial<TName>;

interface MySqlYearBuilderHKT extends ColumnBuilderHKTBase {
    _type: MySqlYearBuilder<Assume<this['config'], ColumnBuilderBaseConfig>>;
    _columnHKT: MySqlYearHKT;
}
interface MySqlYearHKT extends ColumnHKTBase {
    _type: MySqlYear<Assume<this['config'], ColumnBaseConfig>>;
}
type MySqlYearBuilderInitial<TName extends string> = MySqlYearBuilder<{
    name: TName;
    data: string | number;
    driverParam: string | number;
    notNull: false;
    hasDefault: false;
}>;
declare class MySqlYearBuilder<T extends ColumnBuilderBaseConfig> extends MySqlColumnBuilder<MySqlYearBuilderHKT, T> {
}
declare class MySqlYear<T extends ColumnBaseConfig> extends MySqlColumn<MySqlYearHKT, T> {
    getSQLType(): string;
}
declare function year<TName extends string>(name: TName): MySqlYearBuilderInitial<TName>;

type ConvertCustomConfig<TName extends string, T extends Partial<CustomTypeValues>> = Simplify<{
    name: TName;
    data: T['data'];
    driverParam: T['driverData'];
    notNull: T['notNull'] extends true ? true : false;
    hasDefault: T['default'] extends true ? true : false;
}>;
interface MySqlCustomColumnInnerConfig {
    customTypeValues: CustomTypeValues;
}
interface MySqlCustomColumnBuilderHKT extends ColumnBuilderHKTBase {
    _type: MySqlCustomColumnBuilder<Assume<this['config'], ColumnBuilderBaseConfig>>;
    _columnHKT: MySqlCustomColumnHKT;
}
interface MySqlCustomColumnHKT extends ColumnHKTBase {
    _type: MySqlCustomColumn<Assume<this['config'], ColumnBaseConfig>>;
}
declare class MySqlCustomColumnBuilder<T extends ColumnBuilderBaseConfig> extends MySqlColumnBuilder<MySqlCustomColumnBuilderHKT, T, {
    fieldConfig: CustomTypeValues['config'];
    customTypeParams: CustomTypeParams<any>;
}, {
    mysqlColumnBuilderBrand: 'MySqlCustomColumnBuilderBrand';
}> {
    constructor(name: T['name'], fieldConfig: CustomTypeValues['config'], customTypeParams: CustomTypeParams<any>);
}
declare class MySqlCustomColumn<T extends ColumnBaseConfig> extends MySqlColumn<MySqlCustomColumnHKT, T> {
    protected $mysqlColumnBrand: 'MySqlCustomColumn';
    private sqlName;
    private mapTo?;
    private mapFrom?;
    constructor(table: AnyMySqlTable<{
        name: T['tableName'];
    }>, config: MySqlCustomColumnBuilder<T>['config']);
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
 * Custom mysql database data type generator
 */
declare function customType<T extends CustomTypeValues = CustomTypeValues>(customTypeParams: CustomTypeParams<T>): Equal<T['configRequired'], true> extends true ? <TName extends string>(dbName: TName, fieldConfig: T['config']) => MySqlCustomColumnBuilder<ConvertCustomConfig<TName, T>> : <TName extends string>(dbName: TName, fieldConfig?: T['config']) => MySqlCustomColumnBuilder<ConvertCustomConfig<TName, T>>;

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

interface QueryResultHKT {
    readonly $brand: 'MySqlQueryRowHKT';
    readonly row: unknown;
    readonly type: unknown;
}
type QueryResultKind<TKind extends QueryResultHKT, TRow> = (TKind & {
    readonly row: TRow;
})['type'];
interface PreparedQueryConfig {
    execute: unknown;
    all: unknown;
    values: unknown;
}
declare abstract class PreparedQuery<T extends PreparedQueryConfig> {
    abstract execute(placeholderValues?: Record<string, unknown>): Promise<T['execute']>;
}
declare abstract class MySqlSession {
    protected dialect: MySqlDialect;
    constructor(dialect: MySqlDialect);
    abstract prepareQuery<T extends PreparedQueryConfig = PreparedQueryConfig>(query: Query, fields: SelectedFieldsOrdered | undefined, name: string | undefined): PreparedQuery<T>;
    execute<T>(query: SQL): Promise<T>;
    all<T = unknown>(query: SQL): Promise<T[]>;
}

declare abstract class QueryPromise<T> implements Promise<T> {
    [Symbol.toStringTag]: string;
    catch<TResult = never>(onRejected?: ((reason: any) => TResult | PromiseLike<TResult>) | null | undefined): Promise<T | TResult>;
    finally(onFinally?: (() => void) | null | undefined): Promise<T>;
    then<TResult1 = T, TResult2 = never>(onFulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onRejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    abstract execute(): Promise<T>;
}

interface MySqlUpdateConfig {
    where?: SQL | undefined;
    set: UpdateSet;
    table: AnyMySqlTable;
    returning?: SelectedFieldsOrdered;
}
type MySqlUpdateSetSource<TTable extends AnyMySqlTable> = Simplify<{
    [Key in keyof TTable['_']['columns']]?: GetColumnData<TTable['_']['columns'][Key], 'query'> | SQL;
}>;
declare class MySqlUpdateBuilder<TTable extends AnyMySqlTable, TQueryResult extends QueryResultHKT> {
    private table;
    private session;
    private dialect;
    protected $table: TTable;
    constructor(table: TTable, session: MySqlSession, dialect: MySqlDialect);
    set(values: MySqlUpdateSetSource<TTable>): MySqlUpdate<TTable, TQueryResult>;
}
interface MySqlUpdate<TTable extends AnyMySqlTable, TQueryResult extends QueryResultHKT, TReturning = undefined> extends QueryPromise<TReturning extends undefined ? QueryResultKind<TQueryResult, never> : TReturning[]>, SQLWrapper {
}
declare class MySqlUpdate<TTable extends AnyMySqlTable, TQueryResult extends QueryResultHKT, TReturning = undefined> extends QueryPromise<TReturning extends undefined ? QueryResultKind<TQueryResult, never> : TReturning[]> implements SQLWrapper {
    private session;
    private dialect;
    protected $table: TTable;
    protected $return: TReturning;
    private config;
    constructor(table: TTable, set: UpdateSet, session: MySqlSession, dialect: MySqlDialect);
    where(where: SQL | undefined): Omit<this, 'where'>;
    toSQL(): Omit<Query, 'typings'>;
    private _prepare;
    prepare(name: string): PreparedQuery<PreparedQueryConfig & {
        execute: TReturning extends undefined ? QueryResultKind<TQueryResult, never> : TReturning[];
    }>;
    execute: ReturnType<this['prepare']>['execute'];
}

interface MySqlInsertConfig<TTable extends AnyMySqlTable = AnyMySqlTable> {
    table: TTable;
    values: Record<string, Param | SQL>[];
    ignore: boolean;
    onConflict?: SQL;
    returning?: SelectedFieldsOrdered;
}
type AnyMySqlInsertConfig = MySqlInsertConfig<AnyMySqlTable>;
type MySqlInsertValue<TTable extends AnyMySqlTable> = Simplify<{
    [Key in keyof InferModel<TTable, 'insert'>]: InferModel<TTable, 'insert'>[Key] | SQL | Placeholder;
}>;
declare class MySqlInsertBuilder<TTable extends AnyMySqlTable, TQueryResult extends QueryResultHKT> {
    private table;
    private session;
    private dialect;
    private shouldIgnore;
    constructor(table: TTable, session: MySqlSession, dialect: MySqlDialect);
    ignore(): this;
    values(value: MySqlInsertValue<TTable>): MySqlInsert<TTable, TQueryResult>;
    values(values: MySqlInsertValue<TTable>[]): MySqlInsert<TTable, TQueryResult>;
    /**
     * @deprecated Pass the array of values without spreading it.
     */
    values(...values: MySqlInsertValue<TTable>[]): MySqlInsert<TTable, TQueryResult>;
}
interface MySqlInsert<TTable extends AnyMySqlTable, TQueryResult extends QueryResultHKT, TReturning = undefined> extends QueryPromise<QueryResultKind<TQueryResult, never>>, SQLWrapper {
}
declare class MySqlInsert<TTable extends AnyMySqlTable, TQueryResult extends QueryResultHKT, TReturning = undefined> extends QueryPromise<QueryResultKind<TQueryResult, never>> implements SQLWrapper {
    private session;
    private dialect;
    protected $table: TTable;
    protected $return: TReturning;
    private config;
    constructor(table: TTable, values: MySqlInsertConfig['values'], ignore: boolean, session: MySqlSession, dialect: MySqlDialect);
    onDuplicateKeyUpdate(config: {
        set: MySqlUpdateSetSource<TTable>;
    }): this;
    toSQL(): Simplify<Omit<Query, 'typings'>>;
    private _prepare;
    prepare(name: string): PreparedQuery<PreparedQueryConfig & {
        execute: QueryResultKind<TQueryResult, never>;
    }>;
    execute: ReturnType<this['prepare']>['execute'];
}

declare class MySqlDialect {
    migrate(migrations: MigrationMeta[], session: MySqlSession): Promise<void>;
    escapeName(name: string): string;
    escapeParam(num: number): string;
    escapeString(str: string): string;
    buildDeleteQuery({ table, where, returning }: MySqlDeleteConfig): SQL;
    buildUpdateSet(table: AnyMySqlTable, set: UpdateSet): SQL;
    buildUpdateQuery({ table, set, where, returning }: MySqlUpdateConfig): SQL;
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
    buildSelectQuery({ withList, fieldsList, where, having, table, joins, orderBy, groupBy, limit, offset, lockingClause }: MySqlSelectConfig): SQL;
    buildInsertQuery({ table, values, ignore, onConflict, returning }: MySqlInsertConfig): SQL;
    sqlToQuery(sql: SQL): Query;
}

interface MySqlDeleteConfig {
    where?: SQL | undefined;
    table: AnyMySqlTable;
    returning?: SelectedFieldsOrdered;
}
interface MySqlDelete<TTable extends AnyMySqlTable, TQueryResult extends QueryResultHKT> extends QueryPromise<QueryResultKind<TQueryResult, never>> {
}
declare class MySqlDelete<TTable extends AnyMySqlTable, TQueryResult extends QueryResultHKT> extends QueryPromise<QueryResultKind<TQueryResult, never>> implements SQLWrapper {
    private table;
    private session;
    private dialect;
    private config;
    constructor(table: TTable, session: MySqlSession, dialect: MySqlDialect);
    where(where: SQL | undefined): Omit<this, 'where'>;
    toSQL(): Omit<Query, 'typings'>;
    private _prepare;
    prepare(name: string): PreparedQuery<PreparedQueryConfig & {
        execute: QueryResultKind<TQueryResult, never>;
    }>;
    execute: ReturnType<this['prepare']>['execute'];
}

type SubqueryWithSelection<TSelection, TAlias extends string> = Subquery<TAlias, AddAliasToSelection<TSelection, TAlias>> & AddAliasToSelection<TSelection, TAlias>;
type WithSubqueryWithSelection<TSelection, TAlias extends string> = WithSubquery<TAlias, AddAliasToSelection<TSelection, TAlias>> & AddAliasToSelection<TSelection, TAlias>;

type CreateMySqlSelectFromBuilderMode<TBuilderMode extends 'db' | 'qb', TTableName extends string | undefined, TSelection, TSelectMode extends SelectMode> = TBuilderMode extends 'db' ? MySqlSelect<TTableName, TSelection, TSelectMode> : MySqlSelectQueryBuilder<MySqlSelectQueryBuilderHKT, TTableName, TSelection, TSelectMode>;
declare class MySqlSelectBuilder<TSelection extends SelectedFields | undefined, TBuilderMode extends 'db' | 'qb' = 'db'> {
    private fields;
    private session;
    private dialect;
    private withList;
    constructor(fields: TSelection, session: MySqlSession | undefined, dialect: MySqlDialect, withList?: Subquery[]);
    from<TFrom extends AnyMySqlTable | Subquery | MySqlViewBase | SQL>(source: TFrom): CreateMySqlSelectFromBuilderMode<TBuilderMode, GetSelectTableName<TFrom>, TSelection extends undefined ? GetSelectTableSelection<TFrom> : TSelection, TSelection extends undefined ? 'single' : 'partial'>;
}
declare abstract class MySqlSelectQueryBuilder<THKT extends MySqlSelectHKTBase, TTableName extends string | undefined, TSelection, TSelectMode extends SelectMode, TNullabilityMap extends Record<string, JoinNullability> = TTableName extends string ? Record<TTableName, 'not-null'> : {}> extends QueryBuilder<BuildSubquerySelection<TSelection, TNullabilityMap>> {
    private isPartialSelect;
    protected session: MySqlSession | undefined;
    protected dialect: MySqlDialect;
    readonly _: {
        selectMode: TSelectMode;
        selection: TSelection;
        selectedFields: BuildSubquerySelection<TSelection, TNullabilityMap>;
    };
    protected config: MySqlSelectConfig;
    protected joinsNotNullableMap: Record<string, boolean>;
    private tableName;
    constructor(table: MySqlSelectConfig['table'], fields: MySqlSelectConfig['fields'], fieldsList: MySqlSelectConfig['fieldsList'], isPartialSelect: boolean, session: MySqlSession | undefined, dialect: MySqlDialect, withList: Subquery[]);
    private createJoin;
    leftJoin: JoinFn<THKT, TTableName, TSelectMode, "left", TSelection, TNullabilityMap>;
    rightJoin: JoinFn<THKT, TTableName, TSelectMode, "right", TSelection, TNullabilityMap>;
    innerJoin: JoinFn<THKT, TTableName, TSelectMode, "inner", TSelection, TNullabilityMap>;
    fullJoin: JoinFn<THKT, TTableName, TSelectMode, "full", TSelection, TNullabilityMap>;
    where(where: ((aliases: TSelection) => SQL | undefined) | SQL | undefined): this;
    having(having: ((aliases: TSelection) => SQL | undefined) | SQL | undefined): this;
    groupBy(builder: (aliases: TSelection) => ValueOrArray<AnyMySqlColumn | SQL | SQL.Aliased>): this;
    groupBy(...columns: (AnyMySqlColumn | SQL | SQL.Aliased)[]): this;
    orderBy(builder: (aliases: TSelection) => ValueOrArray<AnyMySqlColumn | SQL | SQL.Aliased>): this;
    orderBy(...columns: (AnyMySqlColumn | SQL | SQL.Aliased)[]): this;
    limit(limit: number): this;
    offset(offset: number): this;
    for(strength: LockStrength, config?: LockConfig): this;
    toSQL(): Simplify<Omit<Query, 'typings'>>;
    as<TAlias extends string>(alias: TAlias): SubqueryWithSelection<BuildSubquerySelection<TSelection, TNullabilityMap>, TAlias>;
}
interface MySqlSelect<TTableName extends string | undefined, TSelection, TSelectMode extends SelectMode, TNullabilityMap extends Record<string, JoinNullability> = TTableName extends string ? Record<TTableName, 'not-null'> : {}> extends MySqlSelectQueryBuilder<MySqlSelectHKT, TTableName, TSelection, TSelectMode, TNullabilityMap>, QueryPromise<SelectResult<TSelection, TSelectMode, TNullabilityMap>[]> {
}
declare class MySqlSelect<TTableName extends string | undefined, TSelection, TSelectMode extends SelectMode, TNullabilityMap extends Record<string, JoinNullability> = TTableName extends string ? Record<TTableName, 'not-null'> : {}> extends MySqlSelectQueryBuilder<MySqlSelectHKT, TTableName, TSelection, TSelectMode, TNullabilityMap> {
    private _prepare;
    prepare(name: string): PreparedQuery<PreparedQueryConfig & {
        execute: SelectResult<TSelection, TSelectMode, TNullabilityMap>[];
    }>;
    execute: ReturnType<this['prepare']>['execute'];
}

declare class QueryBuilderInstance {
    private dialect;
    private MySqlSelectBuilder;
    constructor();
    $with<TAlias extends string>(alias: TAlias): {
        as<TSelection>(qb: QueryBuilder<TSelection> | ((qb: QueryBuilderInstance) => QueryBuilder<TSelection>)): WithSubqueryWithSelection<TSelection, TAlias>;
    };
    with(...queries: WithSubquery[]): {
        select: {
            (): MySqlSelectBuilder<undefined, 'qb'>;
            <TSelection extends SelectedFields>(fields: TSelection): MySqlSelectBuilder<TSelection, "qb">;
        };
    };
    select(): MySqlSelectBuilder<undefined, 'qb'>;
    select<TSelection extends SelectedFields>(fields: TSelection): MySqlSelectBuilder<TSelection, 'qb'>;
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
    protected schema: string | undefined;
    readonly _: {
        readonly name: TConfig['name'];
        readonly columns: TConfig['columns'];
    };
    constructor(name: TConfig['name'], schema: string | undefined);
    protected config: ViewBuilderConfig;
    algorithm(algorithm: Exclude<ViewBuilderConfig['algorithm'], undefined>): this;
    definer(definer: Exclude<ViewBuilderConfig['definer'], undefined>): this;
    sqlSecurity(sqlSecurity: Exclude<ViewBuilderConfig['sqlSecurity'], undefined>): this;
    withCheckOption(withCheckOption?: Exclude<ViewBuilderConfig['withCheckOption'], undefined>): this;
}
declare class ViewBuilder<TName extends string = string> extends ViewBuilderCore<{
    name: TName;
}> {
    as<TSelectedFields extends SelectedFields>(qb: QueryBuilder<TSelectedFields> | ((qb: QueryBuilderInstance) => QueryBuilder<TSelectedFields>)): MySqlViewWithSelection<TName, false, AddAliasToSelection<TSelectedFields, TName>>;
}
declare class ManualViewBuilder<TName extends string = string, TColumns extends Record<string, AnyMySqlColumnBuilder> = Record<string, AnyMySqlColumnBuilder>> extends ViewBuilderCore<{
    name: TName;
    columns: TColumns;
}> {
    private columns;
    constructor(name: TName, columns: TColumns, schema: string | undefined);
    existing(): MySqlViewWithSelection<TName, true, BuildColumns<TName, TColumns>>;
    as(query: SQL): MySqlViewWithSelection<TName, false, BuildColumns<TName, TColumns>>;
}
declare abstract class MySqlViewBase<TName extends string = string, TExisting extends boolean = boolean, TSelectedFields = unknown> extends View<TName, TExisting, TSelectedFields> {
    readonly _: View<TName, TExisting, TSelectedFields>['_'] & {
        readonly viewBrand: 'MySqlViewBase';
    };
}
declare const MySqlViewConfig: unique symbol;
declare class MySqlView<TName extends string = string, TExisting extends boolean = boolean, TSelectedFields = unknown> extends MySqlViewBase<TName, TExisting, TSelectedFields> {
    protected $MySqlViewBrand: 'MySqlView';
    [MySqlViewConfig]: ViewBuilderConfig | undefined;
    constructor({ mysqlConfig, config }: {
        mysqlConfig: ViewBuilderConfig | undefined;
        config: {
            name: TName;
            schema: string | undefined;
            selectedFields: SelectedFields;
            query: SQL | undefined;
        };
    });
}
type MySqlViewWithSelection<TName extends string, TExisting extends boolean, TSelectedFields> = MySqlView<TName, TExisting, TSelectedFields> & TSelectedFields;
declare function mysqlView<TName extends string>(name: TName): ViewBuilder<TName>;
declare function mysqlView<TName extends string, TColumns extends Record<string, AnyMySqlColumnBuilder>>(name: TName, columns: TColumns): ManualViewBuilder<TName, TColumns>;

interface JoinsValue {
    on: SQL | undefined;
    table: AnyMySqlTable | Subquery | SQL;
    alias: string | undefined;
    joinType: JoinType;
}
type AnyMySqlSelect = MySqlSelect<any, any, any, any>;
type BuildAliasTable<TTable extends AnyTable, TAlias extends string> = MySqlTableWithColumns<Assume<UpdateTableConfig<TTable['_']['config'], {
    name: TAlias;
    columns: MapColumnsToTableAlias<TTable['_']['columns'], TAlias>;
}>, TableConfig>>;
interface MySqlSelectConfig {
    withList: Subquery[];
    fields: SelectedFields;
    fieldsList: SelectedFieldsOrdered;
    where?: SQL;
    having?: SQL;
    table: AnyMySqlTable | Subquery | MySqlViewBase | SQL;
    limit?: number | Placeholder;
    offset?: number | Placeholder;
    joins: JoinsValue[];
    orderBy: (AnyMySqlColumn | SQL | SQL.Aliased)[];
    groupBy: (AnyMySqlColumn | SQL | SQL.Aliased)[];
    lockingClause?: {
        strength: LockStrength;
        config: LockConfig;
    };
}
type JoinFn<THKT extends MySqlSelectHKTBase, TTableName extends string | undefined, TSelectMode extends SelectMode, TJoinType extends JoinType, TSelection, TNullabilityMap extends Record<string, JoinNullability>> = <TJoinedTable extends AnyMySqlTable | Subquery | SQL, TJoinedName extends GetSelectTableName<TJoinedTable> = GetSelectTableName<TJoinedTable>>(table: TJoinedTable, on: ((aliases: TSelection) => SQL | undefined) | SQL | undefined) => MySqlSelectKind<THKT, TTableName, AppendToResult<TTableName, TSelection, TJoinedName, TJoinedTable extends AnyMySqlTable ? TJoinedTable['_']['columns'] : TJoinedName extends Subquery ? Assume<TJoinedName['_']['selectedFields'], SelectedFields> : never, TSelectMode>, TSelectMode extends 'partial' ? TSelectMode : 'multiple', AppendToNullabilityMap<TNullabilityMap, TJoinedName, TJoinType>>;
type SelectedFieldsFlat = SelectedFieldsFlat$1<AnyMySqlColumn>;
type SelectedFields = SelectedFields$1<AnyMySqlColumn, AnyMySqlTable>;
type SelectedFieldsOrdered = SelectedFieldsOrdered$1<AnyMySqlColumn>;
type LockStrength = 'update' | 'share';
type LockConfig = {
    noWait: true;
    skipLocked?: undefined;
} | {
    noWait?: undefined;
    skipLocked: true;
} | {
    noWait?: undefined;
    skipLocked?: undefined;
};
interface MySqlSelectHKTBase {
    tableName: string | undefined;
    selection: unknown;
    selectMode: SelectMode;
    nullabilityMap: unknown;
    _type: unknown;
}
type MySqlSelectKind<T extends MySqlSelectHKTBase, TTableName extends string | undefined, TSelection, TSelectMode extends SelectMode, TNullabilityMap extends Record<string, JoinNullability>> = (T & {
    tableName: TTableName;
    selection: TSelection;
    selectMode: TSelectMode;
    nullabilityMap: TNullabilityMap;
})['_type'];
interface MySqlSelectQueryBuilderHKT extends MySqlSelectHKTBase {
    _type: MySqlSelectQueryBuilder<this, this['tableName'], this['selection'], this['selectMode'], Assume<this['nullabilityMap'], Record<string, JoinNullability>>>;
}
interface MySqlSelectHKT extends MySqlSelectHKTBase {
    _type: MySqlSelect<this['tableName'], this['selection'], this['selectMode'], Assume<this['nullabilityMap'], Record<string, JoinNullability>>>;
}

declare function alias<TTable extends AnyMySqlTable, TAlias extends string>(table: TTable, alias: TAlias): BuildAliasTable<TTable, TAlias>;

declare class MySqlDatabase<TQueryResult extends QueryResultHKT, TSession extends MySqlSession> {
    constructor(
    /** @internal */
    dialect: MySqlDialect, 
    /** @internal */
    session: TSession);
    $with<TAlias extends string>(alias: TAlias): {
        as<TSelection>(qb: QueryBuilder<TSelection> | ((qb: QueryBuilderInstance) => QueryBuilder<TSelection>)): WithSubqueryWithSelection<TSelection, TAlias>;
    };
    with(...queries: WithSubquery[]): {
        select: {
            (): MySqlSelectBuilder<undefined>;
            <TSelection extends SelectedFields>(fields: TSelection): MySqlSelectBuilder<TSelection, "db">;
        };
    };
    select(): MySqlSelectBuilder<undefined>;
    select<TSelection extends SelectedFields>(fields: TSelection): MySqlSelectBuilder<TSelection>;
    update<TTable extends AnyMySqlTable>(table: TTable): MySqlUpdateBuilder<TTable, TQueryResult>;
    insert<TTable extends AnyMySqlTable>(table: TTable): MySqlInsertBuilder<TTable, TQueryResult>;
    delete<TTable extends AnyMySqlTable>(table: TTable): MySqlDelete<TTable, TQueryResult>;
    execute<T extends {
        [column: string]: any;
    } = ResultSetHeader>(query: SQLWrapper): Promise<QueryResultKind<TQueryResult, T>>;
}

declare class MySqlSchema {
    readonly schemaName: string;
    constructor(schemaName: string);
    table: typeof mysqlTable;
    view: typeof mysqlView;
}
/** @deprecated - use `instanceof MySqlSchema` */
declare function isMySqlSchema(obj: unknown): obj is MySqlSchema;
/**
 * Create a MySQL schema.
 * https://dev.mysql.com/doc/refman/8.0/en/create-database.html
 *
 * @param name mysql use schema name
 * @returns MySQL schema
 */
declare function mysqlDatabase(name: string): MySqlSchema;
/**
 * @see mysqlDatabase
 */
declare const mysqlSchema: typeof mysqlDatabase;

declare function getTableConfig(table: AnyMySqlTable): {
    columns: AnyMySqlColumn[];
    indexes: Index[];
    foreignKeys: ForeignKey[];
    checks: Check[];
    primaryKeys: PrimaryKey[];
    name: string;
    schema: string | undefined;
};
declare function getViewConfig<TName extends string = string, TExisting extends boolean = boolean>(view: MySqlView<TName, TExisting>): {
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

export { AnyForeignKeyBuilder, AnyIndexBuilder, AnyMySqlColumn, AnyMySqlInsertConfig, AnyMySqlSelect, AnyMySqlTable, BuildAliasTable, Check, CheckBuilder, ConvertCustomConfig, CustomTypeParams, CustomTypeValues, DatetimeFsp, ForeignKey, ForeignKeyBuilder, GetColumnsTable, GetColumnsTableName, Index, IndexBuilder, IndexBuilderOn, IndexColumn, JoinFn, JoinsValue, LockConfig, LockStrength, ManualViewBuilder, MySqlBigInt53, MySqlBigInt53Builder, MySqlBigInt53BuilderHKT, MySqlBigInt53BuilderInitial, MySqlBigInt53HKT, MySqlBigInt64, MySqlBigInt64Builder, MySqlBigInt64BuilderHKT, MySqlBigInt64BuilderInitial, MySqlBigInt64HKT, MySqlBinary, MySqlBinaryBuilder, MySqlBinaryBuilderHKT, MySqlBinaryBuilderInitial, MySqlBinaryConfig, MySqlBinaryHKT, MySqlBoolean, MySqlBooleanBuilder, MySqlBooleanBuilderHKT, MySqlBooleanBuilderInitial, MySqlBooleanHKT, MySqlChar, MySqlCharBuilder, MySqlCharBuilderHKT, MySqlCharBuilderInitial, MySqlCharConfig, MySqlCharHKT, MySqlColumn, MySqlCustomColumn, MySqlCustomColumnBuilder, MySqlCustomColumnBuilderHKT, MySqlCustomColumnHKT, MySqlCustomColumnInnerConfig, MySqlDatabase, MySqlDate, MySqlDateBuilder, MySqlDateBuilderHKT, MySqlDateBuilderInitial, MySqlDateConfig, MySqlDateHKT, MySqlDateString, MySqlDateStringBuilder, MySqlDateStringBuilderHKT, MySqlDateStringBuilderInitial, MySqlDateStringHKT, MySqlDateTime, MySqlDateTimeBuilder, MySqlDateTimeBuilderHKT, MySqlDateTimeBuilderInitial, MySqlDateTimeHKT, MySqlDateTimeString, MySqlDateTimeStringBuilder, MySqlDateTimeStringBuilderHKT, MySqlDateTimeStringBuilderInitial, MySqlDateTimeStringHKT, MySqlDatetimeConfig, MySqlDecimal, MySqlDecimalBuilder, MySqlDecimalBuilderHKT, MySqlDecimalBuilderInitial, MySqlDecimalConfig, MySqlDecimalHKT, MySqlDelete, MySqlDeleteConfig, MySqlDialect, MySqlDouble, MySqlDoubleBuilder, MySqlDoubleBuilderHKT, MySqlDoubleBuilderInitial, MySqlDoubleConfig, MySqlDoubleHKT, MySqlEnumColumn, MySqlEnumColumnBuilder, MySqlEnumColumnBuilderHKT, MySqlEnumColumnBuilderInitial, MySqlEnumColumnHKT, MySqlFloat, MySqlFloatBuilder, MySqlFloatBuilderHKT, MySqlFloatBuilderInitial, MySqlFloatHKT, MySqlInsert, MySqlInsertBuilder, MySqlInsertConfig, MySqlInsertValue, MySqlInt, MySqlIntBuilder, MySqlIntBuilderHKT, MySqlIntBuilderInitial, MySqlIntHKT, MySqlJson, MySqlJsonBuilder, MySqlJsonBuilderHKT, MySqlJsonBuilderInitial, MySqlJsonHKT, MySqlMediumInt, MySqlMediumIntBuilder, MySqlMediumIntBuilderHKT, MySqlMediumIntBuilderInitial, MySqlMediumIntHKT, MySqlReal, MySqlRealBuilder, MySqlRealBuilderHKT, MySqlRealBuilderInitial, MySqlRealConfig, MySqlRealHKT, MySqlSchema, MySqlSelect, MySqlSelectBuilder, MySqlSelectConfig, MySqlSelectHKT, MySqlSelectHKTBase, MySqlSelectKind, MySqlSelectQueryBuilder, MySqlSelectQueryBuilderHKT, MySqlSerial, MySqlSerialBuilder, MySqlSerialBuilderHKT, MySqlSerialBuilderInitial, MySqlSerialHKT, MySqlSession, MySqlSmallInt, MySqlSmallIntBuilder, MySqlSmallIntBuilderHKT, MySqlSmallIntBuilderInitial, MySqlSmallIntHKT, MySqlTable, MySqlTableExtraConfig, MySqlTableWithColumns, MySqlText, MySqlTextBuilder, MySqlTextBuilderHKT, MySqlTextBuilderInitial, MySqlTextColumnType, MySqlTextConfig, MySqlTextHKT, MySqlTime, MySqlTimeBuilder, MySqlTimeBuilderHKT, MySqlTimeBuilderInitial, MySqlTimeHKT, MySqlTimestamp, MySqlTimestampBuilder, MySqlTimestampBuilderHKT, MySqlTimestampBuilderInitial, MySqlTimestampConfig, MySqlTimestampHKT, MySqlTimestampString, MySqlTimestampStringBuilder, MySqlTimestampStringBuilderHKT, MySqlTimestampStringBuilderInitial, MySqlTimestampStringHKT, MySqlTinyInt, MySqlTinyIntBuilder, MySqlTinyIntBuilderHKT, MySqlTinyIntBuilderInitial, MySqlTinyIntHKT, MySqlUpdate, MySqlUpdateBuilder, MySqlUpdateConfig, MySqlUpdateSetSource, MySqlVarBinary, MySqlVarBinaryBuilder, MySqlVarBinaryBuilderHKT, MySqlVarBinaryBuilderInitial, MySqlVarBinaryHKT, MySqlVarChar, MySqlVarCharBuilder, MySqlVarCharBuilderHKT, MySqlVarCharBuilderInitial, MySqlVarCharHKT, MySqlVarbinaryOptions, MySqlVarcharConfig, MySqlView, MySqlViewBase, MySqlViewConfig, MySqlViewWithSelection, MySqlYear, MySqlYearBuilder, MySqlYearBuilderHKT, MySqlYearBuilderInitial, MySqlYearHKT, PreparedQuery, PreparedQueryConfig, PrimaryKey, PrimaryKeyBuilder, QueryBuilderInstance, QueryResultHKT, QueryResultKind, Reference, SelectedFields, SelectedFieldsFlat, SelectedFieldsOrdered, SubqueryWithSelection, TableConfig, TimeConfig, TimestampFsp, UpdateDeleteAction, ViewBuilder, ViewBuilderConfig, ViewBuilderCore, WithSubqueryWithSelection, alias, bigint, binary, boolean, char, check, customType, date, datetime, decimal, double, float, foreignKey, getTableConfig, getViewConfig, index, int, isMySqlSchema, json, longtext, mediumint, mediumtext, mysqlDatabase, mysqlEnum, mysqlSchema, mysqlTable, mysqlTableCreator, mysqlTableWithSchema, mysqlView, primaryKey, queryBuilder, real, serial, smallint, text, time, timestamp, tinyint, tinytext, uniqueIndex, varbinary, varchar, year };
