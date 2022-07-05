const routes = require("next-routes")();

routes
  .add("/", "/")
  .add("/campaigns/newcampaign", "/campaigns/newcampaign")
  .add("/campaigns/:address", "/campaigns/viewcampaign")
  .add('/campaigns/:address/create', '/campaigns/create/viewrequests')
  .add("/campaigns/:address/create/createvote", "/campaigns/create/createvote");

module.exports = routes;
