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

declare class CheckBuilder {
    name: string;
    value: SQL;
    protected brand: 'PgConstraintBuilder';
    constructor(name: string, value: SQL);
}
declare class Check {
    table: AnyPgTable;
    readonly name: string;
    readonly value: SQL;
    constructor(table: AnyPgTable, builder: CheckBuilder);
}
declare function check(name: string, value: SQL): CheckBuilder;

type UpdateDeleteAction = 'cascade' | 'restrict' | 'no action' | 'set null' | 'set default';
type Reference = () => {
    readonly columns: AnyPgColumn[];
    readonly foreignTable: AnyPgTable;
    readonly foreignColumns: AnyPgColumn[];
};
declare class ForeignKeyBuilder {
    constructor(config: () => {
        columns: AnyPgColumn[];
        foreignColumns: AnyPgColumn[];
    }, actions?: {
        onUpdate?: UpdateDeleteAction;
        onDelete?: UpdateDeleteAction;
    } | undefined);
    onUpdate(action: UpdateDeleteAction): this;
    onDelete(action: UpdateDeleteAction): this;
}
type AnyForeignKeyBuilder = ForeignKeyBuilder;
declare class ForeignKey {
    readonly table: AnyPgTable;
    readonly reference: Reference;
    readonly onUpdate: UpdateDeleteAction | undefined;
    readonly onDelete: UpdateDeleteAction | undefined;
    constructor(table: AnyPgTable, builder: ForeignKeyBuilder);
    getName(): string;
}
type ColumnsWithTable<TTableName extends string, TColumns extends AnyPgColumn[]> = {
    [Key in keyof TColumns]: AnyPgColumn<{
        tableName: TTableName;
    }>;
};
declare function foreignKey<TTableName extends string, TForeignTableName extends string, TColumns extends [AnyPgColumn<{
    tableName: TTableName;
}>, ...AnyPgColumn<{
    tableName: TTableName;
}>[]]>(config: {
    columns: TColumns;
    foreignColumns: ColumnsWithTable<TForeignTableName, TColumns>;
}): ForeignKeyBuilder;

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
type AnyPgColumnBuilder<TPartial extends Partial<ColumnBuilderBaseConfig> = {}> = PgColumnBuilder<PgColumnBuilderHKT, Required<Update<ColumnBuilderBaseConfig, TPartial>>>;
declare abstract class PgColumn<THKT extends ColumnHKTBase, T extends ColumnBaseConfig, TRuntimeConfig extends object = {}, TTypeConfig extends object = {}> extends Column<THKT, T, TRuntimeConfig, TTypeConfig & {
    pgBrand: 'PgColumn';
}> {
}
type AnyPgColumn<TPartial extends Partial<ColumnBaseConfig> = {}> = PgColumn<PgColumnHKT, Required<Update<ColumnBaseConfig, TPartial>>>;

interface IndexConfig {
    name?: string;
    columns: IndexColumn[];
    /**
     * If true, the index will be created as `create unique index` instead of `create index`.
     */
    unique: boolean;
    /**
     * If true, the index will be created as `create index concurrently` instead of `create index`.
     */
    concurrently?: boolean;
    /**
     * If true, the index will be created as `create index ... on only <table>` instead of `create index ... on <table>`.
     */
    only: boolean;
    /**
     * If set, the index will be created as `create index ... using <method>`.
     */
    using?: SQL;
    /**
     * If set, the index will be created as `create index ... asc | desc`.
     */
    order?: 'asc' | 'desc';
    /**
     * If set, adds `nulls first` or `nulls last` to the index.
     */
    nulls?: 'first' | 'last';
    /**
     * Condition for partial index.
     */
    where?: SQL;
}
type IndexColumn = AnyPgColumn;
declare class IndexBuilderOn {
    private unique;
    private name?;
    constructor(unique: boolean, name?: string | undefined);
    on(...columns: [IndexColumn, ...IndexColumn[]]): IndexBuilder;
    onOnly(...columns: [IndexColumn, ...IndexColumn[]]): IndexBuilder;
}
interface AnyIndexBuilder {
    build(table: AnyPgTable): Index;
}
interface IndexBuilder extends AnyIndexBuilder {
}
declare class IndexBuilder implements AnyIndexBuilder {
    constructor(columns: IndexColumn[], unique: boolean, only: boolean, name?: string);
    concurrently(): Omit<this, 'concurrently'>;
    using(method: SQL): Omit<this, 'using'>;
    asc(): Omit<this, 'asc' | 'desc'>;
    desc(): Omit<this, 'asc' | 'desc'>;
    nullsFirst(): Omit<this, 'nullsFirst' | 'nullsLast'>;
    nullsLast(): Omit<this, 'nullsFirst' | 'nullsLast'>;
    where(condition: SQL): Omit<this, 'where'>;
}
declare class Index {
    readonly config: IndexConfig & {
        table: AnyPgTable;
    };
    constructor(config: IndexConfig, table: AnyPgTable);
}
type GetColumnsTableName<TColumns> = TColumns extends AnyPgColumn ? TColumns['_']['name'] : TColumns extends AnyPgColumn[] ? TColumns[number]['_']['name'] : never;
declare function index(name?: string): IndexBuilderOn;
declare function uniqueIndex(name?: string): IndexBuilderOn;

