---
title: "Writing a Resume in LaTeX"
date: 2021-11-21T16:02:32+01:00
description: "Learning what to consider while building your resume in LaTeX."
author: "Benjamin Friedman Wilson"
image: "/images/og_image.png"
draft: false
---

I've recently been applying for careers, and have found myself exploring how I could best design my resume in LaTeX. I've had several years of experience writing technical documents in LaTeX, but none in writing a resume (or a CV for that matter). My first versions were not quite up to par, but it was through repeated iteration and exploration that I've begun to settle on a design that I'm happy with. Here are some points that I would like to share about writing a resume/CV in LaTeX. As a disclaimer my points are not perfect, and I'm still discovering new facets to keep in mind.

### For starters, why would you want to write your resume in LaTeX?

This is a great question to start with, as I don't want to give the impression that LaTeX is somehow the only way to prepare your resume. Clearly, this is not the case, and there are an abundance of sensible alternatives out there to choose from. My personal rationale for picking LaTeX stems from how many other choices I've used and abandoned over the years. I've had to rewrite my resumes numerous times over the last 8 years, and everytime I somehow ended up using a different choice. Ranging from Word, Google Docs and even Libre Office. At the time I found these document editors were sufficient, but when I wanted to go back and track revisions it wasn't so clear. Today most document editors should have some form of versioning, but what I was really looking for were notes & annotations. A resume can change widely based on the kind of job or career you're applying for, and having notes to track changes is helpful. Document editors do have these features, but I always found myself wanting to keep the formatting & content notes separate from the final document. To this end, LaTeX fills the requirement nicely. Here are a few other points that come to mind.

- [Great platform support](https://www.latex-project.org/get/), and web support via [Overleaf](https://www.overleaf.com/).
- Ability to build a [reusable resume/CV class](https://www.overleaf.com/learn/latex/How_to_write_a_LaTeX_class_file_and_design_your_own_CV_(Part_1)) for usage down the road.
- Can version control cleanly with your favorite VCS, probably [git](https://git-scm.com/).

In addition, LaTeX offers a degree of control that is closer to how I write markdown or programs every day. When I work in LaTeX I feel that I can innately follow the notation in this fashion, but this is admittedly a personal bias. Based on what you daily drive for your work, it is likely you will find and cherish a very specific document editor for your uses.

### What can I use to get started?

As mentioned above you can always hop on Overleaf to get started writing your resume. They have excellent documentation as well, in case your LaTeX is a little rusty or if you're venturing out of your experienced area.

I daily drive on macOS, and have found that [TexShop](https://pages.uoregon.edu/koch/texshop/) works great locally. I even used it to write up my thesis earlier this year using a wonderful document class provided from Oregon State University.

### What should I watch out for?

This isn't exhaustive, but here are some key elements that caught me while I was writing my resume in LaTeX.

#### Make sure your document dimensions are formatted correctly.

This may seem obvious, but I definitely missed this one the first time around while I was laser focused on content. In particular, **make sure you maintain consistent margins on all sides**. In general, clean 1 inch margins on all sides is a good choice. However, if you find yourself wanting a little extra space, you can always go for 0.5 inch margins instead. Just be sure to make your choice clear and consistent. If your use case requires you to have a different margin size than either of these, that's perfectly fine, but pay careful attention to making sure this is set correctly. A poorly formatted margin will immediately show up in comparison to other resumes.

This is where other document editors have an advantage, as most automatically set these margins correctly for you at the start. If you're not sure, you can open up a quick document in Word or Google Docs to check what these default margins are set to. More often than not these tend be 1 inch margins.

#### Watch those line numbers!

For a CV, line numbers are sensible, but make sure to **drop the line numbers on your resume**. It's a small 'gotcha', but if you're sharing a LaTeX class for your resume and CV it's easy to slip up. This quick mark can help right before your resume document start.

{{< code >}}
\pagenumbering{gobble}
{{< /code >}}

#### Choose your font(s) carefully

[Picking your font is an important choice](https://www.creativelive.com/blog/how-much-does-fonts-matter/). For some this may be a matter of settling on the default font, but with piles of resumes it's easy for yours to blend into the rest. Picking a good font, or pairing of fonts, can help improve the legibility and presentation of your resume. It can also make your resume stand out visually from others. LaTeX's default font isn't too bad, but I personally have found going with Times is simple and quick to read.

{{< code >}}
% If ptm is present, you can get Times this way
\renewcommand{\rmdefault}{ptm}
{{< /code >}}

The above can be added before your document start, and will change the serif font in your document to Times New Roman. You can find more detail about this at [Sacha Frank's page on Times New Roman in LaTeX](https://www.sascha-frank.com/Fonts/Times_New_Roman.html).

In addition, it's a good idea to pick a pair of fonts that work well together. [There are a variety of pairings that you can use](https://www.canva.com/learn/the-ultimate-guide-to-font-pairing/), but I tend to work with a clear sans-serif font for my headers and serif font for my content. In my recent resume and CV I have found that I have a preference for Helvetica and Times New Roman, but I have changed this many times already, and probably will continue to do so. As you may have noticed, my entire site uses Helvetica, so I am *definitely* biased towards it.

Perhaps most of all, **keep in mind the impression that your font choices create, and whether it matches the desired tone of your document**.

#### Abstract Repeated Definitions

f you find a number of acronyms or names that you write frequently, you have the option of **defining a new command in latex to abstract the implementation detail away**.

Writing C++ in LaTeX is a great example. I missed it numerous times, but simply writing C$++$ drops the ++ slightly below the C, making it a bit awkward (evident here as well). Maybe this was a poor to begin with on my part, but after doing some looking around it appears this has been [a pretty common problem with a variety of solutions](https://tex.stackexchange.com/questions/4302/prettiest-way-to-typeset-c-cplusplus). Regardless of your solution choice, it's often best to implement it as a reusable command.

{{< code >}}
\newcommand{\cpp}{C\texttt{++}}
...
And did I mention I know \cpp{}?
{{< /code >}}

Again, this was a small change, but I found it to be dramatically better looking on the final result.

#### Keep an eye on your space

When writing a resume, **it's in your best interest to take advantage of all the space you have on your page**. Especially when you have large margins, you want to make sure that you're demonstrating your best self on the limited real estate that you have. To this end, take care about how much trailing space you're leaving behind throughout your document. If you're finding that most of your lines are only half or 3/4 of the available width, maybe it would be best to segment your resume into a new layout with side-by-side sections. Not only can this help fill out some of the extra space on your resume, but it can bring a bit of balance and style to your resume's presentation.

#### Don't be afraid to change the layout

This ties in closely with what was mentioned above, but really don't be worried to push the boundaries of the layout on your resume. Not only is this a learning opportunity, but it's also a chance to create a truly spectacular resume that is, at the same time, clean and clear to your personal identity. Your resume's layout is as much about you as it's content, so make sure to take equal care of it!

...And that's about it.

As a parting note, there are plenty of LaTeX resume/CV templates out there to explore. I've recently been working with a version of a template that itself was based off of [Deedy's template on Github](https://github.com/deedy/Deedy-Resume), a notably popular choice. As of writing this it hasn't been touched since 2016, but it serves as a nice example for the kind of resume layouts you can build in LaTeX. That, and there's no shortage of forks based on it.

If you have any questions, or concerns, you can reach me at [wilson.f.benjamin@gmail.com](mailto:wilson.f.benjamin@gmail.com). I'm always happy to hear your thoughts, corrections, and suggestions to provide better content for readers like yourself.
