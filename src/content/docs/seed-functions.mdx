import Callout from '@mdx/Callout.astro';

# Generators

<Callout title='warning'>
For now, specifying `arraySize` along with `isUnique` in generators that support it will result in unique values being generated (not unique arrays), which will then be packed into arrays.
</Callout>

## ---

### `default`

<rem025 />
Generates the same given value each time the generator is called.

|  | param          | default     | type
|:-| :--------      | :--------   | :--------
|  |`defaultValue`  |--           |`any`
|  |`arraySize`     |--           |`number`

<rem025 />

```ts 
import { seed } from "drizzle-seed";

await seed(db, schema, { count: 1000 }).refine((funcs) => ({
  posts: {
    columns: {
      content: funcs.default({
        // value you want to generate
        defaultValue: "post content",

        // number of elements in each one-dimensional array. 
        // (If specified, arrays will be generated.)
        arraySize: 3
      }),
    },
  },
}));

```

### `valuesFromArray`

<rem025 />
Generates values from given array

|  | param      | default                   | type
|:-| :--------  | :--------                 | :--------
|  |`values`    |--                         |`any[]` \| `{ weight: number; values: any[] }[]`
|  |`isUnique`  |database column uniqueness |`boolean`
|  |`arraySize` |--                         |`number`


<rem025 />
```ts 
import { seed } from "drizzle-seed";

await seed(db, schema, { count: 1000 }).refine((funcs) => ({
  posts: {
    columns: {
      title: funcs.valuesFromArray({
        // Array of values you want to generate (can be an array of weighted values)
        values: ["Title1", "Title2", "Title3", "Title4", "Title5"],

        // Property that controls whether the generated values will be unique or not
        isUnique: true,
        
        // number of elements in each one-dimensional array. 
        // (If specified, arrays will be generated.)
        arraySize: 3
      }),
    },
  },
}));

```

### `intPrimaryKey`

<rem025 />
Generates sequential integers starting from 1.

|  | param      | default    | type
|:-| :--------  | :--------  | :--------
|  |--          |--          |--

<rem025 />

```ts 
import { seed } from "drizzle-seed";

await seed(db, schema, { count: 1000 }).refine((funcs) => ({
  posts: {
    columns: {
      id: funcs.intPrimaryKey(),
    },
  },
}));

```

### `number`

<rem025 />
Generates numbers with a floating point within the given range

|  | param      | default                                                                                               | type
|:-| :--------  | :--------                                                                                             | :--------
|  |`isUnique`  |database column uniqueness                                                                             |`boolean`
|  |`precision` |`100`                                                                                                  |`number`
|  |`maxValue`  |``` `precision * 1000` if isUnique equals false``` ``` `precision * count` if isUnique equals true```  |`number`
|  |`minValue`  |`-maxValue`                                                                                            |`number`
|  |`arraySize` |--                                                                                                     |`number`

<rem025 />
```ts 
import { seed } from "drizzle-seed";

await seed(db, schema, { count: 1000 }).refine((funcs) => ({
  products: {
    columns: {
      unitPrice: funcs.number({
        // lower border of range.
        minValue: 10,

        // upper border of range.
        maxValue: 120,
        
        // precision of generated number:
        // precision equals 10 means that values will be accurate to one tenth (1.2, 34.6);
        // precision equals 100 means that values will be accurate to one hundredth (1.23, 34.67).
        precision: 100,

        // property that controls if generated values gonna be unique or not.
        isUnique: false,

        // number of elements in each one-dimensional array. 
        // (If specified, arrays will be generated.)
        arraySize: 3
      }),
    },
  },
}));

```

### `int`

<rem025 />
Generates integers within the given range

|  | param      | default                                                                            | type
|:-| :--------  | :--------                                                                          | :--------
|  |`isUnique`  |database column uniqueness                                                          |`boolean`
|  |`maxValue`  |``` `1000` if isUnique equals false``` ``` `count * 10` if isUnique equals true```  |`number \| bigint`
|  |`minValue`  |`-maxValue`                                                                         |`number \| bigint`
|  |`arraySize` |--                                                                                  |`number`

