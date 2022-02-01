/**
 * File system
 *
 * commonly used methods are:
 *
 * readdir() - read contents of a directory
 * readFile() - read a file
 * writeFile() - write to a file
 * unlink() - delete a file
 * mkdir() - make a directory
 * rmdir() - remove a directory
 */

/**
 * readdir using callbacks
 */
/*
const fs = require("fs");
console.log("Before readdir...");

// list contents in current directory
fs.readdir(".", (err, files) => {
  console.log("The contents in the current directory is:");
  console.log(files);
});

console.log("After readdir...");
*/

/**
 * readdir using promises
 */
const fs = require("fs").promises;

fs.readdir(".")
  .then((files) => {
    console.log("The contents in the current directory is:");
    console.log(files);
  })
  .catch((e) => {
    console.error(e);
  });
