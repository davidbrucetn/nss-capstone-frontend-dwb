$ nss-capstone-frontend-dwb  
# CovidDining 


![alt text](https://github.com/davidbrucetn/nss-capstone-frontend-dwb/blob/master/src/components/nav/images/logo.png?raw=true)


	Name:	David Bruce  
	Email Address:	david.bruce.tn@gmail.com  
	Mentors:	Jisie David, Brenda Long  
	Capstone Repo on Github:   
	https://github.com/davidbrucetn/nss-capstone-frontend-dwb  
	
Name of Project: CoviDining  

[Capstone Presentation PDF](https://github.com/davidbrucetn/nss-capstone-frontend-dwb/blob/master/Covid-Dining%20Front-End%20Capstone.pdf)
  
Brief Proposal: CoviDining is a restaurant app for the Covid life, for people to look up restaurants that either have delivery, outdoor dining, or drive through windows, and save them to their list. If they don't have outdoor dining, they can save the restaurant details, like waitstaff wearing masks, etc to their collection.  
  
Overview of Application:   
	What problem does your application solve?   
		Since the advent of the COVID-19 virus, the US finds virus numbers keep climbing, and no vaccine is currently available. This app will allow people search for establishments from which people will feel safer ordering.  
	Who are the target users of this application?	  
		Any people who want to eat out without excessive worry of exposure to COVID-19.  
	What can a user do with this application?  
		Search for restaurants by options of outdoor dining, delivery, take out, or drive through, and save them to their local collection, as well as make note of whether the establishment employees wear masks and/or gloves, etc.  
	Why do you want to build this application?  
		These are all things that many people, including myself, think about when we want to get food from a restaurant these days.  
  
Features included in MVP Definition:   
  1.  Register and login users  
  2.  Save user profile info  
  3.  Search restaurants by one of four different options:  
      * Outdoor Seating  
      * Delivery  
      * Take Out  
      * Save Restaurant to Collection with notes and/or PPE boolean.  
  
Features that are Stretch Goals:  
	Save user picture and any other ideas for enhancements that come up in development.  
  
Things you want your mentor to check in on:  
	If I’m shooting myself in the foot?  
  
User Stories on Github:   
  
	When a user comes to the landing page, given they do not have a login, then there should be an affordance to register a new login.  
	Given the user has already registered, then the user my login from the landing page.  
	Given the user wants to find restaurants with delivery, drive through, or outdoor dining, then they can use an affordance to query with those filters.  
	Given user wants to save a restaurant to their collection, then there should be an affordance to do so.  
	Given the user adds a restaurant to their collection, then there will be affordances to make notes or indicate the use of PPE at said restaurant.  
	Given the user wants to delete a restaurant from a collection, then there should be an affordance to do so.  
	Given the user wants to enter profile information, there should be an affordance to do so.  
	Given the user wants to edit their profile, there should be an affordance to change their password.  
  
  
Planning Links  

ERD: https://dbdiagram.io/d/5f19d38ce586385b4ff7b210  
Mockup/Wireframes: https://sketchboard.me/lCfKvMkusgnz#/  

Technology Stack:   
1.  Base  
   * React  
   * Bootstrap
2.  UI
   *  CSS - Yours Truly
   *  Ant Design Icons  
   *  Boostrap Icons  
   *  Bootstrap Cards
   *  Grommet-Icons  
   *  Material-UI Checkboxes  
   *  Typeicons  
3.  UX Considerations
  Using Reactstrap NavBar with an input field for the location (city, state), it limits input to alphabetical characters, commas, dashes, periods, and apostrophes, and passes the entered info to a dynamic route when a user clicks on Find Reststaurants.  If the information is not entered, a msg will appear prompting the user for this information. 
Once the results are displayed, a heart outline will indicate the restaurant has not been added to their collection, while a solid heart will show that it has, as well as displaying the dining options and PPE (yes/no) value.  
  The Collection can be filtered to the dining options from the NavBar dropdown selection.

Other Research  
  
For the restaurant API, I spent many hours trying to find the one that would give me the options needed, and found third party free option (restricted by fetch count) that offered access to TripAdvisor.  
I’ve become fairly knowledgeable about CSS since starting at NSS, so I’ll probably do my own design versus trying to learn a template.	  
For the stretch, provided I get that far, I will try to checkout Cloudinary for image storage, since I saw it repeatedly mentioned on other capstone presentations.  

## Installation
1.  Clone the repository to a React-enabled directory
2.  Satisfy the following dependencies with npm install:
    *  "@material-ui/core"
    *  "@material-ui/icons"
    *  "@material-ui/styles"
    *  "bootstrap"
    *  "jquery"
    *  "popper.js"
    *  "react-bootstrap"
    *  "react-dom"
    *  "react-icons"
    *  "react-router-dom"
    *  "react-scripts"
    *  "react-tiny-link"
    *  "reactstrap"
    *  "resolve-url-loader"
3.  In the api directory, run json-server 
3.  Run npm start, once completed.

## Instructions
1.  Register a new user.
2.  Type in a city, state in the search box, and go to Search Restaurants, then select a Dining Option.
3.  Click the heart icon for any restaurants you want to save. These will show up in your Collection.
4.  Once a restaurant is saved, you can add ratings and edit dining options for that establishment.

![Covid-Dining Demo](https://github.com/davidbrucetn/nss-capstone-frontend-dwb/blob/master/CovidDining-Demo.gif)
