# **Extending Pano2VR | Building an Image Gallery with JavaScript**

1.01. Introduction  
0:00  
Hi and welcome to this new tutorial in our series about extending Pano2VR with JavaScript.  
0:07  
My name is Thomas Breidenfeld and in this tutorial, it's the number five of our series,  
0:12  
I want to show how to build up an image gallery for a hotspot in Pano2VR.  
0:21  
I have set up a demo panorama with such hotspots implemented so you can see what we want to achieve  
0:29  
in this tutorial. You have some hotspots on the walls. This is a very old church in the Swiss  
0:36  
Alps and there are some wall paintings, some murals and we may like to have some close-ups  
0:45  
and maybe some explanations and that's what I want to do with this gallery hotspot we have here.  
0:51  
This is a title, some paradise scenes here in the corner of the wall and if I click on it,  
0:57  
I get a pop-up and one image you can see with a caption, a title and you can move it by swiping  
1:07  
or by clicking on the arrows and it goes round and round and restarts at the beginning and it's  
1:14  
a pop-up which is filled by data attached to this hotspot. You see this little text box? It's for  
1:23  
our information during the development process and if I click on a hotspot, you see some data  
1:29  
popping up here. These are some Pano2VR skin variables and they are transferred to a JavaScript  
1:36  
engine building up the gallery. It is much more efficient than doing it with Pano2VR. There is a  
1:44  
possibility you can build up image galleries in Pano2VR as you treat all single image here as a  
1:52  
node and you have a lot of flat nodes and then just click to the next node, next node and so on  
1:59  
but it is a complete separate Pano2VR project and it is a little bit tedious and cumbersome and  
2:07  
maybe it's not really ideal especially if you have a lot of hotspots with their own galleries.  
2:13  
So we have one here with some images. We have single images only one at a hotspot so the gallery  
2:24  
can do both and we have here another hotspot showing the exterior of the church from the outside  
2:32  
and these are multi-image hotspots and these are single image hotspots. There is another one here  
2:40  
and all these are flat close-ups of the murals you can see here. Especially here you see the  
2:47  
image upright whereas here you see it from the wrong direction so you can make your users see  
2:55  
the images as you like it and especially it is free from perspective here and really flat and  
3:02  
easy to read. In this tutorial I want to walk you through the whole process of setting up this  
3:07  
gallery and connecting it to the hotspots and how the data is coming from the hotspots to the gallery  
3:14  
and how all this process is working. Before we start let's have a look on how the project is  
1.02. General approach  
3:23  
set up basically and have a rough look how it's made. The basic approach we have here is I'm  
3:32  
opening just the project so let's have a look here. This is a panorama and I prepared the project  
3:41  
so far that I have introduced some hotspots with with some titles where I want to have  
3:47  
all this stuff visible and the general technique I'm using here is to introduce an image list  
3:59  
consisting of file names and descriptions captions in the description field of the hotspot  
4:06  
and if I click on a hotspot the title will be pushed into a variable and the description will  
4:14  
be pushed into a variable and then I'm triggering an external javascript function reading all these  
4:21  
values assembling useful data for the image gallery itself building up the gallery throwing  
4:29  
the gallery into a pop-up and then showing the pop-up. These are the main steps we need to achieve  
4:35  
to get this stuff running here. So here we have the click and the click throws the title into  
4:44  
my variable gallery title and gallery content and here you see a text string it's pretty simple to  
4:52  
write it is a file name then we have a hash and then we have a line break and the next line is  
4:58  
the next image and so on so you can enter one line or more lines can use it with one image or  
5:04  
with more images and this data we have in the two variables gallery title gallery content will be  
5:12  
thrown into javascript and then processed and the pop-up then is basically an empty text box  
5:21  
and i'm using jquery we already had it in other tutorials as a main convenience tool and helper  
5:29  
tool to manage javascript stuff and in the end we are throwing all the stuff into an empty text box  
5:38  
we have shown here from the skin that's all sounds easy isn't that much complicated  
5:48  
and it is much more elegant than using other techniques and here it's really worthwhile  
5:54  
to use a javascript gallery it is a very compact approach and you can even throw this stuff into  
1.03. Choosing a JavaScript library  
6:00  
a component and reuse it as often as you want having an image gallery on a website or in a  
6:07  
project like this is a very frequent requirement for web projects and so we have a lot of image  
6:16  
galleries you can build with javascript pre-built modules and libraries and it can be a little  
6:23  
effort to search the web for the appropriate gallery there are some very popular ones  
6:30  
and i have selected for example one which is pretty easy to explain they are very similar  
6:38  
to each other and i'm using light gallery and it is a project you see available for  
6:45  
several frameworks which are used for website frontends and for me it has a nice approach  
6:53  
usually you have two main approaches how to build up a gallery the first one is you build kind of an  
6:59  
html list and then convert this list to a gallery and the other way around it is the way light  
7:07  
gallery can work you have an gallery object and this gallery object is provided with some external  
7:14  
data and then builds the image gallery and the display of the single image is on demand  
7:21  
and let's have a look at some demos how that is looking like what this gallery is able to do and  
7:28  
you see they have a lot of features and we only need a very little fraction of what this library  
7:34  
is able to do and you can click on an image and you can swipe it from left to right you can use  
7:42  
the arrows you can download it you have a zoom function if you like and can close it here and  
7:50  
you have the possibility to have some nails so you can extend our example what we are doing here  
7:59  
in our tutorial with much more features just by adding some plugins or add-ons or whatever you  
8:06  
like i'm having a very basic feature set for our example here and we use this gallery as an one  
8:16  
example of various ways you can choose if you want to have an image gallery to be implemented  
8:23  
into projects of a part of vr this is light gallery and i'm showing in the next clips how  
8:30  
to implement it into a project in our file structure and how to make it working with  
8:36  
our content coming from the panetto vr hotspots after this short introduction let's get our hands  
2.01. Create VS Code workspace  
8:45  
dirty and start with setting up the project for this purpose i'm opening up our visual studio  
8:52  
code editor it is empty now and waiting for our input i usually throw the project folder it's a  
9:02  
work project here just into the window and it opens the folder with all containing files  
9:08  
the project is organized here this is the same what we see here and now let's add some stuff  
2.02. Create library folder  
9:15  
we can do it here or here it doesn't matter and usually for extending a penalty our projects  
9:22  
with javascript we need an extra folder i usually call it lip or library and add it to the project  
9:32  
folder itself we have here the gallery folder with our image files the folder htdocs is the  
9:39  
folder where i output all my stuff i'm renaming it from output to htdocs because it's a pretty  
9:46  
popular name on web servers for just the folder to be played out to the public on a web hosting  
9:54  
server and we need this gallery folder to be moved on to the output and the library folder  
10:02  
we will manage this later in the panetto vr editor and these two folders are necessary  
10:11  
for our project and if we head over to visual studio code we can see familiar stuff this index  
10:20  
file here in the htdocs folder the skin and we have the penalty we are player here and the tool  
10:29  
xml which describes all the hot spots and so on you see the titles already here and so on i'm  
10:36  
closing the htdocs folder the lip folder is empty and here we have the images and here we have our  
10:43  
panorama images so we can close this here and the main stuff we talking about is happening here in  
10:50  
this library folder after setting up the basic file structure of our project in visual studio  
2.03. Download lightGallery  
10:57  
code or in the finder on windows on the explorer we now need to get this light gallery files or a  
11:04  
selection of them for implementing it into our project so you don't find a download button here  
11:12  
even if you go to the home page but there is a little icon here with this cat this is the same  
11:18  
as view on github github is a so-called repository and a repository is a collaboration platform where  
11:28  
several people can work on the same project and it has controls about who is doing what or  
11:34  
development branches and other stuff which is making possible to larger projects and working  
11:43  
several persons on it to work collaboratively on this and it's it's the same time it is a place  
11:51  
where you can download all these files you need and for this download usually we have this code  
11:57  
button and if you click on it you get a little pop-up and at the last line you see download zip  
12:04  
i'm doing it and i have my downloads folder and don't be afraid of the 68 megabytes we only need  
12:14  
a fraction of what is offered here and i am heading over to my project folder in the finder  
12:21  
or explorer and usually i'm setting up for stuff like this a little folder it's usually named  
12:29  
that down loads that is prefix for making it stand at the very end and getting out of my way  
12:37  
and i have the downloaded zip file here and now i'm going to unpack it  
12:45  
and let's have a look at what is inside it's the same what you see here and all this stuff what is  
12:55  
listed here is mainly meant for development and for implementation in some more complicated  
13:01  
projects and usually a guitar project has a fixed structure and there is one folder it is named  
13:11  
source src and this is where the stuff is developed and another folder which is the most  
13:21  
important for us is the folder dist it stands for distribution and distribution is everything  
13:27  
what really goes out to the public and can be used in projects directly we don't need everything  
13:34  
of it and i'm going to prepare some stuff here i'm going to my lib folder in the project  
13:43  
adding a new folder and name it light gallery so my first preparation that's where all the  
13:51  
files will land i need really for this project and when i'm going to distribution i need the  
13:58  
css folder i need the fonts folder as a light gallery brings its own fonts i need the image  
14:05  
folder and i need the min file there are two other versions for other project purposes we need  
14:16  
only this one and the plugins folder is for some additional features we don't need here  
14:25  
so i copy this and head over to my library folder light gary and paste it here so now  
14:34  
we have everything in place what we need it is recommended to use github projects  
14:41  
in the same structure they are offered here in the code folder as they are often hardwired and  
14:48  
if you move or rename some folders here it will break the project so it is useful to use all you  
14:55  
need and omit stuff you don't need but you will get error messages telling you what's going wrong  
15:01  
if you make some errors here but this works of course everything is tested and now this is my  
15:10  
part for the light gallery and how to sort it out what we have really necessary here in our project  
15:20  
folder the next step in our project setup is very short and very easy we need jQuery as a general  
2.04. Add jQuery  
15:28  
helper for all kinds of javascript stuff and so let's grab it and integrate it here into our  
15:36  
library folder and i'm going to jQuery and you have download here and you can directly right  
15:45  
mouse click save link as and just throw it into the downloads folder and add it to our folder here  
15:55  
and it is ready to use no unzipping or something like that so jQuery is now living in our library  
16:03  
folder and it makes life easier nearly all projects i'm doing need jQuery it's much more  
16:11  
convenient and much more tidy to use it instead of writing longer javascript commands or some  
16:18  
tedious routines to find elements in a web project so jQuery is nearly every time a must  
16:26  
have part of the project integrating external files into a pulitzer vr project always requires  
2.05. Link external folders to project file  
16:35  
three steps the first step we have done so far is to download the files and to organize it and to  
16:42  
sort it into our library folder the next part we need to do is to make it available in the  
16:48  
pulitzer vr output for the runtime when we have it running on the web server so we need to copy  
16:57  
all this stuff into the htdocs folder so we head over to the pulitzer vr project click on the output  
17:06  
section and scroll all the way down to the section advanced and assets so now we add two  
17:18  
folders the first folder is our gallery folder as we need the images to be copied into our output  
17:25  
folder as well and the next one is the library folder to have all this functional stuff in here  
17:32  
the light gallery jQuery and we add two more files later where all our own stuff is living in  
17:39  
so now we have these two folders implemented here i save it and we have the htdocs and fv output all  
17:51  
the stuff we added here we should now see here an assets folder and inside of the assets there's a  
17:59  
gallery and the copy of our lib folder jQuery and the light gallery files so now the library files  
18:08  
are linked to the output and all the time i'm doing an update here and re-export the project  
18:15  
all updates are exported as well after having set up the file structure in the last chapter we now  
3.01. Add own JS and CSS with code element  
18:23  
need to wire up the external files with our project using the skin and for this purpose i'm  
18:33  
opening the skin editor with the attached skin the skin is completely empty there's nothing in  
18:40  
no variables no nothing and we set up a first element we need it is a code element just  
18:50  
throwing it usually i'm putting it into the upper left corner and name it code block  
18:57  
and now we need to connect the external files to make them available for the skin and for  
19:09  
javascript currently we only have them copied to the output they are just a file copying  
19:16  
the project knows nothing about it so this is the moment we need to change this  
19:22  
in the code element you have the section external files it is pretty much the same as we have  
19:30  
here the only difference is if i'm adding the external files to an element this element can  
19:38  
be made to be a component and these connections will stay alive and this external files is  
19:46  
connected to the skin and this is connected to the element which has some significant advantages for  
19:52  
us now let's connect all these files we have first we start with the css files i'm hitting the plus  
20:04  
sign and the first css file we need is the css file from the light gallery so let's head over  
20:15  
to our project and check the path we have our library here in this is the folder light gallery  
20:26  
and there we have a css file and we need to pick one of them and we also need to keep in mind that  
20:35  
we are living in the output of the htdocs folder this is what is important when the project is  
20:43  
running in the web browser so we have assets library light gallery and now we need some of  
20:53  
these css files to be linked in here for my convenience i have prepared this for copying  
21:03  
and this is what we need i will explain the path so we are living in the assets folder in the output  
21:10  
and we have the library light gallery css this is a subfolder i make the window a little bit  
21:18  
smaller so we can see the explorer view in vs code and now we have css light gallery and we need the  
21:27  
bundle mincss there is everything we need for our gallery bundled in there and the next file  
21:37  
we need is a new one we need to create and let's do it in visual studio code so head over just  
21:49  
collapse the htdocs folder because you need to be aware that you don't make any changes here in the  
21:55  
hddocs folder because it will be overwritten every time i export the project this is the original folder there is where the music plays and in the lib folder i'm creating a new file  
22:05  
it will named custom dot css is one of my css file we need it only for some minor tweakings  
22:13  
so and now we can just copy this path  
22:19  
add a new css file and just skip all this stuff and we need on the lip and custom  
22:33  
css this custom css file is empty and we will add some code later but we need to prepare it here  
22:43  
and the next step is to integrate the javascript files we need so let's switch it from css to  
22:52  
javascript and i'm copying the jquery file nearly always it needs to be the first file to be loaded  
22:59  
because other files are relying on it the order we are introducing this file in this table is  
23:06  
important so the next one is also a javascript file and now comes the light gallery file  
23:14  
by the way we can do it another way i have prepared it in my cheat sheet here but you  
23:20  
can do it another way if you go to library lib gallery and copy relative path in vs studio code  
23:33  
and paste it in here it is nearly what we need to have we only need to add assets  
23:42  
and because the path is relative to the project folder which is here and you only need to  
23:50  
add the assets folder which is reflecting the place the path in the output and now  
3.02. Create custom JavaScript file  
23:57  
comes a special one we also need to create a file  
24:06  
in the library and this file will be named custom.js and this is where we are doing all  
24:15  
the main coding work and this file will not be linked here but we do it here technically  
24:24  
it is nearly the same but if i'm adding it here i'm checking from file and now i choose  
24:36  
work progress library custom.js open it here and now it's linked to the project  
24:47  
and the skin editor is watching this file i can edit externally with visual studio code  
24:54  
and we can check this for a moment let's just enter a comment here custom.js  
25:04  
and so and add a comment save it and you see the comment is popping up here you can open this  
25:18  
but you cannot edit it it is blocked for editing here and editing is happening here  
25:25  
and what's very nice is if you go in the palette vr skin editor you go to view  
25:33  
and you have a menu entry here live update on save only if it's unchecked then every change  
25:40  
you have you make here in this file externally will be monitored by the skin editor and it fires  
25:49  
a reload command to the browser you have seen the panorama was flashing for a short moment  
25:55  
or just make a minor change here i just copy it you see it's unsaved now save it and look here  
26:03  
now it's reloaded and this is pretty nice for working with external javascript files in the  
26:10  
skin editor that it is watched by the skin editor and you don't need to re-export or save something  
26:19  
it is done automatically and you can work directly with the browser with the output in the browser  
26:25  
and the code editor side by side so just here make a change save it and you have a reload here  
26:33  
so now we have all files we need and we make a short check in the next clip whether everything  
26:43  
is present after having wired our external javascript and css files to the skin now let's  
3.03. Check file/folder structure  
26:50  
check if everything is working and i'm heading over to the browser and hitting f12 to go to the  
27:00  
network tab and we have now go to reload everything and check what is being loaded  
27:09  
we have the index html we have our pano2vr player skin.js and we have the light gallery css custom  
27:16  
css jquery file and the light gallery javascript if you miss the custom.js we entered here it is  
27:29  
part of the skin all the code which is written here in the custom.js and if i'm going back to the  
27:38  
skin editor everything what's in here is part of skin.js as skin.js is already a javascript file  
27:46  
all the code we are entering here will just integrate it into skin.js so it is no separate  
27:53  
file anymore but let's say it will be imported into skin.js and not as an external file later  
28:01  
linked here so the javascript file we are working on is not to be found here it is part of the skin  
28:09  
editor so you can't see it in the browser being loaded because it's part of skin.js  
28:15  
so everything is okay now and we can start to work on our skin  
3.04. Setup popup box  
28:23  
the first component we need is our pop-up for the image gallery to shorten up a little bit our work  
28:32  
here to concentrate more on javascript coding i prefabricated some components for our project  
28:41  
here and if i'm going to my component library i have my folder pano2vr tutorials and i have prepared  
28:50  
a gallery container i will integrate it in our project and walk through everything what's  
28:58  
important for us and describe its functionality it's not very complicated it's pretty easy stuff  
29:04  
and i will just walk through the elements we have a general container just for keeping everything  
29:11  
together it's a hundred percent per hundred percent container he does nothing special he's  
29:17  
always there and inside of this container we have the gallery inner container and you see here some  
29:27  
variable in a text field so let's first click in the outside of the stage area and look to the  
29:37  
variables section as components can bring their own variables i have done so and so we have three  
29:46  
variables important for us gallery show is a variable which controls the visibility of the pop  
29:53  
up and it is changed by the closing icon it is changed by the tint and we have two variables  
30:03  
for the content the content variable is responsible for keeping our hotspot description what we later  
30:12  
will enter here is transferred to the variable gallery content and the other is the variable  
30:20  
title where we have the hotspot title thrown in to be displayed and we have it in a text box here  
30:29  
this is the part gallery title the text is just this variable and we have a gallery box here you  
30:37  
won't find a variable because this box is filled by javascript and the gallery close button is  
30:47  
setting the variable show to false and the gallery tint is setting the variable show to  
30:55  
false and we have two variables in this case closing the gallery will delete or enter nothing  
31:06  
into the variable here and here so it is just a reset so we have no content in the variables left  
31:14  
if the pop-up is closed that is pretty much everything what we need here and prefabricating  
31:23  
such a component is pretty easy it can be a blueprint for other pop-ups putting some input  
31:29  
here or bringing some variables controlling the content and putting one variable controlling the  
31:36  
visibility it's pretty straightforward here so i packed this into component to have a short  
31:43  
way to have my element here to play with so let's save it and re-output it and of course  
31:53  
you see the show variable defaults to false so you won't see the pop-up but we can  
32:01  
make default it to true save it and it should be  
32:08  
should show the pop-up here so you have it and you should close it with a click in the  
32:20  
tint so basically it's working the standard value needs to be false of course the pop-up is  
32:25  
invisible when we start our project in the web browser the next thing we need to do is to take  
3.05. Setup hotspot  
32:35  
care of our hotspots in the project if i'm going here to the outputted project you'll see the  
32:41  
default red dot hotspots which are defined in the hotspot section of the output with just the  
32:51  
basic settings here they aren't really changeable it is just to mark up that they are here and now  
33:00  
we need an hotspot template being connected to this hotspots in the panorama and now let's check  
33:09  
this going to the skin editor and of course i have prepared a component for it as well it's  
33:16  
pretty easy but i'm taking it here it's a hotspot gallery it's already perfectly named for it and  
33:25  
add a component to skin and now i have this hotspot living here and let's check what it's  
33:35  
doing i have added no action so far because these actions will be added later and we have  
33:45  
a tooltip which shows the hotspot title and i have a little icon for it representing a gallery  
33:53  
and now i'm copying the template name close it and go to the main program i'm usually  
34:02  
for controlling hotspots or for editing hotspots i'm using the list because a double click throws  
34:08  
this hotspot into the center of the screen and you can either copy your hotspot template name  
34:15  
here or let's head over to the next one you can also choose it hotspot gallery it's an url hotspot  
34:23  
and so you can do it this way or you can add it this way just to make sure that all these  
34:36  
hotspots are now connected to our hotspot template let's save it and now we have everything  
34:42  
here what we need and they have their own tooltips and now we have it as we like it  
34:51  
so i'm doing nothing if i click on it but that's not intended so far now let's work on the hotspot  
3.06. Setup basic hotspot actions  
34:59  
actions to connect it to the pop-up and so we head over to the skin editor and manipulate  
35:08  
our hotspot gallery template which has no action so far and the first action will be making the  
35:17  
panorama pop-up visible that's the easiest one so give gallery show set it to true  
35:24  
and let's check this so we go here and now it should open up the gallery pop-up and we can  
35:34  
click on the close button and we can click on the tint behind all this will close the pop-up  
35:43  
the next one and still pretty easy let's add the always a mouse click and  
35:52  
sorry set variable value set gallery title and now we are entering the placeholder  
36:05  
of the hotspot title which is hs and hhs is thrown into the gallery title and as we have in our  
36:16  
gallery container the title already this variable entered here that should work let's have some  
36:25  
thoughts about the order of actions it is useful to make an element which has changeable content  
36:36  
to be shown after everything before is done so show should be the last one to get this done here  
36:46  
so now if we go to the gallery we see our hotspot title here at the header of the  
36:55  
pop-up that's everything we want to have here the interesting part is of course  
37:04  
the hotspot description this will be set up later and so we have our basics pop-up functions in the  
37:13  
skin are working and we have it done so far here to integrate these two components the  
37:21  
hotspot gallery component and the hotspot gallery container together in our skin and working with  
37:32  
each other connected by the three variables we have here with the content the title and the  
37:39  
show variable the code block is so far completely separated from it but we will bring it to life  
37:47  
in one of the next clips so i save it and we have a should have a reload here sometimes we don't have  
37:59  
and just check it again everything is working as intended so far in this section number four of our  
4.01. Add gallery data to hotspot  
38:10  
tutorial let's come to the very core of our project and construct the processes in javascript  
38:18  
to connect external images with our gallery and set up the control from the hotspots to the gallery  
38:28  
and how the data is processed to show the images in the gallery the first step we need is let's  
38:36  
open one hotspot here to add some image data we want to show and for this i'm using the description  
38:46  
field given i'm not using it for something else another possibility not covered here is to use  
38:54  
custom properties for it as it is simple text you can also add it into a custom property  
39:00  
in case you need the description for something else maybe for a tool tip or something like that  
39:06  
so here i'm collecting my image data i want to have to open the pop-up gallery when i click on  
39:13  
this hotspot let's have a short look in our file structure and how the gallery is organized  
39:20  
it is pretty simple as we only have a flat structure inside of this folder and it is  
39:28  
only consisting of file names so we need some information beyond that and i have prepared  
39:35  
a data set for some of these hotspots let's start with this one the paradise scenes i'm simply copy  
39:43  
paste it here i don't want to be boring with typing endless text copy and i have this content here  
39:54  
and let's open it up a little bit wider so we can see how this content is structured  
40:06  
first on the left side of every line you see the file names you want to have to show up for  
40:13  
this gallery invoked by this hotspot and this is reflecting the file names you see here  
40:22  
or some of them and we have five images to show here and we want to have a caption  
40:32  
in our gallery so a descriptive line what is being shown on this image and this is a pair of data  
40:40  
file name and description and to make this data processable you need some separators to make these  
40:50  
items processable by a javascript and usually you find some characters you won't use inside of the  
40:58  
file names or inside of some descriptive text you can use other characters pipes a vertical  
41:06  
line is one of them or even combinations of characters it doesn't need to be one only  
41:14  
can be more characters like xyz or something like that and then we have the text and the other  
41:22  
separator we need is just a line break so every new line is a new data set and the hash is  
41:31  
separating the file name from the description and the line break is separating each data set  
41:39  
from another so when we have this we have our data provided here and we can paste in some others  
41:49  
here so st george is here copy paste and so on i will fill in the rest after this clip so we start  
42:01  
with the full data sets in the next clip so now we have provided a data source and learned a little  
42:08  
bit about convenient separating of several data sets and inside of these data sets for this case  
42:16  
we have a file name and caption for this image you can even add more of them with other separators  
42:23  
the advantage is you can design this pretty freely so this is a setup of our data source  
42:32  
we need for the different image pop-up galleries in this project so after i have filled in all  
4.02. Setup debug helper  
42:41  
remaining information about the image galleries here in the hotspot description box we can check  
42:47  
if everything is complete by using the list view and double click on the first hotspot  
42:52  
there is information here and so you can quickly check everything being in place what you want  
42:59  
and this looks pretty okay and now let's get our hands on this data from the skin editor  
43:08  
and using the hotspot for it so let's check the hotspot the hd gallery hotspot template and of  
43:16  
course you guess it we need a mouse click for it and this mouse click should set a variable value  
43:23  
as it is the first one it is also the right one and now we need the value of course it is  
43:31  
a dollar sign and it is the hd for the hotspot description now so we can test it we had already  
43:41  
a reload in the background but of course you cannot see anything because this variable isn't  
43:47  
displayed anywhere and let's add a little helper for it to make our hotspot output visible  
43:58  
in our project and i'm just entering small text field here and let's call it a debug  
44:07  
box and this box i'm putting it to the lower left corner i'm making it auto size  
44:20  
add a little bit padding and make it make the background a little bit  
44:27  
transparent let's say 220 and now let's add some text here and let's say content  
44:41  
and i'm using these boxes very often to have some content which isn't visible to monitor it  
44:51  
or to check it whether it's working and so on and let's add the title to title  
44:57  
and let's add the variable here's a variable title  
45:04  
and now we should see the data the hotspot is pushing into this well save it and now we should  
45:14  
see this box here and now we get the data here this is the title this is the content  
45:22  
because it doesn't look very nice so let's make it left and top and now we see everything we want  
45:31  
so the data is transferred from the hotspot description to our gallery content variable  
45:39  
these little debugging boxes are very helpful i have some of them in my component library  
45:45  
and but you can easily create it from the scratch it is very fast and easily done  
45:51  
and now we have the data in a variable where we want it so as we now have done  
4.03. Check JavaScript file with jQuery  
45:59  
all preparations in our skin editor and in the part of your project file itself let's head over to our javascript again and let's check what's next so first  
46:13  
open custom js it's uh we remember it is connected with skin editor's code block  
46:21  
and the code element and it is this one here connected to the file and every update i do  
46:27  
will be reflected in a reload and so we can head over here to start constructing our javascript  
46:36  
so first let's check a little bit whether it's working at all the javascript now we can only  
46:43  
see it's a comment line we see it here in the skin editor but we cannot see whether it's doing  
46:49  
something in the browser and for this we usually enter a little function you remember we added  
46:57  
jquery to our project and the jquery functions usually start with a dollar sign and we have  
47:05  
the document you can just enter it here we have suggestions visual studio code knows what the  
47:12  
dollar sign means as he sees ah we have jquery in our project so the dollar sign is not to me  
47:18  
and i get some suggestions from the inner engine of visual studio code to complete  
47:25  
my lines or make suggestions how it's going on when the document is ready it's connected with  
47:34  
the dot it's it's an event and this event is happening when the whole document so the power  
47:40  
to vr index html and all the other data is loaded and the document is valid and stable  
47:48  
and readily constructed and jquery fires this ready event and after an event we usually open  
47:56  
a bracket and then comes a function and this function can have arguments in brackets but  
48:03  
can also have a empty bracket and then it is followed by two curly brackets and usually  
48:11  
you enter an empty line here close it with a semicolon and what should happen when this  
48:19  
function is active is positioned here and let's have console dot log let's have an output in the  
48:27  
development console of our browser and let's say doc ready and at the end let's have a semicolon  
48:38  
save it and now we should see something in our browser let's head over to the browser you see  
48:44  
we got a reload and now i'm hitting f12 to have the development tools at hand and we go to the  
48:55  
console and you see doc ready we have some output here and this output allows us to monitor stuff  
49:04  
happening inside of this javascript especially when it comes to development and you need to  
49:10  
get information about the last step you have done we are going now to establish our first connection  
4.04. Add JavaScript call to hotspot  
49:20  
between the skin and javascript and first of it we need to have a function and this function needs  
49:28  
to have a name and let's call get gallery data and just type it the right way gallery data and we need  
49:42  
some curly brackets and we need to check our function console dot log and this function  
49:55  
will be called by our hotspot so let's reflect this gallery  
50:02  
clicked and this should be confirm the function we now add to the skin  
50:15  
i'm copying this function name copy and now  
50:24  
let's head over to the skin editor and add this to our gallery hotspot mouse click  
50:35  
and javascript calls from the skin from within the pano2vr project need to be called with go to url  
50:45  
and i'm opening up the box type in javascript colon and just add the t here and now paste in  
50:57  
the function an empty bracket for it so the function call is complete and add this  
51:10  
to the hotspot usually we need to have this function at a certain place and it is the  
51:21  
third position first as we need to get the content of the variable gallery content we now need to  
51:30  
rearrange it a little bit and the gallery show action should be the last one these both  
51:38  
should be first because this function needs the gallery content variable already populated  
51:45  
so this is the right order get the title throw it in here get the description of the hotspot  
51:52  
throw it into the variable and now call the javascript processing it when it's finished  
51:57  
show it that is everything what we need to add here to make this function  
52:03  
live and in the next clip we will test this after having reordered all the actions in a  
4.05. About JavaScript scope  
52:11  
senseful manner we now need to check what's happening when we click on a hotspot now when  
52:19  
we are in the browser let's reload this and now we get an error what's happening here  
52:29  
of course i know this before what's happening here we get an error message uncaught reference  
52:37  
error and this means i'm calling something which is either wrong or missing or has other issues  
52:45  
and here we get told get gallery data is not defined but that cannot be as we have  
52:55  
when i'm head over to the visual studio code get gallery data let's check whether there's a  
53:01  
typo but i usually copy paste it to avoid typos here get gallery data is defined but i get this  
53:10  
error message so what's the reason for this i need to explain a little bit this custom js file  
53:18  
is connected to the skin editor let's head over to palazzo vr and in the code block and the code  
53:26  
is integrated into skin js jquery for example is loaded as an external file it is valid for the  
53:35  
whole project and this one is not loaded it is not an external file it is just for our development  
53:42  
now it is an external file but the code we are producing a part of skin js and this is a nice  
53:51  
little difference which causes this issue as the code is living in an code element and this code  
53:59  
element is part of the skin then we need to remember the skin is an object we have two  
54:09  
main objects in panel to vr the first one is a panel object containing all the panoramas the  
54:14  
data for tours and what is in the hot spots and how the parameters are and the tour map and so on  
54:21  
so every structural data are living in the panel object panel dot and the other object building up  
54:29  
the skin is skin dot so you can really find this stuff and in the console or in the source code  
54:38  
and what we need to do is to think about how objects are arranged in an inside of such a  
54:44  
project and if i have a script which is living inside of the skin object and i have other  
54:52  
javascript files let's say jquery they are living in the whole project and they are a child so to  
55:01  
so to say they are a child of the window object of the main object so the window object is  
55:09  
everything i see here which is reachable under this very url and panel is a sub object of window  
55:17  
and skin is a sub object of the window as well and if i define something inside of a skin object it  
55:26  
is only valid inside of the skin object so when i call a function which lives outside of this then  
55:35  
i get this error and this is called scope a function or a variable can have a scope  
55:40  
and it is an area where it's valid and outside of this area it is unknown  
55:45  
so we need to introduce a little trick for it and so we need to make our function get gallery data  
55:56  
not a child of the skin object but a child of the window as it doesn't make many troubles because we  
56:03  
just need to define it a little bit in another way so let's have window and you already remember the  
56:14  
dot in javascript is always a parent child relation something like that is something is on  
56:22  
the right side of the dot is attached to something on the left side and here we have the window  
56:28  
object and this window object needs to have a function for our purpose and now we have  
56:36  
a simple equal sign function and now this function is attached to the window  
56:46  
and it is defined not as a child of the skin object but as a child of the window object  
56:53  
and if everything is done right now let's save it we get a reload automatically as the skin  
57:01  
editor is monitoring this file as it is part the code is part of the skin object and now gallery hs is clicked that's what we want to have here so now we have an  
57:14  
function call which is going out of the skin up to the window object and is doing some stuff there  
57:23  
this is very important because from the window object we need some information from the panel  
57:28  
object and the panel object and the skin object are two different parts of the show  
57:34  
and they need to communicate to each other and the scope issues you can run in here  
57:41  
are pretty hard to find if you don't know what is a scope and what all this stuff is about  
57:47  
so now we have a good way to define functions which are valid outside of the skin object it's  
57:55  
a very important move here after correcting this little scope error we are now ready to  
5.01. Retrieve data from hotspot  
58:02  
fill this function with life and to get a grip on the data we need for the gallery  
58:08  
so let's enter some empty lines here and now i'm making a comment get data from parata vr  
58:21  
i'm adding a comment here mind scope  
58:32  
issues here and now we want to have the data which we can see here in our content variable  
58:44  
to live here in javascript and for this let's introduce a variable i call it gallery content  
58:57  
and just correct some typos and this variable should contain the content of this skin variable  
59:08  
this is a javascript variable and we now want to populate it with the skin variable content  
59:13  
so for this we have a procedure in the javascript api of part of the app as a panel object we need  
59:20  
now sometimes the suggestions are a little bit annoying so i'm starting with an underscore at a  
59:30  
point and now delete it and we have the panel object we have a short look in the panel  
59:39  
to vr javascript api and let's have a look for variable so if we enter it right we will find  
59:48  
something at the first line you get what you need get variable value copy and this is what we need  
59:56  
here and now we need the name of this variable of course it is gallery gal content so and let's add  
1:00:08  
a semicolon here and now let's throw this into the console copy and there's the next one and  
1:00:17  
we have our variable gallery content just start typing here's it is not annoying here  
1:00:26  
is great to have all the variables defined above at hand and now we should see after a  
1:00:36  
hotspot click so i lost my output here i'm heading to panel to vr save it for an output  
1:00:47  
and go to output and re-enter it here i have 12 we should see it now  
1:01:00  
here it is and now you see the output with the hash separated file name description  
1:01:08  
or caption and so on and we have a new line it is reflected in the console as well and now we have  
1:01:14  
our gallery content skin variable thrown into the gallery content javascript variable and  
1:01:22  
now we can process it in a way we need for building up the gallery so what we have here  
5.02. Convert data for gallery usage  
1:01:28  
in our variable is technically a string it is just a chain of characters and it isn't structured in  
1:01:37  
any way but we need it structured in a way we have an item consisting of two sub items one item is  
1:01:45  
one image and the sub item is a file name and the other sub item is a description and now we need  
1:01:50  
build up such an object and we let make a container and we have an array  
1:01:58  
build an array and an array is a chain of objects or parts of objects or items in a general sense  
1:02:09  
and so let's call it a gallery array and this gallery array will be made from this gallery  
1:02:18  
content and you can split up a string and make an array from it so these lines will be interpreted  
1:02:28  
as items and for this there is a very handy javascript function a copy gallery content  
1:02:35  
and we have a function which is called split and split defines a character or a sequence of  
1:02:45  
characters by which and string will be separated to make separate items to fill up an array  
1:02:55  
so let's check this here and we need a little bit more explanations for it because we first  
1:03:02  
want to separate our content you see it here by lines a new line can be a different character in  
1:03:12  
different systems and there are also combinations between so-called line feeds and returns and we  
1:03:20  
need to catch all of them for this we need a little excurs to how to check an element against  
1:03:28  
a several combination of characters i'm doing it first by copy paste and then i will explain it  
1:03:37  
with the help of a very nice tool for you and the split sequence we need here looks pretty cryptic  
1:03:43  
to anyone who is not familiar with this stuff i copy paste it because you need to be very careful  
1:03:49  
by writing it because every single character here has a meaning and what is this let's go  
1:04:00  
to a little helper and this helper is called regex and this is also the name we need here regex  
1:04:08  
it is a short casual abbreviation of the word regular expression it's a pretty abstract  
1:04:16  
description of something we have here insert your regular expression here and you see here  
1:04:22  
it starts with a slash it ends with a slash and there we have some options at the end and here we  
1:04:30  
have a g at the end and here's here's a gm so let's check this i'm copying this part between  
1:04:38  
the slashes and enter it here and this is our regular expression and you get an explanation  
1:04:46  
here first alternative matches carriage return and matches line feed new light these are different  
1:04:54  
signs on different systems it means make a new line and now let's check it against our real world  
1:05:00  
content here and i'm going to my output here click on it and just copy this and now let's work this  
1:05:09  
expression against our content and here you see we have four matches of a line feed in our project  
1:05:19  
here all the blue sections here you see the little sign here we have four matches of either a line  
1:05:28  
feed or a carriage return and the question mark and the pipes are this is an or sign it may be a  
1:05:35  
single line feed it may be a single return or it may be a combination of them and you see here the  
1:05:45  
further explanations and this is extremely powerful and regular expressions are very widespread in all  
1:05:52  
programming languages you get this and this simple thing here is separating my string i'm getting  
1:06:00  
from the gallery content variable on off the skin into separate items and of course we want to see  
1:06:07  
now what is it looking like what we get now copy and let's have the gallery array displayed in our  
1:06:20  
developer box save it and now head over to the project in the browser and let's close it and  
1:06:28  
let's hit a button and that's what we get now here we have a simple string just a chain of lines and  
1:06:35  
now we have an array with three elements element zero always starts counting with zero one and two  
1:06:44  
and it is a little bit more structured and you see it's colored here and the white output is always  
1:06:50  
a simple string and everything was colored is something like an object an array or something  
1:06:55  
else or a function and so it's our first step we have now processed our data in a way we can  
1:07:04  
programmatically handle it and now let's close it here or clear it and we now should get three  
1:07:12  
elements and here we get five elements and if we click here should be here we get one element  
1:07:21  
it is only the element if you unfold it is only element zero only one and they have an element  
1:07:29  
length as an additional parameter you can check and so this is the process to build meaningful  
1:07:38  
data structures just from strings you can enter in panel to vr just into a description box here  
1:07:46  
and make something senseful of it because here we can only add text but this text can be prepared  
1:07:54  
to be developed in a meaningful data structure we need for our gallery later  
1:08:00  
converting our string from the hotspot description to an array of separate images for our gallery  
5.03. Cycling through an array  
1:08:11  
we had done our first strip so we have a string now we have an array and inside of this array  
1:08:18  
we have one line describing one image including the caption what we need next to take this one  
1:08:28  
step further to convert this string which is a string a third of what we have here and this  
1:08:37  
string should be divided into two separate items the file name and the caption and we introduced  
1:08:47  
the hash sign as a marker to separate these both from each other and now we are doing pretty much  
1:08:55  
the same as we did in our first step with taking a string and splitting it by a sign or selection  
1:09:06  
or combination of signs and that is the next next step we now need to split up  
1:09:12  
image lines or image items let's make the wording a little bit more precise  
1:09:24  
so and for this we need a function because now we have an array an array has items in this case here  
1:09:33  
when we click on this hotspots the gallery has three item array and we need to cycle through  
1:09:39  
this arrays between one or five in our project we don't know but we need to get all of them  
1:09:47  
and for this we have a function and this function is provided by jquery you can write it in javascript  
1:09:55  
as well but jquery is more elegant this function means dollar each and it's providing a cycling  
1:10:04  
through an array or an object which consists of several items and doing something on every item  
1:10:11  
so of course we need to know what and this is a gallery for each gallery and then we need to do  
1:10:21  
something on them and usually we have a function and this function has an argument or it can have  
1:10:32  
two arguments and the function consists also on a curly bracket consisting the stuff we want to  
1:10:42  
do with it and here in the function i'm usually using a key and a value and the key is in our  
1:10:53  
case the key is a number zero one two and the value is the string coming afterwards so let's  
1:11:01  
first make it a little more understandable let's check console lock and let's check our both  
1:11:12  
parts here and what is the key and now let's separate it by some sign plus and now we have a string and i'm just doing a dash  
1:11:29  
to separate both of them value so just type it right and save it and now we should get something  
1:11:42  
like this so let's click on it and now we have a zero let's unfold the array itself now we have  
1:11:53  
strings it is a string because it is connected by a plus sign and a dash so everything in here  
1:12:00  
converts automatically to a string this is due to the pretty relaxed handling javascript has  
1:12:09  
when it comes to strings and numbers and so on if only a single element of such a cockatination  
1:12:16  
is a string and this is a string everything else will turn into a string too it is usually a number  
1:12:23  
you see it is written in blue it is a number and the pink one is a string and if i add a string  
1:12:29  
and a number the number becomes a string so this is a string but it's just for testing here now  
1:12:36  
we want to have look at what is happening if we cycle through an array and that's pretty much what  
1:12:44  
we need here and now we need to grab every line and separate the file name from the caption string  
5.04. Prepare data for gallery  
1:12:54  
if we have a look at this line when we split up the whole gallery content string we get from the  
1:13:04  
hot spot description by a certain sign or a certain character combination of characters  
1:13:11  
and we have a look at our value here which is in fact this part of our output here then we need to  
1:13:18  
do nothing else than to split again and now have a simple split sign as it is a hash here so now  
1:13:27  
let's create a variable let let's call it item for the moment and this item is simply the value  
1:13:38  
we get here this is a string this one the whole string from here to here and this is value and  
1:13:47  
this value can also be treated with a split with a split function and now we need of course you  
1:13:56  
click you get a separator here and the string split separator string regular expression  
1:14:03  
you see the technical explanation we had already done here now we use a string as a separator not  
1:14:10  
a regular expression as we did it here so now we need some single quotes and just enter the hash  
1:14:17  
here and we want to know what we get out of it of course console.log and we want to have the item  
1:14:34  
semicolon at the end of the line and now let's save it we get a reload and now let's click  
1:14:46  
remove it here and let's click add a button and now we get an array with two elements first we  
1:14:53  
have the file name and second we have the caption the position of the file name is zero and the  
1:15:00  
position of the description the caption is one so and now we have what we want and now let's have a  
1:15:11  
container or something we can put all this together and for this i'm going to the top of  
1:15:19  
my script usually before the function works or starts to work and i'm introducing a new array  
1:15:29  
and it will collect all images in a structure the gallery later needs exactly as it needs  
1:15:38  
and now let's go images all images and it will be an empty array you see it an empty  
1:15:47  
array is just an array is always made inside of square brackets and here it is collect  
1:15:56  
all image data and now let's add everything we get from this into such an array and of course  
1:16:07  
i have in mind how the gallery library the light gallery needs this stuff so i know it already but  
1:16:14  
i will prepare it accordingly and other galleries may need some other data formats but i know it  
1:16:23  
now and i'm setting it up appropriately so to get an element here we need to throw it into this all  
1:16:33  
images and all images is an array and an array has a function built in and this function is called  
1:16:43  
push and push is a method of function which can add something to an array at the end so  
1:16:52  
and every push can have elements like items or we can add all these items in here but we do it a  
1:17:03  
little bit different and we generate an object here an object is something else so let's have  
1:17:12  
an object which is consisting not of square brackets but it is consisting of curly brackets  
1:17:20  
like this and inside of this object we have also keys and values but they are working a little bit  
1:17:30  
different as in an array because we don't have numbers but we can have keys here and one of these  
1:17:37  
keys is source this is the way the image galleries wants to have it later and the source will  
1:17:45  
contain the first position of this item you see the first position of an item is zero and it will  
1:17:53  
be the file name and so let's add it here this is item and now we need a square bracket as it is the  
1:18:01  
index of this item array so that is the first element here so if there's no semicolon it needs  
1:18:08  
a comma because they are added with the commas you see it here an array is one item comma next  
1:18:16  
item is the same as valid for objects and the other object name and please mind this isn't  
1:18:22  
written in single quotes but it is just written as it is because it is a key of an object  
1:18:28  
and the next one is called sub html it is only a capital h and this is you guess it item one  
1:18:41  
and this object will be as a unit as an object will be pushed into all images  
1:18:51  
and this is what we want to see later and now let's have this all images  
1:18:57  
visible for us in our browser console console.log  
1:19:07  
and now we want to see how this all images is looking like and i'm doing it because our light  
1:19:18  
gallery expects an array of objects and this is what we build up here and now let's have a first  
1:19:27  
check how this is working just moving it away here click and now we get an array of objects  
1:19:41  
and this is what we need here and you see the first images is an object consisting of the source  
1:19:47  
and the sub html which is the key the light gallery expects for the caption of an image  
1:19:56  
and this is specific to this library other gallery libraries there are a lot of them on the market  
1:20:02  
may expect it a little bit different or have some other construction ways or methods this one is  
1:20:09  
pretty handy here and so the object is pretty much self-explaining and now we have this  
1:20:17  
array is pretty much what the light gallery later wants if you have a closer look at what we are  
5.05. Fine tuning gallery data  
1:20:25  
getting here you may notice that there is something containing in our objects here what may cause  
1:20:34  
issues later and it is this space at the end of the file name and you see also spaces at the  
1:20:42  
beginning of the caption this is only due to the setup we did here we have some strings and we need  
1:20:50  
of course a separate sign here okay we can remove the spaces here but it is better readable if we do  
1:20:57  
it this way and there's a handy function to sanitize it here and we only need to add some  
1:21:06  
functions to this both strings in item zero we need to strip off the space and in item one we  
1:21:15  
need to strip the space at the beginning of the other handy javascript function for it  
1:21:21  
and if you use a jquery we have just dollar dot trim for it and this is containing the string we  
1:21:32  
want to sanitize in brackets and we do the same for the next one and we have a bracket here and  
1:21:42  
now if we save it wait for the reload and just enter a mouse click here and we have a look at  
1:21:52  
our array here we see everything is clean now we have no spaces at the end and at the beginning  
1:22:00  
and there's another thing we want to check here is we have only the file name here  
1:22:10  
but we want to integrate the complete path to this filename as a gallery expects it from us  
1:22:18  
so let's have a short look at our output of planetary r and i unfold the hd folder and i  
1:22:28  
have the ss folder and inside of the ss folder i have the gallery folder and if i'm looking from  
1:22:36  
index html which is our output file i have an assets folder and i have a gallery folder  
1:22:42  
and inside of this gallery folder are living all the images i need so let's do the following and  
1:22:50  
i'm going to the head of my script also as a preparation i'm using a new variable and this  
1:22:58  
variable is image path and this is predefined and i say it is assets as we have seen it here  
1:23:11  
and slash gallery and and trailing slash at the end and now we just can add image path  
1:23:23  
in front of our source item here it is item zero and we just put it in front paste it  
1:23:32  
concatenate it with a plus sign and now let's check what we get here and clicking on a hot spot  
1:23:42  
will get this one and here you see assets gallery and we have a complete file path and we have our  
1:23:50  
caption and so our data object now is ready and we can start up to build the gallery in the next  
1:24:00  
part at the end of this step i have cleaned up a little bit here and moved some code lines  
5.06. Summary so far and some cleanup  
1:24:08  
to another position so the console lock the output is only once called at the end of the  
1:24:18  
build up routine here so we see this array at the end with the eight images here and we now  
1:24:26  
have some comments for this routine it's a bit abstract here and i had some comments here split  
1:24:35  
the image items and then add an image to collection referring to this all images area here at the top  
1:24:43  
and the push action and here we are building the complete image path and we remove every  
1:24:49  
spaces so you see here it is a trim function we have for cleaning up let's type it this way  
1:24:56  
build a complete image path and remove spaces and now we have our array of image objects  
1:25:04  
containing the file names and the captions we can now just continue inside of this gallery data  
1:25:13  
function and we can just continue to write here but i'm going a little bit another way and i'm  
1:25:22  
structuring such processes more or less along what they are doing and where are some breaks  
1:25:31  
in the process where you can make a section and the first part is getting gallery data preparing  
1:25:40  
it for the image gallery and instead of continuing with building the image gallery i'm entering a new  
1:25:46  
function with only the build process itself to make some more or less structured well-contained  
1:25:54  
function blocks which are much more easier to understand and which you can continuously let  
1:26:02  
work one after another so one function does its job and at the end it calls the next function  
1:26:09  
and so on so you have a chain of processes it's easier to understand it's more tidy and this is what i'm doing now in the next clip now let's build the gallery in a separate function  
6.01. Setup gallery function  
1:26:23  
block i'm making some empty lines here and now i'm setting up the function function  
1:26:31  
and let's name it build gallery and what we now want this gallery will not be built with nothing but with this  
1:26:47  
function gets an argument and this argument will be all images as this is the data the gallery  
1:26:56  
is built from and now let's make empty curly brackets so we have a basic function container  
1:27:03  
here and usually as i said i'm working with such function blocks doing one process from  
1:27:13  
beginning to end and then comes the next one so they are running consecutively and  
1:27:20  
this is the usual procedure for me when i'm doing javascript programming this way  
1:27:27  
if the data is ready at the end then i'm adding the function call here  
1:27:33  
build gallery and i'm saying it's all image all images and this is the argument so the  
1:27:41  
gallery knows with what data to build it and this function call just continues the whole process  
1:27:50  
in the next function and as you might notice now here we have a normal function build gallery a  
1:27:59  
pretty straightforward javascript function block we're starting with word function and then the  
1:28:04  
name of the function and some arguments if necessary or if desired and we don't need  
1:28:11  
the window dot galleries data function because this function is called by the function above  
1:28:17  
and this isn't directly called by the skin so i don't need this window dot construction here to  
1:28:24  
guarantee that the scope is okay and now let's add some console dot log and some remark let's add  
1:28:38  
build gallery invoked and this is just for us to see in the browser dev console where we are now  
1:28:53  
and let's save it and now let's check it and if i'm clicking on one hot spot at the end of  
1:29:01  
everything should stand build gallery invoked that's what we want now we can continue here  
1:29:08  
with our other stuff and we need some some prerequisites um before we can start the gallery  
1:29:18  
we are using here the light gallery wants to know two things from us first what images should i show  
1:29:24  
and where should i show it and so we need the position in the whole document where the gallery  
1:29:33  
should be built up and i'm calling it gallery container and this container is already known to us  
1:29:45  
and it is an jquery object we need here and it is a dollar sign and some curved brackets and we now  
1:29:59  
need the selector it is called a selector that means where do i find the object where i want to  
1:30:07  
throw my gallery data in for this we need to head over to the skin editor and we open the skin  
1:30:16  
editor and now we go into the gallery box and what we now need is the inline gallery container  
1:30:28  
this is the div where the content of the gallery is thrown in so i copy it it is an id so this will  
1:30:38  
be written with a hash in front of it and following by the object now we have the javascript objects  
1:30:48  
of our content box here we can right click it here and go to inspect and we see this box here  
1:30:56  
if i make a little bit more place you see the gallery box here and here's the gallery inline  
1:31:03  
container it is an empty div and this will be filled with our gallery code so we need  
1:31:09  
this information up front here before we can do anything else and now we get to the next section  
1:31:17  
before we can really build up the gallery the first prerequisite is already here and the next  
1:31:24  
part will cover the settings of the gallery so when it comes to build up our gallery we can  
6.02. Create gallery settings object  
1:31:32  
just add a gallery object and throw in our data but it is only a default setup and as we are  
1:31:40  
using the light gallery here in a way which is not default usually the gallery is built up from an  
1:31:48  
html code but we want to generate the object by javascript and adding the data by javascript so  
1:31:55  
nothing is really default here and we need an settings object for our gallery and i just add  
1:32:04  
a command here target div for gallery to have it set here and now let's create settings  
1:32:20  
object and this object will show us the different parameters where we can set up the gallery and do  
1:32:33  
some tweaking to the functions of the gallery and what i sometimes do especially for development  
1:32:40  
i'm copying the url of the settings here so i can easily look after it or check some features  
1:32:48  
or some parameters and i have bookmarked it here so gallery and here is the documentation light  
1:32:55  
galleryjs.com docs settings and here you see how it works here is the object that is exactly what  
1:33:03  
we had here with our gallery container pretty much the same what we have here it is just done  
1:33:10  
by vanilla javascript and we have some speed mode and so on other settings and it is put at the end  
1:33:17  
of the gallery and we have for this settings we have an object here and this object will be created  
1:33:26  
now i have set up it before and what i'm doing here most of the time sometimes i'm kicking it  
1:33:35  
out afterwards when it's ready so i have something to look after it and the nice thing with visual  
1:33:44  
studio code is if you have such a link in the comment line here you see now it's popping up  
1:33:49  
follow link command click and if you command click here the link is active and you can easily  
1:33:57  
recap some stuff from the documentation page just a handy trick for development  
1:34:02  
and i'm usually doing it this way so let's have a settings object let settings  
1:34:10  
and the settings object is a javascript object is consists of curly brackets and  
1:34:20  
now let's add some parameters here you can find a lot of stuff here what you can do and you see it's  
1:34:28  
really a lot and you can scroll through it and even change what we are doing here to your liking  
1:34:35  
afterwards so now let's paste in some stuff i won't only make a short walk through through  
1:34:44  
the data i have added some commands and i just will put the first part here in by copy paste  
1:34:53  
and you see some remarks here i made already there's a parameter it's called dynamic if it's  
1:35:01  
true the images are not made from some html structure in a existing web page it is not  
1:35:09  
possible here because we have a completely javascript generated website here panetto vr is  
1:35:15  
nothing else and you can close it from the skin you can close it from somewhere else append sub  
1:35:22  
html2 so it is an item where to place a caption you are not allowed to download the images you  
1:35:30  
have sometimes a counter here 1 12 means first image of 12 total i don't want it here i have  
1:35:39  
a height in 100 i can loop through the images i can use the mouse wheel to scroll to the images and  
1:35:46  
transition speed between the images is 200 milliseconds so 0.2 seconds and these are the  
1:35:55  
most parameters it is a selection of what you can see on the settings page here in the documentation  
1:36:01  
and the two most important things most important  
1:36:09  
and this is the second part i just copy it here but it's pretty self-explanatory after i've told  
1:36:19  
what i've talked before and here we have the container this is a target where should the gallery  
1:36:26  
be shown and this is a gallery container we defined here this is exactly the part here  
1:36:33  
the black part in our skin text box and the other one is all images that is what we have  
1:36:40  
transferred here by the parameter and which comes from our function we defined before  
1:36:48  
so now everything is prepared just eliminate this typo here and i'm saving it and this is a  
1:37:01  
ready-made object which we need for the settings of this gallery so now we are nearly ready to  
6.03. Create gallery object and test it  
1:37:11  
build up the gallery and just let's check the check settings and install log and i want to  
1:37:30  
check the settings or let's name it settings it is as they are more than one parameter just  
1:37:42  
reload and i'm switching over to the console and hitting and so now we see an object we expect as  
1:37:56  
it is in curly brackets and the object looks like this it is listed here with a parameter  
1:38:04  
when this comes to the container it is really an html object jquery object and we have the  
1:38:13  
dynamic element is the array so it is really written as we have it created with all images  
1:38:20  
array here and the other parameters show up here as well so the settings object should be okay  
1:38:28  
and now we can really create the gallery and this part is now pretty shorthand  
1:38:39  
and it is just making an instance of a gallery object light gallery provides an object and you  
1:38:50  
can create instances of it so you are able to use more galleries than one on one page  
1:38:56  
and get an instance of a gallery object so that's what's happening here and this is a variable  
1:39:08  
containing this object i'm i'm saying inline gallery for it so it's my choice inline gallery  
1:39:17  
equals and now this gallery this is this general object's name of a light gallery provided by the light gallery  
1:39:30  
javascript and this object has two parameters and both of them are already prepared it is a gallery  
1:39:39  
container and it is settings so these parameters are necessary for the gallery object or the  
1:39:49  
instance of the gallery object to get built so this is one step and i save it and we will  
1:40:00  
see nothing so far because the object is just a data object it is invisible by nature  
1:40:07  
now we need another step to make this gallery visible is we are calling it this object or this  
1:40:17  
instance of the object inline gallery and this inline gallery has some own methods and you see  
1:40:26  
here is provided some special stuff which is connected to this gallery object by this script  
1:40:33  
and now we can choose one of them and it is open gallery  
1:40:41  
and this makes the gallery really visible it is a function so we need  
1:40:50  
some curved brackets here and when this is finished we will see it so let's  
1:40:57  
copy it hopefully it works so let's click this  
1:41:02  
and here we are we have a caption we have some arrows we can click through the images  
1:41:11  
we see the caption and the images are a little bit too small so we have some issues left but  
1:41:16  
basically it works and here we have the last supper you see some issues here  
1:41:25  
if we point to the next gallery we have a crazy mixture of some images so it is working but it  
1:41:35  
isn't perfect so we need to clean up some issues now but now you have seen the principle of working  
1:41:43  
with such libraries in javascript usually they have some settings objects you have some other  
1:41:50  
objects and then you create an instance from a genuine object provided by such libraries  
1:41:56  
and you call this instant or you create this instance with transferring some data and some  
1:42:04  
settings to this object and now then you have an instance living up from now on and this instant  
1:42:10  
has own methods and functions you can call open close for example or change or something like that  
1:42:17  
and it differs from what the library is made for and this is a pretty typical procedure  
1:42:24  
you work with libraries providing some features and functions for your purpose  
1:42:29  
and now let's try to fix the issue with the image container being not high enough so if i click here  
6.04. Fix image height  
1:42:38  
and see some images reload here we have the small images they should at least reach down up to here  
1:42:49  
and now let's check it if i'm using the right mouse button to show where i am in the document  
1:42:58  
object model i'm going to inspect and i see here it's an image object and i'm scrolling a little  
1:43:06  
bit up and try to find a box the outer box we have here it is the gallery container and this  
1:43:16  
gallery container is something i want to be bigger this is a container which is wrapping this image  
1:43:26  
and now i need to have the gallery container and i'm targeting this here and now let's try what i  
1:43:34  
can change here just by fiddling around with changing these elements css and if i'm going here  
1:43:42  
to the element and i'm entering here a new line and i'm going to hide and let's say i want to have  
1:43:51  
100 percent ah okay this goes into the right direction it is just a little bit too much  
1:44:00  
here so let's enter a little function to make it fitting independently of what the screen size is  
1:44:12  
and maybe you know in css there is a nice function it is made of calc and calc is a  
1:44:20  
calculation routine where you can mix up a value like 100 and subtract or add some absolute values  
1:44:31  
let's say 50 pixels so i will 100 but i will have 50 subtracted so this is 50 pixels here and now i  
1:44:41  
can fiddle around here with cursor up and down you can have shift cursor you can increment this by 10  
1:44:49  
pixels a step or single pixels and i will try 20 pixels and what i need to do now to make it really  
1:45:03  
working is i'm copying this height calc 100 minus 20 pixels go to my custom css and just add it in a  
1:45:16  
second line and now i need this gallery container just copy it copy and add a hash in front of it  
1:45:25  
this is a container we have set up in the skin editor and copy it and this custom css is also  
1:45:34  
loaded because it is living in the lib folder and the lib folder is outputted by monitor vr into the  
1:45:40  
html output and if i'm making now a reload with this custom css i don't get an automatic reload  
1:45:46  
i need to check it here and nothing changes so what we need here is when it comes to css  
1:45:56  
i'm going to monitor vr and i'm going to the output section here and really re-output it  
1:46:04  
and doing really a reload or a hard reload with command shift r and now the new css  
1:46:14  
really should be loaded and that's what i want here and here we have our images so  
1:46:24  
this is pretty okay for the moment and here we see the the container has already  
1:46:33  
these values it is not really perfect so let's check it here let's 30 pixels maybe it's better  
1:46:51  
you can swipe this gallery as you see here and i will switch off the  
1:46:58  
debug box here now because i don't need it anymore debug and appearance i don't need it here  
1:47:09  
so save the skin and now we should see the gallery  
1:47:17  
as we want to see it now it looks nice and what we have here if we open a second gallery and we have  
1:47:25  
the old images staying here this issue will be corrected in the next section so this is how you  
1:47:33  
can alter some styling issues if you have or correct some styling issues if you are using  
1:47:40  
such a library like light gallery and you just need to click on there with the right mouse button  
1:47:47  
on the element and fiddle around where is the point where i can change it where it reacts to  
1:47:55  
changes made live here in the developer box it is a pretty straightforward way to correct  
1:48:02  
elements from their display for the issue with old images still showing up if i open a new gallery  
6.05. Fix sticking images  
1:48:11  
let's check it this is one image here you can move it around there is no other in this gallery  
1:48:17  
and if i close it and go to the next also a single image then i have this one and the next one is a  
1:48:26  
second one in fact we have an old image lying in the background and two new images before so  
1:48:33  
something is messing around here we can have a little check here in the console and we can  
1:48:41  
test some variables so we have our all images array and we can ask what is in there it may be  
1:48:53  
not valid so he reference error all images is not defined so we have it here but it is only  
1:49:01  
valid inside of this function and inside of the script and this script is living inside of the  
1:49:06  
skin js so it is in this case sometimes it works sometimes not in this case the all images is  
1:49:14  
outside of the focus so we cannot check it here so let's think about how we can do it otherwise  
1:49:23  
and we have some other possibilities so we have an object a gallery and we have an  
1:49:30  
images object so we can do two things and we can make a new function and let's say this function  
1:49:41  
will has a name a kill gallery so i want to wipe the data and i want some cleanup  
1:49:53  
before i open a new gallery and what we need here is to clear up these all images  
1:50:03  
array so i copy it and if i want to empty it i don't want to delete it i just want to empty it  
1:50:12  
so let's point an equal sign and just an empty square bracket so  
1:50:18  
all items of this array will be erased and the next one is remove  
1:50:24  
gallery from html and this is the next one this is pretty easy  
1:50:34  
if you have such an gallery container like we have it here in our skin editor we  
1:50:43  
have here a diff which is empty and the gallery is putting all its html and all the stuff we  
1:50:55  
need to show up the gallery it is just here in this point and so we just need to clean up all  
1:51:05  
html living exactly here and this is pretty easy you can just take here the gallery container  
1:51:14  
as a jquery object so remove and this jquery object has a property is html  
1:51:22  
and inside of the curved brackets you have it content and if you add nothing then this will be  
1:51:32  
wiped out so the every html generated by the light gallery and what we see when the light  
1:51:39  
gallery opens will be vanished here so now i need to invoke it by the skin editor  
1:51:51  
and let's try it so i'm going to the skin editor and i'm going to my close button  
1:51:58  
the close button sets a variable gallery show to false so it disappears from the screen and it  
1:52:05  
sets the gallery content to nothing it sets the title to nothing and the same function block is  
1:52:15  
attached to gallery tint and can add it here now for the gallery show content title something is  
1:52:26  
missing so i need to copy this gallery show here and add this put it on the top and now i'm adding  
1:52:40  
at the gallery close button first the mouse click and the mouse click is calling a function and this should be javascript  
1:52:53  
kill gallery so i copy it here or i copy the whole function javascript kill gallery okay okay  
1:53:11  
copy it and add it to gallery tint as well paste can stand at the last position in the order here  
1:53:21  
in the actions order and now let's try it whether it works so save it here and if i'm now going to  
1:53:32  
one gallery and close it going to the next i can't see any other  
1:53:42  
elements here or let's test it with several one two three  
1:53:49  
and so on you can cycle through it now let's have a single image gallery only one image visible so  
1:53:59  
the all images object is cleaned and the gallery html is removed from the skin text box so this  
1:54:09  
issue is resolved now now as the gallery is generally working we only need to fix some  
6.06. Modify CSS for image description  
1:54:19  
minor issues here if i open it and go through the gallery you have the white caption here  
1:54:29  
which isn't working very nice when it comes to bright backgrounds and the images so that's what  
1:54:36  
we need to fix first and there's a very simple trick to get this the light gallery produces  
1:54:44  
a pretty complicated html structure and it is pretty difficult to find all this stuff here  
1:54:51  
there's a simple trick to find this part where this caption is placed by the light gallery  
1:54:58  
and just enter here the flood as the wording we have in this caption this should be pretty unique  
1:55:08  
just we have it here and here we have the element let's check it this is a picture and we have the  
1:55:15  
diff and here stands the flood and it is marked in our display here like that what we want and just  
1:55:24  
make the marking permanent you see this little icon at the right side of an element so you can  
1:55:31  
permanently mark it and you can also test some tweaking slides so let's have the background  
1:55:39  
color and i want to make it a little bit darker but transparent so i'm going with r g b a and  
1:55:51  
enter some black this is a black and now comma and now i have some alpha now i need to unmark  
1:56:02  
it to see what i want and you have you see there's a black background and if you put your cursor into  
1:56:09  
the last number you can hit the alt key or option key and just switch a little bit around and it's a  
1:56:17  
bit a little bit too less let's stick with it and now you have everything you want you have a  
1:56:25  
parameter and you have a class where this parameter is to attach this rule so head over to custom css  
1:56:34  
and enter dot lg this stands for light gallery sub html curly brackets paste the css code from  
1:56:49  
the development part in here and now save it and you now need of course we got a real output from  
1:56:58  
polito vr with the cogwheel to really put this changed css into the output and now we can get a  
1:57:09  
reload and now this caption should be nicer than before that's a pretty easy way to find  
1:57:22  
some places where to tweak everything to your liking so i think our image gallery project for  
6.07. Alter gallery settings for single image display  
1:57:32  
planetary r is now at about 98 or 99 one minor issue in my eyes but i like to make it really  
1:57:44  
good is the following if you have a gallery with several images you can swipe around and loop left  
1:57:54  
right and if you have a gallery with one image you can also swipe kind of a rubber band effect  
1:58:05  
and it doesn't make really sense so i want to disable swiping or dragging when i have only  
1:58:13  
one image and this is a pretty good example how you can change settings of such an object  
1:58:20  
construction now using with light gallery afterwards or when you prepare this gallery  
1:58:27  
and that's a great advantage of what we are doing here we are setting up this gallery dynamically  
1:58:33  
just on the spot when we need it if we click an hot spot then the gallery is generated and we can  
1:58:40  
configure it on the click directly after the click not before or not static but it's reacting  
1:58:48  
to what we want and so let's add some setting parameter here depending on how many images we  
1:58:56  
have after that i make a little bit space here it must happen after the settings object is already  
1:59:05  
living and filled up but before it is used here in the next line so here we need some  
1:59:12  
disable some condition for swiping and dragging switched on or off disable drag swipe for one  
1:59:26  
image as a condition we now need some construction with if curve brackets and then curly brackets and  
1:59:36  
in the curve brackets we have a condition the condition is pretty easy here we have all images  
1:59:42  
and all images is an array and an array has one property it is dot length and it is a count of  
1:59:52  
elements length and if this length is larger than one then swiping should be enabled and now let's  
2:00:07  
check for the parameter if it's available and i'm heading over to the documentation of the library  
2:00:14  
and i don't want to scroll around here very much so let's check for swipe for instance i have tried  
2:00:25  
it already you see it here enable swipe support for touch devices so enable swipe and as we see  
2:00:33  
the settings objects if we want to add something here you just need to write setting settings and  
2:00:42  
now you add a dot as it is a child of this object and enable swipe and this should be true if we  
2:00:52  
have more than one image so it's a first and we have an else this is a condition if we have only  
2:01:01  
one image then we just copy it and we set this to false so now let's check this and as you see here  
2:01:15  
in the documentation we have also an enable drag and this is what we see here when we are using  
2:01:24  
it on the desktop this is for mobile devices so just copy this and replace this enable swipe  
2:01:34  
by enable drag copy this line and replace true with false and now this should work for mobile  
2:01:45  
devices and for desktop so let's check it if i have more than one images both of these features  
2:01:52  
are enabled and else for one image these are disabled and now one image galleries shouldn't  
2:02:02  
be able to swipe so that's a multi-image so and this should be a single image here  
2:02:11  
and nothing is moving here this image here is just the genuine drag and drop function  
2:02:20  
of the browser nothing to do with the project here so now it is really what i want from the  
2:02:27  
feature catalog i desired for this gallery and now we are really at the end of this tutorial  
2:02:33  
and thanks for listening and watching and it is only one example how you can do such stuff  
2:02:41  
with palette 2vr there are a lot of other image galleries out there i just selected this one  
2:02:48  
for the light gallery for it's pretty easy to configure and it has a lot of features and you  
2:02:56  
can do a lot of stuff with it and it's a principles of data processing from palette 2vr skin variables  
2:03:05  
to data structures you can use outside in a javascript and to do something with it that was  
2:03:12  
the main goal to show how this basically works in in javascript to extend this feature and to make a  
2:03:20  
pretty compact and easy to configure image gallery here and to recap what we have here in our  
2:03:28  
program itself you need an empty text box here you need some actions on the hot spot and on the  
2:03:35  
closing elements and you can get away with three variables here and in the panoramas themselves  
2:03:45  
you only add a hot spot from this type add some data to the description and a title and you are  
2:03:54  
free to use one or more images and it's a pretty elegant combination and if you want a new hot spot  
2:04:00  
just choose this template enter some infos in hotspot title hotspot description and the image  
2:04:07  
gallery related to this hotspot will generate automatically so you only have one library to do  
2:04:15  
this and everything else comes from the hotspots themselves so there is a pretty flexible workflow  
2:04:21  
and process here and of course you can change a lot of features if you are using a powerful library  
2:04:28  
like light gallery and you see that you can tweak all this pretty easy with css and i showed a  
2:04:36  
little bit how to find the places where visual issues are occurring and what you can do with  
2:04:42  
this so i hope it is a pretty useful example how to do stuff like this and yeah thanks for watching

