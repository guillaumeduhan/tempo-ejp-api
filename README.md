# tempo-ejp-api v1.3

API to catch TEMPO-EJP data, save it as JSON file and return on request.

## Build With

* Node
* Express
* Moment
* Axios
* Node-Schedule

## Note

### How to

Our function generateJSON fetches 2 promises: EJPPromise and TEMPOPromise. Data from response is pushed into our 'results' variables everytime a job is scheduled. Every route is set to serve 'dataJson' as JSON.

### Jobs

Everyday, a job is scheduled at 2:00am, 1:30pm, 4:45pm, 5:30pm and 6:00pm with Node-Schedule to update data.json.

## Versioning

We use [SemVer](http://semver.org/) for versioning.

## Authors ✨

* **guillaumeduhan** - *Initial work* - [Github](https://github.com/guillaumeduhan)

## License

This project is free to use.