<rem025 />
```ts 
import { seed } from "drizzle-seed";

await seed(db, schema, { count: 1000 }).refine((funcs) => ({
  products: {
    columns: {
      unitsInStock: funcs.int({
        // lower border of range.
        minValue: 0,

        // lower border of range.
        maxValue: 100,

        // property that controls if generated values gonna be unique or not.
        isUnique: false,

        // number of elements in each one-dimensional array. 
        // (If specified, arrays will be generated.)
        arraySize: 3
      }),
    },
  },
}));

```

### `boolean`

<rem025 />
Generates boolean values (true or false)

|  | param      | default    | type
|:-| :--------  | :--------  | :--------
|  |`arraySize` |--          |`number`

<rem025 />
```ts 
import { seed } from "drizzle-seed";

await seed(db, schema, { count: 1000 }).refine((funcs) => ({
  users: {
    columns: {
      isAvailable: funcs.boolean({
        // number of elements in each one-dimensional array. 
        // (If specified, arrays will be generated.)
        arraySize: 3
      }),
    },
  },
}));

```

### `date`

<rem025 />
Generates a date within the given range

|  | param      | default                 | type
|:-| :--------  | :--------------         | :--------
|  |`minDate`   |`new Date('2020-05-08')` | `string \| Date`
|  |`maxDate`   |`new Date('2028-05-08')` | `string \| Date`
|  |`arraySize` |--                       |`number`

<Callout type='warning'>
If only one of the parameters (`minDate` or `maxDate`) is provided, the unspecified parameter will be calculated by adding or subtracting 8 years to/from the specified one
</Callout>

<rem025 />
```ts 
import { seed } from "drizzle-seed";

await seed(db, schema, { count: 1000 }).refine((funcs) => ({
  users: {
    columns: {
      birthDate: funcs.date({
        // lower border of range.
        minDate: "1990-01-01",

        // upper border of range.
        maxDate: "2010-12-31",

        // number of elements in each one-dimensional array. 
        // (If specified, arrays will be generated.)
        arraySize: 3
      }),
    },
  },
}));

```

### `time`

<rem025 />
Generates time in 24-hour format

|  | param      | default    | type
|:-| :--------  | :--------  | :--------
|  |`arraySize` |--          |`number`

<rem025 />
```ts 
import { seed } from "drizzle-seed";

await seed(db, schema, { count: 1000 }).refine((funcs) => ({
  users: {
    columns: {
      birthTime: funcs.time({
        // number of elements in each one-dimensional array. 
        // (If specified, arrays will be generated.)
        arraySize: 3
      }),
    },
  },
}));

```

### `timestamp`

<rem025 />
Generates timestamps

|  | param      | default    | type
|:-| :--------  | :--------  | :--------
|  |`arraySize` |--          |`number`

<rem025 />
```ts 
import { seed } from "drizzle-seed";

await seed(db, schema, { count: 1000 }).refine((funcs) => ({
  orders: {
    columns: {
      shippedDate: funcs.timestamp({
        // number of elements in each one-dimensional array. 
        // (If specified, arrays will be generated.)
        arraySize: 3
      }),
    },
  },
}));

```

### `datetime`

<rem025 />
Generates datetime objects

|  | param      | default    | type
|:-| :--------  | :--------  | :--------
|  |`arraySize` |--          |`number`
<rem025 />
```ts 
import { seed } from "drizzle-seed";

await seed(db, schema, { count: 1000 }).refine((funcs) => ({
  orders: {
    columns: {
      shippedDate: funcs.datetime({
        // number of elements in each one-dimensional array. 
        // (If specified, arrays will be generated.)
        arraySize: 3
      }),
    },
  },
}));

```

### `year`

<rem025 />
Generates years in `YYYY` format

|  | param      | default    | type
|:-| :--------  | :--------  | :--------
|  |`arraySize` |--          |`number`

<rem025 />
```ts 
import { seed } from "drizzle-seed";

await seed(db, schema, { count: 1000 }).refine((funcs) => ({
  users: {
    columns: {
      birthYear: funcs.year({
        // number of elements in each one-dimensional array. 
        // (If specified, arrays will be generated.)
        arraySize: 3
      }),
    },
  },
}));

```

