require('dotenv-flow').config();

const Bot = require('../../node_modules/botjsx');

const {
  VkBot,
  ListenUpdate,
  OnMessageNew,
  CheckText,
  SendMessage
} = require('../../src');

const config = {
  accessToken: process.env.ACCESS_TOKEN,
  groupId: process.env.GROUP_ID,
  userAdmin: process.env.USER_ADMIN
};

function MyBot() {
  return Bot.createComponent(VkBot, {
    accessToken: config.accessToken,
    groupId: config.groupId
  }, () => console.log('bot started'), Bot.createComponent(SendMessage, {
    toUser: config.userAdmin
  }, "Bot started"), Bot.createComponent(ListenUpdate, null, Bot.createComponent(OnMessageNew, null, Bot.createComponent(CheckText, {
    text: "hi"
  }, Bot.createComponent(SendMessage, null, "Hello World")))));
}

Bot.run(Bot.createComponent(MyBot, null));
//# sourceMappingURL=bot.js.map