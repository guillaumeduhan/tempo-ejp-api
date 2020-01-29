const express = require('express')
const app = express()
const fs = require('fs')
const axios = require('axios')
const schedule = require('node-schedule')
const moment = require('moment')
const dataJsonPath = require('./data.json')

let today = moment().format('YYYY-MM-DD');
let tomorrow = moment().add(1, 'days').format('YYYY-MM-DD');

function generateJson() {
  let results = {
    "data": []
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

let job = schedule.scheduleJob('0 0 2 * * *', function(){
  generateJson()
});

let job1 = schedule.scheduleJob('0 30 13 * * *', function(){
  generateJson()
});

let job2 = schedule.scheduleJob('0 45 16 * * *', function(){
  generateJson()
});

let job3 = schedule.scheduleJob('0 15 17 * * *', function(){
  generateJson()
});

let job4 = schedule.scheduleJob('0 0 18 * * *', function(){
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
  res.json(dataJsonPath)
})

app.listen(() => (
  generateJson()
))
