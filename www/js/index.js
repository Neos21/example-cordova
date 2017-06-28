// アプリ唯一のグローバル変数
var app = {
  
  // 初期処理
  // ------------------------------------------------------------
  init: function() {
    console.log('初期処理 開始');
    
    document.addEventListener("DOMContentLoaded", function() {
      console.log('DOM 構築完了');
      
      document.getElementById('alert').addEventListener('click', this.alert, false);
      document.getElementById('confirm').addEventListener('click', this.confirm, false);
      document.getElementById('prompt').addEventListener('click', this.prompt, false);
      document.getElementById('beep').addEventListener('click', this.beep, false);
    }.bind(this), false);
  },
  
  // アラート表示
  // ------------------------------------------------------------
  alert: function() {
    console.log('アラート表示 開始');
    
    window.navigator.notification.alert(
      'アラートメッセージ',
      function() {
        document.getElementById('results').innerHTML = '<li>アラート表示後のコールバック関数が実行されました</li>';
      },
      'アラートタイトル',
      'オッケー'
    );
  },
  
  // 確認ダイアログ表示
  // ------------------------------------------------------------
  confirm: function() {
    console.log('確認ダイアログ 開始');
    
    window.navigator.notification.confirm(
      '確認ダイアログメッセージ',
      function(buttonIndex) {
        console.log('押下したボタンの Index : ' + buttonIndex);
        if(buttonIndex === 1) {
          document.getElementById('results').innerHTML = '<li>確認ダイアログの オッケー ボタンが押されました</li>';
        }
        else if(buttonIndex === 2) {
          document.getElementById('results').innerHTML = '<li>確認ダイアログの ダメー ボタンが押されました</li>';
        }
        else {
          document.getElementById('results').innerHTML = '<li class="error">確認ダイアログの不明なボタンが押されました</li>';
        }
      },
      '確認ダイアログタイトル',
      ['オッケー', 'ダメー']
    );
  },
  
  // プロンプト表示
  // ------------------------------------------------------------
  prompt: function() {
    console.log('プロンプト表示 開始');
    
    window.navigator.notification.prompt(
      'プロンプトメッセージ',
      function(results) {
        console.log('押下したボタンの Index : ' + results.buttonIndex);
        console.log('入力内容 : ' + results.input1);
        
        if(results.buttonIndex === 1) {
          document.getElementById('results').innerHTML = '<li>プロンプトの オッケー ボタンが押されました … 入力値 : ' + results.input1 + '</li>';
        }
        else if(results.buttonIndex === 2) {
          document.getElementById('results').innerHTML = '<li>プロンプトの ダメー ボタンが押されました・入力内容は無視することにします</li>';
        }
        else {
          document.getElementById('results').innerHTML = '<li class="error">プロンプトの不明なボタンが押されました … 入力値 : ' + results.input1 + '</li>';
        }
      },
      'プロンプトタイトル',
      ['オッケー', 'ダメー'],
      'デフォルトテキスト'
    );
  },

  // ビープ再生
  // ------------------------------------------------------------
  beep: function() {
    console.log('ビープ再生 開始');
    
    // input[type="number"] の入力値を利用する
    // type="number" は異常値に数値以外の文字列が含まれている場合、値が取得できない
    var times = document.getElementById('beep-times').value;
    
    // min・max 属性値により 1 〜 9 の数字のみ有効とする
    if(times >= 1 && times <= 9 && times.length === 1) {
      console.log('ビープ再生 入力値は正常値', times);
      document.getElementById('results').innerHTML = '<li>入力値に従い ' + times + ' 回だけビープ音を再生します</li>';
      window.navigator.notification.beep(times);
    }
    else {
      console.log('ビープ再生 入力値は異常値・1回だけビープ再生', times);
      document.getElementById('results').innerHTML = '<li class="error">入力値が異常です。1回だけビープ音を再生しました … 入力値 : ' + times + '</li>';
      window.navigator.notification.beep(1);
    }
  }
}

// 初期処理を実行する
app.init();