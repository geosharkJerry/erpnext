# Cloudflare Pages 自动部署设置指南
# Hướng dẫn cài đặt triển khai tự động Cloudflare Pages

---

## 概述 / Tổng quan

本指南将帮助你完成 3 个步骤：
1. **获取 Cloudflare API Token 和 Account ID**
2. **在 GitHub 仓库配置 Secrets**
3. **将 workflow 文件添加到仓库**

---

## 第一步：获取 Cloudflare 凭证
## Bước 1: Lấy thông tin xác thực Cloudflare

### 1.1 获取 Account ID（账户ID）

1. 登录 [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. 在左侧边栏点击任意一个域名（或直接进入 Workers & Pages）
3. 在页面右侧的 **API** 区域，找到 **Account ID**
4. 复制这个 Account ID（32位十六进制字符串）

> **快捷方式**：直接访问 https://dash.cloudflare.com/ ，URL 中 `/` 后面的就是你的 Account ID
> 例如: `https://dash.cloudflare.com/abc123def456` → Account ID 就是 `abc123def456`

### 1.2 创建 API Token

1. 访问 [Cloudflare API Tokens](https://dash.cloudflare.com/profile/api-tokens)
   - 或者：点击右上角头像 → **My Profile** → 左侧 **API Tokens**

2. 点击 **Create Token** 按钮

3. 选择 **Create Custom Token**（自定义令牌），点击 **Get started**

4. 填写以下配置：

   | 设置项 | 值 |
   |--------|-----|
   | **Token name** | `erpnext-admin-deploy`（自定义名称） |
   | **Permissions** | |
   | - Account / Cloudflare Pages | **Edit** |
   | - Account / Account Settings | **Read** |
   | **Account Resources** | |
   | - Include | **你的账户名** 或 **All accounts** |

   > 详细权限设置：
   > - 第一行权限：Account → **Cloudflare Pages** → **Edit**
   > - 第二行权限（可选）：Account → **Account Settings** → **Read**

5. 点击 **Continue to summary**

6. 确认权限无误后，点击 **Create Token**

7. **⚠️ 重要：立即复制并保存 Token！此页面关闭后无法再次查看！**
   - Token 格式类似: `Bx_XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX`

---

## 第二步：在 GitHub 配置 Secrets
## Bước 2: Cấu hình Secrets trên GitHub

1. 打开你的 GitHub 仓库：
   **https://github.com/geosharkJerry/erpnext**

2. 点击仓库页面顶部的 **Settings**（设置）标签

3. 在左侧边栏找到 **Secrets and variables** → 点击 **Actions**

4. 点击 **New repository secret** 按钮，添加两个 Secret：

### Secret 1: CLOUDFLARE_API_TOKEN

| 字段 | 值 |
|------|-----|
| **Name** | `CLOUDFLARE_API_TOKEN` |
| **Secret** | 粘贴你在第一步获取的 API Token |

点击 **Add secret**

### Secret 2: CLOUDFLARE_ACCOUNT_ID

| 字段 | 值 |
|------|-----|
| **Name** | `CLOUDFLARE_ACCOUNT_ID` |
| **Secret** | 粘贴你的 Cloudflare Account ID |

点击 **Add secret**

### 验证

添加完成后，在 Settings → Secrets → Actions 页面应该能看到：
```
CLOUDFLARE_ACCOUNT_ID    Updated just now
CLOUDFLARE_API_TOKEN     Updated just now
```

---

## 第三步：将 Workflow 文件添加到仓库
## Bước 3: Thêm file Workflow vào kho lưu trữ

由于 GitHub App 权限限制，workflow 文件需要你手动添加。有两种方式：

### 方式 A：通过 GitHub 网页界面添加（推荐）

1. 打开 https://github.com/geosharkJerry/erpnext

2. 切换到 `genspark_ai_developer` 分支
   - 点击分支下拉菜单 → 选择 `genspark_ai_developer`

3. 点击 **Add file** → **Create new file**

4. 在文件名输入框中输入：
   ```
   .github/workflows/deploy-admin-panel.yml
   ```
   （输入 `.github/` 时会自动创建目录）

5. 将以下内容粘贴到编辑器中：

```yaml
name: Deploy Admin Panel to Cloudflare Pages

on:
  push:
    branches:
      - main
      - develop
      - genspark_ai_developer
    paths:
      - 'admin-panel/**'
  pull_request:
    branches:
      - main
      - develop
    paths:
      - 'admin-panel/**'
  workflow_dispatch:

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    name: Build & Deploy to Cloudflare Pages
    permissions:
      contents: read
      deployments: write
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
          cache-dependency-path: admin-panel/package-lock.json

      - name: Install Dependencies
        working-directory: admin-panel
        run: npm ci

      - name: Build
        working-directory: admin-panel
        run: npm run build

      - name: Deploy to Cloudflare Pages
        uses: cloudflare/wrangler-action@v3
        with:
          apiToken: ${{ secrets.CLOUDFLARE_API_TOKEN }}
          accountId: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
          command: pages deploy admin-panel/dist --project-name=erpnext-admin-panel --branch=${{ github.ref_name }}
```

6. 在页面底部 **Commit changes** 区域：
   - Commit message: `ci: add Cloudflare Pages deployment workflow`
   - 选择 **Commit directly to the `genspark_ai_developer` branch**
   - 点击 **Commit changes**

### 方式 B：通过本地 Git 添加

```bash
# 克隆仓库（如果还没有）
git clone https://github.com/geosharkJerry/erpnext.git
cd erpnext

# 切换到开发分支
git checkout genspark_ai_developer
git pull origin genspark_ai_developer

# 创建 workflow 文件（内容同方式A）
mkdir -p .github/workflows
# 将上面的 YAML 内容保存到 .github/workflows/deploy-admin-panel.yml

# 如果 .gitignore 中有屏蔽该文件，需要移除
# 编辑 .gitignore，删除这一行：
# .github/workflows/deploy-admin-panel.yml

# 提交并推送
git add .github/workflows/deploy-admin-panel.yml
git commit -m "ci: add Cloudflare Pages deployment workflow"
git push origin genspark_ai_developer
```

---

## 第四步：触发部署
## Bước 4: Kích hoạt triển khai

### 自动触发
Workflow 会在以下情况自动运行：
- 向 `main`、`develop`、`genspark_ai_developer` 分支推送 `admin-panel/` 目录下的更改
- 针对 `main` 或 `develop` 的 PR 包含 `admin-panel/` 下的更改

### 手动触发
1. 进入 GitHub 仓库 → **Actions** 标签
2. 左侧选择 **Deploy Admin Panel to Cloudflare Pages**
3. 点击右侧 **Run workflow** 按钮
4. 选择分支 → 点击 **Run workflow**

### 查看部署状态
1. GitHub → **Actions** 标签可以看到运行状态
2. Cloudflare Dashboard → **Workers & Pages** → `erpnext-admin-panel` 项目可以看到部署详情

---

## 第五步：访问部署的网站
## Bước 5: Truy cập website đã triển khai

部署成功后，可以通过以下地址访问：

- **生产环境 (main 分支)**:
  `https://erpnext-admin-panel.pages.dev`

- **预览环境 (其他分支)**:
  `https://<branch-name>.erpnext-admin-panel.pages.dev`

- **自定义域名** (可选):
  在 Cloudflare Dashboard → Pages → 项目设置 → Custom domains 中配置

---

## 常见问题 / FAQ

### Q: 部署失败，提示 "Project not found"
**A**: 首次部署时 Cloudflare Pages 会自动创建项目。如果仍然失败，手动在 Cloudflare Dashboard → Workers & Pages 中创建一个名为 `erpnext-admin-panel` 的项目。

### Q: 部署成功但页面空白
**A**: 检查 `admin-panel/public/_redirects` 文件是否存在，内容应为 `/* /index.html 200`（SPA 路由支持）。

### Q: API Token 权限不足
**A**: 确保 Token 至少有 `Account / Cloudflare Pages / Edit` 权限。

### Q: 如何更换域名？
**A**: Cloudflare Dashboard → Workers & Pages → erpnext-admin-panel → Custom domains → Add domain

---

## 快速检查清单 / Checklist

- [ ] Cloudflare Account ID 已获取
- [ ] Cloudflare API Token 已创建（包含 Pages Edit 权限）
- [ ] GitHub Secret `CLOUDFLARE_API_TOKEN` 已添加
- [ ] GitHub Secret `CLOUDFLARE_ACCOUNT_ID` 已添加
- [ ] `.github/workflows/deploy-admin-panel.yml` 已添加到仓库
- [ ] `.gitignore` 中的 workflow 屏蔽行已移除（如使用方式B）
- [ ] 首次部署成功
