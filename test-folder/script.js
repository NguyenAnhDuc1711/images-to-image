const getCapture = require("images-to-image");

const img1 =
  "https://images-ext-1.discordapp.net/external/fd-klEdjVVv6uboXZFuakR9HUGqQ91aKVJtSbmZWC68/https/storage.googleapis.com/worksheetzone/image/621f9117fd78c93288d62307/december-math-pre-post-assessment-6-8-level-1-w300-h387-thumbnail.jpg?format=webp&width=375&height=483";
const img2 =
  "https://images-ext-1.discordapp.net/external/hYoFb6dFh-UGXODjs00NolnzRsVmvZTBZ8YJ7LMhi5o/https/storage.googleapis.com/worksheetzone/image/621f9117fd78c93288d6230d/math-w300-h399-thumbnail.jpg?format=webp&width=375&height=498";
const img3 =
  "https://images-ext-1.discordapp.net/external/MhVBGWTxIBNgeH5GnuY8nFnsxObimIb3f9l3LH69hkA/https/storage.googleapis.com/worksheetzone/image/621f9117fd78c93288d6231e/58-math-problem-w300-h387-thumbnail.jpg?format=webp&width=375&height=483";
const img4 =
  "https://images-ext-1.discordapp.net/external/H-jpGQhXpcUX9-njuOZ1t6_oZ9_8F9Uza2JL6a2UfX4/https/storage.googleapis.com/worksheetzone/image/621f9118fd78c93288d62335/chapter-4-performance-assessment-w300-h387-thumbnail.jpg?format=webp&width=375&height=483";
const img5 =
  "https://images-ext-1.discordapp.net/external/n2OLtMb9o12JeR7YkJFFWzf0itO__H3jTdbCi71DKvM/https/storage.googleapis.com/worksheetzone/image/621f9118fd78c93288d62359/double-digit-addition-and-subtraction-set-3-no-regrouping-w300-h387-thumbnail.jpg?format=webp&width=375&height=483";
const img6 =
  "https://images-ext-1.discordapp.net/external/WxLrUrIviqAUBBNNzvtddkETa-_6MDg2OHQYPXSl0t4/https/storage.googleapis.com/worksheetzone/image/621f9118fd78c93288d6238a/exit-ticket-double-digit-addition-and-subtraction-1-w300-h231-thumbnail.jpg?format=webp&width=375&height=288";
const img7 =
  "https://images-ext-1.discordapp.net/external/ePYPHCucvXEjaMv5l2TRAZJUtXoKOVD1XZLXQMaT5S4/https/storage.googleapis.com/worksheetzone/image/621f9118fd78c93288d6238e/subtraction-w300-h423-thumbnail.jpg?format=webp&width=375&height=528";
const img8 =
  "https://images-ext-1.discordapp.net/external/AWrhZ574GEl6gxolBXzFIVQ3ZkY08X9IGNzZ6EcfYXE/https/storage.googleapis.com/worksheetzone/image/621f9119fd78c93288d623c6/subtraction-w300-h387-thumbnail.jpg?format=webp&width=375&height=483";

getCapture(
  [
    {
      url: img1,
      title: "WS 1",
      grade: "2nd - 3rd",
    },
    {
      url: img2,
      title: "WS 2",
      grade: "2nd - 3rd",
    },
    {
      url: img3,
      title: "WS 3",
      grade: "2nd - 3rd",
    },
    {
      url: img4,
      title: "WS 4",
      grade: "2nd - 3rd",
    },
    {
      url: img5,
      title: "WS 5",
      grade: "2nd - 3rd",
    },
    {
      url: img6,
      title: "WS 6",
      grade: "2nd - 3rd",
    },
    {
      url: img7,
      title: "WS 7",
      grade: "2nd - 3rd",
    },
    {
      url: img8,
      title: "WS 8",
      grade: "2nd - 3rd",
    },
  ],
  4
).then((data) => {
  console.log("base64: ");
  console.log(data);
});
