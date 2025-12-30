---
title: "Loading and Transformation"
description: "An overview of the data loading and transformation process with Bipost API and Aurora-MySQL."
---

## Working with Aurora-MySQL

Every time Bipost Sync sends data to AWS it works along with an API that runs 4 steps.

## 1. Create-Alter Schemas

*   If it doesn't exist, database is created with:
    *   Name: The one you specified on [Factor BI Console.](https://s3.amazonaws.com/biforms-prod/index.html)
    *   Encoding: <span style="color:red">`cp1252 West European (latin1)`</span>
    *   Collation: <span style="color:red">`latin1_spanish_ci`</span>
*   Tables are created with all the columns found on source db.
*   Alter tables to match source schemas. Columns are never deleted.
*   Only fields specified in [customData.json](/customdatajson) will be populated.

---

## 2. Prepare Database Before Loading

After schemas are created/altered and **before** new data is loaded, you can run a stored procedure.

This is very useful if you need to delete, truncate or make any changes before data is loaded.

Include all desired statements in a stored procedure named <span style="color:red">`spPostInitial`</span>.

> <span style="color:red">`_serviceID`</span> and <span style="color:red">`_syncID`</span> variables are automatically delivered from the API.

Example:

```sql
DELIMITER $$
DROP PROCEDURE IF EXISTS `spPostInitial`$$
CREATE PROCEDURE `spPostInitial`(
  _serviceID varchar(36),
  _syncID int
  )
postinitial:BEGIN

  DECLARE _SQL  longtext;
  DECLARE _timestamp datetime;
  DECLARE _syncDate date;
  DECLARE _timezone varchar(64);
  DECLARE _rid, _prevId, _count_bipost_sync_info, _count_table int;
  DECLARE _numDays decimal(10,0);
  DECLARE _tableName, _comment1, _comment2 varchar(255);

  SET lc_time_names = 'en_US';
  SET group_concat_max_len = 4294967295;
  SET _count_bipost_sync_info = 0;

  SELECT COUNT(*) INTO _count_bipost_sync_info FROM `bipost_system`.bipost_sync_info WHERE id = _syncID AND serviceID = _serviceID;

  IF IFNULL(_count_bipost_sync_info,0) = 0 THEN
    INSERT INTO logPostInitial (message, serviceID, syncID) VALUES ('execution parameters do not match', _serviceID, _syncID);
    SELECT 'execution parameters do not match' AS message;
    LEAVE postinitial;
  END IF;

  SELECT NULLIF(TRIM(timezone),'') INTO _timezone FROM syncInfoStores WHERE serviceID = _serviceID;
  IF _timezone IS NULL THEN
    SELECT IFNULL(NULLIF(TRIM(timezone),''),'US/Eastern') INTO _timezone FROM syncInfo WHERE serviceID = _serviceID;
  END IF;
  SELECT CONVERT_TZ(syncDate, 'UTC', _timezone) INTO _timestamp FROM `bipost_system`.bipost_sync_info WHERE id = _syncID;
  SELECT IFNULL(CAST(_timestamp AS date),'0000-00-00 00:00:00.0000') INTO _syncDate;

  IF _syncDate <> '0000-00-00 00:00:00.0000' THEN

    INSERT INTO logPostInitial (message, serviceID, syncID) VALUES ('ok', _serviceID, _syncID);

    SET _prevId = 0, _count_table = 0;

    table_id: WHILE(1=1) DO
      SELECT MIN(rid)
        INTO _rid
        FROM `bipost_system`.bipost_sync_table
        WHERE rid > _prevId AND id = _syncID AND comment1 = '-1';

      IF _rid IS NULL THEN
        LEAVE table_id;
      END IF;

      SELECT tableName, comment1
        INTO _tableName, _comment1
        FROM `bipost_system`.bipost_sync_table
        WHERE rid = _rid;

      SELECT COUNT(*) INTO _count_table FROM information_schema.tables WHERE table_type = 'BASE TABLE' AND table_name = _tableName AND table_schema = schema();
      IF _count_table > 0 THEN
        SET _SQL = CONCAT(
          'TRUNCATE TABLE `', _tableName, '`;');
        SET @SQL = _SQL; PREPARE stmt3 FROM @SQL; EXECUTE stmt3; DEALLOCATE PREPARE stmt3; SET _SQL = NULL;
      END IF;

      SET _prevId = _rid, _count_table = 0;
    END WHILE;

  #***************** Delete child tables first *****************

    SET _numDays = 0, _count_table = 0, _tableName = 'claves_articulos';
    SELECT CAST(comment1 AS decimal(10,0))*(-1) INTO _numDays FROM `bipost_system`.bipost_sync_table WHERE id = _syncID AND tableName = _tableName;
    SELECT COUNT(*) INTO _count_table FROM information_schema.tables WHERE table_type = 'BASE TABLE' AND table_name = _tableName AND table_schema = schema();
    IF _numDays < 0 AND _count_table > 0 THEN
      DELETE claves_articulos
        FROM claves_articulos
        JOIN articulos ON claves_articulos.ARTICULO_ID = articulos.ARTICULO_ID
        WHERE ((CAST(articulos.FECHA_HORA_CREACION AS date) BETWEEN date_add(_syncDate, INTERVAL _numDays day) AND _syncDate) OR (CAST(articulos.FECHA_HORA_ULT_MODIF AS date) BETWEEN date_add(_syncDate, INTERVAL _numDays day) AND _syncDate));
    END IF;

    SET _numDays = 0, _count_table = 0, _tableName = 'dirs_clientes';
    SELECT CAST(comment1 AS decimal(10,0))*(-1) INTO _numDays FROM `bipost_system`.bipost_sync_table WHERE id = _syncID AND tableName = _tableName;
    SELECT COUNT(*) INTO _count_table FROM information_schema.tables WHERE table_type = 'BASE TABLE' AND table_name = _tableName AND table_schema = schema();
    IF _numDays < 0 AND _count_table > 0 THEN
      DELETE dirs_clientes
        FROM dirs_clientes
        JOIN clientes ON dirs_clientes.CLIENTE_ID = clientes.CLIENTE_ID
        WHERE ((CAST(clientes.FECHA_HORA_CREACION AS date) BETWEEN date_add(_syncDate, INTERVAL _numDays day) AND _syncDate) OR (CAST(clientes.FECHA_HORA_ULT_MODIF AS date) BETWEEN date_add(_syncDate, INTERVAL _numDays day) AND _syncDate));
    END IF;

  #***************** Delete header/parent tables *****************

    SET _numDays = 0, _count_table = 0, _tableName = 'articulos';
    SELECT CAST(comment1 AS decimal(10,0))*(-1) INTO _numDays FROM `bipost_system`.bipost_sync_table WHERE id = _syncID AND tableName = _tableName;
    SELECT COUNT(*) INTO _count_table FROM information_schema.tables WHERE table_type = 'BASE TABLE' AND table_name = _tableName AND table_schema = schema();
    IF _numDays < 0 AND _count_table > 0 THEN
      DELETE FROM articulos
        WHERE ((CAST(FECHA_HORA_CREACION AS date) BETWEEN date_add(_syncDate, INTERVAL _numDays day) AND _syncDate) OR (CAST(FECHA_HORA_ULT_MODIF AS date) BETWEEN date_add(_syncDate, INTERVAL _numDays day) AND _syncDate));
    END IF;

    SET _numDays = 0, _count_table = 0, _tableName = 'clientes';
    SELECT CAST(comment1 AS decimal(10,0))*(-1) INTO _numDays FROM `bipost_system`.bipost_sync_table WHERE id = _syncID AND tableName = _tableName;
    SELECT COUNT(*) INTO _count_table FROM information_schema.tables WHERE table_type = 'BASE TABLE' AND table_name = _tableName AND table_schema = schema();
    IF _numDays < 0 AND _count_table > 0 THEN
      DELETE FROM clientes
        WHERE ((CAST(FECHA_HORA_CREACION AS date) BETWEEN date_add(_syncDate, INTERVAL _numDays day) AND _syncDate) OR (CAST(FECHA_HORA_ULT_MODIF AS date) BETWEEN date_add(_syncDate, INTERVAL _numDays day) AND _syncDate));
    END IF;

  #***************** Tables with special comments *****************
    SET _numDays = 0, _count_table = 0, _tableName = 'saldos_co';
    SELECT comment2 INTO _comment2 FROM `bipost_system`.bipost_sync_table WHERE id = _syncID AND tableName = _tableName;
    SELECT COUNT(*) INTO _count_table FROM information_schema.tables WHERE table_type = 'BASE TABLE' AND table_name = _tableName AND table_schema = schema();
    IF _comment2 = 'last year + ytd' AND _count_table > 0 THEN
      DELETE FROM saldos_co
        WHERE ANO >= YEAR(_syncDate)-1;
    END IF;

    SET _numDays = 0, _count_table = 0, _tableName = 'saldos_in';
    SELECT comment2 INTO _comment2 FROM `bipost_system`.bipost_sync_table WHERE id = _syncID AND tableName = _tableName;
    SELECT COUNT(*) INTO _count_table FROM information_schema.tables WHERE table_type = 'BASE TABLE' AND table_name = _tableName AND table_schema = schema();
    IF _comment2 = 'last month + mtd' AND _count_table > 0 THEN
      DELETE FROM saldos_in
        WHERE ANO = YEAR(_syncDate) AND MES IN (MONTH(_syncDate)-1, MONTH(_syncDate));
    END IF;

  END IF;

END$$
DELIMITER ;
```

---

## 3. Load Data

Data loading is performed by Aurora. Matching primary keys rows are updated and the rest are inserted.

You can verify which tables where loaded by querying <span style="color:red">`aurora_s3_load_history`</span> table like this:

```sql
SELECT
  LOWER(REPLACE(RIGHT(e.file_name,LOCATE('/',REVERSE(e.file_name))-1),'.csv','')) AS "table",
  CONVERT_TZ(load_timestamp,'UTC','US/Eastern') AS "local_load_timestamp",
  e.load_timestamp,
  SUBSTRING(e.load_prefix, LOCATE('bipostdata',e.load_prefix), LOCATE('/',e.load_prefix, LOCATE('bipostdata',e.load_prefix)+1)-LOCATE('bipostdata',e.load_prefix)) AS "bucket",
  LEFT(e.file_name,LOCATE('/', e.file_name)-1) AS "serviceNumber"
FROM mysql.aurora_s3_load_history AS e
WHERE
--  e.file_name REGEXP 'your-service-numer-bc9a-c0123def4567'
  file_name REGEXP 'mytable.csv'
--  AND e.load_timestamp>'2019-01-01 09:41:41'
ORDER BY e.load_timestamp DESC LIMIT 100 ;
```

---

## 4. Transform Data After Loading

After new data is loaded to Aurora-MySQL and **before** it begins the downloading process to your on-prem, you can run a stored procedure.

This is very useful to analyze and populate new tables.

It is also useful to prepare tables with data sets for the downloading process back to on-premises.

Include all desired statements in a stored procedure named <span style="color:red">`spPostFinal`</span>.

> <span style="color:red">`_serviceID`</span> and <span style="color:red">`_syncID`</span> variables are automatically delivered from the API.

Example:

```sql
DELIMITER $$
DROP PROCEDURE IF EXISTS `spPostFinal`$$
CREATE PROCEDURE `spPostFinal`(
  _serviceID varchar(36),
  _syncID int
  )
postfinal:BEGIN

  DECLARE _timestamp datetime;
  DECLARE _syncDate date;
  DECLARE _timezone varchar(64);
  DECLARE _count_bipost_sync_info int;

  SET lc_time_names = 'en_US';
  SET group_concat_max_len = 4294967295;

  SELECT COUNT(*) INTO _count_bipost_sync_info FROM `bipost_system`.bipost_sync_info WHERE id = _syncID AND serviceID = _serviceID;

  IF _count_bipost_sync_info = 0 THEN
    INSERT INTO logPostFinal (message, serviceID, syncID) VALUES ('execution parameters do not match', _serviceID, _syncID);
    SELECT 'execution parameters do not match' AS message;
    LEAVE postfinal;
  END IF;

  SELECT NULLIF(TRIM(timezone),'') INTO _timezone FROM syncInfoStores WHERE serviceID = _serviceID;
  IF _timezone IS NULL THEN
    SELECT IFNULL(NULLIF(TRIM(timezone),''),'US/Eastern') INTO _timezone FROM syncInfo WHERE serviceID = _serviceID;
  END IF;
  SELECT CONVERT_TZ(syncDate, 'UTC', _timezone) INTO _timestamp FROM `bipost_system`.bipost_sync_info WHERE id = _syncID;
  SELECT IFNULL(CAST(_timestamp AS date),'0000-00-00 00:00:00.0000') INTO _syncDate;

  UPDATE syncInfo
    SET syncDate = _syncDate, `timestamp` = _timestamp, lastSyncId = _syncID
    WHERE serviceID = _serviceID;

  call spReport1(_serviceID);
  call spReport2(_serviceID);

  INSERT INTO logPostFinal (message, serviceID, syncID) VALUES ('ok', _serviceID, _syncID);
  SELECT 'ok' AS message;

END$$
DELIMITER ;
```

---

## Execution information

A database named **bipost_system** is created on Aurora-MySQL and has information about every sync process. **bipost_sync_table** stores comment1 and comment2 for ever table and sync execution.

Make the following query to know what kind of information is stored:

```sql
SELECT * FROM `bipost_system`.bipost_sync_info ORDER BY id DESC LIMIT 100;
SELECT * FROM `bipost_system`.bipost_sync_table ORDER BY id DESC, rid LIMIT 100;
```

---

## More examples

Check more transformation examples on [this repository.](https://github.com/factorbi/sync-examples/tree/master/mysql)