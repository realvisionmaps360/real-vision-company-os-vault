# **Extending Pano2VR with JavaScript and CSS: An Introduction**

# 

# **1.1 Introduction**

# **0:00**

# **Hello and welcome to this first episode of a tutorial series about extending**

# **0:05**

# **Pano2VR with JavaScript. My name is Thomas Breitenfeld and I'm a panoramic**

# **0:14**

# **photographer and a web developer as well and after 25 years of experience in both**

# **0:20**

# **fields I love it to create complex Pano2VR projects matching my own ideas**

# **0:29**

# **or the needs of my clients. With Pano2VR's JavaScript API you can extend**

# **0:39**

# **standard projects like this one I have prepared for you here for this tutorial with a lot of new features which are going far beyond the capabilities**

# **0:50**

# **Pano2VR has in its app in the main app or in the skin editor and you can**

# **0:57**

# **massively boost the possibilities you have by using standard web technologies**

# **1:02**

# **like JavaScript or some JavaScript frameworks to extend the feature kit you**

# **1:09**

# **have with your work in Pano2VR. This tutorial is the first one of a larger**

# **1:17**

# **planned series and the goals of this introduction, the basic tutorial, is to**

# **1:25**

# **get you familiar with the structure of the web output Pano2VR creates to**

# **1:32**

# **understand what files are in this web output folder and how are they working**

# **1:39**

# **together and where you can get a grip on the internal data Pano2VR provides**

# **1:45**

# **to you or where can you manipulate a Pano2VR project while it's running in**

# **1:50**

# **the browser of the visitor. This tutorial is meant as a solid primer for**

# **1:59**

# **everybody who is not familiar with web technologies. If you have some web dev**

# **2:05**

# **skills then you can easily skip this tutorial as I don't tell you anything**

# **2:11**

# **really new here and for everybody else this is a basic to get a grip on the**

# **2:18**

# **autonomy Pano2VR projects have and where you can intervene to do your own**

# **2:26**

# **things with a project Pano2VR creates. Let's now have a closer look on what**

# **1.2 What’s the Goal?**

# **2:34**

# **you can achieve with extending Pano2VR using its JavaScript API. To not**

# **2:41**

# **talk too much let's have a look on some real examples. I have prepared for you**

# **2:48**

# **let's have a look at this one. Here we have a Pano2VR project which**

# **2:54**

# **consists of four nodes and here we have some custom fonts integrated. This can be**

# **3:05**

# **done in the skin editor. Meanwhile the project is a little bit older. They're**

# **3:10**

# **made with version 6 so we need some extra tricks to get external fonts**

# **3:15**

# **running on a project but I have transferred this project to 7 by**

# **3:20**

# **showing the main thing you have here with this footer bar. Here we have a**

# **3:27**

# **short description and a title on the bottom of the page. This is changing when**

# **3:33**

# **you go to another node and this is showing the current node here in this**

# **3:40**

# **tab bar and if you head over to the fourth room you see this and this is not**

# **3:46**

# **only a one direction interaction it is also in both directions. If you click**

# **3:52**

# **here the panel is changing and also here and the text here is changing as well**

# **4:00**

# **and one thing this example provides is this section here in the bottom of the**

# **4:09**

# **page. This is not made in the skin editor it's a separate part of the page and it**

# **4:16**

# **is made with a very popular front-end or user interface framework called**

# **4:21**

# **bootstrap which brings a lot of styling features with it and it is very simple**

# **4:28**

# **to understand and very simple to apply and it's working together with Pano2VR**

# **4:35**

# **using the JavaScript API. Bootstrap is a combination between CSS and JavaScript**

# **4:44**

# **they are working together to achieve a lot of interactive features and layout**

# **4:49**

# **functions and so on and in this example I combined a tabbed content with four**

# **4:57**

# **tabs and a content box below interacting with the Pano2VR output and we**

# **5:03**

# **also have some links these are not web links but they are links moving the**

# **5:10**

# **panorama to some points of interest within the nodes. So here in the stone hall you can have a look at the piano it's a very simple example or here in**

# **5:20**

# **the big hall at the beginning of the tour you can point the user's interest**

# **5:26**

# **to to the ceiling which he may not see on the first glance and having a look to**

# **5:33**

# **this fantastic painting on the ceiling this is one example with the combination**

# **5:39**

# **of Pano2VR with a JavaScript CSS framework which is very popular**

# **5:45**

# **bootstrap is originally invented from by the Twitter guys in former years and it**

# **5:52**

# **is open source and an own development of its own in between is extremely popular**

# **5:58**

# **and very much websites are using this framework we get to this in detail in a**

# **6:06**

# **later tutorial and the next example is a problem which is pretty frequently when**

# **6:12**

# **I'm have a look at Facebook or the forums concerning Pano2VR extensions**

# **6:18**

# **and image gallery which is triggered by a hotspot is a very popular problem you**

# **6:24**

# **can easily solve it by doing this in the frame here as a separate Pano2VR**

# **6:30**

# **project but it's a little bit over complicated and if you want to have it a little bit sleeker then you use a JavaScript generated gallery and there**

# **6:41**

# **you have some features where you can swipe the images and you can create**

# **6:47**

# **slideshows and with very few lines of code you can create these gallery**

# **6:53**

# **hotspots they are triggering a JavaScript gallery which is thrown in a pop-up window and skin is a skin editor and it's a very nice example for**

# **7:03**

# **interaction with external JavaScript using the JavaScript API in Pano2VR**

# **7:10**

# **and one last thing is a more advanced project this is the Palace Garden in**

# **7:17**

# **Vienna the Schönbrunn Palace Garden and there we have a lot of antique statues**

# **7:24**

# **here at the both ends of this big place here in the center of the park and you**

# **7:35**

# **see all these statues here there's a some on the east side and some on the west side and these two is a little walk along these west side statues and the**

# **7:48**

# **special thing here is up to here it's pretty normal Pano2VR project but we**

# **7:55**

# **have some special stuff here if you click on one of these hotspots above**

# **8:01**

# **the statue you get some information some content this content is combined with a**

# **8:08**

# **black and white photo I've I did on location additionally to the panorama**

# **8:16**

# **images and the text you get here it is directly loaded from Wikipedia and this**

# **8:25**

# **is an external data source and this is a very powerful feature you can add with**

# **8:32**

# **JavaScript to Pano2VR projects and this is a pretty advanced project in a**

# **8:40**

# **upcoming tutorial where you learn how to use these interfaces you can have to**

# **8:49**

# **external data sources to feed data even images into a Pano2VR project in the**

# **2.1. Short look at the tour example**

# **8:58**

# **next few sections of this tutorial let's have a look at the output anatomy of**

# **9:06**

# **this project I've prepared for you I've shown it already and this is your result**

# **9:12**

# **you get in the web browser and now let's go to Pano2VR to analyze how it's**

# **9:20**

# **made of and what's configured specially the project is pretty normal nothing**

# **9:26**

# **special just for showing the output structure of Pano2VR we have a normal**

