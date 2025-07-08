// Slack service configuration
module.exports = {
  // DM URLs for testing
  dmUrls: {
    johnLee: 'https://app.slack.com/client/E03CXP6PB47/D02925XRMRQ'
  },
  
  // Common selectors
  selectors: {
    messageInput: '[data-qa="message_input"]',
    messageContainer: '[data-qa="message_container"]',
    sendButton: '[data-qa="texty_send_button"]'
  },
  
  // Timing configurations
  delays: {
    typingMin: 10,
    typingMax: 30,
    afterNavigation: 3000,
    afterSend: 2000
  }
}; 