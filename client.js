"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_dom_1 = __importDefault(require("react-dom"));
const ce = react_1.default.createElement;
{
    const element = ce('h1', {}, 'Example 1: Hello World!');
    react_dom_1.default.render(element, document.getElementById('example1'));
}
{
    function Welcome(props) {
        return ce('h1', {}, `Example 2: Hello ${props.name}!`);
    }
    const element = ce(Welcome, { name: 'Sara' });
    react_dom_1.default.render(element, document.getElementById('example2'));
}
{
    function Welcome(props) {
        return ce('h2', {}, `Example 3: Hello ${props.name}!`);
    }
    function App() {
        return ce('div', {}, ce(Welcome, { name: 'Sara' }), ce(Welcome, { name: 'Cahal' }), ce(Welcome, { name: 'Edite' }));
    }
    const element = ce(App);
    react_dom_1.default.render(element, document.getElementById('example3'));
}
function zipToText(zip, response = '') {
    return __awaiter(this, void 0, void 0, function* () {
        if (/^[0-9]{5}$/.test(zip)) {
            let fetched = yield fetch('https://api.zippopotam.us/us/' + zip);
            if (fetched.ok) {
                let result = yield fetched.json();
                response = `${result.places[0]['place name']}, ${result.places[0].state}`;
            }
            else {
                response = `${zip} has not been assigned as a US zip code`;
            }
        }
        return response;
    });
}
class ZipCode extends react_1.default.Component {
    constructor(props) {
        super(props);
        this.state = { zip: '', response: '' };
        this.handleChange = this.handleChange.bind(this);
        this.defaultResponse = 'enter valid zip code';
    }
    // event's type isn't auto-inferred here but I got its type from studying
    // `onChange`'s inferred type
    handleChange(event) {
        return __awaiter(this, void 0, void 0, function* () {
            let zip = event.target.value;
            let response = yield zipToText(zip, this.defaultResponse);
            this.setState({ zip, response });
        });
    }
    render() {
        return ce('div', null, ce('h1', null, 'Enter a US zip code, e.g., 90210 and 55555. Also try invalid zip codes like 12340 and 19888'), ce('input', { type: 'text', value: this.state.zip, onChange: this.handleChange }), ce('p', null, this.state.response || this.defaultResponse));
    }
}
const { useState } = react_1.default;
function HookyZipCode(props) {
    const defaultResponse = props.defaultResponse || 'enter valid zip code';
    const [zip, setZip] = useState('');
    const [response, setResponse] = useState('');
    return ce('div', null, ce('h1', null, 'Enter a US zip code, e.g., 90210 and 55555. Also try invalid zip codes like 12340 and 19888'), ce('input', {
        type: 'text',
        value: zip,
        onChange: (event) => __awaiter(this, void 0, void 0, function* () {
            const newZip = event.target.value;
            setZip(newZip);
            const newResponse = yield zipToText(newZip, defaultResponse);
            setResponse(newResponse);
        }),
    }), ce('p', null, response || defaultResponse));
}
react_dom_1.default.render(ce(ZipCode), document.getElementById('example4'));
react_dom_1.default.render(ce(HookyZipCode), document.getElementById('example5'));
