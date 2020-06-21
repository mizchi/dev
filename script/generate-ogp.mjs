import canvas from "canvas";
import fs from "fs/promises";
import path from "path";
const dirname = path.dirname(new URL(import.meta.url).pathname);

const W = 600;
const H = 315;
const LINE_HEIGHT = 30;

function getRows(ctx, text) {
  const words = text.split(" ");

  let rows = [];
  let currentRow = [];
  let tokens = words.slice(0);
  let token;
  while ((token = tokens.shift())) {
    const mText = [...currentRow, token].join(" ");
    const measure = ctx.measureText(mText);
    if (measure.width <= W) {
      currentRow.push(token);
    } else {
      rows.push(currentRow.slice());
      currentRow = [token];
    }
  }
  if (currentRow.length > 0) {
    rows.push(currentRow);
  }

  return rows;
}

function renderText(ctx, rows) {
  const rowCount = rows.length;
  for (let i = 0; i < rowCount; i++) {
    const rowText = rows[i].join(" ");
    const m = ctx.measureText(rowText);

    const w = (W - m.width) / 2;
    // const h =  (LINE_HEIGHT + 12) * (i + 1);
    const h = 40 + 210 / 2 - (LINE_HEIGHT + 12) * (rowCount - i - 1);

    ctx.fillText(rowText, w, h);
  }
}

async function generateImage(text, outputPath) {
  const cvs = canvas.createCanvas(W, H);
  const ctx = cvs.getContext("2d");
  ctx.font = `${LINE_HEIGHT}px Impact`;

  const rows = getRows(ctx, text);

  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, W, H);

  ctx.fillStyle = "black";
  renderText(ctx, rows);

  const m = ctx.measureText("mizdev");
  ctx.fillText("mizdev", (W - m.width) / 2, 250);
  const buf = cvs.toBuffer();
  await fs.writeFile(outputPath, buf);
}

async function main() {
  const pages = JSON.parse(
    await fs.readFile(path.join(dirname, "../gen/pages.json"))
  );
  await Promise.all(
    pages.map(async (p) => {
      const out = path.join(dirname, "../public/ogp/", p.slug + ".png");
      await generateImage(p.title, out);
      console.log("[gen:ogp]", out);
    })
  );
}
main();
