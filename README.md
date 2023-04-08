<h1>Project title:</h1>
**A mobile optimized, fully responsive CV generator with custom style optimizing and PDF download function.**

<h2>Screenshot one: </h2>
![CV Generator Screenshot](https://github.com/HRDTS/CV-generator/blob/main/cvss1.png?raw=true)
<h2>Screenshot two:</h2>
![CV Generator Screenshot](https://raw.githubusercontent.com/HRDTS/CV-generator/main/cvss2.png)





<h1>Project description:</h1>
Note: this application is only available in Dutch. I will translate the words to English in this readme so non-Dutch readers will be able to read it too.

This is my first React project. It’s an application that allows users to create a structured CV by taking their input and place it neatly on the CV. 

**6 segments**<br>
The CV is divided into 6 segments: 
1. personal details (consisting of: name, address, phone, mail, date of birth and whether you have a driving license.
2. profile (consisting of a short summary about yourself)
3. work experience (consisting of all the companies you have worked for)
4. education ( consisting of the schools/institutions you have studied at)
5. skills (consisting of all the skills you have, up to 5 skills can be added)
6. languages (consisting of all the languages you speak, up to 5 languages can be added)

By default, the user enters something in an input field and then some logic will be used to save that input in the React state, and then show that state on the CV. Edit and deleting the input fields is simple too: users can simply change the text in the input fields directly. However, not all the segments listed above use the same method to insert/edit/delete the input.  I will explain how each segment works.

The first and second segments (personal details and profile) are default. The contents can edited directly from input fields, as described earlier.
 
The third and fourth segments (work experience and education) are the most distinct segments for the following reasons:
- Users can work for multiple companies or have multiple degrees, so these segment will contain multiple fields.

- Each field requires a header with: company name, role and start and end date. (this is for the work experience segment) The education segment field requires a header with: school name, education and start and end date.

- Users will want to describe their experience at a company, so I allowed bulletpoints to be added to the fields. The bulletpoints add complexity to the project because these will have to be deleted and/or edited individually after the user has generated them. I added the logic whereby each bulletpoint that is generated has its own delete/edit button.
 
The fifth segment (skills) has a default input where you can directly insert/delete/edit the input but it also has icons to show how proficient the user is with that skill. Users can add 1 to 5 stars to their skills by selecting their rating from the drop down menu.  Users have by default 1 skill, but they can add a skill ‘field’ by pressing the ‘add’ button and ‘delete’ button to remove fields from the skills segment.

The last segment (languages) operates in the same way as the skills segment. Users can input a language and rate their proficiency. Users can rate their proficiency by selecting an item from the drop down menu which consists of options such as: native speaker, good, bad etc.

<h2>Custom styling</h2><br>
Users are able to style their own CV according to their wishes. The colors on the CV are changeable at three different places: header and the two lines in between each segments. There is also the feature that allows users to adjust the font-size for the personal information segment. I was not planning on this feature, but I decided to do it because I noticed that this particular segment was bound to overflow. For example, this segment contains information such as email, which is something I did not want to limit too much with char-length to avoid overflow. Instead, I chose to allow users to adjust the font-size. 

<h2>PDF download</h2><br>
Users can download their CV at any time with the download button at the bottom of the application.  The way the PDF download works is as follows:
There is an element with the width and height of an actual A4 paper (210 x 297 mm). This element is first screenshotted with the library html2canvas. Then I take this screenshot and download it with the library jsPDF. The reason I use html2canvas first and not directly jsPDF, is because I was facing some technical difficulties by trying to download the A4 element directly with jsPDF.

As mentioned, there is an A4 element on the application with the 210mm width and 297mm height. I can’t always display the full A4 element on every device, since there would be overflow. So on smaller devices, I scale this A4 down to an appropriate size. This makes the A4 look very nice even on smaller devices. However, I can’t download this down scaled version of the A4 element, I will need to scale it back to its original format every time the download button is pressed. That is exactly what I do. Each time the user wants to download the A4, it scales back to its original size, the code does its work, and the it scales back to the appropriate size for the device.

Another important point for the downloading part is to make sure to hide the edit/delete buttons on the CV when the code screenshots it. The user can hide those edit/delete buttons manually by pressing the on/off button, but in case the user forgets to do it manually, the code deactivates all those edit/delete buttons automatically. 

<h2>Overflow</h2> <br>
Perhaps one of the biggest challenges I faced during this project is overflow. With a limited space (1 page) on the CV, users are bound to be limited in how much they can write. I had to put character limit on many fields. I put a limit on all segments except the work experience and education segment. The reason I did this is because it was difficult to predict how many bulletpoints users were going to use and how many fields. I also thought that it would be more harmful to limit these fields instead of letting users correct themselves by seeing what fits and what doesn’t. In order to aid users in preventing overflow, I added a bar that changes from false to true if there is overflow.

<h2>Personal note:</h2> <br>

This project was a great introduction to React. It made me adjust my vanilla Javascript way of thinking to the React way of thinking. After some time, I was worried that I forgot how vanilla Javascript worked :) This project made me think a lot about user experience and how I can make a one-size-fits-all application even though a CV can be highly personal.

Please feel free to reach out to me with any feedback or questions you may have. I am always happy to connect with fellow developers and share my experiences.

If you find your image in this or any other of my projects and you do not want it to be used, please contact me at t.genc58@hotmail.com. I will promptly remove the image upon request.
Thank you.




