if (Meteor.isClient) {
    // 現在の秒が奇数かどうかを返す
    Template.currentTime.oddSeconds = function() {
        return new Date().getSeconds() % 2 === 1;
    };
    // 現在の日時を文字列にして返す
    Template.currentTime.dateString = function() {
        var date = new Date();
        return date.getFullYear() + '年' + (date.getMonth() + 1) + '月' + date.getDate() + '日 '
            + date.getHours() + '時' + date.getMinutes() + '分' + date.getSeconds() + '秒';
    };
}
