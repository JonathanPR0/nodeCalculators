const inquirer = require('inquirer');
const chalk = require('chalk');

function getOption(start) {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'option',
        message: 'Qual das operações abaixo você deseja realizar?',
        choices: [
          'Soma',
          'Subtração',
          'Multiplicação',
          'Divisão',
          'Potenciação',
          'Raiz Quadrada',
          chalk.red('Sair'),
        ],
      },
    ])
    .then(async (answer) => {
      const operation = answer['option'];
      const values = await operations(operation);

      if (operation === 'Soma') {
        console.log(
          chalk.bgGreen.black(
            ` A soma deu como resultado ${+values[0] + +values[1]} \n\n`,
          ),
        );
        setTimeout(() => {
          return getOption();
        }, 2000);
      } else if (operation === 'Subtração') {
        console.log(
          chalk.bgGreen.black(
            ` A subtração deu como resultado ${values[0] - values[1]} \n\n`,
          ),
        );
        setTimeout(() => {
          return getOption();
        }, 2000);
      } else if (operation === 'Multiplicação') {
        console.log(
          chalk.bgGreen.black(
            ` A multiplicação deu como resultado ${values[0] * values[1]} \n\n`,
          ),
        );
        setTimeout(() => {
          return getOption();
        }, 2000);
      } else if (operation === 'Divisão') {
        console.log(
          chalk.bgGreen.black(
            ` A divisão deu como resultado ${values[0] / values[1]} \n\n`,
          ),
        );
        setTimeout(() => {
          return getOption();
        }, 2000);
      } else if (operation === 'Potenciação') {
        console.log(
          chalk.bgGreen.black(
            ` A potenciação deu como resultado ${values[0] ** values[1]} \n\n`,
          ),
        );
        setTimeout(() => {
          return getOption();
        }, 2000);
      } else if (operation === 'Raiz Quadrada') {
        console.log(
          chalk.bgGreen.black(
            ` A radiciação deu como resultado ${Math.sqrt(values[0])} \n\n`,
          ),
        );
        setTimeout(() => {
          return getOption();
        }, 2000);
      } else {
        console.log(chalk.red('Saindo...\n'));
        setTimeout(() => start(), 1500);
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

async function operations(operation) {
  const values = [];

  // Textos
  if (operation === 'Raiz Quadrada') {
    console.log(
      chalk.yellowBright(
        `\nCerto! Iremos realizar a ${operation.toLowerCase()}, só nos informe o valor da radiciação\n`,
      ),
    );
  } else if (operation !== chalk.red('Sair')) {
    console.log(
      chalk.yellowBright(
        `\nCerto! Iremos realizar a ${operation.toLowerCase()}, só nos informe os valores abaixo:`,
      ),
    );
  }

  // Operações
  if (operation === 'Potenciação') {
    await inquirer
      .prompt([
        {
          name: 'base',
          message: `Qual o número da base?\n`,
        },
      ])
      .then((answer) => {
        values.push(Number.parseFloat(answer['base'].replace(',', '.')));
      });

    await inquirer
      .prompt([
        {
          name: 'exponent',
          message: `Qual o expoente?\n`,
        },
      ])
      .then((answer) => {
        values.push(Number.parseFloat(answer['exponent'].replace(',', '.')));
      });
  } else if (operation === 'Raiz Quadrada') {
    await inquirer
      .prompt([
        {
          name: 'squareRoot',
          message: `Qual o valor que você deseja calcular a raiz quadrada?\n`,
        },
      ])
      .then((answer) => {
        values.push(Number.parseFloat(answer['squareRoot'].replace(',', '.')));
      });
  } else if (operation !== chalk.red('Sair')) {
    await inquirer
      .prompt([
        {
          name: 'firstValue',
          message: `Qual o primeiro valor na ${operation.toLowerCase()}?\n`,
        },
      ])
      .then((answer) => {
        values.push(Number.parseFloat(answer['firstValue'].replace(',', '.')));
      });

    await inquirer
      .prompt([
        {
          name: 'secondValue',
          message: `Qual o segundo valor na ${operation.toLowerCase()}?\n`,
        },
      ])
      .then((answer) => {
        values.push(Number.parseFloat(answer['secondValue'].replace(',', '.')));
      });
  }
  return values;
}

module.exports = getOption;