declare function primaryKey<TTableName extends string, TColumns extends AnyPgColumn<{
    tableName: TTableName;
}>[]>(...columns: TColumns): PrimaryKeyBuilder;
declare class PrimaryKeyBuilder {
    constructor(columns: AnyPgColumn[]);
}
declare class PrimaryKey {
    readonly table: AnyPgTable;
    readonly columns: AnyPgColumn<{}>[];
    constructor(table: AnyPgTable, columns: AnyPgColumn<{}>[]);
    getName(): string;
}

type PgTableExtraConfig = Record<string, AnyIndexBuilder | CheckBuilder | ForeignKeyBuilder | PrimaryKeyBuilder>;
type TableConfig = TableConfig$1<AnyPgColumn>;
declare class PgTable<T extends TableConfig> extends Table<T> {
}
type AnyPgTable<TPartial extends Partial<TableConfig> = {}> = PgTable<UpdateTableConfig<TableConfig, TPartial>>;
type PgTableWithColumns<T extends TableConfig> = PgTable<T> & {
    [Key in keyof T['columns']]: T['columns'][Key];
};
declare function pgTable<TTableName extends string, TSchemaName extends string | undefined, TColumnsMap extends Record<string, AnyPgColumnBuilder>>(name: TTableName, columns: TColumnsMap, extraConfig?: (self: BuildColumns<TTableName, TColumnsMap>) => PgTableExtraConfig): PgTableWithColumns<{
    name: TTableName;
    schema: TSchemaName;
    columns: BuildColumns<TTableName, TColumnsMap>;
}>;
declare function pgTableCreator(customizeTableName: (name: string) => string): typeof pgTable;

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
    execute: unknown;
    all: unknown;
    values: unknown;
}
declare abstract class PreparedQuery<T extends PreparedQueryConfig> {
    abstract execute(placeholderValues?: Record<string, unknown>): Promise<T['execute']>;
}
declare abstract class PgSession {
    protected dialect: PgDialect;
    constructor(dialect: PgDialect);
    abstract prepareQuery<T extends PreparedQueryConfig = PreparedQueryConfig>(query: Query, fields: SelectedFieldsOrdered | undefined, name: string | undefined): PreparedQuery<T>;
    execute<T>(query: SQL): Promise<T>;
    all<T = unknown>(query: SQL): Promise<T[]>;
    values<T extends unknown[] = unknown[]>(query: SQL): Promise<T[]>;
}
interface QueryResultHKT {
    readonly $brand: 'QueryRowHKT';
    readonly row: unknown;
    readonly type: unknown;
}
type QueryResultKind<TKind extends QueryResultHKT, TRow> = (TKind & {
    readonly row: TRow;
})['type'];

declare class PgDialect {
    migrate(migrations: MigrationMeta[], session: PgSession): Promise<void>;
    escapeName(name: string): string;
    escapeParam(num: number): string;
    escapeString(str: string): string;
    buildDeleteQuery({ table, where, returning }: PgDeleteConfig): SQL;
    buildUpdateSet(table: AnyPgTable, set: UpdateSet): SQL;
    buildUpdateQuery({ table, set, where, returning }: PgUpdateConfig): SQL;
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
    buildSelectQuery({ withList, fieldsList, where, having, table, joins, orderBy, groupBy, limit, offset, lockingClauses }: PgSelectConfig): SQL;
    buildInsertQuery({ table, values, onConflict, returning }: PgInsertConfig): SQL;
    buildRefreshMaterializedViewQuery({ view, concurrently, withNoData }: {
        view: PgMaterializedView;
        concurrently?: boolean;
        withNoData?: boolean;
    }): SQL;
    prepareTyping(encoder: DriverValueEncoder<unknown, unknown>): QueryTypingsValue;
    sqlToQuery(sql: SQL): Query;
}

