require('dotenv-flow').config();
const Bot = require('../../node_modules/botjsx');
const {VkBot, ListenUpdate, OnMessageNew, CheckText, SendMessage} = require('../../src');

const config = {
  accessToken: process.env.ACCESS_TOKEN,
  groupId: process.env.GROUP_ID,
  userAdmin: process.env.USER_ADMIN
};

function MyBot() {
  return (
    <VkBot
      accessToken={config.accessToken}
      groupId={config.groupId}
      logger={console}
    >
      {() => console.log('bot started')}
      <SendMessage
        toUser={config.userAdmin}
      >
        Bot started
      </SendMessage>
      <ListenUpdate>
        <OnMessageNew>
          <CheckText text="hi">
            <SendMessage>
              Hello World
            </SendMessage>
          </CheckText>
        </OnMessageNew>
      </ListenUpdate>
    </VkBot>
  )
}

Bot.run(<MyBot />);
