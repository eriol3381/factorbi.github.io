---
title: "Link your AWS Account"
description: "The easiest and recommended way to link your AWS Account to Bipost API."
---

## Link your AWS Account

**This is the easiest and recommended way to link your AWS Account to Bipost API.**

IMPORTANT NOTICE: If you are planning to use Bipost Sync for production you may want to follow your IT department policies and use AWS security according to your needs.

---

## Step 1: Have an AWS Account?

**If you don't have an AWS Account please proceed:**

1.  Create an AWS Account here [aws.amazon.com](http://aws.amazon.com)
    ![Create an AWS Account](../../assets/img/Create_an_AWS_Account.png)

2.  AWS usually makes an automated verification phone call, we suggest to provide a land line.

3.  Provide payment information.

4.  Select Basic Support (free plan).

5.  Congrats you have an AWS account!

Need Help? [--> Write us.](mailto:info@factorbi.com)

---

## Step 2: Canonical User ID

Logged in to AWS Account:

1.  Upper right corner of your AWS console, click your account name (or follow next link).
2.  [My Security Credentials.](https://console.aws.amazon.com/iam/home#/security_credential)
3.  Click *Continue to Security Credentials* if dialog appears.
4.  Expand Account Identifiers.
5.  Copy AWS Account ID (12-digit) and Canonical User ID (64-digit).
    ![AWS Your Security Credentials](../../assets/img/Your_Security_Credentials.png)
6.  Email these numbers to [info@factorbi.com](mailto:info@factorbi.com) so we can setup your dedicated Bucket.

**Please stop here until you get a reply email from Factor BI.** We will provide your **bucket name** which will be used on further steps.

---

## Step 3: Closest AWS Region

**[cloudping.info](http://cloudping.info)**

*   Click the above link and hit **HTTP Ping** and look for the lowest latency.
*   Maybe you want to try this at different times of the day.
*   Take note of the closest region.

![Closest AWS Region to My Location](../../assets/img/CloudPing.png)

---

## Step 4: CloudFormation

Based on the result from previous step, click the icon that is the closest Region to your location.

| AWS Region                | Short name     |                                                                                                                                                                                 |
| ------------------------- | -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| US East (N. Virginia)     | us-east-1      | <a href="https://console.aws.amazon.com/cloudformation/home?region=us-east-1#/stacks/new?stackName=Production&templateURL=https://s3.amazonaws.com/bipost-cloudformation/Aurora-RDS-bipost.template" target="_blank"><img alt="cloudformation-launch-button" src="../../assets/img/launch-stack.png" /></a> |
| US East (Ohio)            | us-east-2      | <a href="https://console.aws.amazon.com/cloudformation/home?region=us-east-2#/stacks/new?stackName=Production&templateURL=https://s3.amazonaws.com/bipost-cloudformation/Aurora-RDS-bipost.template" target="_blank"><img alt="cloudformation-launch-button" src="../../assets/img/launch-stack.png" /></a> |
| US West (California)      | us-west-1      | <a href="https://console.aws.amazon.com/cloudformation/home?region=us-west-1#/stacks/new?stackName=Production&templateURL=https://s3.amazonaws.com/bipost-cloudformation/Aurora-RDS-bipost.template" target="_blank"><img alt="cloudformation-launch-button" src="../../assets/img/launch-stack.png" /></a> |
| US West (Oregon)          | us-west-2      | <a href="https://console.aws.amazon.com/cloudformation/home?region=us-west-2#/stacks/new?stackName=Production&templateURL=https://s3.amazonaws.com/bipost-cloudformation/Aurora-RDS-bipost.template" target="_blank"><img alt="cloudformation-launch-button" src="../../assets/img/launch-stack.png" /></a> |
| Canada (Central)          | ca-central-1   | <a href="https://console.aws.amazon.com/cloudformation/home?region=ca-central-1#/stacks/new?stackName=Production&templateURL=https://s3.amazonaws.com/bipost-cloudformation/Aurora-RDS-bipost.template" target="_blank"><img alt="cloudformation-launch-button" src="../../assets/img/launch-stack.png" /></a> |
| Europe (Ireland)          | eu-west-1      | <a href="https://console.aws.amazon.com/cloudformation/home?region=eu-west-1#/stacks/new?stackName=Production&templateURL=https://s3.amazonaws.com/bipost-cloudformation/Aurora-RDS-bipost.template" target="_blank"><img alt="cloudformation-launch-button" src="../../assets/img/launch-stack.png" /></a> |
| Europe (London)           | eu-west-2      | <a href="https://console.aws.amazon.com/cloudformation/home?region=eu-west-2#/stacks/new?stackName=Production&templateURL=https://s3.amazonaws.com/bipost-cloudformation/Aurora-RDS-bipost.template" target="_blank"><img alt="cloudformation-launch-button" src="../../assets/img/launch-stack.png" /></a> |
| Europe (Frankfurt)        | eu-central-1   | <a href="https://console.aws.amazon.com/cloudformation/home?region=eu-central-1#/stacks/new?stackName=Production&templateURL=https://s3.amazonaws.com/bipost-cloudformation/Aurora-RDS-bipost.template" target="_blank"><img alt="cloudformation-launch-button" src="../../assets/img/launch-stack.png" /></a> |
| Europe (Paris)            | eu-west-3      | <a href="https://console.aws.amazon.com/cloudformation/home?region=eu-west-3#/stacks/new?stackName=Production&templateURL=https://s3.amazonaws.com/bipost-cloudformation/Aurora-RDS-bipost.template" target="_blank"><img alt="cloudformation-launch-button" src="../../assets/img/launch-stack.png" /></a> |
| Asia Pacific (Mumbai)     | ap-south-1     | <a href="https://console.aws.amazon.com/cloudformation/home?region=ap-south-1#/stacks/new?stackName=Production&templateURL=https://s3.amazonaws.com/bipost-cloudformation/Aurora-RDS-bipost.template" target="_blank"><img alt="cloudformation-launch-button" src="../../assets/img/launch-stack.png" /></a> |
| Asia Pacific (Seoul)      | ap-northeast-2 | <a href="https://console.aws.amazon.com/cloudformation/home?region=ap-northeast-2#/stacks/new?stackName=Production&templateURL=https://s3.amazonaws.com/bipost-cloudformation/Aurora-RDS-bipost.template" target="_blank"><img alt="cloudformation-launch-button" src="../../assets/img/launch-stack.png" /></a> |
| Asia Pacific (Singapore)  | ap-southeast-1 | <a href="https://console.aws.amazon.com/cloudformation/home?region=ap-southeast-1#/stacks/new?stackName=Production&templateURL=https://s3.amazonaws.com/bipost-cloudformation/Aurora-RDS-bipost.template" target="_blank"><img alt="cloudformation-launch-button" src="../../assets/img/launch-stack.png" /></a> |
| Asia Pacific (Sydney)     | ap-southeast-2 | <a href="https://console.aws.amazon.com/cloudformation/home?region=ap-southeast-2#/stacks/new?stackName=Production&templateURL=https://s3.amazonaws.com/bipost-cloudformation/Aurora-RDS-bipost.template" target="_blank"><img alt="cloudformation-launch-button" src="../../assets/img/launch-stack.png" /></a> |
| Asia Pacific (Tokyo)      | ap-northeast-1 | <a href="https://console.aws.amazon.com/cloudformation/home?region=ap-northeast-1#/stacks/new?stackName=Production&templateURL=https://s3.amazonaws.com/bipost-cloudformation/Aurora-RDS-bipost.template" target="_blank"><img alt="cloudformation-launch-button" src="../../assets/img/launch-stack.png" /></a> |
| South America (São Paulo) | sa-east-1      | <a href="https://console.aws.amazon.com/cloudformation/home?region=sa-east-1#/stacks/new?stackName=Production&templateURL=https://s3.amazonaws.com/bipost-cloudformation/Aurora-RDS-bipost.template" target="_blank"><img alt="cloudformation-launch-button" src="../../assets/img/launch-stack.png" /></a> |

### 4.1. Select Template

*   The template must be already selected, click **Next** lower-right blue button.

![Select Template](../../assets/img/create-stack-step1.png)

### 4.2. Specify Details

*   **Stack Name:** this will be the prefix of all provisioned services. Example: <span style="color:red">`mycompany-prod`</span>
*   **BucketName:** Paste the S3 bucket name that your received from Factor BI over email. It must look like this: <span style="color:red">`bipostdata-acb123456789012`</span>
*   **DBAdminPassword:** Type a complex password. Must be at least 8 characters containing uppercase and lowercase letters, numbers and symbols.
    > Password must be at least eight characters long. Can be any printable ASCII character except "/", """, or "@".
*   **DBAdminUsername:** Database Admin Username, example: <span style="color:red">`root`</span>
*   **DBInstanceClass:** for testing purposes select the smallest available, currently <span style="color:red">`db.t2.small`</span>
*   **Environment:** Text to be included in the database cluster name.
*   **PublicSubnetACIDR:** Leave default. Only modify the subnet address if multiple environments are needed, example: <span style="color:red">`10.20.10.0/24`</span>
*   **PublicSubnetBCIDR:** Leave default. Only modify the subnet address if multiple environments are needed, example: <span style="color:red">`10.20.20.0/24`</span>
*   **SubnetsAZ:** Select two availability zones to create the resources.
*   **VPCCIDR:** Leave default. Only modify the address if multiple environment are needed, example: <span style="color:red">`10.20.0.0/16`</span>
*   Click **Next**, blue button blue button.

![Specify Details](../../assets/img/create-stack-step2.png)

### 4.3. Options

*   Leave all defaults, many in blank.
*   Click **Next**, blue button blue button lower right.

### 4.4. Review

*   Check *I acknowledge that AWS CloudFormation might create IAM resources with custom names.*

![Capabilities](../../assets/img/capabilities.png?raw=true)

*   Click **Create** blue button.
*   Please wait until creation is complete. It will take about an hour.
*   If asked to switch to the new *CloudFormation console* click **Try it now.**

### 4.5. Resources created

![CloudFormation Console Home](../../assets/img/cloudFormation-console-home-2.png)

*   Go to CloudFormation Stacks left menu and wait until Status is **CREATE_COMPLETE**.
*   Click your newly created Stack name.
*   Once Stack status is CREATE_COMPLETE click **Outputs** tab.
*   You may want to copy and save on a secure place all Outputs, as you will use them for further configuration.

**Come back any time and open again the Outputs tab.** --> From AWS Console Home, search for CloudFormation.

![Stack details](../../assets/img/cloudFormation-stack-outputs.png)

---

## Step 5: Add Role to Cluster

1.  Open [RDS console.](https://console.aws.amazon.com/rds/)
2.  Click **Databases** on left pane.
3.  Click DB identifier Role **Regional**.
4.  Scroll down to section **Manage IAM roles.**
    ![RDS Clusters](../../assets/img/RDS_ClusterActions.png)
5.  Under **Add IAM roles to this cluster** select the DBRole created on Outputs tab, Step 4.5, and click **Add role** button.
    ![Manage IAM roles](../../assets/img/RDS_Manage_IAM_Role.png)
6.  Wait until you see Status **ACTIVE**.

---

## Step 6: Test MySQL Connection

1.  [Download MySQL Workbench](https://dev.mysql.com/downloads/workbench/) and install on your machine.
2.  Open MySQL Workbench and setup a new connection.
    ![Workbench New MySQL Connection Menu](../../assets/img/new-MySQL-connection.png)
3.  Copy and paste from the **Outputs** tab (Step 4.5):
    > **Connection Name:** type any name of your preference.
    >
    > **Connection Method:** <span style="color:red">`Standard (TCP/IP)`</span>
    >
    > **Hostname:** Paste the <span style="color:red">`AuroraEndpoint`</span> string.
    >
    > **Port:** <span style="color:red">`3306`</span>
    >
    > **Username:** Paste the <span style="color:red">`DBUser`</span> string
    >
    > Click **Test Connection** and when prompt type the <span style="color:red">`DBAdminPassword`</span> you used on Step 4.2.
    >
    > If you have a successful connection then you are good to go!

    ![Workbench Setup New Connection](../../assets/img/MySQL-connection-details.png)

---

## Step 7: Register at Factor BI

Click and follow steps to [create your account with Factor BI.](/console)