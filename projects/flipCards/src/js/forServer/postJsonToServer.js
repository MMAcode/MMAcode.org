export default async function postJsonData(url, data) {//object  

  const options = {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    headers: {
      'Content-Type': 'application/json'  // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  }

  try {
    console.log("url to fetch: ",url)
    const response = await fetch(url, options);
    // console.log("server response returned", response);
    const jsonData = await response.json(); // parses JSON response into native JavaScript objects
    // console.log("jsonData:", jsonData);
    return jsonData;
  } catch (err) {
    console.log("error in fetch");
    return { message: 'error in Fetch', err };
  }
}