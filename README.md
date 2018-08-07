# Fishing-License
I love to go fishing but in Germany (Bavaria) you need to get a permit for every day of fishing, unless you are member of a fishing club.
So build this website to make the process of buying these permits much easier than it currently is....

It is possible to either register as a private user or as a fishing club. Private users can see their data, see all registered fishing waters and clubs. They can chose a fishing spot & date and buy a permit (payment process is skipped for obvious reasons). A PDF document will be downloaded, including the permit with a QR-Code that holds all the information.

The fishing clubs can register, upload an icon and add fishing spots. There is also a build in scanner for the QR-Code, that is on each permit. In the webapplication, it uses your webcam to scan the code, process and display all the information and determin if the permit is valid for today or not.

I created this application with React.js and the react-router-dom. For my databases i use postgreSQL. I also upload the club-icons to my amazon Webservices S3 bucket with the mutler module.
I used plenty of other libaries and node modules. Follow along the code from login to downloading your permit and hopefully you will get a
decent understanding on how i designed my code and what i used to make it happen.
