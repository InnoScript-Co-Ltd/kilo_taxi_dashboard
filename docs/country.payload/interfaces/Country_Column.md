[**loyalty_platform_dashboard v0.1.0**](../../README.md) • **Docs**

***

[loyalty_platform_dashboard v0.1.0](../../modules.md) / [country.payload](../README.md) / Country\_Column

# Interface: Country\_Column

Represents the structure of a column in the country table.

## Properties

### align?

> `optional` **align**: `"right"`

Alignment of the column content

#### Defined in

[src/modules/country/country.payload.ts:25](https://github.com/InnoScript-Co-Ltd/loyalty_platform_admin_dashboard/blob/0790cd2783d47b8cc9a3a9d22a28b20c5aacf6ee/src/modules/country/country.payload.ts#L25)

***

### disablePadding

> **disablePadding**: `boolean`

Specifies if padding should be disabled for the column

#### Defined in

[src/modules/country/country.payload.ts:29](https://github.com/InnoScript-Co-Ltd/loyalty_platform_admin_dashboard/blob/0790cd2783d47b8cc9a3a9d22a28b20c5aacf6ee/src/modules/country/country.payload.ts#L29)

***

### format()?

> `optional` **format**: (`value`) => `string`

Optional function to format the value in the column

#### Parameters

• **value**: `number`

#### Returns

`string`

#### Defined in

[src/modules/country/country.payload.ts:31](https://github.com/InnoScript-Co-Ltd/loyalty_platform_admin_dashboard/blob/0790cd2783d47b8cc9a3a9d22a28b20c5aacf6ee/src/modules/country/country.payload.ts#L31)

***

### id

> **id**: `"action"` \| `"id"` \| `"name"` \| `"mobilePrefixNumber"` \| `"flagIcon"`

Unique identifier for the column

#### Defined in

[src/modules/country/country.payload.ts:19](https://github.com/InnoScript-Co-Ltd/loyalty_platform_admin_dashboard/blob/0790cd2783d47b8cc9a3a9d22a28b20c5aacf6ee/src/modules/country/country.payload.ts#L19)

***

### label

> **label**: `string`

Label to be displayed for the column

#### Defined in

[src/modules/country/country.payload.ts:21](https://github.com/InnoScript-Co-Ltd/loyalty_platform_admin_dashboard/blob/0790cd2783d47b8cc9a3a9d22a28b20c5aacf6ee/src/modules/country/country.payload.ts#L21)

***

### minWidth?

> `optional` **minWidth**: `number`

Minimum width of the column

#### Defined in

[src/modules/country/country.payload.ts:23](https://github.com/InnoScript-Co-Ltd/loyalty_platform_admin_dashboard/blob/0790cd2783d47b8cc9a3a9d22a28b20c5aacf6ee/src/modules/country/country.payload.ts#L23)

***

### numeric

> **numeric**: `boolean`

Specifies if the column data is numeric

#### Defined in

[src/modules/country/country.payload.ts:27](https://github.com/InnoScript-Co-Ltd/loyalty_platform_admin_dashboard/blob/0790cd2783d47b8cc9a3a9d22a28b20c5aacf6ee/src/modules/country/country.payload.ts#L27)