# **9:32**

# **HTML template using here and I have a standard output folder and I had a copy**

# **9:39**

# **of the Venice skin made here let's have a close look at this at the**

# **9:46**

# **modifications I made later and now we have here a simple floor plan as an area**

# **9:56**

# **overview and you see this is here a simple image and the hotspots are set**

# **10:05**

# **manually that's not geographically exact doesn't need to be and here we have our**

# **10:11**

# **four points and the connections between them it's a little bit curvy as it's not**

# **10:18**

# **a geographic exactly representation of on how the points are located if you're**

# **10:25**

# **going to the world map you have no geodata attached it's just visually made**

# **10:32**

# **here and this map is introduced in the skin so for this I use the Venice skin**

# **10:40**

# **let's open it and here we have the only modifications here is the floor plan in**

# **10:47**

# **the Venice skin you have on full screen contents a larger map and you have a floor plan contents is a smaller map and this is full screen map and this is the**

# **10:57**

# **little map in the corner and the only thing I changed here was to disable the**

# **11:06**

# **radar because it doesn't make any sense as it isn't a flat map with a view from**

# **11:11**

# **above and then I changed the map in a little bit other styling and so on it's**

# **11:17**

# **everything I've done here everything is left as it was provided in this factory**

# **11:25**

# **skin when I'm now hitting the cogwheel button or press command option G to**

# **11:33**

# **generate an output in this folder then panel to VR does its magic and provides**

# **11:39**

# **a lot of files to make a working a project the visitor can view it in the**

# **11:44**

# **browser now let's have a look at it and so let's change to the finder and having**

# **11:53**

# **a finder window grabbing it to here so here it is and here we have our project**

# **12:03**

# **this is the part of the our project this is a modified Venice skin I stored it in**

# **12:08**

# **the project directory hence the dollar D sign here usually it's a way to go not**

# **12:16**

# **to alter skins in the main skin folder of the program but save edited copy**

# **12:22**

# **along with your punitive ER file to keep things tidy and together so everything**

# **12:30**

# **is familiar here there's some graphic files this is a my aerial map I used for the 3d map here and some material and here we have the output folder and**

# **12:43**

# **that's what we need to discuss in detail what all these files are doing all these**

# **12:52**

# **files are generated automatically by punitive ER and the main parts is the**

# **12:59**

# **index HTML this is effectively the page the user is calling in his browser and**

# **13:06**

# **the other files of importance are the player itself this is a panorama the**

# **13:13**

# **penalty our player it's a JavaScript file doing all the magic this is the**

# **13:19**

# **center it's a main engine doing all the stuff and everything is connected to**

# **13:25**

# **this file so HTML file loads it and then we have the skin JS file it's a**

# **13:32**

# **JavaScript file which builds up the skin in the browsers window of the visitor in**

# **13:40**

# **the tiles folder you have the images of all nodes it is several zoom levels and**

# **13:46**

# **several cube face sizes and the two XML is the structural representation of the**

# **13:53**

# **tour which node is where what's the name where's the user data how they are connected where are the hot spots located this is effectively the**

# **14:02**

# **description the technical description of the tour but let's discuss this later in**

# **14:08**

# **detail before I have prepared some slides about the basic structure of a**

# **14:17**

# **panel to VR file and how it's working**

# **14:22**

# **in these slides I am going from the origin here we have some panoramas they**

# **14:31**

# **are meant to be assembled to a virtual tour with part of the arm and here is**

# **14:40**

# **the program which is imported here is the Pano2VR app which imports the**

# **14:47**

# **panoramas and serves as a control center for everything else after this we have**

# **14:58**

# **an export function so it is the output the panels are the input and the web**

# **15:04**

# **output is one of the possible outputs of monitor we are and that's what's on our**

# **15:10**

# **scope here these interactive web output these export what this is in detail this**

# **15:18**

# **is a topic of this tutorial and let's have a closer look to this what is it**

# **2.2. Let’s inspect the output folder**

# **15:26**

# **made of. So if I go to my next slide and we have this**

# **15:32**

# **output on the right side the export and it is consisting first of the HTML file**

# **15:38**

# **normally the index HTML then we have the JavaScript part usually consisting of**

# **15:45**

# **the player itself and the skin files these are two JavaScript files and**

# **15:51**

# **finally CSS CSS normally isn't shown as a separate file as it's generated from**

# **16:00**

# **the skin JS JavaScript has ability to generate code as CSS code and HTML code**

# **16:08**

# **as well that is one of its superpowers and so the CSS files aren't necessary**

# **16:16**

# **you can use them but you don't need to as the JavaScript especially the skin**

# **16:23**

# **JS is doing it for you let's have a closer look and these files and here we**

# **16:32**

# **see what is planet we are exporting we have general files which are consisting**

# **16:38**

# **of HTML and CSS and JS files and we have of course JPEG files image files they**

# **16:46**

# **are the image content of the panorama tour and we have an XML file which is usually**

# **16:53**

# **named tour XML or something else this is only one file and this file as I said**

# **16:59**

# **before is describing the whole structure of the tour where the panoramas are**

# **17:04**

# **living there's a call this is a container for user data it is the**

# **17:10**

# **description of all hotspots and the technical layout where the hotspots are**

# **17:16**

# **located inside of the image spheres and so on and the next files we have media**

# **17:24**

# **files these can be JPEGs or let's say image galleries or PNGs also map files**

# **17:32**

# **can be JPEGs or PNG files then we have a lot of buttons and interface elements**

# **17:37**

# **these are SVG files this is vector graphics they can be integrated in to**

# **17:43**

# **the JS files of the skin JS you can configure this but they can be separate**

# **17:50**

# **files as well and the next section of files is really media files as PDFs for**

# **18:00**

# **download and display mp4 files for videos or mp3 files for audio these are**

# **18:06**

# **loaded by let's say by hotspots or by some skin functions and these are**

# **18:11**

# **additional and optional files you have here in this file output this is what**

# **18:16**

# **really is generated by a Pano2VR when you hit the export button the**

# **18:23**

# **generate button with the cogwheel up to now we have a bunch of files output it**

# **18:30**

# **by a Pano2VR but now we want to know how these files are working together and**

# **18:39**

# **let's have a look at the first file this is the HTML file the HTML file is the**

# **2.3. Web tech foundation of Pano2VR**

# **18:48**

# **container it works like a general structural description how the page is**

# **18:56**

# **built in the browser and what is loaded furthermore to build up the whole tour**

# **19:03**

# **let's have a car as a symbol for what these files are doing the HTML file**

# **19:13**

# **delivers a rough structure and let's see it as the exterior of a car that's a**

# **19:20**

# **mechanical basic construction where everything else is built in let's go**

# **19:26**

# **further and we have JavaScript JavaScript adds functionality and**

# **19:32**

# **interactivity to a HTML page it can manipulate the page it can react to**

# **19:40**

# **events it can react to mouse interactions it can change the structure**

# **19:46**

# **it can show and hide stuff and let's compare this JavaScript file with wheels**

