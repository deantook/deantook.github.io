import fs from "fs";
import path from "path";

const SRC_DIR = "src";
const INDEX_FILE = "index.html";
const HOME_FILE = "home.html";
const PAGE_SIZE = 10;

// ====== 构建目录树 ======
function buildTree(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    return entries.map(entry => {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            return { type: "dir", name: entry.name, children: buildTree(fullPath) };
        } else if (entry.isFile() && entry.name.endsWith(".md")) {
            return { type: "file", name: entry.name, path: path.relative(SRC_DIR, fullPath) };
        }
    }).filter(Boolean);
}

// ====== 渲染目录树 HTML ======
function renderTree(tree, basePath = SRC_DIR) {
    let html = "<ul>";
    for (const node of tree) {
        if (node.type === "dir") {
            html += `<li class="folder">${node.name}${renderTree(node.children, basePath)}</li>`;
        } else if (node.type === "file") {
            const name = path.basename(node.name, ".md");
            html += `<li class="file"><a href="${basePath}/${node.path}" target="_blank">${name}</a></li>`;
        }
    }
    html += "</ul>";
    return html;
}

// ====== 顶部导航 HTML ======
function navHtml(current) {
    return `<nav style="display:flex; justify-content:center; gap:2em; padding:1em; border-bottom:1px solid #ddd; background:#fafafa;">
    <a href="home.html" style="text-decoration:none; color:${current==='home'?'#0077cc':'inherit'}; font-weight:${current==='home'?'bold':'normal'}">首页</a>
    <a href="index.html" style="text-decoration:none; color:${current==='index'?'#0077cc':'inherit'}; font-weight:${current==='index'?'bold':'normal'}">目录</a>
  </nav>`;
}

// ====== 生成 index.html ======
function buildIndexHtml(tree) {
    const listHtml = renderTree(tree);
    return `<!DOCTYPE html>
<html lang="zh">
<head>
<meta charset="UTF-8">
<title>博客目录</title>
<style>
  body { font-family:"Segoe UI", Helvetica, Arial, sans-serif; display:flex; justify-content:center; padding:2em; background:#f9f9f9; color:#333; margin:0; }
  #container { max-width:800px; width:100%; }
  h1 { text-align:center; }
  ul { list-style:none; padding-left:1em; text-align:left; }
  li { margin:0.3em 0; cursor:pointer; }
  li.folder::before { content:"📂 "; }
  li.file::before { content:"📄 "; color:#0077cc; }
  li.file a { text-decoration:none; color:inherit; }
  li.file a:hover { text-decoration:underline; }
  .collapsed > ul { display:none; }
  @media (prefers-color-scheme: dark) {
    body { background:#1e1e1e; color:#ddd; }
    nav { background:#252526; border-bottom:1px solid #333; }
    li.file::before { color:#4ea1ff; }
  }
</style>
</head>
<body>
<div id="container">
${navHtml('index')}
<h1>📚 博客目录</h1>
${listHtml}
</div>
<script>
document.querySelectorAll("li.folder").forEach(f=>{
  f.addEventListener("click", e=>{ if(e.target===f) f.classList.toggle("collapsed"); });
  f.classList.add("collapsed");
});
</script>
</body>
</html>`;
}

// ====== 获取所有文章 ======
function getAllArticles(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    let articles = [];
    for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            articles = articles.concat(getAllArticles(fullPath));
        } else if (entry.isFile() && entry.name.endsWith(".md")) {
            const stats = fs.statSync(fullPath);
            articles.push({
                title: path.basename(entry.name, ".md"),
                path: path.relative(SRC_DIR, fullPath),
                mtime: stats.mtime.getTime()
            });
        }
    }
    return articles;
}

// ====== 生成 home.html ======
function buildHomeHtml(articles) {
    articles.sort((a,b)=>b.mtime - a.mtime);
    return `<!DOCTYPE html>
<html lang="zh">
<head>
<meta charset="UTF-8">
<title>博客首页</title>
<style>
  body { font-family:"Segoe UI", Helvetica, Arial, sans-serif; background:#f9f9f9; color:#333; margin:0; padding:2em; }
  h1 { text-align:center; }
  #articles { display:flex; flex-direction:column; max-width:600px; margin:2em auto; gap:1em; }
  .card { background:#fff; padding:1em; border-radius:6px; box-shadow:0 0 6px rgba(0,0,0,0.1); transition:0.2s; cursor:pointer; }
  .card:hover { box-shadow:0 2px 10px rgba(0,0,0,0.2); }
  .title { font-weight:bold; margin-bottom:0.5em; }
  .date { font-size:0.85em; color:#666; }
  .pagination { text-align:center; margin:2em 0; }
  .page-btn { margin:0 0.2em; padding:0.3em 0.6em; border:none; border-radius:4px; cursor:pointer; background:#0077cc; color:#fff; }
  .page-btn.active { background:#005fa3; }
  @media (prefers-color-scheme: dark) {
    body { background:#1e1e1e; color:#ddd; }
    .card { background:#2d2d2d; box-shadow:none; }
    .card:hover { box-shadow:0 2px 10px rgba(255,255,255,0.1); }
    .date { color:#aaa; }
    .page-btn { background:#4ea1ff; color:#1e1e1e; }
    .page-btn.active { background:#3a90e0; }
    nav { background:#252526; border-bottom:1px solid #333; }
  }
</style>
</head>
<body>
${navHtml('home')}
<h1>博客首页</h1>
<div id="articles"></div>
<div class="pagination" id="pagination"></div>
<script>
const articles=${JSON.stringify(articles)};
const PAGE_SIZE=${PAGE_SIZE};
let currentPage=1;

function renderPage(page){
  const start=(page-1)*PAGE_SIZE;
  const end=start+PAGE_SIZE;
  const container=document.getElementById("articles");
  container.innerHTML="";
  articles.slice(start,end).forEach(a=>{
    const card=document.createElement("div");
    card.className="card";
    card.innerHTML=\`<div class="title">\${a.title}</div><div class="date">\${new Date(a.mtime).toLocaleString()}</div>\`;
    card.onclick=()=>{ window.open("src/"+a.path,"_blank"); }
    container.appendChild(card);
  });

  const totalPages=Math.ceil(articles.length/PAGE_SIZE);
  const pagination=document.getElementById("pagination");
  pagination.innerHTML="";
  for(let i=1;i<=totalPages;i++){
    const btn=document.createElement("button");
    btn.className="page-btn"+(i===page?" active":"");
    btn.textContent=i;
    btn.onclick=()=>{ currentPage=i; renderPage(i); };
    pagination.appendChild(btn);
  }
}

renderPage(currentPage);
</script>
</body>
</html>`;
}

// ====== 生成文件 ======
const tree = buildTree(SRC_DIR);
fs.writeFileSync(INDEX_FILE, buildIndexHtml(tree), "utf-8");
console.log("✅ 已生成 "+INDEX_FILE);

const articles = getAllArticles(SRC_DIR);
fs.writeFileSync(HOME_FILE, buildHomeHtml(articles), "utf-8");
console.log("✅ 已生成 "+HOME_FILE);
