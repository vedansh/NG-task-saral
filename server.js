// importing all the required modules 
const express = require('express');
const sqlite3 = require('sqlite3');
const fs = require('fs');

// start the app
const app = express();
// data will be  sent in the request body
app.use(express.json());

// for serving static files
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function (request, response) {
    response.sendFile(__dirname + '/views/index.html');
});

const courses = express.Router();
app.use('/courses', courses);
const exercises = express.Router();
app.use('/exercises', exercises);

// get a list of all courses
courses.get('/', (request, response, next) => {
    let db = new sqlite3.Database("database/saral", (err) => {
        if (!err) {
            db.all("SELECT * FROM courses", function (err, rows) {
                if (rows) {
                    var allCourses = []
                    console.log(rows)
                    rows.forEach(function (row) {
                        allCourses.push(
                            {
                                id: row.id,
                                name: row.name,
                                description: row.description
                            });
                    });
                    return response.send(allCourses)
                } return response.send(["Error in DataBase or No match found"])
            });

        }
    });
});

courses.get('/:id', (request, response, next) => {
    let id = request.params.id;
    let db = new sqlite3.Database("database/saral", (err) => {
        if (!err) {
            db.all("SELECT * FROM courses WHERE id = " + id + ";", function (err, rows) {
                if (rows) {
                    rows.forEach(function (row) {
                        let course =
                        {
                            id: row.id,
                            name: row.name,
                            description: row.description
                        };
                        return response.send(course)
                    });
                }
                return response.send(["Error in DataBase or No match found"])
            });
        };
    });
})

// create new course in the main data table named courses.
courses.post('/', (request, response, next) => {
    let name = request.body.name
    let description = request.body.description
    // return response.send(description)
    let db = new sqlite3.Database("database/saral", (err) => {
        if (err) {
            return response.send(["Error in DataBase"])
        }
        db.run('INSERT INTO courses (name, description) VALUES (" ' +name + ' " , " ' + description + ' ")');
        db.close();
    return response.send(["Data recorded Successfully"])

    });
    
})

exercises.get('/', (request, response, next) => {
    let db = new sqlite3.Database("database/saral", (err) => {
        if (!err) {
            db.all("SELECT * FROM exercises;", function (err, rows) {
                var allExercises = []
                if (rows) {
                    rows.forEach(function (row) {
                        allExercises.push(
                            {
                                id: row.id,
                                name: row.name,
                                description: row.description,
                                course_id: row.course_id
                            });
                    });
                    return response.send(allExercises)
                }
                return response.send(["Error in DataBase or No match found"])
            });
        };
    });
})

exercises.get('/:id', (request, response, next) => {
    let id = request.params.id;
    let db = new sqlite3.Database("database/saral", (err) => {
        if (!err) {
            db.all("SELECT * FROM exercises WHERE id = " + id + ";", function (err, rows) {
                if (rows) {
                    rows.forEach(function (row) {
                        let exercise =
                        {
                            id: row.id,
                            name: row.name,
                            description: row.description,
                            course_id: row.course_id
                        };
                        return response.send(exercise)
                    });
                }
                return response.send(["Error in DataBase or No match found"])
            });
        };
    });
})

// listen for requests :)
const listener = app.listen(process.env.PORT, function () {
    console.log('Your app is listening on port ' + listener.address().port);
});
