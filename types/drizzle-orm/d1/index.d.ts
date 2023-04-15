/// <reference types="@cloudflare/workers-types" />
interface Logger {
    logQuery(query: string, params: unknown[]): void;
}

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

interface ColumnBuilderBaseConfig {
    name: string;
    data: unknown;
    driverParam: unknown;
    notNull: boolean;
    hasDefault: boolean;
}
interface ColumnBuilderRuntimeConfig<TData> {
    name: string;
    notNull: boolean;
    default: TData | SQL | undefined;
    hasDefault: boolean;
    primaryKey: boolean;
}
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

declare abstract class QueryBuilder<TSelection> implements SQLWrapper {
    _: {
        selectedFields: TSelection;
    };
    abstract getSQL(): SQL;
}

interface MigrationMeta {
    sql: string[];
    folderMillis: number;
    hash: string;
    bps: boolean;
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

type IndexColumn = AnySQLiteColumn | SQL;

type TableConfig = TableConfig$1<AnySQLiteColumn>;
declare class SQLiteTable<T extends TableConfig> extends Table<T> {
}
type AnySQLiteTable<TPartial extends Partial<TableConfig> = {}> = SQLiteTable<UpdateTableConfig<TableConfig, TPartial>>;

interface SQLiteColumnHKT extends ColumnHKTBase {
    _type: SQLiteColumn<SQLiteColumnHKT, Assume<this['config'], ColumnBaseConfig>>;
}
declare abstract class SQLiteColumn<THKT extends ColumnHKTBase, T extends ColumnBaseConfig, TRuntimeConfig extends object = {}> extends Column<THKT, T, TRuntimeConfig, {
    sqliteBrand: 'SQLiteColumn';
}> {
}
type AnySQLiteColumn<TPartial extends Partial<ColumnBaseConfig> = {}> = SQLiteColumn<SQLiteColumnHKT, Required<Update<ColumnBaseConfig, TPartial>>>;

declare abstract class SQLiteViewBase<TName extends string = string, TExisting extends boolean = boolean, TSelection = unknown> extends View<TName, TExisting, TSelection> {
    _: View<TName, TExisting, TSelection>['_'] & {
        viewBrand: 'SQLiteView';
    };
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
    prepare(): PreparedQuery$1<{
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

interface JoinsValue {
    on: SQL | undefined;
    table: AnySQLiteTable | Subquery | SQL;
    alias: string | undefined;
    joinType: JoinType;
}
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

interface PreparedQueryConfig$1 {
    type: 'sync' | 'async';
    run: unknown;
    all: unknown[];
    get: unknown;
    values: unknown[][];
}
declare abstract class PreparedQuery$1<T extends PreparedQueryConfig$1> {
    abstract run(placeholderValues?: Record<string, unknown>): ResultKind<T['type'], T['run']>;
    abstract all(placeholderValues?: Record<string, unknown>): ResultKind<T['type'], T['all']>;
    abstract get(placeholderValues?: Record<string, unknown>): ResultKind<T['type'], T['get']>;
    abstract values(placeholderValues?: Record<string, unknown>): ResultKind<T['type'], T['values']>;
}
declare abstract class SQLiteSession<TResultKind extends 'sync' | 'async' = 'sync' | 'async', TRunResult = unknown> {
    constructor(
    /** @internal */
    dialect: SQLiteDialect);
    abstract prepareQuery(query: Query, fields: SelectedFieldsOrdered | undefined, tx: Transaction<TResultKind, TRunResult> | undefined): PreparedQuery$1<PreparedQueryConfig$1 & {
        type: TResultKind;
    }>;
    prepareOneTimeQuery(query: Query, fields: SelectedFieldsOrdered | undefined, tx: Transaction<TResultKind, TRunResult> | undefined): PreparedQuery$1<PreparedQueryConfig$1 & {
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
    prepare(): PreparedQuery$1<{
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
    prepare(): PreparedQuery$1<{
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
    prepare(): PreparedQuery$1<{
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

interface DrizzleConfig {
    logger?: boolean | Logger;
}
type DrizzleD1Database = BaseSQLiteDatabase<'async', D1Result>;
declare function drizzle(client: D1Database, config?: DrizzleConfig): DrizzleD1Database;

interface SQLiteD1SessionOptions {
    logger?: Logger;
}
type PreparedQueryConfig = Omit<PreparedQueryConfig$1, 'statement' | 'run'>;
declare class SQLiteD1Session extends SQLiteSession<'async', D1Result> {
    private client;
    private logger;
    constructor(client: D1Database, dialect: SQLiteAsyncDialect, options?: SQLiteD1SessionOptions);
    prepareQuery(query: Query, fields?: SelectedFieldsOrdered): PreparedQuery;
    transaction(transaction: (tx: D1Transaction) => void | Promise<void>): Promise<void>;
}
declare class D1Transaction extends Transaction<'async', D1Result> {
}
declare class PreparedQuery<T extends PreparedQueryConfig = PreparedQueryConfig> extends PreparedQuery$1<{
    type: 'async';
    run: D1Result;
    all: T['all'];
    get: T['get'];
    values: T['values'];
}> {
    private stmt;
    private queryString;
    private params;
    private logger;
    private fields;
    constructor(stmt: D1PreparedStatement, queryString: string, params: unknown[], logger: Logger, fields: SelectedFieldsOrdered | undefined);
    run(placeholderValues?: Record<string, unknown>): Promise<D1Result>;
    all(placeholderValues?: Record<string, unknown>): Promise<T['all']>;
    get(placeholderValues?: Record<string, unknown>): Promise<T['get']>;
    values<T extends any[] = unknown[]>(placeholderValues?: Record<string, unknown>): Promise<T[]>;
}

export { D1Transaction, DrizzleConfig, DrizzleD1Database, PreparedQuery, SQLiteD1Session, SQLiteD1SessionOptions, drizzle };
