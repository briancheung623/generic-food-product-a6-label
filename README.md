# Simple G-Drive Product A6 Label Generator 
<table>
<tr>
<td>
 A webapp using Google App Scripts to generate A6 package description labels for food products. It helps small businesses to speed up pick-packing and dispatch.
</td>
</tr>
</table>

![sc8](https://user-images.githubusercontent.com/61366832/184585833-8142f2ef-f454-4719-893d-60a9c862a9ad.png)
![sc7](https://user-images.githubusercontent.com/61366832/184585848-507bba61-c4d5-4bed-93e3-dcdc1e54b80b.png)




## Demo (Requires Google Account)
Suggest to setup in your own Google Account for testing.


## Mobile support
The application is compatible with various screen sizes and all OS’s.

## Installation
- Go to your Google Drive, feel free to create a folder for this project.
- Upload Refill Label Contents Template.xlsx and A6 Label Template.docx into your drive.
![sc1](https://user-images.githubusercontent.com/61366832/184585868-c134d0a2-bc80-4ec5-943d-03b610e6472f.png)
- Convert both the files to Google Sheet format and Google Doc format. 
- To do this, Open the .xlsx file with Google Sheets and .docx file just uploaded.
![sc3](https://user-images.githubusercontent.com/61366832/184585863-844fcc85-7adb-489e-b0e0-741ddacfb997.png)
- Click on “File” —> “Save as Google Sheets” / “Save as Google Docs”. Refresh your drive directory and the two new files with same names should be generated. 
- Create a Google App Script.
 ![sc4](https://user-images.githubusercontent.com/61366832/184585861-d0095d7f-bdbc-48b3-bb28-5dd680371cf9.png)
- Copy and paste code from the code.gs
- Create three HTML files in the App Script. Name them “page-html” “page-js” “page-css”
- Copy and paste code respectively.
- Deploy the script as Web app. Google will prompt you with security warning for any new web app created. 
- Done! Feel free to experiment.


### Before Running the Script

Few things are required to be changed in the code.gs in order for the script to be able find the correct directory/files.
- Url to Refill Label Contents Template (Google Sheet Format, not .xlsx)  
- `const url = "https://docs.google.com/spreadsheets/d/[ID]/"`
- Paste the ID of A6 Label Template (Google Doc Format, not .docx) 
- `const googleDocTemplate = DriveApp.getFileById([ID])`
- Paste ID of folder directory for where you want the generated labels to be stored. 
- `const destinationFolder = DriveApp.getFolderById([ID])`

The scripts finds specific custom tags in the template file and replaces the content.
- For example: `{{Product Name}}`.
- If you wish to change some of the content headings, make sure these tags matches in all files.
- Feel free to put in your company logo as well (located in the template doc file)

### Bug / Feature Request(s)

If you find a bug, feel free to open an issue [here](https://github.com/briancheung623/generic-food-product-a6-label/issues/new). Make sure to include your query and the result.

### Improvements
If you'd like to request an enhancement, please feel free to do so by opening an issue [here](https://github.com/briancheung623/generic-food-product-a6-label/issues/new).


## Built with 
- [jQuery - Ajax](http://www.w3schools.com/jquery/jquery_ref_ajax.asp) - jQuery simplifies HTML document traversing, event handling, animating, and Ajax interactions for rapid web development.
- [Google App ScriptsI](https://developers.google.com/apps-script) - A cloud-based JavaScript platform that lets you integrate with and automate tasks across Google products.
- [Bootstrap](http://getbootstrap.com/) - Extensive list of components and  Bundled Javascript plugins.
- [ldLoader](https://loading.io/lib/loader/) - a JavaScript library that helps you control the state of your loader.
