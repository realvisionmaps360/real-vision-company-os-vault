# **Extending Pano2VR | Using REST API for external data**

Capítulo 1: 01\. 01\. Project presentation  
0:00With this episode number 6, I will conclude the tutorial series about extending Pano2VR with JavaScript.  
0:1111 segundosFor this tutorial, I have set up a little project with Pano2VR. You see one point inside of this little virtual tour.  
0:2020 segundosWe are here in Vienna, in the capital of Austria, and this is the Schönbrunn Palace.  
0:2828 segundosIt is an old imperial palace in the western part of the city.  
0:3333 segundosAnd I have taken a very special approach for this project.  
0:3939 segundosLet me explain it a little bit with Google Maps. Here is Schönbrunn, the center of Vienna.  
0:4646 segundosHere we have the Schönbrunn Castle, and Schönbrunn is a very large area, which is this dotted outline here.  
0:5454 segundosAnd we have the palace itself, it is this area. And we have the large palace garden.  
1:011 minuto e 1 segundoThe northern part is a very nicely structured and very baroque garden. It is really huge.  
1:091 minuto e 9 segundosAnd in the southern part we have some wilder areas. And here we have the so-called Grand Patel.  
1:161 minuto e 16 segundosIt is a flat area. And at the borders of this area we have a series of statues.  
1:251 minuto e 25 segundosIt is about this area. And this is what we want to cover in this tutorial.  
1:331 minuto e 33 segundosWhat is this about? We can see some statues here.  
Capítulo 2: 01\. 02\. Project outline  
1:391 minuto e 39 segundosAnd some marble figures, these goddesses and gods of antique times, and some heroes from the Greek and the Roman history.  
1:491 minuto e 49 segundosAnd very classical sculptors' artworks. And we have one row at the eastern side of this Grand Patel we are standing in here.  
1:591 minuto e 59 segundosAnd we have a row at the western edge of this area. As you can see we have some hot spots here.  
2:092 minutos e 9 segundosThese ones are for moving.  
2:122 minutos e 12 segundosAnd these ones are for some explanations, some information about what this statue is showing.  
2:192 minutos e 19 segundosOr who is depicted here.  
2:222 minutos e 22 segundosLet's click on it and you see we have some information and an image of this figure and this statue.  
2:302 minutos e 30 segundosAnd we can have some explanations here. And we have a link leading to more explanations on Wikipedia.  
2:382 minutos e 38 segundosWe can close this and the interactivity is pretty simple.  
2:432 minutos e 43 segundosWhen I am moving to another point and I click on a statue, on a hot spot of a statue, then it opens.  
2:512 minutos e 51 segundosThe content is changed if I am clicking on another statue.  
2:562 minutos e 56 segundosIf I close it then the map will take off all the space of the left sidebar and the same it is if I am opening the box and I am moving.  
3:063 minutos e 6 segundosThe box is also closed and again covered by the map.  
3:113 minutos e 11 segundosThe map is pretty detailed. It is not Google Maps. It is some local map provider with larger resolution.  
3:183 minutos e 18 segundosIt is some open data and it is provided by the federal authorities.  
3:253 minutos e 25 segundosWe can move around here and sometimes we have, let's move to the corner here.  
3:323 minutos e 32 segundosWe have some figures where we have two statues close together or two persons, two figures combined in one statue.  
3:413 minutos e 41 segundosHere we have Janus, the two-headed god, and Bellona, the goddess of war in the Romans.  
3:473 minutos e 47 segundosWe have two parts of information here. That is what we see and what we can visit here.  
3:563 minutos e 56 segundosThe main topic of this tutorial is to show a procedure how we can get content into this box here.  
4:044 minutos e 4 segundosOf course you can do this all into some note hotspots or into some info hotspots.  
4:134 minutos e 13 segundosThere are a lot of ways to do this inside of the Pano2VR desktop app.  
4:194 minutos e 19 segundosWe choose another approach here because this content here is not embedded into the Pano2VR2 project.  
4:284 minutos e 28 segundosIt is retrieved from an external data source and what we see here is content directly retrieved from Wikipedia.  
4:384 minutos e 38 segundosThis is a pretty simple but I hope a very instructive example for a very widespread general procedure used in web technologies.  
4:504 minutos e 50 segundosWe have an interface between a Pano2VR project and an external data resource.  
4:574 minutos e 57 segundosThat is what this tutorial is about, how to connect Pano2VR with a little bit JavaScript to such external data connections.  
5:065 minutos e 6 segundosThis is a simple use case here with fetching public data from Wikipedia.  
5:145 minutos e 14 segundosIt is free, it is publicly available and this is only one example. You can do whatever you can imagine.  
5:215 minutos e 21 segundosThink of an online shop and you are retrieving product data here or you are moving around in a technical environment  
5:305 minutos e 30 segundosand you have some details, let's say in a workshop or in an industry site and you  
5:365 minutos e 36 segundoshave explanations for education and so on and you get explanations about the parts of this industry site here in the sidebar  
5:455 minutos e 45 segundosor it can also be attached to these hotspots, you name it. It is very much extendable.  
5:545 minutos e 54 segundosWe are mainly focused here in this tutorial about how this data connection works and how you can fire up a call from clicking here to getting the data into here.  
6:066 minutos e 6 segundosThat is what this tutorial is about.  
6:096 minutos e 9 segundosWe have some similar use cases in former tutorials but here I am concentrating on a  
6:186 minutos e 18 segundosgenerally used and widely available standardized interface  
6:256 minutos e 25 segundosbetween two points where we need data in our tour or in any other web project and to get the data from somewhere else in a standardized procedure.  
Capítulo 3: 01\. 03\. Advantages of external data  
6:366 minutos e 36 segundosI mentioned already some use cases for such a procedure and I will extend this a little bit.  
6:436 minutos e 43 segundosThere are a lot of advantages using such a separation of the presentation  
6:496 minutos e 49 segundosand let's title the virtual tour here with all the interface and all the interactivity as a presentation layer of our project  
6:596 minutos e 59 segundosand let's entitle this part here with the explanations and the information about the statues as a content layer.  
7:097 minutos e 9 segundosUsually, in smaller Pano2VR projects, you have these two layers in one project.  
7:147 minutos e 14 segundosYou are entering all these image URLs or the text boxes or links and so on  
7:217 minutos e 21 segundosin the appropriate fields in the hotspot properties or in the user data of a node and you deliver a completely self-contained project.  
7:307 minutos e 30 segundosWhen projects are getting larger, it may be interesting to concentrate the content externally with some very big advantages.  
7:417 minutos e 41 segundosMaybe the content can be edited from an external site, from your client or from multiple persons  
7:497 minutos e 49 segundosand you can set up Pano2VR as a scaffolding and getting the content from somewhere else.  
7:587 minutos e 58 segundosThere are a lot of use cases. I mentioned already an online shop where you can connect a virtual tour  
8:058 minutos e 5 segundosto your online shop with all the product data pricing and so on and product images and you can retrieve this data from your online shop into Pano2VR.  
8:168 minutos e 16 segundosThe technique we will discuss in this tutorial is the usage of the so-called REST API. I will explain it in detail later.  
8:248 minutos e 24 segundosThis REST API is a very common interface between projects where it comes to transferring data from two different servers or websites.  
8:368 minutos e 36 segundosYou can have the data source from nearly everywhere because the format, the data is exchanged between two parts.  
8:468 minutos e 46 segundosIt is highly standardized and you can, for example, use a content management system as a data provider for your Pano2VR project.  
8:578 minutos e 57 segundosMaybe this can be a part of a WordPress site. WordPress is delivering data if you want it and if you set it up alike.  
9:079 minutos e 7 segundosYou can have a data delivery from a WordPress site in a format that Pano2VR uses.  
9:149 minutos e 14 segundosOr it can be, let's name another example, it can be a Google Sheet  
9:199 minutos e 19 segundoswhere maybe your client and his employees are entering content and you display this content here in your virtual tour.  
9:289 minutos e 28 segundosSo this is working at the runtime so nobody of the participants of such a project need to have Pano2VR.  
9:379 minutos e 37 segundosThe project is already online but the content stays editable.  
9:429 minutos e 42 segundosAnd this is a huge advantage and you have a strictly separation between content and presentation.  
9:499 minutos e 49 segundosWith larger projects you can externalize data.  
9:539 minutos e 53 segundosMaybe your project is running on your server but the content and maybe it's data intensive is running from completely somewhere else.  
10:0310 minutos e 3 segundosSo you don't have to worry about your traffic and it comes from elsewhere. And it is meant as a blueprint.  
10:1210 minutos e 12 segundosThis tutorial is really kind of a blueprint for this data interfacing between two sites and how it is set up and it's not  
10:2010 minutos e 20 segundosreally difficult because it is highly standardized and it is living for a long time in the web and some of the most important technical foundations of modern web technology what I'm using here.  
10:3210 minutos e 32 segundosAnd so this project is set up as simple as possible but as complex as it's needed.  
10:3910 minutos e 39 segundosIt's sometimes a bit abstract but I will explain it in detail how this is working,  
10:4410 minutos e 44 segundoshow we get this up and running with our Pano2VR tool and make it retrieve data from Wikipedia using the mentioned REST API interfacing.  
Capítulo 4: 02\. 01\. What is an API?  
10:5710 minutos e 57 segundosI just mentioned two words which need some detailed explanation.  
11:0311 minutos e 3 segundosWe are using interfaces between our project and the data source of Wikipedia which is called REST API.  
11:1011 minutos e 10 segundosAnd so both are abbreviations so let's check what they are really meaning. What is an API? What is REST?  
11:1811 minutos e 18 segundosAnd there are some pretty abstract concepts behind it but I want to keep it as simple as possible.  
11:2511 minutos e 25 segundosAnd I've had some bookmarks for you and let's start with an API.  
11:3011 minutos e 30 segundosAn API is an application programming interface and an API is basically a procedure to make programs connect to each other and exchange data in both directions.  
11:4311 minutos e 43 segundosThese protocols need to be understood by both parts of this project.  
11:4911 minutos e 49 segundosSo in our example we need to make sure that Pano2VR is sending the right commands  
11:5611 minutos e 56 segundosto Wikipedia so that Wikipedia knows what do they want from me and then delivers data in a format Pano2VR or what we will program now understands.  
12:1012 minutos e 10 segundosSo they both need an understanding in both directions. This hotspot sends a command to Wikipedia, a request, a so-called request.  
12:2012 minutos e 20 segundosAnd the response is up to very important words, request, response.  
12:2612 minutos e 26 segundosNearly the whole web is basically only a request, response.  
12:3012 minutos e 30 segundosAnd the response is the data delivered from some server and the request is send a command to a server.  
12:3612 minutos e 36 segundosOne click of the hotspot makes Pano2VR send a request to the Wikipedia REST API interface and the Wikipedia server delivers the data.  
12:4812 minutos e 48 segundosPano2VR accepts this data, retrieves it and makes it fitting the format I have decided for styling here in this box.  
12:5912 minutos e 59 segundosSo that's the basic procedure we have here and which we want to cover in this tutorial.  
13:0713 minutos e 7 segundosSo API is a programming interface between two points, a server or the browser or between two servers or between a server and some other devices, whatever.  
13:2013 minutos e 20 segundosIt is just for making two parts exchanging data understand each other.  
13:2713 minutos e 27 segundosThis is an API. Now let's come over to the next more specific part of the web API.  
13:3613 minutos e 36 segundosThis is more specific than the general API explanation because the web API relies on  
13:4313 minutos e 43 segundosthe hypertext transfer protocol, means HTTP, what we all know as a prefix of a web URL.  
13:5013 minutos e 50 segundosSo it is a web protocol and basically so all data need to be exchanged via web protocol.  
13:5713 minutos e 57 segundosThat is pretty simple and doesn't need further explanation. But I want to make this distinction to get a little bit more detail.  
14:0514 minutos e 5 segundosSo we are using a web API, but simply talking about APIs.  
Capítulo 5: 02\. 02\. What is REST?  
14:1114 minutos e 11 segundosAnd the next part is the magic word REST.  
14:1514 minutos e 15 segundosREST is a pretty abstract concept and the REST stands for representational state transfer,  
14:2314 minutos e 23 segundoswhich is a completely abstract word here and is not possible to really explain it in this tutorial.  
14:2914 minutos e 29 segundosIt basically defines the way how a request to a server is processed to give a proper answer to the starting point from where we have the request sent.  
14:4114 minutos e 41 segundosSo usually it's a browser and in the browser our Pano2VR project and this sends a command via web API to Wikipedia.  
14:5214 minutos e 52 segundosAnd Wikipedia has a REST interface and there are certain procedures how this data is exchanged.  
15:0015 minutosI don't want to go into technical details here and we get something back from this server.  
15:0715 minutos e 7 segundosAnd all this is defined with this REST procedure and it is very roughly explained now.  
15:1415 minutos e 14 segundosAnd don't take it too serious what I'm saying here because I'm not an IT guy. I'm a web developer and panoramic photographer.  
15:2315 minutos e 23 segundosBut it is okay to know this and not to go too much into detail.  
15:3015 minutos e 30 segundosWe simply want to get this to work.  
Capítulo 6: 02\. 03\. What is JSON?  
15:3315 minutos e 33 segundosAfter we have got an idea about this interfacing process between two points,  
15:4115 minutos e 41 segundosour project here on the browser and an external data source like Wikipedia on this side, we now need to talk about how the data is looking like we are receiving from Wikipedia.  
15:5515 minutos e 55 segundosThere we have a data standard which is pretty common and it is very useful for such purposes.  
16:0216 minutos e 2 segundosSo let's go to the next point in my bookmarks list and this is JSON.  
16:0816 minutos e 8 segundosJSON is an abbreviation for JavaScript Object Notation and it is a data format.  
16:1516 minutos e 15 segundosIt is standardized and is extremely widely used and it has a simple syntax. And if you go into syntax, you see how it is made.  
16:2516 minutos e 25 segundosIt usually consists of curly braces and inside of a curly brace we have pairs.  
16:3316 minutos e 33 segundosThese are so-called key value pairs. This is a key and this is a data called value.  
16:4016 minutos e 40 segundosIf you have strings, everything is in quotation marks.  
16:4516 minutos e 45 segundosIf you have booleans, true or false, this is written in plain text and numbers are written as numbers.  
16:5316 minutos e 53 segundosEverything else is a string. You only have these three data types. All keys can be written with quotation marks.  
17:0117 minutos e 1 segundoIt is a clean way but you can omit it and you have the possibility to nest it.  
17:0817 minutos e 8 segundosSo we have here first name John and we have the age and we have true and here we have address as key  
17:1517 minutos e 15 segundosbut the value is not a string, a boolean or a number but it is a new JSON object.  
17:2517 minutos e 25 segundosIt is called an object and every object is surrounded by a curly brace and so you can nest it as much as you like.  
17:3417 minutos e 34 segundosThis is an object with four keys and the values are all strings and it goes on here the same way and here we have a fourth data type which is null.  
17:4417 minutos e 44 segundosIt is a null object. It is kind of empty or zero but usually it is not there but it is marked with a key so you can fill it up later.  
17:5617 minutos e 56 segundosThis is pretty simple.  
17:5817 minutos e 58 segundosIt is pretty much readable what the data is about but JSON is widespread standardized as the language REST API is talking from and to.  
18:1318 minutos e 13 segundosSo what we are doing here, we are sending a request to the Wikipedia URL  
18:1918 minutos e 19 segundosand Wikipedia sends back JSON and we will have a look at it in the next clip after this basic explanation what JSON is.  
Capítulo 7: 02\. 04\. Compare HTML to JSON  
18:3118 minutos e 31 segundosNow let us have a closer look at how the data is looking like we want to retrieve. So I am heading over to Wikipedia.  
18:4018 minutos e 40 segundosI have picked up a random example.  
18:4318 minutos e 43 segundosLet us say this is a uranium metallic element in the periodic system of elements and you can take any other element.  
18:5118 minutos e 51 segundosWhat you see here is the result, the response of a request I sent to Wikipedia via my browser to this URL.  
19:0219 minutos e 2 segundosThis is the request and this is what I am getting back and if I am having a look at the source code of this article here  
19:1219 minutos e 12 segundosjust type command or control U and you see the source code, you have the return, it is HTML with a head and so on and a lot of meta stuff.  
19:2519 minutos e 25 segundosThen we have the body and where the body starts we have the visible content and so on.  
19:3219 minutos e 32 segundosIt is pretty much readable.  
19:3419 minutos e 34 segundosYou will find the visual counterparts of this code on the front end of the website and so on.  
19:4119 minutos e 41 segundosI do not scroll to everything here and we have a lot of formatting here and structuring with body, header, div, nav and so on.  
19:5219 minutos e 52 segundosSo this HTML code is a mixture of content, of content data and a lot of formatting and some utility code for let us say social media.  
20:0320 minutos e 3 segundosHere we have the code for display in Facebook posts and so on.  
20:1020 minutos e 10 segundosThere is a lot of other stuff around and it is a mixture of data, utilities and a lot of formatting you see all here.  
20:1820 minutos e 18 segundosWe have a lot of CSS classes. So it is delivered and readily rendered data.  
20:2720 minutos e 27 segundosNow let us have a look how this article looks like in JSON.  
20:3320 minutos e 33 segundosThat is the key to what we want to have from Wikipedia and we click on a statue hotspot and we want to have this in our formatting and we only need the data.  
20:4620 minutos e 46 segundosBasically we want to have this part here, not all the stuff around. We do not need a menu or this helper tools here on the side.  
20:5420 minutos e 54 segundosSo we only need the data. So let us head over to the JSON data and you see it is a completely other display.  
21:0321 minutos e 3 segundosIt is not formatted at all. Basically it looks like this.  
21:0721 minutos e 7 segundosIt is only data starting with a curly brace and ending with a curly brace and so on.  
21:1321 minutos e 13 segundosYou see some HTML code here inside because HTML code can be a value in a JSON string.  
21:2121 minutos e 21 segundosSo we have it in the raw data as it is transported over the wire and this is the structured display.  
21:3321 minutos e 33 segundosMost browsers have a built-in structured display of JSON data because it is so widespread and it is way better readable if you have it in this format  
21:4221 minutos e 42 segundosbecause you can see all the numbers in green, the strings are violet, and the keys are blue, and you see the structure with the nesting.  
21:5121 minutos e 51 segundosYou can fold, unfold it, so it is pretty nice to read.  
21:5521 minutos e 55 segundosAnd this is the same data you see on this article, but this is without any formatting.  
22:0222 minutos e 2 segundosIt is only distinguished by numbers, strings, and booleans and nothing else.  
22:0822 minutos e 8 segundosSo you can have this data naked and you can do your own formatting on it and it is very compact as you see when you see the raw data.  
22:1922 minutos e 19 segundosIt is a pretty short text, way, way shorter than you see the readily rendered HTML page.  
22:2722 minutos e 27 segundosAnd so this is what we want to have from Wikipedia.  
22:3222 minutos e 32 segundosAnd you see we have a certain address here, this is the URL of the article  
22:3722 minutos e 37 segundosand this is the URL of this so-called endpoint where we need to come back later to explain what an endpoint is and how can I reach this endpoint.  
22:5022 minutos e 50 segundosThis is public as well, but you need to find it and you need how to get there. This is the public web interface, the web frontend.  
23:0023 minutosFrontend is another word used for the presentation of data in the web browser  
23:0523 minutos e 5 segundoswhere the web browser displays HTML and this frontend is made for HTML and the JSON data isn't made for a frontend yet.  
23:1623 minutos e 16 segundosYou feed this data into your own presentation and your own frontend.  
23:2123 minutos e 21 segundosSo this is a basic comparison between HTML and JSON and how this is looking like  
23:2923 minutos e 29 segundosand now we need to explain how to get there.  
Capítulo 8: 02\. 05\. What is an endpoint?  
23:3423 minutos e 34 segundosThe next point we need to take care about is where do we get what data from an REST API, a so-called endpoint.  
23:4523 minutos e 45 segundosAn endpoint is an URL where you get data after you send a request to a server and it's REST API interface.  
Capítulo 9: 02\. 06\. About Wikipedia endpoints  
23:5423 minutos e 54 segundosSo now let's check how to find these endpoints in Wikipedia.  
24:0024 minutosIt's of course a reason why I choose Wikipedia as an example because it's very nicely documented.  
24:0824 minutos e 8 segundosLet's go to my bookmarks here so we have the REST API of MediaWiki.  
24:1624 minutos e 16 segundosMediaWiki is a technical website and Wikipedia is one part of this project  
24:2324 minutos e 23 segundosand the Wikipedia people externalize all these technical services to MediaWiki  
24:3024 minutos e 30 segundosor to the media handling all the images and all the data and it's a little bit like the technical backstage area of Wikipedia  
24:3724 minutos e 37 segundosand here it is explained how this API works and how to get your stuff  
24:4524 minutos e 45 segundosand what is interesting for us is the API reference and if you want to have some more  
24:5324 minutos e 53 segundosdetails or some introduction about how this is working you can go to Quickstart and you get some more explanations  
25:0225 minutos e 2 segundoshow it is working but we are heading over to this part and we are going to the API reference  
25:1225 minutos e 12 segundosand now let's check how we can go ahead here.  
25:1825 minutos e 18 segundosAnd here we have an example for a search result object. This is what we get if you are going to find a certain file.  
25:2725 minutos e 27 segundosHere is an image file and here you see the JSON object returned from the server and it is one object and here we have one sub-object.  
25:3825 minutos e 38 segundosIt is the thumbnail and with a short description on it. It is pretty much readable and understandable.  
25:4625 minutos e 46 segundosSo now let's get a step further and that's where we are here. So I have bookmarked my steps how to go there.  
25:5525 minutos e 55 segundosAnd here we have a so-called sandbox.  
25:5825 minutos e 58 segundosA sandbox is a kind of a playground where you can check technologies  
26:0426 minutos e 4 segundoswithout programming something just to take a look how to get the data in this case and how we find stuff.  
26:1326 minutos e 13 segundosAnd here we have some examples how to get some data from this interface  
26:2126 minutos e 21 segundosand you see that the URL of this data is kind of a description what you get from there.  
26:2926 minutos e 29 segundosAnd here you can get HTML, you get some errors or you get some version information and so on.  
26:3626 minutos e 36 segundosAnd there is another point here. I put these URLs later in the description.  
26:4526 minutos e 45 segundosAnd here we have the Wikipedia sandbox and here we have some examples.  
Capítulo 10: 02\. 07\. Explore REST endpoints  
26:5226 minutos e 52 segundosHere we have the choose the API to explore and this is Wikipedia REST API.  
26:5826 minutos e 58 segundosWe have the Wikimedia REST API, some mathematical functions which are accessible via this API.  
27:0427 minutos e 4 segundosBut this is what is interesting for us.  
27:0827 minutos e 8 segundosAnd here we can go a little bit further and we are coming close to what we like to have.  
27:1827 minutos e 18 segundosThis is a server. It is the only one available. And we have here some page.  
27:2527 minutos e 25 segundosIf you want to see what's coming out here, here is the example and how it's formatted and so on.  
27:3527 minutos e 35 segundosAnd you can click on get to close it again here.  
27:4027 minutos e 40 segundosAnd what we like, I have scrolled to all these items here and to find the best for our project here.  
27:4827 minutos e 48 segundosAnd it is the summary. And the summary is delivering a short excerpt of the article.  
27:5627 minutos e 56 segundosJust enough to have our room here filled with some short explanation.  
28:0128 minutos e 1 segundoI don't want to have the whole article and I want to have a short but informational extract of the article.  
28:1028 minutos e 10 segundosAnd that's what we are getting here.  
28:1328 minutos e 13 segundosHere are the technical details of all this process between my request and Wikipedia's response.  
28:2228 minutos e 22 segundosAnd possible errors and so on, how they are handled, how they are formatted. Technical very much going into the details here, but we don't need to know this here.  
28:3228 minutos e 32 segundosBut this is our so-called endpoints, what we see here. Page, summary and then we have the title.  
28:4128 minutos e 41 segundosWhile the title is the same string as we have the title in our example.  
28:4828 minutos e 48 segundosSo when I'm going back to my first example of this chemical element, let's head over again to Uranium.  
28:5628 minutos e 56 segundosHere is the article here.  
28:5828 minutos e 58 segundosAnd if I'm going to my example with the JSON output, then you see how this URL is formatted.  
29:0929 minutos e 9 segundosThis is a base URL, this is a basic server, en.wikipedia.org, API REST version 1\.  
29:1629 minutos e 16 segundosUsually APIs are identified by versions because they evolve over the time.  
29:2329 minutos e 23 segundosAnd then you see it here. The rest of the URL is page slash summary slash title. And this is exactly what we have here.  
29:3129 minutos e 31 segundosPage, summary and then you have the title and then you get this.  
29:3629 minutos e 36 segundosAnd we only need a part of it and what we need later is extract HTML.  
29:4329 minutos e 43 segundosAnd we need the formatted title and we need this description.  
29:5029 minutos e 50 segundosAnd we need the link to the article. This is what here we have in content URL, the desktop page.  
29:5829 minutos e 58 segundosThis is the link we want to use later as a backlink from our display in the sidebar box back to Wikipedia.  
30:0830 minutos e 8 segundosSo this link is meant here. So now we have an idea how to get to the data we want to have for our project.  
30:1730 minutos e 17 segundosAnd the URL which need to be fired when we are clicking on such a hotspot here.  
Capítulo 11: 03\. 01\. Project start status  
30:2530 minutos e 25 segundosAfter this introduction covering the technical basics of our project, now let's go to the Pano2VR project.  
30:3530 minutos e 35 segundosAnd I have now switched from the finished version to the starting version where everything is prepared so that we can concentrate on the topic of this tutorial.  
30:4830 minutos e 48 segundosSo what I have prepared now is the barebone project. You don't see any formatting here.  
30:5630 minutos e 56 segundosAnd if I click on a statue, then you will get an empty box, the map is working and everything else what is covered by the naked Pano2VR project.  
31:0931 minutos e 9 segundosNow let's head over to Pano2VR to show the project a little bit more in detail how it's set up.  
31:1631 minutos e 16 segundosSo you see here we have the seven panoramas of the park where we can move on here just using the alt option key to move around here in the Pano2VR viewer.  
31:3031 minutos e 30 segundosAnd you see some white panoramas here with all the statues.  
31:3531 minutos e 35 segundosAnd you see we have node hotspots here also at the statues.  
31:4231 minutos e 42 segundosHow it is made and why these are not informational hotspots but node hotspots is a little trick.  
31:4931 minutos e 49 segundosYou can do it but you don't need to but it has some practical advantages.  
31:5331 minutos e 53 segundosWhat I have done is I have placed dummy panoramas over the head of every statue.  
32:0232 minutos e 2 segundosThere are some neat tricks you can do in Pano2VR.  
32:0632 minutos e 6 segundosAll these panoramas here, you see the satellite icon, the panoramas are geolocated and I have done it for the figures as well.  
32:1632 minutos e 16 segundosI will explain it later a bit more in detail. First let's have a look at the skin.  
32:2332 minutos e 23 segundosIt is pretty easy and it is bare bone. It has no controller, no navigation bars, no nothing.  
32:3032 minutos e 30 segundosI have just a location bar here where you have the user data title.  
32:3832 minutos e 38 segundosSo I can see where I am in the tour. We have a box here. It is the so called wiki box.  
32:4632 minutos e 46 segundosThat is where I want to throw in my content later. And we have a map container.  
32:5432 minutos e 54 segundosThe map container is set to 20% height and you see the basic structure here.  
33:0133 minutos e 1 segundoIf this wiki is activated it will rise to 100% and it is made from the bottom.  
33:1033 minutos e 10 segundosIn fact the wiki box is always visible and the map is covering the box when it is activated.  
33:1833 minutos e 18 segundosSo the box is always present and the advantage is if I want to load some data it is already there. I don't need to open it.  
33:2633 minutos e 26 segundosIt is already there and it is covered by the map container.  
33:3033 minutos e 30 segundosHere we have some actions mostly regarding the visibility of the wiki box and the behavior of the map.  
33:3833 minutos e 38 segundosYou see I have a custom map here, a base map. And everything else is pretty much straight forward.  
33:4533 minutos e 45 segundosNow the node hotspot is opening the next panorama and if I click on the node hotspot you can already see it here.  
33:5233 minutos e 52 segundosLet's see it in the browser. So if I am opening the box and I am going to another location the box is automatically closed.  
34:0134 minutos e 1 segundoThat is everything what this node hotspot is currently doing. And this is it pretty much.  
34:0734 minutos e 7 segundosNothing very special, no rocket science, a bare bones skin where we want to implement all the functions we need to get this wikipedia data into the wiki box.  
34:1934 minutos e 19 segundosThat is the basic structure of the project and in the next clip I want to show how I made the statues in the geolocation thing to place them very easily.  
Capítulo 12: 03\. 02\. Using dummy nodes  
34:3234 minutos e 32 segundosNow let me shortly explain why I am using this concept of dummy nodes.  
34:3934 minutos e 39 segundosIt is a pretty nice concept compared to using ordinary hotspots.  
34:4434 minutos e 44 segundosThe description of the statue can easily be replaced by an info hotspot or something like that.  
34:5134 minutos e 51 segundosBut I choose to use a dummy node.  
34:5434 minutos e 54 segundosThe dummy node has a simple dummy panorama, it is 6x8 pixels, it is extremely small.  
35:0235 minutos e 2 segundosAnd they are just blank, they have no function as to be there.  
Capítulo 13: 03\. 03\. Geo-located nodes  
35:0835 minutos e 8 segundosThey are never displayed and they can never be jumped to.  
35:1335 minutos e 13 segundosBut they have geolocation and if I am heading over to the tour map, here we have all the nodes in the tour.  
35:2235 minutos e 22 segundosThen we have the panorama nodes here as we walk along this row of statues.  
35:2835 minutos e 28 segundosAnd we have here the nodes with the statues.  
35:3235 minutos e 32 segundosAnd the simple trick is you need to place this node here just by drag and drop onto the map.  
35:4535 minutos e 45 segundosYou can see them clearly here because it is a very high resolution map.  
35:5235 minutos e 52 segundosAnd when in this node the user data is asked, then you can check it here by using the altitude data.  
36:0136 minutos e 1 segundoAnd if you click here, then you are asked what capture height of meters is it.  
36:0736 minutos e 7 segundosAnd I entered not the usual 1.6 or 1.8 meters for the eye level.  
36:1336 minutos e 13 segundosI entered I think 7 or 8 meters above ground. So they have the exact location but they are elevated.  
36:2136 minutos e 21 segundosThe only prerequisite, the need for this is to go to the project settings at the project user data.  
36:2936 minutos e 29 segundosAnd you need to tick this box.  
36:3236 minutos e 32 segundosAnd if you now have a hotspot, you can click on the map to place it and then it gets the geolocation data.  
36:3936 minutos e 39 segundosAnd if you're going to the user data, then click on the altitude button here with the satellite symbol.  
36:4736 minutos e 47 segundosThen it is retrieving the data and then you can add your tripod height to it after you click it here.  
36:5436 minutos e 54 segundosAnd then in the images, these dummy node hotspots are usually placed above.  
37:0237 minutos e 2 segundosThey were originally they would be placed here but with 6 or 7 meters above they are placed above the head.  
37:1137 minutos e 11 segundosNeat trick you can use here but you need to activate the altitude sensitivity for displaying the hotspots of other nodes.  
37:2237 minutos e 22 segundosYou see here unsuggested ghost hotspot of this statue. It is placed nearly above the head.  
37:2837 minutos e 28 segundosIt needs only a little bit tweaking but they are already placed near the perfect location.  
37:3437 minutos e 34 segundosThis is the point why I'm using dummy hotspots. And you see here you have the connections only in light blue arrows.  
37:4337 minutos e 43 segundosYou see it's a little bit bent so there is some tweaking necessary maybe.  
37:4937 minutos e 49 segundosEspecially if this is placed on a plain ground with no details where I can place it exactly.  
37:5537 minutos e 55 segundosAnd data retrieved from my iPhone for every capture are not as precise as I hope them to be.  
38:0338 minutos e 3 segundosBut it is a pretty much nice layout and close to the final state.  
38:0938 minutos e 9 segundosSo minimal tweaking is required but not very much. And so you can use this trick with dummy nodes.  
38:1738 minutos e 17 segundosIt is also extensible to let's say mountain summits or something like that.  
38:2238 minutos e 22 segundosWhere you want to have some elements in your panorama which are geolocated but not real nodes where you can jump to.  
38:3038 minutos e 30 segundosAnd another use case for using dummy nodes is they are on the map as you see.  
38:3638 minutos e 36 segundosAnd so you can have a map with some other elements than nodes.  
38:4138 minutos e 41 segundosLet's say you are in a city and you want to play some hotels and you can use some dummy nodes for the hotels you never jump to.  
38:4838 minutos e 48 segundosBut they are only used for display here on the map. To distinguish the nodes it is very important to use tags.  
38:5738 minutos e 57 segundosBecause the dummy nodes of the statues themselves won't never be accessible.  
39:0439 minutos e 4 segundosSo I need to have tags and if I'm going to the user data and scroll down you see my normal panoramas have the tag real.  
39:1539 minutos e 15 segundosI'm using underscore so it stands on top in lists.  
39:1939 minutos e 19 segundosAnd here in another panorama they have underscore statues so they can easily filter them.  
39:2539 minutos e 25 segundosAnd I can use them in logic blocks because the hotspots need to do different things.  
39:3339 minutos e 33 segundosHotspots from one panorama to each other need to be used to jump from each other.  
39:3839 minutos e 38 segundosHotspots to such a dummy node are not meant to have an action to jump to this panorama but only to fetch the data of this panorama.  
39:4739 minutos e 47 segundosAnd that's what we are using here effectively for fetching the data to get our stuff retrieved from the Wikipedia server.  
39:5639 minutos e 56 segundosAs you may have noticed it already we have some other preparations done before here.  
Capítulo 14: 03\. 04\. Custom properties on nodes  
40:0440 minutos e 4 segundosAnd I will come now to it as we need to use the concept of the custom properties extensively here.  
40:1340 minutos e 13 segundosAnd I have added three of them and they are defined here in this region.  
40:2340 minutos e 23 segundosAnd I have a first name URL is the first custom property where the Wikipedia address of the article about the first figure.  
40:3540 minutos e 35 segundosThere are sometimes two as here we have Janus and Bellona.  
40:4040 minutos e 40 segundosAnd we have the first article URL is leading to Janus, the second is to Bellona.  
40:4740 minutos e 47 segundosIt is writing as it is the last part of the Wikipedia URL the title of the article.  
40:5540 minutos e 55 segundosAnd we have a statue image which is here.  
40:5840 minutos e 58 segundosAll these three custom properties are based on strings and we need to make one thing as a preparation before.  
41:0841 minutos e 8 segundosAnd we have a folder named statues and this need to be added in our project folder as to be exported as asset.  
41:2341 minutos e 23 segundosAnd this is done here in the output section with the panel under advanced assets.  
41:3241 minutos e 32 segundosAnd here we need to add a folder. And I have here the statues and these are the images here.  
41:4341 minutos e 43 segundosI have taken my own images here because the images in the Wikipedia articles are very inconsistent and not complete for my purpose.  
41:5541 minutos e 55 segundosSo I took the images for myself during making the panoramas I made in parallel  
42:0142 minutos e 1 segundoand made some shots with another camera to have consistent images of the statues on top of my Wikipedia article.  
42:1042 minutos e 10 segundosSo we don't retrieve the images from Wikimedia but here I'm using my own and so  
42:1642 minutos e 16 segundosI need a custom property with an image path here with the title statue images as a custom property for a note.  
42:2542 minutos e 25 segundosAs you can imagine we have these three custom properties only filled with content in the dummy notes as they are describing the statues.  
42:3642 minutos e 36 segundosIn the real notes we just leaving them empty.  
Capítulo 15: 03\. 05\. Setup skin variables  
42:4242 minutos e 42 segundosAs I now have changed something on the status of the project I have saved it  
42:4842 minutos e 48 segundosunder the suffix underscore work and I did the same with the skin so we have now a proper working version of our status.  
42:5842 minutos e 58 segundosAnd I have added the statues folder for the images which are needed to accompany the Wikipedia content in our wiki box in the skin.  
43:1043 minutos e 10 segundosSo now let's head over to the skin and we now need some skin variables.  
43:1843 minutos e 18 segundosYou see we have the user data custom properties already transferred to our skin.  
43:2843 minutos e 28 segundosIt usually happens after setting up the custom properties in the main app of Pano2VR and if you open the skin after that the first time then you will be asked whether this should be integrated into the skin as variables.  
43:4243 minutos e 42 segundosBut they are only temporarily available and only under certain circumstances.  
43:4943 minutos e 49 segundosSo this is not a variable globally accessible but it is only used when it comes to handling a note and the  
43:5743 minutos e 57 segundossame is the case if I have hotspots with custom properties.  
44:0344 minutos e 3 segundosThey are another type of these hotspots and they will be added here also and you have this target icon for hotspots.  
44:1244 minutos e 12 segundosBut we need to make them globally available as we want to transfer the data to JavaScript.  
44:1844 minutos e 18 segundosThis isn't working with this one here out of the box so we need a part in between  
44:2444 minutos e 24 segundosand I'm going to the variables here and I add three variables where the content of  
44:3144 minutos e 31 segundosthis variables of this user data custom properties are transferred to before they are sent to JavaScript.  
44:4044 minutos e 40 segundosIt's a usual procedure and to shorten it a bit I am pasting them in. I prepared it  
44:4844 minutos e 48 segundossomewhere else and let's say copy and now I paste it in here and now we have four variables here.  
44:5944 minutos e 59 segundosAnd you see they don't have this icon here at source so they are globally available in the skin in the project and this is var firstName, var secondName.  
45:1045 minutos e 10 segundosThey are getting their content from here and you have the statue image and you have  
45:1645 minutos e 16 segundosthe statue title which is derived from the user data as you see here the statue title is what we have here.  
45:2445 minutos e 24 segundosI did not retrieve this from Wikipedia because sometimes there are differences between the name of the statue and the data I want to get.  
45:3645 minutos e 36 segundosHere we have the abduction of Helena this is a title official title of the statue but the article I want to point to is Helen of Troy or the Helen of the city Troia.  
45:4745 minutos e 47 segundosAnd so these are different so I choose to make my own titles and the titles here are only needed as a text of the link back to the Wikipedia article.  
45:5845 minutos e 58 segundosSo I'm doing some dispatching here from the three custom properties plus the user  
46:0446 minutos e 4 segundosdata title I'm transferring them to these global variables here and in the next step I need to push them on a hotspot click to make it available to an external function.  
Capítulo 16: 03\. 06\. Prepare hotspot actions  
46:1846 minutos e 18 segundosNow we are adding our first action here in the skin and it covers the moment the event when I'm clicking here on this hotspot.  
46:3046 minutos e 30 segundosIt is a node hotspot and I want to transfer the data of this dummy node the user data the three custom properties  
46:3846 minutos e 38 segundosand the title here it is the title is abduction of Helena and I want to have the three custom properties all these four parameters on click I want to have it transferred to global skin variables.  
46:5346 minutos e 53 segundosAnd now it's only happening that the wiki box is opening and now we want to add it  
47:0047 minutosin the skin editor and I'm going to htnode and now I have the usual actions we have on such a node  
47:0947 minutos e 9 segundosopennextpolarama looking forward because they all have a geographic north.  
47:1547 minutos e 15 segundosSo I'm using forward so I'm pointing always in the same direction or looking always in the same direction after no jump.  
47:2247 minutos e 22 segundosThis is a hotspot URL and opennextpolarama pretty much straightforward. We have an asterisk here.  
47:2947 minutos e 29 segundosWe have a logic block on this action. Let's make a double click and examine it.  
47:3447 minutos e 34 segundosOf course the no jumps only may happen if we have the tag real so you can only jump between the real nodes not between the dummy nodes.  
47:4647 minutos e 46 segundosSo it's okay and we have a set variable value. It's the same.  
47:5047 minutos e 50 segundosWe have also text contain statue and if you click on a statue then I will open the wiki window here.  
48:0148 minutos e 1 segundoIt is a variable with wiki is true then this box is shown.  
48:0548 minutos e 5 segundosSo here if I'm clicking on nextpolarama link, I'm changing the node and here I'm not changing the node.  
48:1548 minutos e 15 segundosIt stays here. You see on the map and it is opening the box. These are the basic interaction functions so far in the skin.  
48:2548 minutos e 25 segundosNow let's add some more stuff saving it and I'm copying some actions here and throw it into this.  
48:4048 minutos e 40 segundosHotspot templates paste you have no a very simple action, which is copying the custom  
48:4848 minutos e 48 segundosproperties as named here as a placeholder first name URL and second name and statue image.  
48:5848 minutos e 58 segundosAnd here we have the hotspot title to be put into the variable statue title.  
49:0349 minutos e 3 segundosSo these four global variables are now filled if I click on a hotspot.  
49:1049 minutos e 10 segundosSo I save it here. Of course, we cannot see it here because they aren't display anywhere.  
49:1849 minutos e 18 segundosWe could check it in the console with some tricks, but I have prepared something for this.  
Capítulo 17: 03\. 07\. Check skin variables  
49:2549 minutos e 25 segundosTo check this variable transfer from the custom properties to global skin variables on a mouse click here on the node hotspot above the statues.  
49:3549 minutos e 35 segundosWe need to check it, but we can see it so far and I have prepared a nice little tool here in my component library.  
49:4549 minutos e 45 segundosLet's go to tutorials and add this component to skin and I called it a debug  
49:5249 minutos e 52 segundosbox. It is just a text box and if you go here to the element itself in the text, you have a title.  
50:0150 minutos e 1 segundoAnd after that you have a variable you can reconfigure the text for reusing this  
50:0850 minutos e 8 segundoslittle text field and I am using this dollar button here to access my variables to fill them in here.  
50:1850 minutos e 18 segundosAnd now I can see them changing during runtime. I need to save it here and as I  
50:2650 minutos e 26 segundoshave activated on the view live on update on safe only.  
50:3350 minutos e 33 segundosI disabled it so I can have the update immediately after I have changed something in the skin and here we have it.  
50:4250 minutos e 42 segundosIt is empty now the variables if I am going to the next node and you see it is  
50:4950 minutos e 49 segundosputting the node title here, but we won't get the information here at this moment.  
50:5750 minutos e 57 segundosBut when we click on a statue then we see the title of the statue, the Wikipedia URL  
51:0551 minutos e 5 segundostitle and we have the file name of the image shown later.  
51:1251 minutos e 12 segundosIn this case we have two figures in one statue combined so we have Janus and  
51:1851 minutos e 18 segundosBellona with two names and two leading later to two Wikipedia articles and retrieving content of two articles.  
51:2751 minutos e 27 segundosSo this is working, this is a little helper tool here I like it very much and  
51:3251 minutos e 32 segundosit is recommended to throw such stuff into the component library because you need it in every project and so we have a little bit preparation done here for our project.  
51:4651 minutos e 46 segundosAnd now as we have the content variables or the variables which are defining the  
51:5251 minutos e 52 segundoscontent I want to have from Wikipedia, now we have them available as global variables and at this stage we can use them in JavaScript functions.  
Capítulo 18: 04\. 01\. Actions for sidebar  
52:0452 minutos e 4 segundosIn this chapter I want to focus more on the skin and some more setups and  
52:1052 minutos e 10 segundospreparations before we really can start to program our interface between our PulteVR project and the data source at Wikipedia.  
52:2252 minutos e 22 segundosAnd the box where the Wikipedia content is displayed is located in a Wikipedia  
52:2952 minutos e 29 segundoscontainer, it is 320 pixels wide and 100% pixels high, we have no modifications, it is always there.  
52:4052 minutos e 40 segundosAnd inside we have a box which is 81% high to be covered by the map because the  
52:4852 minutos e 48 segundosWikibox isn't moved or scaled anywhere while the container of the map is usually  
52:5752 minutos e 57 segundos20% when the Wikipedia box is open and it is 100% when the box is closed.  
53:0653 minutos e 6 segundosSo this Wiki is controlling everything here, only one variable, it is very  
53:1153 minutos e 11 segundospractical and of course this little button here, the close bar, it sets this Wiki to  
53:1653 minutos e 16 segundosfalse and this Wiki will set to true if I click on the node hotspot as you can see it here, that's all.  
53:2453 minutos e 24 segundosSo the interactivity is pretty simple here and let's go back to the Wikipedia box, this is the content container we need to manipulate.  
53:3553 minutos e 35 segundosSo, first action if you want to manipulate a skin element from outside with JavaScript is very practical to use CSS classes to make them addressable.  
53:4653 minutos e 46 segundosThere are other ways but this is way more simple than everything else, so let's call it Wikibox.  
53:5253 minutos e 52 segundosAnd we will come back to this later, now we have a fixed address where the content  
Capítulo 19: 04\. 02\. Sidebar for external content  
53:5953 minutos e 59 segundosis going to. And the next step we want to prepare is we have some dummy content here and this dummy content has a neat trick to do two things in one go.  
54:1254 minutos e 12 segundosOne goal is if the content is arriving from Wikipedia then the content of this  
54:1954 minutos e 19 segundostext box will be replaced and as long as it is not there, I simply display a  
54:2654 minutos e 26 segundosloading spinner and this is pretty easy, let's do this with some code I copy from here to avoid typos and not to bore you with typing.  
54:3954 minutos e 39 segundosSo this is a div inside and inside this is a class loader, the spinner and the loader  
54:4754 minutos e 47 segundosare doing some stuff, let's look how it looks now and we will, so if I'm clicking on the box I'm seeing nothing.  
54:5854 minutos e 58 segundosThe trick is this div and this span are formatted with CSS and in CSS you can add  
55:0555 minutos e 5 segundosanimations to your formatting, that's a really nice trick I'm using here and I'm showing it in the next part of this chapter.  
Capítulo 20: 04\. 03\. Add CSS file  
55:1655 minutos e 16 segundosAs I said this loading spinner is heavily depending on CSS and I have prepared an  
55:2355 minutos e 23 segundosexternal CSS file for using it here in the skin and as CSS is not the main topic of  
55:3055 minutos e 30 segundosthis tutorial I just add this as a ready made CSS for our purpose.  
55:3755 minutos e 37 segundosAnd I am introducing a code element and in version 8 the code elements have a nice  
55:4655 minutos e 46 segundosnew feature, I name it CSS code and if I'm going to the code element you see we have the type JavaScript or CSS, this is new.  
56:0156 minutos e 1 segundoIn version 7 you needed to wrap CSS code in kind of a JavaScript command so it  
56:0756 minutos e 7 segundoswasn't really easy to edit this CSS file externally with a professional editor like VS Code or something like that  
56:1556 minutos e 15 segundosand this is changed to a tab separation between JavaScript and CSS.  
56:2156 minutos e 21 segundosThumbs up for this new feature in version 8, so I check the CSS and now I simply  
56:2856 minutos e 28 segundoscheck the form file and grab it now, here I have it in my library, this lib folder  
56:3656 minutos e 36 segundoshere and here is custom CSS and I open it and you see the CSS code is now in here.  
56:4456 minutos e 44 segundosAnd if I open it you see the CSS file, we will take a closer look later in VS Code  
56:5056 minutos e 50 segundosbecause it's better readable there and I save it and if I now head over to my project and click on a hotspot we should see the loading spinner.  
57:0257 minutos e 2 segundosAnd the trick is pretty neat here, to explain this what I've changed in this CSS  
57:0857 minutos e 8 segundosfile I make a short walkthrough so you can see what this CSS file is doing without  
57:1557 minutos e 15 segundosconstructing it now live in front of you because it is a little bit boring and we  
57:2157 minutos e 21 segundoshave another focus here and I am pushing my VS Code window in here and I shortly make a walkthrough what is in here.  
57:3157 minutos e 31 segundosHere we are using some custom fonts, they are using an assets fonts folder so what  
57:3757 minutos e 37 segundoswe have to do next here before I go on to explain what's happening here I need to  
57:4457 minutos e 44 segundosadd another folder here and I have prepared a font folder where these fonts I  
57:5057 minutos e 50 segundosam referring here are located, they are in the fonts folder, it is on the project root and there are 5 fonts in it  
58:0058 minutosand if I open it here it is added to the assets so it is accessible later in the  
58:0658 minutos e 6 segundosoutput folder as assets slash fonts and now I can save it and head over here and  
58:1358 minutos e 13 segundosgo to the VS Code assets fonts, there the fonts are accessible, they are imported here at first, they always need to be on top of a CSS file to be used later.  
58:2658 minutos e 26 segundosAnd these are made with the Google Web Fonts Helper, I showed it some tutorials  
58:3358 minutos e 33 segundosago but I can just go back here to the Google Web Fonts Helper, I just get one  
58:4158 minutos e 41 segundosfont, you can copy the font code here after inserting here assets, it is a  
58:4958 minutos e 49 segundostypical way for Pano2VR assets fonts and then get this code, just copy it and download the files appropriately, put it  
58:5958 minutos e 59 segundosin the fonts folder of your project, add it to the assets in your output panel and you are done, it is pretty easy.  
59:0859 minutos e 8 segundosAnd now I have everything prepared here and if I am going back to Visual Studio  
59:1559 minutos e 15 segundosCode we have 5 fonts introduced here from the Lato, I have a regular, a 300 is a  
59:2259 minutos e 22 segundosthin and 700 is a bold, NF for the headlines, I have a Sofia and a Sofia Condensed  
59:3059 minutos e 30 segundosand we have some for strong, for some types of styling and here we have the  
59:3859 minutos e 38 segundosoriginal Pano2VR skin CSS, I changed this to the Lato font from above and now I  
59:4759 minutos e 47 segundosadded some other stuff and this is my formatting for the Wikipedia entries, we use it later  
59:5859 minutos e 58 segundosand here is the CSS loading spinner, it is a pretty easy trick, we have a container  
1:00:041 hora e 4 segundos100% width and it is a 48 pixels high, you see it here and I am with top calculation  
1:00:111 hora e 11 segundos50% minus 24, it is exactly in the center vertically and the loader is simply a square with 48 pixels by 48 pixels, it has a thick 5  
1:00:231 hora e 23 segundospixel wide border, the radius is 50% so the square turns to a circle and the  
1:00:301 hora e 30 segundosborder bottom color, so one edge is transparent, the others are grey  
1:00:371 hora e 37 segundosso you have a circle which is rotating and just add the animation, the animation is  
1:00:421 hora e 42 segundosdescribed here with the add keyframes rule and it is just turning around, so it is a simple CSS trick, no image, no  
1:00:491 hora e 49 segundoseverything, it is done with CSS, extremely low performance issues and so on, this is a very smart trick to do such a simple loading spinner without  
1:01:001 hora e 1 minutousing any SVGs or PNGs or animations or something else like that, so if I am now  
1:01:061 hora, 1 minuto e 6 segundosheading over to the browser and I am going here, you see this working and you see now the new fonts are effective  
1:01:161 hora, 1 minuto e 16 segundosand here if I am going to the hotspots here and even here we have a new font at  
1:01:211 hora, 1 minuto e 21 segundosthe map labels and so the font is working and usually in skins if I am going to the general properties, I kick everything  
1:01:301 hora, 1 minuto e 30 segundosout of here, writing a comment and I have done it here otherwise this box is empty because I like to edit this stuff mainly in a code  
1:01:391 hora, 1 minuto e 39 segundoseditor, not within the text boxes of Pano2VR, it is much more convenient and you have syntax coloring and error checking and so on  
1:01:491 hora, 1 minuto e 49 segundosand I prefer it very much to do it this way, so I did not build up this CSS font,  
1:01:541 hora, 1 minuto e 54 segundosI only took a short walkthrough so that you know what is happening here and basically some formatting and added a little neat trick for this loading spinner  
1:02:051 hora, 2 minutos e 5 segundosand modified the general skin properties here, the general skin rules with my own  
1:02:121 hora, 2 minutos e 12 segundosfont and that is all, nothing very special after I have added an external  
Capítulo 21: 04\. 04\. Add jQuery and JS file  
1:02:201 hora, 2 minutos e 20 segundosCSS file, I am doing pretty much the same with JavaScript  
1:02:261 hora, 2 minutos e 26 segundosjust add a file here and name it JS code and I am first adding some external file,  
1:02:411 hora, 2 minutos e 41 segundosfirst make it exported when I am rendering the project, jQuery 4.0.0  
1:02:551 hora, 2 minutos e 55 segundosopen, so I integrate it into the output, that is a function of local files and now  
1:03:011 hora, 3 minutos e 1 segundoI make it available for scripting, so it is loaded into the browser, this is just  
1:03:071 hora, 3 minutos e 7 segundosthe export into the output folder but I need to make it available for my document  
1:03:131 hora, 3 minutos e 13 segundosand here you can just copy the file name and add it here, so and let us save it and  
1:03:241 hora, 3 minutos e 24 segundoscheck it whether it is working and we now go to the output here  
1:03:331 hora, 3 minutos e 33 segundosand we can visit the web inspector hitting the F12 key and go to network and make a  
1:03:411 hora, 3 minutos e 41 segundosreload and now we need to check whether we have this jQuery file loaded, here it is  
1:03:501 hora, 3 minutos e 50 segundosso everything is fine, it is lying on the root folder, you see it here and so it is  
1:03:561 hora, 3 minutos e 56 segundosavailable and loaded, it is not only exported to the output but it is already loaded and can be used by JavaScript  
1:04:051 hora, 4 minutos e 5 segundosand in JavaScript itself I am doing the same as I have done with the CSS file  
1:04:121 hora, 4 minutos e 12 segundosbefore, I am taking on from file and opening and I am adding just a small  
1:04:181 hora, 4 minutos e 18 segundosJavaScript file I have prepared with a basic function just to check whether it is working  
1:04:271 hora, 4 minutos e 27 segundosso let us save it here and head over to the browser and we will see what is happening  
1:04:361 hora, 4 minutos e 36 segundosand if I see the console here, we see it is loaded, it is the same, you will not  
1:04:451 hora, 4 minutos e 45 segundosfind a custom JS file here as the JavaScript is embedded into the skin.js  
1:04:531 hora, 4 minutos e 53 segundosand it is part of this file here so I have doc loaded, jQuery is working, that is exactly what is happening here in  
1:05:031 hora, 5 minutos e 3 segundosmy file, let us head over to the Visual Studio Code and I am going to the custom JS and exactly what is happening here  
1:05:121 hora, 5 minutos e 12 segundoswe see the jQuery function which is fired when the document is readily loaded and it just fires the console message which is just a simple function to check whether  
1:05:211 hora, 5 minutos e 21 segundoseverything is working, so custom JS is working, jQuery is working, custom CSS is working as well  
1:05:271 hora, 5 minutos e 27 segundosand if I am in the skin editor and under view I leave this live update on save only  
1:05:341 hora, 5 minutos e 34 segundosunchecked, that is very important, then every change I am doing on this JavaScript  
1:05:411 hora, 5 minutos e 41 segundosfile and on this CSS file will automatically reload the browser  
1:05:471 hora, 5 minutos e 47 segundosand that is pretty nice so you can really fluently working on the CSS and on the  
1:05:521 hora, 5 minutos e 52 segundosJavaScript in your code editor while Pano2VR in the background updates the whole project and throws it to the browser  
1:06:011 hora, 6 minutos e 1 segundoso if you are working on the code, you do not need to switch to Pano2VR or the skin editor, the skin editor needs to  
1:06:091 hora, 6 minutos e 9 segundosbe open and it needs to be in front, then it is working and this is a pretty neat improvement in Pano2VR version 8 that we have it  
1:06:191 hora, 6 minutos e 19 segundosseparated with JavaScript and with CSS and both are reacting on hot reload requests  
1:06:271 hora, 6 minutos e 27 segundosif the external files are updated now let us start the last chapter of this tutorial where we really start coding in  
Capítulo 22: 05\. 01\. Setup JS helper function  
1:06:361 hora, 6 minutos e 36 segundosJavaScript to make our functions working, let us start with some simple utility and  
1:06:431 hora, 6 minutos e 43 segundoslater we are setting up the connection between the skin and the external JavaScript file  
1:06:511 hora, 6 minutos e 51 segundosso when I have a look at Visual Studio Code where I am doing all my coding, you  
1:06:571 hora, 6 minutos e 57 segundoscan use any other coding utility or any other app what is capable of editing text  
1:07:041 hora, 7 minutos e 4 segundosfiles, whatever you may like Visual Studio Code is very elaborated and I recommend it usually as it has code  
1:07:121 hora, 7 minutos e 12 segundoscompletion, syntax coloring and all these convenient stuff you like when you are doing code work  
1:07:201 hora, 7 minutos e 20 segundosso currently we have in our custom.js the only test function throwing a message into  
1:07:271 hora, 7 minutos e 27 segundosthe browser console after the document is loaded and it is showing us docloaded jQuery is working  
1:07:371 hora, 7 minutos e 37 segundosso we are currently here when we see this output  
1:07:431 hora, 7 minutos e 43 segundoswe just keep it here and now we are starting to create a little utility I like  
1:07:491 hora, 7 minutos e 49 segundosvery much, it saves some typing and you can disable it at one single line if you  
1:07:561 hora, 7 minutos e 56 segundosdon't like all these console outputs so I am entering a few lines and I am starting to write here with my little  
1:08:081 hora, 8 minutos e 8 segundosfunction and I call it very short c and I add an argument msg for message  
1:08:181 hora, 8 minutos e 18 segundosand then I am just entering what this function should do and I am replacing this  
1:08:251 hora, 8 minutos e 25 segundosconsole log, I copy it, paste it here and what is thrown into the console is my argument msg  
1:08:351 hora, 8 minutos e 35 segundoswhy I am doing it, because I replace from now on every console log command by a  
1:08:401 hora, 8 minutos e 40 segundossimple c, it saves some writing and if I don't want to have something outputted I simply can put this line under  
1:08:491 hora, 8 minutos e 49 segundoscommands and no console log will be thrown out anymore  
1:08:531 hora, 8 minutos e 53 segundosso let's save it and as we have the auto refresh active because our skin editor is  
1:09:021 hora, 9 minutos e 2 segundosopen it controls and watches this code element and it controls and watches this part  
1:09:121 hora, 9 minutos e 12 segundosbut if anything is changing here it sends a reload request to the live refresh in  
1:09:211 hora, 9 minutos e 21 segundosPano2VR so we can keep open the browser and our visual studio code editor  
1:09:301 hora, 9 minutos e 30 segundosand we can leave Pano2VR in the background to manage all the stuff here as soon as I  
1:09:381 hora, 9 minutos e 38 segundosam changing something here everything will be updated immediately in the browser via  
1:09:461 hora, 9 minutos e 46 segundosPano2VR, it is a very convenient feature the communication between Pano2VR skin and the external JavaScript has two  
Capítulo 23: 05\. 02\. Setup main function in JS  
1:09:581 hora, 9 minutos e 58 segundosdirections, the first direction is the hotspot sends a call to custom.js and  
1:10:061 hora, 10 minutos e 6 segundoscustom.js pushes content into the wiki box these two directions need to be handled separately, we are starting of course with  
1:10:171 hora, 10 minutos e 17 segundosthe first one to make something happen is what is happening exactly when we click on this hotspot here  
1:10:251 hora, 10 minutos e 25 segundosit opens the wiki box and this is working inside of the skin so we don't need to  
1:10:321 hora, 10 minutos e 32 segundoscare about it anymore and the second one is how to get the content connected to  
1:10:391 hora, 10 minutos e 39 segundosthis hotspot into custom.js and for this we need a function which is then called by a hotspot click here, it  
1:10:481 hora, 10 minutos e 48 segundosmakes sense to construct first this function and afterwards call it from the skin  
1:10:551 hora, 10 minutos e 55 segundosso let's start with this function and we name it OpenWiki and then we have brackets  
1:11:061 hora, 11 minutos e 6 segundosand we have some curly brackets  
1:11:101 hora, 11 minutos e 10 segundosfor the function body where everything stands in what we want to do  
1:11:191 hora, 11 minutos e 19 segundosand we have already seen in our inspection of the skin that we have four variables  
1:11:301 hora, 11 minutos e 30 segundosthe title, the wikipedia conformed title of the first figure and of the statue the  
1:11:371 hora, 11 minutos e 37 segundosshort wikipedia title of the eventual second figure of the statue, then the  
1:11:441 hora, 11 minutos e 44 segundosstatue image filename and the title the whole statue has in our project which is  
1:11:521 hora, 11 minutos e 52 segundosderived from the user data title so these four variables need to be transferred to custom.js and when I'm  
1:12:021 hora, 12 minutos e 2 segundosgoing to my custom.js file I need four parameters, arguments to get this up and running  
1:12:121 hora, 12 minutos e 12 segundosI'm starting with n1, this is the first name, n2 is the second name and then we  
1:12:211 hora, 12 minutos e 21 segundosname the image and after this we name nTitle, that's the way I have it set up  
1:12:301 hora, 12 minutos e 30 segundosto check this whether it's working let's enter a console function and here we are  
1:12:421 hora, 12 minutos e 42 segundosgetting all the files and I say it is n1  
1:12:481 hora, 12 minutos e 48 segundosthen we have a plus sign for concatenating a string, then I'm entering some string,  
1:12:571 hora, 12 minutos e 57 segundossome separator so and then comes n2 and we have on next concatenation space slash space  
1:13:071 hora, 13 minutos e 7 segundosand we have the image and so on and we have the last one is nTitle  
1:13:251 hora, 13 minutos e 25 segundosso now we should have these four parameters we are sending with calling the  
1:13:321 hora, 13 minutos e 32 segundosfunction open wiki should be thrown into the console, I save it here  
1:13:401 hora, 13 minutos e 40 segundoswe don't need to look at the browser because it's a function and the function  
1:13:471 hora, 13 minutos e 47 segundosis not called anywhere so we won't get any result and now we need to set up this  
1:13:541 hora, 13 minutos e 54 segundosfunction to be called from within the skin to call this function from within the skin we now head over to the skin editor and  
Capítulo 24: 05\. 03\. Create action to call JS function  
1:14:061 hora, 14 minutos e 6 segundostry to call this function open wiki from the skin and also submitting these four  
1:14:121 hora, 14 minutos e 12 segundosarguments or parameters as you see here from the skin to this function  
1:14:191 hora, 14 minutos e 19 segundosso let's go to the skin editor and we need this on the click on the node hotspot here  
1:14:271 hora, 14 minutos e 27 segundosand we add a new function here to save typing and so on I have prepared this as a copy  
1:14:361 hora, 14 minutos e 36 segundosand I throw it in via paste and now I can open it and see with you together what is  
1:14:441 hora, 14 minutos e 44 segundosgoing on here I'm doing a double click and you see we have an URL posted is a URL  
1:14:531 hora, 14 minutos e 53 segundosclick and you usually use URL clicks to invoke JavaScript functions  
1:15:001 hora e 15 minutosif I'm opening it here you have JS and a colon as of version 8 you can use  
1:15:071 hora, 15 minutos e 7 segundosJavaScript colon and JS colon as well so JS is a shorthand now it's where I  
1:15:151 hora, 15 minutos e 15 segundosappreciate that very much not always need to write the whole word JavaScript  
1:15:231 hora, 15 minutos e 23 segundosand you now call the function open wiki and inside of this function I now transfer  
1:15:301 hora, 15 minutos e 30 segundosthe variables one after another for this we have pano it is a pano player as an  
1:15:371 hora, 15 minutos e 37 segundosobject dot get variable value it is a method a function inside of the panorama  
1:15:431 hora, 15 minutos e 43 segundosthe player object of the pano object and in the brackets behind there's a string calling this variable name we  
1:15:531 hora, 15 minutos e 53 segundosrepeat it three times so we have four variables transferred as parameters of a JavaScript function  
1:16:031 hora, 16 minutos e 3 segundosand they are derived from the four skin variables where I have filled in the  
1:16:101 hora, 16 minutos e 10 segundoscustom properties the user data title and making it available to this JavaScript function  
1:16:191 hora, 16 minutos e 19 segundosI hit ok here and you see there's a logic block engaged here for this function so it  
1:16:261 hora, 16 minutos e 26 segundosis not fired everywhere it is fired only when the node hotspot is a statue  
1:16:341 hora, 16 minutos e 34 segundosit is not fired when we are walking from one node one real panorama node in the  
1:16:411 hora, 16 minutos e 41 segundosproject to another so walking in the palace park it is only invoked when we are  
1:16:481 hora, 16 minutos e 48 segundoshitting statue hotspot that's all and if I save it nothing is happening here in the browser I just  
1:16:571 hora, 16 minutos e 57 segundosswitch to the browser this JavaScript call in the skin should be invoked ok it is  
Capítulo 25: 05\. 04\. JS: Dealing with scopes  
1:17:051 hora, 17 minutos e 5 segundosinvoked but we get an error Pano2VR has in version 8 an integrated error console runtime error overlay it's a  
1:17:141 hora, 17 minutos e 14 segundosvery nice function it is more or less the same what we see here and you can pretty much read it  
1:17:231 hora, 17 minutos e 23 segundosat the parameters you see here EY, EY, EB and so on these are internal methods or  
1:17:281 hora, 17 minutos e 28 segundosvariables inside of the panorama player you cannot read very much from it but the  
1:17:331 hora, 17 minutos e 33 segundosfirst line is the most important open wiki is not defined but I have defined it I know it it's written here  
1:17:411 hora, 17 minutos e 41 segundosso what's happening here if I'm going back to the skin I have this JS code element  
1:17:481 hora, 17 minutos e 48 segundosand the code which is inserted here it doesn't matter whether the code is written  
1:17:551 hora, 17 minutos e 55 segundosin here directly or whether it's taken from an external file it's the same  
1:18:021 hora, 18 minutos e 2 segundosand this code I'm entering here which is in this code window it will be integrated  
1:18:091 hora, 18 minutos e 9 segundosin the output file skin.js this JS file builds the skin when the panorama is  
1:18:171 hora, 18 minutos e 17 segundosloaded by the user in the browser by the visitor  
1:18:221 hora, 18 minutos e 22 segundosand this JavaScript I'm entered here is simply added to it so there is a long code  
1:18:291 hora, 18 minutos e 29 segundoschunk of skin.js and this is only a little part but it is part of skin.js  
1:18:371 hora, 18 minutos e 37 segundosand skin.js is let's say it is a restricted area and this JavaScript I'm  
1:18:431 hora, 18 minutos e 43 segundoscalling inside of this script is valid inside of skin.js but not outside and that  
1:18:501 hora, 18 minutos e 50 segundosis the most important thing here so I have called a function inside of skin.js which isn't valid outside but I  
1:19:001 hora e 19 minutosneed it outside and so we need to rewrite our custom.js file a little bit and change  
1:19:081 hora, 19 minutos e 8 segundosthis function open wiki to another definition  
1:19:131 hora, 19 minutos e 13 segundosand we now have the window object this is a topmost object we are operating in this  
1:19:211 hora, 19 minutos e 21 segundosis a browser window in which the whole project runs and now I name this function  
1:19:301 hora, 19 minutos e 30 segundosas an object as a child object of the window  
1:19:351 hora, 19 minutos e 35 segundosit's a different definition now and then I write equals function and the rest stays  
1:19:431 hora, 19 minutos e 43 segundosas it is and now I'm attaching this open wiki function not anymore to skin.js but  
1:19:521 hora, 19 minutos e 52 segundosone level up to the whole window and this function now is available everywhere and not only inside of skin.js  
1:20:021 hora, 20 minutos e 2 segundosbut inside of the skin object this is especially important if we are addressing the panel object  
1:20:101 hora, 20 minutos e 10 segundosand it is necessary that if you want to access a panel object you need to do it  
1:20:161 hora, 20 minutos e 16 segundosfrom the window scope from outside and the window is the topmost level and from there  
1:20:231 hora, 20 minutos e 23 segundoson you can step into other objects running in this document and the two we are dealing with are the panel object panel and the skin object and  
1:20:331 hora, 20 minutos e 33 segundosif we are elevating the scope is the correct word for this if you are elevating the scope one level up to the window  
1:20:421 hora, 20 minutos e 42 segundoswe can access both the panorama and the skin object from now on this is very  
1:20:501 hora, 20 minutos e 50 segundosimportant and now let's check if this fixes the issue here we are we have the  
1:20:581 hora, 20 minutos e 58 segundosfirst statue we have the second statue with the short wikipedia titles  
1:21:061 hora, 21 minutos e 6 segundoswe have the image filename and we have the title we want to have on top of our wiki  
1:21:121 hora, 21 minutos e 12 segundosbox so this is working now and this is a very important topic here if you are  
1:21:191 hora, 21 minutos e 19 segundosdealing with JavaScript you need to keep in mind the so called scope  
1:21:251 hora, 21 minutos e 25 segundoswhere is a variable or function valid and where is not and so here we attached the  
1:21:301 hora, 21 minutos e 30 segundosfunction which needs to communicate with the panel object from outside the skin object up to the window object  
1:21:381 hora, 21 minutos e 38 segundosso it can reach out to the panel object from there and not from within the skin  
1:21:441 hora, 21 minutos e 44 segundosobject what failed as we have seen as we later need to make a call to the wikipedia's REST API endpoint we now need  
Capítulo 26: 05\. 05\. Build request array  
1:21:571 hora, 21 minutos e 57 segundosto prepare assembling the call to this point and we need to fetch some parts of  
1:22:061 hora, 22 minutos e 6 segundosthis parameters we have gotten from the skin  
1:22:111 hora, 22 minutos e 11 segundosinto an array why do we need an array here just for practical reasons we have some  
1:22:171 hora, 22 minutos e 17 segundosstatues here which have one figure and others have two figures so we need to decide what to do there  
1:22:261 hora, 22 minutos e 26 segundosand the most elegant way and most practical way is to use an array this  
1:22:311 hora, 22 minutos e 31 segundosarray has one item if we have only one figure and it has two items if we have two  
1:22:371 hora, 22 minutos e 37 segundosfigures and then we can cycle through this array to assemble the call to the REST API  
1:22:441 hora, 22 minutos e 44 segundostheoretically we can even use five figures in one statue but you only need one or two  
1:22:501 hora, 22 minutos e 50 segundosbut we need more than one so we need a little bit of workaround to assemble this  
1:22:571 hora, 22 minutos e 57 segundosI'm making some new reliance here and I'm trying to build this array I will call it  
1:23:061 hora, 23 minutos e 6 segundoslet's call it let request and request will be an array so it is inside of square brackets  
1:23:171 hora, 23 minutos e 17 segundosand the part which is always present is the parameter n1 it is the title of the  
1:23:231 hora, 23 minutos e 23 segundosfirst statue and it isn't more if we have only this one and now it is pretty easy as  
1:23:301 hora, 23 minutos e 30 segundoswe have already an array let's request can be more and now we have a simple if condition if we have something  
1:23:441 hora, 23 minutos e 44 segundosthen something happens and if n2 so the second name if it is not equal an empty string  
1:23:561 hora, 23 minutos e 56 segundosthen we have something transmitted in n2 and in this case we do the following we  
1:24:031 hora, 24 minutos e 3 segundosput the array we already have it is requests and then it has a method it  
1:24:101 hora, 24 minutos e 10 segundoscalled push and push does nothing else than adding an item to an array  
1:24:171 hora, 24 minutos e 17 segundosand we push n2 into this array and so the array will remain containing one item if  
1:24:241 hora, 24 minutos e 24 segundosyou only have one but if a second one occurs then we push it at the end and we  
1:24:321 hora, 24 minutos e 32 segundoshave an array with two items to check what's happening let's now output this and let's say it is requests and so  
1:24:451 hora, 24 minutos e 45 segundoswe can check whether it is working what we want to have  
1:24:521 hora, 24 minutos e 52 segundosso you see the browser has flashed and updated and let's make a single call so we  
1:24:591 hora, 24 minutos e 59 segundoshave an array with only one position don't be worried by two names because they belong together  
1:25:091 hora, 25 minutos e 9 segundosone figure and here we can see it more prominent we have only an array with one  
1:25:151 hora, 25 minutos e 15 segundosname one wikipedia title and it is position 0 and now let's click on Mars and Minerva  
1:25:231 hora, 25 minutos e 23 segundosthen you see we have two separated by a comma and in this array we have position 0  
1:25:291 hora, 25 minutos e 29 segundoswith Mars and position 1 with Minerva this is exactly what I want  
1:25:341 hora, 25 minutos e 34 segundosso now I have prepared an important part for constructing the calls we sent to the  
1:25:421 hora, 25 minutos e 42 segundosWikipedia REST API endpoint before we can send a call to the Wikipedia REST API we need to construct the correct  
Capítulo 27: 05\. 06\. Add prerequisites  
1:25:521 hora, 25 minutos e 52 segundosURLs for these calls to get the right content back from them  
1:25:571 hora, 25 minutos e 57 segundosand for this we need some prerequisites in between I added some short comments here  
1:26:041 hora, 26 minutos e 4 segundosto make clear what's happening in the little code blocks here just for remembering it  
1:26:121 hora, 26 minutos e 12 segundoscommenting is always good even for self-documenting and here in this tutorial  
1:26:181 hora, 26 minutos e 18 segundosit's also important to mark up these little blocks to make clear what they are doing in detail  
1:26:271 hora, 26 minutos e 27 segundosso some prerequisites the first one we need is to have an image path so let EMG  
1:26:381 hora, 26 minutos e 38 segundospath and this is pretty easy as we simply need to look in the htdocs folder  
1:26:491 hora, 26 minutos e 49 segundosif I unfold it I have the assets folder which is defined by the settings in output  
1:26:571 hora, 26 minutos e 57 segundosassets let's go back here and under advanced I have the statues and the fonts folder and in the statues folder  
1:27:061 hora, 27 minutos e 6 segundoswe have the black and white images we are using for the statues in the wiki box  
1:27:121 hora, 27 minutos e 12 segundosthese are content coming from us and here we simply add this path statues slash and  
1:27:221 hora, 27 minutos e 22 segundosthis we need to assemble the complete image path to get this image displayed in the wiki box  
1:27:331 hora, 27 minutos e 33 segundosstatues images path and after this we need to get the base URL of the wiki REST API  
1:27:561 hora, 27 minutos e 56 segundoslet wiki REST API equals it is a string and it is a URL  
1:28:091 hora, 28 minutos e 9 segundosso now let's find out and wind back a little bit to what I've told in the  
1:28:151 hora, 28 minutos e 15 segundoschapter about the basic technical requirements we have here  
1:28:211 hora, 28 minutos e 21 segundosgo to the browser and open a new tab and under REST I have my wiki sandbox and that  
1:28:311 hora, 28 minutos e 31 segundosshould lead me here to the wiki media REST APIs  
1:28:381 hora, 28 minutos e 38 segundossubmit and here we want to have this part where we get the summary of a text I think  
1:28:521 hora, 28 minutos e 52 segundosit is somewhere else maybe it's one point below  
1:29:001 hora e 29 minutosso here we are this is this part here and we need to get the base path from above it  
1:29:101 hora, 29 minutos e 10 segundosis en wikipedia.org slash API slash REST version 1 slash page slash summary and  
1:29:201 hora, 29 minutos e 20 segundosthen it comes the title and I have set it up here for copying  
1:29:271 hora, 29 minutos e 27 segundosand I just head over to my cheat sheet and enter it here  
1:29:351 hora, 29 minutos e 35 segundosand we have https en wikipedia.org API REST version 1 page summary and this is  
1:29:461 hora, 29 minutos e 46 segundosneeded to put the call to the REST  
1:29:511 hora, 29 minutos e 51 segundosAPI together with just adding n1 or n2 at the end  
1:29:581 hora, 29 minutos e 58 segundosso now we have these prerequisites ready here which we need to assemble all  
1:30:041 hora, 30 minutos e 4 segundosnecessary paths we need either for the content coming back from wikipedia or to  
1:30:121 hora, 30 minutos e 12 segundosshow up the images we have already in our folder here  
Capítulo 28: 05\. 07\. Build request loop  
1:30:171 hora, 30 minutos e 17 segundosnow we have everything prepared to start building request loop it is a loop which  
1:30:251 hora, 30 minutos e 25 segundosworks one time if I only have n1 and it works two times when I have n2 also filled  
1:30:351 hora, 30 minutos e 35 segundosso let's make a little bit space here and we are using a jQuery function for it so I  
1:30:441 hora, 30 minutos e 44 segundoscall it request loop and this loop is set up in jQuery because it is easier to write the dollar sign is a  
1:30:551 hora, 30 minutos e 55 segundosjQuery object and each is a loop function which cycles through an object as many  
1:31:031 hora, 31 minutos e 3 segundostimes as many items it finds inside of this object or array  
1:31:101 hora, 31 minutos e 10 segundosand now I have a bracket and inside this bracket there are some parameters expected  
1:31:171 hora, 31 minutos e 17 segundosfirst we have the object to cycle through or the array and it is requests  
1:31:241 hora, 31 minutos e 24 segundosso that is the first one and after this I define a function which makes stuff  
1:31:321 hora, 31 minutos e 32 segundosavailable inside of this loop and this function let's use this and this function  
1:31:401 hora, 31 minutos e 40 segundosdoesn't need to have a name here it is an unnamed function but we need parameters  
1:31:491 hora, 31 minutos e 49 segundosand I am doing it in a simple way for introducing two parameters and call them  
1:31:571 hora, 31 minutos e 57 segundoskey and value every item in an array has a key and a value and so it is 0 is a key  
1:32:061 hora, 32 minutos e 6 segundosand n1 is a value 1 is a key and n2 is a value we will see it soon  
1:32:141 hora, 32 minutos e 14 segundosand now we have a little function just to check what is happening here and I just  
1:32:211 hora, 32 minutos e 21 segundoscopy it because it is a longer string here for our console output function and this  
1:32:281 hora, 32 minutos e 28 segundosis what I want to see the only thing I want to control is, is this loop running one times when I am  
1:32:371 hora, 32 minutos e 37 segundoscalling a statue with one figure and is it correctly calling two times when I am  
1:32:441 hora, 32 minutos e 44 segundoscalling a double figure so now let's save it and head over to the browser I don't need this Wikipedia stuff  
1:32:531 hora, 32 minutos e 53 segundosanymore and now if I am going to a single figure we see key is 0 value is the title  
1:33:001 hora e 33 minutosof the figure the same should happen here it is key 0 and if I am clicking on math and Minerva we have key 0 math and key 1  
1:33:111 hora, 33 minutos e 11 segundosMinerva so here in this last case the loop is iterated two times here is only iterated one time  
1:33:211 hora, 33 minutos e 21 segundosthat is exactly what I want to have and now I can inside of this part I can start  
1:33:301 hora, 33 minutos e 30 segundosassembling the call itself inside of this request loop now let's try to build up the complete URLs to prepare  
Capítulo 29: 05\. 08\. Build request URLs  
1:33:431 hora, 33 minutos e 43 segundosthe call to the Wikipedia REST API so I am adding a new line here  
1:33:511 hora, 33 minutos e 51 segundosbuild URL and let URL equals and now it is pretty simple first we need the start path  
1:34:031 hora, 34 minutos e 3 segundoshere it is Wikipedia REST API as a first part  
1:34:101 hora, 34 minutos e 10 segundosand then we need the plus sign as a string concatenation and what we need now is  
1:34:181 hora, 34 minutos e 18 segundoseither n1 or n2 which are here now living in the value variable  
1:34:251 hora, 34 minutos e 25 segundosso copy value and this should be the correct URL to call the respective  
1:34:331 hora, 34 minutos e 33 segundosendpoint in the Wikipedia REST API so as it is important we now need to output it  
1:34:431 hora, 34 minutos e 43 segundosand we want to have this URL shown in the console so it is updated and now let's  
1:34:541 hora, 34 minutos e 54 segundosclick on this guy here and we see now we have an address  
1:35:021 hora, 35 minutos e 2 segundosand let's click here address in new window and here we have now this JSON data we  
1:35:131 hora, 35 minutos e 13 segundoshave here and we have this data I presented earlier  
1:35:211 hora, 35 minutos e 21 segundoswhen I discussed the REST API and here we have everything we need in JSON format so  
1:35:291 hora, 35 minutos e 29 segundosthis is working and now let's go to the other figure  
1:35:351 hora, 35 minutos e 35 segundosjust close it here and now let's go to the Mars and Minerva display here and now we  
1:35:471 hora, 35 minutos e 47 segundosshould get two URLs and Minerva open a new tab  
1:35:541 hora, 35 minutos e 54 segundosand here we have the Minerva article  
1:35:581 hora, 35 minutos e 58 segundosand let's check the other of Mars and open a new tab  
1:36:061 hora, 36 minutos e 6 segundosand here we get an error but it is not easy to find but it is a simple error  
1:36:131 hora, 36 minutos e 13 segundosbecause the last bracket of the console is omitted by the Firefox browser  
1:36:201 hora, 36 minutos e 20 segundosif I add it manually here we have what we want so now the test result is that the  
1:36:301 hora, 36 minutos e 30 segundosURLs retrieving this content is working  
Capítulo 30: 05\. 09\. Build an AJAX loader  
1:36:351 hora, 36 minutos e 35 segundosas we now have the most important prerequisite to send out a call to the Wikipedia REST API we now try to  
1:36:441 hora, 36 minutos e 44 segundosset up this call and to see what this call is delivering we just checked it in the browser it was a manual test for the correctness of the  
1:36:551 hora, 36 minutos e 55 segundosURLs but now we are technically connecting our JavaScript here in custom.js with the Wikipedia REST API  
1:37:031 hora, 37 minutos e 3 segundosso let's get some new lines here and a command and build Ajax request so what is  
1:37:131 hora, 37 minutos e 13 segundosAjax? Ajax is a short word for asynchronous JavaScript and XML  
1:37:221 hora, 37 minutos e 22 segundosit is a general term for sending a request which is not triggered manually by the user but by an internal function  
1:37:301 hora, 37 minutos e 30 segundosof JavaScript so not you with a browser interaction  
1:37:351 hora, 37 minutos e 35 segundosis calling for a data retrieval but a function or a program is calling for this  
1:37:431 hora, 37 minutos e 43 segundosand this Ajax is a general term for sending out asynchronous requests  
1:37:511 hora, 37 minutos e 51 segundoswhich are independent of any user interaction and are triggered by program parts or coding parts as I am doing it here now  
1:38:001 hora e 38 minutosfor this we have a special function as the call to REST APIs is pretty popular and  
1:38:071 hora, 38 minutos e 7 segundoswidespread jQuery brings a ready-made function for this it saves us a lot of writing and configuring and this function has  
1:38:171 hora, 38 minutos e 17 segundoseverything built in we need for communication with such a REST API endpoint as we have it here in Wikipedia  
1:38:261 hora, 38 minutos e 26 segundosso this function simply is named getJSON and it in the most simple case as we do it  
1:38:371 hora, 38 minutos e 37 segundoshere it just needs a URL and just the URL I have placed here  
1:38:461 hora, 38 minutos e 46 segundosand this function has two parts which are important for us if this function is  
1:38:541 hora, 38 minutos e 54 segundossuccessful then there is a method named done  
1:38:591 hora, 38 minutos e 59 segundoswhich is called when the function is ready and has successfully done its job and this  
1:39:081 hora, 39 minutos e 8 segundosdone contains a function which is called when this is running  
1:39:161 hora, 39 minutos e 16 segundosand as every function it needs some curly brackets for the block what's done there  
1:39:231 hora, 39 minutos e 23 segundosand the function has an argument which usually in such a case  
1:39:291 hora, 39 minutos e 29 segundosin relation to this function is called data and this data is what we can see  
1:39:361 hora, 39 minutos e 36 segundosimmediately after this function is ready and after the call was successful  
1:39:431 hora, 39 minutos e 43 segundosso let's show what our console log shows us when we call data from it  
1:39:501 hora, 39 minutos e 50 segundosand I'm just going ahead usually you enter a new line for it and then we can enter  
1:40:001 hora e 40 minutosanother line which always starts with a dot and which is fail and function  
1:40:101 hora, 40 minutos e 10 segundosand so we can leave this function without an argument but we have also here a  
1:40:191 hora, 40 minutos e 19 segundosfunction block and here we enter an error message  
1:40:251 hora, 40 minutos e 25 segundoserror loading json if something went wrong we can provoke it by adding an error to  
1:40:351 hora, 40 minutos e 35 segundosthis URL for example then we have this part here  
1:40:421 hora, 40 minutos e 42 segundosand can now look what's happening here if we call all this from this function so I  
1:40:491 hora, 40 minutos e 49 segundosthink you should add a semicolon here and save it and it should be  
1:40:551 hora, 40 minutos e 55 segundosshould have an intent here and now let's see what's happening  
Capítulo 31: 05\. 10\. Inspect data returned from endpoint  
1:41:021 hora, 41 minutos e 2 segundosso drum roll and we click this one and voila we getting some code here I'm  
1:41:101 hora, 41 minutos e 10 segundosswitching to the full console to unfold it and you see a lot of blue words which are the keys in json and the pink ones are the  
1:41:211 hora, 41 minutos e 21 segundosgreens, the greens are integers and the pink ones are strings  
1:41:261 hora, 41 minutos e 26 segundosand we get this stuff we want to have so we have something like extract at html  
1:41:331 hora, 41 minutos e 33 segundosthat's pretty much what we need to use here and so on so this is a usable object with some metadata page ID or some internal  
1:41:431 hora, 41 minutos e 43 segundosstuff from Wikipedia you can have a lot of other stuff and we have the URLs, desktop, edit page and so on so we have usable data  
1:41:541 hora, 41 minutos e 54 segundosin our data object is an object as we see here and now we can handle the output this object is providing to us  
Capítulo 32: 05\. 11\. Assemble HTML from article data  
1:42:051 hora, 42 minutos e 5 segundosas we now have all data we need from Wikipedia we start building up the content of our wiki box which is in fact  
1:42:141 hora, 42 minutos e 14 segundosa html chunk and we can easily assemble this step by step  
1:42:191 hora, 42 minutos e 19 segundosand so I am adding comment here successful loaded and now assemble content  
1:42:351 hora, 42 minutos e 35 segundosso what we need first is a variable where we can sum up all these strings we getting  
1:42:431 hora, 42 minutos e 43 segundosout of this Wikipedia data and this should be an empty string  
1:42:491 hora, 42 minutos e 49 segundosbeforehand and so I am adding a comment above the loop it needs to be set up  
1:43:021 hora, 43 minutos e 2 segundosbefore content assembly variable  
1:43:081 hora, 43 minutos e 8 segundosand let's name it vbody and this is empty but defined so save it and now we try to  
1:43:201 hora, 43 minutos e 20 segundosbuild up step by step what we need and so we have vbody and this vbody  
1:43:301 hora, 43 minutos e 30 segundoswill be assembled on top of this initializing variable here  
1:43:411 hora, 43 minutos e 41 segundosand so we add a plus sign so everything what's right side of this plus equal sign  
1:43:491 hora, 43 minutos e 49 segundosis now added at the end of this variable so let's start  
1:43:561 hora, 43 minutos e 56 segundoswith an h3 variables and what I am doing now is I am working with backticks to  
1:44:031 hora, 44 minutos e 3 segundossimplify the concatenations of the variables we are extracting from this data object here  
1:44:121 hora, 44 minutos e 12 segundosand the strings we are adding the html tags and other strings we are adding  
1:44:181 hora, 44 minutos e 18 segundosmanually here so I am using backticks instead of quotes the concatenation is easier  
1:44:261 hora, 44 minutos e 26 segundosand you can set up it over multiple lines so it is easier to read and understand so  
1:44:341 hora, 44 minutos e 34 segundoslet's start with an h3 for the headline  
1:44:381 hora, 44 minutos e 38 segundosand the headline closing tag is slash h3 and inside we now need to get something  
Capítulo 33: 05\. 12\. Adding childs of data object  
1:44:491 hora, 44 minutos e 49 segundosfrom our data object and this is simply made by a dollar sign  
1:44:581 hora, 44 minutos e 58 segundosand please keep in mind it is different from this dollar sign this is a variable placeholder if you are working  
1:45:061 hora, 45 minutos e 6 segundoswith backticks and this is a representation of the jQuery object  
1:45:121 hora, 45 minutos e 12 segundosso don't mix these two up and this variable always expects curly brackets  
1:45:191 hora, 45 minutos e 19 segundosafter it and here you can directly address variables or objects or childs of the object  
1:45:281 hora, 45 minutos e 28 segundosso let's start with data and the most important or the simplest child of this  
1:45:371 hora, 45 minutos e 37 segundosdata object is title you imagine it so we have here a title in the first line  
1:45:471 hora, 45 minutos e 47 segundosand this is why it is used with backticks you see you write html code as a string  
1:45:541 hora, 45 minutos e 54 segundosbut the variables are recognized by visual studio code  
1:45:591 hora, 45 minutos e 59 segundosand the title is a child of this child object of the data object so we have the  
1:46:081 hora, 46 minutos e 8 segundostitles and what we can do now is after the definition we can monitor what we are  
1:46:171 hora, 46 minutos e 17 segundosdoing here with wbody we check what is happening here this is the simplest case now and we should try it  
1:46:271 hora, 46 minutos e 27 segundoshere at this stage to check whether it's working and we now should get the wikipedia article titles  
1:46:361 hora, 46 minutos e 36 segundoswhen we click on a statue so what's happening here and we get H3 Gaius Motius  
1:46:461 hora, 46 minutos e 46 segundosScevola and here we get this it is right and here we get two of them  
1:46:551 hora, 46 minutos e 55 segundosthat's great so that is working wonderful and now let's head over to more and in the  
1:47:041 hora, 47 minutos e 4 segundosfinished example we see here we have if we click on our hotspots we have a subtitle after the title  
1:47:151 hora, 47 minutos e 15 segundosthe title will be extended with a link later now let's look for this and for this  
1:47:221 hora, 47 minutos e 22 segundospart these two text parts are now need to be found and it is pretty easy  
1:47:301 hora, 47 minutos e 30 segundosjust take a simple output of our JSON call here and we just need to fold out it here  
1:47:391 hora, 47 minutos e 39 segundosand just click on one statue so it's easier and now let's unfold it  
1:47:471 hora, 47 minutos e 47 segundosand what I now need is this short form after the title and this is the key  
1:47:541 hora, 47 minutos e 54 segundosdescription this is the next one and then we have the longer part which is extract  
1:48:031 hora, 48 minutos e 3 segundosand extract comes into flavors here as a simple plain text but here it is formatted  
1:48:091 hora, 48 minutos e 9 segundossometimes it is in bold as you see it here so there is some simple formatting in here  
1:48:171 hora, 48 minutos e 17 segundosand we want to have this and now let's get this to extract HTML and description from  
1:48:261 hora, 48 minutos e 26 segundosthe title and put some formatting around it for our output  
1:48:331 hora, 48 minutos e 33 segundosso now we have here a div let's give this div a class with subtitle this class are  
1:48:461 hora, 48 minutos e 46 segundosreferring to styles which I already have defined in the custom CSS  
1:48:571 hora, 48 minutos e 57 segundosso we have here some work already done just let's put a copy here and have the  
1:49:071 hora, 49 minutos e 7 segundossecond one and the second one is a summary  
1:49:131 hora, 49 minutos e 13 segundosand this is simple my identifiers my class names I added to this part and now let's  
1:49:221 hora, 49 minutos e 22 segundosjust copy this title segment here and now we need to just to change the subtitle to description  
1:49:331 hora, 49 minutos e 33 segundosand description and we have here  
1:49:371 hora, 49 minutos e 37 segundosthe summary is extract underscore HTML extract underscore HTML  
1:49:461 hora, 49 minutos e 46 segundosnow let's check this for the correct functions save and we get a flashy reload  
1:49:541 hora, 49 minutos e 54 segundoshere and now let's click on it and we get the h3 headline we get this short intro with subtitle  
1:50:051 hora, 50 minutos e 5 segundosand we get this summary including some HTML tags provided by Wikipedia so this is  
1:50:121 hora, 50 minutos e 12 segundosvery nice and we have now assembled the basic structure of our Wikipedia box content  
1:50:211 hora, 50 minutos e 21 segundosand we add some more stuff soon to make it complete so the basic version of our  
Capítulo 34: 05\. 13\. Add Wikipedia article backlink  
1:50:271 hora, 50 minutos e 27 segundosWikipedia content to be sent to the box in the sidebar in Palette VR is now ready but there is something missing  
1:50:361 hora, 50 minutos e 36 segundosif I compare it to the original finished version here we want to have one missing  
1:50:441 hora, 50 minutos e 44 segundosthing I want to have this title this Wikipedia title linked to its original article  
1:50:531 hora, 50 minutos e 53 segundosso if I click here in a new tab should be the original article in the HTML version  
1:51:001 hora e 51 minutosand Wikipedia website be opened so let's add this  
1:51:051 hora, 51 minutos e 5 segundosand we need to link to be made before I assemble so I am adding some space here  
1:51:151 hora, 51 minutos e 15 segundosbefore and let's say let link equals and now we need to find the position where I  
1:51:251 hora, 51 minutos e 25 segundoscan find this link in the data object  
1:51:301 hora, 51 minutos e 30 segundosso let's save it here and have a reload ok we won't have a reload here because this  
1:51:381 hora, 51 minutos e 38 segundosis a server version of the finished project but here we should have a reload  
1:51:461 hora, 51 minutos e 46 segundosand if I am clicking on a statue I will get this data object here and now let's  
1:51:531 hora, 51 minutos e 53 segundosunfold it and we have one position is called content URLs and there we have two  
1:52:011 hora, 52 minutos e 1 segundosections mobile and desktop for simplicity now I want to have the desktop version and the correct article is  
1:52:101 hora, 52 minutos e 10 segundosthe page version we don't want to see the discussions or the revisions and we won't  
1:52:171 hora, 52 minutos e 17 segundosedit this so page is the correct one  
1:52:201 hora, 52 minutos e 20 segundoswe can check it shorthand here with open URL in a new tab whether we will see the  
1:52:311 hora, 52 minutos e 31 segundosright thing yes it is correct so  
1:52:351 hora, 52 minutos e 35 segundosit is I keep it open here it is data dot content underscore URL  
1:52:441 hora, 52 minutos e 44 segundosand then dot desktop and then dot page this should be the correct link content  
1:52:541 hora, 52 minutos e 54 segundosURL let's cross check it content URL so where was this typo so let's fix it  
1:53:051 hora, 53 minutos e 5 segundosdesktop and dot page so now we need to build the link behind this title so it is simple it is a href  
1:53:161 hora, 53 minutos e 16 segundosand we have double quotes you can freely use quotes inside of these backticks this  
1:53:251 hora, 53 minutos e 25 segundosis one advantage you can use single and double quotes here  
1:53:321 hora, 53 minutos e 32 segundosbecause the important container outside to wrap it all together is a backtick so it  
1:53:391 hora, 53 minutos e 39 segundosis a nice trick to use it and so here I need just to add this one and here we have  
1:53:471 hora, 53 minutos e 47 segundossimply the variable link  
1:53:501 hora, 53 minutos e 50 segundoswithout an M should make more sense and we add the target and this will be underscore  
1:54:011 hora, 54 minutos e 1 segundoblank to open this in a new browser  
1:54:061 hora, 54 minutos e 6 segundostab and after the title we need to close our link tag  
1:54:141 hora, 54 minutos e 14 segundosand of course we can insert a break here so it's better readable in our small  
1:54:221 hora, 54 minutos e 22 segundoswindow here and this should do the job and now let's check it how it is looking in the console output  
1:54:331 hora, 54 minutos e 33 segundosif I'm clicking on this guy again we see here we have the title is wrapped in a  
1:54:401 hora, 54 minutos e 40 segundoslink tag and if I'm going here you open the URL in your tab it is working  
1:54:481 hora, 54 minutos e 48 segundosso now we have added a backlink to wikipedia from our project and now the  
1:54:551 hora, 54 minutos e 55 segundoscontent for one figure retrieved from wikipedia is ready and we now need to  
1:55:021 hora, 55 minutos e 2 segundosassemble all this to the whole content of the wikipedia box here on the side  
1:55:101 hora, 55 minutos e 10 segundosso the main title is missing and the image is missing and if I'm clicking on double  
1:55:171 hora, 55 minutos e 17 segundosfigure statue then this is one whole content block with both contents on top of each other  
1:55:251 hora, 55 minutos e 25 segundosso there is no problem this is ready and we only need to wrap up all this to be  
1:55:311 hora, 55 minutos e 31 segundosoutputted in this box it's the last step missing now when it comes to the assembly  
Capítulo 35: 05\. 14\. Add counter  
1:55:391 hora, 55 minutos e 39 segundosof the complete content of the wikipedia box  
1:55:431 hora, 55 minutos e 43 segundoswe need to keep in mind that we have some delays to obey because it takes some time  
1:55:511 hora, 55 minutos e 51 segundosto send out the request over the internet to wikipedia getting back this takes a time  
1:56:001 hora e 56 minutosif we have two figures in one statue then we have the problem that this doubles the  
1:56:061 hora, 56 minutos e 6 segundostime so we need to make sure that the last part of this is completed with loading before we assemble the rest  
1:56:161 hora, 56 minutos e 16 segundosso we need a counter there are some procedures to manage this timing problems  
1:56:221 hora, 56 minutos e 22 segundoswith loading external data into a project via JavaScript and ajax requests and ajax  
1:56:291 hora, 56 minutos e 29 segundoscalls and pretty simple and easy to understand is an approach to use a simple counter  
1:56:361 hora, 56 minutos e 36 segundosand before we have the loop running here on top of this loop I will set a parameter  
1:56:471 hora, 56 minutos e 47 segundoswhich is simply counter and now  
1:56:511 hora, 56 minutos e 51 segundoswe have let i equal zero and each loop repetition counts it up  
1:57:001 hora e 57 minutosso we need to go to the end of this section when the loading is done we count  
1:57:091 hora, 57 minutos e 9 segundosthis counter up we don't count failed attempts only successful attempts  
1:57:181 hora, 57 minutos e 18 segundosso let's add counter increment and let's have a very simple function it is i++  
1:57:311 hora, 57 minutos e 31 segundoswhich is a number represented by i counting one up  
1:57:401 hora, 57 minutos e 40 segundosand let's check a display here and we add a c for our console function and I show  
1:57:531 hora, 57 minutos e 53 segundossome text item and i so this is item and its number  
1:58:021 hora, 58 minutos e 2 segundosand then I add again something off and I want to see the maximum count and for this  
1:58:121 hora, 58 minutos e 12 segundoswe have the length parameter so it is requests requests dot length  
1:58:201 hora, 58 minutos e 20 segundosand so we have a display here and can check which item of our requests is just  
1:58:291 hora, 58 minutos e 29 segundosretrieved and let's add it here and we have here  
1:58:361 hora, 58 minutos e 36 segundosthe ampion is item one of one and if we head over to Marsden Minerva it is item  
1:58:431 hora, 58 minutos e 43 segundosone of two and item two of two and so now we can find easily the last iteration of the loop  
1:58:531 hora, 58 minutos e 53 segundoswe have to assemble the content which may happen on the last iteration  
1:59:001 hora e 59 minutoswhen we know the last data chunk is loaded from the REST API and this is happening in the next part  
Capítulo 36: 05\. 15\. Final content assembly  
1:59:101 hora, 59 minutos e 10 segundosas we now have a counter we can easily determine whether it's the last iteration  
1:59:161 hora, 59 minutos e 16 segundoswe have while walking through this each loop here so we can make sure that the content is not assembled before everything is loaded  
1:59:261 hora, 59 minutos e 26 segundosdon't either it's one or two entries so let's add a new line here where we need at first a condition so we have the  
1:59:361 hora, 59 minutos e 36 segundosrequest length it is one reason why I build it here  
1:59:401 hora, 59 minutos e 40 segundosso we can easily compare it so we have if condition so something is happening only  
1:59:491 hora, 59 minutos e 49 segundosunder a certain condition and if I is equal  
1:59:541 hora, 59 minutos e 54 segundosso we need this bracket don't delete it and I three equal signs for JavaScript to  
2:00:032 horas e 3 segundosmake sure it is really exact the same copy if I equals the request length  
2:00:122 horas e 12 segundosso if I is one after being counted up here from zero so after the first iteration  
2:00:192 horas e 19 segundosit's one if it's a single figure the condition is true  
2:00:252 horas e 25 segundosso the single figure content assembly happens at the end of the first iteration  
2:00:312 horas e 31 segundosif it's two then we have the length equals two and I is two after iterated from one from zero to one and from one to two so it is  
2:00:422 horas e 42 segundosalways sure that this is on the last iteration  
2:00:472 horas e 47 segundosand now let's add variable I have edited here already and I also edit the image tag  
2:00:562 horas e 56 segundosneeded for the black and white image in the content box it's image source  
2:01:052 horas, 1 minuto e 5 segundosit's simply combined by image path with our asset statues folders after being  
2:01:122 horas, 1 minuto e 12 segundosexported and the image which is the third custom property from our statue node  
2:01:202 horas, 1 minuto e 20 segundosso this is combined the image path so these two parts are missing now WD body is  
2:01:292 horas, 1 minuto e 29 segundosalready filled one or two times and now let's head over and W out  
2:01:372 horas, 1 minuto e 37 segundosand two vectix and a semicolon to have the output prepared let's add some space here  
2:01:482 horas, 1 minuto e 48 segundosand I'm starting with a diff and a class  
2:01:542 horas, 1 minuto e 54 segundosand this one will be named wiki-entry they are already corresponding to my CSS  
2:02:052 horas, 2 minutos e 5 segundosclasses defined in the custom CSS I'm just adding the closing tag here  
2:02:162 horas, 2 minutos e 16 segundosand now I'm using an h2 headline it should be larger than the ones of the Wikipedia  
2:02:272 horas, 2 minutos e 27 segundosarticles themselves and here I'm  
2:02:312 horas, 2 minutos e 31 segundosgoing to add a variable in my assembly string between the vectix  
2:02:402 horas, 2 minutos e 40 segundosand it is an title which is transferred via this function from the user data title  
2:02:532 horas, 2 minutos e 53 segundosof the Palette2VR project then I need a diff where the image is displayed  
2:03:062 horas, 3 minutos e 6 segundosand inside of this diff we only need to combine two variables so dollar curly  
2:03:152 horas, 3 minutos e 15 segundosbrackets and we have WEMG for the image on top and now we add our W body here  
2:03:252 horas, 3 minutos e 25 segundoswhich is the assembled content of one or two Wikipedia articles so this should be  
2:03:332 horas, 3 minutos e 33 segundosit and of course I have made an error here so this need to be put between the diff tags  
2:03:422 horas, 3 minutos e 42 segundosand this is my diff let's say wiki-content and this should be okay for now and I  
2:03:532 horas, 3 minutos e 53 segundoswould like to see it in the console  
2:03:592 horas, 3 minutos e 59 segundosto check everything before we are really outputting it  
2:04:072 horas, 4 minutos e 7 segundosW out and if I didn't made a mistake this should work so let's try this one and this  
2:04:182 horas, 4 minutos e 18 segundoslooks pretty nice we have a diff  
2:04:222 horas, 4 minutos e 22 segundostag here we have an h2 tag here we have diff wiki-content  
2:04:302 horas, 4 minutos e 30 segundosone diff-closing another diff-closing for the both here it should be okay this way  
2:04:372 horas, 4 minutos e 37 segundosnow let's check a double entry and we have wiki-entry as a container h2 then we have  
2:04:442 horas, 4 minutos e 44 segundoscontent with an image and then we have h3 with an article another h3 with an article and closing  
2:04:532 horas, 4 minutos e 53 segundoswith two closing diffs it looks pretty nice hopefully this works and now we have  
2:05:002 horas e 5 minutosone little thing to do and this is just to push it into our box in the left sidebar and this is pretty  
2:05:102 horas, 5 minutos e 10 segundoseasy we are using jQuery for this so we have the dollar sign and now we are addressing directly  
2:05:192 horas, 5 minutos e 19 segundosthe text box inside of our skin element so let's head over to the skin editor and the  
2:05:262 horas, 5 minutos e 26 segundoswiki box we have already assigned the class dot wiki box and keep in mind if you  
2:05:332 horas, 5 minutos e 33 segundoshave a text element you have an outer diff and we have an inner element and so we need to address it properly when pushing  
2:05:452 horas, 5 minutos e 45 segundosthe content into it so it is dot wiki box dash box and then we need a larger sign  
2:05:542 horas, 5 minutos e 54 segundosand a greater sign to address directly the containing diff and this gets a property  
2:06:022 horas, 6 minutos e 2 segundosand this property is html which represents the content of this box and it can be read and written  
2:06:122 horas, 6 minutos e 12 segundosand so now let's push this w out into this html box so hopefully this should do the  
2:06:222 horas, 6 minutos e 22 segundosjob so now let's check it and head over to the browser and check  
2:06:312 horas, 6 minutos e 31 segundosthis Amphion and here we are everything is displayed correctly in our box on the side  
2:06:402 horas, 6 minutos e 40 segundoshere and let's swap it and this content is now retrieved from wikipedia  
2:06:492 horas, 6 minutos e 49 segundosbelow the image everything here is from wikipedia this is my own image from the assets folder this comes from the  
2:06:572 horas, 6 minutos e 57 segundosuser data title we also see here if we head over to the hotspot  
2:07:022 horas, 7 minutos e 2 segundosand now let's check the double entry here Mars and Minerva first is Minerva then we  
2:07:092 horas, 7 minutos e 9 segundoshave Mars and the links to the articles should work accordingly  
2:07:152 horas, 7 minutos e 15 segundosso this is done now so we have a really nice data retrieval now from wikipedia  
2:07:242 horas, 7 minutos e 24 segundosinto our Pano2VR project and just to recap this step which was a little bit more complex just in a few  
Capítulo 37: 05\. 16\. Recap function blocks  
2:07:342 horas, 7 minutos e 34 segundoswords per section here we have a function called from the node hotspot and this is  
2:07:412 horas, 7 minutos e 41 segundostriggered exclusively if you click a statue node hotspot not a real panorama hotspot we building up the function on top  
2:07:512 horas, 7 minutos e 51 segundosof these four parameters which are transferred from skin variables and we  
2:07:572 horas, 7 minutos e 57 segundosbuild up a request array so we can work on it in a loop if necessary  
2:08:032 horas, 8 minutos e 3 segundosand we have some prerequisites with some paths folder for the images and some  
2:08:082 horas, 8 minutos e 8 segundosvariables to fill up this content or some code chunks like the image here which can be assembled beforehand  
2:08:162 horas, 8 minutos e 16 segundosand we have a counter to determine the last iteration of the loop now which  
2:08:212 horas, 8 minutos e 21 segundosfollows now and the loop cycles through our request array to make sure that double entries are processed  
2:08:292 horas, 8 minutos e 29 segundosproperly and now we building the request URL and the request URL is fed into the  
2:08:362 horas, 8 minutos e 36 segundosget JSON function from jQuery and if it's successfully done the function inside of  
2:08:442 horas, 8 minutos e 44 segundosthe done part of this process is processing the data object which we get from Wikipedia and there we can find  
2:08:542 horas, 8 minutos e 54 segundosvarious content chunks on parameters like the URLs or the descriptions or a summary  
2:09:012 horas, 9 minutos e 1 segundoin already formatted as HTML as well as a title and we can assemble it one or two times in all case we have a counter to determine  
2:09:122 horas, 9 minutos e 12 segundosthe last iteration and if the last iteration happens we wrap all the Wikipedia articles which are already live in WBody  
2:09:212 horas, 9 minutos e 21 segundostogether with the headline and image into one image and this image is pushed into  
2:09:272 horas, 9 minutos e 27 segundosthe text box in the skin editor with named and classified as Wikibox and that is the whole process  
2:09:362 horas, 9 minutos e 36 segundosand I hope it is understood in detail here because it is very important to check this  
2:09:442 horas, 9 minutos e 44 segundosfor other applications where the same procedure is very useful to retrieve  
2:09:512 horas, 9 minutos e 51 segundosarbitrary external data into another web project so in our case from Wikipedia to a Punnett 2VR project in  
2:10:002 horas e 10 minutosthe browser not in the application but in the browser at run time and this is a  
2:10:062 horas, 10 minutos e 6 segundosprocedure for retrieving the content into our text box here on the site  
2:10:122 horas, 10 minutos e 12 segundosthere are only a very few topics left to discuss at the end but this is the end of the most important part the complete  
2:10:202 horas, 10 minutos e 20 segundosprocess of data retrieval from a REST API endpoint in all processes with external data retrieval which are set up like ours here  
Capítulo 38: 05\. 17\. Check loading behaviour  
2:10:312 horas, 10 minutos e 31 segundoswe have to handle delays and waiting times for the content to being successfully  
2:10:382 horas, 10 minutos e 38 segundosretrieved so we need to keep in mind that parts of our project aren't loaded as fast as it is here in our local  
2:10:472 horas, 10 minutos e 47 segundosdevelopment environment which is pretty fast and Wikipedia usually delivers data also pretty fast  
2:10:542 horas, 10 minutos e 54 segundosbecause they have a very nice infrastructure for their servers but you cannot rely 100% on this so you  
2:11:012 horas, 11 minutos e 1 segundoneed at least to show your user when something has to be awaited for  
2:11:062 horas, 11 minutos e 6 segundosand let's provoke some delays here I'm going into my project here and if I'm  
2:11:142 horas, 11 minutos e 14 segundosgoing to the first figure it is immediately loaded because the image comes from my computer  
2:11:242 horas, 11 minutos e 24 segundosand this content from Wikipedia is extremely fast because it's using this compact JSON code so you won't see any significant delay and you remember the  
2:11:342 horas, 11 minutos e 34 segundosloading spinner I have built in at the beginning and we may make this now a little bit useful so I'm heading over to the network  
2:11:452 horas, 11 minutos e 45 segundostab in my web developer tools and I can add some parameters to simulate more real life experience  
2:11:552 horas, 11 minutos e 55 segundosI'm keeping the cache enabled so the image retrieval may be cached while our images  
2:12:032 horas, 12 minutos e 3 segundosand I will focus on external content so I'm adding here a throttling  
2:12:112 horas, 12 minutos e 11 segundosand usually a good testing port is about 2 megabit per second which is DSL line here  
2:12:192 horas, 12 minutos e 19 segundosand now let's do something to test it and I'm going to node where I haven't  
2:12:272 horas, 12 minutos e 27 segundosretrieved Wikipedia content before  
2:12:312 horas, 12 minutos e 31 segundosso let's say we are going to Asclepius so now you see the statue I've seen before or  
2:12:402 horas, 12 minutos e 40 segundosI've clicked before was still in this box and after a while the new content is appearing let's check it we have Asclepius  
2:12:512 horas, 12 minutos e 51 segundoshere which is attached to this statue so let's head over to Ceres and now I'm clicking right now  
2:13:022 horas, 13 minutos e 2 segundosyou see there was a little delay not very much but visible you see the image loading a little bit slower because also  
2:13:092 horas, 13 minutos e 9 segundoslocal files are throttled down to a certain speed  
2:13:122 horas, 13 minutos e 12 segundosand now I'm trying Hercules and the same but there may be a delay and we may have  
2:13:242 horas, 13 minutos e 24 segundosthe situation where old stale content is  
2:13:312 horas, 13 minutos e 31 segundoshere you see it very significant Hercules from the node before is standing very long  
2:13:382 horas, 13 minutos e 38 segundosin the box before the content of the just clicked priestess occurs  
Capítulo 39: 05\. 18\. Clear data and add loading spinner  
2:13:452 horas, 13 minutos e 45 segundosso we need to deal with this delay and what we at least can do is to signalize  
2:13:512 horas, 13 minutos e 51 segundosthe user okay wait so we need to reinstall our loading spinner here  
2:13:572 horas, 13 minutos e 57 segundosand at least we should make sure that if you are entering a new node or entering new content that the old content is cleared here  
2:14:062 horas, 14 minutos e 6 segundosand for this we will introduce a little function which does exactly this job  
2:14:122 horas, 14 minutos e 12 segundosso now I'm going to the custom.js again and I'm adding a new function below our  
2:14:222 horas, 14 minutos e 22 segundosfunction we had before and this function is also attached  
2:14:302 horas, 14 minutos e 30 segundosto the window object window. and I'm naming it clearWiki  
2:14:372 horas, 14 minutos e 37 segundosand this is a function it doesn't need any arguments so we are just done with this container here  
2:14:482 horas, 14 minutos e 48 segundosand now it's pretty easy and we are doing just the opposite basically we can copy  
2:14:562 horas, 14 minutos e 56 segundosthis line where we push the generated content into the wiki box text element in the skin  
2:15:052 horas, 15 minutos e 5 segundosjust copy paste it here and we  
2:15:092 horas, 15 minutos e 9 segundosjust kick out the w out and add a new string let spinner  
2:15:192 horas, 15 minutos e 19 segundosand now I will add some html code I just copy it or I can copy it from the skin  
2:15:302 horas, 15 minutos e 30 segundospretty easily text this is the original code and we just restore it so if we clear  
2:15:362 horas, 15 minutos e 36 segundosit we just override the wikipedia article with the old spinner html that's what we need here  
2:15:462 horas, 15 minutos e 46 segundosand I just add the spinner here at the html content and let's add a little  
2:15:542 horas, 15 minutos e 54 segundosmessage so that we see it's happening clear wiki content so we have also a message in the console for it  
2:16:062 horas, 16 minutos e 6 segundosso let's add a k for it for completeness so and now let's try it again  
2:16:152 horas, 16 minutos e 15 segundosI'm going to the browser and it loads pretty slowly I'm doing a force reload  
2:16:222 horas, 16 minutos e 22 segundoshere to clear the cache which was cmd shift r or ctrl shift r on the pc and now everything is loaded  
2:16:312 horas, 16 minutos e 31 segundosfreshly over a simulated 2mb line so it needs some time and here we go  
2:16:432 horas, 16 minutos e 43 segundosso also the map tiles are loaded slowly so let's go to this guy here  
2:16:512 horas, 16 minutos e 51 segundosand now we see the loading spinner and the content is loaded and if I head over to the next one  
2:17:002 horas e 17 minutosok the loading spinner was shortly flashing usually it is better to go to  
2:17:082 horas, 17 minutos e 8 segundosanother node and now invoke the loading of the wikipedia article but we have forgotten one thing  
2:17:182 horas, 17 minutos e 18 segundosyou have seen that the old content from the node before was still visible here  
2:17:242 horas, 17 minutos e 24 segundosbecause this function is defined here but I never called it anywhere  
2:17:292 horas, 17 minutos e 29 segundosso simple as that I copy it and we only need to add this function at the beginning  
2:17:382 horas, 17 minutos e 38 segundosof the open wiki function and before I do anything here I'm clearing out clear old content  
2:17:512 horas, 17 minutos e 51 segundosadd the clear wiki function and everything is fine  
2:17:562 horas, 17 minutos e 56 segundosso just to wipe out everything and now it should work  
2:18:032 horas, 18 minutos e 3 segundosI have a reload so wait for a moment  
2:18:152 horas, 18 minutos e 15 segundosso now let's check Laura it's loading and it's there  
2:18:242 horas, 18 minutos e 24 segundosnow let's check her neighbor you have seen there was a short flash of the loading spinner  
2:18:332 horas, 18 minutos e 33 segundoslet's move to the next node and head over to Heracles we have a loading spinner  
2:18:412 horas, 18 minutos e 41 segundosthe content comes in and let's get parasites  
2:18:472 horas, 18 minutos e 47 segundosyou have seen a short loading spinner and so it works  
2:18:542 horas, 18 minutos e 54 segundosso we have a clear up of our content before the next content is loaded it's more clean it makes it clear for the user that there is something loaded  
2:19:032 horas, 19 minutos e 3 segundosand that he needs to wait for a moment and it is a better usability and it's better understandable for the user when he does his interaction  
2:19:132 horas, 19 minutos e 13 segundosso no throttling I turn it off now and now it is usually you won't see it if you have a pretty good motorized  
2:19:202 horas, 19 minutos e 20 segundosserver you won't see the spinner very long or maybe not at all  
2:19:262 horas, 19 minutos e 26 segundosso now the project is finished and we have done everything that we get  
2:19:332 horas, 19 minutos e 33 segundosexternal Wikipedia content loaded as a description of our statues here in the  
2:19:402 horas, 19 minutos e 40 segundosSchönbrunn Palace Garden as this is a pretty large and complex tutorial I give you a short wrap-up over the whole project  
Capítulo 40: 05\. 19\. Wrap-up Pano2VR project  
2:19:512 horas, 19 minutos e 51 segundosin very short steps to make it clear how it is basically working and how the basic structure of this project is set up  
2:20:002 horas e 20 minutosand let's start with the Pano2VR main application we have some real-life panoramas on the one hand  
2:20:092 horas, 20 minutos e 9 segundosand we have some dummy panoramas which are working with a very small white dummy JPEGs  
2:20:172 horas, 20 minutos e 17 segundosand all the nodes have user data with three custom properties applied  
2:20:242 horas, 20 minutos e 24 segundosand we have here three properties which aren't used at the real-life panoramas  
2:20:312 horas, 20 minutos e 31 segundosbut at dummy panoramas we have added here the name  
2:20:362 horas, 20 minutos e 36 segundosthe first name of the figure in a statue with a second name optional  
2:20:432 horas, 20 minutos e 43 segundosand we have a image URL and we have a user data title  
2:20:482 horas, 20 minutos e 48 segundosand these four parameters are sent to a JavaScript to retrieve the content for  
2:20:552 horas, 20 minutos e 55 segundosthis respective statue the statues are represented by dummy nodes they are geolocated and elevated by six meters numerically  
2:21:062 horas, 21 minutos e 6 segundosso they are initially placed pretty much at the right point but only the real-life points are shown on the map in the skin  
2:21:162 horas, 21 minutos e 16 segundosand that's everything we have in the main application and if we head over to the skin we have the map container, the map pin  
2:21:262 horas, 21 minutos e 26 segundosthe map pin has an appearance, it only shows real panoramas, no dummy panoramas  
2:21:332 horas, 21 minutos e 33 segundosand I need to add here the usage of tags you see the green tag is underscore real and the blue tag is underscore statue  
2:21:422 horas, 21 minutos e 42 segundosand these tags decide whether it appears on the map or not, whether it's clickable a node hotspot here doesn't invoke a jump  
2:21:512 horas, 21 minutos e 51 segundosbut it does invoke a jump if you are going to the real node and if we head over here to the skin again  
2:22:002 horas e 22 minutoswe have the node hotspot is transferring the custom properties  
2:22:072 horas, 22 minutos e 7 segundosand the user data title into four skin variables then the most important function in the skin  
2:22:142 horas, 22 minutos e 14 segundosit transfers these four variables as parameters to an external function called OpenWiki  
2:22:222 horas, 22 minutos e 22 segundosand of course it only works with a statue node hotspot so this is everything we need to do here in the skin  
2:22:312 horas, 22 minutos e 31 segundosthen we come to the code integration we have an external CSS file which is embedded as a code element in the skin  
2:22:412 horas, 22 minutos e 41 segundosand it is replacing the default CSS which is attached to the skin itself  
2:22:482 horas, 22 minutos e 48 segundosand added with some other stuff including some custom fonts and some formatting for the Wikipedia content box  
2:22:582 horas, 22 minutos e 58 segundosand a little loading spinner entirely made by CSS and the CSS animation  
2:23:042 horas, 23 minutos e 4 segundosthe most important part is jQuery and JavaScript blog we are adding jQuery 4 here and it is loaded into the project  
2:23:142 horas, 23 minutos e 14 segundosand here is made available and then we have a custom script custom.js  
2:23:192 horas, 23 minutos e 19 segundoswhich is also embedded externally and edited in Visual Studio Code  
2:23:252 horas, 23 minutos e 25 segundosand then integrated into the skin and that's everything we have here we have a debug box it was a component  
2:23:332 horas, 23 minutos e 33 segundosand while we are just here make it invisible and I'm usually moving it out of scope  
2:23:422 horas, 23 minutos e 42 segundosbut we can leave it here make it invisible and it doesn't take much performance and space in the code  
2:23:502 horas, 23 minutos e 50 segundosand so this was the skin and Apollo to VR main app part and now let's head over to Visual Studio Code  
Capítulo 41: 05\. 20\. Summary JavaScript  
2:23:592 horas, 23 minutos e 59 segundoshere is the CSS file again and it has nothing special in it and we have the main part the engine of the whole project  
2:24:082 horas, 24 minutos e 8 segundoswhich is custom.js custom.js has convenience function for outputting to the console  
2:24:162 horas, 24 minutos e 16 segundosit is easy one advantage is just command it out and if I know heading over to the browser  
2:24:232 horas, 24 minutos e 23 segundosnothing is talking here anymore and now we are going to a new hotspot everything is working but no display here at all  
2:24:302 horas, 24 minutos e 30 segundosonly one point in the code to disable it and the main function we are working on is OpenWiki  
2:24:392 horas, 24 minutos e 39 segundosand we need to attach it to the window to avoid scope issues as we are operating with code inside of skin.js  
2:24:472 horas, 24 minutos e 47 segundosbut we need to make it available globally in the window object so we need this construction to define the function  
2:24:542 horas, 24 minutos e 54 segundoshere we have the four parameters we get from the skin  
2:24:592 horas, 24 minutos e 59 segundosand before we are adding content to the text element in the skin  
2:25:052 horas, 25 minutos e 5 segundoswe clear it up from older content with another function at the end and then we generate a request array to work in a loop  
2:25:152 horas, 25 minutos e 15 segundosto send one or two requests for one statue to Wikipedia REST API  
2:25:212 horas, 25 minutos e 21 segundoswe are defining some paths and code chunks here and then we are starting with a loop  
2:25:282 horas, 25 minutos e 28 segundoswhich is looping through the requests to make sure that one request is properly processed as well as two or even more if you like  
2:25:372 horas, 25 minutos e 37 segundosthe main engine to retrieve the content is the jQuery function getJSON it only needs a URL and it has two methods  
2:25:462 horas, 25 minutos e 46 segundoswhich are invoked when it's done successfully or if it's failing, the failing is easy  
2:25:532 horas, 25 minutos e 53 segundosand here we have inside of this done section we call a function on the data object which is returned from this function from outside  
2:26:022 horas, 26 minutos e 2 segundosand then we can handle through an object architecture to find all these content  
2:26:082 horas, 26 minutos e 8 segundospaths in the Wikipedia JSON object which is returning from them we assemble this to body objects, one or two  
2:26:182 horas, 26 minutos e 18 segundosvery simple, just HTML code and some variable placeholders combined inside of these backticks  
2:26:272 horas, 26 minutos e 27 segundosto assemble larger strings in JavaScript then we have a counter to manage the succession of the two parts  
2:26:362 horas, 26 minutos e 36 segundosand only on the last part we assemble the whole content with a headline and the image and the before assembled body part  
2:26:462 horas, 26 minutos e 46 segundosand then it is pushed with this line out to the skin text element  
2:26:532 horas, 26 minutos e 53 segundosand at least we have a little clearing function which reinstalled the HTML code for the little loading spinner  
2:27:002 horas e 27 minutoswhich is a default content in the skin when we install it, which is fixed here  
2:27:072 horas, 27 minutos e 7 segundosbut this will be replaced when the first content from Wikipedia comes and the clearWiki function replaces it with the default content  
2:27:152 horas, 27 minutos e 15 segundosthat's all, so that's a short wrap-up of the whole function and it is a blueprint for using external content  
2:27:232 horas, 27 minutos e 23 segundoswhere you shoot out a call via JavaScript most conveniently with the jQuery function getJSON  
2:27:302 horas, 27 minutos e 30 segundosbut there are other ways too to retrieve content and get a data object back which is formatted as a JSON object  
2:27:372 horas, 27 minutos e 37 segundoswhere you can easily pick up content for your purposes as you like and this connection between this Ubuntu VR project  
2:27:472 horas, 27 minutos e 47 segundosand the Wikipedia REST API is a simple but hopefully instructive example to get a connection  
2:27:552 horas, 27 minutos e 55 segundosbetween these parts of content and presentation and it has a lot of advantages  
2:28:022 horas, 28 minutos e 2 segundosand you can extend it to many, many, many other use cases and it is widespread in the web, it's an often used technology  
2:28:102 horas, 28 minutos e 10 segundosto combine an external data or database with content already living in your browser  
2:28:162 horas, 28 minutos e 16 segundosand you can make endless variations of this topic  
2:28:212 horas, 28 minutos e 21 segundosand I hope this tutorial showed how this basically works  
2:28:272 horas, 28 minutos e 27 segundosSo we are at the end of episode number 6 of the tutorial series about extending PolituVR with JavaScript  
2:28:362 horas, 28 minutos e 36 segundosand I hope this series has given you a good overview and a solid foundation for your own experiments  
2:28:442 horas, 28 minutos e 44 segundosand for your own projects to push the limits of the rich feature catalog PolituVR already has  
2:28:512 horas, 28 minutos e 51 segundosand to make projects more complex and more challenging  
2:28:572 horas, 28 minutos e 57 segundosand give you the opportunity to meet even advanced requests of your clients

Sincronizar com o momento do vídeo