if (Meteor.isClient) {
    // 式personNameに対応する値
    Template.simpleVar.personName = 'こうたろう';
    // 式personに対応する値
    Template.nestedVar.person = {
        name: 'ちほ'
    };
    // 式familyに対応する値
    Template.parentVar.family = {
        father: { name: 'しゅんぺい' },
        mother: { name: 'たえこ' }
    };
}