# **19:53**

# **and all the moving parts of a car and litarally with everything a car needs to**

# **20:00**

# **move the CSS file is responsible for the look of a HTML file and it can be**

# **20:09**

# **embedded into the HTML file and can be changed by the JavaScript file and let's**

# **20:15**

# **compare it we see the outfit of a car with the surface and all the aesthetic**

# **20:21**

# **details and these CSS files are also responsible for the layout of a page**

# **20:27**

# **for the exact measurements of boxes and for the colors used and for the fonts**

# **20:34**

# **used and last but not least let's take the tour structure the XML file and this**

# **20:41**

# **is kind of a wiring diagram where all the electricity inside of a car is**

# **20:47**

# **descripted and last but not least we have the JPEG files mainly the panoramic**

# **20:54**

# **image content which is visible for the visitor in the browser after having a**

# **21:02**

# **look to the basic purposes of the outputted files Pano2VR creates in an**

# **21:09**

# **an output folder of a tour now let's have a look how these files are working**

# **21:15**

# **together first we have the index HTML this is the initial page load we have**

# **2.4. Pano2VR flowchart**

# **21:22**

# **the first file which needs to be completely loaded to have everything**

# **21:27**

# **else following and when this index HTML file is loaded completely it's very**

# **21:35**

# **small so the loading process should be very fast after that it's loading the**

# **21:42**

# **player.js or Pano2VR underscore player and this is the main engine and it is**

# **21:50**

# **loaded by the index HTML so this is definitely always a second file being**

# **21:57**

# **loaded maybe some others are loaded before but this depends on the HTML**

# **22:03**

# **template you are using but the first important main file is the Pano2VR**

# **22:08**

# **player.js this is responsible for loading the first Pano images or**

# **22:13**

# **generally loading images they are loaded not with a call you making in the**

# **22:20**

# **browser but it's loaded by the JavaScript in the player so this player does this loading job for all images after this the skin.js is loaded and**

# **22:34**

# **this skin.js is kind of a blueprint for the complete user interface you have in**

# **22:41**

# **the skin with all your buttons or if you have menus or cloners or maps or your**

# **22:49**

# **control interface everything is added by skin.js and all hotspots you define in**

# **22:57**

# **the skin editor they are built by skin.js and put it and their respective places**

# **23:03**

# **and integrated into the HTML page dynamically when the panorama is running**

# **23:11**

# **and moving and they are newly added when you enter a new node all this stuff is**

# **23:19**

# **done by the player together with skin.js the index HTML has a blueprint and**

# **23:28**

# **master file this is a ggt file usually normal.ggt and this is a garden gnome**

# **23:35**

# **template is extending for it and this file is the scaffolding for the index**

# **23:43**

# **HTML and here you have all descriptions and all structural technical data you**

# **23:50**

# **need to build this index HTML or the Pano2VR output has this description**

# **23:56**

# **when the player is loaded after that the tour.xml is loaded by the player and the**

# **24:04**

# **tour.xml is getting all the infos for the tour layout for the linking of the panoramas where are the hotspots to find and the pano images loading directives**

# **24:14**

# **for the player the tour.xml says okay when I'm going to node 20 then**

# **24:21**

# **please load the images for node 20 this is the player doing after reading tour.xml**

# **24:28**

# **so it's kind of the blueprint for the whole tour after these directives the**

# **24:35**

# **player got from tour.xml the player is loading the panorama images from the**

# **24:40**

# **respecting subfolders in the tiles folder that's the operation sequence for**

# **24:45**

# **the tour itself all these informations are coming from the Pano2VR file**

# **24:53**

# **itself that's what you're doing in the main app of Pano2VR the skin editor**

# **25:00**

# **generates the skin.js when you hit the export button the generate button and the skin.js generates CSS code in the browser of the user as a standard we**

# **25:11**

# **have no external CSS files in a Pano2VR output as this CSS is built**

# **25:18**

# **dynamically from skin.js in the browser of your visitor so it's generated and**

# **25:25**

# **everything what's happening here is described in the GGSK file the skin**

# **25:31**

# **file you have so these three files on the right side are describing how these**

# **25:38**

# **loading and working sequence is running when the user is loading the index.html**

# **25:45**

# **file in his browser why I'm telling all this the sequence is pretty important as**

# **25:53**

# **you need to know when certain parts of the project are loaded and operating if**

# **26:02**

# **you load some stuff too early especially when you're loading JavaScript too early**

# **26:08**

# **and the rest of the project isn't available yet then you get error messages so you need to make sure that you manipulate let's say as an example**

# **26:20**

# **if you like to manipulate something in the skin dynamically then you need to be**

# **26:27**

# **sure that skin.js has it the job completely done you shouldn't do anything earlier than this moment so this operating sequence is pretty**

# **26:38**

# **important to understand when you want to manipulate stuff with using the**

# **26:44**

# **JavaScript API of Pano2VR. After having a look at Pano2VR's export and**

# **2.5. The HTML page**

# **26:53**

# **after having a look to the files inter operation and loading sequence now let's**

# **26:59**

# **have a closer look to the files themself how they are built up and what they are**

# **27:05**

# **doing in detail what we see here in these projects output in the browser is**

# **27:12**

# **the index.html I mentioned before how is this file looking like you can have a**

# **27:21**

# **look at tools browser tools and you page source or command you and then you'll**

# **27:30**

# **see the code Pano2VR is generating. You can look at it here it is pretty**

# **27:38**

# **complicated you don't need to understand it at this point and there's**

# **27:44**

# **additionally some stuff here for the live preview which is not exported for real projects when you using them on production on your website or somewhere**

# **27:53**

# **else. Here you see the Pano2VR player loaded the skin.js loaded here some**

# **28:00**

# **mapping files which are added if you're using a map based on VFLAT. Some player**

# **28:09**

# **files you load from Vimeo or YouTube depending on you have a YouTube or Vimeo**

# **28:14**

# **player in your skin what's the case in the Venice skin there is standard**

# **28:20**

# **YouTube and Vimeo player built in and if they built in they load the libraries**

# **28:27**

# **from YouTube of a Vimeo no matter you using them or not. This is only a view of**

# **28:33**

# **the so-called source code you can have it a little bit more structured and**

# **28:39**

# **better to understand if you use the browser developer tools. You can use the**

# **28:48**

# **shortcut alt command I or alt command C because these shortcuts are different**

# **28:56**

# **from browser to browser. What's working in most browsers is just hitting the F12**

# **29:02**

# **key and so you can have the so-called web developer tools. Let's have a first**

# **29:08**

# **view on it I will tell about this later a little bit more and here we see some**

# **29:14**

# **basic messages when the file is loaded the version of the Pano2VR player and this is for the live view this is not happening on production side but only**

# **29:26**

# **during development and in this console it is your main instrument to talk to**

# **29:34**

# **this project here you can make inputs and here you get outputs if you want and this console the browser console is a very important instrument to work with**

# **29:44**

