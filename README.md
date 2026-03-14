# Copy Code Path

Copy Code Path 是一款专为 AI 命令行工具 (如 OpenCode, Claude CLI, Gemini CLI 等) 使用者设计的轻量级 VS Code 插件。

它可以帮助你在代码审查或编写 Prompt 时，一键复制当前选中代码的**绝对文件路径**及**对应行号**。这样你就可以精确地将需要 AI 关注的上下文传递给命令行工具，而无需繁琐地手动拼接路径和行号。

## 核心功能

- **精准定位**：选中一段代码后，可通过快捷键、右键或命令面板，一键复制当前文件的绝对路径和所选行号范围。
- **极简输出**：复制的结果非常简洁（如：`/your/absolute/path/src/app.ts:15-25`），直接粘贴进终端或 Prompt 中，格式完美适配绝大多数 AI 命令行工具的上下文读取格式。
- **单行/多行支持**：如果只选中了单行，输出为单行号（如 `:15`）；如果选中了多行，输出为行号范围（如 `:15-25`）。

## 快捷键

默认绑定了 **`Cmd+Shift+C`** (Mac) 或 **`Ctrl+Shift+C`** (Windows/Linux) 作为快捷键。

*注意：如果你的环境由于某种原因快捷键冲突，可以在 VS Code 的快捷键设置 (Keyboard Shortcuts) 中搜索 `Copy Code Path` 并将其修改为你喜欢的组合键。*

## 安装方式

由于这是一个本地构建的 VSIX 插件，你可以通过终端直接安装，或者在 VS Code 的扩展界面手动安装。

### 方法 1：通过终端安装 (推荐)

如果你在插件源码的父目录下，可以直接在终端运行以下命令：

```bash
code --install-extension copy-code-path/copy-code-path-1.0.0.vsix --force
```

### 方法 2：通过 VS Code UI 安装

1. 打开 VS Code 的 **扩展 (Extensions)** 侧边栏 (快捷键 `Cmd+Shift+X` 或 `Ctrl+Shift+X`)。
2. 点击侧边栏右上角的 **...** (Views and More Actions) 图标。
3. 选择 **Install from VSIX...**。
4. 浏览并选中该项目目录下的 `copy-code-path-1.0.0.vsix` 文件进行安装。

## 使用方式

1. 在 VS Code 中打开任意代码文件。
2. **选中**你想要让 AI 分析或修改的那一行（或多行）代码。
3. 按下快捷键 **`Cmd+Shift+C`** (Mac) / **`Ctrl+Shift+C`** (Win)。
   *(或者，你也可以右键点击选中的代码区域，选择 "Copy Code Path & Lines")*
4. 此时你的剪贴板中已经包含了一个字符串，格式如下：
   `/path/to/your/project/src/index.ts:42-50`
5. 直接在你的 AI 命令行工具中粘贴这个字符串即可精确传达上下文。

## 如何编译与构建 (开发必看)

如果你从 Github 拉取了源码并想自己编译，或者修改了 `src/extension.ts` 想要重新自定义格式，请按照以下步骤操作：

1. **环境准备**：确保你的电脑上安装了 [Node.js](https://nodejs.org/)。
2. **进入项目目录**：打开终端并进入项目根目录：
   ```bash
   cd copy-code-path
   ```
3. **安装依赖**：
   ```bash
   npm install
   ```
4. **编译 TypeScript 源码**：
   ```bash
   npm run compile
   ```
5. **打包为 VSIX 扩展文件**：
   我们使用 `vsce` 工具打包。你可以直接运行：
   ```bash
   npx @vscode/vsce package --allow-missing-repository
   ```
   *注意：如果遇到 repository 缺失的警告，加上 `--allow-missing-repository` 参数即可忽略。*
6. **重新安装**：
   打包完成后，目录下会生成一个新的 `copy-code-path-x.x.x.vsix` 文件，按照上方【安装方式】覆盖安装即可。
