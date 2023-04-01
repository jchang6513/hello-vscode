// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

let myStatusBarItem: vscode.StatusBarItem;

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate({ subscriptions }: vscode.ExtensionContext) {
	const myCommandId = 'hello-vscode.hellovscode'
	subscriptions.push(vscode.commands.registerCommand(myCommandId, () => {
		vscode.window.showInformationMessage('activate Hello VS Code!');
	}));

	myStatusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 10000);
	myStatusBarItem.command = myCommandId;
	subscriptions.push(myStatusBarItem);

	updateStatusBarItem();
}

function updateStatusBarItem(): void {
	myStatusBarItem.text = 'Hello VS Code!';
	myStatusBarItem.show();
}

// This method is called when your extension is deactivated
export function deactivate() {}
