const inquirer = require('inquirer');
const chalk = require('chalk');

async function imc(returnFunction) {
  const data = { weight: '', height: '' };

  await inquirer
    .prompt([
      {
        type: 'number',
        name: 'weight',
        message: `Qual o seu ${chalk.blue('peso')}? - (Kg)\n`,
      },
    ])
    .then((answer) => {
      data.weight = answer.weight;
    })
    .catch((err) => {
      console.log(err);
    });

  await inquirer
    .prompt([
      {
        type: 'number',
        name: 'height',
        message: `Qual a sua ${chalk.blue('altura')}? - (m)\n`,
      },
    ])
    .then((answer) => {
      data.height = answer.height;
    })
    .catch((err) => {
      console.log(err);
    });

  const imc = (data.weight / data.height ** 2).toFixed(1);

  if (imc < 18.5) {
    console.log(
      `\n|  Seu imc é ${chalk.blue(imc)} \n|  Classificação: ${chalk.blue(
        'Magreza',
      )} \n|  Obesidade(grau): ${chalk.blue('0')}\n`,
    );
  } else if (18.5 < imc < 24.9) {
    console.log(
      `\n|  Seu imc é ${chalk.blue(imc)} \n|  Classificação: ${chalk.blue(
        'Normal',
      )} \n|  Obesidade(grau): ${chalk.blue('0')}\n`,
    );
  } else if (25 < imc < 29.9) {
    console.log(
      `\n|  Seu imc é ${chalk.blue(imc)} \n|  Classificação: ${chalk.blue(
        'Sobrepeso',
      )} \n|  Obesidade(grau): ${chalk.blue('I')}\n`,
    );
  } else if (30 < imc < 39.9) {
    console.log(
      `\n|  Seu imc é ${chalk.blue(imc)} \n|  Classificação: ${chalk.blue(
        'Obesidade',
      )} \n|  Obesidade(grau): ${chalk.blue('II')}\n`,
    );
  } else {
    console.log(
      `\n|  Seu imc é ${chalk(imc)} \n|  Classificação: ${chalk.blue(
        'Obesidade Grave',
      )} \n|  Obesidade(grau): ${chalk.blue('III')}\n`,
    );
  }

  setTimeout(() => {
    return returnFunction();
  }, 2000);
}

module.exports = imc;
