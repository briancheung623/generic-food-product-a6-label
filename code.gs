// The url for Google Sheet (Excel) Product Contents
const url = "https://docs.google.com/spreadsheets/d/1gr5-FyYrIruJOwO2RWM4vGzsRClcBIMlnotfb_fkwQc/"
const sheetName1 = getSheetNames(0, url) + '';
const sheetName2 = getSheetNames(1, url) + '';


function doGet() {
  return HtmlService.createTemplateFromFile("page").evaluate();
}

function getSheetNames(index,url)
{
  var sheet = SpreadsheetApp.openByUrl(url).getSheets()
  // Logger.log(sheet[index].getName());
  return sheet[index].getName();
}


// A more accurate finding last row function based on non empty cells.
function myGetLastRow(sheet){
  var column = sheet.getRange('A:A')
  var value = ''
  var row = sheet.getMaxRows()
  var values = column.getValues()
  while (value == '') {
    value = values[row - 1]
    row--
  }
  return row + 1;
}


function loadDropDownElement() {
  var results = '<div class="selectHeader">Choose a product:</div><div class="drop_down_scroll_container"><span>'+ sheetName1 +'</span><span>' + sheetName2 + '</span></div><div id="RB_subcategories" class="dropdown-subcategory">';
  // Access Label Content Spreadsheet
  const [headers, ...rows] = SpreadsheetApp.openByUrl(url)
    .getSheetByName(sheetName1)
    .getDataRange()
    .getValues();
  var res = rows.map((r) =>
    headers.reduce((o, h, j) => Object.assign(o, { [h]: r[j] }), {})
  );

  for(const item in res)
  {
    results += '<span data-code="'+ res[item]['GTIN'] +'" data-sheet="'+ sheetName1 +'" data-price="0.00">'+ res[item]['Name'] +'</span>'
  }

  results += '</div>';
  results += '<div id="SS_subcategories" class="dropdown-subcategory">';

  const [headers2, ...rows2] = SpreadsheetApp.openByUrl(url)
    .getSheetByName(sheetName2)
    .getDataRange()
    .getValues();
  var res2 = rows2.map((r) =>
    headers2.reduce((o, h, j) => Object.assign(o, { [h]: r[j] }), {})
  );

  for(const item in res2)
  {
    results += '<span data-code="'+ res2[item]['GTIN'] +'" data-sheet="'+ sheetName2 +'" data-price="0.00">'+ res2[item]['Name'] +'</span>'
  }
  results += '</div>';
  return results;
}

function getSingleItem(sheetName, gtin){
  Logger.log("getSingleItem "+ gtin);
  // test
  // catergory = "SS"
  // gtin = "1532153953021"
  var object;
  // var sheetName = (catergory === "BR") ? "Bulk & Refill" : "Soups & Salads Seaweed";
  const [headers, ...rows] = SpreadsheetApp.openByUrl(url)
    .getSheetByName(sheetName)
    .getDataRange()
    .getValues();
  var res = rows.map((r) =>
    headers.reduce((o, h, j) => Object.assign(o, { [h]: r[j] }), {})
  );

  // Logger.log(res);

  let a = Object.values(res).find((obj) => {
	  return obj.GTIN == gtin
  });

  // Logger.log(a);

  return a;
}

function clearScriptProperties(){
  PropertiesService.getScriptProperties().deleteAllProperties();
}

function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}


function createNewLabel(obj) {
  //This value should be the id of your document template that we created in the last step
  const googleDocTemplate = DriveApp.getFileById('12wkA54HZdXLIdk3VJ3qDOB2NSn2SY3zf2H8iqd5wcv8');
  
  //This value should be the id of the folder where you want your completed documents stored
  const destinationFolder = DriveApp.getFolderById('1bKfqtEKqs9vW8Qg4e8XvpucHAX-wwTeT');
  
    const copy = googleDocTemplate.makeCopy(obj['Name'] + ' - ' + obj['Net weight'] , destinationFolder)
    const doc = DocumentApp.openById(copy.getId());
    //All of the content lives in the body, so we get that for editing
    const body = doc.getBody();
    body.replaceText('{{Product Name}}', obj['Name']);
    body.replaceText('{{Net weight}}', obj['Net weight']);
    body.replaceText('{{No. of servings}}', obj['No. of servings']);
    body.replaceText('{{Short description}}', obj['Short description']);
    body.replaceText('{{How to use}}', obj['How to use']);
    body.replaceText('{{Best in}}', obj['Best in']);
    body.replaceText('{{Ingredients}}', obj['Ingredients']);
    body.replaceText('{{Allergens}}', obj['Allergens']);
    body.replaceText('{{Country of origin}}', obj['Country of origin']);

    // The following for loop only requires if you need to BOLD Highlight 
    // specific text such as "FISH,SESAME,CRUSTACEAN,MOLLUSC" etc.
    // Feel free to change text inside the find text function .findText([word]);
    // var paragraphs = body.getParagraphs();
    // for(var i = 0; i < paragraphs.length; i++)
    // {
    //   var textObj = paragraphs[i].editAsText();
    //   var lineStr = textObj.getText();
    //   if(lineStr.split(":")[0] === "Allergens")
    //   {
    //     fish_range = textObj.findText("FISH");
    //     sesame_range = textObj.findText("SESAME");
    //     crustacean_range = textObj.findText("CRUSTACEAN");
    //     mollusc_range = textObj.findText("MOLLUSC");

    //     if(fish_range !== null)
    //       textObj.setBold(fish_range.getStartOffset(), fish_range.getEndOffsetInclusive(),true);
    //     if(sesame_range !== null)
    //       textObj.setBold(sesame_range.getStartOffset(), sesame_range.getEndOffsetInclusive(),true);
    //     if(crustacean_range !== null)
    //       textObj.setBold(crustacean_range.getStartOffset(), crustacean_range.getEndOffsetInclusive(),true);
    //     if(mollusc_range !== null)
    //     textObj.setBold(mollusc_range.getStartOffset(), mollusc_range.getEndOffsetInclusive(),true);
    //   }
    // }
      doc.saveAndClose();
      //We make our changes permanent by saving and closing the document
      var target = doc.getAs("application/pdf");
      destinationFolder.createFile(target);
      //Store the url of our new document in a variable
      var saveAsName = obj['Name'] + ' - ' + obj['Net weight'];
      return DriveApp.getFilesByName(saveAsName).next().getUrl().replace('edit?usp=drivesdk', 'export?format=pdf');
}
