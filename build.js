import fs from "fs";
import path from "path";

const SRC_DIR = "src";
const OUTPUT_FILE = "index.html";

// 构建目录树
function buildTree(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    return entries.map((entry) => {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            return {
                type: "dir",
                name: entry.name,
                children: buildTree(fullPath),
            };
        } else if (entry.isFile() && entry.name.endsWith(".md")) {
            return {
                type: "file",
                name: entry.name,
                path: path.relative(SRC_DIR, fullPath),
            };
        }
    }).filter(Boolean);
}

// 渲染目录树 HTML
function renderTree(tree, basePath = SRC_DIR) {
    let html = "<ul>";
    for (const node of tree) {
        if (node.type === "dir") {
            html += `<li class="folder">${node.name}${renderTree(node.children, basePath)}</li>`;
        } else if (node.type === "file") {
            const name = path.basename(node.name, ".md");
            html += `<li class="file" data-path="${basePath}/${node.path}">${name}</li>`;
        }
    }
    html += "</ul>";
    return html;
}

function buildIndexHtml(tree) {
    const listHtml = renderTree(tree);
    return `<!DOCTYPE html>
<html lang="zh">
<head>
  <meta charset="UTF-8">
  <title>我的博客</title>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/highlight.js/styles/github.min.css">
  <style>
    body {
      font-family: "Segoe UI", Helvetica, Arial, sans-serif;
      display: flex;
      height: 100vh;
      margin: 0;
      background: #f9f9f9;
      color: #333;
    }
    #sidebar {
      width: 260px;
      overflow-y: auto;
      border-right: 1px solid #ddd;
      padding: 1em;
      background: #fafafa;
    }
    #content {
      flex: 1;
      padding: 2em;
      overflow-y: auto;
      background: #fff;
    }
    #sidebar h2 { margin-top: 0; font-size: 1.2em; }
    ul { list-style-type: none; padding-left: 1em; }
    li { margin: 0.3em 0; cursor: pointer; }
    li.folder::before { content: "📂 "; }
    li.file::before { content: "📄 "; }
    .collapsed > ul { display: none; }
    li.file { color: #0077cc; }
    li.file:hover { text-decoration: underline; }

    /* 内容区样式 */
    #content h1, #content h2, #content h3 {
      border-bottom: 1px solid #eee;
      padding-bottom: 0.3em;
      margin-top: 1.2em;
    }
    #content p { line-height: 1.7; margin: 1em 0; }
    #content pre {
      background: #f6f8fa;
      padding: 1em;
      border-radius: 6px;
      overflow-x: auto;
    }
    #content code { font-family: monospace; }
    #content blockquote {
      border-left: 4px solid #ddd;
      padding-left: 1em;
      color: #555;
      margin: 1em 0;
    }

    /* ====== Dark 模式 ====== */
    @media (prefers-color-scheme: dark) {
      body { background: #1e1e1e; color: #ddd; }
      #sidebar { background: #252526; border-right: 1px solid #333; }
      #content { background: #1e1e1e; }
      li.file { color: #4ea1ff; }
      #content h1, #content h2, #content h3 {
        border-bottom: 1px solid #444;
      }
      #content pre {
        background: #2d2d2d;
      }
      #content blockquote {
        border-left-color: #555;
        color: #bbb;
      }
    }
  </style>
</head>
<body>
  <div id="sidebar">
    <h2>📚 博客目录</h2>
    ${listHtml}
  </div>
  <div id="content">
    <h2>欢迎</h2>
    <p>请选择左侧文章阅读。</p>
  </div>

  <!-- 引入 marked.js -->
  <script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
  <!-- 引入 highlight.js -->
  <script src="https://cdn.jsdelivr.net/npm/highlight.js/lib/common.min.js"></script>
  <script>
    marked.setOptions({
      highlight: function(code, lang) {
        return hljs.highlightAuto(code).value;
      }
    });

    // 折叠/展开目录
    document.querySelectorAll("li.folder").forEach(folder => {
      folder.addEventListener("click", (e) => {
        if (e.target === folder) {
          folder.classList.toggle("collapsed");
        }
      });
      folder.classList.add("collapsed"); // 默认收起
    });

    // 点击文件 → 加载并渲染 Markdown
    document.querySelectorAll("li.file").forEach(file => {
      file.addEventListener("click", async () => {
        const filePath = file.getAttribute("data-path");
        const res = await fetch(filePath);
        const text = await res.text();
        document.getElementById("content").innerHTML = marked.parse(text);
        document.querySelectorAll("pre code").forEach((el) => {
          hljs.highlightElement(el);
        });
      });
    });
  </script>
</body>
</html>`;
}

const tree = buildTree(SRC_DIR);
const html = buildIndexHtml(tree);
fs.writeFileSync(OUTPUT_FILE, html, "utf-8");
console.log(`✅ 已生成 ${OUTPUT_FILE}`);
