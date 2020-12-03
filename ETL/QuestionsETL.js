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
      data = data.split('\n')
      for (var i = 0; i < data.length; i++) {
        //need to account for comma in a question
        var singleItem = data[i].split(',')
        if (singleItem[0] === '"' && singleItem[singleItem.length - 1] !== '"') {

        }
        result.push(singleItem);
      }
      return result;
    }
    transformedData = convertToArray(data);
    for (var i = 1; i < transformedData.length; i++) {

    }
  }
})