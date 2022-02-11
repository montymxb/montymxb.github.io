---
title: "Blind Search in Pacman"
date: 2020-03-30T16:02:32+01:00
description: "A quick demonstration of blind search techniques being applied to the game of Pacman, and observations about the effectiveness of a simple BFS approach."
author: "Benjamin Friedman Wilson"
draft: false
image_contain: "/images/pacm1.gif"
tags: ["Pacman","ML","AI","Discussion","Github"]
keywords: ["Pacman","Game","AI","ML","Search"]
ldtype: "blog"
---

### Introduction

Various search algorithms that I implemented on a simple HTML5 implementation of Pacman.
I was interested in seeing how various heuristic search techniques would compare against uninformed search approaches.
What was interesting is how quickly a breadth first search can finish a level of Pacman, even if it runs through lives rather quickly.

Even if it doesn't play as optimally as would be desired, it still plays better than most humans.
In addition, there may be some interesting follow up research with regards to how longevity and survival can factor into using search on Pacman.

[Click here to see the demo of blind-search on pacman, hosted on this site](/pacman-ai-demo/index.html).

For full disclosure I did *not* write this implementation of Pacman. Instead, I modified [Lucio Panepinto's Pacman in HTML5](https://github.com/luciopanepinto/pacman), which was excellently done. I was able to take their existing implementation, and integrate an AI player instead of a human one. This took some time, but it was much easier than writing the original game from scratch.

The setup is intended for desktops, laptops, or other similarly sized screens. The CSS hasn't been modified to behave well on mobile devices. Buttons to change the search technique are located on the left, as well heuristics that can be applied (only to A\* and Minimax in this case). Clicking anywhere on the game will start it, and pacman will play without any input from the player. For data collection, there are some brief statistics that are gathered from each run and added to the textarea at the top-left. Admittedly this testing setup is *crude*, but the point was to see if this would work, and indeed it does.

If you're interested in the source, you can check out [Blind Search in Pacman on Github](https://github.com/montymxb/pacman#readme) for implementation specific details.

### Details

*This is, more or less, identical to the description on Github for this project.*

The project contains a modified codebase for performing research on the domain of Pacman, with a focus on applying Blind and Heuristic search to attempt to produce solutions to levels in realtime.

Results indicate that BFS with sufficient depth performs well at solving single levels with 3 lives. Also strong indication that heuristics that prioritize distancing from ghosts greatly increase survivability (as to be expected). A\* was also attempted as well.

This paper looks into generating some compound heuristics that combine individual heuristics to attempt to compensate for shortcomings of individual heuristic approaches. Also of interest was adding in heuristics into a compound mix that prioritize better positioning throughout the game, such as by avoiding the far edges of the map or maintaining close distance to the average center of all capsules remaining in the maze.

Findings can be found [in this course paper](https://github.com/montymxb/pacman/blob/master/final_project_ben_friedman_531.pdf).
