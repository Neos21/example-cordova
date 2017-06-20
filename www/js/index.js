// アプリ唯一のグローバル変数
var app = {
  
  // DB インスタンスを保持するプロパティ
  // ------------------------------------------------------------
  db: null,
  
  // 初期処理
  // ------------------------------------------------------------
  init: function() {
    console.log('初期処理');
    
    document.addEventListener('DOMContentLoaded', function() {
      console.log('DOM 構築完了 → イベント定義');
      
      document.getElementById('open-db').addEventListener('click', this.openDb.bind(this), false);
      document.getElementById('create').addEventListener('click', this.create.bind(this), false);
      document.getElementById('select').addEventListener('click', this.select.bind(this), false);
      document.getElementById('drop').addEventListener('click', this.drop.bind(this), false);
    }.bind(this), false);
    
    document.addEventListener('deviceready', function() {
      console.log('Device Ready 発火 → DB 接続');
      
      this.openDb();
    }.bind(this), false);
  },

  // DB 接続
  // ------------------------------------------------------------
  openDb: function() {
    console.log('DB 接続 開始');
    
    if(!window.sqlitePlugin) {
      console.log('DB 接続 プラグインがないため WebSQL を使用');
      this._openWebSqlDb();
      return;
    }
    
    window.sqlitePlugin.selfTest(function() {
      console.log('DB 接続 SQLitePlugin 使用');
      
      this.db = window.sqlitePlugin.openDatabase({
        name: 'sample.db',
        location: 'default'
      });
      
      document.getElementById('results').innerHTML = '<li>DB 接続 成功 (SQLitePlugin 使用)</li>';
    }.bind(this), function() {
      console.log('DB 接続 プラグインが動作しないため WebSQL 使用');
      this._openWebSqlDb();
    }.bind(this));
  },
  
  // WebSQL を使用した DB 接続処理 (プラグイン未対応時に使用)
  // ------------------------------------------------------------
  _openWebSqlDb: function() {
    console.log('WebSQL を使用した DB 接続処理 開始');
    
    if(!window.openDatabase) {
      console.log('window.openDatabase がないため DB 接続不可');
      document.getElementById('results').innerHTML = '<li class="error">window.openDatabase がないため DB 接続ができません</li>';
      return;
    }
    
    try {
      this.db = window.openDatabase(
        'sample.db',
        '1.0',
        'sample',
        10000000
      );
      
      document.getElementById('results').innerHTML = '<li>DB 接続 成功 (WebSQL 使用)</li>';
    }
    catch(error) {
      console.log('WebSQL を使用した DB 接続処理 失敗 : ' + error);
      document.getElementById('results').innerHTML = '<li class="error">DB 接続に失敗しました : ' + error + '</li>';
    }
  },
  
  // テーブル作成・データ投入
  // ------------------------------------------------------------
  create: function() {
    console.log('テーブル作成・データ投入 開始');
    
    if(!this.db) {
      console.log('テーブル作成・データ投入 処理前に DB 接続')
      this.openDb();
    }
    
    this.db.transaction(function(tx) {
      tx.executeSql('CREATE TABLE IF NOT EXISTS SampleTable (id INTEGER PRIMARY KEY, name TEXT, age INTEGER)');
      tx.executeSql('REPLACE INTO SampleTable VALUES (?, ?, ?)', [1, 'ほげ', 18]);
      tx.executeSql('REPLACE INTO SampleTable VALUES (?, ?, ?)', [2, 'ぴよ', 20]);
    }, function(error) {
      console.log('テーブル作成・データ投入 失敗 : ' + error.message);
      document.getElementById('results').innerHTML = '<li class="error">テーブル作成・データ投入 失敗 : ' + error + '</li>';
    }, function() {
      console.log('テーブル作成・データ投入 成功');
      document.getElementById('results').innerHTML = '<li>テーブル作成・データ投入 成功</li>';
      // 続けて取得処理も行いたい場合はココで取得処理を呼び出したりすれば OK
      // this.select();
    });
  },
  
  // データ取得
  // ------------------------------------------------------------
  select: function() {
    console.log('データ取得 開始');
    
    if(!this.db) {
      console.log('データ取得 処理前に DB 接続')
      this.openDb();
    }
    
    this.db.transaction(function(tx) {
      tx.executeSql('SELECT * FROM SampleTable', [], function(tx, sqlResultSet) {
        console.log('データ取得 成功');
        console.log('取得件数 : ' + sqlResultSet.rows.length);
        
        // 結果リストの HTML を保持する変数
        var results = '';
        
        // 結果を1件ずつ取得する
        for(var i = 0; i < sqlResultSet.rows.length; i++) {
          var row = sqlResultSet.rows.item(i);
          var rowData = '[' + (i + 1) + ' 行目] ' + row.name + ' , ' + row.age + '歳';
          // 1行のリストを生成し results に結合する
          results += '<li>' + rowData + '</li>';
          // デバッグ用
          console.log(rowData);
        }
        
        // 結果表示欄に追加する
        document.getElementById('results').innerHTML = results;
      }, function(tx, error) {
        console.log('データ取得 失敗 : ' + error.message);
        document.getElementById('results').innerHTML = '<li class="error">データ取得 失敗 : ' + error.message + '</li>';
      });
    });
  },
  
  // テーブル削除
  // ------------------------------------------------------------
  drop: function() {
    console.log('テーブル削除 開始');
    
    if(!this.db) {
      console.log('テーブル削除 処理前に DB 接続')
      this.openDb();
    }
    
    this.db.transaction(function(tx) {
      tx.executeSql('DROP TABLE IF EXISTS SampleTable');
    }, function(error) {
      console.log('テーブル削除 失敗 : ' + error.message);
      document.getElementById('results').innerHTML = '<li class="error">テーブル削除 失敗 : ' + error.message + '</li>';
    }, function() {
      console.log('テーブル削除 成功');
      document.getElementById('results').innerHTML = '<li>テーブル削除 成功</li>';
    });
  }
};

// 初期処理を実行する
app.init();