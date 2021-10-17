import * as fs from 'fs'
import * as vscode from 'vscode'

class AddScreen {

    addScreen(contextPath: string) {
        const projectRoot = vscode.workspace.workspaceFolders![0].uri.fsPath;

        vscode.window.showInputBox({
            prompt: 'Add screen to /src/screens/',
            value: "ScreenName",
            ignoreFocusOut: true
        }).then((input) => {
            const i = input || 'NewScreen';

            try {

                // return if screen already available
                if (fs.existsSync(contextPath + "/" + input)) {
                    this.#showMessage("Screen already available"); return;
                }

                fs.mkdir(contextPath + '/' + input, { recursive: false }, () => {
                    console.log("screen directory reated");
                })

                const fileBasePath = contextPath + '/' + input + "/" + input

                //Screen file

                fs.writeFile(fileBasePath + "Screen.js",
                    `import React, { Component } from 'react'
import { View, } from 'react-native'
                    
import ${input}Styles from './${input}Styles';
                    
class ${input}Screen extends Component {
    render() {
        return (
            <View style={${input}Styles.container}>
                    
            </View>
        )
    }
}
                    
export default ${input}Screen;`,
                    { flag: 'a+' },
                    err => this.#showMessage(err!.message)
                )

                //Styles File

                fs.writeFile(fileBasePath + "Styles.js",
                    `import { StyleSheet } from "react-native";

const ${input}Styles = StyleSheet.create({
    container: {
        flex: 1
    }
})
                    
export default ${input}Styles`,
                    { flag: 'a+' },
                    err => this.#showMessage(err!.message)
                )

                setTimeout(() => {
                    vscode.workspace.openTextDocument(fileBasePath + "Screen.js").then(editor => {
                        vscode.window.showTextDocument(editor, { preview: false })
                    })

                    vscode.workspace.openTextDocument(fileBasePath + "Styles.js").then(editor => {
                        vscode.window.showTextDocument(editor, { preview: false })
                    })
                }, 100);


            }
            catch (err) {
                this.#showMessage("Try again")
            }

        })
    }
    #showMessage(msg: string) {
        vscode.window.showInformationMessage(msg)
    }

}




export default AddScreen