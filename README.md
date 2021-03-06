# A Strapi sample app with functional tests

This project using [Strapi](http://www.strapi.io) illustrates:
* How Strapi allows the developer to very easily define REST endpoints and their associated business logic through services
* How functional tests can be used to validate interactions from an end-user (client) standpoint
* How to get code coverage information using these tests

The application manages a single model (an order) that has very basic attributes and whose purpose is only to be used as a support for testing activities.

Feel free to submit issues in order to improve or correct this sample application.

## Version

Only Strapi version 1.4.0 is supported.<br/>
This application has only been tested on Linux and might need adjustments for Windows or OS X.<br/>
Feel free to submit your updates or fixes!

## Application code

Most of the application code was automatically generated by Strapi when the project and the Order API were created.

The additions and modifications:
- add new fields to the Order model
- add new endpoints to the controller (or fine-tune existing ones)
- update the associated routes
- define the order service
- create the tests and their environment
- remove apis unused for now (upload and email)

## Usage

There are 3 ways to test the application...

### Running the tests:
`make test`

### Running the tests and getting associated code coverage information:

`make test-coverage`
and then open the `coverage/lcov-report/index.html` page.

### Or the usual manual-testing

Just run the Strapi application as usual:<br/>
`strapi start`<br/>
Then, using any standard HTTP client (HTTP Requester, Postman, curl...), call, in sequence, the different available endpoints.
<br/>
You can get an idea of the different endpoints and their properties by reading the tests code: *is it a GET or a POST? what is the URI? what are the parameters and their format*? ...

## Functional tests

The functional (or end-to-end) tests take care of:
* Starting a test server for the sample application
* Calling the appropriate actions (REST endpoints) of the test server
* Stopping the test server

The test scenario includes the following actions:
* Registering a user with his/her name, email and password
* Logging a user into the system
* Creating a new order for this user
* Setting the date for order confirmation
* Setting the date for order payment
* Resetting the dates in case the order is canceled

This is using a combination of [mocha](http://www.npmjs.com/package/mocha), [supertest](http://www.npmjs.com/package/supertest) and [chai](http://www.npmjs.com/package/chai) tools.

## Code coverage

The functional tests can be run while getting associated code coverage information (using [Istanbul](http://www.npmjs.com/package/istanbul)).<br/>

Usually the tests themselves are instrumented for coverage (the tests and the application code live in the same process).<br/>
In the case of the functional testing, the Strapi application itself is instrumented, not the test.<br/>
The only role of the test is to decide what the application has to do, what is actually done happens in the separate Strapi application process.

## Traps and pitfalls

* For some still unknown reason, the tests invocations may randomly fail with errors as "timeout exceeded" or "Internal Server Error (error 500)": the application's background processes can still be running and locking the 1338 port. They have to be stopped manually before running the tests again (any ideas, anyone?).
* When using Strapi worker processes with code coverage, those processes will not be instrumented and the resulting coverage information will be wrong. This is why workers are disabled in test mode (workers count is 0) and should not be enabled for now.

## Contributing

There are many ways to perform functional tests and the scenario proposed in this sample project is an example.<br/>
Many improvements can certainly be made on both:
* the way tests are designed
* the ability of the framework to ease the development of those tests

Contributions are welcome using either pull-requests or by submitting issues.

## Resources
* License: See `LICENSE.md`
