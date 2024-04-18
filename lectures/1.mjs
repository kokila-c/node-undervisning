//CommonJS -> const fs = require("fs");
// CommonJS has __dirname
import fsPromises from "fs/promises";
import { join } from "path";
import { v4 as uuid } from "uuid";
import { format } from "date-fns";

const { dirname } = import.meta;

const log = (msg) => {
  return `${format(new Date(), "dd.MM.yy\tHH:mm:ss")}\t${uuid()}\t${msg}\n`;
};

await fsPromises.appendFile(join(dirname, "log.txt"), log("Message here!"));
console.log("log updated.");

/* await fsPromises.writeFile(join(dirname, "yes.txt"), "Promises.");
await fsPromises.appendFile(join(dirname, "yes.txt"), "\nThey're great.");
const data = await fsPromises.readFile(join(dirname, "yes.txt"), "utf8");
console.log(data); */

/* fs.writeFile(join(dirname, "test.txt"), "This is test.", (err) => {
  if (err) throw err;
  fs.appendFile(join(dirname, "test.txt"), "\nSecond line", (err) => {
    if (err) throw err;
    fs.readFile(join(dirname, "test.txt"), "utf8", (err, data) => {
      if (err) throw err;
      console.log(data);
    });
  });
}); */
