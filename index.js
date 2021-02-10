const inquirer = require('inquirer');
const fs = require('fs');

async function promptUser() {
    await inquirer.prompt([
        {
            type: 'input',
            message: 'What is your Project Title?',
            name: 'title',
        },
        {
            type: 'input',
            message: 'Write a description of your project: ',
            name: 'description',
        },
        {
            type: 'input',
            message: 'What are the installation instructions for your project?',
            name: 'install',
        },
        {
            type: 'input',
            message: 'What is the usage information for your project?',
            name: 'usage',
        },
        {
            type: 'input',
            message: 'What are the contribution guidelines for your project?',
            name: 'contribution',
        },
        {
            type: 'input',
            message: 'What are the test instructions for your project?',
            name: 'test',
        },
        {
            type: 'list',
            message: 'What license is your project using?',
            name: 'license',
            choices: [`MIT`, `Apache-2.0`,`GPL-3.0`, `BSD-2-Clause`,`BSD-3-Clause`, `BSD-4-Clause`]
        },
        {
            type: 'input',
            message: 'What is your GitHub username?',
            name: 'username',
        },
        {
            type: 'input',
            message: 'What is your email address?',
            name: 'email',
        },
    ]).then(r => buildPage(r))


}

function buildPage(answers) {
    var title = `# ${answers.title}\n`
    var tableOfContents = `## Table of Contents:\n\n[Description](#Description)\n\n[Installation](#Installation-instructions)\n\n[Usage Information](#Usage-Information)\n\n[Contribution Guidelines](#Contribution-Guidelines)\n\n[Test Instructions](#Test-Instructions)\n\n[Contact Information](#Questions)`
    var description = `## Description \n${answers.description}\n`
    var install = `## Installation Instructions \n${answers.install}\n`
    var usage = `## Usage Information \n${answers.usage}\n`
    var contribution = `## Contribution Guidelines \n${answers.contribution}\n`
    var test = `## Test Instructions \n${answers.test}\n`
    var contact = `## Questions? \nMy GitHub is: github.com/${answers.username} \nOr you can email me at: ${answers.email}\n`
    var final = title + "\n" +tableOfContents + "\n" + description + "\n" + install + "\n" + usage + "\n" + contribution + "\n" + test + "\n" + contact
    fs.writeFileSync("TestReadMe.md", final)
}

promptUser()