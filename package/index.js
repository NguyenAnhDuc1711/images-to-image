const getCapture = async (wssInfo, numCol) => {
  const jsdom = require("jsdom");
  const { JSDOM } = jsdom;
  const dom = new JSDOM(`<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <link rel="stylesheet" href="index.css" />
  </head>
  <body>
    <div class="imgs-container" id="imgs-container"></div>
  </body>
</html>`);

  const gap = 20; // Example value for gap
  const A4Ratio = 1 / 1.414; // w / h
  const numRow = Math.ceil(wssInfo.length / numCol);
  const width = 1500;
  const document = dom.window.document;
  const imgsContainer = document.getElementById("imgs-container");
  const imgWidth = (1 / numCol) * width - gap;
  const imgHeight = imgWidth / A4Ratio;
  const height = imgHeight * numRow + (numRow - 1) * gap * 2;
  imgsContainer.style.display = "flex";
  imgsContainer.style.flexWrap = "wrap";
  imgsContainer.style.gap = gap + "px";
  imgsContainer.style.width = width + "px";
  imgsContainer.style.height = height + "px";
  imgsContainer.style.backgroundColor = "#ebebeb";
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = width;
  canvas.height = height;
  for (const wsInfo of wssInfo) {
    //Create a div contain img
    const imgContainer = document.createElement("div");
    imgContainer.style.position = "relative";
    imgContainer.style.width = imgWidth + "px";
    imgContainer.style.aspectRatio = A4Ratio;

    //Info box
    const inforBox = document.createElement("div");
    inforBox.style.position = "absolute";
    inforBox.style.width = imgWidth + "px";
    inforBox.style.height = 0.32 * imgHeight + "px";
    inforBox.style.backgroundColor = "white";
    inforBox.style.padding = "32px";
    inforBox.style.bottom = 0;
    inforBox.style.left = 0;
    inforBox.style.zIndex = 10;
    inforBox.style.boxSizing = "border-box";
    inforBox.style.boxShadow = "0 -2px 24px 0 #0000003d";

    //Info container
    const infoContainer = document.createElement("div");
    const titleTag = document.createElement("p");
    titleTag.innerHTML = wsInfo.title;
    titleTag.style.fontWeight = "700";
    titleTag.style.fontSize = "24px";
    titleTag.style.fontFamily = "Nunito !important";
    const gradeTag = document.createElement("p");
    gradeTag.style.display = "flex";
    gradeTag.style.alignItems = "center";
    gradeTag.style.gap = "8px";
    gradeTag.innerHTML =
      `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" id="school"><path fill="none" d="M0 0h24v24H0V0z"></path><path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z"></path></svg>` +
      ` Grade: ${wsInfo.grade}`;
    gradeTag.style.fontSize = "16px";
    gradeTag.style.fontWeight = "600";
    gradeTag.style.color = "rgba(33, 33, 33, 0.52)";
    gradeTag.style.marginTop = "20px";
    gradeTag.style.fontFamily = "Nunito !important";
    infoContainer.appendChild(titleTag);
    infoContainer.appendChild(gradeTag);
    inforBox.appendChild(infoContainer);

    //Img inside
    const img = document.createElement("img");
    img.src = wsInfo.url;
    img.alt = "";
    img.className = "image";
    img.style.width = imgWidth + "px";
    img.style.aspectRatio = A4Ratio;
    img.style.objectFit = "cover";
    imgContainer.appendChild(img);
    imgContainer.appendChild(inforBox);
    imgsContainer.appendChild(imgContainer);
  }
  try {
    htmlToCanvas(
      ctx,
      imgsContainer,
      0,
      0,
      canvas.width,
      canvas.height,
      document
    ).then(() => {
      // Get Base64 string from canvas (JPEG format)
      const base64Image = canvas.toDataURL("image/png");
      console.log("base64Image: ", base64Image);
    });
    // return renderHtmlToBase64(imgsContainer, width, height).then((base64) => {
    //   return base64;
    // });
  } catch (error) {
    console.error("Error capturing the element:", error);
  }
};

async function htmlToCanvas(ctx, element, x, y, width, height, document) {
  const clone = element.cloneNode(true);
  const tempContainer = document.createElement("div");
  tempContainer.style.position = "absolute";
  tempContainer.style.left = "-9999px";
  document.body.appendChild(tempContainer);
  tempContainer.appendChild(clone);

  await renderHtmlToCanvas(ctx, clone, x, y, width, height, document);

  document.body.removeChild(tempContainer);
}

async function renderHtmlToCanvas(ctx, element, x, y, width, height, document) {
  // const fs = require("fs");
  // const sharp = require("sharp");
  var xmlserializer = require("xmlserializer");
  return new Promise((resolve) => {
    const data = xmlserializer.serializeToString(element);
    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
        <foreignObject width="100%" height="100%">
          <div xmlns="http://www.w3.org/1999/xhtml">
            ${data}
          </div>
        </foreignObject>
      </svg>`;

    // const svgBuffer = Buffer.from(svg);
    const svgBase64 = Buffer.from(svg).toString("base64");
    const svgFullBase64 = "data:image/svg+xml;base64," + svgBase64;
    // const svgBuffer = Buffer.from(svgFullBase64.split(",")[1], "base64");
    // const sharp = require("sharp");
    // sharp(svgBuffer)
    //   .png()
    //   .toBuffer()
    //   .then((data) => {
    //     // Lưu hoặc xử lý dữ liệu PNG
    //     console.log("PNG buffer:", data.toString("base64"));
    //   })
    //   .catch((err) => {
    //     console.error("Lỗi khi chuyển đổi SVG sang PNG:", err);
    //   });

    svgString2Image(
      svgFullBase64,
      width,
      height,
      "png",
      document,
      /* callback that gets png data URL passed to it */ function (pngData) {
        // pngData is base64 png string
        console.log("pngData: ", pngData);
      }
    );

    // console.log(svgFullBase64);
    // const svgBlob = new Blob([svg], { type: "image/svg+xml;charset=utf-8" });
    // const { Image } = require("canvas");
    // const img = new Image();
    // img.onload = () => {
    //   ctx.clearRect(0, 0, width, height);
    //   ctx.drawImage(img, 0, 0, width, height);
    //   // ctx.drawImage(img, x, y);
    //   // URL.revokeObjectURL(svgFullBase64);
    //   resolve();
    // };
    // img.src = svgFullBase64;

    // sharp(svg)
    //   .toFormat("png")
    //   .toBuffer()
    //   .then((imageBuffer) => {
    //     const base64Image = imageBuffer.toString("base64");
    //     console.log(`data:image/png;base64,${base64Image}`);
    //   });
  });
}

function svgString2Image(svgData, width, height, format, document, callback) {
  // set default for format parameter
  format = format ? format : "png";
  // create canvas in memory(not in DOM)
  var canvas = document.createElement("canvas");
  // get canvas context for drawing on canvas
  var context = canvas.getContext("2d");
  // set canvas size
  canvas.width = width;
  canvas.height = height;
  // create image in memory(not in DOM)
  const { Image } = require("canvas");
  var image = new Image();
  // later when image loads run this
  image.onload = function () {
    // async (happens later)
    // clear canvas
    context.clearRect(0, 0, width, height);
    // draw image with SVG data to canvas
    context.drawImage(image, 0, 0, width, height);
    // snapshot canvas as png
    var pngData = canvas.toDataURL("image/" + format);
    // pass png data URL to callback
    callback(pngData);
  }; // end async
  // start loading SVG data into in memory image
  image.src = svgData;
}

module.exports = getCapture;
