const request = require('request');

class LongPoll {
  constructor({access_token, group_id, logger}) {
    this.access_token = access_token;
    this.group_id = group_id;
    this.logger = logger;
    this.init();
  }

  getUpdates(callback) {
    this.updatesCallback = callback;
  }

  init() {
    request.post('https://api.vk.com/method/groups.getLongPollServer', {
      form: {
        group_id: this.group_id,
        access_token: this.access_token,
        v: '5.101'
      },
      json: true
    }, (err, res, body) => {
      if (!err && res.statusCode === 200) {
        if (body) {
          if (body.error) {
            this.logger.error(body.error);
            return;
          }
          this.server = body.response.server;
          this.key = body.response.key;
          this.ts = body.response.ts;

          this.poll();
        }
      }
    });
  }

  poll() {
    request.post(`${this.server}?act=a_check&key=${this.key}&ts=${this.ts}&wait=25`, {json: true}, (err, res, body) => {
      if (!err && res.statusCode === 200) {
        if (body.failed && (body.failed === 2 || body.failed === 3)) {
          this.logger.error(body);
          this.init();
          return;
        }
        this.ts = body.ts;
        if (this.updatesCallback && body.updates) {
          this.updatesCallback(body.updates);
        }
      }
      this.poll();
    });
  }
}

module.exports = LongPoll;
