# NPS Web Tool

Tool for **National Park Service** to predict the crime clustering of a new or changing park based on a set of park metrics / parameters. The clustering algorithm and software development was aimed exclusively at the *30 Pacific West Region* NPS units. However, extending this approach to any national park seems feasible.

## 1. Overview

#### 1.1 How to use this web tool?

All you need to do is open the file *index.html* in your favorite browser. I would prefer **Mozilla Firefox** for personal security and **Google Chrome** for slight increases in page loading speeds

*Note:* Slight is relative to this web tool - other projects with heavy Javascript computations may have major speed increases from Chrome vs. Firefox.

#### 1.2 A static web app

Due to potential concerns regarding backend (**e.g. server-side code + behavior relating to security**), this web tool runs without server-side support. Server-side functionality could be added in at the user- or administration-level if desired, but no current part of this web tool runs outside of standard *HTML, CSS, and Javascript* - all as static files directly in the browser.

## 2. Results of clustering algorithm

We used a clustering method - currently being development as **TSEClustering** by Oliver Muellerklein at UC Berkeley - to group the *30 PWS* units into *7 crime clusters*. These clusters are based on several crime metrics, including the average amount of total Part I and II crimes in each park.

## 3. Predicting new or changing parks

The work of Alice Kelly, Oliver Muellerklein, and Jenny Palomino produced a means to find correlations, both linear and non-linear, between the average total crime and a series of park parameters. These parameters (**or 'park metrics'**) include, but are not limited to:

- Number of rangers
- Historic marijuana grows
- Average road density (**Low, Medium, or High**)
- And so much more!

Finding a relationship between the above examples of park metrics and average total crime in each park was a complicated, windy process ... but ultimately resulted in this wonderful application of software development and natural resource and wildlife management across U.S. National Parks.

## 4. Last words

"I just want to give a HUGE thank you to *Alice* and *Jenny* for my continual progress in research, education, and friendship. It has been incredible even just meeting you both - let alone working on such a great and meaningful project! So thank you." - *Oliver*   
