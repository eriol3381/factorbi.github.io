---
title: "Visual FoxPro to MySQL Aurora"
description: "Continually export Visual FoxPro data to AWS Aurora MySQL."
---

## Synchronize Visual FoxPro to AWS

![Visual FoxPro to AWS](../../assets/img/Visual-FoxPro-to-AWS.png)

Continually export Visual FoxPro data to AWS Aurora MySQL.

*   Great to consolidate/merge information on the cloud from multiple locations that use Visual FoxPro databases, then build your own Data Warehouse and deliver Business Intelligence.
*   On top of AWS build web applications using data pulled from on-prem Visual FoxPro.

---

## Before You Begin

*   Have your AWS account linked it to our API. Not sure? [follow here.](/easyawssetup)
*   Complete registration on [Factor BI console](/console)
*   Create Service and Activation keys and configure service, [--> details here.](/console#configure-your-first-service)
*   [Download Bipost Sync](/installation) program for Windows.

---

## Bipost Sync

![DBF to MySQL Aurora](../../assets/img/bipost3.png)

*   **Service No.:** 36 digit number, it may look like this: <span style="color:red">`a1bcd23e-4fa5-67b8-cd9e-f0123abc4567`</span>
*   **Activation No.:** 24 digit number, it may look like this: <span style="color:red">`5990ab12c3de45f6a78bc90d`</span>
*   **Engine:** <span style="color:red">`DBF`</span>
*   **System:** <span style="color:red">`Custom...`</span>
*   **DBF Connection:** Directory containing **.dbf** files.

---

## General Settings

![Bipost General Settings](../../assets/img/bipost7.png)

### Specific Bucket:

*   Enter your **Bucket Name**. It may look like this: <span style="color:red">`bipostdata-acb123456789012`</span>
*   It is available on your AWS Account \ CloudFormation Stack.

> ![CloudFormation AWS Console](../../assets/img/cloudFormation-console-search.png)

### Download Data

*   Leave **unchecked**.

### Recursive Sync

*   Use only to upload historic data. It optimizes upload by extracting and uploading one day at a time for a given date range.
*   Always use along with [customData.json](/customdatajson) so you can configure the date field to use for each table.
*   **NOTE:** For daily sync, instead of using Recursive Sync, dynamically parse a date range into customData.json ==> [Examples here.](https://github.com/factorbi/sync-examples/blob/master/positouch-json/customData-5days.json)
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

## Contact Us

Questions? Send us an email: [info@factorbi.com](mailto:info@factorbi.com)