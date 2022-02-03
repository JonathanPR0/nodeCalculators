const inquirer = require('inquirer');
const chalk = require('chalk');
const normalCalculator = require('./functions/normalCalculator');

function start() {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'option',
        message: `${chalk.blue(
          'Seja bem vindo(a)!',
        )} Qual dessas funções você deseja usar?`,
        choices: ['Calculadora normal', 'Cancelar'],
      },
    ])
    .then((answer) => {
      const operation = answer['option'];
      const normal = new normalCalculator('inquirer', 'chalk');

      if (operation === 'Calculadora normal') {
        normal.getOption();
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

start();
// normalCalculator(inquirer, chalk);