declare abstract class QueryPromise<T> implements Promise<T> {
    [Symbol.toStringTag]: string;
    catch<TResult = never>(onRejected?: ((reason: any) => TResult | PromiseLike<TResult>) | null | undefined): Promise<T | TResult>;
    finally(onFinally?: (() => void) | null | undefined): Promise<T>;
    then<TResult1 = T, TResult2 = never>(onFulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onRejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    abstract execute(): Promise<T>;
}

interface PgDeleteConfig {
    where?: SQL | undefined;
    table: AnyPgTable;
    returning?: SelectedFieldsOrdered;
}
interface PgDelete<TTable extends AnyPgTable, TQueryResult extends QueryResultHKT, TReturning extends Record<string, unknown> | undefined = undefined> extends QueryPromise<TReturning extends undefined ? QueryResultKind<TQueryResult, never> : TReturning[]> {
}
declare class PgDelete<TTable extends AnyPgTable, TQueryResult extends QueryResultHKT, TReturning extends Record<string, unknown> | undefined = undefined> extends QueryPromise<TReturning extends undefined ? QueryResultKind<TQueryResult, never> : TReturning[]> implements SQLWrapper {
    private session;
    private dialect;
    private config;
    constructor(table: TTable, session: PgSession, dialect: PgDialect);
    where(where: SQL | undefined): Omit<this, 'where'>;
    returning(): PgDelete<TTable, TQueryResult, InferModel<TTable>>;
    returning<TSelectedFields extends SelectedFieldsFlat>(fields: TSelectedFields): PgDelete<TTable, TQueryResult, SelectResultFields<TSelectedFields>>;
    toSQL(): Simplify<Omit<Query, 'typings'>>;
    private _prepare;
    prepare(name: string): PreparedQuery<PreparedQueryConfig & {
        execute: TReturning extends undefined ? QueryResultKind<TQueryResult, never> : TReturning[];
    }>;
    execute: ReturnType<this['prepare']>['execute'];
}

interface PgUpdateConfig {
    where?: SQL | undefined;
    set: UpdateSet;
    table: AnyPgTable;
    returning?: SelectedFieldsOrdered;
}
type PgUpdateSetSource<TTable extends AnyPgTable> = Simplify<{
    [Key in keyof TTable['_']['columns']]?: GetColumnData<TTable['_']['columns'][Key]> | SQL;
}>;
declare class PgUpdateBuilder<TTable extends AnyPgTable, TQueryResult extends QueryResultHKT> {
    private table;
    private session;
    private dialect;
    readonly _: {
        readonly table: TTable;
    };
    constructor(table: TTable, session: PgSession, dialect: PgDialect);
    set(values: PgUpdateSetSource<TTable>): PgUpdate<TTable, TQueryResult>;
}
interface PgUpdate<TTable extends AnyPgTable, TQueryResult extends QueryResultHKT, TReturning extends Record<string, unknown> | undefined = undefined> extends QueryPromise<TReturning extends undefined ? QueryResultKind<TQueryResult, never> : TReturning[]>, SQLWrapper {
}
declare class PgUpdate<TTable extends AnyPgTable, TQueryResult extends QueryResultHKT, TReturning extends Record<string, unknown> | undefined = undefined> extends QueryPromise<TReturning extends undefined ? QueryResultKind<TQueryResult, never> : TReturning[]> implements SQLWrapper {
    private session;
    private dialect;
    readonly _: {
        readonly table: TTable;
        readonly return: TReturning;
    };
    private config;
    constructor(table: TTable, set: UpdateSet, session: PgSession, dialect: PgDialect);
    where(where: SQL | undefined): this;
    returning(): PgUpdate<TTable, TQueryResult, InferModel<TTable>>;
    returning<TSelectedFields extends SelectedFields>(fields: TSelectedFields): PgUpdate<TTable, TQueryResult, SelectResultFields<TSelectedFields>>;
    toSQL(): Omit<Query, 'typings'>;
    private _prepare;
    prepare(name: string): PreparedQuery<PreparedQueryConfig & {
        execute: TReturning extends undefined ? QueryResultKind<TQueryResult, never> : TReturning[];
    }>;
    execute: ReturnType<this['prepare']>['execute'];
}

interface PgInsertConfig<TTable extends AnyPgTable = AnyPgTable> {
    table: TTable;
    values: Record<string, Param | SQL>[];
    onConflict?: SQL;
    returning?: SelectedFieldsOrdered;
}
type PgInsertValue<TTable extends AnyPgTable> = Simplify<{
    [Key in keyof InferModel<TTable, 'insert'>]: InferModel<TTable, 'insert'>[Key] | SQL | Placeholder;
}>;
declare class PgInsertBuilder<TTable extends AnyPgTable, TQueryResult extends QueryResultHKT> {
    private table;
    private session;
    private dialect;
    constructor(table: TTable, session: PgSession, dialect: PgDialect);
    values(value: PgInsertValue<TTable>): PgInsert<TTable, TQueryResult>;
    values(values: PgInsertValue<TTable>[]): PgInsert<TTable, TQueryResult>;
    /**
     * @deprecated Pass the array of values without spreading it.
     */
    values(...values: PgInsertValue<TTable>[]): PgInsert<TTable, TQueryResult>;
}
interface PgInsert<TTable extends AnyPgTable, TQueryResult extends QueryResultHKT, TReturning extends Record<string, unknown> | undefined = undefined> extends QueryPromise<TReturning extends undefined ? QueryResultKind<TQueryResult, never> : TReturning[]>, SQLWrapper {
}
declare class PgInsert<TTable extends AnyPgTable, TQueryResult extends QueryResultHKT, TReturning extends Record<string, unknown> | undefined = undefined> extends QueryPromise<TReturning extends undefined ? QueryResultKind<TQueryResult, never> : TReturning[]> implements SQLWrapper {
    private session;
    private dialect;
    _: {
        table: TTable;
        return: TReturning;
    };
    private config;
    constructor(table: TTable, values: PgInsertConfig['values'], session: PgSession, dialect: PgDialect);
    returning(): PgInsert<TTable, TQueryResult, InferModel<TTable>>;
    returning<TSelectedFields extends SelectedFieldsFlat>(fields: TSelectedFields): PgInsert<TTable, TQueryResult, SelectResultFields<TSelectedFields>>;
    onConflictDoNothing(config?: {
        target?: IndexColumn | IndexColumn[];
        where?: SQL;
    }): this;
    onConflictDoUpdate(config: {
        target: IndexColumn | IndexColumn[];
        where?: SQL;
        set: PgUpdateSetSource<TTable>;
    }): this;
    toSQL(): Simplify<Omit<Query, 'typings'>>;
    private _prepare;
    prepare(name: string): PreparedQuery<PreparedQueryConfig & {
        execute: TReturning extends undefined ? QueryResultKind<TQueryResult, never> : TReturning[];
    }>;
    execute: ReturnType<this['prepare']>['execute'];
}

type SubqueryWithSelection<TSelection, TAlias extends string> = Subquery<TAlias, AddAliasToSelection<TSelection, TAlias>> & AddAliasToSelection<TSelection, TAlias>;
type WithSubqueryWithSelection<TSelection, TAlias extends string> = WithSubquery<TAlias, AddAliasToSelection<TSelection, TAlias>> & AddAliasToSelection<TSelection, TAlias>;

type CreatePgSelectFromBuilderMode<TBuilderMode extends 'db' | 'qb', TTableName extends string | undefined, TSelection, TSelectMode extends SelectMode> = TBuilderMode extends 'db' ? PgSelect<TTableName, TSelection, TSelectMode> : PgSelectQueryBuilder<PgSelectQueryBuilderHKT, TTableName, TSelection, TSelectMode>;
declare class PgSelectBuilder<TSelection extends SelectedFields | undefined, TBuilderMode extends 'db' | 'qb' = 'db'> {
    private fields;
    private session;
    private dialect;
    private withList;
    constructor(fields: TSelection, session: PgSession | undefined, dialect: PgDialect, withList?: Subquery[]);
    from<TFrom extends AnyPgTable | Subquery | PgViewBase | SQL>(source: TFrom): CreatePgSelectFromBuilderMode<TBuilderMode, GetSelectTableName<TFrom>, TSelection extends undefined ? GetSelectTableSelection<TFrom> : TSelection, TSelection extends undefined ? 'single' : 'partial'>;
}
declare abstract class PgSelectQueryBuilder<THKT extends PgSelectHKTBase, TTableName extends string | undefined, TSelection, TSelectMode extends SelectMode, TNullabilityMap extends Record<string, JoinNullability> = TTableName extends string ? Record<TTableName, 'not-null'> : {}> extends QueryBuilder<BuildSubquerySelection<TSelection, TNullabilityMap>> {
    private isPartialSelect;
    protected session: PgSession | undefined;
    protected dialect: PgDialect;
    readonly _: {
        readonly selectMode: TSelectMode;
        readonly selection: TSelection;
        readonly selectedFields: BuildSubquerySelection<TSelection, TNullabilityMap>;
    };
    protected config: PgSelectConfig;
    protected joinsNotNullableMap: Record<string, boolean>;
    private tableName;
    constructor(table: PgSelectConfig['table'], fields: PgSelectConfig['fields'], fieldsList: PgSelectConfig['fieldsList'], isPartialSelect: boolean, session: PgSession | undefined, dialect: PgDialect, withList: Subquery[]);
    private createJoin;
    leftJoin: JoinFn<THKT, TTableName, TSelectMode, "left", TSelection, TNullabilityMap>;
    rightJoin: JoinFn<THKT, TTableName, TSelectMode, "right", TSelection, TNullabilityMap>;
    innerJoin: JoinFn<THKT, TTableName, TSelectMode, "inner", TSelection, TNullabilityMap>;
    fullJoin: JoinFn<THKT, TTableName, TSelectMode, "full", TSelection, TNullabilityMap>;
    where(where: ((aliases: TSelection) => SQL | undefined) | SQL | undefined): this;
    having(having: ((aliases: TSelection) => SQL | undefined) | SQL | undefined): this;
    groupBy(builder: (aliases: TSelection) => ValueOrArray<AnyPgColumn | SQL | SQL.Aliased>): this;
    groupBy(...columns: (AnyPgColumn | SQL | SQL.Aliased)[]): this;
    orderBy(builder: (aliases: TSelection) => ValueOrArray<AnyPgColumn | SQL | SQL.Aliased>): this;
    orderBy(...columns: (AnyPgColumn | SQL | SQL.Aliased)[]): this;
    limit(limit: number): this;
    offset(offset: number): this;
    for(strength: LockStrength, config?: LockConfig): this;
    toSQL(): Simplify<Omit<Query, 'typings'>>;
    as<TAlias extends string>(alias: TAlias): SubqueryWithSelection<BuildSubquerySelection<TSelection, TNullabilityMap>, TAlias>;
}
interface PgSelect<TTableName extends string | undefined, TSelection, TSelectMode extends SelectMode, TNullabilityMap extends Record<string, JoinNullability> = TTableName extends string ? Record<TTableName, 'not-null'> : {}> extends PgSelectQueryBuilder<PgSelectHKT, TTableName, TSelection, TSelectMode, TNullabilityMap>, QueryPromise<SelectResult<TSelection, TSelectMode, TNullabilityMap>[]> {
}
declare class PgSelect<TTableName extends string | undefined, TSelection, TSelectMode extends SelectMode, TNullabilityMap extends Record<string, JoinNullability> = TTableName extends string ? Record<TTableName, 'not-null'> : {}> extends PgSelectQueryBuilder<PgSelectHKT, TTableName, TSelection, TSelectMode, TNullabilityMap> {
    private _prepare;
    prepare(name: string): PreparedQuery<PreparedQueryConfig & {
        execute: SelectResult<TSelection, TSelectMode, TNullabilityMap>[];
    }>;
    execute: ReturnType<this['prepare']>['execute'];
}

declare class QueryBuilderInstance {
    private dialect;
    private PgSelectBuilder;
    constructor();
    $with<TAlias extends string>(alias: TAlias): {
        as<TSelection>(qb: QueryBuilder<TSelection> | ((qb: QueryBuilderInstance) => QueryBuilder<TSelection>)): WithSubqueryWithSelection<TSelection, TAlias>;
    };
    with(...queries: WithSubquery[]): {
        select: {
            (): PgSelectBuilder<undefined, 'qb'>;
            <TSelection extends SelectedFields>(fields: TSelection): PgSelectBuilder<TSelection, "qb">;
        };
    };
    select(): PgSelectBuilder<undefined, 'qb'>;
    select<TSelection extends SelectedFields>(fields: TSelection): PgSelectBuilder<TSelection, 'qb'>;
    private getDialect;
}
declare const queryBuilder: QueryBuilderInstance;

interface PgRefreshMaterializedView<TQueryResult extends QueryResultHKT, TExcludedMethods extends string = never> extends QueryPromise<QueryResultKind<TQueryResult, never>> {
}
declare class PgRefreshMaterializedView<TQueryResult extends QueryResultHKT> extends QueryPromise<QueryResultKind<TQueryResult, never>> {
    private session;
    private dialect;
    private config;
    constructor(view: PgMaterializedView, session: PgSession, dialect: PgDialect);
    concurrently(): this;
    withNoData(): this;
    toSQL(): Simplify<Omit<Query, 'typings'>>;
    private _prepare;
    prepare(name: string): PreparedQuery<PreparedQueryConfig & {
        execute: QueryResultKind<TQueryResult, never>;
    }>;
    execute: ReturnType<this['prepare']>['execute'];
}

interface ViewWithConfig {
    checkOption: 'local' | 'cascaded';
    securityBarrier: boolean;
    securityInvoker: boolean;
}
declare class DefaultViewBuilderCore<TConfig extends {
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
    protected config: {
        with?: ViewWithConfig;
    };
    with(config: ViewWithConfig): this;
}
declare class ViewBuilder<TName extends string = string> extends DefaultViewBuilderCore<{
    name: TName;
}> {
    as<TSelectedFields extends SelectedFields>(qb: QueryBuilder<TSelectedFields> | ((qb: QueryBuilderInstance) => QueryBuilder<TSelectedFields>)): PgViewWithSelection<TName, false, AddAliasToSelection<TSelectedFields, TName>>;
}
declare class ManualViewBuilder<TName extends string = string, TColumns extends Record<string, AnyPgColumnBuilder> = Record<string, AnyPgColumnBuilder>> extends DefaultViewBuilderCore<{
    name: TName;
    columns: TColumns;
}> {
    private columns;
    constructor(name: TName, columns: TColumns, schema: string | undefined);
    existing(): PgViewWithSelection<TName, true, BuildColumns<TName, TColumns>>;
    as(query: SQL): PgViewWithSelection<TName, false, BuildColumns<TName, TColumns>>;
}
interface PgMaterializedViewWithConfig {
    [Key: string]: string | number | boolean | SQL;
}
declare class MaterializedViewBuilderCore<TConfig extends {
    name: string;
    columns?: unknown;
}> {
    protected name: TConfig['name'];
    protected schema: string | undefined;
    _: {
        readonly name: TConfig['name'];
        readonly columns: TConfig['columns'];
    };
    constructor(name: TConfig['name'], schema: string | undefined);
    protected config: {
        with?: PgMaterializedViewWithConfig;
        using?: string;
        tablespace?: string;
        withNoData?: boolean;
    };
    using(using: string): this;
    with(config: PgMaterializedViewWithConfig): this;
    tablespace(tablespace: string): this;
    withNoData(): this;
}
declare class MaterializedViewBuilder<TName extends string = string> extends MaterializedViewBuilderCore<{
    name: TName;
}> {
    as<TSelectedFields extends SelectedFields>(qb: QueryBuilder<TSelectedFields> | ((qb: QueryBuilderInstance) => QueryBuilder<TSelectedFields>)): PgMaterializedViewWithSelection<TName, false, AddAliasToSelection<TSelectedFields, TName>>;
}
declare class ManualMaterializedViewBuilder<TName extends string = string, TColumns extends Record<string, AnyPgColumnBuilder> = Record<string, AnyPgColumnBuilder>> extends MaterializedViewBuilderCore<{
    name: TName;
    columns: TColumns;
}> {
    private columns;
    constructor(name: TName, columns: TColumns, schema: string | undefined);
    existing(): PgMaterializedViewWithSelection<TName, true, BuildColumns<TName, TColumns>>;
    as(query: SQL): PgMaterializedViewWithSelection<TName, false, BuildColumns<TName, TColumns>>;
}
declare abstract class PgViewBase<TName extends string = string, TExisting extends boolean = boolean, TSelectedFields = unknown> extends View<TName, TExisting, TSelectedFields> {
    readonly _: View<TName, TExisting, TSelectedFields>['_'] & {
        readonly viewBrand: 'PgViewBase';
    };
}
declare const PgViewConfig: unique symbol;
declare class PgView<TName extends string = string, TExisting extends boolean = boolean, TSelectedFields = unknown> extends PgViewBase<TName, TExisting, TSelectedFields> {
    [PgViewConfig]: {
        with?: ViewWithConfig;
    } | undefined;
    constructor({ pgConfig, config }: {
        pgConfig: {
            with?: ViewWithConfig;
        } | undefined;
        config: {
            name: TName;
            schema: string | undefined;
            selectedFields: SelectedFields;
            query: SQL | undefined;
        };
    });
}
type PgViewWithSelection<TName extends string = string, TExisting extends boolean = boolean, TSelectedFields = unknown> = PgView<TName, TExisting, TSelectedFields> & TSelectedFields;
declare const PgMaterializedViewConfig: unique symbol;
declare class PgMaterializedView<TName extends string = string, TExisting extends boolean = boolean, TSelectedFields = unknown> extends PgViewBase<TName, TExisting, TSelectedFields> {
    readonly [PgMaterializedViewConfig]: {
        readonly with?: PgMaterializedViewWithConfig;
        readonly using?: string;
        readonly tablespace?: string;
        readonly withNoData?: boolean;
    } | undefined;
    constructor({ pgConfig, config }: {
        pgConfig: {
            with: PgMaterializedViewWithConfig | undefined;
            using: string | undefined;
            tablespace: string | undefined;
            withNoData: boolean | undefined;
        } | undefined;
        config: {
            name: TName;
            schema: string | undefined;
            selectedFields: SelectedFields;
            query: SQL | undefined;
        };
    });
}
type PgMaterializedViewWithSelection<TName extends string = string, TExisting extends boolean = boolean, TSelectedFields = unknown> = PgMaterializedView<TName, TExisting, TSelectedFields> & TSelectedFields;
declare function pgView<TName extends string>(name: TName): ViewBuilder<TName>;
declare function pgView<TName extends string, TColumns extends Record<string, AnyPgColumnBuilder>>(name: TName, columns: TColumns): ManualViewBuilder<TName, TColumns>;
declare function pgMaterializedView<TName extends string>(name: TName): MaterializedViewBuilder<TName>;
declare function pgMaterializedView<TName extends string, TColumns extends Record<string, AnyPgColumnBuilder>>(name: TName, columns: TColumns): ManualMaterializedViewBuilder<TName, TColumns>;

interface JoinsValue {
    on: SQL | undefined;
    table: AnyPgTable | Subquery | SQL;
    alias: string | undefined;
    joinType: JoinType;
}
type AnyPgSelect = PgSelect<any, any, any, any>;
type BuildAliasTable<TTable extends AnyTable, TAlias extends string> = PgTableWithColumns<Assume<UpdateTableConfig<TTable['_']['config'], {
    name: TAlias;
    columns: MapColumnsToTableAlias<TTable['_']['columns'], TAlias>;
}>, TableConfig>>;
interface PgSelectConfig {
    withList: Subquery[];
    fields: SelectedFields;
    fieldsList: SelectedFieldsOrdered;
    where?: SQL;
    having?: SQL;
    table: AnyPgTable | Subquery | PgViewBase | SQL;
    limit?: number | Placeholder;
    offset?: number | Placeholder;
    joins: JoinsValue[];
    orderBy: (AnyPgColumn | SQL | SQL.Aliased)[];
    groupBy: (AnyPgColumn | SQL | SQL.Aliased)[];
    lockingClauses: {
        strength: LockStrength;
        config: LockConfig;
    }[];
}
type JoinFn<THKT extends PgSelectHKTBase, TTableName extends string | undefined, TSelectMode extends SelectMode, TJoinType extends JoinType, TSelection, TNullabilityMap extends Record<string, JoinNullability>> = <TJoinedTable extends AnyPgTable | Subquery | SQL, TJoinedName extends GetSelectTableName<TJoinedTable> = GetSelectTableName<TJoinedTable>>(table: TJoinedTable, on: ((aliases: TSelection) => SQL | undefined) | SQL | undefined) => PgSelectKind<THKT, TTableName, AppendToResult<TTableName, TSelection, TJoinedName, TJoinedTable extends AnyPgTable ? TJoinedTable['_']['columns'] : TJoinedName extends Subquery ? Assume<TJoinedName['_']['selectedFields'], SelectedFields> : never, TSelectMode>, TSelectMode extends 'partial' ? TSelectMode : 'multiple', AppendToNullabilityMap<TNullabilityMap, TJoinedName, TJoinType>>;
type SelectedFieldsFlat = SelectedFieldsFlat$1<AnyPgColumn>;
type SelectedFields = SelectedFields$1<AnyPgColumn, AnyPgTable>;
type SelectedFieldsOrdered = SelectedFieldsOrdered$1<AnyPgColumn>;
type LockStrength = 'update' | 'no key update' | 'share' | 'key share';
type LockConfig = {
    of?: AnyPgTable;
} & ({
    noWait: true;
    skipLocked?: undefined;
} | {
    noWait?: undefined;
    skipLocked: true;
} | {
    noWait?: undefined;
    skipLocked?: undefined;
});
interface PgSelectHKTBase {
    tableName: string | undefined;
    selection: unknown;
    selectMode: SelectMode;
    nullabilityMap: unknown;
    _type: unknown;
}
type PgSelectKind<T extends PgSelectHKTBase, TTableName extends string | undefined, TSelection, TSelectMode extends SelectMode, TNullabilityMap extends Record<string, JoinNullability>> = (T & {
    tableName: TTableName;
    selection: TSelection;
    selectMode: TSelectMode;
    nullabilityMap: TNullabilityMap;
})['_type'];
interface PgSelectQueryBuilderHKT extends PgSelectHKTBase {
    _type: PgSelectQueryBuilder<this, this['tableName'], this['selection'], this['selectMode'], Assume<this['nullabilityMap'], Record<string, JoinNullability>>>;
}
interface PgSelectHKT extends PgSelectHKTBase {
    _type: PgSelect<this['tableName'], this['selection'], this['selectMode'], Assume<this['nullabilityMap'], Record<string, JoinNullability>>>;
}

declare function alias<TTable extends AnyPgTable, TAlias extends string>(table: TTable, alias: TAlias): BuildAliasTable<TTable, TAlias>;

declare class PgDatabase<TQueryResult extends QueryResultHKT, TSession extends PgSession> {
    constructor(
    /** @internal */
    dialect: PgDialect, 
    /** @internal */
    session: TSession);
    $with<TAlias extends string>(alias: TAlias): {
        as<TSelection>(qb: QueryBuilder<TSelection> | ((qb: QueryBuilderInstance) => QueryBuilder<TSelection>)): WithSubqueryWithSelection<TSelection, TAlias>;
    };
    with(...queries: WithSubquery[]): {
        select: {
            (): PgSelectBuilder<undefined>;
            <TSelection extends SelectedFields>(fields: TSelection): PgSelectBuilder<TSelection, "db">;
        };
    };
    select(): PgSelectBuilder<undefined>;
    select<TSelection extends SelectedFields>(fields: TSelection): PgSelectBuilder<TSelection>;
    update<TTable extends AnyPgTable>(table: TTable): PgUpdateBuilder<TTable, TQueryResult>;
    insert<TTable extends AnyPgTable>(table: TTable): PgInsertBuilder<TTable, TQueryResult>;
    delete<TTable extends AnyPgTable>(table: TTable): PgDelete<TTable, TQueryResult>;
    refreshMaterializedView<TView extends PgMaterializedView>(view: TView): PgRefreshMaterializedView<QueryResultHKT, never>;
    execute<TRow extends Record<string, unknown> = Record<string, unknown>>(query: SQLWrapper): Promise<QueryResultKind<TQueryResult, TRow>>;
}

declare class PgSchema {
    readonly schemaName: string;
    constructor(schemaName: string);
    table: typeof pgTable;
    view: typeof pgView;
    materializedView: typeof pgMaterializedView;
}
/** @deprecated - use `instanceof PgSchema` */
declare function isPgSchema(obj: unknown): obj is PgSchema;
type NoPublicSchemaError = DrizzleTypeError<"You can't specify 'public' as schema name. Postgres is using public schema by default. If you want to use 'public' schema, just use pgTable() instead of creating a schema">;
declare function pgSchema<T extends string>(name: T extends 'public' ? NoPublicSchemaError : T): PgSchema;

declare function getTableConfig<TTable extends AnyPgTable>(table: TTable): {
    columns: AnyPgColumn[];
    indexes: Index[];
    foreignKeys: ForeignKey[];
    checks: Check[];
    primaryKeys: PrimaryKey[];
    name: string;
    schema: string | undefined;
};
declare function getViewConfig<TName extends string = string, TExisting extends boolean = boolean>(view: PgView<TName, TExisting>): {
    with?: ViewWithConfig | undefined;
    name: TName;
    schema: string | undefined;
    selectedFields: SelectedFields$1<AnyColumn, Table<TableConfig$1<AnyColumn>>>;
    isExisting: TExisting;
    query: TExisting extends true ? undefined : SQL<unknown>;
};
declare function getMaterializedViewConfig<TName extends string = string, TExisting extends boolean = boolean>(view: PgMaterializedView<TName, TExisting>): {
    with?: PgMaterializedViewWithConfig | undefined;
    using?: string | undefined;
    tablespace?: string | undefined;
    withNoData?: boolean | undefined;
    name: TName;
    schema: string | undefined;
    selectedFields: SelectedFields$1<AnyColumn, Table<TableConfig$1<AnyColumn>>>;
    isExisting: TExisting;
    query: TExisting extends true ? undefined : SQL<unknown>;
};
declare function parsePgNestedArray(arrayString: string, startFrom?: number): [any[], number];
declare function parsePgArray(arrayString: string): any[];
declare function makePgArray(array: any[]): string;

export { AnyForeignKeyBuilder, AnyIndexBuilder, AnyPgColumn, AnyPgSelect, AnyPgTable, BuildAliasTable, Check, CheckBuilder, ConvertCustomConfig, CustomTypeParams, CustomTypeValues, DefaultViewBuilderCore, ForeignKey, ForeignKeyBuilder, GetColumnsTableName, Index, IndexBuilder, IndexBuilderOn, IndexColumn, IntervalConfig, JoinFn, JoinsValue, LockConfig, LockStrength, ManualMaterializedViewBuilder, ManualViewBuilder, MaterializedViewBuilder, MaterializedViewBuilderCore, PgArray, PgArrayBuilder, PgArrayBuilderHKT, PgArrayHKT, PgBigInt53, PgBigInt53Builder, PgBigInt53BuilderHKT, PgBigInt53BuilderInitial, PgBigInt53HKT, PgBigInt64, PgBigInt64Builder, PgBigInt64BuilderHKT, PgBigInt64BuilderInitial, PgBigInt64HKT, PgBigSerial53, PgBigSerial53Builder, PgBigSerial53BuilderHKT, PgBigSerial53BuilderInitial, PgBigSerial53HKT, PgBigSerial64, PgBigSerial64Builder, PgBigSerial64BuilderHKT, PgBigSerial64BuilderInitial, PgBigSerial64HKT, PgBoolean, PgBooleanBuilder, PgBooleanBuilderHKT, PgBooleanBuilderInitial, PgBooleanHKT, PgChar, PgCharBuilder, PgCharBuilderHKT, PgCharBuilderInitial, PgCharConfig, PgCharHKT, PgCidr, PgCidrBuilder, PgCidrBuilderHKT, PgCidrBuilderInitial, PgCidrHKT, PgColumn, PgCustomColumn, PgCustomColumnBuilder, PgCustomColumnBuilderHKT, PgCustomColumnHKT, PgCustomColumnInnerConfig, PgDatabase, PgDate, PgDateBuilder, PgDateBuilderHKT, PgDateBuilderInitial, PgDateHKT, PgDateString, PgDateStringBuilder, PgDateStringBuilderHKT, PgDateStringBuilderInitial, PgDateStringHKT, PgDelete, PgDeleteConfig, PgDialect, PgDoublePrecision, PgDoublePrecisionBuilder, PgDoublePrecisionBuilderHKT, PgDoublePrecisionBuilderInitial, PgDoublePrecisionHKT, PgEnum, PgEnumColumn, PgEnumColumnBuilder, PgEnumColumnBuilderHKT, PgEnumColumnBuilderInitial, PgEnumColumnHKT, PgInet, PgInetBuilder, PgInetBuilderHKT, PgInetBuilderInitial, PgInetHKT, PgInsert, PgInsertBuilder, PgInsertConfig, PgInsertValue, PgInteger, PgIntegerBuilder, PgIntegerBuilderHKT, PgIntegerHKT, PgInterval, PgIntervalBuilder, PgIntervalBuilderHKT, PgIntervalBuilderInitial, PgIntervalHKT, PgJson, PgJsonBuilder, PgJsonBuilderHKT, PgJsonBuilderInitial, PgJsonHKT, PgJsonb, PgJsonbBuilder, PgJsonbBuilderHKT, PgJsonbBuilderInitial, PgJsonbHKT, PgMacaddr, PgMacaddr8, PgMacaddr8Builder, PgMacaddr8BuilderHKT, PgMacaddr8BuilderInitial, PgMacaddr8HKT, PgMacaddrBuilder, PgMacaddrBuilderHKT, PgMacaddrBuilderInitial, PgMacaddrHKT, PgMaterializedView, PgMaterializedViewConfig, PgMaterializedViewWithConfig, PgMaterializedViewWithSelection, PgNumeric, PgNumericBuilder, PgNumericBuilderHKT, PgNumericBuilderInitial, PgNumericHKT, PgReal, PgRealBuilder, PgRealBuilderHKT, PgRealBuilderInitial, PgRealHKT, PgRefreshMaterializedView, PgSchema, PgSelect, PgSelectBuilder, PgSelectConfig, PgSelectHKT, PgSelectHKTBase, PgSelectKind, PgSelectQueryBuilder, PgSelectQueryBuilderHKT, PgSerial, PgSerialBuilder, PgSerialBuilderHKT, PgSerialBuilderInitial, PgSerialHKT, PgSession, PgSmallInt, PgSmallIntBuilder, PgSmallIntBuilderHKT, PgSmallIntBuilderInitial, PgSmallIntHKT, PgSmallSerial, PgSmallSerialBuilder, PgSmallSerialBuilderHKT, PgSmallSerialBuilderInitial, PgSmallSerialHKT, PgTable, PgTableExtraConfig, PgTableWithColumns, PgText, PgTextBuilder, PgTextBuilderConfig, PgTextBuilderHKT, PgTextConfig, PgTextHKT, PgTime, PgTimeBuilder, PgTimeBuilderHKT, PgTimeBuilderInitial, PgTimeHKT, PgTimestamp, PgTimestampBuilder, PgTimestampBuilderHKT, PgTimestampBuilderInitial, PgTimestampConfig, PgTimestampHKT, PgTimestampString, PgTimestampStringBuilder, PgTimestampStringBuilderHKT, PgTimestampStringBuilderInitial, PgTimestampStringHKT, PgUUID, PgUUIDBuilder, PgUUIDBuilderHKT, PgUUIDBuilderInitial, PgUUIDHKT, PgUpdate, PgUpdateBuilder, PgUpdateConfig, PgUpdateSetSource, PgVarchar, PgVarcharBuilder, PgVarcharBuilderHKT, PgVarcharBuilderInitial, PgVarcharConfig, PgVarcharHKT, PgView, PgViewBase, PgViewConfig, PgViewWithSelection, Precision, PreparedQuery, PreparedQueryConfig, PrimaryKey, PrimaryKeyBuilder, QueryBuilderInstance, QueryResultHKT, QueryResultKind, Reference, SelectedFields, SelectedFieldsFlat, SelectedFieldsOrdered, SubqueryWithSelection, TableConfig, TimeConfig, UpdateDeleteAction, ViewBuilder, ViewWithConfig, WithSubqueryWithSelection, alias, bigint, bigserial, boolean, char, check, cidr, customType, date, decimal, doublePrecision, foreignKey, getMaterializedViewConfig, getTableConfig, getViewConfig, index, inet, integer, interval, isPgEnum, isPgSchema, json, jsonb, macaddr, macaddr8, makePgArray, numeric, parsePgArray, parsePgNestedArray, pgEnum, pgMaterializedView, pgSchema, pgTable, pgTableCreator, pgView, primaryKey, queryBuilder, real, serial, smallint, smallserial, text, time, timestamp, uniqueIndex, uuid, varchar };
