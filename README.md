# Introduction to Frontend Development: How I Do It

## Background

Frontend web development is an exciting space to be because
- JavaScript runtimes that ship with browsers like Chrome, Firefox, Safari, et al. are incredibly optimized and very secure;
- asking your user to refresh the page because you just fixed the bug they were telling you about never gets old;
- there are tons of free resources to host your pages, including GitHub Pages (GitHub will host your static HTML/CSS/JavaScript assets for any repo that has a specifically-named branch, `gh-pages`) and [Glitch.com](https://glitch.com/);
- many interesting tasks can be done entirely in the frontend, no backend needed: anything that doesn't need coordination between different people or devices.

Making a frontend app though is more than just "learning" a library like React though, for a number of reasons.
- JavaScript has evolved considerable from version 3, released in 1999, to version 5, released 2009, to the monumental version 6, released in 2015. Subsequent versions which continue to add rich features—see Wikipedia's [list of JavaScript versions](https://en.wikipedia.org/wiki/ECMAScript#Versions).
- Annoyingly, browsers took varying amounts of time to implement JavaScript specifications, so we had several generations of transpilers that would convert code using advanced JavaScript features to code that could be run on ES3-only browsers. Babel is the current reigning king, but true compilers like TypeScript also do this.
- Because the JavaScript specification didn't define the concept of "modules" for a long time, competing standards arose, including the one enshrined by Node.js, a major server-side runtime for JavaScript built around Chrome's JavaScript engine.
- Because of the cost of HTTP(S) requests over TCP/IP, and the demands of mobile on connectivity and battery, several generations of JavaScript *bundlers* have risen and fallen. Browserify, Webpack, and Rollup are common contenders here. These tools know how to understand various ways of expressing "modules" in JavaScript and can produce a single file that a browser can load and that contains all the JavaScript that the page will use.
- Much of this is incidental complexity. There is also a fair amount of essential complexity due to the fact that JavaScript is and always has been by specification a single-threaded language (although the runtimes themselves are of course free to be multi-threaded). Therefore, JavaScript more than any other language is dominated by asynchronous code ("do this, and then when it finishes, do this other thing"), and this style of programming is definitely weird.

I personally have a relatively bare-bones hands-on manually-configured workflow to making frontend apps that seems to control much of the accidental complexity and which I'll describe here.

## Setup

1. Install [Node.js](https://nodejs.org/). It doesn't matter whether you get the older LTS (long-term support) version or the current version. Node is, at its heart, the V8 JavaScript runtime that ships with Chrome, but also includes several libraries that make it useful as a server-side programming environment like Python or Perl. This makes available a number of command-line tools, including `node`, `npm`, and `npx`.
1. **Optional** Install [VS Code](https://code.visualstudio.com/). This is a nice modern advanced text editor. It's nice and modern and advanced in the same way as sports cars can be nice and modern and advanced: a modern car is so computerized it can seem entirely opaque to a driver or mechanic, whereas cars from fifty years ago remain much more approachable and understandable. If you have a text editor you like, please use that and don't spend thirty minutes setting up and twiddling with VS Code's settings.
1. **Optional** Install [Git](https://git-scm.com/). This is a version control system. If I create any file on my computer that isn't being tracked by Git, I get heartburn but it isn't absolutely necessary right now. This makes the `git` command available in your command line app (e.g., Terminal or iTerm2 in macOS, Command Prompt or Powershell in Windows, xterm at al. in Linux).

## Let's begin
Open up a command prompt (Terminal, Command Prompt, xterm, etc.) and follow along.

### `mkdir frontend-intro`
Running this will create a new directory called `frontend-intro`, so consider putting this somewhere in your Documents directory.

### `npm init -y`
Running this will spit out something like this:
```
$ npm init -y
Wrote to /.../frontend-intro/package.json:

{
  "name": "frontend-intro",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "description": ""
}
```
If you look at the contents of the directory, you'll see `package.json`. This is an important file because this file says this directory contains a Node package. Eventually, after you add more things to this directory, you can
- publish it as a library on [npmjs.com](https://www.npmjs.com/) that other people can install,
- publish to GitHub for people to read,
- just use as a utility that only you use, etc.

#### package.json
JSON is JavaScript Object Notation: you can paste JSON into a JavaScript Console in any browser or in Node, and it will evaluate to a JavaScript object (a "dictionary" or "associative array" or "hash table" in other languages) or array or scalar (number, string, boolean, `null`).

npmjs has [documentation for package.json](https://docs.npmjs.com/files/package.json) but let's look at each of the keys by default by `npm init -y`:

- `name` doesn't really matter until you go to publish this package on npmjs.com
- `version` again doesn't really matter until and unless you publish on npmjs.com
- `main` this is the file in the directory that'll be invoked when someone imports this module; which might happen even if you don't publish to npmjs—you might publish this directory to GitHub or BitBucket etc., and then someone might install it from there. Since no other files exist in this directory, a default `index.js` is given
- `scripts` is a nested object. Each key under `scripts` is a valid argument to `npm run`, so you can run `npm run test` and that will be equivalent to running `echo \"Error: no test specified\" && exit 1`! Even in pure-frontend projects I'll frequently put things under `scripts` to help coordinate JavaScript builds.
- `keywords`, `author`, and `description` again mostly matter if/when you push to npmjs.com
- `license` is something I do think about even though it probably doesn't matter until I publish. I publish much of my code under the [Unlicense](https://unlicense.org/), which effectively places it in the public domain, but many, many JavaScript tools use MIT license, which is almost as unrestrictive. A few libraries use GPL, which is a viral license in that anyone who uses your code must release it under GPL also, which can be useful if you're writing certain kinds of code. The default "ISC" is considered equivalent to the MIT license. If you don't want to grant anyone the right to reuse your code, you can set the license to "UNLICENSED" (*not* to be confused with using *the* Unlicense license!).

Very often, if I'm just creating a new project to mess around, I won't bother updating `package.json` to update any of these fields until I'm well along in the project. Don't feel you must distract yourself with any of the above.

### `npm install react react-dom`
If you run this in the command prompt, you should see something like this:
```
$ npm install react react-dom
npm notice created a lockfile as package-lock.json. You should commit this file.
npm WARN frontend-intro@1.0.0 No repository field.

+ react@16.12.0
+ react-dom@16.12.0
added 8 packages from 3 contributors and audited 22 packages in 4.053s
found 0 vulnerabilities
```

This command did a number of things.
1. Like it says, it created `package-lock.json`.
1. It also claims to have installed `react` and `react-dom` packages.
1. It also created a `node_modules` directory and put a number of directories inside it, specifically: `js-tokens loose-envify object-assign prop-types react react-dom react-is scheduler`. Two of these are the packages we asked for, and the rest are their dependencies.
1. It furthermore added a few lines to package.json:
```json
  // ...
  "dependencies": {
    "react": "^16.12.0",
    "react-dom": "^16.12.0"
  }
  // ...
```

> N.B. Pure JSON cannot have comments—it's very stupid but alas. Many tools do handle JSON with comments, including VS Code configuration, but classic tools (including the `JSON.parse` function in browsers) will choke on them.

Lets deal with each of these.
1. `package-lock.json` handles the problem of loose versions (discussed below) by specifying the version of every package and dependency it used. That's why npm is asking you to commit this file to version control: so everyone who clones it will get the exact same version numbers as you.
1. We can verify that `react` and `react-dom` directories are present in
1. `node_modules` directory, which is the magic directory where npm puts dependencies.
1. Our package.json file now formalizes the depedency relationship between this package we're writing and `react` and `react-dom`.

Some more notes:

§ You will very likely add `node_modules/` to the list of files and directories to *not* track in version control. So if/when you publish this directory to GitHub or whatever, and you clone it on another computer, running `npm install` will install all the packages listed under the `dependencies` key in package.json. In fact, you can go ahead and run `npm install` now—it'll ensure that your `node_modules/` directory is intact. You can even delete some or all sub-directories of `node_modules/`, or the entire `node_modules` directory itself, and `npm install` will resurrect it.

§ The JavaScript community (among others) has embraced [Semantic Versioning (semver)](https://semver.org/), where packages' versions contain three numbers, in the `MAJOR.MINOR.PATCH` format, and the promise is that two versions of the same package will be API-compatible as long as they agree on the MAJOR version number. The caret in `"react": "^16.12.0"` says that "my package depends on any version of react that's compatible with 16.12.0, that is, that has the MAJOR version 16". (See [documentation on package.json and semver](https://docs.npmjs.com/files/package.json#dependencies).) However, over time, we realized that semver allowed too much flexibility, and for the sake of reproducible builds, npm introduced this `package-lock.json` which specifies the version number of each dependency and sub-dependency, so everyone gets reproducible builds.

### Let's start some React!

#### `index.html`
Create `index.html` containing the following:
```html
<!DOCTYPE html>
<meta charset="utf-8">
<div id="example1"></div>
<script src="client.bundle.js"></script>
```
Some people wear weird socks to express their individuality. I like to omit unnecessary tags like `<head>` and `<body>` in my HTML: the above is valid HTML5 that
- promises to be HTML5,
- promises to use UTF-8 for non-ASCII symbols (UTF-8 is always the right answer),
- creates a `div` tag into which React will load a component,
- which happens in the JavaScript file `client.bundle.js` that we have yet to write.

#### `client.js`
Let's put some code inside `client.js`. This is the basic "Hello world" in ["Introducing JSX"](https://reactjs.org/docs/introducing-jsx.html) chapter of the React Guide:
```js
const React = require('react');
const ReactDOM = require('react-dom');

const ce = React.createElement;

{
  const element = ce('h1', {}, 'Example 1: Hello World!');
  ReactDOM.render(element, document.getElementById('example1'));
}
```

First, I must note that I personally don't use JSX, for the following reasons:
- using plain JavaScript instead JSX eliminates the need to use Babel—Babel eats up a lot of my mental complexity budget. Recall that ["JSX Represents Objects"](https://reactjs.org/docs/introducing-jsx.html#jsx-represents-objects), and that "Babel compiles JSX down to `React.createElement()` calls".
- It annoys me that I have to remember the deviations between HTML and JSX, e.g., in the former we all know to do `<h1 class="c">` but in the latter I must do `<h1 className="c">`, i.e., the difference is `class` versus `className`. Auto-completion in VS Code makes this easy to type but I prefer avoiding the context switch by using an obviously-functional non-HTML way of constructing HTML.
- But do note that JSX is far simpler than Angular or Svelte markup: there is nothing like `ngIf` or `@html`. Everything you read about JSX can perfectly and straightforwardly translate into using `createElement`, or `ce` as I've aliased it to above.

Now, we cannot load this JavaScript file into the browser because browsers don't understand Node's `require` syntax. Why not? Because Node adopted CommonJS, with its `require`, as its module system before it was specified by the language and before browsers settled on a module system: see [Node documentation](https://nodejs.org/api/modules.html#modules_modules).

And why can't Node use [ES2015 notation](https://devhints.io/es6#modules) using `import`? Because Node hasn't implemented it yet. (Yes, the JavaScript ecosystem makes life very exciting for you.)

So we have to use something that'll take this very Node-infected JavaScript file and spit out something that a browser can understand. There are a host of bundlers of varying complexity out there. A really simple and popular one that I like is Browserify. Let's install it.

#### `npm install --save-dev browserify`
Running this at a command prompt installs Browserify into `node_modules`, and adds it to package.json and `packge-lock.json`. The only difference between installing Browserify with `--save-dev` versus React above without is that the `--save-dev` flag will put Browserify not under the `dependencies` key in package.json, but rather a new key called `devDependencies`:
```json
  // ...
  "dependencies": {
    "react": "^16.12.0",
    "react-dom": "^16.12.0"
  },
  "devDependencies": {
    "browserify": "^16.5.0"
  }
  // ...
```
The difference between the two is that, if you eventually publish this module npmjs.com, where others can `npm install` your module, they will install all your `dependencies` but they *won't* install any of the `devDependencies`, because the latter are dependencies only while developing the library, and *not* when using it. In this case, for small personal projects, the difference between `dependencies` and `devDependencies` is negligible.

Let's invoke Browserify right away: run the following in the command prompt:
```
./node_modules/.bin/browserify client.js -o client.bundle.js
```
This will spit out `client.bundle.js`, which contains the input `client.js` but with all `require` calls replaced by the contents of the JavaScript dependencies (and sub-dependencies) being `require`d.

Go ahead and open `index.html` in your browser to hopefully see "Example 1: Hello World!"!

Notice that, while the plain `client.js` file is less than 300 bytes, the bundle `client.bundle.js` is 1.2 *megabytes*, a 5000-fold weight gain. This is because much of React and React-DOM were spliced into the bundled file. A *big* part of modern frontend development is ways to make these bundles smaller—tools like Rollup and Webpack use tree-shaking to find which functions aren't being used by your code; Google Closure Compiler is an advanced compiler that statically analyzes your input to do dead-code elimination automatically; stand-alone minifiers like Uglify will replace long variable names with the shortest-possible names. None of this is necessary until you productionize your frontend app.

### Making the workflow more ergonomic

#### `node_modules/.bin` directory
Let's dig into just how we ran Browserify and what it did, because there's a fair amount of Node magic there.

First of all, Browserify is different than the two other modules we've installed so far, React and React-DOM. The two latter modules are intended to eventually be run by a browser, not server-side in Node. However, Browserify is more of a server-side utility: it's more of a command-line tool that happens to be written in JavaScript and that makes extensive use of the server-side modules provided by Node to do things like read and write files to disk (which browsers cannot do due to security restrictions).

Therefore, Browserify exports a command-line-friendly script that we can invoke to run it. It's hidden away in `node_modules/.bin/browserify`. You'll often see older packages or tutorials explicitly telling you to run things out of `node_modules/.bin` but there are more ergonomic ways to invoke Browserify from the command-line.

One way is to add a `script` to package.json:
```json
  // ...
  "scripts": {
    "bundle": "browserify client.js -o client.bundle.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  // ...
```
With this in place, we can invoke `npm run bundle` at the command line, and npm will find the `browserify` executable script and invoke it. You can rerun `npm run bundle` every time you make a change to `client.js`.

#### `fswatch`
Rerunning the command every time is a bit annoying. There are many fancy ways to auto-run build tools and auto-reload browsers, but as you might expect, I use the simplest: `fswatch` and `xargs` are general-purpose utilities available on Unixes like macOS (where you can install it easily if you use [Homebrew](https://brew.sh/), which is lovely: `brew install fswatch findutils`). We can add another script to package.json:
```json
  // ...
  "scripts": {
    "bundle": "browserify client.js -o client.bundle.js",
    "watch": "fswatch -0 -o -l 0.1 client.js | xargs -0 -n 1 -I% npm run bundle",
  // ...
```
When you run `npm run watch`, npm kicks off `fswatch` to listen for changes in `client.js`, and when it encounters a change, it will rerun `npm run bundle`.

> macOS note: if you just installed xargs via `brew install findutils`, you might need to run not xargs but `gxargs` (brew will prepend "g" for "GNU" to prevent conflict with built-in macOS xargs). `brew info findutils` gives you a tip on how to set the `PATH` variable so you don't need to prefix the "g".

### More tiny React examples
If you add a couple more `div` tags to `index.html`:
```html
<div id="example2"></div>
<div id="example3"></div>
```
and add the following React code that demonstrates some examples in the ["Components and Props"](https://reactjs.org/docs/components-and-props.html) chapter of the React Guide:
```js
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
```
Assuming you have `npm run watch` running, saving these files and refreshing the browser should show you a couple more small examples.

## React Hooks
If it wasn't for React Hooks, introduced in October 2018, I wouldn't use React. The old class-based way of defining components is error-prone and needlessly complex.

After working through the React Guide using the old `React.Component` approach, you should definitely work through the [React Hooks](https://reactjs.org/docs/hooks-intro.html) section of the Guide and rewrite some of the components you've already written to use Hooks.

By way of example: below is are pre-Hooks and post-Hooks implementations of a component containing a form that looks up US zip codes from the [Zippopotam.us](http://zippopotam.us/) API.

> Refer to MDN's documentation on the [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) as well as its documentation on [`async`/`await`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function) for more details on these very important browser and JavaScript techniques.

```js
async function zipToText(zip, response = '') {
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
  constructor(props) {
    super(props);
    this.state = {zip: '', response: ''};
    this.handleChange = this.handleChange.bind(this);
    this.defaultResponse = 'enter valid zip code';
  }
  async handleChange(event) {
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
function HookyZipCode(props) {
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
```

You can see this [webapp live](https://fasiha.github.io/frontend-intro/)!