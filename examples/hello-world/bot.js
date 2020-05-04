require('dotenv-flow').config();
const Bot = require('botjsx');
const {InitBot, ListenUpdate, OnNewMessage, CheckText, SendMessage} = require('../../src');

const config = {
  accessToken: process.env.ACCESS_TOKEN,
  account: process.env.ACCOUNT,
  userAdmin: process.env.USER_ADMIN
};

function MyBot() {
  return (
    <InitBot
      accessToken={config.accessToken}
      account={config.account}
      logger={console}
    >
      {() => console.log('bot started')}
      <SendMessage
        toUser={config.userAdmin}
      >
        Bot started
      </SendMessage>
      <ListenUpdate>
        <OnNewMessage>
          <CheckText text="hi">
            <SendMessage>
              Hello World
            </SendMessage>
          </CheckText>
        </OnNewMessage>
      </ListenUpdate>
    </InitBot>
  )
}

Bot.run(<MyBot />);
