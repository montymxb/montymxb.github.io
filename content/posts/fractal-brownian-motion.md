---
title: "Generating Terrain with Fractals"
date: 2020-03-30T16:02:32+01:00
description: "Walking through how to build a fractal terrain generator with fractal brownian motion to produce terrain, water, and clouds using OpenGL Shaders."
author: "Benjamin Friedman Wilson"
draft: true
image_contain: "https://raw.githubusercontent.com/montymxb/FBM_TerrainGenerator/master/submission/cloud2.gif"
tags: ["Fractal Brownian Motion","Graphics"]
keywords: ["fractal","terrain","generator","opengl"]
series: ['Data Visualization']
ldtype: "blog"
---

*Last updated on Feb. 17th, 2022*

Have you ever wondered how to build terrain generation quickly, cleanly, and with a little flair? Well, you've landed in the right place then. In this article I'll go through how to build up your own terrain generator using *OpenGL Shaders*. If you don't know OpenGL, that's okay, we'll work through it step by step here to make things clear in the end.

By the end of this article you should be able to not only build terrain through shaders, but you'll also be able to do water and cloud volumes as well. You should also be equipped with enough understanding to continue to explore into the world of shaders, and to come up with some new generation techniques yourself!

## What you'll need to get Started

- Some knowledge of HTML and CSS (but I'll provide some templates to work with)
- Some programming experience
- A general Editor or IDE to write your OpenGL SL (Shader Language) shaders (most anything will do)
- A web browser to run your shaders via WebGL

We'll be targeting WebGL since that will give us a portable basis to work off of. We will also jump into how to make this work as a shader in Unity.

Also don't fret if you don't have knowledge of all the things above. If you read along you'll probably be able to figure it out as you, and I'll do my best to make things clear.

## Some Background

I wrote up a terrain generator using OpenGL shaders for a course project while I was finishing up my Bachelor's degree. I...

EDITEDITEDITEDITEDITEDITEDITEDITEDITEDITEDITEDITEDITEDITEDITEDITEDITEDITEDITEDITEDITEDITEDITEDIT

I was playing around with fractal brownian motion (fbm) as a form of generating computer graphics noise.
I implemented a terrain generator based off of fbm for land, water, and clouds.
The generation of the land as a height map from the resulting values came out quite nice, and I was able to generate fairly decent types of terrain in OpenGL Shader Language.
The approach I used allowed me to perform nearly all of the generation for the terrain in shaders, along with the water and clouds.
The water itself was also an interesting experiment. It was a simple **sin** wave modified with a light dash of fbm to give it an uneven, wavy texture.
The results here were quite surprising in terms of quality, and this is something I will certainly look into down the road.

{{< figure src="https://raw.githubusercontent.com/montymxb/FBM_TerrainGenerator/master/submission/island2.gif" caption="A top-down view of the terrain generator. The cloud volume is super-imposed over the landmass, with a separate sheet simulating water below." >}}

The clouds themselves were implemented using fbm as well, but were generated using volumetric ray casting.
This technique allows a ray to be cast through a solid surface, computing the fbm values as the ray moves through the surface.
The result is calculated dynamically, and as the eye position changes, the resulting values computed by the rays change as well.
To the viewer it then appears that a solid surface (such as a cube) is in fact a volume of clouds.
Adding a slight adjustment with regards to time and a flowing volume of clouds was completed.

[FBM Terrain Generator on Github.](https://github.com/montymxb/FBM_TerrrainGenerator#readme)
