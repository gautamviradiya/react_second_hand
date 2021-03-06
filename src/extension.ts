// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import AddScreen from './AddScreen';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "React-native second hand" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('gautamv.addScreen', (file: vscode.Uri) => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		const projectRoot = vscode.workspace?.workspaceFolders![0].uri.fsPath;
		let addScreen = new AddScreen();

		addScreen.addScreen(file ? file.fsPath : projectRoot)
		//vscode.window.showInformationMessage('Hello World from React native second hand!');
	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() { }
