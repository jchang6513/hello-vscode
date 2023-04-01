// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

let myStatusBarItem: vscode.StatusBarItem;
const commandId = 'hello-vscode.hello-clock'
let viewHour12 = false;

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate({ subscriptions }: vscode.ExtensionContext) {
	subscriptions.push(vscode.commands.registerCommand(commandId, () => {
		vscode.window.showInformationMessage('Enable Clock');
	}));

	myStatusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 0);
	myStatusBarItem.command = commandId;
	subscriptions.push(myStatusBarItem);

	vscode.workspace.onDidChangeConfiguration((_) => {
		updateViewHour12();
	});

	updateViewHour12();
	updateStatusBarItem();
}

function updateStatusBarItem(): void {
	myStatusBarItem.text = new Date().toLocaleTimeString(
		[],
		{
			hour: '2-digit',
			minute: "2-digit",
			second: "2-digit",
			hour12: viewHour12
		}
	);
	myStatusBarItem.show();

	setTimeout(() => {
		updateStatusBarItem()
	}, 1000)
}

const updateViewHour12 = () => {
	viewHour12 = Boolean(vscode.workspace.getConfiguration().get('conf.view.hour12'));
}

// This method is called when your extension is deactivated
export function deactivate() {}
