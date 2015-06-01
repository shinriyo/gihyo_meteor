(function() {
    'use strict';
    
    // (1) コレクションの生成
    var Employees = new Meteor.Collection('employees');

    // クライアント上でのみ動作するコード
    if (Meteor.isClient) {
        var selectedIdElem, nameElem, ageElem;
        // 初期処理。よく参照する要素のDOMを変数に格納しておく
        Meteor.startup(function() {
            selectedIdElem = document.getElementById('selectedEmployeeId');
            nameElem = document.getElementById('name');
            ageElem = document.getElementById('age');
        });
        // 入力フォームのイベント
        Template.form.events = {
            // 追加ボタン
            'click #addButton': function(e, template) {
                // (5) コレクションに新たなデータを追加
                Employees.insert({
                    name: nameElem.value,
                    age: ageElem.valueAsNumber
                }, function(error, result) {
                    if (error) {
                        alert('エラーが発生しました');
                    }
                });
            },
            // 更新ボタン
            'click #updateButton': function(e, template) {
                if (!selectedIdElem.value) {
                    alert('レコードが選択されていません');
                    return;
                }
                // (6) コレクションの要素を更新する
                Employees.update(
                    { _id: selectedIdElem.value },
                    {
                        name: nameElem.value,
                        age: ageElem.valueAsNumber
                    });
            },
            // 追加・更新ボタンクリック後の処理
            'click #addButton,#updateButton': function() {
                // 入力フォームをクリアする
                selectedIdElem.value = '';
                nameElem.value = '';
                ageElem.value = '';
            }
        };
        // テンプレート内のemployeesという変数の値を返す
        Template.employeeList.employees = function() {
            // (2) コレクション内の全データを返す
            var cursor = Employees.find();
            // (3) カーソルの状態を監視してログを残す
            cursor.observe({
                // 検索結果が増やされた
                added: function(document, beforeIndex) {
                    console.log('added(追加された位置:' + beforeIndex + ')');
                },
                // 検索結果が変更された
                changed: function(newDocument, atIndex, oldDocument) {
                    console.log('changed(位置:' + atIndex + ')');
                },
                // 検索結果内でオブジェクトのインデックスが変わった
                moved: function(document, oldIndex, newIndex) {
                    console.log('moved(前の位置:' + oldIndex + ' 後の位置:' + newIndex + ')');
                },
                // 検索結果からオブジェクトが減った
                removed: function(oldDocument, atIndex) {
                    console.log('removed(位置:' + atIndex + ')');
                }
            });
            return cursor;
        };
        // 一覧のイベント
        Template.employeeList.events = {
            // 削除ボタンをクリックされた際の処理
            'click #removeButton': function(e, template) {
                if (confirm('選択されているレコードを削除してもよろしいですか')) {
                    // チェックされているチェックボックスを全て取得
                    var selected = template.findAll('[name="selectedEmployees"]:checked');
                    // IDの配列に変換
                    var ids = selected.map(function(id) { return id.value; });
                    // (7) コレクションの要素を削除する
                    Employees.remove({_id: { $in: ids }});
                    // 入力フォームをクリア
                    selectedIdElem.value = '';
                    nameElem.value = '';
                    ageElem.value = '';
                }
            },
            // 全てチェック／チェックを外す
            'change #toggleAll': function(e, template) {
                var checked = e.target.checked;
                var checkboxes = template.findAll('[name="selectedEmployees"]');
                for (var i = 0; i < checkboxes.length; i++) {
                    checkboxes[i].checked = checked;
                }
            },
            // チェックボックスの状態が変化した
            'change [name="selectedEmployees"]': function(e, template) {
                var checkbox = e.target;
                var selectedEmployeeId = checkbox.value;
                if (checkbox.checked) {
                    // (4) チェックされた行のオブジェクトを取得
                    var selectedEmployee = Employees.findOne({_id: selectedEmployeeId});
                    selectedIdElem.value = selectedEmployeeId;
                    nameElem.value = selectedEmployee.name;
                    ageElem.value = selectedEmployee.age;
                } else {
                    if (selectedIdElem.value === selectedEmployeeId) {
                        selectedIdElem.value = '';
                        nameElem.value = '';
                        ageElem.value = '';
                    }
                }
            }
        };
    }
    // サーバ上でのみ動作するコード
    if (Meteor.isServer) {
        // 起動時の処理
        Meteor.startup(function () {
            // (3) 全データを消去する
            Employees.remove({});
            var data = [
                { name: 'しゅんぺい', age: '34' },
                { name: 'たえこ', age: '33' },
                { name: 'こうたろう', age: '4' },
                { name: 'ちほ', age: '2' }
            ];
            data.forEach(function(emp) {
                // (4) データを挿入する
                Employees.insert(emp);
            });
        });
    }

})();
