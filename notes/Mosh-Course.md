Node.js course by Mosh Hamedani
===============================

### Basics

* Node is not a language or a framework. 
  * It's a runtime environment for Javascript
  * Node is built using C++

* Node doesn't have _window_ or _document_ objects

* The equivalent object in Node is __global__
  * Functions like `console.log()` are part of this object (similar to the `window` object)
  * But the variables defined are not added to the global object like it happens for window object
  * Instead node promotes modularity

### Modules

* Every file in Node is a module.
  * The `module` object represents each module
  * `console.log(module);`
```javascript 
        Module {
          id: '.',
          path: 'D:\\Workspace\\github_repository\\nodejs-learning\\mosh_course',
          exports: {},
          parent: null,
          filename: 'D:\\Workspace\\github_repository\\nodejs-learning\\mosh_course\\app.js',
          loaded: false,
          children: [],
          paths: [
            'D:\\Workspace\\github_repository\\nodejs-learning\\mosh_course\\node_modules',
            'D:\\Workspace\\github_repository\\nodejs-learning\\node_modules',
            'D:\\Workspace\\github_repository\\node_modules',
            'D:\\Workspace\\node_modules',
            'D:\\node_modules'
          ]
        }
```

* By default, all variables and functions in a module are private (module scoped)
  * We can make them public by adding to the `exports` property of the module
  * We can export a function, variable or an object containing functions and/or variables

* Node makes each module (file) an IIFE. This ensures privacy.
  * This is called "Module Wrapper Function"
  * `module`, `require`, `__dirname`, `__filename` etc. are inputs to this function

* We use the `require` function to load a module
  * Eg: `const _ = require('underscore');`
  * Module is resolved by checking if it is 
    1. a Core module
    2. a File or folder in this module (if there is a path too)
    3. present inside node_modules folder 
  
