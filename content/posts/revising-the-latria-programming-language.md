---
title: "Revising the Latria Programming Language"
date: 2021-11-20T16:02:32+01:00
description: "Going back over and discussing how to revise the Latria programming language."
author: "Benjamin Friedman Wilson"
draft: false
image_contain: "/images/latria.png"
tags: ["Latria","Languages","C","Programming","Analysis"]
keywords: ["C","Programming","Scripting","Language","Design"]
series: ['Latria']
ldtype: "blog"
---

### Introduction

Latria is a very small scripting language that I started writing back in 2014, and finished up sometime in 2016. The goal was to see whether or not I could write my own language if I really put my mind to it. In addition, I had recently learned [lua](https://www.lua.org/), and was inspired to write something in a similar vein. It was a vast undertaking at the time, as I had no formal experience writing languages at all (and no programming language theory experience either at that point). It taught me a considerable amount about writing cross platform applications, dealing with stealthy pointer-related bugs, and the fundamentals of garbage collection. Towards the end I pushed myself to write in a simplified regular expression parsing engine, which was sufficient enough to integrate into the parser as well.

Looking back at it now, it certainly hasn’t aged in the prettiest way. There was a lot I didn’t understand at the time. However, this has had an unexpected fruit to bear. It now provides a wonderful opportunity to go back and revise what I initially wrote to create a better language than before.

### Problems from the Old Design

The first question is, of course, how can I make it better? Well, having authored the language I was acutely aware of some glaring problems:

- no formal semantics
- dynamic scoping instead of static scoping
- problems with the regular expression parsing engine
- inconsistent null comparisons
- issues passing the results of function calls directly as arguments to other functions
- *really* tightly coupled lexer and parser
- and more...

### Benefits from the Old Design

Thankfully, there were also some benefits to the design that I went with all those years ago:

- minimal dependencies, making the same code base compile on systems 6 years later with no problems
- minimal size, both of the code base and the produced binary, so there isn’t so much to look over
- documented guide that describes the existing behavior at [latria.uphouseworks.com](http://latria.uphouseworks.com/Guide/)
- integrated unit and functional tests

### And, What I Would Like to Preserve

With these pros and cons in mind, there are some aspects I would like to preserve whilst making revisions to the language:

- keeping it in ANSI C as a singular codebase
- maintaining cross platform support for modern Mac, Linux and Windows operating systems (not necessarily in that order)
- retain about the same level of expressiveness, i.e. no adding of additional syntax that needs to have the semantics extended

As an extra note about cross platform support, the goal with Latria is that it can be pulled down, quickly compiled, and rendered executable in a minute or less on most systems.

### Rework Outline

With that last point, here is a general outline for the initial steps I will be taking in the rework of Latria.

#### Re-familiarize myself with the codebase

And to also document the general flow. Although I wrote this language myself, it’s been some years since I’ve worked on it, and my initial response is to simply dive in. However, it would be best to survey the general layout of the project again so I can be sure of what I’m working with (or was working with). This is particularly important for any software project. Being well informed about the architectural structure of your project before making changes can limit the number of unintended bugs that you introduce. For those that you do still introduce, it can help you understand why they occur and how they can be fixed.

#### Formalize the existing syntax and semantics

This point is somewhat connected to the prior one, as it is also a way of understanding the existing codebase. However, formalizing the existing syntax and semantics will inevitably unveil discrepancies in the original language design. It will also give me an idea of what kinds of changes I want to make to the syntax and semantics to closer represent the language that I’m looking for.

#### Fix dynamic scoping

This is the first bug that I would like to tackle, and I would like to do so without revising everything. The purpose of doing this first, as opposed to rewriting the language first, is to get an idea of what it’s like to fix an integrated part of this project. If it’s easy, it could be indicative that it won’t be too bad to migrate things. If it’s difficult, it may suggest that it would be better to rebuild everything from scratch using parts of the old framework.

I haven’t planned too far past this point, since it will be a litmus test for what comes next. Regardless of how it goes, I will probably spend a bit more time working on other smaller bugs (like function issues) to gradually bite off larger and larger chunks of the language.

### End Goals

As mentioned before, once this whole rework is done, I would like to have both a new and a familiar language. Latria should retain the notions of the original language, whilst also having a more rigorous implementation. The known bugs that I’m dealing with should be factored out, and the new implementation should have a clear syntax & semantics defined for it. I also want to keep the language fast, since that was one of the original goals of Latria to begin with.

I also want to add in a few new items:

- function composition (inspired by my recent work with Haskell at Oregon State University)
- a Web Assembly implementation, so that Latria can be operated in the browser, independent of a server environment

Ultimately I’m very excited to be looking back at this project again! It was originally a very exciting way to test my skills at the time, and I certainly expect it to be the same now; but on a more advanced level. As I start work on components I’ll add my progress to this site as separate posts periodically. Partly for my own reference, but also as resource for others that are interested in this kind of work.
