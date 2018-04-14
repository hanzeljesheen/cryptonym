'use strict'
const bitcoin = require('bitcoinjs-lib')
const chalk = require('chalk')
const BCH = require('../utils/bch')

module.exports = async (seed, prompt) => {
  const root = bitcoin.HDNode.fromSeedBuffer(seed)
  const coin = new BCH(root)
  const option = await prompt.list('Menu', [ 'View Balance', 'Generate New Address', 'Show Extended Private Key', 'Exit' ])

  switch (option) {
    case 'View Balance':
      console.log('checking...')
      const balance = await coin.balance()
      console.log(`Balance ${chalk.green(balance + ' BCH')}`)
      break

    case 'Generate New Address':
      console.log('generating...')
      const address = await coin.generate()
      console.log(`Bitcoin Cash Address ${chalk.green(address)}`)
      break

    case 'Show Extended Private Key':
      const key = coin.privates()
      console.log(`Extended Private Key ${chalk.green(key)}`)
      break
  }
}
