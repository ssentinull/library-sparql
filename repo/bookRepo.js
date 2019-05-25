const axios = require('axios');
const qs = require('qs');

const headers = {
  'Accept': 'application/sparql-results+json,*/*;q=0.9',
  'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
}

exports.GetBooks = async () => {
  const queryData = {
    query: `PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
    PREFIX t: <http://www.semanticweb.org/boi/ontologies/2019/4/untitled-ontology-3#>
    
    SELECT ?books ?nama
    WHERE {
      ?books t:publishedBy t:Pub_PrenticeHall.
      ?books t:name ?nama.
    }
  `
  };

  try{
    const url = 'http://localhost:3030/perpustakaan/query';
    const { data } = await axios(url, {
      method: 'POST',
      headers,
      data: qs.stringify(queryData)
    });

    return Promise.resolve(data);
  }
  catch(err){
    console.error(err);
    return Promise.reject(err);
  }
}

module.exports = exports;