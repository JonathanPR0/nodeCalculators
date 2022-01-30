const inquirer = require('inquirer');
const chalk = require('chalk');

function normalCalculator(returnFunction) {
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
          'Voltar',
        ],
      },
    ])
    .then(async (answer) => {
      const operation = answer['option'];
      const values = await operations(operation);

      switch (operation) {
        case 'Soma':
          console.log(
            chalk.bgGreen.black(
              ` A soma deu como resultado ${+values[0] + +values[1]} \n\n`,
            ),
          );
          return normalCalculator();
          break;
        case 'Subtração':
          console.log(
            chalk.bgGreen.black(
              ` A subtração deu como resultado ${values[0] - values[1]} \n\n`,
            ),
          );
          return normalCalculator();
          break;
        case 'Multiplicação':
          console.log(
            chalk.bgGreen.black(
              ` A multiplicação deu como resultado ${
                values[0] * values[1]
              } \n\n`,
            ),
          );
          return normalCalculator();
          break;
        case 'Divisão':
          console.log(
            chalk.bgGreen.black(
              ` A divisão deu como resultado ${values[0] / values[1]} \n\n`,
            ),
          );
          return normalCalculator();
          break;
        case 'Potenciação':
          console.log(
            chalk.bgGreen.black(
              ` A potenciação deu como resultado ${
                values[0] ** values[1]
              } \n\n`,
            ),
          );
          return normalCalculator();
          break;
        case 'Raiz Quadrada':
          console.log(
            chalk.bgGreen.black(
              ` A radiciação deu como resultado ${Math.sqrt(values[0])} \n\n`,
            ),
          );
          return normalCalculator();

          break;
        default:
          return returnFunction();
          break;
      }
    })
    .catch((err) => {
      console.log(err);
    });

  async function operations(operation) {
    const values = [];

    if (operation === 'Raiz Quadrada') {
      console.log(
        chalk.yellowBright(
          `\nCerto! Iremos realizar a ${operation.toLowerCase()}, só nos informe o valor da radiciação\n`,
        ),
      );
    } else {
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
          values.push(
            Number.parseFloat(answer['squareRoot'].replace(',', '.')),
          );
        });
    } else if ('Voltar') {
      return true;
    } else {
      await inquirer
        .prompt([
          {
            name: 'firstValue',
            message: `Qual o primeiro valor na ${operation.toLowerCase()}?\n`,
          },
        ])
        .then((answer) => {
          values.push(
            Number.parseFloat(answer['firstValue'].replace(',', '.')),
          );
        });

      await inquirer
        .prompt([
          {
            name: 'secondValue',
            message: `Qual o segundo valor na ${operation.toLowerCase()}?\n`,
          },
        ])
        .then((answer) => {
          values.push(
            Number.parseFloat(answer['secondValue'].replace(',', '.')),
          );
        });
    }

    return values;
  }
}

normalCalculator();
