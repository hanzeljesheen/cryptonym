'use strict'
const bitcoin = require('bitcoinjs-lib')
const chalk = require('chalk')
const BTC = require('../utils/btc')

module.exports = async (seed, prompt) => {
  const root = bitcoin.HDNode.fromSeedBuffer(seed)
  const coin = new BTC(root)
  const option = await prompt.list('Menu', [ 'View Balance', 'Generate New Address', 'Show Extended Private Key', 'Exit' ])

  switch (option) {
    case 'View Balance':
      console.log('checking...')
      const res = await coin.balance()
      const balance = res[0] / 100000000

      console.log(`Total Balance ${chalk.green(balance + ' BTC')}`)
      console.log(`Number of Transcations ${chalk.green(res[1])}`)
      break

    case 'Generate New Address':
      console.log('generating...')
      const address = await coin.generate()
      console.log(`Bitcoin Address ${chalk.green(address)}`)
      break

    case 'Show Extended Private Key':
      const key = coin.privates()
      console.log(`Extended Private Key ${chalk.green(key)}`)
      break
  }
}
