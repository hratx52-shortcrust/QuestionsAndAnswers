var sampleData =
//0       1         2         3           4            5            6       7
`id, product_id, body, date_written, asker_name, asker_email, reported, helpful
1,1,"What fabric is the top made of?","2018-01-04","yankeelover","first.last@gmail.com",0,1
2,1,"HEY THIS IS A WEIRD QUESTION!!!!?","2019-04-28","jbilas","first.last@gmail.com",1,4
3,1,"Does this product run big or small?","2019-01-17","jbilas","first.last@gmail.com",0,8
4,1,"How long does it last?","2019-07-06","funnygirl","first.last@gmail.com",0,6
5,1,"Can I wash it?","2018-02-08","cleopatra","first.last@gmail.com",0,7
6,1,"Is it noise cancelling?","2018-08-12","coolkid","first.last@gmail.com",1,19
7,2,"Where is this product made?","2018-01-24","iluvcatz","first.last@gmail.com",0,0
8,2,"Is this product sustainable?","2018-07-12","coolkid","first.last@gmail.com",1,5
9,2,"I'm allergic to dye #17, does this product contain any?","2019-01-24","l33tgamer","first.last@gmail.com",0,6`

// var convertToArray = (data) => {
//   var result = [];
//   data = data.split('\n');
//   for (var i = 0; i < data.length; i++) {
//     var singleItem = data[i].split(',');
//     result.push(singleItem);
//   }
//   return result;
// }

// convertToArray(sampleData);

fs.readFile('./CSV/questions.csv', 'utf8', (err, data) => {
  if (err) {
    throw err;
  } else {
    var convertToArray = (csvFileData) => {
      var result = [];
      singleEntries = csvFileData.split('\n')
      for (var i = 0; i < singleEntries.length; i++) {
        var singleItem = singleEntries[i].split(',')
        result.push(singleItem);
      }
      return result;
    }
    transformedData = convertToArray(data);
    //if question has a comma, rejoin and insert into db
    for (var k = 1; k < transformedData.length; k++) {
      while (transformedData[k].length > 8) {
        var combined = transformedData[k][2] + ',' + transformedData[k][3]
        transformedData[k].splice(2, 2, combined)
      }
      db.none('INSERT INTO questions(product_id, body, date_written, asker_name, asker_email, reported, helpful) VALUES(${product_id}, ${body}, ${date_written}, ${asker_name}, ${asker_email}, ${reported}, ${helpful})', {
        product_id: transformedData[k][1],
        body: transformedData[k][2],
        date_written: transformedData[k][3],
        asker_name: transformedData[k][4],
        asker_email: transformedData[k][5],
        reported: transformedData[k][6],
        helpful: transformedData[k][7]
      })
    }
  }
})

console.log(db);
/*

[
  '26',
  '3',
  '"I\'m allergic to dye #17',
  ' does this product contain any?"',
  '"2018-10-08"',
  '"rhcp81"',
  '"first.last@gmail.com"',
  '0',
  '0'
],

*/