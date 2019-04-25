'use strict'

const {
  dliveInit
} = require('./dliveInit')
const {
  DliveModeration
} = require('./dliveModeration')

class Dliver extends dliveInit {
  // eslint-disable-next-line no-useless-constructor
  constructor (channel, authKey) {
    super(channel, authKey)
    this.moderation = new DliveModeration(authKey)
  }

  sendMessage (message) {
    if (!this.getChannel) {
      return new Error('You need to initalize a channel first')
    }
    return new Promise((resolve, reject) => {
      this.sendChatMessage(message).then((result) => {
        resolve(result)
      }).catch((error) => {
        reject(error)
      })
    })
  }

  sendMessageToChannel (channel, message) {
    if (!this.getChannel) {
      return new Error('You need to initalize a channel first')
    }
    return new Promise((resolve, reject) => {
      this.sendMessageToChannelChat(channel, message).then((result) => {
        resolve(result)
      }).catch((error) => {
        reject(error)
      })
    })
  }

  getChannelInformation (displayname) {
    if (!this.getChannel) {
      return new Error('You need to initalize a channel first')
    }
    return new Promise((resolve, reject) => {
      this.getChannelInformationByDisplayName(displayname).then((result) => {
        resolve(result)
      }).catch((error) => {
        reject(error)
      })
    })
  }

  getChannelTopContributors (displayname, amountToShow, rule) {
    if (!this.getChannel) {
      return new Error('You need to initalize a channel first')
    }
    return new Promise((resolve, reject) => {
      this.getChannelTopContributorsByDisplayName(displayname, amountToShow, rule).then((result) => {
        resolve(result)
      }).catch((error) => {
        reject(error)
      })
    })
  }

  getGlobalInformation () {
    if (!this.getChannel) {
      return new Error('You need to initalize a channel first')
    }
    return new Promise((resolve, reject) => {
      this.getDliveGlobalInformation().then((result) => {
        resolve(result)
      }).catch((error) => {
        reject(error)
      })
    })
  }

  getChannelViewers (displayName) {
    if (!this.getChannel) {
      return new Error('You need to initalize a channel first')
    }
    return new Promise((resolve, reject) => {
      this.getChannelViewersByDisplayName(displayName).then((result) => {
        resolve(result)
      }).catch((error) => {
        reject(error)
      })
    })
  }
}

module.exports = {
  Dliver: Dliver
}
