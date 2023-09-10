import { readFileSync } from "fs";

const items = readFileSync("./public/_redirects", "utf-8").split("\n");
const filtered = items
  .map((it) => it.split(" "))
  .filter((it) => it.length === 3)
  .map((it) => {
    return {
      source: it[0].replace("*", ":path*"),
      destination: it[1].replace("*",":path*"),
      statusCode: Number(it[2]),
    };
  });

console.log(filtered);
