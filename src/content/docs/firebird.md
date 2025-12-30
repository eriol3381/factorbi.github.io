---
title: "Firebird to MySQL Aurora"
description: "Continually export Firebird data to AWS Aurora MySQL."
---

## Synchronize Firebird to AWS

![FirebirdSQL to AWS](../../assets/img/Firebird-to-AWS.png)

Continually export Firebird data to AWS Aurora MySQL.

*   Great to consolidate/merge information on the cloud from multiple locations that use FirebirdSQL databases, then build your own Data Warehouse and deliver Business Intelligence.
*   On top of AWS build web applications using data pulled from on-prem FirebirdSQL.
*   Send data from AWS back to FirebirdSQL.

---

## Before You Begin

*   Have your AWS account linked it to our API. Not sure? [follow here.](/easyawssetup)
*   Complete registration on [Factor BI console](/console)
*   Create Service and Activation keys and configure service, [--> details here.](/console#configure-your-first-service)
*   [Download Bipost Sync](/installation) program for Windows.

---

## Bipost Sync

![Firebird to MySQL Aurora](../../assets/img/bipost2.png)

*   **Service No.:** 36 digit number, it may look like this: <span style="color:red">`a1bcd23e-4fa5-67b8-cd9e-f0123abc4567`</span>
*   **Activation No.:** 24 digit number, it may look like this: <span style="color:red">`5990ab12c3de45f6a78bc90d`</span>
*   **Engine:** <span style="color:red">`Firebird`</span>
*   **System:** <span style="color:red">`Custom...`</span>

| Firebird Connection |                                                               |                                                                    |
| ------------------- | ------------------------------------------------------------- | ------------------------------------------------------------------ |
| Remote Connection   | *Leave unchecked*                                             | *Enable ONLY when biPost.exe is not located on Firebird Server.*   |
| Server              | *Leave blank*                                                 | *Use ONLY when Remote Connection is enabled: Type IP or name of Firebird Server.* |
| User                | *Firebird User*                                               | *SYSDBA or other user with read access*                            |
| Password            |                                                               |                                                                    |
| Database            | *Location of your .FDB file*                                  |                                                                    |

---

## General Settings

![Bipost General Settings](../../assets/img/bipost7.png)

### Specific Bucket:

*   Enter your **Bucket Name**. It may look like this: <span style="color:red">`bipostdata-acb123456789012`</span>
*   It is available on your AWS Account \ CloudFormation Stack.

> ![CloudFormation AWS Console](../../assets/img/cloudFormation-console-search.png)

### Download Data

*   Enable to download data from AWS Aurora to on-premises.
*   Downloaded data will be available on <span style="color:red">`%localappdata%/biPost/out_`</span> Windows folder.
*   Update/insert data to Firebird by enabling **Process Data** check box.
*   More about downloading data check here [--> Sync back to Windows](/synctowindows)

> ![MySQL to Firebird](../../assets/img/bipost8.png)

### Recursive Sync

*   Use only to upload historic data. It optimizes upload by extracting and uploading one day at a time for a given date range.
*   Always use along with [customData.json](/customdatajson) so you can configure the date field to use for each table.
*   **NOTE:** For daily sync, instead of using Recursive Sync, dynamically parse a date range into customData.json ==> <a href="https://github.com/factorbi/sync-examples/blob/master/microsip-json/customData-30dias.json" target="_blank">Examples here.</a>
*   More info about this feature see [Recursive Synchronization](/customdatajson#recursive-synchronization)

## Tenant

*   This allows to sync several on-premise databases to a single Aurora-MySQL database and differentiate them with **tenant_id**. Great for consolidation!
*   Activate and type a string to add a fixed column to every table that is synced.
*   This fixed column will be included in the PRIMARY KEY on Aurora-MySQL.

---

## Tables to Sync

**IMPORTANT:** Tables and subsets of data to synchronize are specified in **customData.json** file ==> [follow here.](/customdatajson)

---

## Schedule

![Bipost Schedule](../../assets/img/bipost9.png)

If you want automated execution of Bipost Sync, then set the **Hour** desired and click **Schedule**.

This will create a Windows Task that will run daily. If you want a different schedule, then open **Windows Task Scheduler** as follows.

Control Panel \ Administrative Tools:

![Windows Administrative Tools](../../assets/img/Windows_Administrative_Tools.png)

![Windows Task Scheduler](../../assets/img/Windows_Task_Scheduler.png)

If you manually create a task to run biPost then use <span style="color:red">`argument: post`</span>

![Windows Add Argument Task](../../assets/img/Task_Scheduler_biPost_Arguments.png)

---

## Check for Updates

New versions of Bipost Sync can be checked using **Help \ Check for Updates.**

![Bipost Check for Updates Menu](../../assets/img/bipost10.png)

![Bipost new version available](../../assets/img/new_version_available.png)

---

## Sync multiple databases

If you are going to synchronize two or more databases from the same Windows host, create separate Bipost Sync folders for each database. Then customize each folder with the desired data set as explained [here.](/customdatajson)

---

# Use Cases

Many legacy and critical mission systems use Firebird SQL.

<a href="http://www.microsip.com/" target="_blank">Microsip ERP</a> and <a href="http://aspel.com.mx/" target="_blank">Aspel</a> are examples of systems built with Firebird. We have companies that use Bipost Sync + AWS to achieve sales & financial consolidation and enable cloud Business Intelligence with <a href="https://www.google.com/analytics/data-studio/" target="_blank">Google Data Studio.</a>

![Firebird to MySQL Aurora Business Intelligence Use Case](../../assets/img/Firebird-to-MySQL-Aurora-Use-Case.png)

---

## Contact Us

Questions? Send us an email: [info@factorbi.com](mailto:info@factorbi.com)