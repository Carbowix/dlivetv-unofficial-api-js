'use strict'

const {
  webRequest
} = require('./webrequest')

class DliveModeration {
  constructor (authKey) {
    this.authKey = authKey
  }

  banUser (username, channelName) {
    if (!username) {
      return new TypeError('Username was not specified to ban')
    }

    if (!channelName) {
      return new TypeError('Stream channel name was not specified')
    }

    const postData = JSON.stringify({
      operationName: 'BanStreamChatUser',
      query: `mutation BanStreamChatUser($streamer:String!,$username:String!){streamchatUserBan(streamer:$streamer,username:$username){err{code message __typename}__typename}}`,
      variables: {
        channelName,
        username
      }
    })

    return new Promise((resolve, reject) => {
      webRequest(this.authKey, postData).then((result) => {
        result = JSON.parse(result)
        result.errors !== undefined ? reject(result.errors['0'].message) : resolve(true)
      })
    })
  }

  unbanUser (username, channelName) {
    if (!username) {
      return new TypeError('Username was not specified to ban')
    }

    if (!channelName) {
      return new TypeError('Stream channel name was not specified')
    }

    const postData = JSON.stringify({
      operationName: 'UnbanStreamChatUser',
      query: `mutation UnbanStreamChatUser($streamer:String!,$username:String!){streamchatUserUnban(streamer:$streamer,username:$username){err{code message __typename}__typename}}`,
      variables: {
        channelName,
        username
      }
    })

    return new Promise((resolve, reject) => {
      webRequest(this.authKey, postData).then((result) => {
        result = JSON.parse(result)
        result.errors !== undefined ? reject(result.errors['0'].message) : resolve(true)
      })
    })
  }

  setModerator (username) {
    if (!username) {
      return new TypeError('Username was not specified to give moderation rights')
    }

    const postData = JSON.stringify({
      operationName: 'AddModerator',
      query: 'mutation AddModerator($username:String!){moderatorAdd(username:$username){err{code __typename}__typename}}',
      variables: { username }
    })

    return new Promise((resolve, reject) => {
      webRequest(this.authKey, postData).then((result) => {
        result = JSON.parse(result)
        result.errors !== undefined ? reject(result.errors['0'].message) : resolve(true)
      })
    })
  }

  removeModerator (username) {
    if (!username) {
      return new TypeError('Username was not specified to revoke moderation rights')
    }
    const postData = JSON.stringify({
      operationName: 'RemoveModerator',
      query: 'mutation RemoveModerator($username:String!){moderatorRemove(username:$username){err{code message __typename}__typename}}',
      variables: { username }
    })

    return new Promise((resolve, reject) => {
      webRequest(this.authKey, postData).then((result) => {
        result = JSON.parse(result)
        result.errors !== undefined ? reject(result.errors['0'].message) : resolve(true)
      })
    })
  }

  setChatSlowMode (secs) {
    if (!parseInt(secs)) {
      return new TypeError('Slow mode time was not provided')
    }

    const postData = JSON.stringify({
      operationName: 'SetChatInterval',
      query: 'mutation SetChatInterval($seconds:Int!){chatIntervalSet(seconds:$seconds){err{code __typename}__typename}}',
      variables: {
        secs
      }
    })

    return new Promise((resolve, reject) => {
      webRequest(this.authKey, postData).then((result) => {
        result = JSON.parse(result)
        result.errors !== undefined ? reject(result.errors['0'].message) : resolve(true)
      })
    })
  }

  setAllowEmotes (state = true) {
    const postData = JSON.stringify({
      operationName: 'SetAllowSticker',
      query: 'mutation SetAllowSticker($allow:Boolean!){allowEmoteSet(allow:$allow){err{code message __typename}__typename}}',
      variables: {
        state
      }
    })

    return new Promise((resolve, reject) => {
      webRequest(this.authKey, postData).then((result) => {
        result = JSON.parse(result)
        result.errors !== undefined ? reject(result.errors['0'].message) : resolve(true)
      })
    })
  }

  banEmote (emote, channelName) {
    if (!emote) {
      return new TypeError('Emote was not specified to ban')
    }

    if (!channelName) {
      return new TypeError('Stream channel name was not specified')
    }

    const postData = JSON.stringify({
      operationName: 'EmoteBan',
      query: `mutation EmoteBan($emoteStr:String!,$streamer:String!){emoteBan(emoteStr:$emoteStr,streamer:$streamer){err{code message __typename}__typename}}`,
      variables: {
        channelName,
        emote
      }
    })

    return new Promise((resolve, reject) => {
      webRequest(this.authKey, postData).then((result) => {
        result = JSON.parse(result)
        result.errors !== undefined ? reject(result.errors['0'].message) : resolve(true)
      })
    })
  }
}

module.exports = {
  DliveModeration: DliveModeration
}