### `json`

<rem025 />
Generates JSON objects with a fixed structure

```ts
{ email, name, isGraduated, hasJob, salary, startedWorking, visitedCountries}

// or

{ email, name, isGraduated, hasJob, visitedCountries }
```

> The JSON structure will be picked randomly

|  | param      | default    | type
|:-| :--------  | :--------  | :--------
|  |`arraySize` |--          |`number`

<rem025 />
```ts 
import { seed } from "drizzle-seed";

await seed(db, schema, { count: 1000 }).refine((funcs) => ({
  users: {
    columns: {
      metadata: funcs.json({
        // number of elements in each one-dimensional array. 
        // (If specified, arrays will be generated.)
        arraySize: 3
      }),
    },
  },
}));

```

### `interval`

<rem025 />
Generates time intervals.

Example of a generated value: `1 year 12 days 5 minutes`

|  | param      | default            | type
|:-| :--------  | :--------          | :--------
|  |`isUnique`  | column uniqueness  |`boolean`
|  |`arraySize` |--                  |`number`

<rem025 />
```ts 
import { seed } from "drizzle-seed";

await seed(db, schema, { count: 1000 }).refine((funcs) => ({
  users: {
    columns: {
      timeSpentOnWebsite: funcs.interval({
        // `isUnique` - property that controls whether the generated values will be unique or not
        isUnique: true,

        // number of elements in each one-dimensional array. 
        // (If specified, arrays will be generated.)
        arraySize: 3
      }),
    },
  },
}));

```

### `string`

<rem025 />
Generates random strings

|  | param      | default    | type
|:-| :--------  | :--------  | :--------
|  |`isUnique`  |--          |`boolean`
|  |`arraySize` |--          |`number`

<rem025 />
```ts 
import { seed } from "drizzle-seed";

await seed(db, schema, { count: 1000 }).refine((funcs) => ({
  users: {
    columns: {
      hashedPassword: funcs.string({
        // `isUnique` - property that controls whether the generated values will be unique or not
        isUnique: false,
        
        // number of elements in each one-dimensional array. 
        // (If specified, arrays will be generated.)
        arraySize: 3
      }),
    },
  },
}));

```

### `uuid`

<rem025 />
Generates v4 UUID strings

|  | param      | default    | type
|:-| :--------  | :--------  | :--------
|  |`arraySize` |--          |`number`

<rem025 />
```ts 
import { seed } from "drizzle-seed";
await seed(db, schema, { count: 1000 }).refine((funcs) => ({
  products: {
    columns: {
      id: funcs.uuid({
        // number of elements in each one-dimensional array. 
        // (If specified, arrays will be generated.)
        arraySize: 3
      }),
    },
  },
}));
```

### `firstName`

<rem025 />
Generates a person's first name

|  | param      | default    | type
|:-| :--------  | :--------  | :--------
|  |`isUnique`  |--          |`boolean`
|  |`arraySize` |--          |`number`

<rem025 />
```ts 
import { seed } from "drizzle-seed";

await seed(db, schema, { count: 1000 }).refine((funcs) => ({
  users: {
    columns: {
      firstName: funcs.firstName({
        // `isUnique` - property that controls whether the generated values will be unique or not
        isUnique: true,

        // number of elements in each one-dimensional array. 
        // (If specified, arrays will be generated.)
        arraySize: 3
      }),
    },
  },
}));

```

### `lastName`

<rem025 />
Generates a person's last name

|  | param      | default    | type
|:-| :--------  | :--------  | :--------
|  |`isUnique`  |--          |`boolean`
|  |`arraySize` |--          |`number`

<rem025 />
```ts 
import { seed } from "drizzle-seed";

await seed(db, schema, { count: 1000 }).refine((funcs) => ({
  users: {
    columns: {
      lastName: funcs.lastName({
        // `isUnique` - property that controls whether the generated values will be unique or not
        isUnique: false,
        
        // number of elements in each one-dimensional array. 
        // (If specified, arrays will be generated.)
        arraySize: 3
      }),
    },
  },
}));

```

