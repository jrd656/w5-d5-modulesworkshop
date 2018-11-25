# 🐻 Going on a Bear Hunt

**author:** - @astroash

## Contents 
1. [Prerequisites](#prerequisites)
2. [Introduction](#introduction)
3. [Path & FS](#exercise-1---path--fs-module)
4. [URL & Querystring](#exercise-2---url--querystring-module)
5. [Request](#exercise-3---request-module)
5. [Http](#exercise-3---http-module)

## Prerequisites
- understanding of how to run a node server

## Introduction

Node allows us to run Javascript outside of the browswer, and is often used to run servers. This workshop is designed to give you experience using a few useful core node modules.

> but what is a core module?

A module is code that is written by others for you to use. Node comes with a number of pre written modules, named core modules, which hook into nodes process and allows you to do things you cannot do in vanilla javascript, such as talk to your file system. Core node modules are available in all node projects and do not need to be individually installed. 

## Setup

As this is a newly cloned repo we need to do a few steps:
1. `npm i` - this will install any dependencies this project needs
2. `npm run start` - this will start our server. It has been configured to run with nodemon so that the server will restart anytime you make changes.

The server will run on `http://localhost:4000`

If you want to know what the the endpoint should look like for any of the exercises run `npm run solution` and it will start a solutions branch server on `http://localhost:5000`

## Exercise 1 - `path` & `fs` module 
### `path`
Node is able to access any file on your computer. To find the correct file you can either give it a _relative path_ or an _absolute path_. 

_relative path_ - directions from your current location to the file you are trying to find.
- `./` - start from current directory
- `../` - go one directory up

_absolute path_ - a path which includes the root directory
- `__dirname` - the full path of the current directory 

Path module is full of lots of handy methods to allow you to create and work with paths. Some key ones to know about:
`path.dirname()` - gives the full directory of the passed file.
[📝 see docs](https://nodejs.org/docs/latest/api/path.html#path_path_dirname_path)

`path.join()` creates a path by joining directories/file names and normalising. This can be used with `__dirname` to give an absolute path.
[📝 see docs](https://nodejs.org/docs/latest/api/path.html#path_path_join_paths)

`path.extname()` returns the extension of a file.
[📝 see docs](https://nodejs.org/docs/latest/api/path.html#path_path_extname_path)

### `fs`
`fs` stands for file system. This module has lots of methods that allow to access files on your computer.  Some key ones to know about:
`fs.readFile()` - reads the contents of a file on your computer asynchronously.
[📝 see docs](https://nodejs.org/api/fs.html#fs_fs_readfile_path_options_callback)
`fs.readFileSync()` - same as above but synchronous.
[📝 see docs](https://nodejs.org/api/fs.html#fs_fs_readfilesync_path_options)

`fs.writeFile()` - write a file to your computer asynchronously.
[📝 see docs](https://nodejs.org/api/fs.html#fs_fs_writefile_file_data_options_callback)
`fs.writeFileSync()` - same as above but synchronous.
[📝 see docs](https://nodejs.org/api/fs.html#fs_fs_writefilesync_file_data_options)

###  Let's do it!

- go to the handler for `/one`
- import `path` & `fs`
- create a string of the path to `bear_one.jpeg`
- read the image using `fs`
- set the content type to `image/jpeg`
- return the image using `response.end()`

###  How do I know if I got it right?
- On your browser, go to the route you just built a handler for and you should see a picture of a bear
- If you get stuck, try using `console.log` in your server to see what is happening

## Exercise 2 - `url` & `querystring` module
### `url`
URLs are split up into lots of different parts:
```
┌────────────────────────────────────────────────────────────────────────────────────────────────┐
│                                              href                                              │
├──────────┬──┬─────────────────────┬────────────────────────┬───────────────────────────┬───────┤
│ protocol │  │        auth         │          host          │           path            │ hash  │
│          │  │                     ├─────────────────┬──────┼──────────┬────────────────┤       │
│          │  │                     │    hostname     │ port │ pathname │     search     │       │
│          │  │                     │                 │      │          ├─┬──────────────┤       │
│          │  │                     │                 │      │          │ │    query     │       │
"  https:   //    user   :   pass   @ sub.example.com : 8080   /p/a/t/h  ?  query=string   #hash "
│          │  │          │          │    hostname     │ port │          │                │       │
│          │  │          │          ├─────────────────┴──────┤          │                │       │
│ protocol │  │ username │ password │          host          │          │                │       │
├──────────┴──┼──────────┴──────────┼────────────────────────┤          │                │       │
│   origin    │                     │         origin         │ pathname │     search     │ hash  │
├─────────────┴─────────────────────┴────────────────────────┴──────────┴────────────────┴───────┤
│                                              href                                              │
└────────────────────────────────────────────────────────────────────────────────────────────────┘
```
`url` module is that gives you methods to work with URLs. You may have noticed we are using it in our router to get the pathname from requests.

`url.parse()` - parses a url into url object containing:
```js
{
  protocol: string,
  slashes: string,
  auth: string,
  host: string,
  port: string,
  hostname: string,
  hash: string,
  search: string,
  query: string,
  pathname: string,
  path: string,
  href: string 
}
```
[📝 see docs](https://nodejs.org/api/url.html#url_url_parse_urlstring_parsequerystring_slashesdenotehost)
### `querystring`
Query strings are information sent to the server at the end of a url. They are used for insensitive data on `GET` requests such as search criteria. They start with a `?` and are key value pairs separated by an `&`. They follow the format:
`<url>?<key>=<value>&<key2>=<value2>`

`querystring` module offers methods for you to parse and stringify this type of data.

`querystring.parse()` - parses query strings into an object
[📝 see docs](https://nodejs.org/api/querystring.html#querystring_querystring_parse_str_sep_eq_options)

### Let's do it
We are going to write this handler so that you can search for bears by querystring 
eg: `/find?bear=one`

- go to the handler for `/find`
- import `path` & `fs` & `querystring` & `url`
- use `url.parse()` to get the search query from the url
- use `querystring.parse()` to get the values from the query string
- check the bear value of the parsed query string. If it is `one` to `four` return the correct bear image.
- if there is no matching bear or no bear query given return a `400`

###  How do I know if I got it right?
- On your browser, go to the route you just built a handler for (including a querystring!)
- What should the querystring be..?
- If you've put the correct querystring you should see another picture of a bear!
- There are 4 different pictures you can see depending on your querystring

## Exercise 3a - `request` module
Request is a very popular module that helps to make HTTP requests as simple as possible and it is built around the Node HTTP core module. [Here](http://stackabuse.com/the-node-js-request-module/) is a brilliant article on the Request module. This can be used for making api calls from your server.
[📝 see docs](https://github.com/request/request)

Making server side api calls is good for platforms that need an api key, as you can ensure it is kept secret!

### Let's do it
We are going to write the `/random` handler to return a random bear gif. 

- install the request module `npm i request`
- go to https://developers.giphy.com, sign up for an account and then create a new app on their site. 
- make an api call to giphy's [random endpoint](https://developers.giphy.com/docs/#path--gifs-random)
- return an html `<img>` element with with the src pointing to a gif on giphy which has a bear tag
<details>
  <summary>
  Hint
  </summary>
You can create the string html element by using <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals">template literals</a> or adding the string together
</details>

###  How do I know if I got it right?
- On your browser, go to the route you just built a handler for
- You should see a random bear gif!

## Exercise 3b - `http` module
> But I thought that this workshop was about learning core node modules?

You're right! `request` is not a core module, as it does not come bundled with node. We are going to find out what this module is doing under the hood by rewriting it using the `http.get` method. 
[📝 see docs](https://nodejs.org/api/http.html#http_http_get_options_callback)

> I've read lots of node's documentation in this workshop already, I am feeling confident with node core modules!

Great! In that case, I'm not going help you!

> EEP, but I am stuck...
<details>
  <summary>
  🌟 Click here for a few hints 🌟
  </summary>

  - read the docs
  - google for help
  - don't look at the solutions branch 🤷🏽‍
</details>

### Let's do it
- In `random.js` instead of setting the function you just made out equal to `module.exports`, move it out of `module.exports` and give it a different name
- Then set `module.exports` equal to a new function which does _exactly_ the same thing, but using the `http` module instead of request!

###  How do I know if I got it right?
- It should be exactly the same as 3a!