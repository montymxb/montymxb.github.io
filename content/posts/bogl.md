---
title: "BoGL: The Board Game Language"
date: 2021-06-01T16:02:32+01:00
description: "A brief discussion about BoGL, a novel domain specific educational programming language that myself and a team developed at Oregon State University."
author: "Benjamin Friedman Wilson"
draft: false
image_contain: "/images/bogl.ico"
tags: ["BoGL","Programming","Research","Education","Analysis","Discussion","Github"]
keywords: ["BoGL","Functional","Education","Programming"]
ldtype: "blog"
---

While finishing up my undergrad at Oregon State University myself and a group of students were putting the finishing touches on the Board Game Language (BoGL).
BoGL, our capstone project, is a functional domain-specific programming language geared towards teaching new CS students.
Additionally, the language (as the name implies) is geared towards teaching these concepts through the lens of board games.
This project started around August 2019 and continues today, and working on it has been a wonderful experience!

By June 2019 we had successfully finished implementing the base language for public use.
However, the circumstances around the world had changed due to the COVID-19 pandemic.
Our original plan was to reach students by deploying BoGL to iPads via a native app.
This already added complexity, but we were also facing a situation where it was uncertain whether students would have access to any particular device to start with.
To address this, and to encompass as many devices as possible, we switched into deploying BoGL through a web application.
We were then able to provide BoGL to students regardless of whether they had access to a computer, tablet, phone, or something else.
So long as they had a relatively recent browser on a web-capable device, they could program with BoGL.

We were (and still are) extremely proud of this accomplishment, and I was very happy to have been a part of it.
To this day BoGL has been taught in summer camps, middle school classes, an introductory college course, and is likely to continue to expand to more venues in the future.

If you're interested in learning BoGL, you can follow this [link to BoGL Online](https://bogl.engr.oregonstate.edu/tutorials/). This will take you to the tutorials page, where you get started learning about CS through our language.

If you're more interested in the development side of things, you can check out the [BoGL source on Github](https://github.com/ChildsplayOSU/bogl). It's written in Haskell, and utilizes several projects to form a singular stack that serves the language. *I'll add more about this in later post.*
