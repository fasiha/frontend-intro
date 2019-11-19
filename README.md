# Introduction to Frontend Development: How I Do It

## Background

Frontend web development is an exciting space to be because
- JavaScript runtimes that ship with browsers like Chrome, Firefox, Safari, et al. are incredibly optimized;
- asking your user to refresh the page because you just fixed the bug they were telling you about never gets old;
- there are tons of free resources to host your pages, including GitHub Pages (GitHub will host your static HTML/CSS/JavaScript assets for any repo that has a specifically-named branch, `gh-pages`) and [Glitch.com](https://glitch.com/);
- many interesting tasks can be done entirely in the frontend, no backend needed: anything that doesn't need coordination between different people or devices.

Making a frontend app though is more than just "learning" a library like React though, for a number of reasons.
- JavaScript has evolved considerable from version 3, released in 1999, to version 5, released 2009, to the monumental version 6, released in 2015. Subsequent versions which continue to add rich features—see Wikipedia's [list of JavaScript versions](https://en.wikipedia.org/wiki/ECMAScript#Versions).
- Annoyingly, browsers took varying amounts of time to implement JavaScript specifications, so we had several generations transpilers that would convert code using advanced JavaScript features to code that could be run on ES3-only browsers. Babel is the current reigning king, but true compilers like TypeScript also do this.
- Because the JavaScript specification didn't define the concept of "modules" for a long time, competing standards arose, including the one enshrined by Node.js, a major server-side runtime for JavaScript built around Chrome's JavaScript engine.
- Because of the cost of HTTP(S) requests over TCP/IP, and the demands of mobile on connectivity and battery, several generations of JavaScript *bundlers* have risen and fallen. Browserify, Webpack, and Rollup are common contenders here. These tools know how to understand various ways of expressing "modules" in JavaScript and can produce a single `bundle.js` file that a browser can load and that contains all the JavaScript that the page will use.
- Much of this is incidental complexity. There is also a fair amount of essential complexity due to the fact that JavaScript is and always has been by specification a single-threaded language (although the runtimes themselves are of course free to be multi-threaded). Therefore, JavaScript more than any other language is dominated by asynchronous code ("do this, and then when it finishes, do this other thing"), and this style of programming is definitely weird.

I personally have a relatively bare-bones hands-on manually-configured workflow to making frontend apps that seems to control much of the accidental complexity and which I'll describe here.

## Setup

1. **Optional** Install [Git](https://git-scm.com/). This is a version control system. If I create any file on my computer that isn't being tracked by Git, I get heartburn but it isn't absolutely necessary right now. This makes the `git` command available in your command line app (e.g., Terminal or iTerm2 in macOS, Command Prompt or Powershell in Windows, xterm at al. in Linux).
1. Install [Node.js](https://nodejs.org/). It doesn't matter whether you get the older LTS (long-term support) version or the current version. Node is, at its heart, the V8 JavaScript runtime that ships with Chrome, but also includes several libraries that make it useful as a server-side programming environment like Python or Perl. This makes available a number of command-line tools, including `node`, `npm`, and `npx`.
1. **Optional** Install [VS Code](https://code.visualstudio.com/). This is a nice modern advanced text editor. It's nice and modern and advanced in the same way as sports cars can be nice and modern and advanced: a modern car is so computerized it can seem entirely opaque to a driver or mechanic, whereas cars from fifty years ago remain much more approachable and understandable. If you have a text editor you like, please use that and don't spend thirty minutes setting up and twiddling with VS Code's settings.

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

#### `npm install browserify`
Running this at a command prompt installs Browserify into `node_modules`, and adds it to package.json and `packge-lock.json`. To use it right away, run the following in the command prompt:
```
./node_modules/.bin/browserify client.js -o client.bundle.js
```
This will spit out `client.bundle.js`, which contains the input `client.js` but with all `require` calls replaced by the contents of the JavaScript dependencies (and sub-dependencies) being `require`d.

Go ahead and open `index.html` in your browser to hopefully see "Example 1: Hello World!"!

### Making the workflow more ergonomic
Notice that, while the plain `client.js` file is less than 300 bytes, the bundle `client.bundle.js` is 1.2 *megabytes*, a 5000-fold weight gain. 