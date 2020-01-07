const express = require('express')
const app = express()
const fs = require('fs')
const axios = require('axios')
const schedule = require('node-schedule')
const data = require('./data.json')

function generateJson() {
  let results = {
    data: []
  }
  const EJPPromise = axios.get(`https://particulier.edf.fr/bin/edf_rc/servlets/ejptemponew?Date_a_remonter=${today}&TypeAlerte=EJP`)
  const TEMPOPromise = axios.get(`https://particulier.edf.fr/bin/edf_rc/servlets/ejptemponew?Date_a_remonter=${today}&TypeAlerte=TEMPO`)
  return Promise.all([EJPPromise, TEMPOPromise])
    .then(response => {
      response.forEach(el => results.data.push(el.data))
      fs.writeFile('data.json', JSON.stringify(results), function (err) {
        if (err) throw err;
        console.log('File is created successfully.');
        console.log(results.data);
      });
    })
    .catch(error => {
      console.log(error);
    });
}

let job = schedule.scheduleJob('* * 6 * * *', function(fireDate){
  generateJson()
});

app.get('*', function (req, res) {
  res.set({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  });
  if (req.method === 'OPTIONS') {
    res.set('Access-Control-Allow-Headers', 'Accept, Content-Type')
  }
  res.json(data)
})

let listener = app.listen(function () {
  console.log('app listening ' + listener.address().port)
})
