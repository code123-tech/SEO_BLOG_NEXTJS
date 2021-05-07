1. Express Middleware: It is the Function/Programme which is going to run between the time when server receives the request and client sends the request.

2. (req,res) are also Middleware.
3. Ways of Using Middleware:

3. a. Global Middleware:
      This Middleware run before the every request we make on our app.
      ***Middleware runs in order. 
      if we put app.use line after the 
      get,post,put,delete request then it will not run.

    1.  use of Global Middleware
    app.use(FunctionName);
    app.get("/",(req,res)=>{
      console.log("Home");
      res.sendFile("index.html");
    })
    function looger(req,res,next){
      console.log("Logger is in console");
      next(); 
    }
    2. this time it will not run
    app.get("/",(req,res)=>{
      console.log("Home");
      res.sendFile("index.html");
    })
    app.use(FunctionName); //will not run 
    function looger(req,res,next){
      console.log("Logger is in console");
      next(); 
    }
    3. this time it will run
    app.get("/",(req,res,next)=>{
      console.log("Home");
      res.sendFile("index.html");
      next(); 
    })
    app.use(FunctionName); //will not run 
    function looger(req,res,next){
      console.log("Logger is in console");
      next(); 
    }

3. b. Specific Single use Middleware:
    this Middleware are used between any request, and used only for Specific request.
    * this does no run all time when making any request.
    * it is assciated only with the request in which it is used.
    * Multiple Middleware can be used.
    Ex: 
    app.get("/",Middleware,(req,res)=>{
      console.log("Home");
      res.sendFile("index.html");
    });
    **define Middleware Somewhere.


*******Morgan********
Morgan: is another HTTP request logger middleware for Node.js. It simplifies the process of logging requests to your application. You might think of Morgan as a helper that collects logs from your server, such as your request logs. It saves developers time because they don’t have to manually create common logs. It standardizes and automatically creates request logs.

Morgan can operate standalone, but commonly it’s used in combination with Winston. Winston is able to transport logs to an external location, or query them when analyzing a problem.


"Helmet":
- Helmet can help protect your app from some well-known web     vulnerabilities by setting HTTP headers appropriately.
- Its a collecction of smaller middleware functions that are responsible for security-related http response.
- combination of 11 functions:
* csp sets the Content-Security-Policy header to help prevent   * cross-site scripting attacks and other cross-site injections.  * hidePoweredBy removes the X-Powered-By header.                 * hsts sets Strict-Transport-Security header that enforces secure (HTTP over SSL/TLS) connections to the server.            * ieNoOpen sets X-Download-Options for IE8+.                     * noCache sets Cache-Control and Pragma headers to disable client-side caching.                                             * noSniff sets X-Content-Type-Options to prevent browsers from MIME-sniffing a response away from the declared content-type.    * frameguard sets the X-Frame-Options header to provide clickjacking protection.                                         * xssFilter sets X-XSS-Protection to enable the Cross-site scripting (XSS) filter in most recent web browsers.

******Password Hashing******
not to use md5,hmac module.
only use bcrypt or crypto.pbkdf2
see article: https://www.zdnet.com/article/study-shows-programmers-will-take-the-easy-way-out-and-not-implement-proper-password-security/
* to use pbkdf2
https://nvlpubs.nist.gov/nistpubs/Legacy/SP/nistspecialpublication800-132.pdf
Why to use cookies:
https://dev.to/mr_cea/remaining-stateless-jwt-cookies-in-node-js-3lle#:~:text=Cookies%20are%20less%20susceptible%20to,more%20susceptible%20to%20CRSF%20attacks">Check Here.

******Use Of Slugify******
the main purpose of Slugify is to convert Your String into an URL (accroding to Medium).
Example If a string is : "A man walks on the Road"
[output]:  "A-man-walks-on-the-Road"
By Default it adds - but we can change it.
Here i have used to convert category name of blogs into well formated url it will help us:
* to find out any blog with given category.
* it will give us different keyword in single name like A, man , wailks etc, so that we can search variuos blogs on based of particular keyword.

https://mhagemann.medium.com/the-ultimate-way-to-slugify-a-url-string-in-javascript-b8e4a0d849e1
https://openbase.com/js/slugify


# Date 29/01/2021: 
* facing issue in sending cookies while deleting category**

