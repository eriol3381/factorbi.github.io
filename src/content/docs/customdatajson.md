---
title: "Tables & Data to Sync"
description: "How to specify tables, fields, and filters for data synchronization using customData.json."
---

## customData.json

This file is where you write SQL querys to specify tables, fields and filters that will be executed on the extraction process to the on-prem database.

Use query syntax according your database engine.

**Example 1, tables with 100,000 rows or less:**

```json
[
    {
        "active": "true",
        "table": "CentroCostos",
        "fields": "*",
        "join": "",
        "filter": "",
        "recursiveDateField": "",
        "order": "",
        "limit": "",
        "comment1": "",
        "comment2": ""
    },
    {
        "active": "true",
        "table": "MovTipo",
        "fields": "Modulo, Mov, Clave",
        "join": "",
        "filter": "",
        "recursiveDateField": "",
        "order": "",
        "limit": "",
        "comment1": "",
        "comment2": ""
    },
    {
        "active": "true",
        "table": "Cta",
        "fields": "Cuenta, Rama, Descripcion, Tipo, EsAcreedora, EsAcumulativa, CentrosCostos, Estatus, ClaveSAT",
        "join": "",
        "filter": "",
        "recursiveDateField": "",
        "order": "",
        "limit": "",
        "comment1": "",
        "comment2": ""
    },
    {
        "active": "",
        "table": "",
        "fields": "",
        "join": "",
        "filter": "",
        "recursiveDateField": "",
        "order": "",
        "limit": "",
        "comment1": "",
        "comment2": ""
    }
]
```

> *   The above JSON will send all data for the specified tables, as <span style="color:red">`join`</span> and <span style="color:red">`filter`</span> are not in use.
> *   Leaving <span style="color:red">`"active": "",`</span> empty means `false`.

**Example 2, dynamic filter using the current time of your database.**

```json
[
    {
        "active": "true",
        "table": "Cte",
        "fields": "Cte.Cliente, Cte.Nombre, Cte.Tipo, Cte.Categoria, Cte.Estatus, Cte.Estado, Cte.Pais",
        "join": "Venta WITH (NOLOCK) ON Cte.Cliente = Venta.Cliente",
        "filter": "CONVERT(date,Venta.UltimoCambio) BETWEEN DATEADD(day, -5, CONVERT(date,getdate())) AND CONVERT(date,getdate())",
        "recursiveDateField": "",
        "order": "",
        "limit": "",
        "comment1": "",
        "comment2": ""
    }
]
```

> <span style="color:red">`join`</span>, <span style="color:red">`filter`</span> and <span style="color:red">`order`</span> can use any syntax supported by your database engine.

**Example 3, using order and limit:**

```json
[
    {
        "active": "true",
        "table": "DOCTOS_ENTRE_SIS",
        "fields": "*",
        "join": "",
        "filter": "",
        "recursiveDateField": "",
        "order": "DOCTO_DEST_ID DESC",
        "limit": "50000",
        "comment1": "",
        "comment2": ""
    }
]
```

---

## Tables & Primary Keys

Take note of the following:

