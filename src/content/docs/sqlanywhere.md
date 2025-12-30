---
title: "Sybase SQL Anywhere to MySQL Aurora"
description: "Continually export Sybase SQL Anywhere data to AWS Aurora MySQL."
---

## Synchronize Sybase SQL Anywhere to AWS

![Sybase SQL Anywhere to AWS](../../assets/img/SQL-Anywhere-to-AWS.png)

Continually export Sybase SQL Anywhere data to AWS Aurora MySQL.

*   Great to consolidate/merge information on the cloud from multiple locations that use SQL Anywhere databases, then build your own Data Warehouse and deliver Business Intelligence.
*   On top of AWS build web applications using data pulled from on-prem SQL Anywhere.

---

## Before You Begin

*   Have your AWS account linked it to our API. Not sure? [follow here.](/easyawssetup)
*   Complete registration on [Factor BI console](/console)
*   Create Service and Activation keys and configure service, [--> details here.](/console#configure-your-first-service)
*   [Download Bipost Sync](/installation) program for Windows.

---

## Bipost Sync

![SQL iAnywhere to MySQL Aurora](../../assets/img/bipost15.png)

*   **Service No.:** 36 digit number, it may look like this: <span style="color:red">`a1bcd23e-4fa5-67b8-cd9e-f0123abc4567`</span>
*   **Activation No.:** 24 digit number, it may look like this: <span style="color:red">`5990ab12c3de45f6a78bc90d`</span>
*   **Engine:** <span style="color:red">`SQL Anywhere`</span>
*   **System:** <span style="color:red">`Custom...`</span>

| SQL Anywhere |                         |
| -------------- | ----------------------- |
| DSN            | System DSN name, 32 bits |
| User           |                         |
| Password       |                         |

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
*   **NOTE:** For daily sync, instead of using Recursive Sync, dynamically parse a date range into customData.json ==> <a href="https://github.com/factorbi/bi-intelisis/blob/master/customData-examples.json" target="_blank">Examples here.</a>
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

# Oracle Micros RES 3700 POS Business Intelligence Use Case

<a href="https://en.wikipedia.org/wiki/Micros_Systems" target="_blank">Oracle Hospitality</a> Point of Sale system works with SQL Anywhere database. You can daily export data from several restaurants and consolidate them on AWS at scale.

Make Micros POS reporting affordable at scale. Create KPI's, Dashboards and Business Intelligence analytics using <a href="https://www.google.com/analytics/data-studio/" target="_blank">Google Data Studio</a> or <a href="https://aws.amazon.com/quicksight/" target="_blank">AWS QuickSight</a>.

![Micros RES Cloud Consolidation](../../assets/img/Oracle-Micros-data-consolidation.png)

<a href="https://s3.amazonaws.com/factorbi/3700SQL_Man.pdf" target="_blank">Oracle Micros RES database tables & documentation download.</a>

<a href="https://s3.amazonaws.com/factorbi/Oracle+Hospitality+RES+3700+Installation+Guide.pdf" target="_blank">Oracle Hospitality RES 3700 Installation Guide.</a>

> Keywords: Micros 3700 RES | Micros database files | Micros cloud reporting | merge multiple locations | Micros AWS | iAnywhere.Data.SQLAnywhere.v4.0.dll

---

## Contact Us

Questions? Send us an email: [info@factorbi.com](mailto:info@factorbi.com)