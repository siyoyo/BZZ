const fs = require('fs')
const crypto = require('crypto')
const nxtCrypto = require('nxt-crypto')
const converters = require('nxt-utils').converters
const genesisTemplate = require('./templates/genesis')
const recipients = require('./accounts.json')
const { generateSecretPhrase, getPublicKey, getAccountId } = nxtCrypto

const generateAccount = () => {
  const secretPhrase = generateSecretPhrase()
  const publicKey = getPublicKey(secretPhrase)
  const accountId = getAccountId(publicKey)
  const publicKeyBytes = Int8Array.from(converters.hexStringToByteArray(publicKey))
  return {
    secretPhrase,
    accountId,
    publicKey,
    publicKeyBytes
  }
}

const genesisRecipients = recipients.reduce((recipients, recipient) => {
  let secretPhrase
  let publicKey = recipient.publicKey
  if (!publicKey) {
    secretPhrase = generateSecretPhrase()
    publicKey = getPublicKey(secretPhrase)
  }
  const publicKeyBytes = Int8Array.from(converters.hexStringToByteArray(publicKey))
  const accountId = getAccountId(publicKey)
  recipients.push({
    secretPhrase,
    publicKey,
    publicKeyBytes,
    accountId,
    amount: recipient.amount
  })

  recipients.sort((recipientA, recipientB) => {
    if (recipientA.accountId < recipientB.accountId) {
      return -1
    }

    if (recipientA.accountId > recipientB.accountId) {
      return 1
    }

    return 0
  })

  return recipients
}, [])

const creator = generateAccount()
const genesisTemplateString = genesisTemplate(creator, genesisRecipients).toString()
fs.writeFile('./out/Genesis.java', genesisTemplateString)

delete creator.publicKeyBytes
fs.writeFile('./out/Genesis Creator.json', `${JSON.stringify(creator, null, 2)}`)
fs.writeFile('./out/Genesis Accounts.json', `${JSON.stringify(genesisRecipients.map((recipient) => {
  return {
    secretPhrase: recipient.secretPhrase,
    accountId: recipient.accountId,
    publicKey: recipient.publicKey,
    amount: recipient.amount
  }
}), null, 2)}`)
