---
title: "Functional Domain-Specific Shader Language (FDSSL)"
date: 2021-06-25T13:56:27+02:00
author: "Benjamin Friedman Wilson"
draft: false
description: "A breakdown of the Function Domain-Specific Shader Language (FDSSL), which enables writing composable shaders for usage with OpenGL."
tags: ["FDSSL","OpenGL","Shaders","GLSL","Discussion","Github"]
keywords: ["Shaders","Education","Programming","GLSL"]
ldtype: "blog"
---

A coleague and myself have recently undertaken early work on a higher-level shader language that compiles to [OpenGL Shading Language (GLSL)](https://www.khronos.org/opengl/wiki/OpenGL_Shading_Language).
This effort comes from my own personal experience working with GLSL shaders, and witnessing the complexity that they often entail.

To be frank I thoroughly enjoy working with shaders because of this complexity and the customization it enables, but it is difficult to get new-comers to understand how to work with and debug shaders for the same reasons.
To address this, we wanted to design a language with some simple goals:

- a simplified syntax with regard to GLSL
- a functional paradigm
- support shader composition (effectful sequencing)
- support function composition
- unify vertex and fragment shader workflows into a single script
- enforce strong typing and ensure type safety
- compile to various GLSL versions

Our initial efforts produced a workable version of FDSSL, but we still have much we would like to do.
Ultimately, we're hoping that this language provides a way for general necomers to computer graphics (or newcomers from functional languages) to be able to ease into GLSL itself.
If our efforts are effective, we would also like to see how FDSSL could work in practical applications.
Upon completion, we are also thinking about making this tool available online as a [Web Assembly](https://webassembly.org/) module.

[FDSSL on Github.](https://github.com/montymxb/FDSSL#readme)
