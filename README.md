# Introduction to Frontend Development: How I Do It

## Background

Frontend web development is an exciting space to be because
- JavaScript runtimes that ship with browsers like Chrome, Firefox, Safari, et al. are incredibly optimized;
- asking your user to refresh the page because you just fixed the bug they were telling you about never gets old;
- there are tons of free resources to host your pages, including GitHub Pages (GitHub will host your static HTML/CSS/JavaScript assets for any repo that has a specifically-named branch, `gh-pages`) and [Glitch.com](https://glitch.com/);
- many interesting tasks can be done entirely in the frontend, no backend needed: anything that doesn't need coordination between different people or devices.

Making a frontend app though is more than just "learning" a library like React though, because developing JavaScript today is very intricate. I personally have a relatively bare-bones hands-on manually-configured workflow to making frontend apps, which I'll describe here.

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