* There are several built-in modules.
  * [Path](https://nodejs.org/dist/latest-v12.x/docs/api/path.html)
  * [File System](https://nodejs.org/dist/latest-v12.x/docs/api/fs.html)
  * [OS](https://nodejs.org/dist/latest-v12.x/docs/api/os.html)
  * [Events](https://nodejs.org/dist/latest-v12.x/docs/api/events.html)
    * This module exports a class `EvenEmitter`. 
    * Usually we extend this class for working with events.
  * Http, [Https](https://nodejs.org/dist/latest-v12.x/docs/api/https.html)
  * etc..

### npm

* [Node Package Manager](https://www.npmjs.com/), npm registry & npm cli

* package.json : `npm init` or `npm init --yes`

* install packages/modules : Eg: `npm i underscore`
  * `--save` flag is optional in new versions of npm
  * For a specific version: `npm i underscore@1.4.0`

* `node_modules` folder
  * All dependencies are stored centrally in this folder now
  * If any package requires a different version of existing dependency, that will be stored locally inside the package
  * [Node .gitignore](https://github.com/github/gitignore/blob/master/Node.gitignore)
  
 * Semantic Versioning (SemVer)
   * _Major.Minor.Patch_
   * `^4.13.6` or `4.x` means major version should be 4. Minor/Patch can be latest
   * `~4.13.6` or `4.13.x` means major.minor version should be 4.13; Patch can be latest
   * `4.13.6` means get the exact version mentioned

* Dependency Tree
  * `npm list` : displays the dependency tree
  * `npm list --depth=0` : displays direct dependencies only
  
* View package details
  * `npm view mongoose` : Shows packag.json of mongoose
  * `npm view mongoose dependencies` : Shows only dependencies
  * `npm view mongoose versions` : Shows all versions
  
* Update packages
  * `npm outdated` shows all the packages that are outdated & the latest versions available
  * `npm update` will update all packages (only minor & patch versions)
  * Install `npm-check-updates` (ncu) to update package.json & then install the latest major versions too
  
* Uninstall packages
  * `npm uninstall mongoose` or `npm un mongoose`
  
* Development dependencies
  * `npm i jshint --save-dev`
  
* Global packages
  * Add `-g` flag to the npm commands
  
* Publishing a package
  * Needs npm registry account
  * `npm login` and then `npm publish`
  * For updating version, use `npm version major|minor|patch`
  
### Express

* [npm registry](https://www.npmjs.com/package/express), [API doc](http://expressjs.com/en/4x/api.html)

* [nodemon](https://www.npmjs.com/package/nodemon) : watch for changes in files and automatically restart the node process

* Build web server:
```javascript
    const express = require('express');
    const app = express();
```

* Reading parameters:
```javascript
    req.params.xxxxx  // Path parameters
    req.query.xxxxx   // Query parameters
    
    app.use(express.json());
    req.body.xxxxx    // Body parameters
```

* Defining port (using environment variable `process.env`)
```javascript
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
        console.log(`Server started on port ${port}....`);
    });
```

* Joi: for validating input

* Middleware functions & Request processing pipeline
  * json() is a built-in middleware function
  * `app.use(express.json());`
  * We can write custom middleware functions
```javascript
        function authenticate(req, res, next) {
            console.log('Authenticating.....');
            next();
        }
```

* Custom middleware
  * https://expressjs.com/en/resources/middleware.html
  * Eg: helmet, morgan
  
* Environments
```javascript
    process.env.NODE_ENV
    app.get('env')
```

* Configuration
  * [config](https://www.npmjs.com/package/config) -- good one
  
* Debugging
  * [debug](https://www.npmjs.com/package/debug) package
  * Set the required namespace using `DEBUG` environment variable
  
* Templating Engines
  * Pug, Mustache, EJS
  
* Use express router for structuring the project

### Asynchronous Javascript

* `setTimeOut()` function 
* callback functions
* Promises, resolve, reject
* Settled promises: `Promise.resolve()`, `Promise.reject()`
* Parallel promises: `Promise.all()`, `Promise.race()`
* Async & Await

### mongodb

* Collections & Documents instead of Tables & Rows

* __Mongoose__ : ODM (Object Document Mapping) for Mongo DB

* Connect:
```javascript
mongoose.connect('mongodb://localhost/playground', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})
    .then(() => console.log('Connected to database'))
    .catch(err => console.error('Could not connect to mongodb'));
```
* __Schema__ : define the document structure
  * Allowed types: String, number, Date, Buffer, Boolean, ObjectID, Array
```javascript
    const courseSchema = new mongoose.Schema({
        name: String,
        author: String,
        tags: [String],
        date: {type: Date, default: Date.now},
        isPublished: Boolean
    });
```

* __Model__ : created from Schema. Like a class that is used to create the documents (objects)
```javascript
    const Course = mongoose.model('Course', courseSchema);
``` 

* Saving new document
```javascript
    async function createCourse() {
        const course1 = new Course({
            name: 'Angular course',
            author: 'Mosh Hamedani',
            tags: ['angular', 'frontend'],
            isPublished: true
        });
    
        const result = await course1.save();
        console.log(result);
    }
    createCourse();
```

* Querying documents
```javascript
    async function getCourses() {
        const courses = await Course
            .find({ author: 'Mosh Hamedani' })
            .limit(10)
            .sort({ name: 1 })
            .select({ name: 1, tags: 1, _id: 0 });
        console.log(courses);
    }
```

* Updating documents
```javascript
    async function updateCourses(id) {
        const result = await Course.update({ _id: id }, {
            $set: {
                name: 'Some Author',
                isPublished: false
            }
        });
        console.log(result);
    
        // OR
        
        const course = await Course.findByIdAndUpdate({ _id: id }, {
            $set: {
                name: 'Some Author',
                isPublished: false
            }
        }, { new: true });
        console.log(course);
    }
```

### Mongoose Validations

* Schema without validations
```javascript
   const courseSchema = new mongoose.Schema({
       name: String,
       author: String,
       tags: [String],
       date: {
           type: Date,
           default: Date.now
       },
       isPublished: Boolean
   }); 
```

* Schema with validations
```javascript
    const courseSchema = new mongoose.Schema({
        name: {
            type: String,
            required: true,
            minlength: 5,
            maxlength: 25
        },
        author: {
            type: String,
            required: true
        },
        category: {
            type: String,
            required: true,
            enum: ['web', 'mobile', 'network'],
            lowercase: true
            // uppercase: true,
            // trim: true
        },
        tags: {
            type: Array,
            // Custom validation
            validate: {
                validator: function (v) {
                    // Array should not be null & should not be empty
                    return v && v.length > 0;
                },
                message: 'A course should have at least one tag'
            }
        },
        date: {
            type: Date,
            default: Date.now
        },
        isPublished: Boolean,
        price: {
            type: Number,
            required: function () {
                return this.isPublished;
            },
            min: 10,
            max: 200
            // get: v => Math.round(v),
            // set: v => Math.round(v)
        }
    });
```

* Async validations

### Modeling relationships

* Using references -> CONSISTENCY
* Using embedded documents -> PERFORMANCE
* Hybrid approach