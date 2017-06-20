// アプリ唯一のグローバル変数
var app = {
  
  // マップオブジェクト
  // ------------------------------------------------------------
  map: null,
  
  // マーカーオブジェクト (削除用に退避させておく)
  // ------------------------------------------------------------
  marker: null,
  
  // 初期処理
  // ------------------------------------------------------------
  init: function() {
    console.log('初期処理');
    
    document.addEventListener('deviceready', function() {
      console.log('Device Ready 発火 → マップ準備');
      
      // 対象の DOM 要素に Google マップを配置する
      var mapElement = document.getElementById('map');
      // マップの初期位置を表示する (座標は日本の中心あたり)
      this.map = plugin.google.maps.Map.getMap(mapElement, {
        camera: {
          latLng: {
            lat: 38.2586,
            lng: 137.6850
          },
          zoom: 4
        }
      });
      
      // 初期処理のイベントを設定する
      // Google マップを操作するイベントはマップが準備できてから設定する
      this.map.addEventListener(plugin.google.maps.event.MAP_READY, this.onMapReady.bind(this));
    }.bind(this), false);
  },
  
  // マップ初期処理
  // ------------------------------------------------------------
  onMapReady: function() {
    console.log('マップ初期処理 開始');
    
    // イベントを設定する
    document.getElementById('search').addEventListener('click', this.search.bind(this), false);
    
    // マップの指定座標 (東京タワー) にズームする
    console.log('マップ初期処理 アニメーション開始');
    this.map.animateCamera({
      target: {
        lat: 35.658581,
        lng: 139.745433
      },
      zoom: 17,
      tilt: 60,
      bearing: 140,
      duration: 5000
    }, function() {
      console.log('マップ初期処理 アニメーション完了・マーカーセット開始');
      // ズームが終わったらマーカーを付ける
      this.map.addMarker({
        position: {
          lat: 35.658581,
          lng: 139.745433
        },
        title: 'Welecome to\nCordova GoogleMaps plugin',
        snippet: 'This plugin is awesome!',
        animation: plugin.google.maps.Animation.BOUNCE
      }, function(marker) {
        console.log('マップ初期処理 マーカーセット完了・マーカーイベント設定');
        // マーカーオブジェクトを退避する
        this.marker = marker;
        // インフォウィンドウを表示する
        marker.showInfoWindow();
        // マーカーのインフォウィンドウがクリックされた時のイベントを設定する
        marker.on(plugin.google.maps.event.INFO_CLICK, function() {
          console.log('マップ初期処理 マーカーイベント発火');
          alert('Hello world!');
        });
      }.bind(this));
    }.bind(this));
  },
  
  // マップ検索 (ジオコーディング)
  // ------------------------------------------------------------
  search() {
    console.log('マップ検索 開始');
    
    // マーカーがある場合はマーカーを削除しておく
    if(this.marker) {
      console.log('マップ検索 既存マーカー削除');
      this.marker.remove();
    }
    
    // ユーザ入力欄
    console.log('入力値', document.getElementById('address').value);
    var addressValue = document.getElementById('address').value + '';
    
    // 入力チェック
    if(!addressValue) {
      console.log('マップ検索 入力チェックエラー');
      document.getElementById('results').innerHTML = '<li class="error">住所を入力してください</li>';
      return;
    }
    
    // ジオコーディングを行う
    console.log('マップ検索 ジオコーディング検索処理開始');
    plugin.google.maps.Geocoder.geocode({
      address: addressValue
    }, function(results) {
      console.log('マップ検索 ジオコーディング検索処理完了');
      
      // 検索結果がない場合は終了
      if(!results.length) {
        console.log('マップ検索 ジオコーディング検索結果なし');
        document.getElementById('results').innerHTML = '<li class="error">指定の住所が見つかりませんでした</li>';
        return;
      }
      
      // 検索結果1件目の位置に移動する
      console.log('マップ検索 カメラ移動開始');
      var resultPosition = results[0].position;
      // 検索した位置にカメラ移動する
      this.map.animateCamera({
        target: resultPosition,
        zoom: 18,
        duration: 2000
      }, function() {
      console.log('マップ検索 カメラ移動完了・マーカーセット開始');
        this.map.addMarker({
          position: resultPosition,
          title: addressValue
        }, function(marker) {
          console.log('マップ検索 マーカーセット完了');
          // マーカーオブジェクトを退避する
          this.marker = marker;
          // インフォウィンドウを表示する
          marker.showInfoWindow();
        }.bind(this));
      }.bind(this));
    }.bind(this));
  }
};

// 初期処理を実行する
app.init();