*   You can synchronize tables or views.
*   Tables must have a **Primary Key** and these must be listed on <span style="color:red">`"fields"`</span>
*   If a table does not have a Primary Key then use [**customSchema.json**](/customdatajson#customschemajson) to simulate one.
*   The above also applies to Views.
*   <span style="color:red">`"fields"`</span> parameter must **only** include fields that exist on <span style="color:red">`"table":`</span>

---

## Recursive Synchronization

When this parameter is enabled the execution will extract one day at a time on a cycle, so it will make one upload to AWS for every day in the specified date range.

This feature is very useful to optimize the uploading process to Aurora-MySQL, as it is not recommended to upload more than 1.5 million rows on a single execution.

![Recursive Sync](../../assets/img/bipost7.png)

Given **From Date:** *July 01, 2018* and **To Date:** *July 31, 2018*, the execution will make 31 uploads to AWS. On customData.json <span style="color:red">`Venta.FechaEmision`</span> is used to parse these dates, example:

```json
[
    {
        "active": "true",
        "table": "Venta",
        "fields": "Venta.ID, Venta.Empresa, Venta.Mov, Venta.MovID, Venta.FechaEmision, Venta.Concepto, Venta.Moneda, Venta.TipoCambio, Venta.Estatus, Venta.Cliente, Venta.Almacen, Venta.Agente, Venta.Condicion, Venta.Vencimiento, Venta.DescuentoLineal, Venta.Sucursal, Venta.SubModulo, Venta.Importe, Venta.Impuestos, Venta.CostoTotal, Venta.FechaRegistro, Venta.DescuentoGlobal, Venta.Proyecto",
        "join": "MovTipo WITH (NOLOCK) ON Venta.Mov = MovTipo.Mov AND MovTipo.Modulo = 'VTAS'",
        "filter": "Venta.Estatus NOT IN ('SINAFECTAR','BORRADOR') AND MovTipo.Clave IN ('VTAS.F','VTAS.D','VTAS.N','VTAS.FM','VTAS.FC')",
        "recursiveDateField": "Venta.FechaEmision",
        "order": "",
        "limit": "",
        "comment1": "",
        "comment2": ""
    },
    {
        "active": "true",
        "table": "VentaD",
        "fields": "VentaD.ID, VentaD.Renglon, VentaD.RenglonSub, VentaD.Articulo, VentaD.Cantidad, VentaD.Almacen, VentaD.Precio, VentaD.DescuentoLinea, VentaD.DescuentoImporte, VentaD.Impuesto1, VentaD.Costo, VentaD.ContUso, VentaD.Unidad, VentaD.Factor, VentaD.Agente",
        "join": "Venta WITH (NOLOCK) ON Venta.ID = VentaD.ID JOIN MovTipo WITH (NOLOCK) ON Venta.Mov = MovTipo.Mov AND MovTipo.Modulo = 'VTAS'",
        "filter": "Venta.Estatus NOT IN ('SINAFECTAR','BORRADOR') AND MovTipo.Clave IN ('VTAS.F','VTAS.D','VTAS.N','VTAS.FM','VTAS.FC')",
        "recursiveDateField": "Venta.FechaEmision",
        "order": "",
        "limit": "",
        "comment1": "",
        "comment2": ""
    }
]
```

It is suitable to remove time part from the field used inside <span style="color:red">`"recursiveDateField":`</span>.

---

# customSchema.json

Use this file when tables **do not** have PRIMARY KEY or when syncing views.

Example:

```json
[
    {
        "table": "CASHOUT",
        "primaryKey": ["store", "date", "shift", "sh_start", "sh_end", "co_type", "co_number", "drawer", "cost_centr"]
    },
    {
        "table": "CASHOUT2",
        "primaryKey": ["store", "date", "shift", "sh_start", "sh_end", "co_type", "co_number", "drawer", "cost_centr"],
        "notes": "code comment"
    },
    {
        "table": "CATSALES",
        "primaryKey": ["store", "inv_number"]
    },
    {
        "table": "CHKHDR",
        "primaryKey": ["store", "date", "check_num", "disc_num"]
    },
    {
        "table": "CHKITEMS",
        "primaryKey": ["store", "date", "check_num", "seq_main", "option", "item_num"]
    },
    {
        "table": "CONTROL",
        "primaryKey": ["fiscl_year"]
    },
    {
        "table": "FCOSTN",
        "primaryKey": ["store", "inv_number"]
    },
    {
        "table": "",
        "primaryKey": ["", ""]
    }
]
```

---

# comment1, comment2

These two parameters can be used as "tag" instructions available before and after data is loaded to Aurora-MySQL.

A database named **bipost_system** is created on Aurora-MySQL and has information about every sync process. **bipost_sync_table** stores comment1 and comment2 for ever table and sync execution.

Make the following query to know what kind of information is stored:

```sql
SELECT * FROM `bipost_system`.bipost_sync_info ORDER BY id DESC LIMIT 100;
SELECT * FROM `bipost_system`.bipost_sync_table ORDER BY id DESC, rid LIMIT 100;
```

See examples of how to use comment1 and comment2 before data is loaded [==> here.](/bipostapi#2-prepare-database-before-loading)

---

# Sync for multiple scenarios

It is very common to make changes to customData.json to upload different sets of data.

**Use Cases:**

1.  Some tables may be uploaded once since that data is rarely changed, e.g. config & company tables.
2.  Historic data may be uploaded once, e.g. transactions from previous years.
3.  Recently created/modified data may be uploaded daily, e.g. invoices, quotes, purchase orders, customers, items, vendors, etc.

For all these reasons it may be useful to make copies of Bipost Sync folder and just change **customData.json.** Moreover you may want to have different sync schedules.