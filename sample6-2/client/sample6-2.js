Template.mainContent.events({
    // Helloボタンのクリックイベント
    'click #greeting': function(event, template) {
        var nameInput = template.find('input[type=text]');
        var name = textInput.value;
        alert('Hello, ' + name);
    }
});
