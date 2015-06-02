if (Meteor.isClient) {
  Template.now.currentDate = function() {
      var now = new Date();
      return {
          year: now.getFullYear(),
          month: now.getMonth(),
          date: now.getDate(),
          hours: now.getHours(),
          minutes: now.getMinutes(),
          seconds: now.getSeconds()
      };
  };
}