# **the JavaScript API of Pano2VR. The inspector shows the details of the code**

# **29:51**

# **but it's highly interactive it's combined with CSS so you can have a look to elements here and to inspect elements so let's say you want to look how**

# **30:03**

# **is this thumbnail menu built right mouse click and look at inspect and you are**

# **30:10**

# **pointed to this element you can unfold it and you see the scroll area you will**

# **30:17**

# **recognize and remember some stuff you had inputted in the skin editor or**

# **30:23**

# **ggskin underscore SVG is usually image file here's a closing cross here you see**

# **30:29**

# **the file data and the positions here you see the so-called inline CSS these**

# **30:36**

# **everything what's mentioned here in the style tag this is a CSS the skin.js is**

# **30:43**

# **adding to position elements to control the look and feel of all these**

# **30:48**

# **internet interface elements and everything is embedded into this HTML**

# **30:55**

# **structure and if you compare this file with the Command-U with the HTML code**

# **31:03**

# **which is effectively loaded by your browser then you will see you have this**

# **31:11**

# **tag called div this is a container it's called container it is 100% wide and**

# **31:19**

# **width and height of the browser \*window and this container is originally empty**

# **31:26**

# **there's only put a short sentence loading and this is the area where**

# **31:33**

# **everything is happening and skin.js does nothing else than to replace this**

# **31:39**

# **content with the whole tour and if you now unfold the container something**

# **31:46**

# **completely different is in there and here you see everything the player is**

# **31:52**

# **doing the viewer the hotspots and so on and the hotspot text these are elements**

# **32:00**

# **generated by skin.js and most of them especially the hotspots are regenerated**

# **32:07**

# **in in the moment I'm changing the node everything inside of this section is**

# **32:13**

# **completely newly generated so this is the HTML page with all the stuff which**

# **32:21**

# **is generated by skin.js and by the panorama player inside of this HTML**

# **32:28**

# **basic structure after having a closer look to the HTML file and the HTML**

# **32:35**

# **structure let's now have a look at the two JavaScript files which are important**

# **2.6. The JavaScript files**

# **32:43**

# **for the tour working and we have a skin.js and the pano2vr player.js let's**

# **32:52**

# **have a look at these files we can do it easily with command U and then we have**

# **32:59**

# **some links we just need to click hit the command button to open in the new tab**

# **33:06**

# **this is a pano2vr JavaScript player as this is a main engine it is protected**

# **33:12**

# **and encrypted you cannot read something meaningful from it that is compacted**

# **33:19**

# **and encrypted and here's my license is in the comment on the top of the page**

# **33:25**

# **and everything else you cannot understand it's just working the next one is the skin.js it is much more interesting for us as it builds up the**

# **33:35**

# **complete skin and interface and user interface elements and hotspots so here**

# **33:41**

# **you see just quick scroll through it here you see all the variables defined**

# **33:47**

# **you have in the general page of the skin editor and some basic objects defined**

# **33:53**

# **and then everything here is built up step by step the word me is the skin**

# **34:01**

# **itself and here you see some elements built up and if you read along here you**

# **34:10**

# **see some CSS files built up you see some element names you will remember from**

# **34:17**

# **your skin editor elements they usually start with an underscore and here control the right is a skin element and then everything is attached here styles**

# **34:28**

# **and events as well it's a pretty complicated file and it is as I said**

# **34:35**

# **before it's kind of a blueprint to build up the skin in the users browser it's**

# **34:42**

# **not delivered readily from the server but it's built up on runtime in the**

# **34:48**

# **user's browser and as the skin is JavaScript generated you have an object**

# **34:57**

# **you can see and manipulate and you can ask questions to get some data from it**

# **35:03**

# **and these objects are accessible in the console tab of your web developer tools**

# **35:09**

# **if you type panel and you see panel to VR panel player and you see panel is an**

# **35:15**

# **object if you add a dot then you can see some stuff you maybe have read about in**

# **35:24**

# **the documentation of the JavaScript API of Pano2VR so here you can see**

# **35:29**

# **values and events and everything you basically anything you can do in the**

# **35:38**

# **panel to VR main app can be done here with JavaScript and a similar object**

# **35:45**

# **like pano is the object skin and if you enter after skin a dot starting with an**

# **35:53**

# **underscore you can see the elements and can ask some properties and so only can**

# **36:04**

# **define can see okay how far is it away from the top of the page or client**

# **36:11**

# **topic is zero pixels and so on and we get into deeper details in a later**

# **36:19**

# **tutorial where we analyze these objects and what you really can do with them**

# **2.7. The tour XML file**

# **36:27**

# **another file exported by Pano2VR I mentioned before is the tour XML file**

# **36:33**

# **and this file isn't directly accessible from the HTML page because it is not**

# **36:41**

# **loaded here you see it here and it is a process in this line let's talk about**

# **36:51**

# **shortly the read config all I think it is a process of the player which calls**

# **36:58**

# **this tour XML file and reads its content so he gets it as you mentioned**

# **37:04**

# **directive to load images and nodes and so on it is a so-called method it's a**

# **37:10**

# **process attached to this panorama player object and we can use it and we can**

# **37:16**

# **disable it and manipulate these two XML file externally that's a pretty nice**

# **37:21**

# **entry point for large projects where the tour XML isn't generated any more for**

# **37:29**

# **Pano2VR but let's say for an external database you can just copy it**

# **37:35**

# **and add it here in the browser and you can just have a look at it in the**

# **37:41**

# **browser and an XML file is consisting of tags you can define the structure**

# **37:48**

# **completely by your own purposes and here you see the panorama ID and the input is**

# **37:54**

# **dealing with images and here's you see the zoom levels and here's a preview**

# **38:01**

# **image and the input is finished and now it starts a view parameters where it's**

# **38:06**

# **north and so on what's a default view and here we have the user data with all**

# **38:14**

# **stuff in it and the map coordinates you have on the floor plan and here you have**

# **38:21**

# **the hotspot sections not very much it's only one hotspot here transitions and so**

# **38:27**

# **on and so on here starts the next panorama and so on and after the**

# **38:33**

# **panoramas finished you have here the hotspots for the maps and a master node**

# **38:40**

# **and so on when all structural data is described here this file isn't that**

# **38:48**

# **important if you use the JavaScript API but sometimes it can be helpful and you**

# **38:54**

# **can do a lot of manipulations if you read the tour XML file by your own**

# **39:01**

# **processes in your own JavaScript and then make the panorama player load this**

# **39:06**

# **XML which is processed by you and your processes you designed for manipulating**

# **39:14**

# **stuff but the main purpose of this process is especially if you want to**

# **39:19**

# **translate the tour and you don't want to use a process for translation**

# **39:24**

# **Pano2VR provides and so it was usual to translate Pano2VR 6 projects**

# **39:31**

# **due to its lack of the translation function to do this by manipulating the**

# **39:37**

# **tour XML file translating all text content and then let the Pano2VR player read in this manipulated XML code you can do a lot of stuff with it but**

# **39:48**

