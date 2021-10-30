import express from "express";
import path from "path";
import fs from "fs";

export const app = express();

app.get("/audio", async (req, res) => {
  const filePath = path.join(__dirname, String(req.query.id));
  const file = fs.statSync(filePath);

  res.writeHead(200, {
    "Content-Type": "audio/mpeg ",
    "Content-Length": file.size,
  });

  const stream = fs.createReadStream(filePath);

  // só exibe quando terminar de enviar tudo
  stream.on("end", () => console.log("acabou"));

  // faz streaming do audio
  stream.pipe(res);
});

app.listen(3000, () => console.log("Escutando"));
