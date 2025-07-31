/*
ให้นิสิตเขียนโปรแกรมเพื่อรับค่าจากผู้ใช้ผ่านเว็บเบราว์เซอร์โดยจะรับเป็นตัวเลข และส่งผลรับออกมาเป็น ผลรวมของ
ตัวเลขในแต่ละหลัก
เช่น
Input 1234
Output 10
เกิดจาก 1 + 2 + 3 + 4 ได้เป็น 10
*/

import http from "http";
import { parse } from "querystring";

const port = 3000;

const server = http.createServer((req, res) => {
  let body = "";
  if (req.method === "POST") {
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", () => {
      console.log("Received POST DATA:", body);
      res.writeHead(200, { "Content-Type": "text/plain" });

      const data = parse(body);
      const input = data.value || "";
      let sum = 0;
      for (let i = 0; i < input.length; i++) {
        const digit = parseInt(input[i]);
        if (!isNaN(digit)) {
          sum += digit;
        }
      }
      res.end(`Output: ${sum}\n`);
    });
  } else {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(`<form method="POST" action="/">
                <input type="text" name="value"/>
                <button type="submit">Submit</button>
              </form>`);
  }
});

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
