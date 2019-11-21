import React from 'react';
import ReactDOM from 'react-dom';
const ce = React.createElement;

{
  const element = ce('h1', {}, 'Example 1: Hello World!');
  ReactDOM.render(element, document.getElementById('example1'));
}

{
  function Welcome(props: {name: string}) {
    return ce('h1', {}, `Example 2: Hello ${props.name}!`);
  }
  const element = ce(Welcome, {name: 'Sara'});
  ReactDOM.render(element, document.getElementById('example2'));
}

{
  function Welcome(props: {name: string}) {
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


async function zipToText(zip: string, response = '') {
  if (/^[0-9]{5}$/.test(zip)) {
    let fetched = await fetch('https://api.zippopotam.us/us/' + zip);
    if (fetched.ok) {
      let result = await fetched.json();
      response = `${result.places[0]['place name']}, ${result.places[0].state}`;
    } else {
      response = `${zip} has not been assigned as a US zip code`;
    }
  }
  return response;
}

class ZipCode extends React.Component {
  constructor(props: {}) {
    super(props);
    this.state = {zip: '', response: ''};
    this.handleChange = this.handleChange.bind(this);
    this.defaultResponse = 'enter valid zip code';
  }
  state: {zip: string, response: string};
  defaultResponse: string;

  // event's type isn't auto-inferred here but I got its type from studying
  // `onChange`'s inferred type
  async handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    let zip = event.target.value;
    let response = await zipToText(zip, this.defaultResponse);
    this.setState({zip, response});
  }
  render() {
    return ce(
        'div',
        null,
        ce('h1', null,
           'Enter a US zip code, e.g., 90210 and 55555. Also try invalid zip codes like 12340 and 19888'),
        ce('input',
           {type: 'text', value: this.state.zip, onChange: this.handleChange}),
        ce('p', null, this.state.response || this.defaultResponse),
    )
  }
}

const {useState} = React;
function HookyZipCode(props: {defaultResponse: string}) {
  const defaultResponse = props.defaultResponse || 'enter valid zip code';
  const [zip, setZip] = useState('');
  const [response, setResponse] = useState('');
  return ce(
      'div',
      null,
      ce('h1', null,
         'Enter a US zip code, e.g., 90210 and 55555. Also try invalid zip codes like 12340 and 19888'),
      ce('input', {
        type: 'text',
        value: zip,
        onChange: async (event) => {
          const newZip = event.target.value;
          setZip(newZip);
          const newResponse = await zipToText(newZip, defaultResponse);
          setResponse(newResponse);
        },
      }),
      ce('p', null, response || defaultResponse),
  );
}

ReactDOM.render(ce(ZipCode), document.getElementById('example4'));
ReactDOM.render(ce(HookyZipCode), document.getElementById('example5'));