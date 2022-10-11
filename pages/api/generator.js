import { registerFont, createCanvas, Image } from "canvas";
import path from "path";
import fs from "fs";

const images = {
  sfw: {
    oneLine: "aw-yiss-1-line-sfw.png",
    twoLines: "aw-yiss-2-line-sfw.png",
    threeLines: "aw-yiss-3-line-sfw.png",
  },
  nsfw: {
    oneLine: "aw-yiss-1-line.png",
    twoLines: "aw-yiss-2-line.png",
    threeLines: "aw-yiss-3-line.png",
  },
};

const offset = [
  // Line 1
  {
    x: 480,
    y: 138,
  },
  // Line 2
  {
    x: 480,
    y: 163,
  },
  // Line 3
  {
    x: 480,
    y: 189,
  },
];

function getLines(ctx, text, maxWidth) {
  let words = text.split(" ");
  let lines = [];
  let currentLine = words[0];

  for (let i = 1; i < words.length; i++) {
    let word = words[i];
    let width = ctx.measureText(currentLine + " " + word).width;
    if (width < maxWidth) {
      currentLine += " " + word;
    } else {
      lines.push(currentLine);
      currentLine = word;
    }
  }
  lines.push(currentLine);
  return lines;
}

export default async function generator(req, res) {
  return new Promise((resolve) => {
    if (req.method === "POST") {
      if (!req.body.value || req.body.value.length > 40) {
        res.status(400).end();
        return resolve();
      }

      const value = req.body.value.toLowerCase();
      const sfw = req.body.sfw ? "sfw" : "nsfw";

      const fontFileName = "KateBeatonScript";
      const fontFilePath = path.resolve(`pages/api/${fontFileName}.ttf`);
      registerFont(fontFilePath, { family: `${fontFileName}` });

      const canvas = createCanvas(600, 411);
      const ctx = canvas.getContext("2d");
      const maxWidth = 190;

      let baseImage;

      // Draw text
      ctx.font = "28px KateBeatonScript";
      ctx.fillStyle = "#2d2a2c";
      ctx.textAlign = "center";

      // Break up text input into individual lines
      const lines = getLines(ctx, value, maxWidth);

      switch (true) {
        case lines.length === 1:
          baseImage = images[sfw].oneLine;
          break;
        case lines.length === 2:
          baseImage = images[sfw].twoLines;
          break;
        case lines.length === 3:
          baseImage = images[sfw].threeLines;
          break;
        default:
          return res.status(400).end();
      }

      // Fetch the base image
      const dirRelativeToPublicFolder = "images";
      const dir = path.resolve("./public", dirRelativeToPublicFolder);

      fs.readFile(`${dir}/${baseImage}`, function (err, data) {
        if (err) return res.status(500).end();
        let img = new Image();
        img.src = data;
        // Place base image on canvas
        ctx.drawImage(img, 0, 0);

        // Draw each line
        for (let i = 0; i < lines.length; i++) {
          ctx.fillText(lines[i], offset[i].x, offset[i].y);
        }

        res.status(200).json({ image: canvas.toDataURL() });
        return resolve();
      });
    } else {
      res.status(405).end();
      return resolve();
    }
  });
}
