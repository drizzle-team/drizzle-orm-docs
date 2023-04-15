import { Connection, ExecutedQuery } from '@planetscale/database';
import { ResultSetHeader } from 'mysql2/promise';

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
type SelectedFieldsFlat<TColumn extends AnyColumn> = Record<string, TColumn | SQL | SQL.Aliased>;
type SelectedFields$1<TColumn extends AnyColumn, TTable extends Table> = Record<string, SelectedFieldsFlat<TColumn>[string] | TTable | SelectedFieldsFlat<TColumn>>;
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

type TableConfig = TableConfig$1<AnyMySqlColumn>;
declare class MySqlTable<T extends TableConfig> extends Table<T> {
    protected $columns: T['columns'];
}
type AnyMySqlTable<TPartial extends Partial<TableConfig> = {}> = MySqlTable<UpdateTableConfig<TableConfig, TPartial>>;

interface MySqlColumnHKT extends ColumnHKTBase {
    _type: MySqlColumn<MySqlColumnHKT, Assume<this['config'], ColumnBaseConfig>>;
}
declare abstract class MySqlColumn<THKT extends ColumnHKTBase, T extends ColumnBaseConfig, TRuntimeConfig extends object = {}> extends Column<THKT, T, TRuntimeConfig, {
    mysqlBrand: 'MySqlColumn';
}> {
}
type AnyMySqlColumn<TPartial extends Partial<ColumnBaseConfig> = {}> = MySqlColumn<MySqlColumnHKT, Required<Update<ColumnBaseConfig, TPartial>>>;

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

declare abstract class MySqlViewBase<TName extends string = string, TExisting extends boolean = boolean, TSelectedFields = unknown> extends View<TName, TExisting, TSelectedFields> {
    readonly _: View<TName, TExisting, TSelectedFields>['_'] & {
        readonly viewBrand: 'MySqlViewBase';
    };
}

interface JoinsValue {
    on: SQL | undefined;
    table: AnyMySqlTable | Subquery | SQL;
    alias: string | undefined;
    joinType: JoinType;
}
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

type PExecuteAs = 'array' | 'object';
type PExecuteOptions = {
    as?: PExecuteAs;
};
type PlanetScaleConnection = Connection;
declare class PlanetScalePreparedQuery<T extends PreparedQueryConfig> extends PreparedQuery<T> {
    private client;
    private queryString;
    private params;
    private logger;
    private fields;
    private rawQuery;
    private query;
    constructor(client: PlanetScaleConnection, queryString: string, params: unknown[], logger: Logger, fields: SelectedFieldsOrdered | undefined, name: string | undefined);
    execute(placeholderValues?: Record<string, unknown> | undefined): Promise<T['execute']>;
    all(placeholderValues?: Record<string, unknown> | undefined): Promise<T['all']>;
}
interface PlanetscaleSessionOptions {
    logger?: Logger;
}
declare class PlanetscaleSession extends MySqlSession {
    private client;
    private logger;
    constructor(client: PlanetScaleConnection, dialect: MySqlDialect, options?: PlanetscaleSessionOptions);
    prepareQuery<T extends PreparedQueryConfig = PreparedQueryConfig>(query: Query, fields: SelectedFieldsOrdered | undefined, name: string | undefined): PreparedQuery<T>;
    query(query: string, params: unknown[]): Promise<ExecutedQuery>;
    transaction(queries: {
        sql: string;
        params?: any[];
    }[]): Promise<void>;
    queryObjects(query: string, params: unknown[]): Promise<ExecutedQuery>;
}
interface PlanetscaleQueryResultHKT extends QueryResultHKT {
    type: ExecutedQuery;
}

interface PlanetscaleSDriverOptions {
    logger?: Logger;
}
declare class PlanetscaleDriver {
    private client;
    private dialect;
    private options;
    constructor(client: Connection, dialect: MySqlDialect, options?: PlanetscaleSDriverOptions);
    createSession(): PlanetscaleSession;
}
interface DrizzleConfig {
    logger?: boolean | Logger;
}
type PlanetScaleDatabase = MySqlDatabase<PlanetscaleQueryResultHKT, PlanetscaleSession>;
declare function drizzle(client: Connection, config?: DrizzleConfig): PlanetScaleDatabase;

export { DrizzleConfig, PExecuteAs, PExecuteOptions, PlanetScaleConnection, PlanetScaleDatabase, PlanetScalePreparedQuery, PlanetscaleDriver, PlanetscaleQueryResultHKT, PlanetscaleSDriverOptions, PlanetscaleSession, PlanetscaleSessionOptions, drizzle };
