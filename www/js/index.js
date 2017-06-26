// アプリ唯一のグローバル変数
var app = {
  
  // 初期処理
  // ------------------------------------------------------------
  init: function() {
    document.getElementById('register').addEventListener('click', this.register.bind(this), false);
    document.getElementById('list').addEventListener('click', this.list.bind(this), false);
    document.getElementById('connect').addEventListener('click', this.connect.bind(this), false);
    document.getElementById('disconnect').addEventListener('click', this.disconnect.bind(this), false);
    document.getElementById('send').addEventListener('click', this.send.bind(this), false);
    document.getElementById('receive').addEventListener('click', this.receive.bind(this), false);
  },
  
  // Bluetooth エミュレート登録
  // ------------------------------------------------------------
  register: function() {
    if(!window.bluetoothSerial.register) {
      console.log('エミュレート用関数がありません。Browser プラットフォームで動作させてください');
      document.getElementById('results').innerHTML = '<li class="error">エミュレート用関数がありません。Browser プラットフォームで動作させてください</li>';
      return;
    }
    
    console.log('Bluetooth エミュレート 開始');
    // #write で送信されたものを input で受け取れる
    // output を指定すると #read や #subscribe で受け取れる
    window.bluetoothSerial.register(function(buf) {
      if(buf && buf.input) {
        console.log('受信 : ', buf.input);
        buf.output = '受信 : [ ' + buf.input + ' ]';
        buf.input = '';  // Clear
        return buf;
      }
    });
    document.getElementById('results').innerHTML = '<li>Bluetooth エミュレート登録成功</li>';
  },
  
  // デバイス検索
  // ------------------------------------------------------------
  list: function() {
    console.log('デバイス検索 開始');
    
    document.addEventListener('deviceready', function() {
      console.log('デバイス検索 DeviceReady 発火');
      // 結果表示欄を初期化
      document.getElementById('results').innerHTML = '';
      
      window.bluetoothSerial.list(function(devices) {
        console.log('デバイス検索 デバイス件数 : ' + devices.length, devices);
        
        var results = '';
        
        devices.forEach(function(device) {
          console.log('デバイス検索 デバイス情報 :', device);
          results += '<li>' + device.name + ' : ' + device.id + '</li>';
        });
        
        document.getElementById('results').innerHTML = results;
      }, function(error) {
        document.getElementById('results').innerHTML = '<li class="error">デバイス検索 Error : ' + error + '</li>';
      });
    }, false);
  },
  
  // デバイス接続
  // ------------------------------------------------------------
  connect: function() {
    console.log('デバイス接続 開始');
    
    const deviceId = prompt('接続したいデバイスの ID を入力してください');
    
    if(!deviceId) {
      document.getElementById('results').innerHTML = '<li class="error">デバイス ID が入力されていません</li>';
      return;
    }
    
    window.bluetoothSerial.connect(deviceId, function() {
      console.log('デバイス接続 成功');
      
      window.bluetoothSerial.subscribe('¥n', function(data) {
        console.log('デバイス接続 Subscribe 成功', data);
        document.getElementById('results').innerHTML = '<li>デバイス接続 Subscribe 成功</li><li>' + data + '</li>';
      }, function(subscribeError) {
        document.getElementById('results').innerHTML = '<li class="error">デバイス接続 Subscribe Error : ' + subscribeError + '</li>';
      });
    }, function(error) {
      document.getElementById('results').innerHTML = '<li class="error">デバイス接続 Error : ' + error + '</li>';
    });
  },
  
  // Bluetooth 送信
  // ------------------------------------------------------------
  send: function() {
    console.log('Bluetooth 送信 開始');
    
    // 送信データ
    const data = '!Test!';
    
    window.bluetoothSerial.write(data, function() {
      document.getElementById('results').innerHTML = '<li>Bluetooth 送信 成功</li>';
    }, function(error) {
      document.getElementById('results').innerHTML = '<li class="error">Bluetooth 送信 Error : ' + error + '</li>';
    });
  },
  
  // Bluetooth 受信
  // ------------------------------------------------------------
  receive: function() {
    console.log('Bluetooth 受信 開始');
    
    window.bluetoothSerial.read(function(data) {
      document.getElementById('results').innerHTML = '<li>Bluetooth 受信 成功</li><li>' + data + '</li>';
    }, function(error) {
      document.getElementById('results').innerHTML = '<li class="error">Bluetooth 受信 Error : ' + error + '</li>';
    });
  },
  
  // デバイス切断
  // ------------------------------------------------------------
  disconnect: function() {
    console.log('デバイス切断 開始');
    
    window.bluetoothSerial.disconnect(function() {
      document.getElementById('results').innerHTML = '<li>デバイス切断 成功</li>';
    }, function(error) {
      document.getElementById('results').innerHTML = '<li class="error">切断 Error : ' + error + '</li>';
    });
  }
};

// 初期処理を実行する
app.init();