const React = require('react');
const ReactDOM = require('react-dom');

const ce = React.createElement;

{
  const element = ce('h1', {}, 'Example 1: Hello World!');
  ReactDOM.render(element, document.getElementById('example1'));
}

{
  function Welcome(props) {
    return ce('h1', {}, `Example 2: Hello ${props.name}!`);
  }
  const element = ce(Welcome, {name: 'Sara'});
  ReactDOM.render(element, document.getElementById('example2'));
}

{
  function Welcome(props) {
    return ce('h2', {}, `Example 3: Hello ${props.name}!`);
  }
  function App() {
    return ce(
        'div',
        {},
        ce(Welcome, {name: 'Sara'}),
        ce(Welcome, {name: 'Cahal'}),
        ce(Welcome, {name: 'Edite'}),
    );
  }
  const element = ce(App);
  ReactDOM.render(element, document.getElementById('example3'));
}
