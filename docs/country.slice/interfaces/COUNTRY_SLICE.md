[**loyalty_platform_dashboard v0.1.0**](../../README.md) • **Docs**

***

[loyalty_platform_dashboard v0.1.0](../../modules.md) / [country.slice](../README.md) / COUNTRY\_SLICE

# Interface: COUNTRY\_SLICE

Interface representing the shape of the country slice in Redux.

## Properties

### country

> **country**: `null` \| [`COUNTRY`](../../country.payload/interfaces/COUNTRY.md)

#### Defined in

[src/modules/country/country.slice.ts:20](https://github.com/InnoScript-Co-Ltd/loyalty_platform_admin_dashboard/blob/0790cd2783d47b8cc9a3a9d22a28b20c5aacf6ee/src/modules/country/country.slice.ts#L20)

***

### data

> **data**: `object`

#### countries

> **countries**: [`COUNTRY`](../../country.payload/interfaces/COUNTRY.md)[]

#### paging

> **paging**: `object`

#### paging.firstRowOnPage

> **firstRowOnPage**: `number`

#### paging.lastRowOnPage

> **lastRowOnPage**: `number`

#### paging.nextPage

> **nextPage**: `number`

#### paging.previousPage

> **previousPage**: `null` \| `string`

#### paging.totalCount

> **totalCount**: `number`

#### paging.totalPages

> **totalPages**: `number`

#### Defined in

[src/modules/country/country.slice.ts:9](https://github.com/InnoScript-Co-Ltd/loyalty_platform_admin_dashboard/blob/0790cd2783d47b8cc9a3a9d22a28b20c5aacf6ee/src/modules/country/country.slice.ts#L9)

***

### pagingParams

> **pagingParams**: `object`

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

[src/modules/country/country.slice.ts:21](https://github.com/InnoScript-Co-Ltd/loyalty_platform_admin_dashboard/blob/0790cd2783d47b8cc9a3a9d22a28b20c5aacf6ee/src/modules/country/country.slice.ts#L21)
