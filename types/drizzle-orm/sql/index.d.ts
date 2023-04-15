interface TableConfig<TColumn extends AnyColumn = AnyColumn> {
    name: string;
    schema: string | undefined;
    columns: Record<string, TColumn>;
}
type UpdateTableConfig<T extends TableConfig, TUpdate extends Partial<TableConfig>> = Required<Update<T, TUpdate>>;
declare class Table<T extends TableConfig = TableConfig> {
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
type AnyTable<TPartial extends Partial<TableConfig> = {}> = Table<UpdateTableConfig<TableConfig, TPartial>>;
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

type Chunk = string | Table | View | AnyColumn | Name | Param | Placeholder | SQL;
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
declare function isSQLWrapper(value: unknown): value is SQLWrapper;
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
/**
 * Any DB name (table, column, index etc.)
 */
declare function name(value: string): Name;
interface DriverValueDecoder<TData, TDriverParam> {
    mapFromDriverValue(value: TDriverParam): TData;
}
interface DriverValueEncoder<TData, TDriverParam> {
    mapToDriverValue(value: TData): TDriverParam | SQL;
}
declare function isDriverValueEncoder(value: unknown): value is DriverValueEncoder<any, any>;
declare const noopDecoder: DriverValueDecoder<any, any>;
declare const noopEncoder: DriverValueEncoder<any, any>;
interface DriverValueMapper<TData, TDriverParam> extends DriverValueDecoder<TData, TDriverParam>, DriverValueEncoder<TData, TDriverParam> {
}
declare const noopMapper: DriverValueMapper<any, any>;
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
declare function param<TData, TDriver>(value: TData, encoder?: DriverValueEncoder<TData, TDriver>): Param<TData, TDriver>;
type SQLChunk = StringChunk | SQLChunk[] | SQLWrapper | SQL | Table | View | Subquery | AnyColumn | Param | Name | undefined | FakePrimitiveParam | Placeholder;
declare function sql<T>(strings: TemplateStringsArray, ...params: any[]): SQL<T>;
declare namespace sql {
    function empty(): SQL;
    function fromList(list: SQLChunk[]): SQL;
    /**
     * Convenience function to create an SQL query from a raw string.
     * @param str The raw SQL query string.
     */
    function raw(str: string): SQL;
}
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
declare function placeholder<TName extends string>(name: TName): Placeholder<TName>;
declare function fillPlaceholders(params: unknown[], values: Record<string, unknown>): unknown[];

export { BuildQueryConfig, Chunk, DriverValueDecoder, DriverValueEncoder, DriverValueMapper, GetDecoderResult, Name, Param, Placeholder, Query, QueryTypingsValue, SQL, SQLChunk, SQLWrapper, StringChunk, fillPlaceholders, isDriverValueEncoder, isSQLWrapper, name, noopDecoder, noopEncoder, noopMapper, param, placeholder, sql };
