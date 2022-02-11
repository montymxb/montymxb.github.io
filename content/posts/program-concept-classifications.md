---
title: "Research: Program-Concept Classifications"
date: 2021-06-01T16:02:32+01:00
description: "A brief discussion about my MS thesis research, focusing on using Formal Concept Analysis to identify and classify programs for education purposes."
author: "Benjamin Friedman Wilson"
draft: false
image_contain: "/images/e1.png"
tags: ["Programming","Research","Education","Analysis","Discussion"]
keywords: ["MS","Thesis","Benjamin","Wilson"]
series: ['Data Visualization']
ldtype: "blog"
---

My MS thesis, *Structuring Teachable Knowledge through Program-Concept Classifications*, was finished and defended mid-June 2021.
It was quite a difficult effort, but well worth the time and experience.
I knew when I returned to Oregon State University in January 2018 that I wanted to finish not only my undergrad, but my MS as well.
Earlier in the same year I never would have imagined that I would go back, but I am more than happy that I did.
I already had acquired practical CS engineering experience in the 5 years before, but I was ready to challenge my understanding and to learn more about computer graphics, programming languages, and education.
Having achieved an MS, it's been nice to take some time to reflect back on my work and what I have learned.

### Background

While working on my thesis I researched heavily into [Formal Concept Analysis (FCA)](https://en.wikipedia.org/wiki/Formal_concept_analysis), a theory that allows describing and classifying objects and their attributes together.
The resulting classifications can be related together in a complete lattice, which has properties that enable clear paths of exploration through those classifications.
The theory itself is a tad dense, but it is sound and clear once understood.
I found it to be effective given the fact we had programs and concepts we wanted to associate to each other, which correlated nicely with FCA's notion of *objects* and *attributes*.
We wanted to be able to guide the way programs were presented based on the concepts that they entailed.
We also wanted to avoid oversimplifying with a linear order, and to instead provide a series of paths that account for the possible programs and concepts a learner already may understand.
Using FCA was a natural solution to combining programs with their attributes, and it gave us a structure that facilitated multiple paths of exploration.

Since we were interested in building classifications for the sake of guiding which programs and concepts were presented in what order, Machine Learning techniques could also have been utilized instead of FCA.
Using ML can produce classification systems that work just as well, or better, but they are often not easy to explain or customize.
While ML is not unreasonable for this application, we wanted to produce work that was customizable for a given set of programs and concepts, and could be easily understood in terms of set & lattice theory.
With FCA there are no decision boundaries or weights involved, simply a series of sub-set relations and a directly customizable set of programs and concepts, which better suited our constraints.
With that being said further work on ordering programs through ML techniques is still worthwhile exploring.

There is much more to detail as to how this program-concept classification technique was developed from FCA, and the rationale as to why.
If you're interested you can read my thesis below, and feel free to jump towards the chapters that are particularly of interest.
As one recommendation, it's helpful to first familiarize yourself with the basics of FCA, as it forms the groundwork of the classification system used in the thesis.

[Thesis: Structuring Teachable Knowledge through Program-Concept Classifications.](https://ir.library.oregonstate.edu/concern/graduate_thesis_or_dissertations/tq57nz829)
