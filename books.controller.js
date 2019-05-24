const axios = require('axios');
const qs = require('qs');

const headers = {
  'Accept': 'application/sparql-results+json,*/*;q=0.9',
  'Content-Type': 'application/x-www-form-urlencoded',
}

exports.books = async (req, res) => {
  try{
    const url = 'http://localhost:3030/perpustakaan/query';
    const requestBody = {
      method: 'post',  
      url: url,
      headers: headers,
      data: {
        query: encodeURIComponent(`
          PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
          PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
          PREFIX t: <http://www.semanticweb.org/boi/ontologies/2019/4/untitled-ontology-3#>
          
          SELECT ?books ?nama
          WHERE {
            ?books t:publishedBy t:Pub_PrenticeHall.
            ?books t:name ?nama.
          }
        `),
      }
    }

    const books = await axios(qs.stringify(requestBody));
    console.log(books);
  }
  catch(err){
    console.log(err);
  }
}

module.exports = exports