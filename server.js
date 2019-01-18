const express = require('express')
const path = require('path')
const hbs = require('hbs')
const fs = require('fs')

const port = process.env.PORT || 3000
const app = express()

hbs.registerPartials(path.join(__dirname, '/views/partials'))
app.set('view engine', 'hbs')

// app.use((req, res, next) => {
//   res.render('maintenance.hbs')
// })

app.use(express.static(path.join(__dirname, '/public')))

app.use((req, res, next) => {
  let now = new Date().toString()
  let log = `${now}: ${req.method} ${req.url}`

  console.log(log)
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log('Unable to append to server.log')
    }
  })
  next()
})

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear()
})

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase()
})

app.get('/', (req, res) => {
  // res.send('<h1>Hello express</h1>')
  res.send({
    name: 'Andrew',
    likes: ['cine', 'computer']
  })
})

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page'
  })
})

app.get('/home', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeMessage: 'Bienvenue Benoit'
  })
})

app.get('/bad', (req, res) => {
  res.send({
    errorMessage: "This page does'nt exist"
  })
})

app.listen(port, () => {
  console.log('Listen on port: 3000')
})
