[**loyalty_platform_dashboard v0.1.0**](../../README.md) • **Docs**

***

[loyalty_platform_dashboard v0.1.0](../../modules.md) / [country.slice](../README.md) / setPaginate

# Function: setPaginate()

> **setPaginate**(`payload`): `object`

Calling this redux#ActionCreator with an argument will
return a PayloadAction of type `T` with a payload of `P`

## Parameters

• **payload**

• **payload.CurrentPage**: `number`

• **payload.PageSize**: `number`

• **payload.SearchTerm**: `string`

• **payload.SortDir**: `any`

• **payload.SortField**: `any`

## Returns

`object`

### payload

> **payload**: `object`

### payload.CurrentPage

> **CurrentPage**: `number`

### payload.PageSize

> **PageSize**: `number`

### payload.SearchTerm

> **SearchTerm**: `string`

### payload.SortDir

> **SortDir**: `any`

### payload.SortField

> **SortField**: `any`

### type

> **type**: `"country/setPaginate"`

## Defined in

[src/modules/country/country.slice.ts:86](https://github.com/InnoScript-Co-Ltd/loyalty_platform_admin_dashboard/blob/0790cd2783d47b8cc9a3a9d22a28b20c5aacf6ee/src/modules/country/country.slice.ts#L86)
