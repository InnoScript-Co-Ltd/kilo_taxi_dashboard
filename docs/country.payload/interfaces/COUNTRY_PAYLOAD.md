[**loyalty_platform_dashboard v0.1.0**](../../README.md) • **Docs**

***

[loyalty_platform_dashboard v0.1.0](../../modules.md) / [country.payload](../README.md) / COUNTRY\_PAYLOAD

# Interface: COUNTRY\_PAYLOAD

Payload structure for creating and updating a country,
as well as pagination parameters.

## Properties

### create

> **create**: `object`

Data required to create a new country

#### flagIcon

> **flagIcon**: `string`

#### mobilePrefixNumber

> **mobilePrefixNumber**: `string`

#### name

> **name**: `string`

#### Defined in

[src/modules/country/country.payload.ts:40](https://github.com/InnoScript-Co-Ltd/loyalty_platform_admin_dashboard/blob/0790cd2783d47b8cc9a3a9d22a28b20c5aacf6ee/src/modules/country/country.payload.ts#L40)

***

### pagingParams

> **pagingParams**: `object`

Parameters for paging and sorting

#### CurrentPage

> **CurrentPage**: `number`

#### PageSize

> **PageSize**: `number`

#### SearchTerm

> **SearchTerm**: `string`

#### SortDir

> **SortDir**: `any`

#### SortField

> **SortField**: `any`

#### Defined in

[src/modules/country/country.payload.ts:52](https://github.com/InnoScript-Co-Ltd/loyalty_platform_admin_dashboard/blob/0790cd2783d47b8cc9a3a9d22a28b20c5aacf6ee/src/modules/country/country.payload.ts#L52)

***

### update

> **update**: `object`

Data required to update an existing country

#### flagIcon

> **flagIcon**: `string`

#### mobilePrefixNumber

> **mobilePrefixNumber**: `string`

#### name

> **name**: `string`

#### Defined in

[src/modules/country/country.payload.ts:46](https://github.com/InnoScript-Co-Ltd/loyalty_platform_admin_dashboard/blob/0790cd2783d47b8cc9a3a9d22a28b20c5aacf6ee/src/modules/country/country.payload.ts#L46)
