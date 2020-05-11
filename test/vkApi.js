const vkApi = require('../src/utils/vkApi');

vkApi.setSettings({
  accessToken: process.env.VK_API_ACCESS_TOKEN,
  groupId: process.env.VK_API_GROUP_ID
});

module.exports = vkApi;
