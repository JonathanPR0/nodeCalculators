const inquirer = require('inquirer');
const chalk = require('chalk');
const normalCalculator = require('./functions/normalCalculator');
const imc = require('./functions/imc');

function start() {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'option',
        message: `${chalk.blue(
          'Seja bem vindo(a)!',
        )} Qual dessas funções você deseja usar?`,
        choices: [
          'Calculadora normal',
          'Calculadora de IMC',
          chalk.red('Cancelar'),
        ],
      },
    ])
    .then((answer) => {
      const operation = answer['option'];

      if (operation === 'Calculadora normal') {
        normalCalculator(start);
      } else if (operation === 'Calculadora de IMC') {
        imc(start);
      } else {
        return null;
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

start();
// normalCalculator(inquirer, chalk);
