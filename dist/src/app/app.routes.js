"use strict";
var home_1 = require("./home/home");
var document_1 = require("./document/document");
var card_board_1 = require("./card-board/card-board");
exports.rootRouterConfig = [
    { path: '', component: home_1.Home },
    { path: 'fashion/:category', component: card_board_1.CardBoardComponent },
    { path: 'fashion/:category/:uid', component: document_1.Document }
];
//# sourceMappingURL=app.routes.js.map