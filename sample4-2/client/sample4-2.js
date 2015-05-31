window.onload = function() {
    var content = Template.mainContent({ yourName: "白石", now: new Date });
    document.body.innerHTML = content;
};
