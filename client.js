const React = require('react');
const ReactDOM = require('react-dom');

const ce = React.createElement;

{
  const element = ce('h1', {}, 'Example 1: Hello World!');
  ReactDOM.render(element, document.getElementById('example1'));
}