# **it's pretty complicated and partly it's not necessary anymore as Pano2VR 7 has this built-in translation function last but not least in this section let's**

# **2.8. CSS inline styles**

# **40:02**

# **have a look at CSS and the CSS inline styles generated by Pano2VR in the**

# **40:11**

# **skin editor and its output let's have a look at this element here it's a header**

# **40:17**

# **and we can inspect it and let's have a look how it's built up so we have here**

# **40:25**

# **this upper container and we have a rectangle it is obviously the background**

# **40:31**

# **as it is an RGBA value which is three color values and one alpha value for the**

# **40:39**

# **opacity you can see it is semi-transparent here and the container**

# **40:44**

# **itself has 60 pixels height and you can now find this element and compare what's**

# **40:53**

# **here inserted from the skin JS as already CSS code and let's now go to**

# **41:03**

# **Pano2VR and to the skin editor and head over to the header here and we have**

# **41:14**

# **here this element and it is 60 pixels high and here we have the header**

# **41:24**

# **background and you see these values 100% 0 0 but here it's really easy to**

# **41:32**

# **recognize here 60 pixels 100% width and you see it exactly here 60 pixels and**

# **41:40**

# **100% width and what's nice with this function you only do not only can read**

# **41:46**

# **this but you can manipulate it on in the browser directly if you use the cursor**

# **41:52**

# **keys now you can say okay how it's looking when it's 60 70 pixels wide you**

# **41:58**

# **can really test it in real time and if it's fine you can edit in the skin**

# **42:07**

# **editor and you can okay let's take 70 pixels here safe and then it's updated**

# **42:16**

# **in the live view and now we have 70 pixels here if you re-inspect it then**

# **42:23**

# **you see here the container we have now these 70 pixels so you can identify skin**

# **42:30**

# **elements and their styles in these web development tools in the browser and set**

# **42:36**

# **them in relation to everything you did enter in the skin editor the skin**

# **42:43**

# **editor can be seen in two parts this is building up the object you can address**

# **42:51**

# **in the console with skin point and so on and everything what you're seeing here**

# **42:57**

# **is inserted as inline CSS to the elements in the HTML structure you see**

# **43:04**

# **here so this is definitely this is basically the two jobs these the tree**

# **43:10**

# **view and the properties box are doing when you look at the results of the code**

# **43:16**

# **Pano2VR exported for the web display in this section of our tutorial let's**

# **3.1. First look on the JavaScript API**

# **43:25**

# **have a first closer look on Pano2VR's JavaScript API before I**

# **43:30**

# **continue let's explain what an API is and what it does API is an acronym but**

# **43:36**

# **stands for application programming interface and it's a mechanism to make**

# **43:45**

# **an object of any software available for communication from and to itself so we**

# **43:55**

# **have two objects here in Pano2VR the first object is a panorama player mostly in as an object named pano and the second object is skin and so it's**

# **44:09**

# **also a named skin and these objects can communicate from inside out and from the**

# **44:16**

# **exterior to the interior also in both directions in other words objects have**

# **44:23**

# **properties and objects have methods methods are procedures functions so the**

# **44:33**

# **object can do anything or you can do something with the object and the**

# **44:39**

# **properties is how the object looks like acts like and so on and the other the**

# **44:46**

# **third thing to mention when it comes to an object is they can have children kind**

# **44:52**

# **of sub objects these sub objects are usually notated with a dot after the**

# **44:58**

# **name so panel dot and then we have either sub objects or either methods or**

# **45:07**

# **either properties we will have a closer look on this a little bit later and this**

# **45:14**

# **JavaScript API of Pano2VR is documented for us for with a human**

# **45:20**

# **readable documentation on the other hand if we switch to the browser console when**

# **45:26**

# **we have the browser here in this window and I hit the f12 key then we have the**

# **45:32**

# **console opening and if I type pano then you'll see there are coming some**

# **45:39**

# **suggestions so Pano2VR player and the pano object and here we get a**

# **45:46**

# **preliminary result it changes as we type and the object usually starts with its**

# **45:53**

# **sub objects or anything else with curly braces and everything else is inside of it and if I type in the next character as a dot then I get a suggestion list**

# **46:06**

# **what is available there are some cryptic vocabularies here and some elements and**

# **46:13**

# **items with a dollar sign in front of it and then there is some stuff coming which**

# **46:18**

# **sounds familiar add hotspot this is a method to add a hotspot to a panorama or**

# **46:25**

# **let's scroll a little bit down there's a lot of cryptic stuff you know it's not interesting for us but here change field of view it's a function a method to tell**

# **46:38**

# **the pano object to change the field of view and we have also the skin object**

# **46:45**

# **and the skin object if we type a dot afterwards we get our elements with**

# **46:53**

# **usually starting with an underscore and these objects and the methods they have**

# **46:58**

# **are available in the console and we can type stuff here to tell something to the**

# **47:07**

# **panorama but we also can get information from the panorama and we will check this**

# **47:12**

# **in detail in the next few sections of this part of the tutorial and this API**

# **47:19**

# **is not only documented with human readable documentation we have here in**

# **47:26**

# **the Pano2VR JavaScript API I come back to this page later because it's**

# **47:31**

# **very important and also an object if it's set up this way and upon it to be**

# **47:40**

# **our is set up this way it reveals itself its properties its methods and its**

# **47:47**

# **children elements in the console just by typing okay the skin object it is known**

# **47:53**

# **to the browser and the browser can dig deeper into it and it's a very nice**

# **47:59**

# **method to discover or to explore an object is first to type it in the console and then dig down by using dots or choosing elements from the suggestion**

# **48:10**

# **list now let's set up a first very simple example and I go to the**

# **3.2. Simple API usage**

# **48:21**

# **Pano2VR skin editor and let's have a look at the tree nothing is selected that's what**

# **48:29**

# **I want and let's have the general variable list we have here and let's**

# **48:34**

# **choose the variable with floor plan or with map one of them and let's memorize**

# **48:44**

# **it and then go to the browser and we let's check how we can get this variable**

# **48:54**

# **from inside of the Pano2VR player object let's start typing panel**

# **49:00**

# **dot and we now get a suggestion list and if you want something to know from an**

# **49:10**

# **object most programmers it's not mandatory but most programmers do it as**

# **49:16**

# **a good style if you want to know something of an object usually the**

# **49:21**

# **function begins with get and if you want to manipulate something it is starting**

# **49:27**

# **with set we will see that it's also here the case with part two we asked JavaScript API and let's type get and let's continue with a V and now we have**

# **49:42**

# **get variable value and you see when it is chosen here in the list and I click**

# **49:50**

# **on it so it turns green so this variable value function is ready for us to use as**

# **49:56**

# **I want to do something with the pano object it is a function it's a method**

# **50:02**

# **and though it suggests here is a function and a function most the time it**

# **50:08**

# **needs an argument so we have to type normal braces and now let's type the**

# **50:16**

# **name of the variable I want to know is map it is false let's change to the skin**

# **50:28**

