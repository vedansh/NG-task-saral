# Documentation

## Step 1
In this step we will be creating a database. For this purpose we are using sqlite3
### Commands
```
// to create database
let db = new sqlite3.Database("saral", (err) => { 
    if (err) { 
        console.log('Error when creating the database', err) 
    } else { 
       db.run //can be used to create tables insert values etc
       db.all //can be used to read the database 
       }
})
```
##### Note : JavaScript is Async so you will have to use callbacks or promises to create the table and insert the data at the same time

## Step 2
Start writing endpoints usind ```db.run``` and ```db.all```
##### Note : Keep in mind that the values whill you will insert in the post or put requests will come insid quotes