# date 30/01/2021
* Got Stuck in setting title attribute (in frontend while showing tag and category list) on mobile browsers because it doesn't support.
* and Got stuck in setting DoubleClick event to delete tag and category form list.

# date 31/01/2021
* Created Blog Schema with title, body, and its relationship with other Schema like tags, categories,postedBy.
* A Blog has one to many relatioship with categories and tags, but not with user.
* A blog can have multiple category and tags, that is why we used array here. (one to many relationship).
* with user it has one-to-one relationship.
* A Blog can be written by a Single user only.

# date 01/02/2021
* Today i came to know about *CSRF attack* from client side to server side. 
* In this attack bascially our cookies plays an essential role.
* whenever client make request to login, the server verifies its email/username and password, then sends cookie as a token to client so that client need not to login again.
* In this time a attacker can send a malicious form link to get the cookies stored in browser, as client clicks that link our browser always send cookie in every request to server. In this way attacker stoles our cookie. Now attacker can do anything with our account with the help of cookie.
* like attacker can send money from user's account to his/her personal account by verfiying that cookie.
* Now to avoid this situation node uses a package called csrf through which it send csrf token to user which can't be accessed by any attacker.
* this is called **Cross-Site Request Forgery**
* More Info is available on Youtube
* Some coparison was also done to find out which package is good for handling the form data on server side.
1.
https://bytearcher.com/articles/formidable-vs-busboy-vs-multer-vs-multiparty/#:~:text=Multiparty%20is%20a%20fork%20of,Busboy%20for%20a%20faster%20alternative.
2.
https://www.sitepoint.com/forms-file-uploads-security-node-express/
* I found some package like formidable, multer, busboy, muliparty, but after comparison i found formidable is very useful since 2011.

# date 02/02/2021 :
* formidable's form.parse was not working. find everything to correct it. but could not get.

# date 03/02/2021 
* It was totally of my mistake, was giving json data instead of form-data in create-blog request then how formidable will parse json data. Resolved error by sending form-data. 
# date 04/02/2021
* I was confused that how to write blog content on frontend side. So i searched text editor for writing blog data in react or (react package for text editor), then after some time i found react-quill editor package in which we can get data as a html format, user can easily format their blog content.
https://github.com/loagit/Quill-Examples-and-FAQ#quill-faq
https://scriptverse.academy/tutorials/reactjs-rich-text-editor.html
https://www.youtube.com/watch?v=AgreDlNaUn4
https://vegibit.com/node-js-blog-tutorial/
https://codepen.io/alexkrolick/pen/xgyOXQ?editors=0010
https://github.com/michelson/dante2/issues/188 (can't use Dante2 package so used react-quill package)

# date 05/02/2021
* Worked on same thing, try to learn about extracting all content except html tags from blog data. For this found package string-strip-html.
* sent blog data from frontend to backend through postman api for testing.

# date 06/02/2021
* while using react-quill i found that it won't work as server side rendering is not false:
* so to remove this issue we will have to dynamically import {ssr:false} 
* https://github.com/zenoamaro/react-quill/issues/292

# date 07/02/2021
* Sunday- Diid nothing

# date 08/02/2021
* Today Sperated Blog with BloForm Component and sent dummy data from quill editor to database and saved that, return with success message. use of FormData class in frontent to handle form data.

# date 09/02/2021
* Today create a section to upload feature image of blog and also fetched categories and tags to show there. Today also found that aws-s3 is best place to upload images from frontend to server and save the provided link into database so that database remains good.

# date 10/02/2021
* Today all setup is done for writting a Blog, adding tags, adding categories and send them into database and save it and send a publish message to user.
* Read all blogs in the database, and test it through postman.

# date 11/02/2021
* with the help of ref in React, fetched updated state of child component into parent component.
* from blogForm (title and body part is sent to parent component with the help of ref in React).
* One more,state of photo was not updating, so when any change happened onUploading file, set formdata at that place, so no need to handle any extra state. 

# date 12/02/2021
* A post request for feching all the blogs, categories and tags
* Created a Component Headline for showing headline, did styling of it.
* make navbar fixed at top, did some css on them.

# date 03/03/2021
* Learn about SEO, created SEO for blogs page.
* https://neilpatel.com/blog/open-graph-meta-tags/

# date 06/03/2021
* Added Skip Factor to Load more Blogs. 