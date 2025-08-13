# Angular course-project: Sport-site app.

<img src="https://github.com/Martin7n/sport-site/blob/main/sport-site-client/public/Ver03.png" width="100" alt="Description" />


### Project description
The **Sport site** app is created for educational purposes as part of Angular Web course in SoftUni. 
The app provides a flexible interface for creating, reviewing and generating a flexible set of workouts/complexes for those who are interested in that. 
The tehcnologies uses are Angular 20 and TypeScript with 
 - Multiple interfaces/models;
 - Signals;
 - Interceptors
 - Pipes;
 -  AuthGuard and Guest guard as routing policies;
 - The site provides public pages and registered only views with different funtionalities.

### The site:
The site is providing clean and minimalistic design with fast usability and functionality - both of which are seriosly lacking in the modern web. 

### Main  functionalities
1. Creating a Complexes for all users, based on predifined logic.
2. Complexes contains a visual appeals randomly attached to any one of them.
3. Creating a custom Complexes(user orcestrated) for registered users, with all CRUD operations.
4. Liking/bookmark specific complexes for registered users and access for the bookmarked lists.
5. The total numbers of likes is showed to registered users, as we respect the registered users opinion.
6.  There is also an third party news section, paired with an external API providing some sport insights and news.

#### Additional:
1. The projects is using custom Express.js back-end providing the logic.
2. Built-in security authentication between the Front End and Back-end.
3. The general authentication is implemented with Json Webtokens.
4. The authentication/session persistance and status is managed by the front end with Interceptors and active client-server communication.
5. Responsive design for various screen sizes.


**Please, note**:
#### In order to setup and start the project you need the enviroment variables - both server and client.  
The enviroments variables contents are provided, with short commands/ creation instructions [HERE ](https://docs.google.com/document/d/1C2GgEov5HzdLA1qkUVFSqrC__59-1rurWgLa7watQxQ/edit?usp=sharing "settings and .env needed")
After adding the enviroments variables, the projects dependencies needs to be installed -  
- "*npm i*" in the sport-site-server and in sport-site-client folders. 
in separate teminals:
- "*npm run dev*" in the in the sport-site-server directory
- "*ng serve*" in the in the sport-site-client directory

Kind regards,