# **editor and let's have a look what we have can else check with thumbnails for**

# **50:35**

# **example as we have the thumbnails menu open let's type it thumbnails and it is**

# **50:47**

# **true so this variable says us the thumbnail menu is open if I close it and**

# **51:00**

# **just delete the last character and then reenter it so that it's we get a refresh**

# **51:10**

# **of this variable and it's false so there is a way to get some information from**

# **51:20**

# **the panorama from inside to the outside so this is the one way we can get**

# **51:29**

# **information from within the panorama object or from within the player to**

# **51:34**

# **outside so I can get a grip on all variables I have in the panorama player**

# **51:42**

# **available also we have some general properties like get field of view for**

# **51:50**

# **example you won't get a value here but if you type the curvy braces here then**

# **52:00**

# **you have the value of 70 degrees and if I zoom in a bit and delete the last**

# **52:11**

# **brace then we get a new value the other way around if you want to tell the**

# **3.3. Set a skin variable from outside**

# **52:20**

# **panorama something from outside or send commands into it then we try to use the**

# **52:27**

# **opposite so let's have the panel object dot and let's have a variable function**

# **52:38**

# **which allows us to set a value inside of the panorama from outside from the**

# **52:43**

# **console if you are looking for some function or something you need to do**

# **52:50**

# **something with the panorama object with the panel object then you can use a JavaScript API it is in the documentation and reference at the end**

# **53:01**

# **and the JavaScript API you will find it's only one page so you can have full**

# **53:06**

# **text search on this page I'll just type command F and let's have variable and**

# **53:14**

# **okay some typos not that fine and here you get some skin variables get**

# **53:22**

# **variables that was the stuff we did in the section before and set variable here**

# **53:29**

# **you get a documentation how it's written what function expects here it expects a**

# **53:36**

# **string string is just a sequence of characters in opposite to numbers which**

# **53:43**

# **are only numbers and you can calculate with and the third type of variable we**

# **53:49**

# **are using here are boolean cities it's a variable bit which can be only true or**

# **53:55**

# **false you see if you want to get a variable you only need the name of this**

# **54:03**

# **variable as a string if you want to set a variable you see if you have the**

# **54:08**

# **function set variable value you need us first you need to name of the value you**

# **54:14**

# **want to set and then you value you want this variable to be set to and let's try**

# **54:21**

# **it now in the console and let's just get this variable we have here so set**

# **54:33**

# **variable please keep in mind these variables on these functions or**

# **54:38**

# **everything you type in JavaScript is case-sensitive so set variable need to**

# **54:46**

# **be written exactly like that so set variable value and you first need let's**

# **54:53**

# **take the variable from above with thumbnails and now you need a comma and you**

# **55:03**

# **need the value as with thumbnails is a boolean variable let's have a look here**

# **55:12**

# **true false this is one of these three types numbers text Texas string numbers**

# **55:18**

# **and you have here true false it's a boolean variable and now it expects true**

# **55:26**

# **please mind it is typed without apostrophes so if I now hit enter it sets**

# **55:35**

# **these variables to true and you see the thumbnail box pops up it makes it**

# **55:41**

# **visible so you have an external control of elements inside of the panorama player**

# **55:48**

# **or inside of the skin these variables here are attached to the skin but you**

# **55:54**

# **can set them and read them by the pano objects they have some methods and some**

# **56:00**

# **constructions in common it's a convention inside of Pano2VR that the variables are attached to the pano object while they are in fact skin**

# **56:11**

# **variables but as I interact with the pano player and the pano player is highest director in this theater here it is running with a pano object and we**

# **56:23**

# **have now a two-way communication into the panorama and from the panorama and**

# **56:30**

# **you can set values and you can read values to get information what's happening inside of the panorama or you can control it from outside and this**

# **56:39**

# **controlling from outside is a very very powerful feature well it's nice to have**

# **56:45**

# **the console and the direct access to the JavaScript API of Pano2VR available**

# **56:52**

# **in the browser let's now move to a little bit more practical example with**

# **56:57**

# **having a skin element talk to the console or to throw an alert so**

# **3.4. Use JavaScript in the Skin Editor**

# **57:05**

# **something which is not done by typing in the console but it's working from inside**

# **57:10**

# **the PanoVR object and let's now turn to the skin editor and I want to**

# **57:20**

# **have a little button in the upper left corner let's just take a little text box**

# **57:31**

# **and let's make it center center and some radius so it looks a little bit nice**

# **57:39**

# **hand cursor and so on and instead of text we type test and just have a look**

# **57:48**

# **what's doing it here I save it and the live review should give us this button**

# **57:57**

# **it's doing nothing so let's add an action to it and move down to the**

# **58:05**

# **actions section of the properties and double click to get a new action if you**

# **58:12**

# **want to do something with JavaScript there's an kind of a trick but it's a**

# **58:17**

# **silent convention it's also descripted in the Pano2VR documentation on top**

# **58:26**

# **you see that if you want to use JavaScript in a skinny to a start with**

# **58:33**

# **JavaScript colon in the text field or in some actions and these actions need to**

# **58:43**

# **be of the go to URL type so let's head over here and type go to URL and type**

# **58:55**

# **script colon and now let's have an alert box popping up inside of the screen so**

# **59:06**

# **this function is in JavaScript alert and now we need single quote and let's say**

# **59:16**

# **hello and close with the semicolon if you want to have longer script lines you**

# **59:26**

# **can use this large editor field eyes escape to another screen here and you**

# **59:33**

# **can even write complex long functions here you don't need the target it's not**

# **59:39**

# **necessary here and now if you hit OK and save it turn to the to itself and if you**

# **59:50**

# **hit the button you get an alert this is a standard box popped up by the browser**

# **59:56**

# **usually on top you see what's the origins origin is the server we are now**

# **1:00:01**

# **using localhost and the respective port number and this is the text we wanted to**

# **1:00:07**

# **output in this alert and so on this is one way you can to let a skin element**

# **1:00:13**

# **communicate with the browser and now let's change it a little bit because**

# **1:00:19**

# **alert is a little bit annoying because you always need to quit it with the OK**

# **1:00:25**

# **button and now let's use the much more convenient way to route an output to the**

# **1:00:33**

# **console back to the skin editor don't need to change very much instead of**

# **1:00:41**

# **alert you can access the console object this is a standard object of the browser**

# **1:00:48**

# **as part of it and it has a function which names log so the console logs some**

# **1:00:56**

# **text you enter in the braces here afterwards and let's hit OK save and now**

# **1:01:06**

# **let's have a look what's happening now and if you click here on this button now**

# **1:01:11**

# **the console is throwing a line hello and it is originated by skin.js as it is a**

# **1:01:20**

# **skin function we added manually by typing this action this is a standard**

# **1:01:27**

# **way to communicate from skin to the console to get some stuff done outside**

# **1:01:36**

# **of a Pano2VR in the browser console. To complete our first basic look on**

# **4.1. CSS in Pano2VR**

# **1:01:44**

