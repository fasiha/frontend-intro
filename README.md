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
