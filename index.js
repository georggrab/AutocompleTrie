let neo4j = require('neo4j-driver').v1;

let driver = neo4j.driver("bolt://localhost:7687", neo4j.auth.basic("neo4j", "admin"));
let session = driver.session();


function feed(word){

  let root = "MATCH (root:RootDir) ";
  console.log(root);
  let i = 1;
  let lastchar;
  let request = root;

  for(let character of word){
    if (i==1){
      let substr = "MERGE (root)-[:REL]->(" + character + i + ":Entry{value:'" + character + "'}) ";
      console.log(substr);
      request+= substr;
      lastchar = character +i;
      i++;
      continue;
    }

    let substr = "MERGE (" + lastchar + ")-[:REL]->(" + character +i +":Entry{value:'" + character + "'}) ";
    console.log(substr);
    request+= substr;
    lastchar = character + i;
    i++;

  }

  session
  .run(request)
  .then( result =>
  {
    console.log(result);
    session.close();
    driver.close();
  })
}


feed("Word");
