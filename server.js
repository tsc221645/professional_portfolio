const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");

const PORT = process.env.PORT || 3000;
const root = path.join(__dirname, "dist");
const projects = [
  {
    title: "RoadGuard",
    type: "Python / computer vision",
    tags: ["Python", "Computer Vision", "AI"],
    description:
      "A computer vision and artificial intelligence project focused on road safety.",
    url: "https://github.com/tsc221645/roadguard",
  },
  {
    title: "PredictGuard",
    type: "Python / deep learning",
    tags: ["Python", "Deep Learning", "Computer Vision"],
    description:
      "A deep learning project focused on predictive analysis and intelligent systems.",
    url: "https://github.com/tsc221645/deep_learning_proyecto_final",
  },
  {
    title: "Screen Saver",
    type: "Creative coding",
    tags: ["Python", "Pygame", "Pixel Art"],
    description:
      "A pixel-art visual experience with seasonal scenes, animated details, and a playful atmosphere.",
    url: "https://github.com/Cisco890/proyecto1_paralelas",
  },
  {
    title: "ASL using CPU and CUDA",
    type: "Python / parallel computing",
    tags: ["Python", "Parallel Computing", "Algorithms"],
    description:
      "A parallel computing project focused on algorithms, performance, and distributed execution.",
    url: "https://github.com/tsc221645/paralela_proyecto_3",
  },
];
function send(res, status, body, type = "application/json") {
  res.writeHead(status, {
    "Content-Type": `${type}; charset=utf-8`,
    "Access-Control-Allow-Origin": "*",
  });
  res.end(type === "application/json" ? JSON.stringify(body) : body);
}
function body(req) {
  return new Promise((resolve, reject) => {
    let raw = "";
    req.on("data", (chunk) => (raw += chunk));
    req.on("end", () => {
      try {
        resolve(JSON.parse(raw || "{}"));
      } catch {
        reject(new Error("invalid json"));
      }
    });
    req.on("error", reject);
  });
}
function staticFile(res, pathname) {
  const file = pathname === "/" ? "/index.html" : pathname;
  const full = path.join(root, path.normalize(file).replace(/^[/\\]+/, ""));
  if (!full.startsWith(root) || !fs.existsSync(full))
    return send(res, 404, { error: "Not found" });
  const types = {
    ".html": "text/html",
    ".css": "text/css",
    ".js": "text/javascript",
  };
  send(
    res,
    200,
    fs.readFileSync(full),
    types[path.extname(full)] || "application/octet-stream",
  );
}
const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  if (req.method === "GET" && url.pathname === "/api/projects")
    return send(res, 200, projects);
  if (req.method === "POST" && url.pathname === "/api/contact") {
    try {
      const data = await body(req);
      if (!data.name || !data.email || !data.message)
        return send(res, 400, { error: "Please complete all fields." });
      console.log(`[contact] ${data.name} <${data.email}>: ${data.message}`);
      return send(res, 201, { ok: true });
    } catch {
      return send(res, 400, { error: "Invalid request." });
    }
  }
  if (req.method === "GET") return staticFile(res, url.pathname);
  send(res, 405, { error: "Method not allowed" });
});
server.listen(PORT, () =>
  console.log(`Portfolio running at http://localhost:${PORT}`),
);
