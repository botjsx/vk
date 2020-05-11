const request = require('request');
const getRandomId = require('./getRandomId');

class VkApi {
  constructor({settings} = {}) {
    this.apiVersion = '5.103';
    this.settings = settings;
  }

  setSettings(settings) {
    this.settings = settings;
  }

  getUser({user_ids}) {
    return new Promise((resolve, reject) => {
      request.post('https://api.vk.com/method/users.get', {
        form: {
          user_ids,
          fields: 'bdate,photo_50',
          access_token: this.settings['accessToken'],
          v: this.apiVersion
        },
        json: true
      }, (err, res, body) => {
        if (err) {
          reject(err);
          return;
        }
        const result = body.response && body.response.length ? body.response[0] : {};
        resolve(result);
      });
    });
  }

  isMessagesFromGroupAllowed({user_id, group_id = this.settings['groupId']}) {
    if (+user_id < 0) return;
    return new Promise((resolve, reject) => {
      request.post('https://api.vk.com/method/messages.isMessagesFromGroupAllowed', {
        json: true,
        form: {
          group_id,
          user_id,
          access_token: this.settings['accessToken'],
          v: this.apiVersion
        },
      }, (err ,res, body) => {
        if (err || body.error) {
          reject(err || body.error);
          return;
        }
        if (!body.response) {
          resolve(false);
          return;
        }
        const result = body.response.is_allowed;
        resolve(result);
      });
    });
  }

  getWall({count = 3} = {}) {
    return new Promise((resolve, reject) => {
      request.post('https://api.vk.com/method/wall.get', {
        form: {
          owner_id: -1 * this.settings['groupId'],
          count,
          filter: 'owner',
          access_token: this.settings['serviceAccessToken'],
          v: this.apiVersion
        },
        json: true
      }, (err, res, body) => {
        if (err) {
          reject(err);
          return;
        }
        const result = body.response && body.response.count ? body.response.items : [];
        resolve(result);
      });
    });
  }

  getWallComments({post_id}) {
    return new Promise((resolve, reject) => {
      request.post('https://api.vk.com/method/wall.getComments', {
        form: {
          owner_id: -1 * this.settings['groupId'],
          post_id,
          count: 100,
          access_token: this.settings['serviceAccessToken'],
          v: this.apiVersion
        },
        json: true
      }, (err, res, body) => {
        if (err) {
          reject(err);
          return;
        }
        const result = body.response && body.response.count ? body.response.items : [];
        resolve(result);
      });
    });
  }

  getWallReposts({post_id}) {
    return new Promise((resolve, reject) => {
      request.post('https://api.vk.com/method/wall.getReposts', {
        form: {
          owner_id: -1 * this.settings['groupId'],
          post_id,
          count: 1000,
          access_token: this.settings['userAccessToken'],
          v: this.apiVersion
        },
        json: true
      }, (err, res, body) => {
        if (err) {
          reject(err);
          return;
        }
        const result = body.response && body.response.items ? body.response.items : [];
        resolve(result);
      });
    });
  }

  getLikes({item_id}) {
    return new Promise((resolve, reject) => {
      request.post('https://api.vk.com/method/likes.getList', {
        form: {
          type: 'post',
          owner_id: -1 * this.settings['groupId'],
          item_id,
          count: 1000,
          access_token: this.settings['serviceAccessToken'],
          v: this.apiVersion
        },
        json: true
      }, (err, res, body) => {
        if (err) {
          reject(err);
          return;
        }
        const result = body.response && body.response.count ? body.response.items : [];
        resolve(result);
      });
    });
  }

  async sendGroupMessage({user_id, user_ids, group_id = this.settings['groupId'], message, attachment, keyboard, reply_to, forward_messages, payload, random_id = getRandomId()}) {
    return new Promise(async (resolve, reject) => {
      request.post('https://api.vk.com/method/messages.send', {
        form: {
          user_id,
          user_ids,
          group_id,
          message,
          attachment,
          keyboard,
          reply_to,
          payload,
          forward_messages,
          random_id,
          access_token: this.settings['accessToken'],
          v: this.apiVersion
        },
        json: true
      }, (err, res, body) => {
        if (err) resolve(err);
        resolve(body);
      });
    });
  }

  setTyping(peer_id) {
    return new Promise((resolve, reject) => {
      request.post('https://api.vk.com/method/messages.setActivity', {
        form: {
          peer_id,
          type: 'typing',
          group_id: this.settings['groupId'],
          access_token: this.settings['accessToken'],
          v: this.apiVersion
        },
        json: true
      }, (err, res, body) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(body);
      });
    });
  }

  getTopicComments({topic_id}) {
    return new Promise((resolve, reject) => {
      request.post('https://api.vk.com/method/board.getComments', {
        form: {
          group_id: this.settings['groupId'],
          topic_id,
          count: 100,
          access_token: this.settings['serviceAccessToken'],
          v: this.apiVersion
        },
        json: true
      }, (err, res, body) => {
        if (err) {
          reject(err);
          return;
        }
        const result = body.response && body.response.items ? body.response.items : [];
        resolve(result);
      });
    });
  }

  getPollVoters(params) {
    return new Promise(async (resolve, reject) => {
      request.post('https://api.vk.com/method/polls.getVoters', {
        form: {
          ...params,
          random_id: getRandomId(),
          access_token: this.settings['userAccessToken'],
          v: this.apiVersion
        },
        json: true
      }, (err, res, body) => {
        if (err) resolve(err);
        resolve(body.response || body);
      });
    });
  }

  getComment(params) {
    return new Promise(async (resolve, reject) => {
      request.post('https://api.vk.com/method/wall.getComment', {
        form: {
          access_token: this.settings['userAccessToken'],
          ...params,
          v: this.apiVersion
        },
        json: true
      }, (err, res, body) => {
        if (err) {
          resolve(err);
          return;
        }
        if (body.error) {
          reject(body.error.error_msg);
          return;
        }
        resolve(body.response.items);
      });
    });
  }

  callMethod(method, params) {
    return new Promise(async (resolve, reject) => {
      request.post(`https://api.vk.com/method/${method}`, {
        form: {
          access_token: this.settings['accessToken'],
          ...params,
          v: this.apiVersion
        },
        json: true
      }, (err, res, body) => {
        if (err) {
          reject(err);
          return;
        }
        if (body.error) {
          reject(body.error.error_msg);
          return;
        }
        resolve(body.response);
      });
    });
  }

  editMessage({peer_id, message, message_id, attachment}) {
    return new Promise((resolve, reject) => {
      request.post('https://api.vk.com/method/messages.edit', {
        form: {
          peer_id,
          group_id: this.settings['groupId'],
          message,
          attachment,
          message_id,
          access_token: this.settings['accessToken'],
          v: this.apiVersion
        },
        json: true
      }, (err, res, body) => {
        if (err) resolve(err);
        resolve(body);
      });
    });
  }
}

module.exports = new VkApi();