### `fullName`

<rem025 />
Generates a person's full name

|  | param      | default    | type
|:-| :--------  | :--------  | :--------
|  |`isUnique`  |--          |`boolean`
|  |`arraySize` |--          |`number`

<rem025 />
```ts 
import { seed } from "drizzle-seed";

await seed(db, schema, { count: 1000 }).refine((funcs) => ({
  users: {
    columns: {
      fullName: funcs.fullName({
        // `isUnique` - property that controls whether the generated values will be unique or not
        isUnique: true,

        // number of elements in each one-dimensional array. 
        // (If specified, arrays will be generated.)
        arraySize: 3
      }),
    },
  },
}));

```

### `email`

<rem025 />
Generates unique email addresses

|  | param      | default    | type
|:-| :--------  | :--------  | :--------
|  |`arraySize` |--          |`number`

<rem025 />
```ts 
import { seed } from "drizzle-seed";

await seed(db, schema, { count: 1000 }).refine((funcs) => ({
  users: {
    columns: {
      email: funcs.email({
        // number of elements in each one-dimensional array. 
        // (If specified, arrays will be generated.)
        arraySize: 3
      }),
    },
  },
}));

```

### `phoneNumber`

<rem025 />
Generates unique phone numbers

|  | param                    | default                                         | type
|:-| :--------                | :--------                                       | :--------
|  |`template`                |--                                               |`string`
|  |`prefixes`                |[Used dataset for prefixes](https://github.com/OleksiiKH0240/drizzle-orm/blob/main/drizzle-seed/src/datasets/phonesInfo.ts)   |`string[]`
|  |`generatedDigitsNumbers`  | `7` - `if prefixes was defined`                 |`number \| number[]`
|  |`arraySize`               |--                                               |`number`

<rem025 />
```ts 
import { seed } from "drizzle-seed";

//generate phone number using template property
await seed(db, schema, { count: 1000 }).refine((funcs) => ({
  users: {
    columns: {
      phoneNumber: funcs.phoneNumber({ 
        // `template` - phone number template, where all '#' symbols will be substituted with generated digits.
        template: "+(380) ###-####",

        // number of elements in each one-dimensional array. 
        // (If specified, arrays will be generated.)
        arraySize: 3
      }),
    },
  },
}));

```
```ts 
import { seed } from "drizzle-seed";

//generate phone number using prefixes and generatedDigitsNumbers properties
await seed(db, schema, { count: 1000 }).refine((funcs) => ({
  users: {
    columns: {
      phoneNumber: funcs.phoneNumber({
        // `prefixes` - array of any string you want to be your phone number prefixes.(not compatible with `template` property)
        prefixes: ["+380 99", "+380 67"],

        // `generatedDigitsNumbers` - number of digits that will be added at the end of prefixes.(not compatible with `template` property)
        generatedDigitsNumbers: 7,

        // number of elements in each one-dimensional array. 
        // (If specified, arrays will be generated.)
        arraySize: 3
      }),
    },
  },
}));

```
```ts 
import { seed } from "drizzle-seed";

// generate phone number using prefixes and generatedDigitsNumbers properties but with different generatedDigitsNumbers for prefixes
await seed(db, schema, { count: 1000 }).refine((funcs) => ({
  users: {
    columns: {
      phoneNumber: funcs.phoneNumber({
        // `prefixes` - array of any string you want to be your phone number prefixes.(not compatible with `template` property)
        prefixes: ["+380 99", "+380 67", "+1"],

        // `generatedDigitsNumbers` - number of digits that will be added at the end of prefixes.(not compatible with `template` property)
        generatedDigitsNumbers: [7, 7, 10],

        // number of elements in each one-dimensional array. 
        // (If specified, arrays will be generated.)
        arraySize: 3
      }),
    },
  },
}));

```
### `country`

<rem025 />
Generates country's names

|  | param      | default    | type
|:-| :--------  | :--------  | :--------
|  |`isUnique`  |--          |`boolean`
|  |`arraySize` |--          |`number`

<rem025 />

```ts 
import { seed } from "drizzle-seed";

await seed(db, schema, { count: 1000 }).refine((funcs) => ({
  users: {
    columns: {
      country: funcs.country({
        // `isUnique` - property that controls whether the generated values will be unique or not
        isUnique: false,
        
        // number of elements in each one-dimensional array. 
        // (If specified, arrays will be generated.)
        arraySize: 3
      }),
    },
  },
}));

```

### `city`

<rem025 />
Generates city's names

|  | param      | default    | type
|:-| :--------  | :--------  | :--------
|  |`isUnique`  |--          |`boolean`
|  |`arraySize` |--          |`number`

<rem025 />

```ts 
import { seed } from "drizzle-seed";

await seed(db, schema, { count: 1000 }).refine((funcs) => ({
  users: {
    columns: {
      city: funcs.city({
        // `isUnique` - property that controls whether the generated values will be unique or not
        isUnique: false,

        // number of elements in each one-dimensional array. 
        // (If specified, arrays will be generated.)
        arraySize: 3
      }),
    },
  },
}));

```

### `streetAddress`

<rem025 />
Generates street address

|  | param      | default    | type
|:-| :--------  | :--------  | :--------
|  |`isUnique`  |--          |`boolean`

<rem025 />

```ts 
import { seed } from "drizzle-seed";

await seed(db, schema, { count: 1000 }).refine((funcs) => ({
  users: {
    columns: {
      streetAddress: funcs.streetAddress({
        // `isUnique` - property that controls whether the generated values will be unique or not
        isUnique: false,
        
        // number of elements in each one-dimensional array. 
        // (If specified, arrays will be generated.)
        arraySize: 3 
      }),
    },
  },
}));

```

### `jobTitle`

<rem025 />
Generates job titles

|  | param      | default    | type
|:-| :--------  | :--------  | :--------
|  |`arraySize` |--          |`number`

<rem025 />

```ts 
import { seed } from "drizzle-seed";

await seed(db, schema, { count: 1000 }).refine((funcs) => ({
  users: {
    columns: {
      jobTitle: funcs.jobTitle({
        // number of elements in each one-dimensional array. 
        // (If specified, arrays will be generated.)
        arraySize: 3
      }),
    },
  },
}));

```

### `postcode`

<rem025 />
Generates postal codes

|  | param      | default    | type
|:-| :--------  | :--------  | :--------
|  |`isUnique`  |--          |`boolean`
|  |`arraySize` |--          |`number`

<rem025 />

```ts 
import { seed } from "drizzle-seed";

await seed(db, schema, { count: 1000 }).refine((funcs) => ({
  users: {
    columns: {
      postcode: funcs.postcode({
        // `isUnique` - property that controls whether the generated values will be unique or not
        isUnique: true,

        // number of elements in each one-dimensional array. 
        // (If specified, arrays will be generated.)
        arraySize: 3
      }),
    },
  },
}));

```

### `state`

<rem025 />
Generates US states

|  | param      | default    | type
|:-| :--------  | :--------  | :--------
|  |`arraySize` |--          |`number`

<rem025 />

```ts 
import { seed } from "drizzle-seed";

await seed(db, schema, { count: 1000 }).refine((funcs) => ({
  users: {
    columns: {
      state: funcs.state({
        // number of elements in each one-dimensional array. 
        // (If specified, arrays will be generated.)
        arraySize: 3
      }),
    },
  },
}));

```

### `companyName`

<rem025 />
Generates random company's names

|  | param      | default    | type
|:-| :--------  | :--------  | :--------
|  |`isUnique`  |--          |`boolean`
|  |`arraySize` |--          |`number`

<rem025 />

```ts 
import { seed } from "drizzle-seed";

await seed(db, schema, { count: 1000 }).refine((funcs) => ({
  users: {
    columns: {
      company: funcs.companyName({ 
        // `isUnique` - property that controls whether the generated values will be unique or not
        isUnique: true,

        // number of elements in each one-dimensional array. 
        // (If specified, arrays will be generated.)
        arraySize: 3
      }),
    },
  },
}));

```
### `loremIpsum`

<rem025 />
Generates `lorem ipsum` text sentences.

|  | param            | default    | type
|:-| :--------        | :--------  | :--------
|  |`sentencesCount`  | 1          |`number`
|  |`arraySize`       |--          |`number`

<rem025 />

```ts 
import { seed } from "drizzle-seed";

await seed(db, schema, { count: 1000 }).refine((funcs) => ({
  posts: {
    columns: {
      content: funcs.loremIpsum({
        // `sentencesCount` - number of sentences you want to generate as one generated value(string).
        sentencesCount: 2,

        // number of elements in each one-dimensional array. 
        // (If specified, arrays will be generated.)
        arraySize: 3
      }),
    },
  },
}));

```

### `point`

<rem025 />
Generates 2D points within specified ranges for x and y coordinates.

|  | param       | default                                                                                 | type
|:-| :--------   | :--------                                                                               | :--------
|  |`isUnique`   |database column uniqueness                                                               |`boolean`
|  |`maxXValue`  |``` `10 * 1000` if isUnique equals false``` ``` `10 * count` if isUnique equals true```  |`number`
|  |`minXValue`  |`-maxXValue`                                                                             |`number`
|  |`maxYValue`  |``` `10 * 1000` if isUnique equals false``` ``` `10 * count` if isUnique equals true```  |`number`
|  |`minYValue`  |`-maxYValue`                                                                             |`number`
|  |`arraySize`  |--                                                                                       |`number`


<rem025 />

```ts 
import { seed } from "drizzle-seed";

await seed(db, schema, { count: 1000 }).refine((funcs) => ({
  triangles: {
    columns: {
      pointCoords: funcs.point({
        // `isUnique` - property that controls if generated values gonna be unique or not.
        isUnique: true,

        // `minXValue` - lower bound of range for x coordinate.
        minXValue: -5,

        // `maxXValue` - upper bound of range for x coordinate.
        maxXValue: 20,

        // `minYValue` - lower bound of range for y coordinate.
        minYValue: 0,

        // `maxYValue` - upper bound of range for y coordinate.
        maxYValue: 30,

        // number of elements in each one-dimensional array. 
        // (If specified, arrays will be generated.)
        arraySize: 3
      }),
    },
  },
}));

```

### `line`

<rem025 />
Generates 2D lines within specified ranges for a, b and c parameters of line.

```
line equation: a*x + b*y + c = 0
```

|  | param       | default                                                                                 | type
|:-| :--------   | :--------                                                                               | :--------
|  |`isUnique`   |database column uniqueness                                                               |`boolean`
|  |`maxAValue`  |``` `10 * 1000` if isUnique equals false``` ``` `10 * count` if isUnique equals true```  |`number`
|  |`minAValue`  |`-maxAValue`                                                                             |`number`
|  |`maxBValue`  |``` `10 * 1000` if isUnique equals false``` ``` `10 * count` if isUnique equals true```  |`number`
|  |`minBValue`  |`-maxBValue`                                                                             |`number`
|  |`maxCValue`  |``` `10 * 1000` if isUnique equals false``` ``` `10 * count` if isUnique equals true```  |`number`
|  |`minCValue`  |`-maxCValue`                                                                             |`number`
|  |`arraySize`  |--                                                                                       |`number`
<rem025 />

```ts 
import { seed } from "drizzle-seed";

await seed(db, schema, { count: 1000 }).refine((funcs) => ({
  lines: {
    columns: {
      lineParams: funcs.point({
        // `isUnique` - property that controls if generated values gonna be unique or not.
        isUnique: true,

        // `minAValue` - lower bound of range for a parameter.
        minAValue: -5,

        // `maxAValue` - upper bound of range for x parameter.
        maxAValue: 20,

        // `minBValue` - lower bound of range for y parameter.
        minBValue: 0,

        // `maxBValue` - upper bound of range for y parameter.
        maxBValue: 30,

        // `minCValue` - lower bound of range for y parameter.
        minCValue: 0,

        // `maxCValue` - upper bound of range for y parameter.
        maxCValue: 10,

        // number of elements in each one-dimensional array. 
        // (If specified, arrays will be generated.)
        arraySize: 3
      }),
    },
  },
}));

```