# **Pano2VR's JavaScript API let's have a little sidestep back again to CSS which**

# **1:01:54**

# **can be very helpful when you are using JavaScript as it is not only responsible**

# **1:02:02**

# **for styling and fonts and so on but it can also be used to identify and to mark**

# **1:02:09**

# **objects which you want to be treated with JavaScript API. Let's have a look on**

# **1:02:16**

# **this. We already have learned that we can inspect elements with right mouse button**

# **1:02:23**

# **and get to the inspector and we have a rectangle here and we can manipulate it**

# **1:02:30**

# **if you want to change this font size go to inspect and add some font size here**

# **1:02:39**

# **just go to the last element and type a new one if it's not available but**

# **1:02:46**

# **here it is available so you can tweak it by putting the cursor in here and**

# **1:02:54**

# **nudging it with arrow keys on your keyboard or just type in the value you**

# **1:03:03**

# **want to have it. When we have a closer look at the HTML code which is generated**

# **1:03:12**

# **by skin.js then you see a lot of classes added to the divs which are making up**

# **1:03:20**

# **the whole interface and which are built by skin.js and what we see now as the**

# **1:03:27**

# **as a user interface on top of the panorama we have a 3d space here and we**

# **1:03:34**

# **have a 2d space here with all these elements like the title or the current**

# **1:03:40**

# **note and you see some classes. These are generic classes and it is pretty**

# **1:03:46**

# **difficult to find a certain element here in this HTML code tree and you see some**

# **1:03:53**

# **generic elements like ggskin. This is a general class and nearly everything**

# **1:04:00**

# **has and you have a ggskin rectangle and this is the container here and you have**

# **1:04:09**

# **some rectangles, some containers and so on and you have some code elements and**

# **1:04:16**

# **some text elements. The text elements for example you have a div and inside of the**

# **1:04:23**

# **text element there's another div and this is the inner box and you can**

# **1:04:29**

# **sometimes identify them by the text they are containing but there's a nice trick**

# **1:04:36**

# **to change the classes or to change the CSS by another way. If you go to the**

# **1:04:45**

# **skin editor you have the possibility to enter your own CSS in the general**

# **1:04:54**

# **properties. Let's close up this here and in the in the lower section you have the**

# **1:05:02**

# **possibility to add external files to the skin. These can be CSS files so you can**

# **1:05:10**

# **extend what Pano2VR generates in the skin editor. You can do it also a**

# **1:05:17**

# **little bit on the upper side with embedded style sheet. Here you see some**

# **1:05:22**

# **CSS code and if you hit this box you see some specific CSS code you have here in**

# **1:05:34**

# **the skin editor which changes some properties and stylings which are not**

# **1:05:42**

# **defined in the elements themselves. If you click on any element here you can**

# **1:05:47**

# **change a lot of parameters and everything what you see here is translated into CSS more or less the most stuff. Some is javascript like the**

# **1:05:57**

# **actions and modifiers but the most parameters you can change here are**

# **1:06:03**

# **buildings the inline CSS of the skin editor. And if you go to the general**

# **1:06:11**

# **properties just by clicking outside of the stage then you have these part here**

# **1:06:18**

# **and you can add your own CSS here extending what's built up in the skin.**

# **1:06:26**

# **To get a grip on specific element you want to change you can use CSS classes**

# **1:06:36**

# **and how this is done and what's the benefit for using the JavaScript API I**

# **1:06:42**

# **will discuss in the next section. If you want to use your own CSS in Pano2VR**

# **1:06:51**

# **it's pretty simple. Let's introduce some custom CSS for an element I select in**

# **4.2. Using CSS classes**

# **1:07:01**

# **the in the skin. Let's have a look. Maybe we just choose this title the node**

# **1:07:08**

# **title in the upper right corner here and let's find it here. There I have the**

# **1:07:16**

# **header this is some custom stuff I introduced into this project and let's**

# **1:07:22**

# **have it here. So and we have here the user title outputted in a text field and**

# **1:07:32**

# **its color is white. Let's keep it this way to recognize some differences. If I**

# **1:07:41**

# **change something and under advanced you can add your own CSS styles for this**

# **1:07:48**

# **element here and for the inner element. As we have seen in the section before we**

# **1:07:54**

# **have two elements usually when we have text. Let's switch to the browser. We have**

# **1:08:00**

# **a text container the outside and this is the box itself what you see here and the**

# **1:08:10**

# **text field inside of it is a separate element which is living inside here. It**

# **1:08:17**

# **has no classes just inline styles and usually the outer element is for**

# **1:08:23**

# **positioning as you see it here position absolute right top and so on and you can**

# **1:08:30**

# **see all the geometric parameters of this box itself and inside you will find font**

# **1:08:39**

# **size, font weight, text align, white space and so on more text related parameters.**

# **1:08:45**

# **This makes sense for a lot of use cases. It makes it complicated on the first**

# **1:08:51**

# **glance as you need to think about text elements as always two elements which**

# **1:08:57**

# **are nested into each other and so let's inspect this and now let's introduce a**

# **1:09:05**

# **class. A class is a name. It must start with a number. It always needs**

# **1:09:10**

# **letters and dashes and underscores, nothing else, no spaces, no geocritic**

# **1:09:16**

# **signs like German umlauts or anything else. So let's just choose a name. It's up**

# **1:09:23**

# **to you how it's named. Pano title. It should be descriptive to make it**

# **1:09:29**

# **findable and if I save it here and go back to the output and just right click**

# **1:09:41**

# **and inspect it here you will see we have this box here the outer box GG skin is a**

# **1:09:48**

# **general class living everywhere. GG skin underscore text is a generic**

# **1:09:53**

# **description of a text box and here we have a class. Inside there we have the**

# **1:10:01**

# **generic CSS inline styles describing the textual output and so we have a class**

# **1:10:09**

# **here and now we can use it to identify just this text box and we can use it for**

# **1:10:16**

# **example to just copy it and now let's go to the just deselect it to get into the**

# **1:10:25**

# **general properties and let's add a class. Just scroll down, make this box a little**

# **1:10:34**

# **bit bigger and let's have dot and paste it. If you want to address a class it**

# **1:10:43**

# **always has a dot in front of it. Now use curly braces and just change**

# **1:10:49**

# **something. Color it is a text color, colon. You can type in some color values or**

# **1:10:59**

# **simply yellow as a name of a color. We have named colors in CSS and numbered**

# **1:11:07**

# **colors and so on in different numbering schemes and for the values and so on and**

# **1:11:12**

# **now let's insert it a bit and close it with a curly brace. Okay, save and now**

# **1:11:24**

# **let's have a look what's happening. You see nothing. That has a reason. Let's**

# **1:11:33**

# **have a look and let's dig down here in the inspector and we have an element and**

# **1:11:40**

# **we have an inline style here and we have a class and now we have some strange**

# **1:11:47**

# **stuff. We have Pano Title. This is our class we have defined and we have color**

# **1:11:54**

# **yellow but it's striked through. Why is it? Because if you have an inline style**

