# Retrospective

- name: Juan Garcia
- email: juangarcia601@u.boisestate.edu

## Instructions

For the **Experience** section you need to detail your experience with this lab. 

- Were there any things that you struggled with? 
- Were there any parts of this lab that were unclear or poorly specified? 
- Were you able to get the entire project done?

For the **Known issues or Bugs** section you need to detail any issues or bugs that you have in your
code. For example maybe your code crashes randomly and you couldn't figure out why. If your code
doesn't have any issues you can simply write NONE in this section.

For the **Sources used** section you must detail any sources you used outside of the textbook or
course website. If you write NONE in this section it is assumed that you didn't use google at all.
Be safe CITE!

## Experience

This project really forced me to think back to earlier weeks to concepts I admittedly needed brushing
up on. I thought I had a clear path of what I wanted to do from the get-go... but as I went through,
I discovered I wanted a different layout. For starters, I thought I wanted a single page app where
functionality was available in a section further down the page, like Apple's website. This thought
had a navigation bar that would be along the left pane, like in my-design.pdf. I clearly deviated from
that.

I ended up taking advantage of routes to keep things organized and separate. This really helped me
compartmentalize what I wanted the app to do and when. I invested a lot of time in figuring out when
to use GET versus POST requests and how to hand them off to other routes that made sense when navigating
through the website.

Once I got a handle on how I wanted the routing to work when it came to handoffs, I was able to focus
on crafting sqlite3 queries with data from GET and POST request parameters. This allowed me to then
focus on creating the HTML files with embedded Javascript to make everything look functional. In a
classic case of "tail wagging the dog" or "carriage before the horse," I found that my approach to this
project was not the most efficient.

I definitely learned a lot and can't wait to create a web app to help my girlfriend with a Nursing Program
idea she came up with.

## Known issues or Bugs

I am still trying to track down the cause of this, but after several navigations (sometimes before I even
get the chance to do so), the web application stops responding and Visual Studio Code is stuttering,
flickering, freezing, and crashing. I cannot terminate the process and end up having to restart the 
Ubuntu VM and restart Visual Studio Code.

I suspect that it may have something to do with database accessing. I couldn't wrap my head around async
and await so I instead used time delay functions to wait for queries to be returned before rendering a
couple of pages. Creating more than one database object may be an influencing factor if not the cause.

## Sources used

Background image URL: Photo by Dominika Roseclay from Pexels: https://www.pexels.com/photo/close-up-photo-of-black-typewriter-977930/
Route methods/paths: https://expressjs.com/en/guide/routing.html