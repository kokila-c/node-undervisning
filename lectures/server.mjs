import eventLogger from "./eventLogger.mjs";
import http from "http";
import { join, extname } from "path"; // "data/fdisujh"
import fs, { promises as fsPromises } from "fs";
const { dirname } = import.meta;
const PORT = process.env.PORT || 3500;

const server = http.createServer(async (req, res) => {
  eventLogger(`${req.method}\t${req.url}`);

  const extension = extname(req.url);

  let contentType;
  switch (extension) {
    case ".css":
      contentType = "text/css";
      break;
    case ".js":
      contentType = "text/javascript";
      break;
    case ".json":
      contentType = "application/json";
      break;
    case ".jpg":
      contentType = "image/jpg";
      break;
    case ".png":
      contentType = "image/png";
      break;
    case ".txt":
      contentType = "text/plain";
      break;
    default:
      contentType = "text/html";
  }

  let filePath =
    contentType === "text/html" && req.url === "/"
      ? join(dirname, "views", "index.html")
      : contentType === "text/html" && req.url.endsWith("/")
      ? join(dirname, "views", req.url, "index.html")
      : contentType === "text/html"
      ? join(dirname, "views", req.url)
      : join(dirname, req.url);

  //Logikken over translater:
  //http://localhost:3500/cool-page.html
  //til
  //c:/code/node/my-node-app/views/cool-page.html

  if (!extension && req.url.slice(-1) !== "/") filePath += ".html";

  const serveFile = async (filePath, contentType, response) => {
    try {
      const rawData = await fsPromises.readFile(
        filePath,
        contentType !== "image/jpg" ? "utf8" : ""
      );
      const data =
        contentType === "application/json" ? JSON.parse(rawData) : rawData;
      response.writeHead(filePath.endsWith("404.html") ? 404 : 200, {
        "Content-Type": contentType,
      });
      response.end(
        contentType === "application/json" ? JSON.stringify(data) : data
      );
    } catch (err) {
      console.error(err);
      response.statusCode = 500;
      response.end();
    }
  };

  if (fs.existsSync(filePath)) {
    serveFile(filePath, contentType, res);
  } else {
    //send f.eks 404 side her.
    serveFile(join(dirname, "views", "404.html"), contentType, res);
  }
});

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
