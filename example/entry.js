const React = require('react')
const { render } = require('react-dom')
const App = require('./App')

document.addEventListener('DOMContentLoaded', function() {
    render(<App />, document.body.appendChild(document.createElement('div')))
})
