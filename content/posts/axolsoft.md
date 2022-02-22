---
title: "Axolsoft LLC"
date: 2015-01-01T16:02:32+01:00
description: "My thoughts and reflections about my time as a full-stack & general software engineer."
author: "Benjamin Friedman Wilson"
image_contain: "/images/axolsoft.png"
draft: false
tags: ["Axolsoft","Discussion"]
keywords: ["Axolsoft","Software","Engineering"]
ldtype: "blog"
---

*Last updated Feb. 22nd, 2022.*

At the beginning of 2015 I started working at a new LLC called Axolsoft as the Head Software Engineer. I co-founded it with partner and a good friend of mine. The idea was to take my experience building front-end systems, and to build a business around it. Not entirely a *novel* idea, but we figured we would give it a shot. I learned quite a lot building a business, and even more about development practices to keep things going -- and customers happy.

## What I did

The majority of my work at Axolsoft was designing and developing client and company software. Many of these tools were to manage client information, deploy and manage client services (full-stack deployments most often), and more. To do this I had to build several online portals, and when possible automating any standardized procedures. Most of the time I was developing systems with:

- PHP/MySQL
- HTML5/CSS/JS
- NGINX
- Stripe & Braintree payments
- Mailing Systems leveraging SFP, DKIM, and DMARC for email security

Although this is only a brief summary of my tasks that I handled. It goes without saying that when you co-run a company, even a small one, there's a lot you have to do.

## Designing the Logo

Not to mention that I *also designed the Axolsoft logo*. I was -- and still am -- very happy with it. Originally we wanted a logo resembling an [Axolotl](https://en.wikipedia.org/wiki/Axolotl), a fascinating salamander from Mexico. We believed that, like the rare Axolotl, we were creating something special. We of course wanted software as well, so we added on 'soft' afterwards. To be honest, looking back at it (and based on what I've been told), it does tend to resemble an Eagle more than an Axolotl. Still, the imagery was well suited for our work, and for the boldness of starting a company by ourselves. It was also one of the first times I got to use *Inkscape* in a professional capacity -- although I am definitely *not* a graphic designer.

## Open Source Work

Open source work was closely related to my company, since we often relied on open source tools & services. In particular, Braintree's PHP payments integration, and the [Parse BaaS](https://docs.parseplatform.org/parse-server/guide/) SDKs. Both of these tools being available on Github. However, I had never personally gotten involved in open source projects on a large scale until we started using these tools.

Working on the Parse PHP SDK was a major part of my work, as we relied on it to build some of our early systems. I figured I would work on improving their tools to share the benefits with all developers who were relying on that SDK. My first contributions were small adjustments -- ones that we thought we needed and others could benefit from. However, when Parse went full open source I took charge of the Parse PHP SDK, which was passed down to me from the previous developer. This prior employee, and their entire team at Parse, had been integrated into Facebook, and due to their new obligations had no time to continue work on Parse. This was a very unique opportunity for me, and I was more than happy to take on the responsibility at the time. I managed that SDK for about a year until I started to transition into a full time student again.

## System Administration

What surprised me the most was just *how much work* is involved managing systems, actual physical installations, not just deployments in the cloud. At Axolsoft a good part of our infrastructure was physical, meaning we had to oversee our servers on site. To be clear Axolsoft doesn't do this anymore, but some years ago that was how we operated.

I learned how to handle some of the most ridiculous problems that you would encounter. I think one of my *fondest* memories was having a battery blow up inside one of our servers. It was completely unexpected, and took a whole chunk of our system offline. What followed was 24 hours of going through our recovery procedure, only to find that parts of our recovery procedure were not working as expected.

That experience taught me a couple valuable lessons. First have a backup plan and *test* your backup plan. Second, always double check your equipment and its associated parts on a schedule, and keep replacements on site -- you never know when you'll need one. Once you have done that, test it again periodically. Verify that things are still capable of being recovered like you think they can be. Thankfully we had redundant data backups (which is a must), so we had no issues recovering the data. Still, the downtime was far from ideal, and it's worth the extra investment against downtime.

## Thoughts Looking Back

For me, what was most valuable from running a small company was the *experience*. I really enjoyed my time at Axolsoft, and I have always thought about *maybe* doing something similar again. What I learned has been invaluable to me over the years, and it has also allowed me to stay relaxed and focused in even the worst situations.

However, it also taught me something about what I enjoy doing, which is building things, exploring and learning. If I were to do something like Axolsoft again, I would definitely build up a larger group of people to help distribute the workload. The sheer volume of work I had to take care of at Axolsoft was overwhelming at times, and there were often no weekends. Every day was simply a work day, and that in turn has taught me the value of maintaining a healthy work-life balance. It really makes all the difference.

If you've considering doing something like this, or actively are, be prepared to give a lot in order to make things work, and be prepared to be *patient*. Building up a service, a client-base, and a  reliable and dedicated team takes *time*. A lot of time. If you can manage it, and you invest in your team as people you care about, the rewards are well worth it.
