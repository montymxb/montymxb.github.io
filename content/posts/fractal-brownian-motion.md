---
title: "Fractal Brownian Motion: Terrain Generator"
date: 2020-03-30T16:02:32+01:00
description: "A terrain generator utilizing fractal brownian motion to produce terrain, water, and clouds using OpenGL Shaders."
author: "Benjamin Friedman Wilson"
draft: false
image_contain: "https://raw.githubusercontent.com/montymxb/FBM_TerrainGenerator/master/submission/cloud2.gif"
tags: ["Fractal Brownian Motion","Graphics","Programming","OpenGL","Shaders","Github"]
keywords: ["Shaders","Fractal","Clouds","Graphics"]
series: ['Data Visualization']
ldtype: "blog"
---

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
