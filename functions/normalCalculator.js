module.exports = class normalCalculator {
  constructor(inquirer, chalk) {
    this.inquirer = require(inquirer);
    this.chalk = require(chalk);
  }
  getOption() {
    this.inquirer
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
          ],
        },
      ])
      .then(async (answer) => {
        const operation = answer['option'];
        const values = await this.operations(operation);
        console.log(this.inquirer);

        if (operation === 'Soma') {
          console.log(
            this.chalk.bgGreen.black(
              ` A soma deu como resultado ${+values[0] + +values[1]} \n\n`,
            ),
          );
          return this.getOption();
        } else if (operation === 'Subtração') {
          console.log(
            this.chalk.bgGreen.black(
              ` A subtração deu como resultado ${values[0] - values[1]} \n\n`,
            ),
          );
          return this.getOption();
        } else if (operation === 'Multiplicação') {
          console.log(
            this.chalk.bgGreen.black(
              ` A multiplicação deu como resultado ${
                values[0] * values[1]
              } \n\n`,
            ),
          );
          return this.getOption();
        } else if (operation === 'Divisão') {
          console.log(
            this.chalk.bgGreen.black(
              ` A divisão deu como resultado ${values[0] / values[1]} \n\n`,
            ),
          );
          return this.getOption();
        } else if (operation === 'Potenciação') {
          console.log(
            this.chalk.bgGreen.black(
              ` A potenciação deu como resultado ${
                values[0] ** values[1]
              } \n\n`,
            ),
          );
          return this.getOption();
        } else if (operation === 'Raiz Quadrada') {
          console.log(
            this.chalk.bgGreen.black(
              ` A radiciação deu como resultado ${Math.sqrt(values[0])} \n\n`,
            ),
          );
          return this.getOption();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async operations(operation) {
    const values = [];

    // Textos
    if (operation === 'Raiz Quadrada') {
      console.log(
        this.chalk.yellowBright(
          `\nCerto! Iremos realizar a ${operation.toLowerCase()}, só nos informe o valor da radiciação\n`,
        ),
      );
    } else {
      console.log(
        this.chalk.yellowBright(
          `\nCerto! Iremos realizar a ${operation.toLowerCase()}, só nos informe os valores abaixo:`,
        ),
      );
    }

    // Operações
    if (operation === 'Potenciação') {
      await this.inquirer
        .prompt([
          {
            name: 'base',
            message: `Qual o número da base?\n`,
          },
        ])
        .then((answer) => {
          values.push(Number.parseFloat(answer['base'].replace(',', '.')));
        });

      await this.inquirer
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
      await this.inquirer
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
    } else {
      await this.inquirer
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
};
