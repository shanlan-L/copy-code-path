import * as vscode from 'vscode';
import * as path from 'path';

export function activate(context: vscode.ExtensionContext) {
    let disposable = vscode.commands.registerCommand('copy-code-path.copyContext', () => {
        const editor = vscode.window.activeTextEditor;
        
        if (!editor) {
            vscode.window.showWarningMessage('No active editor found.');
            return;
        }

        const document = editor.document;
        const selection = editor.selection;
        
        if (selection.isEmpty) {
            vscode.window.showWarningMessage('Please select some code first.');
            return;
        }

        const filePath = document.uri.fsPath;
        const startLine = selection.start.line + 1;
        const endLine = selection.end.line + 1;
        
        let lineInfo = `${startLine}`;
        if (startLine !== endLine) {
            lineInfo = `${startLine}-${endLine}`;
        }

        // Format to easily paste into AI prompts
        const formatStr = `${filePath}:${lineInfo}`;

        vscode.env.clipboard.writeText(formatStr).then(() => {
            vscode.window.showInformationMessage(`Copied AI context from ${path.basename(filePath)}:${lineInfo}`);
        }, (err: any) => {
            vscode.window.showErrorMessage('Failed to copy text to clipboard.');
        });
    });

    context.subscriptions.push(disposable);
}

export function deactivate() {}
