@title[Introduction]

# **WeebMD**
Christopher Gutierrez, Corbin Rogerson, David Malone, Joshua Ondrusek, Nelson Swindler, and Randy Thai

Note:
* Chris: Unit Testing, Visualization
* Corbin: Hosting, Database Setup, Auto-generate API
* David: Front-End Design/Development, User Stories, UML Diagram, Technical Document, Selenium Tests
* Joshua: Database Scraping, API Documentation, Visualization
* Nelson: Front-end Design/Development, Technical Document
* Randy: Front-End Design/Development, Technical Document

---
@title[Data Source and Scraping]
# Data Source and Scraping
* Jikan.me
* Kitsu.io

Note:
* Explain issues with Jikan, and how we handled them, Josh/Corbin

---

@title[Demonstration]

# Demonstration
##### Navigation, searching, and unit tests
@fa[arrow-down]

+++

@title[Navigation & search]

##### Navigation & search
<a href="http://weebmd.me/" target="_blank">![WeebMD](https://i.imgur.com/IvU3WT5.png)</a>

+++

@title[Unit tests]

##### Back-End
* Flask-Restless
* Flask-SQL-Alchemy
* SQLite

+++

@title[Unit tests]

##### Unit tests

---

@title[Self Critique]

# Self Critique
* What did we do well?
* What did we learn?
* What can we do better?
* What puzzles us?

@fa[arrow-down]

+++

@title[What did we do well?]

##### What did we do well?
* Looks great
* Simple navigation
* Task management and planning

+++

@title[What did we learn?]

##### What did we learn?
* Understanding data source and format is important
* You don't need to re-invent the wheel, there are many many tools

+++

@title[What can we do better?]

##### What can we do better?
* Time-sensitive information
* Image hosting
* Mobile view
* Regex searching and weighting
* Database is not very scalable as it is SQLite

Note:
* A lot of the information is time sensitive, that is a published date or rating could be changed over time and thus we would not be getting those changes with our current implementation of things.
* Potentially host images on the server rather than use URLs, some of our images were moved on the website we were getting them from and thus would break out site at times.
* Have a default, pre-loaded image that shows before the images are actually loaded so the user doesnt just see a blank screen.
* Mobile version

+++

@title[What puzzles us?]

##### What puzzles us?
* Jikan has different formats for different values, e.g. genres sometimes list, sometimes dictionary
* Search highlighting on multiple words in the same attribute
* Webpack

Note:
* Why does semantic UIs search box not let you click the magnifying glass as a button to enter your search? To fix this would be really annoying.
* Searching on the AND term for two words in the same attribute does not always highlight both if they both don't fit on the same line and this would be difficult to accomplish

---

@title[Other Critique]

# Other Critique
* What did they do well?
* What did we learn from their website?
* What can they do better?
* What puzzles us about their website?

@fa[arrow-down]

+++

@title[What did they do well?]

##### What did they do well?
* Looks really nice, especially the model's pictures
* Useful service
* Spotify integration

Note:
* Its very fast! (Maybe not)
* The site actually performs a very useful service if you want to find new artists and listen to their tracks.

+++

@title[What did we learn from their website?]

##### What did we learn from their website?
* The meaning of the word Poupon
* API Availability status
* Mobile view

+++

@title[What can they do better?]

##### What can they do better?
* Clickable Model cards
* Column labels
* Current page indicator
* Filtering and sorting issues

Note:
* The model cards are not clickable, it is the name that is clickable. This is annoying as Id like to click on the whole card and not have to move my mouse to a precise location.
* Would like labels for columns in the cities page. Its not entirely obvious that the middle column is population.
* Links for the page numbers dont bring up a clickable cursor
* It would be great if the navigation bar showed what the current page is somehow
* The dropdown for the population filter on comes up with range0 and seems to not filter on anything.
* For cities, why not have a filter on state?
* Some cities have a lot of news articles. Maybe paginate it?
* The media filter on news page doesnt include all of the sites that news can redirect to.
* Some news articles have a wrong related album because the album's name is used in the articles title. http://poupon.me/news/1403
* Sorting is unclear, it starts with the default sorting option as Newest but its actually not sorted, clicking on Newest doesnt do anything, you have to click a different sorting option then click newest
* Points on a news article is unclear as to the meaning for each source, reddit it makes sense but youtube not so much

+++

@title[What puzzles us about their website?]

##### What puzzles us about their website?
* Why is Justin Beiber there but not Eminem?
* The meaning of points

---

@title[Visualization]

# Visualization

@fa[arrow-down]

+++

@title[???]

##### ???
