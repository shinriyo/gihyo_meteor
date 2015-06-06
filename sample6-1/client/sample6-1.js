Template.mainContent.events({
    // Helloボタンのクリックイベント
    'click #hello': function(event, template) {
        alert('Hello');
    },
    // Good Morningボタンのクリックイベント
    'click #goodMorning': function(event, template) {
        alert('Good Morning');
    },
    // テンプレート内のボタンがクリックされたら呼び出される
    'click button': function(event, template) {
        alert('ボタンがクリックされました');
    }
});
