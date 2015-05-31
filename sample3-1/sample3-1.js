Meteor.startup(function() {
    if (Meteor.is_client) {
        console.log("クライアントの初期化完了！");
    } else {
        console.log("サーバの初期化完了！");
    }
});
