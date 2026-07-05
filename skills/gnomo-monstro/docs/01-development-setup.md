# **Extending Pano2VR | Development Setup**

1.1. Introduction  
0:00  
Hi and welcome to this second episode of our tutorial series about extending  
0:07  
Pano2VR with JavaScript. In this tutorial I want to share some thoughts  
0:15  
about a proper project setup you may do when it comes to add your own JavaScript  
0:23  
files to a Pano2VR project and how to use external software to make this work  
0:31  
easy. When you hit the cogwheel button in Pano2VR to generate the output  
0:38  
Pano2VR does all its technical magic in the background and you don't need to  
0:44  
care about what's happening here. Pano2VR is managing all the folders and  
0:50  
files needed for the output and for a functional project you can upload to the web and you don't need to care about anything. And if you want to extend  
1:00  
Pano2VR with JavaScript you need to add something and you need to be aware of  
1:07  
how a project is set up when you want to export it together with your own files.  
1:15  
To demonstrate a proper project setup I have assembled a small virtual tour with  
1.2. Project overview  
1:22  
six panoramas. There's nothing special in it. The only thing I have added was a  
1:29  
custom property to the hotspots to make them not only show upwards but also show  
1:38  
two different directions. So here the arrow direction is left. It's  
1:43  
interpreted in the skin to rotate the arrows in the skin. Here we have an arrow  
1:50  
up and a right when it makes sense from the orientation in the room to have a  
1:59  
point forward or to a location downstairs or turning right. So to reflect a little  
2:07  
bit the geometrical situation in this location. That's everything we need to  
2:17  
know about the structure of the tour. When it comes to the skin I started with  
2:23  
a blank skin, only added a node hotspot. Here is the arrow icon and this arrow  
2:29  
icon is turned with a logic block left right down by certain angles to make  
2:37  
these directional arrows happen. And besides that we have a side menu made  
2:45  
from a cloner with a node image and so on. Nothing special. A menu button and a  
2:51  
title on the top with the text of the user data title. So absolutely nothing  
3:00  
special. I intentionally kept this skin extremely simple so you can more focus  
3:08  
on the parts we introduce into the skin which have to do with JavaScript. When it  
1.3. Using JavaScript code in skin  
3:17  
comes to integrate JavaScript into the skin we have basically three ways of  
3:23  
doing it. And to demonstrate this I have prepared a component containing three  
3:30  
elements to show just these three methods. Here it is in my component  
3:39  
library. I have a prefabricated component and integrated into the skin. And now  
3:49  
let's see what is living in here. The first approach to have JavaScript  
3:57  
executed from within the skin is to use a text field. This approach is already  
4:04  
working in Ponderto VR version 6 and is still valid to do so in Ponderto VR  
4:12  
version 7\. If you have a text field and you start this text with JavaScript  
4:19  
colon then everything what follows will be not printed out. It will be executed  
4:28  
as a JavaScript. And here we have an alert so we have a little pop-up box and  
4:34  
we have a text in this pop-up box written here. And if I save it here and  
4:41  
I'm going to the output let's output it here and you get hello from text field.  
4:52  
Just the text I typed in there. So let's just put the live project on the first  
4:57  
tab and the final project on the second tab. So if I now hit OK there comes some  
5:06  
other stuff I will explain later. And you see the screen is black on the first  
5:14  
alert and even it stays black until the second alert is confirmed with OK. So  
5:23  
these commands are blocking the build up of the skin. And this is predictable as  
5:31  
this script line is integrated into skin.js. And skin.js is the JavaScript  
5:37  
which builds up the skin in the user's browser. And if it's stopped by an  
5:43  
command which throws an alert which needs to be confirmed then this whole  
5:49  
skin.js script is stopped. So if you built in some JavaScript this way into the  
5:57  
skin be aware that it should not stop the whole script. Then you can run into  
6:04  
problems. That's the first method. The other method is we have a text button  
6:10  
with an action. And here I wrote click me and we have an action here mouse click  
6:18  
and mouse clicks can have an action or any other events can have an action with  
6:26  
go to URL and inside you don't write a URL like HTTP colon double slashes and  
6:34  
so on. You just enter a JavaScript command by also starting JavaScript  
6:40  
colon and then starting your JavaScript command. Here we have hello from text  
6:47  
button and if I hit ok ok and save it go to the browser hello from text fields  
6:55  
this is the first command and here's a hello from code block I discuss later and now we have this click button. This click button is not blocking skin.js  
7:05  
as it waits for a mouse click. It does nothing until I click it and then I get  
7:10  
the command. And here we have the command pop up in front of the already assembled  
7:16  
panorama because it hasn't blocked the build up of the whole project. So these  
7:22  
are the two methods which are working in version 6 and version 7 and a new  
7:28  
feature in version 7 is the code block. And the code element we have can be  
7:36  
filled with JavaScript and this is this part. Basically it does the same as the  
7:45  
text field but you don't need the prefix JavaScript colon just type the plain  
7:52  
JavaScript command into it. This code element is also integrated into skin.js  
7:59  
so if you put some commands in here which are blocking the execution of the  
8:06  
whole JavaScript it will interrupt skin.js and pause the building up of the  
8:14  
skin or building up the whole panorama project in the users browser. So be careful with commands which are blocking and need some user interaction before  
8:25  
they can continue. And this is a second command which is coming when you reload  
8:34  
the text field. Now it comes from the code block and now we have the ready  
8:40  
panorama and the JavaScript button is still waiting for user interaction. These  
1.4. Internal or external JavaScript?  
8:47  
are the three ways of integrating a JavaScript command into a skin. After we  
8:54  
have seen the blocking function of some JavaScript code waiting for user  
9:00  
interaction inside of the skin and inside of skin.js might induce some  
9:08  
problems and there are some other approaches which I want to discuss now  
9:15  
and in the next sections. We can have some timing problems. When you load  
9:21  
JavaScript in the browser it is pretty important when this JavaScript was  
9:29  
loaded. Let's have a look at our project and I hit the F12 key to open the  
9:36  
developer panel and just reload the project and see the files coming down  
9:44  
from the server. You see you have an index.html then the index.html loads  
9:50  
panoplayer.js and then loads the skin.js. And the skin.js needs to be  
9:59  
finished to have the complete user interface to have all hotspots and all interaction elements and all functions. You need to navigate from one panorama  
10:10  
to another and so on and the panorama player needs to have its loading finished  
10:16  
to be able to load all the images and to display them in the panorama viewer.  
10:24  
Everything else is loaded afterwards and here we have some timing issues if  
10:31  
something gets blocked. So if you want to have more control about when something  
10:40  
is happening then it's better to use external files to host your JavaScript  
10:48  
you want to add to your project. If we have a look at skin.js and let's have it  
10:55  
open in a new tab so you can read it and now let's have a look to our JavaScript  
11:06  
inserts we made. I hit command F and now let's search for code block. And this  
11:15  
section here is just one code line inside of the huge amount of code you  
11:23  
have here in this skin.js and you have no really control when this command is  
11:30  
fired. So there is a lot of uncertainty you introduce into your project if  
11:36  
you're using JavaScript right away from inside the skin. Especially when it's  
11:43  
timing critical. If you are using JavaScript for user interaction then it's  
11:49  
no problem. So here we have click me it's only reacting on a user interaction and  
11:55  
so it's no problem it's just waiting for you. But everything what needs to run  
12:00  
automatically on start of the panorama or during the panorama can be timing  
12:06  
critical and it's better to have control over it if you use it in an external  
12:12  
file where you can define when it's loaded and how it's loaded. And you can  
12:19  
have much more control when this external file is finished and ready to  
12:24  
operate. And another advantage we will see in the next section is if you edit  
12:31  
your JavaScript code in an external editor it is much more comfortable than  
12:38  
it is here where you just type in text with no error control and so on. And we  
12:44  
see the big difference when using a professional code editor to edit this text this JavaScript code not inside a text field or inside of a code block or  
12:55  
inside of an action box. Here this is a maximum comfort you can have here and  
13:05  
the convenience is pretty limited inside of Pano2VR. It's no problem and  
13:11  
it's not the main focus of Pano2VR. The main focus is a no code operation and  
13:17  
these text fields are as simple as possible. And coding inside of Pano2VR  
13:26  
is not the main focus of the program but it can be done and that's what we are talking about all the time here. And we need to get it a little bit more  
13:36  
convenient and more professional and that's what we are covering in the next section about using an external code editor to fabricate code which is  
13:46  
cooperating with the skin and panorama player. Now let's have a look how to  
1.5. Using external JS files  
13:52  
integrate an external JavaScript into a Pano2VR project. Let's take some action  
14:01  
here. I just copy this JavaScript code here inside the skin and I want to have  
14:10  
this code living in an external file and this file should be integrated into a  
14:18  
Pano2VR project so it is exported together with the normal output we  
14:23  
usually have when we hit the copy button. So let's copy this code and now let's  
14:31  
change to the Finder or Explorer and we have our project folder here. And this is  
14:39  
our skin and this is our Pano2VR file and with the output folder with  
14:47  
everything we see in the browser and here are my six panoramas. I enter a new  
14:53  
folder. Let's name it my JS folder and inside of this folder let's create a text  
15:06  
file and let's save it as my JS folder and let's save it as my JS file and now  
15:29  
we need the extension .js to make sure that it is recognized as a JavaScript  
15:38  
file. Save and now let's paste the JavaScript code inside the text. Nothing  
15:48  
else before, nothing after it and just save it. Now we have this file living  
15:55  
here along with our project in a special folder and this folder now needs to be  
16:02  
integrated into the project. We can do it with two actions we need to have. The  
16:12  
first action is we need to make sure that this folder is copied to the output  
16:18  
when the project is exported by hitting the cockwheel button. And now let's do  
16:26  
this first. We go to the output and the output has properties on the left side  
16:33  
and if you scroll down and open the advanced section here then you will find  
16:41  
at the very end assets. And this asset section in the output panel allows  
16:48  
Panetto VR to copy other stuff which is usually not integrated into the output  
16:56  
additionally to the output. You can add single files or you can add a whole  
17:03  
folder and the folder with its with this content is integrated into the output.  
17:09  
This is my folder. It will be copied to output including this JavaScript file in  
17:16  
it. Open it and then it is listed here and if I now hit the cockwheel button  
17:22  
then we see in the finder, let's change to the finder, you see it in the output  
17:30  
and where is it? Now we have a folder assets. It's named after this panel.  
17:36  
It's always the same. It always looks like this. And we have here some other  
17:42  
folder which doesn't belong to here. And now we have assets, my JS folder, my JS  
17:50  
file inside of it. And it is copied to the output. But we need to have some  
18:01  
changes. Hello from my external JS file to distinguish it from the other  
18:11  
commands we have inside of our skin. So save it and to make it operational you  
18:22  
always need to save an external file and then to hit the cockwheel button or in  
18:30  
PondoTV R7 just save it and you have an update and a live update here. And now  
18:37  
let's have a look what we are loading here. And so hello from tax field bum bum  
18:45  
bum bum bum. And now let's have a look at our network and maybe we will find this  
18:54  
file here but we don't. You don't see my JS file here. That has a reason. The  
19:04  
operation we need consists of two parts. First part is make sure it is copied to  
19:10  
the output. We are the asset folder. That's a step one. We finished already. But now we need the project to make sure that this file is loaded in the user's  
19:20  
browser. It is just copied so it is prepared to be loaded but it isn't  
19:26  
loaded really. This is the next operation we need to do. Let's go to the skin and  
19:34  
we have two places where we can do this. The first place is if you click in the  
19:40  
empty area so that nothing is selected in the element tree. Then you get the  
19:46  
general properties of the skin. And there we have the bottom we have external  
19:53  
files. And now let's click on type or double click on type or on the plus sign  
20:02  
and we can select is this external file which should be loaded a CSS file or  
20:09  
styling and so on or is it a JavaScript file. First we need a JavaScript file and now you need to type. You need to do it manually. Now we need to type in the path  
20:23  
to this JavaScript file we want to have. And we are operating from within our  
20:32  
output folder. We have the skin.js and inside of skin.js there will be the  
20:41  
loading will be induced. And we have inside of this folder we have assets, my.js  
20:48  
folder, my.js file. Now let's do this. Assets slash my underscore asset or just  
21:06  
copy it to be sure we have no typo in it. And my underscore js file dot js. So  
21:21  
let's correct everything and double check it. There's no error warning or  
21:27  
anything like this. You really should be sure that it's correct what you're typing here. Now when we save you will induce automatically and reload in the  
21:38  
main app. And if you change to the browser you should have a loading  
21:46  
process. And even before you can before you confirm all these boxes here you  
21:55  
have this file loaded and you can see my.js file dot js. And if you reload you  
22:07  
get this first. That is pretty interesting as this file is loaded by  
22:15  
index.html and we need to confirm it by just hitting command you to get the  
22:22  
source code of the index.html. And what I've entered in the skin is introduced  
22:30  
into the HTML file into index.html. It is copied to here. And this makes sure that  
22:38  
this file is loaded very early while skin.js is already loaded and working  
22:44  
and is in our case blocked by our alert. This file is already loaded and  
22:50  
operational and so this alert comes first because it is faster than it's also only one line. It is a little bit smaller than this one. So you have when  
23:03  
the panorama starts working if everything is confirmed. So this is a good example of how timing works when you are loading JavaScript files. And  
23:12  
this is a way how you can do it. And there is an alternative. This loading  
23:21  
line with external files can also be used inside of a code block. You see this  
23:29  
here the same expression external files you can do the pretty much the same here.  
23:35  
CSS and JavaScript files can be loaded here. And the difference is  
23:44  
here it is focused on the project and this special skin. And if you have it in  
23:51  
a code block as I introduce this with a component you can save these files  
23:57  
within the code block. That's pretty convenient if you want JavaScript to be part of a component. These are the two ways to link and load these JavaScript  
24:08  
files. And here we need to make sure that these external files are really loaded  
24:13  
and copied to the output. Otherwise the loading introduced here would fail  
24:21  
because this file wouldn't be present if it's not copied to the output folder. So  
24:27  
we always have two steps. Make sure the asset folder and the asset copying is  
24:32  
working and then initiate the loading in the skin either in the general  
24:39  
properties or in the code block section with external files. As we have now two  
1.6. Reviewing changes  
24:49  
programs working together on one side Pandota VR as we are used to and on the  
24:56  
other hand we have now a code editor. It is just our simple text editor here. And  
25:03  
we have a place to edit here and we have a place to edit here. You need to get  
25:10  
used to this sequence how to operate these two programs together. So let's  
25:16  
just do another rehearse to make it more clear. I just kick out this component  
25:24  
here and return to my original skin except these JavaScript loading of this  
25:32  
external file. I save it and I change this and now let's change this  
25:38  
JavaScript file. I don't want to have this blocking alert. I want to have an output in the console of the web browser. So let's type console.log and this  
25:53  
is an output which is silently in the web developer. It's not blocking anything.  
25:58  
Just save it and after you save this external file just change to  
26:09  
Pandota VR. Save it and with saving it you get a reload in the browser. And now  
26:19  
let's reload it and hello from my external file. And this you see the old  
26:27  
version. Now let's have the new version. If you save the skin not all changes are  
26:33  
coming through. Save in the main app and you have a reload or hit the generate  
26:41  
output button from here or use alt command G. I'm doing it here to  
26:49  
initiate an output and now we have no blocking alert box. But you have here in  
26:56  
the console a hello from my external JS file and this is coming from my JS file  
27:01  
from line one. And here we have the origin of this JavaScript call and now  
27:10  
it is non-blocking because it's not throwing an alert which you need to confirm. And so this is the sequence you have edit external file, change to  
27:23  
Pandota VR and generate or save the project and then it is live. So the  
27:31  
changed file is copied by Pandota VR into the output and then we have a  
27:37  
refresh here and we see the ready updated JavaScript file here in our  
27:43  
browser. In this section of our tutorial let's have a look on dedicated code  
2.1. Overview of code editors  
27:52  
editors and what we can do with them and how we need to configure them to make  
27:58  
the work with our Pandota VR project as convenient as possible. When we have our  
28:04  
normal text editor it's pretty much the same as notepad on Windows. We have this  
28:09  
JavaScript code is a little bit better readable than in the text boxes of Pandota VR but it is just plain text nothing else. And there is for instance  
28:21  
there is no error warnings or no code correction or something like that and you can have a lot more convenience if you're using a dedicated code editor. So  
28:32  
let's have a look at some editors. I have put together a little selection to have  
28:39  
a view on some apps which are popular in this area a lot more than I have listed  
28:48  
here. Let's just show some of them. Barebones edit is a very old Mac editor.  
28:56  
It is a paid version but you can use it in a free mode with some reduced  
29:02  
features which is pretty okay for what we want. And it is very old and it is a  
29:09  
Mac only program and I have used it for many many years and it's a really nice  
29:16  
program. And you see the code is colored and you have indents to make the code  
29:23  
better readable and more structured. And then we have for example kind of the  
29:31  
Windows counterpart we have a Notepad++ which is very popular in Windows. It is free  
29:40  
and you can just download it and start away. Then we have a paid program which  
29:50  
is Sublime Text which is also very old. It is available for Mac, Linux and Windows.  
29:57  
Then we have a free version. It is Atom and it is an open-source program. It is  
30:05  
free for all platforms and it is also recommendable. It's very fast because it's  
30:10  
a really slim design and and it's a bit outdated now but it's still working and  
30:18  
it is recommended to have a look on it. Then we come to more commercial software  
30:27  
like Adobe Dreamweaver. If you have the Adobe Creative Cloud running then in the  
30:32  
full cloud you have Dreamweaver as a web editor and it has also a very sophisticated code editor as you see here. And of course it is able to do a  
30:43  
lot lot lot lot more than only code editing. So it is a little bit on the  
30:49  
expensive side and a very special tool and that is what I'm using most of the  
30:57  
time. Not WebStorm there's a companion it's called PHPStorm and we have a  
31:04  
company JetBrains. They are specialized on code developer tools for a lot of  
31:10  
programming languages and among them is WebStorm which is specialized for  
31:16  
JavaScript and web production and it is a project oriented tool and you have a  
31:22  
lot of little helpers here which are reacting to your code and kind of the  
31:28  
program understands what you are writing and is correcting you, makes suggestions  
31:34  
and even some AI features are coming up now with suggestions to make better code  
31:43  
or to make it more easy for you to document your code and so on and so on. It's not really cheap but it's an absolutely professional program. And last  
31:54  
but not least I think it's one of the most popular code editors ever. I just  
32:00  
forgot the JetBrains apps are for Mac and for Windows and then we have Visual  
32:05  
Studio Code. It is an open source program but it is hosted and operated by  
32:10  
Microsoft and it is a very slim program but you can extend it with thousands of  
32:18  
extensions and it runs on Mac and Windows and you see it is for many  
32:24  
programming languages among that JavaScript, HTML and so on. And in our  
32:32  
tutorials we will use it as it's free and you can start away really easy and  
32:38  
with little to no configuration we make a little bit tweaking to the program to  
32:45  
make it better fit our needs and I will start with this program as an external  
32:51  
editor or when it comes to add your own JavaScript to a Ponito VR project.  
2.2. Recommended Editor: VS Code  
32:58  
So now let's have a look on Visual Studio Code and see why it's such a big  
33:08  
recommendation for a free code editor and let's change to the Finder and just  
33:14  
have a first look with opening our JavaScript file with Visual Studio Code  
33:21  
and you see the very simple interface and you see compared with the simple  
33:26  
text editor we had before we have some coloring here and you see the yellow  
33:35  
brackets and if you hover with the mouse on it okay it's a method console it  
33:40  
expects some data and you see MDN reference and you can click here on any  
33:47  
of these bubbles and if you click on MDN reference then you can open the  
33:54  
Mozilla developer network and have just that code piece you are clicking on or  
34:01  
hovering on with your mouse explained with all is syntax specifications and  
34:06  
all the tech behind it and here on the sidebar we have the files currently is  
34:16  
only one file open and we have some searches and what we have also and this  
34:23  
is this button here with the extensions here you have thousands of extensions to  
34:32  
enhance the features of Visual Studio Code and to make it more versatile to  
34:40  
make it more powerful or to make it fits special needs or special programming  
34:45  
languages like for example as it pops up right here  
34:51  
extend script is a script language for Adobe applications and you have an  
34:56  
editor extension to understand this code and so on it is very difficult to  
35:02  
find the right stuff here needs a little bit of testing and recommendations and  
35:08  
for our project I will only install a small set of four extensions to make our  
35:16  
work a little bit more convenient I will do this later and I will just  
35:22  
demonstrate some other features we will use and which are very very useful we  
35:29  
can have workspaces we not only have a focus on one file after we have opened  
35:36  
it but we can also have a whole list of files and you not only can open files  
35:42  
but open whole folders and we do this later when we set up our project and you  
35:48  
can have settings here below and I have features I need only for special projects  
35:55  
and so you can have an other set of settings or another set of extensions  
36:01  
for your needs and behind Visual Studio Code there's a large development  
36:07  
community which is taking care of it and you have frequent updates and it's a  
36:14  
very vivid ecosystem and it is always up-to-date as it's really a heavy  
36:19  
recommendation and so we will use it for our project here with some little extra  
36:26  
extensions I'll install later. To start with VS Code we just generate now a  
2.3. Creating a workspace in VS Code  
36:37  
workspace the first step is opening a folder and now we take our whole folder  
36:46  
just here it is our O2 development setup because we need to have all these files  
36:54  
here under the scope of our application here just open it and then you get a  
37:00  
file list on the right side you had a welcome here we can dismiss it and now  
37:08  
we have development setup as a folder and here's our JavaScript file and now  
37:15  
we have it inside of our file structure and you can unfold the output folder so  
37:22  
let's have a look at the index HTML we see all code is really understood by the  
37:29  
program and colored and indented and pretty nice to read and even in long  
37:36  
longer documents you have this code lens here and you can see okay that's an area I want to navigate to and we have the Pano2VR player with all this  
37:49  
obfuscated code here but the header you see with the license info or some other  
37:55  
types of stuff or you can inspect the tour XML so it's also understands XML  
38:02  
files and does a proper coloring to make this code pretty nice readable and so on  
38:09  
and now as we have this project open let's save this as a workspace I usually  
38:18  
started with an underscore so it stands on top on a Mac you can have other  
38:24  
naming conventions for your own and now it is a workspace and you see this  
38:30  
workspace title here it's a folder name and we have also a file here dot code  
38:39  
workspace extension here for this project and if you want to open the  
38:47  
whole project just double click this and Visual Studio Code opens with the  
38:53  
workspace and having all these files in this tree here besides having a workspace  
38:59  
you can also have settings and profiles you see this little cogwheel here in the  
39:07  
lower left corner you can manage profiles as I said I have some profiles  
39:13  
for some projects I have made a blank profile here now for this tutorial there  
39:22  
is nothing installed it's just plain out of the box what the program is able to  
39:29  
do now and we will extend it a little bit to make it a bit more convenient and  
39:36  
to add some features which are pretty useful for our work to enhance the  
2.4. Extending VS Code for Pano2VR  
39:44  
features of Visual Studio Code let's now install some extensions which are pretty  
39:51  
useful for our work and I'll change to the extensions tab here on the left side  
39:59  
and we have now installed nothing recommended there are some of them and  
40:06  
popular there are thousands of them and now let's get the four extensions I want  
40:13  
to have the first extension is prettier you see it have 48 million downloads  
40:21  
though it is pretty much a standard just let's install it and I'm installing it  
40:26  
now into my blank profile so it's only for this profile and after clicking it  
40:33  
it's installed and prettier is a code formatter for a lot of programming  
40:39  
languages especially for web tech and for the web languages JavaScript CSS  
40:45  
HTML and so on and it is very nice to read and it is colorizing code and so on  
40:54  
and the next one is called ES lint it is a JavaScript code checker and let's  
41:04  
install it and there is another extensions I want to have it is XML and  
41:13  
there are different ones and I'm using the redhead version install it and it is  
41:19  
pretty nice to control stuff when we need to inspect the XML file panel to  
41:26  
VR generates or if you need to find something in the panel to VR file let's  
41:33  
go just have a short look at the panel to VR file itself X it is an XML file  
41:39  
and you can read it you'll find here the file name of the panoramas and hotspot  
41:45  
data and so on and if you want to tweak something in here you can do it just by  
41:53  
editing the closed file by XML don't edit an open file that's dangerous and  
42:00  
now let's have the last one ES lint prettier and now we need a fourth one  
42:09  
and it's called better comments sorry comments and this let's install it and  
42:20  
better commands is writing comments inside of JavaScript with some extra  
42:25  
characters to color them and to make notes to self to do or warnings and so  
42:33  
on we will use it by time and install this additionally it's a pretty nice  
42:39  
convenience tool and if we now clear this off we have these four extensions  
42:45  
installed for our needs so and if we open our JS file here if you write a  
42:54  
normal comment it's green and then we have a special comment with some  
43:00  
enhancement important and we have something to do then we write this and  
43:12  
fix it and so on and so we can have some structured documentation inside of our  
43:20  
code everything what is comment is not operational it is just ignored when it's  
43:27  
executed but for ourself it is pretty nice to have some documentation or what  
43:33  
is the next line doing or some hints or whatever I will make use of comments a  
43:39  
lot during this tutorial so this is the installation of some extensions for vs  
43:46  
code just for having a little bit more convenience and some enhanced features for our work inside of a punitive ER project before starting to work with  
2.5. Important settings in VS Code  
43:58  
serious code let's tweak some settings which is pretty useful and avoids some  
44:05  
popular errors when working with JavaScript code so let's head over to  
44:10  
the settings and inside the settings which are pretty pretty much let's  
44:17  
search for the word quote and you have single and double quotes when you are  
44:22  
work with code languages and so let's search for the word quote and we have in  
44:32  
prettier which is our code formatting extensions use single codes instead of  
44:38  
double quotes and in JavaScript also set it to single quote this is for the app  
44:45  
this is for prettier and let's scroll a little bit down and that should be okay  
44:52  
and now let's search for safe and we have editor format on safe this check  
45:02  
box should be on this is for formatting the code when you save the file and so  
45:12  
we don't need to do it manually it's working automatically these three  
45:18  
settings can be set to make the work a little bit easier and especially the  
45:25  
single quote setting is pretty important as we can do stuff like this you have a  
45:33  
string a character sequence here inside single quotes this is the sign for  
45:40  
JavaScript okay this is a string and output this string to the console when the strings itself contains quotes then you can use double quotes and they will  
45:52  
be part of the string they are not operational as a separator as it is here  
46:00  
with a single quotes and it is especially useful if you enter some HTML  
46:05  
here if you for example have a link in HTML then you need an attribute for it  
46:16  
this is a HTML link and this is a text and this is the URL you type in HTTP  
46:27  
colon double slash and so on and this needs to be in quotes and if you can use  
46:35  
here double quotes and outside single quotes these are just text to output we  
46:41  
will use it later in this tutorial series on different places so it's  
46:46  
important to have the JavaScript strings always wrapped into single quotes it's a  
46:53  
pretty important setting and it saves a lot of work in later projects if you  
46:59  
make it a general setting just here in this tutorial section I would like to  
3.1. Saving the skin to the project folder  
47:05  
discuss the proper project set up to show some best practices or tips and  
47:11  
tricks to keep your project tidy and well structured as a first point let's  
47:17  
have a look at our skin we are using when I go to the output panel in  
47:23  
part two we are you see here is my skin and in front of it there is a dollar D  
47:30  
sign marking this is the skin living in our project directory dollar D is a  
47:35  
placeholder for the project folder the panel to be our file lives in so if you  
47:42  
here see the path this is a folder and here the skin and if we have a look at  
47:53  
our finder window this is a folder here's the skin and here's a part of the  
47:59  
our file if this dollar D is missing then these skins listed here are living  
48:05  
in the users folder the user library folder on the Mac you can locate them by  
48:15  
going into the preferences and then going to files and have the skin  
48:22  
directory this is the path on a Mac on Windows you have instead of this part  
48:31  
you have appdata slash roaming slash garden ground software and so on it's  
48:38  
pretty much the same structure as it is on the Mac and it is very important to  
48:45  
have the skin you're working with on a project move into the project folder  
48:52  
otherwise let's say you have ten different skins for ten different clients and you put them all into the folder of your system then it gets  
49:02  
overcrowded and pretty pretty confusing where the skins are and you're mixing  
49:09  
up your own skins with the factory skin so keeping up the system folder the system library folder tidy it's strongly recommended to create the skin in the  
49:20  
project folder or if you use a factory skin open the factory skin here and save  
49:25  
it as your own I've done it before with let's say Venice underscore and then  
49:31  
let's for example insert the client's name there and this GGSK file should be  
49:40  
stored in the project folder after having our own skin living in our  
3.2. Create a library folder  
49:46  
project folder let's move on to the folder structure in the finder or in the  
49:52  
Explorer you remember before we have inserted a JS folder named my JS folder  
50:00  
and a custom JS file let's remove this and set it up from scratch to have a new  
50:10  
structure which is better suited to a real project setup than this little example I did before you can do it in the Explorer or in the finder or you can  
50:20  
move on to the workspace of Visual Studio Code you see this file is now  
50:26  
striked through because it doesn't exist anymore and the folder also is  
50:32  
eliminated here and we have now our project folder you have the panel to be  
50:37  
our file the skin file the panorama the output file and inside of this folder it  
50:44  
doesn't matter if you do it in the finder or in the Explorer or here in this Explorer pane of Visual Studio Code and it does find an Explorer operation  
50:54  
as well as copy delete rename and so on and if you click on a folder and you  
51:01  
click on new folder here or right mouse click new folder and let's this folder  
51:07  
call lip for library it's a common abbreviation for using folders inside of  
51:15  
project with some library stuff additional files and additional assets  
51:20  
and so on and it's short and it's pretty common to name things like that in with  
51:28  
lip for library so let's confirm it and this library folder now needs to be  
51:35  
attached to the output as an asset folder so let's kick it here it's not  
51:43  
valid anymore and add folder and now let's add this library folder and  
51:50  
everything what's happened from happening from now on as our own additions or extensions we're doing for this project is living in this folder to  
52:01  
keep stuff tidy and to have only one folder we need to export with the output  
52:09  
when we are hitting the cogwheel to create or to generate the project from  
52:15  
now on this stays that it is and we don't need to care anymore about this  
52:22  
and everything else is happening now in the workspace and here we are adding our  
52:29  
future files so now let's continue with our setup by adding an empty JavaScript  
3.3. Organize library folder  
52:38  
file into this library folder right mouse click new file and you can just  
52:45  
put in a name here usually I start with custom JS but the name is not important  
52:54  
this naming is just I'm used to do it and to check whether this file is  
53:01  
working I just put a little console output this is coming from custom dot  
53:13  
JS semicolon at the end to finish this command line and save it so it's just a  
53:25  
control whether this file is loaded and working later and now let's make this  
53:32  
work inside of the skin so we have now added this file and it is loaded as it's  
53:40  
defined in the output folder as an asset folder so it's no problem it will be loaded into the output I will check this by clicking on this trash button here in  
53:53  
the output folder and hold it until this pop-up shows up erase output but keep  
54:01  
tile so the images won't be recalculated only everything else will be trashed and  
54:06  
if I now hit the cockpit button we get a fresh output excluding the tiles and if  
54:13  
we now have a look at our output it is already marked here asset lip custom JS  
54:21  
so everything is looking like it's expected and now we have everything  
54:28  
loaded but it isn't working if I reload the project then we won't see these  
54:37  
console message as it is not loaded it's a packed or exported into the output  
54:47  
folder but isn't loaded now let's get this stuff to work go to the skin and  
54:54  
now we have from our last section we have in the external files a connection  
55:01  
a loading command for the JavaScript file my trace folder and so on we  
55:09  
deleted that and we also delete it here you have two points where you can make a  
55:15  
skin load external JavaScript files it's here in the general properties please  
55:21  
mind you have nothing selected here or you click into the empty space here to get these general property settings and I'm usually doing it another way it has  
55:32  
some practical advantages let's integrate a code block element click  
55:38  
somewhere it is not visible so the position doesn't matter I leave it  
55:43  
usually at the top of my elements tree and I rename it usually I'm starting  
55:53  
with an underscore to make it a little bit stand out from the rest script scripts and actions and all general stuff what's happening in the skin or  
56:08  
loadings are now connected to this element instead of attaching it  
56:14  
generally to this skin then it will only live with the skin if you attach it to  
56:21  
an element you can make an component from this element and reuse it I'm  
56:27  
usually using more or less the same structure with external files and these files can be packed into this element and it is a really nice for reusability  
56:37  
of the work you have done here so now let's go to the code element and we  
56:43  
don't enter anything here but we are using the external files section to add  
56:52  
our files the first file we already have is assets lip custom.js and this entry  
57:04  
in this element makes the skin load this file we will test it now so let's save  
57:12  
it and the browser already reloaded in the background and we should go to the  
57:21  
console nothing happens let's go to the network tab and check whether we have  
57:29  
loaded what we want so I reloaded it and if I'm going to the top section here we  
57:38  
have a custom.js and you see here we have a custom.js it is cached so let's make  
57:47  
an hard reload by hitting shift command R or what's better in the developer pane  
57:55  
here disable cache so this file will always be reloaded let's do it and now  
58:09  
you see on the top this is coming from custom.js now it's really transferred  
58:14  
you see it as the kilobyte figures here and before there was remark cached so  
58:23  
changes aren't reflected here and now you are forcing the browser to always  
58:28  
refresh this file and now we see it's working so we have now an external  
58:34  
JavaScript file which is firmly connected to our project and all the time I change something here everything you need to do is to do something here  
58:46  
let's just add an exclamation mark to make a change first step save it here go  
58:56  
to either the skin editor or the main editor hit save here then you get a  
59:01  
refresh and re-output then go to the browser and see it here and now you see  
59:08  
the exclamation mark at the end of this console output so this is a standard  
59:13  
procedure to get things externalized and to refreshes and to review changes this  
59:22  
will be the case from now on this procedure save external code save  
59:28  
impounded to VR review in the browser these three steps will be all the time our standard procedure when we make changes at our project in the next step  
3.4. Creating an external css file  
59:40  
let's extend this procedure to another file and I'm switching to the code  
59:48  
editor and add another file into our lip folder let's name this file custom dot  
59:58  
CSS and this will be a CSS file used for styling our project and extends a  
1:00:07  
possibility we have in the skin editor and the element properties where you have a lot of CSS properties you can change but not all and sometimes you  
1:00:17  
need some special stuff let's name especially box or text shadows these are  
1:00:24  
not provided in the back end of part of VR in the skin editor among the properties so you need to add them by your own and some other stuff especially  
1:00:34  
when it comes to custom fonts and we will discuss a little bit later and this file is empty it exists and now let's head over to the skin editor and do the  
1:00:44  
same as we have done with our JavaScript file so you can just copy it because it  
1:00:53  
is the same name and just CSS at the ending so now this file is also loaded  
1:01:08  
usually I'm setting the CSS files to the top of the list and JavaScript  
1:01:14  
afterwards as it is sometimes important that CSS stuff is already working before  
1:01:21  
JavaScript is loading there are some use cases where this order may be important  
1:01:28  
and we come back to this order later with another aspect where it's important  
1:01:35  
so now we have this empty CSS file and what I'm most the time doing to keep  
1:01:43  
things tidy is heading over to the general properties of your skin just  
1:01:49  
clicking into the empty space outside of the skin area then you get these general  
1:01:55  
properties and you have a section here embedded style sheet and you see here  
1:02:01  
already some CSS code inserted and I open this mark it all cut it off to make  
1:02:08  
this field empty to collect all CSS stuff in a relevant place and I'm just  
1:02:15  
copying this this and moving it to my custom CSS on the top so let's insert it  
1:02:24  
here and usually I'm doing a comment here comments in CSS slash asterisk and  
1:02:32  
default skin stuff and so on so this section is just transferred to another  
1:02:41  
place to keep things tidy and now we are entering my own stuff now this CSS is  
1:02:54  
just transferred here and reformatted and it is way easier to edit here when  
1:03:01  
you see it in this box here and this box now is empty so everything what's having  
1:03:07  
to do with CSS now lives collected in this custom CSS file so let's save it  
1:03:15  
here and check it in the browser in the network tab and here you see the custom  
1:03:22  
CSS file is loaded now let's continue to work on the CSS part of this project and  
3.5. Add own fonts to your skin  
1:03:31  
to add custom font there are a lot of ways to do it and I have some best  
1:03:42  
practices I'm using as it keeps stuff really tidy and you haven't not too much  
1:03:50  
code on the right places and now let's start to add a folder in our workspace  
1:03:58  
here and in the library we have currently the custom CSS custom JS and  
1:04:07  
we will now add a separate folder called fonts and to have a place where all font  
1:04:15  
files we are adding soon are living here to keep this library folder a little bit  
1:04:23  
tidy and we have now the challenge how do we get fonts and how do we integrate  
1:04:31  
them into our external CSS files and further in our skin and in our project  
1:04:39  
let's point our focus on Google fonts and I will integrate a font named arvo  
1:04:48  
and so I will add another file and let's save it as arvo dot CSS to keep all the  
1:04:58  
stuff which is only related to this special font keeping it away from the  
1:05:05  
custom CSS so we only need to import this CSS into another we will see it a  
1:05:12  
little bit later so this is a very useful structure to have a font folder  
1:05:18  
inside of our library folder and a CSS which is referencing the fonts which  
1:05:25  
will be imported here let's now head over to Google fonts and see what we  
3.6. CDN or local?  
1:05:32  
have here and what's offered to us by Google here you have the fonts over view  
1:05:40  
and what fonts are available at Google and let's just have a few thoughts on  
1:05:47  
Google fonts they are provided for free and for free usage either commercial or non-commercial it doesn't matter they are provided and hosted by Google and  
1:05:57  
you have two ways to use them the one way is you can leave them hosted by  
1:06:05  
Google and just integrate it into your project or you can download them from  
1:06:11  
Google and integrate them locally into your project so you have every files  
1:06:18  
under your own control I'm mentioning this before in the European community  
1:06:25  
the GDPR is a data privacy rule which is mandatory legally to organize your stuff  
1:06:35  
and to declare whether you are using external services on your website and as  
1:06:42  
Google is an US company with pretty much different privacy settings or privacy  
1:06:47  
policies as we have it in the EU where this is handled much more strictly it is  
1:06:54  
not a such good idea to use an US service to provide fonts for your  
1:07:00  
project as user data like IP addresses are transferred to the United States  
1:07:05  
which may be data privacy breach and this can be legally problematic as we  
1:07:14  
have seen the last two years where we have some legal issues with people being  
1:07:22  
sued for using Google fonts on their website so let's ignore the possibility  
1:07:29  
to let Google provide us the fonts on their server via a CDN content delivery  
1:07:35  
network it's very fast it's a Google hardware structure behind it so technically it's nice but legally it is suspicious to create some data privacy  
1:07:48  
breaches so now let's go the second way and to provide the fonts for us to  
1:07:54  
download and to integrate them as files in our project I will search for my font  
1:08:01  
the arvo this has four styles now click on it and we have you get font got it  
1:08:08  
and you have some styles here we are using the regular and the bold for our  
1:08:17  
project you can select them and here's some simple text and so on it is pretty much self-explanatory and when we hit get font let's now download all and  
1:08:35  
before you can see here see how to use and there are some hints on using it  
1:08:44  
some of them are useful some of them not and this is the download for this folder  
1:08:53  
and what comes then is a little bit complicated and for this some guys have  
1:08:59  
written a really nice tool to get these fonts more or less ready to use for your  
1:09:06  
project and that's what we will discuss in the next clip now let's have a look  
3.7. Where to get web fonts?  
1:09:13  
at a very nice helper tool to get Google fonts prepared for your own hosting and  
1:09:22  
let's go to this tool GWF Google web fonts helper and it is a very nice tool  
1:09:31  
to prepare the font you want or the fonts you want can be several as well  
1:09:37  
and now type your font name into the box and I want to have the regular and we  
1:09:45  
have the character set sometimes you can select extended character sets it's not the case here and we have some font styles we want to have the additional  
1:09:59  
style here as it is a bold bold is usually numbered as a font weight with a number 700 and we now get our code here and you see what's very important  
1:10:14  
for us is the path where these font files are living and from where it will  
1:10:21  
be loaded usually you have different styles here you have some legacy support  
1:10:28  
some historic support so a different font file types are loaded but nowadays  
1:10:36  
you are safe to go only with modern browsers so you only need these WAF 2  
1:10:41  
files everything is okay for that and so it is very easy to understand and not so  
1:10:49  
much coding and you see here it's from Chrome Opera Firefox 39 and so on so it's  
1:10:55  
safe to use the next step is the little box below and here you see customize  
1:11:01  
folder prefix optional so now you can configure where your font files are  
1:11:09  
living and I just switching back for a moment to our project layout we have an  
1:11:15  
arvo CSS file and the fonts are living in a font folder and the code provided  
1:11:21  
here in my window exactly this code will be put into the arvo CSS and here you  
1:11:28  
can adapt the font prefix and you see it has changed to fonts arvo and that is  
1:11:34  
exactly the path we need as its relative from the location of our arvo CSS and  
1:11:39  
now just copy this stuff and put it into the arvo CSS paste and now we have  
1:11:52  
everything we need here let's save it and the next step is to get the font  
1:11:58  
themselves just for downloading and it's nice here to have only the selection  
1:12:05  
loaded so you don't need any overhead here and just download this file and put  
1:12:12  
the files into the folder I have done that already in another folder so here  
1:12:19  
let's go to material arvo copy these two files copy and this is my original and  
1:12:30  
paste it here and now they are living here and if you're looking at the code  
1:12:38  
fonts will direct it to the fonts folder and then you have the files here and  
1:12:44  
what we have now is the fonts already provided you have a valid font CSS and  
1:12:52  
if I now save it here go to part of er save it here to have it exported and  
1:12:59  
then have our file reviewed here let's just restart it here hit f12 to see the  
1:13:08  
network console and now we have our fonts exported but it isn't already  
1:13:14  
loaded one last step is missing now and we will edit soon as a last step we now  
1:13:22  
need to integrate the new font and the associated CSS file our CSS into our  
1:13:29  
project and it's fairly simple go to custom CSS and just make a little bit  
1:13:35  
space on top of the file because this always needs to be on top and this is a  
1:13:53  
simple line as CSS can integrate other CSS files into itself there's a  
1:14:01  
procedure it is starting with the at sign and import URL you see this Emmet  
1:14:11  
abbreviation it's a nice occasion to explain it how this is working in  
1:14:16  
Visual Studio Code if you start typing you get some underline marking okay I  
1:14:22  
don't know what you really want now but you get suggestions and here you have  
1:14:28  
the import URL and the empty brackets and at this end you have the term Emmet  
1:14:36  
abbreviation Emmet is a code suggestion system which tries to recognize what  
1:14:44  
you want to type and which has some abbreviation algorithms to speed up  
1:14:50  
typing code and if you have here a suggestion which is marked just hit the  
1:14:56  
tab key to get this line filled with the first suggestion and that's what we want here and now we need some quotation marks and single quotes and now we just  
1:15:07  
need to enter arvo dot CSS simple as that there is a consequence of the file  
1:15:15  
structure I set up here as the font description files here are isolated but  
1:15:22  
living on the same level as custom CSS you can just add them which as little  
1:15:28  
code as here is shown and now this file should be imported let's check it so  
1:15:36  
save it go to part of er hit save here to induce a new export and reload in the  
1:15:44  
browser and if I go to the network tab in the developer tools there is the our  
1:15:52  
file integrated what we are missing now is I don't see the font file loaded but  
1:15:59  
this has a very simple reason it is living in the export folder you can  
1:16:04  
check it here by going into the finder and going to to output assets lip fonts  
1:16:15  
and here they are living they are exported already but they are not working they are not loaded if you call a font in CSS it doesn't mean it's  
1:16:26  
really loaded and it is only loaded if you use it let's change the font of the  
1:16:34  
whole skin and make a copy of this line and paste it here and put your cursor  
1:16:44  
somewhere here and now hit command slash this is a shortcut for commenting out a  
1:16:51  
line its line is set as a comment meaning it's there but it's not working  
1:16:57  
but its comments are ignored in the browser it's just for ourselves and now  
1:17:02  
let's throw away these fonts here the Verdana's area they are fonts sans serif  
1:17:12  
at the end it is a placeholder for a group of fonts without serifs it is a  
1:17:19  
global variable kind of to find a fallback font if nothing of the fonts  
1:17:25  
declared here is found on the system of the user and now let's enter Arvo and  
1:17:35  
now this font will be used and the sans serif it is a fallback vocabulary and  
1:17:42  
now let's save it let's save it in palette to VR to export it and meanwhile  
1:17:49  
we have it in the browser and you see the font already has changed because the  
1:17:54  
whole skin fonts are changed from the Verdana area and here you see the Arvo  
1:18:02  
font already loaded as it now is really used otherwise it won't load it's there  
1:18:08  
but it won't load and now we have this font living in the whole skin and we  
1:18:14  
have overwritten the general GG skin class which is literally attached to any  
1:18:21  
element in the skin this is one reason I have put the default skin stuff into  
1:18:27  
this custom CSS to easily change it here instead of overwriting it so this is the  
1:18:33  
strategy to get external fonts running in your project put the fonts in a font  
1:18:39  
folder generate a font specific CSS and import this into your general custom  
1:18:47  
CSS you can add several lines of them if you want to use two or three or four  
1:18:52  
fonts doesn't matter you can add as many fonts as you like here and here you have  
1:18:58  
all the fonts you need now I like to show you how to use the custom CSS  
3.9. Style skin elements  
1:19:05  
together with our custom font to style an element inside of the skin you may  
1:19:12  
remember we introduced panorama title in our skin it's on the upper right corner  
1:19:21  
and we already used a class here to add this CSS class pano dash title to  
1:19:32  
identify it inside of the inspector pane here so just type it here  
1:19:39  
pano dash title and you may find the respective element this one is framed  
1:19:53  
here and the text one is inside here so now we have this element and an attached  
1:20:02  
class and we can use it to style it let's say we want to have this element  
1:20:07  
bigger and we want to have it not in the standard our font but in the bold our  
1:20:15  
font you can do it partly here if you use the text elements but this is a  
1:20:22  
little bit limited and especially if you want to work with external fonts you may  
1:20:28  
have some interferences here if you use a weight it's not available and so on  
1:20:33  
it's recommended if you use of a CSS class here just leave everything here as  
1:20:39  
it is and do this in the CSS class so now let's make a declaration here pano  
1:20:46  
dash title then we go on with curly braces and let's alter the font size you  
1:20:57  
see you get as you start typing font size just cursor down enter and it will  
1:21:05  
be accepted and completely written here and now let's say 24 pixels as a new font  
1:21:12  
size safe but we are safe go to browser and you have a large font here and it's  
1:21:20  
a normal font of the hour now let's change this and go to code and add  
1:21:29  
another line into this declaration and let's say font weight and now you can  
1:21:41  
enter a 700 or a bold it's the same and save save and you see the bold Arvo is  
1:21:52  
now integrated here let's now return to JavaScript and continue with our project  
3.10. What is jQuery?  
1:22:02  
setup I'll just close the CSS files as we don't need them now and we now will  
1:22:11  
add another file to our library and it will be not a file we created but a file  
1:22:20  
we get from somewhere what I'm talking about is named jQuery jQuery is a  
1:22:30  
JavaScript framework and it can do a lot of stuff for you especially when it  
1:22:38  
comes to convenience to make things simpler to work with objects and it is  
1:22:46  
kind of a Swiss Army knife if you want to go with JavaScript and you don't like  
1:22:52  
to write everything explicitly in JavaScript simple JavaScript that means  
1:22:59  
only JavaScript or sometimes it is a programmer slang it's called vanilla  
1:23:04  
JavaScript it's sometimes really tedious to work with as some simple things are  
1:23:11  
written in a pretty complicated way or with a lot of redundancies and so on and  
1:23:17  
that's why jQuery was invented and nearly all websites on the web are using  
1:23:23  
jQuery as it's so popular and so useful so now let's get it and integrate it  
1:23:29  
into our project to get it and to the download page of jQuery and now we have  
1:23:37  
some options here is the most popular file which is used you see in the lower  
1:23:45  
left corner of my browser you will see the path code jQuery com and jQuery  
1:23:51  
dash 3.7.1 dot min dot js the dot min means the file is so called minified so  
1:24:01  
all spaces all commands all unnecessary line breaks are erased and it is just  
1:24:07  
the pure code and it is not meant for editing or understanding it's just working and it has a very small file size and it loads fast that's what's  
1:24:16  
interesting for us so if it's a link here directly to the file if you click on it or open it in a new tab you see the code it's not understandable and it  
1:24:26  
is really compressed it's only one line and just with a small comment on top what it's about in general and then you see a lot of  
1:24:36  
understandable code and you can just save it here or what's easier for us is  
1:24:42  
just go to save link as in our project in the lip folder and just save it so  
1:24:52  
when we go back to our project we have now this file here integrated and we now  
1:24:59  
need the same procedure as we did for custom js so go to the skin editor  
1:25:04  
scripts and action to our code element and now just let copy this and paste it  
1:25:15  
here just to make it a JavaScript file so paste it again and now let's add the  
1:25:23  
file name it's jquery-3.7.1.min.js so we have it integrated into our  
1:25:37  
project and it's loaded and now let's test it export it again to get the  
1:25:45  
jquery file in our output let's control it here here it is it's already loaded  
1:25:52  
and now we need to test it whether it's working so in the console we just see  
1:26:02  
the output from our custom js so let's head over to adjust this file and in the  
1:26:08  
custom js let's type something which needs jquery to work when it comes to  
3.11. Using jQuery  
1:26:16  
using jquery there are some very simple conventions and we now enter a dollar  
1:26:25  
sign nearly all jquery commands starting with this dollar after that  
1:26:33  
usually we have a curved bracket and inside this curve bracket we have a so  
1:26:41  
called selector so we can address any element inside our whole HTML document  
1:26:47  
and get information from them manipulate it is both way communication and now  
1:26:54  
let's have the simplest selector we have it's document you already get it  
1:27:02  
suggested here enter it and the document object has an event and one event is  
1:27:13  
just when the document is completely loaded then the ready event is fired and  
1:27:19  
when something is fired you can enter something what should we do then and  
1:27:27  
usually this is a function and a function can have a name but don't need  
1:27:34  
to so we add empty curved brace and after every function we have curly brace  
1:27:44  
and let's have here and line break so now let's define what this function does  
1:27:54  
when the document object fires the ready event so I'm loaded and then do  
1:28:00  
something so let's have console dot lock we already know that on let's announce  
1:28:09  
that jquery is loaded that's effectively what we are now have here enter a  
1:28:20  
semicolon to finish this line and enter a semicolon to finish this block in this  
1:28:26  
block here after the curly brace of the function here you can usually enter all  
1:28:33  
stuff you want to be declared or you want to happen after the document is  
1:28:39  
completely loaded that's a very important function we will make use of it at several occasions further on in these tutorials so let's save it then go  
1:28:52  
to the skin editor or to the main app save it and then let's reload it and we  
1:29:01  
get an error so what's happening here uncaught reference error usually this is  
1:29:07  
thrown this error if you are calling an element or an object or something like  
1:29:13  
that or a function which is not defined and it is not existing and is he's  
1:29:18  
complaining about I don't know what the dollar sign is it has a very simple reason I introduce this arrow intentionally to make clear how  
1:29:29  
important the loading order of elements is let's head over to the skin editor and  
1:29:36  
to our code block and we have now first loading the CSS it is okay and then we  
1:29:42  
have loading the custom JS and in the custom JS I am calling a function which  
1:29:53  
relies on jQuery but jQuery is loaded afterwards so the call here is is void  
1:30:03  
as it cannot know what's happening here so we need to change the order  
1:30:10  
everything what's custom JS is relying on needs to be loaded first so we have  
1:30:17  
jQuery first then comes custom JS now let's repeat it and let's check for an  
1:30:27  
error no jQuery is loaded now it's working so the order in which files are  
1:30:33  
loaded is very important and usually all libraries or all prefab stuff from  
1:30:40  
JavaScript you cannot only use jQuery but you have a lot of other files you can use to extend upon or to be asked features jQuery is only the most  
1:30:50  
important and the most popular you can have a lot of others and they usually  
1:30:55  
need to be loaded before you do your own custom code stuff custom JS or your own  
1:31:02  
JavaScript library you write should come at the last position in the loading queue  
1:31:09  
after discussing the right order of loading files let's now have a closer  
3.12. Checking the timing of file loads  
1:31:16  
look on the timing when is happening what and for this I will introduce some  
1:31:25  
calls in our skin just to name two of them let's go to the script and actions  
1:31:35  
element and we want to have an action when the skin loading starts and let's  
1:31:45  
enter go to URL and let's enter JavaScript and console dot log and let's  
1:31:56  
name it skin start so I just copy it as I reuse it just check it you need to be  
1:32:08  
careful when having typos okay and let's another one have which is another event  
1:32:19  
which is pretty important config loaded config loaded is the moment when the  
1:32:27  
panel XML file which describes the structure of your tour is readily loaded  
1:32:34  
and the first note is loaded or the first note starts loading the skin is  
1:32:39  
stable and the player construction is a stable so it's really the point where it  
1:32:45  
begins to live and now let's enter this config load it  
1:33:00  
and now let's save it and go to the console I just use only the console so  
1:33:10  
we have skin starting here we have a message from our custom JS it's pretty  
1:33:18  
much the earliest and then we have config loaded in between jpeg query is  
1:33:23  
loaded so let's head over to our custom js file and here we have first line of  
1:33:36  
custom js here is jQuery loaded and so we get a little idea of what is  
1:33:46  
happening when so so the skin start is somewhere in between and I think the  
1:33:56  
best practice is to make sure things are happening when jQuery is loaded and when  
1:34:05  
the configuration is loaded these two events are a pretty good mark for you to  
1:34:11  
be sure that everything is stable working and that you have valid objects  
1:34:16  
to address before the config a file isn't loaded or before this event you  
1:34:23  
don't have a stable object named panel but you need that to work and to get all  
1:34:28  
your stuff work and jQuery loaded is the event when the whole document is stable  
1:34:34  
that you can use jQuery to address or to manipulate objects inside the skin or  
1:34:40  
inside the whole document so these thoughts on timing are pretty important to have an idea about the sequence of events happening when you are loading a  
1:34:52  
panel to VR project in the web browser of the user and when you add your own JavaScript files to get a correct timing and to avoid addressing objects which  
1:35:03  
aren't existing yet at the end of this section in our tutorial about  
3.13. Screen layout and other tips  
1:35:10  
development setup I like to share some best practice tips and one of them is to  
1:35:16  
use the screen real estate properly when you are having only one monitor one  
1:35:24  
screen to use I'm usually try to manually cascade the windows of my apps  
1:35:31  
so I have the panel to VR on the upper left and then followed by the skin  
1:35:39  
editor so I can see the editor the main app already so everything is always  
1:35:46  
visible with a little corner so you can really click between the different  
1:35:52  
windows and here's my code editor here's my browser of course you can use command  
1:35:58  
tab on the Mac to switch between these windows but especially when it comes to  
1:36:04  
pallet to VR there is a useful shortcut and it is let's have a look at the menu  
1:36:13  
I always need to look at because it's I'm used to use it and is command out K  
1:36:21  
and with command out K you can switch between the main app and the skin app if  
1:36:28  
you use the program switcher you only get panel to VR with one of the two  
1:36:33  
windows being in front and so it's very useful to have also a clickable  
1:36:40  
possibility to switch between your windows and if I have my finder window I  
1:36:46  
usually put it on the lower left corner to have it at hand if I need it if you  
1:36:54  
are well equipped and have more than one screen then it's extremely nice to work  
1:37:01  
with panel to we are having the browser on the left screen and having panel to VR on the right screen and the luxury class is to having panel to be on the  
1:37:12  
center screen and the browser on the left screen and the code editor on the  
1:37:19  
right screen if you have three screens that's the way I'm working and for the code screen my right screen I have a portrait orientation I turned around the  
1:37:29  
monitor the screen by 90 degrees and this is a very productive setup if you  
1:37:36  
want to get done your stuff really quickly this is just a convenience tip  
1:37:42  
and another tip if you don't know where to find it in the preferences you have  
1:37:48  
one little checkbox and you can turn off a warning which is pretty annoying if  
1:37:57  
you get it all the time and you have the second box confirm override this box  
1:38:03  
needs a confirm to override the panel XML the XML file where the configuration  
1:38:08  
of the whole tool is stored usually you want just that so untick this box to  
1:38:15  
don't get annoyed it's one click less and I usually turn it off as this whole  
3.14. Wrap up  
1:38:23  
section about project setup is pretty long I like to give a short wrap-up at  
1:38:30  
the end to summarize everything I've talked about in the last 13 clips and  
1:38:38  
just go to the finder about the project structure so integrate the skin into the  
1:38:47  
folder where you are part of to VR file is living to keep things together then  
1:38:53  
generate a library a lib folder where all external files you intend to use are  
1:39:00  
living in inside of this if you want to have custom fonts generate a font folder  
1:39:05  
and here you store all your fonts locally to have no hassles with external  
1:39:12  
services and any privacy issues arriving with that and for each font you use  
1:39:21  
generate a separate font CSS and there you declare which fonts and which styles  
1:39:28  
of your fonts are loaded and what font files are belonging to this font then if  
1:39:34  
we go back to the finder generate a custom CSS and in the custom CSS it's  
1:39:42  
recommended to integrate all the stuff you find in the general properties of  
1:39:49  
the skin to move them from the text entry here at a bedded style sheets move  
1:39:57  
it over to the custom CSS and keep it on front to have the possibility to  
1:40:03  
override it later on especially to change the font generally the font files  
1:40:10  
are integrated by the import command always on top of a CSS and here we are  
1:40:16  
done with CSS and if you have some elements in your skin you want to alter just use classes as panel title here and we have it here under advanced you enter  
1:40:29  
a CSS class here to make use of it inside of custom CSS the custom JS file  
1:40:38  
is loaded together with CSS files in a code element under external files keep  
1:40:46  
in mind always load the CSS files first and in the JavaScript loading sequence  
1:40:53  
your custom CSS needs to be the last if you use other libraries like jQuery in our case here they need to be loaded before loading the custom CSS and attach  
1:41:04  
all these external files to a separate script and action element as you can  
1:41:09  
create a component from this selection and reuse this setup later and so you  
1:41:15  
have only one place in your skin where all this stuff is living ignore the  
1:41:20  
external files in the general properties panel as you have it here reusable in  
1:41:25  
the general properties panel it is not if you use another skin if you use a  
1:41:31  
library usually jQuery is always on board because it is very convenient with  
1:41:39  
the dollar sign you can address arbitrary elements in your document and you can manipulate them you can have an handling for events are happening in  
1:41:48  
this model and we will cover a lot of this stuff later and that's pretty much  
1:41:53  
the setup you have for a proper project and then if you use Visual Studio code  
1:42:00  
it has a workspace file storing all this stuff for you and you can save it here  
1:42:07  
along with your project just double-click it and you have your whole project or not only editing these files but only for keeping an eye on the whole  
1:42:15  
project and its structure and you can use Visual Studio code and the file explorer to do any file operations you can also do in the finder Explorer on  
1:42:24  
Mac or Windows so this is hopefully a complete short wrap-up of everything I  
1:42:31  
have discussed in this section of the development setup tutorial in this last  
4.1. Add a text element with a class  
1:42:37  
section of the tutorial about a development setup to extend upon it we are with JavaScript I want to conclude with a little practical example where we  
1:42:48  
use justice set up to do some work and to develop a little example with a  
1:42:55  
communication from outside to inside and inside to outside let's start with  
1:43:01  
monitor VR and I'm going into the skin editor and before I show what I want to  
1:43:11  
achieve let's have a little text box in the lower left corner of the menu and  
1:43:19  
this text box should show us the actual note number we are just in in our tour  
1:43:27  
of course this can be done easily in panel to be our skin with some placeholders but for a practical example it's easy to understand how the  
1:43:37  
communication from inside to outside and vice versa works and let's start over to  
1:43:43  
our first step to achieve this and I'm going to the skin editor and let's have  
1:43:50  
the lower left corner in our canvas screen here and I'm adding text box just  
1:44:02  
clicking somewhere else to not integrate it in some other containers and this text  
1:44:08  
box get the name note underscore number and the text let's stick with text the  
1:44:23  
horizontal alignment is left the vertical alignment is Center I do it  
1:44:30  
with auto size and it should be arranged at the lower left corner with 1010 from  
1:44:44  
the corner itself and let's make the text white and remove the background and the  
1:44:58  
border so let's have a look how it looking like and head over to the  
1:45:04  
browser there we have some text that's what we want and now I'm attaching a  
1:45:13  
class to it to make this object inside of our skin accessible by jQuery to  
1:45:22  
manipulate its content and let's add the class user data node ID or write it all  
1:45:36  
in lowercase letters with dash it's a good style to format classes usually and  
1:45:44  
now let's copy it and save it and get here and let's have the inspector and  
1:45:56  
search for it so and here we have it so this is the text box and here we have  
1:46:09  
the inner wrapper of the text box as I mentioned before with text boxes in the  
1:46:15  
skin usually we have an outer box it always has attached the class GG skin  
1:46:21  
underscore text this is for measurements for width height and anchor point and  
1:46:28  
distance from the borders and the inner box is for typography and for text  
1:46:37  
formatting this is the usual case with text boxes you introduce into the your  
1:46:42  
panel to VR skin so we have added a new element and attached a class to it and  
1:46:50  
the class is showing up in the document as we need it as this text box in the  
4.2. Create a JS function  
1:46:59  
lower left corner is our target to what we want to manipulate where we want to  
1:47:06  
insert some text let's now go to the other end of our let's say data chain  
1:47:13  
and head over to Visual Studio code and try to get the node number for us to  
1:47:23  
initiate this we need to think about when should this happen and I'm writing  
1:47:31  
a function first a function is a repeatable method which can be called  
1:47:37  
from outside and which does always the same from whatever element it's fired  
1:47:43  
and we use it to react to a skin call to make the skin call very easy as we need  
1:47:51  
only to call the function name there nothing else it's very shorthand and so  
1:47:57  
we need to define the function get node ID and every function needs to have an  
1:48:07  
argument even if it hasn't won or is even argument is not needed we need the  
1:48:14  
curvy braces and then the curly braces where you put everything in it what this  
1:48:22  
function should do when it's called what is an argument you can call a function  
1:48:27  
just as it is there is a case here if you call the function with an empty  
1:48:33  
argument but you can call a function and we will use it later a lot of can call a  
1:48:39  
function with some additional parameters you send to the function when it's  
1:48:46  
called this can be an arbitrary number of arguments and can be number strings  
1:48:52  
or anything else but now we just need to call the function and the function does everything from its own and now let's head over to call this function to see  
1:49:05  
whether the function is doing anything let's simply set a console call log and  
1:49:11  
I say copy is called to control whether it works this is a complete function it  
1:49:26  
says a name with with this name you can call it and there's something inside of the function what is done when the function is called so that is for the  
1:49:36  
JavaScript part it's okay and now we need a third part of our procedure we  
1:49:41  
want to program is we need to call it and if you want to have the note number  
1:49:50  
for every note you are in you need to think about when is this changed and  
1:49:55  
usually when you enter a new note a new note number is valid so let's have a  
1:50:01  
call fired every note change and we can attach it anywhere and usually as I  
1:50:09  
named the scripts and functions and I usually attach actions which are  
1:50:14  
globally and without user interaction then I enter it here and let's check the  
1:50:22  
event no change after the note is changed this is in prefabricated event  
1:50:28  
monitor we are has and then get URL and I should have it in my clipboard get  
1:50:37  
node ID and of course we need to start with JavaScript colon to call this  
1:50:46  
function to the outside of the skin and not to fire an URL to call a new website  
1:50:54  
or something like that the JavaScript colon prefix fires this event or this  
1:51:00  
call into the JavaScript environment inside of the browser and not outside to fetch a website from the web and now let's say okay and let's have a first  
1:51:11  
test to see whether this works I've saved here so we have a reload and we  
1:51:19  
have get node ID is called let's clear the console at the lower side or just  
1:51:26  
switch to the console it's empty now and when I now get to another note get node  
1:51:33  
ID is called get node ID is called we get several calls no matter from where  
1:51:41  
this call comes I can use the thumbnail menu doesn't matter so the note changed  
1:51:46  
event is globally and you don't need to attach it to any interactive element of  
1:51:52  
your skin it's just fired automatically when the note number changes that's all but that is exactly what we need we have now a basic chain from an event in the  
1:52:04  
skin calling a function outside of the skin in the custom JS file and this  
1:52:11  
custom JS file is outputting something at the console that's a very typical workflow you need or you can use when you want to establish a new function  
1:52:23  
call with JavaScript which is coming from inside of panel to VR in this next  
4.3. Get current node ID via JS API  
1:52:32  
step of our JavaScript function called from a note change in the panel to VR  
1:52:38  
tour we need to get the node ID how can we achieve it to retrieve this  
1:52:47  
information I mentioned the two main objects we have in panel to VR we have  
1:52:55  
the skin object just open the console I just emptying it and let's have the skin  
1:53:01  
if you type skin then you get a suggestion what is available as an  
1:53:08  
object if it is an valid object otherwise here in this place wouldn't  
1:53:13  
show nothing and if I type a dot then you get a lot of stuff with with  
1:53:21  
elements prefixed by an underscore and so on and so on and the skin object is  
1:53:27  
the whole construction of our user interface we have like the thumbnails  
1:53:33  
and the text entries here and when it comes to check about the notes about the  
1:53:42  
structural information we have when the tour is running then we need the panel object and panel you see you get suggestions there are three objects in  
1:53:52  
our page which have the panel to VR player as an object and VR skin as panel  
1:53:58  
is the same as panel to VR player and skin is a name as panel to VR skins is just different names for the same object and if I enter a dot you see the methods  
1:54:09  
and properties and some other stuff which is attached to this panel object  
1:54:15  
and if you want to get some informations about this note we are just in then  
1:54:23  
let's try and guess a little bit what we can have here usually if you want to  
1:54:30  
know something from an object the programmers it's a good style name it by  
1:54:35  
get the opposite is set to manipulate something and to get to get some informations and we having some suggestions here get API version and get  
1:54:49  
browser paths and get current node looks nice to me so let's enter it and as it  
1:54:56  
is a function you get as an preliminary result in the console okay this is a  
1:55:02  
function so just enter a pair of brackets and voila we get note 6 so it  
1:55:11  
gives us an result this is a pretty nice way to get this information so let's  
1:55:18  
just copy this and head over to our JavaScript and let's say let is  
1:55:31  
vocabulary is a fixed word it defines a variable it was called VAR V A R in the  
1:55:41  
past but the actual versions of JavaScript use let and let's name this  
1:55:48  
variable node ID so I name it an ID it's my own choice and then define this  
1:55:58  
variable an ID as a current node and as we don't get no feedback here let's  
1:56:06  
throw it into the console lock and just enter the variable as a message we get  
1:56:17  
here so oh sorry is the whole line was copied was not my intention so remove  
1:56:26  
this guy here and this should us give at every node change the actual node we are  
1:56:36  
entering or leaving so let's try it I save monetary art to export this new  
1:56:45  
version or the JavaScript file and we see get node ID is called node ID number  
1:56:53  
6 if you reload upon it to be our project in the browser there is always  
1:56:59  
an initial node change where the first node is called so it doesn't need to  
1:57:04  
wait for the panorama to load it and then put a first call it is already  
1:57:09  
happening at the beginning and now we are going to know it one well let's  
1:57:14  
clear it everything and let's remove this stuff here and now we see here it's  
1:57:21  
get node ID node ID 2 so we get this information from the panorama object  
1:57:28  
from the panel object via the JavaScript API of panel to VR this is one method to  
1:57:35  
get such information and if you want to know more about this then you should go  
1:57:42  
to the JavaScript API and just hit command or ctrl F and type get node or  
1:57:53  
usually if you're looking for programming vocabulary write it together  
1:57:59  
and then you get panel get node IDs get node user data or get current node or  
1:58:05  
whatever so this gives us the first part of the information we need and now  
1:58:11  
let's try to get this into this text box this will happen in the next clip as we  
4.4. Assemble text in JS  
1:58:22  
have the needed information grabbed from the monitor via panel object let's now  
1:58:28  
add some text to it to learn about how to operate with the strings with  
1:58:35  
character chains and I'm going to the JavaScript file and now let's add  
1:58:42  
another line and say let text and now I want to have some strings let's say I  
1:58:53  
want to have we are now and I want to have it we are now in node 6 or we are  
1:59:02  
in node 6 now let's do it this way around and if you want to add a variable  
1:59:11  
into a text you need a plus sign the plus sign is usually is a mathematical  
1:59:16  
operator but if it was used in a context with a string in JavaScript it is meant  
1:59:21  
as a concatenation of text parts let's enter an ID and let's enter another plus  
1:59:28  
and let's enter now exclamation mark and now we have a text where this is entered  
1:59:38  
as a word the variable and let's output this just copy it copy paste and let's  
1:59:47  
output this text to check whether it's working so save reload and we are node  
1:59:57  
for now that's an in missing let's add this we are or on node now and let's  
2:00:06  
enter this so this is about the concatenation of text elements you can  
2:00:13  
even use numbers as variables if a number is added to a string it automatically automatically turns into a string on the moment that it's used so  
2:00:23  
you don't need to worry that much on variable types at this place otherwise  
2:00:28  
you should you should do this but here it's not needed so this is the output we  
2:00:35  
want to have in our text box in the lower left corner which is planned for  
2:00:41  
the next clip in the last step of this little example we just need to complete  
4.5. Use jQuery to modify an HTML element  
2:00:49  
it by putting this variable text into the text box we introduced in the skin  
2:00:58  
we remember the note number has this class and I just copy it and now we  
2:01:08  
enjoy the advantage of jQuery as we only need to type dollar opening a bracket  
2:01:18  
then we have a point marking that now it's coming a class name paste it here  
2:01:26  
and if we have a look at our element here just switch for a moment to the  
2:01:36  
browser and go to the inspector and just right click on the text entry and go to  
2:01:43  
inspect and you see we have a diff it is a box in HTML it has a class you the  
2:01:53  
node ID and we have an inner diff I mentioned it already which holds the  
2:02:02  
text here you see the text and we have now the way we need to go to change this  
2:02:11  
text and in jQuery you not only can address an element but you can go a  
2:02:18  
little bit further and say okay we have this element UD node ID and then we want  
2:02:26  
to have a diff inside and just we can use this diff as a diff is an element  
2:02:34  
name it doesn't need a dot in front of it and now jQuery looks for this element  
2:02:39  
with this class name and then it looks inside of this element for diff and this diff needs to be changed as it has a text and we want to replace this text  
2:02:51  
and this element has a property which is attached with a point as a point after  
2:02:57  
the point you write HTML and HTML is the content of this box and then this HTML  
2:03:06  
gets a curly brace and now we just enter the text we want copy and paste it here  
2:03:14  
and now jQuery should replace the text the skin is introducing here with having  
2:03:23  
text standing here and we now replacing this word text with our text variable  
2:03:31  
and this text should read we are on node something here let's test it and save  
2:03:40  
Pano2VR to export it and now we have we are node 4 now this text is  
2:03:49  
manipulating from outside of the panorama player and if you change the node it should update immediately as this function is called on all node  
2:03:59  
changes and if you go to the next place node 6 node 3 and so on so now you have  
2:04:09  
the other way first you have a call from inside the skin outside to custom.js and  
2:04:16  
custom.js on the other way around is manipulating an element inside of the  
2:04:23  
skin and here you have seen the both ways of communication from inside of a  
2:04:30  
skin from a function call to the custom.js file and on the other way back  
2:04:39  
you have the functions here from jQuery to manipulate HTML elements in the skin  
2:04:47  
from outside and this is a pretty nice and basic example but it shows the  
2:04:55  
general principle how this is working and how to can communicate in both directions between the skin and the panorama player and an external  
2:05:07  
JavaScript