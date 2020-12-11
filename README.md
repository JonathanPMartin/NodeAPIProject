live site: https://marti243-sem1.herokuapp.com
there is a system of a redirct to a reddict in upload.js to homepage.js to homepage.js. this is to upload data to the database and then to remove all the infomation used to create it, as all data was passed via the url.
the reason for passing data via the url instead of passing via ctx is due to their being redirects in the handlebar files and the only method to pass data from handlebars to the js file is via the url.