# **1:12:01**

# **and here the color is white then you cannot define it with a class. Inline**

# **1:12:09**

# **style always has the last word. It overrules everything. If we want to overrule an inline style with a class, the definition from outside, you need to**

# **1:12:20**

# **add a little extra and this is named exclamation mark and you see it is the**

# **1:12:28**

# **only parameter with an exclamation mark important and this means exclamation**

# **1:12:34**

# **mark important means I want to overrule everything what's told even in inline**

# **1:12:40**

# **styles and now it is yellow. So just copy it, copy, go back to the editor and insert**

# **1:12:51**

# **it here, copy. Okay, I need to insert it at the end not the whole line and now**

# **1:13:00**

# **color yellow important and now it overrules everything what's told to this**

# **1:13:07**

# **element before. Save and now it should be yellow out of the box and this is the**

# **1:13:16**

# **first and most simple way to use classes to address specific elements and their**

# **1:13:22**

# **look inside of Pano2VR. So it has an extension box really built in to make**

# **1:13:28**

# **your own edits. You see here something like filter drop shadows because**

# **1:13:35**

# **shadows cannot be introduced in the properties of a text box. You need to do it manually with CSS and there we have the filter drop shadow edit. This is a**

# **1:13:46**

# **CSS parameter with color value and shadow distances and even an RGB value**

# **1:13:53**

# **and RGBA value so we have three color values and an opacity value and so on**

# **1:13:59**

# **and you can use all CSS properties which are available in CSS itself not only the**

# **1:14:09**

# **ones you have offered here. It is only a small section of what CSS can do which**

# **1:14:18**

# **is available here with all these numbered entries CSS can do a lot lot**

# **1:14:24**

# **more but there need to be some restrictions to get the user interface**

# **1:14:30**

# **not too crowded on to over complicated and this is a way to add classes to**

# **1:14:38**

# **elements in the skin editor and to use them to do some styling tweaking. With**

# **4.3. Use CSS classes to locate skin elements**

# **1:14:50**

# **using CSS classes inside of a Pano2VR skin you are able to implement**

# **1:14:58**

# **another very helpful feature it is just to identify objects inside of the**

# **1:15:05**

# **Pano2VR skin as we have when we have a look here we have most the time we**

# **1:15:13**

# **have only generic classes like gg-skin or the gg-skin-text and the elements are**

# **1:15:19**

# **especially in very complicated skins we have not really a chance to address a**

# **1:15:26**

# **single element to manipulate it or something like that and here we can use**

# **1:15:32**

# **classes to quickly find elements just remember we have added in the last**

# **1:15:39**

# **section we added the class pano title to this little text field in the upper right corner and now let's just quickly find it if you don't know where it is or**

# **1:15:51**

# **maybe it is off screen or it is switched off or you don't know where it is and then you can use the search box of the inspector all browser developer tools**

# **1:16:01**

# **have this sometimes the search bar is on the bottom usually it is invoked by**

# **1:16:08**

# **command F if the developer tools have the focus in Firefox it is always open**

# **1:16:15**

# **on top and if you type Pano you already see it as a suggestion title it just**

# **1:16:29**

# **goes to there when you hit enter it should be here it finds it in the CSS**

# **1:16:36**

# **code which is implemented here but if you type dot in front of it it should go**

# **1:16:43**

# **to this and you have two occurrences of it one is in the CSS code but simply hit**

# **1:16:50**

# **enter again and then you get the element in the context of the skin and so here**

# **1:16:58**

# **it is the panel title field on the upper right corner and it is very easy to**

# **1:17:06**

# **identify elements or to search elements if they have a CSS class attached it's a**

# **1:17:13**

# **very powerful structural use case besides any styling jobs CSS has and**

# **1:17:20**

# **it's very useful and I'm usually marking important elements in my skins with**

# **1:17:26**

# **classes even if I don't use them for any styling in the last short section of**

# **5.1. Pano2VR JS API documentation**

# **1:17:34**

# **this tutorial I want to point out some helpful pages for everyone who wants to**

# **1:17:41**

# **dive into JavaScript and who needs help to figure out what all this programming**

# **1:17:48**

# **stuff is doing and let's head over to a little collection with three points I**

# **1:17:54**

# **have collected for you first of all is the JavaScript API documentation of**

# **1:18:02**

# **Pano2VR itself I already showed it to you and if you go to the index you**

# **1:18:10**

# **have the reference and then you have a JavaScript API if you head over the**

# **1:18:17**

# **documentation just hold out the reference menu folder here and you will**

# **1:18:25**

# **find the JavaScript API the great advantage is as it is a single page as I**

# **1:18:32**

# **showed before if you hit command F and you check for a variable you find all**

# **1:18:39**

# **these vocabularies and you can search for anything you want to know or what is**

# **1:18:47**

# **popping up in the browser console if you are exploring the object trees and this**

# **1:18:53**

# **reference is the first stop you need to get a little bit familiar with the**

# **1:19:01**

# **JavaScript API of Pano2VR. A second very helpful resource when it comes to**

# **1:19:09**

# **learning of JavaScript you can get to one of the countless web resources and**

# **5.2. MDN**

# **1:19:16**

# **the MDN this stands for Mozilla developer network Mozilla is the creator**

# **1:19:23**

# **of Firefox and they are responsible for a large part of developing the web as we**

# **1:19:30**

# **know it now and this is a very nice learning resource and very systematically**

# **1:19:37**

# **when it comes to learning CSS HTML and JavaScript and you have references for**

# **1:19:43**

# **all the languages and all the basic web technologies the internet relies on and**

# **1:19:49**

# **when it comes to JavaScript you have really complete guide and reference of**

# **1:19:54**

# **all elements and functions and events and whatever you search for and this is**

# **1:20:01**

# **a very good and systematic resource and it's kind of the basic reference of the**

# **1:20:08**

# **web itself when it comes to technologies as all references the Mozilla developer**

# **1:20:17**

# **network has one disadvantage everything is in there but you need where to look**

# **1:20:22**

# **at and at least you need about the right terms to search for and if you just have**

# **5.3. Stack Overflow**

# **1:20:29**

# **a question regarding JavaScript then I recommend to head over to Stack Overflow**

# **1:20:36**

# **Stack Overflow is the best resource if you have any questions about a**

# **1:20:41**

# **technology and Stack Overflow is an open forum it is huge really huge and you can**

# **1:20:51**

# **ask a lot of questions about web stuff of any kind and if you type your problem**

# **1:20:58**

# **in Google the chance that the first hits lead to Stack Overflow are very very high**

# **1:21:04**

# **and it is an indispensable helper when it comes to web technologies and**

# **1:21:10**

# **especially the JavaScript section is really huge and here you see collected a**

# **1:21:16**

# **lot of experience and a lot of helpful tips and tricks and even if something is**

# **1:21:24**

# **buggy the audience of Stack Overflow gets a notice on this and tries to find**

# **1:21:30**

# **workarounds and so on it is extremely helpful**

