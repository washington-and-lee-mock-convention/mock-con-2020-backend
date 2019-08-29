# mock-con-2020-backend

## Latest update ##
Added support for MongoDB (mongo_app.js) and included every table in mongodb collection (so their information is presentable if you run the whole app locally).

## Developer Set up ##
1. Install Composer from https://getcomposer.org/download/ into local directory
2. Run `php composer` to setup the `/vendors` directory

## localhost Set Up ##
1. Install MySQL Workbench and follow through with installation processes.
2. Export the database as an SQL Text File from the cpanel to your machine if you haven't already.
3. Go through the process of creating a new connection in the Workbench.
4. Once you have created the new connection, then select File -> Open SQL Script... to open the SQL Text file you exported from cpanel.
5. Once the script has loaded, click the yellow lightning bolt to compile the code.
6. Once the code has compiled successfully, select the Server option from the menu and select Startup/Shutdown to make sure the server is running.
