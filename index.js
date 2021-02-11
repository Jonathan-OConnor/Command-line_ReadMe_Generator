const inquirer = require('inquirer');
const fs = require('fs');

async function promptUser() {
    var answers = await inquirer.prompt([
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
            choices: [`MIT`, `APACHE-2.0`,`GPL-3.0`, `BSD-2-Clause`,`BSD-3-Clause`]
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
    ])
    buildPage(answers)

}

function buildPage(answers) {
    var licenseBadge
    switch(answers.license){
        case "MIT":
            licenseBadge = `[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)`
            break
        case "APACHE-2.0":
            licenseBadge = `[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)`
            break
        case "GPL-3.0":
            licenseBadge= `[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)`
            break
        case "BSD-2-Clause":
            licenseBadge=`[![License](https://img.shields.io/badge/License-BSD%202--Clause-orange.svg)](https://opensource.org/licenses/BSD-2-Clause)`
            break
        case "BSD-3-Clause":
            licenseBadge= `[![License](https://img.shields.io/badge/License-BSD%203--Clause-blue.svg)](https://opensource.org/licenses/BSD-3-Clause)`
            break
    }

    var title = `# ${answers.title} ${licenseBadge}\n`
    var tableOfContents = `## Table of Contents:\n\n[Description](#Description)\n\n[Installation](#Installation-instructions)\n\n[Usage Information](#Usage-Information)\n\n[Contribution Guidelines](#Contribution-Guidelines)\n\n[Test Instructions](#Test-Instructions)\n\n[Contact Information](#Questions)`
    var description = `## Description \n${answers.description}\n`
    var install = `## Installation Instructions \n To install the necessary dependencies, run the following command: \n${answers.install}\n`
    var usage = `## Usage Information \n${answers.usage}\n`
    var license = `## License \n This project is licensed under the ${answers.license} license`
    var contribution = `## Contribution Guidelines \n${answers.contribution}\n`
    var test = `## Test Instructions \n To run tests, run the following command: \n ${answers.test}\n`
    var contact = `## Questions? \nMy GitHub is: github.com/${answers.username} \n\nOr you can email me at: ${answers.email}\n`
    var final = title + "\n" +tableOfContents + "\n" + description + "\n" + install + "\n" + usage + "\n" + license + "\n" + contribution + "\n" + test + "\n" + contact
    fs.writeFileSync("ReadMe.md", final)
}

promptUser()