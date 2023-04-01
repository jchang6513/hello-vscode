// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

let myStatusBarItem: vscode.StatusBarItem;
const commandId = 'hello-vscode.hello-clock'

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate({ subscriptions }: vscode.ExtensionContext) {
	subscriptions.push(vscode.commands.registerCommand(commandId, () => {
		vscode.window.showInformationMessage('Enable Clock');
	}));

	myStatusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 0);
	myStatusBarItem.command = commandId;
	subscriptions.push(myStatusBarItem);

	updateStatusBarItem();
}

function updateStatusBarItem(): void {
	myStatusBarItem.text = new Date().toLocaleTimeString(
		[],
		{
			hour: '2-digit',
			minute: "2-digit",
			second: "2-digit",
			hour12: false
		}
	);
	myStatusBarItem.show();

	setTimeout(() => {
		updateStatusBarItem()
	}, 1000)
}

// This method is called when your extension is deactivated
export function deactivate() {}
