# Task Management SBA

 A Task Management App that allows users to add tasks with deadlines, assign categories, and update the status of each task. 

## Table of contents

- [Overview](#overview)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
- [Author](#author)
- [Acknowledgments](#acknowledgments)



## Overview
- Add new tasks with details loke task nmae, category, deadline and status. 
- Update the status of tasks to reflect their progress
- Automatically update task status based on the current date
- Filter tasks by status or category.
- ersist task data using local storage so tasks are saved even after refreshing the page.



## Reflections

-Challenges faced during the project.
    -- The toughest parts were the overdue checks and the category filter dropdown

-How you approached solving those challenges.
    -- For the overdue check function it was isolated as a module and called everywhere the task was needed. The dropdown category was selected before rebuilding, then compared with new options. 

-What you would improve if given more time.
    -- Being able to change a task name, category, or deadline
    -- Add a delete buton for the individual tasks


### Links

- Solution URL:(https://github.com/KwadwoDanso/task-management-app-SBA.git)


## My process
- Built a simple HTML page with the inputs, category, deadline and status button to add tasks, filter dropdowns. 
- Started with the array and the core functions- addTask() renderTasks(), checkOverdue(), and updateStatus(). 
- Filtering by adding status and category dropdowns that renderTasks().
- Local Storage added saveTask() and loadTasks( so that the array can keep refreshing. 


### Built with

-Javascript
-HTML/CSS



### What I learned

I explored and experimented with using local storage. 
Updating the status of the tasks to reflect the progress. 


## Author
-Author is Kwadwo 

## Acknowledgments


-MDN Web Docs
-w3schools
-Per Scholas JS lessons
local storage tutorial by digital mike on Youtube (https://www.youtube.com/watch?v=lMLSPNPNWLQ)
- How TO BUILD A Todo list app with local storage for beginners by Web Dev Tutorials on Youtube (https://www.youtube.com/watch?v=SeKQSQDUMDQ)


