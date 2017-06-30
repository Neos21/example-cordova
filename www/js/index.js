// アプリ唯一のグローバル変数
var app = {
  
  // 初期処理
  // ------------------------------------------------------------
  init: function() {
    console.log('初期処理 開始');
    document.addEventListener("DOMContentLoaded", function() {
      console.log('DOM 構築完了');
      
      this.createOptions.bind(this);
      
      var setClickEvent = function(id, func) {
        document.getElementById(id).addEventListener('click', func, false);
      };
      var setChangeEvent = function(id, func) {
        document.getElementById(id).addEventListener('change', func, false);
      };
      
      setClickEvent('test', this.startTapPhoto.bind(this));
    }.bind(this), false);
  },
  
  // オプション項目の取得・設定
  // ------------------------------------------------------------
  createOptions: function() {
    console.log('オプション項目の取得・設定 開始');
    alert('オプション項目の取得・設定 開始');
    
    window.CameraPreview.getSupportedFocusModes(function(focusModes) {
      console.log('Focus Modes : ', focusModes);
    }, this.error.bind(this, 'Get Supported Focus Modes'));
    
    window.CameraPreview.getSupportedFlashModes(function(flashModes) {
      console.log('Flash Modes : ', focusModes);
    }, this.error.bind(this, 'Get Supported Flash Modes'));
    
    window.CameraPreview.getMaxZoom(function(maxZoom) {
      console.log('Max Zoom : ', maxZoom);
    }, this.error.bind(this, 'Get Max Zoom'));
    
    window.CameraPreview.getSupportedWhiteBalanceModes(function(whiteBalanceModes) {
      console.log('White Balance Modes : ', whiteBalanceModes);
    }, this.error.bind(this, 'Get White Balance Modes'));
    
    window.CameraPreview.getExposureModes(function(exposureModes) {
      console.log('Exposure Modes : ', exposureModes);
    }, this.error.bind(this, 'Get Exposure Modes'));
    
    window.CameraPreview.getExposureCompensationRange(function(expoxureCompensationRange) {
      console.log('Exposure Compensation Range (min, max) : ', expoxureCompensationRange);
    }, this.error.bind(this, 'Get Exposure Compensation Range'));

    window.CameraPreview.getSupportedPictureSizes(function(dimensions) {
      console.log('SupportedPictureSizes : ', dimensions);
    }, this.error.bind(this, 'Get Supported Picture Sizes'));
  },
  
  // 処理開始時のログ出力
  // ------------------------------------------------------------
  startLog: function(methodName) {
    console.log(methodName + ' 開始');
    return methodName;
  },
  
  // 処理成功時のコールバック関数雛形
  // ------------------------------------------------------------
  success: function(methodName) {
    console.log(methodName + ' 成功');
  },
  
  // 処理失敗時のコールバック関数雛形
  // ------------------------------------------------------------
  error: function(methodName, error) {
    console.log(methodName + ' 失敗 : ' + error);
  },
  
  // カメラ起動 : タップで撮影モード
  // ------------------------------------------------------------
  startTapPhoto: function() {
    var name = this.startLog('カメラ起動 : タップで撮影モード');
    // tapPhoto と tapFocus が両方 true だと、タップ時にフォーカスを合わせてから撮影する
    window.CameraPreview.startCamera({
      x: 0,
      y: 0,
      width: window.screen.width,
      height: 200,
      camera: window.CameraPreview.CAMERA_DIRECTION.BACK,
      toBack: false,
      tapPhoto: true,
      tapFocus: false,
      previewDrag: false
    }, this.success.bind(this, name), this.error.bind(this, name));
  },
  
  // カメラ起動 : バックグラウンドモード
  // ------------------------------------------------------------
  startToBack: function() {
    var name = this.startLog('カメラ起動 : バックグラウンドモード')
    window.CameraPreview.startCamera({
      x: 0,
      y: 0,
      width: window.screen.width,
      height: 200,
      camera: window.CameraPreview.CAMERA_DIRECTION.BACK,
      toBack: true,
      tapPhoto: true,
      tapFocus: true,
      previewDrag: false
    }, this.success.bind(this, name), this.error.bind(this, name));
  },
  
  // カメラ起動 : ドラッガブルプレビューモード
  // ------------------------------------------------------------
  startToBack: function() {
    var name = this.startLog('カメラ起動 : ドラッガブルプレビューモード');
    window.CameraPreview.startCamera({
      x: (window.screen.width / 4),
      y: 50,
      width: (window.screen.width / 2),
      height: 100,
      camera: window.CameraPreview.CAMERA_DIRECTION.BACK,
      toBack: false,
      tapPhoto: false,
      tapFocus: true,
      previewDrag: true
    }, this.success.bind(this, name), this.error.bind(this, name));
  },
  
  // カメラ終了
  // ------------------------------------------------------------
  stop: function() {
    var name = this.startLog('カメラ終了');
    window.CameraPreview.stopCamera(this.success.bind(this, name), this.error.bind(this, name));
  },
  
  // カメラ切替
  // ------------------------------------------------------------
  switch: function() {
    var name = this.startLog('カメラ切替');
    window.CameraPreview.switchCamera(this.success.bind(this, name), this.error.bind(this, name));
  },
  
  // カメラ表示
  // ------------------------------------------------------------
  show: function() {
    var name = this.startLog('カメラ表示');
    window.CameraPreview.show(this.success.bind(this, name), this.error.bind(this, name));
  },
  
  // カメラ非表示
  // ------------------------------------------------------------
  hide: function() {
    var name = this.startLog('カメラ非表示');
    window.CameraPreview.hide(this.success.bind(this, name), this.error.bind(this, name));
  },
  
  // 撮影
  // ------------------------------------------------------------
  takePicture: function() {
    var name = this.startLog('撮影');
    // width・height は未指定か 0 でデフォルト指定になる
    window.CameraPreview.takePicture({
      quality: 100,
      width: 0,
      height: 0
    }, function(imgData) {
      console.log(name + ' 成功 撮影結果を画面に表示');
      // 結果は JPG 形式の Base64 データとして受け取れる
      document.getElementById('result-photo').src = 'data:image/jpeg;base64,' + imgData;
    }, this.error.bind(this, name));
  },
  
  // CameraPreview.FOCUS_MODE : FIXED, AUTO, CONTINUOUS (iOS)
  // setFocusMode(focusMode, [successCallback, errorCallback])
  // getFocusMode(cb, [errorCallback])
  
  // CameraPreview.FLASH_MODE : OFF, ON, AUTO, TORCH (iOS)
  // setFlashMode(flashMode, [successCallback, errorCallback])
  // getFlashMode(cb, [errorCallback])
  
  // カラーエフェクト設定
  // ------------------------------------------------------------
  setColorEffect: function() {
    var name = this.startLog('カラーエフェクト設定');
    // CameraPreview.COLOR_EFFECT : MONO, NEGATIVE, NONE, POSTERIZE, SEPIA (iOS)
    var colorEffect = '';
    window.CameraPreview.setColorEffect(colorEffect, this.success.bind(this, name), this.error.bind(this, name));
  },
  
  // setZoom(zoomMultiplier, [successCallback, errorCallback])
  // getZoom(cb, [errorCallback])
  
  // CameraPreview.WHITE_BALANCE_MODE : LOCK, AUTO, CONTINUOUS, INCANDESCENT, CLOUDY_DAYLIGHT, DAYLIGHT, FLUORESCENT, SHADE, TWILIGHT, WARM_FLUORESCENT (iOS)
  // getWhiteBalanceMode(cb, [errorCallback])
  // setWhiteBalanceMode(whiteBalanceMode, [successCallback, errorCallback])

  // CameraPreview.EXPOSURE_MODE : AUTO, CONTINUOUS, CUSTOM, LOCK (iOS)
  // getExposureMode(cb, [errorCallback])
  // setExposureMode(exposureMode, [successCallback, errorCallback])

  // getExposureCompensation(cb, [errorCallback])
  // setExposureCompensation(exposureCompensation, [successCallback, errorCallback])

  // プレビューサイズ設定
  // ------------------------------------------------------------
  setPreviewSize: function() {
    var name = this.startLog('プレビューサイズ設定');
    window.CameraPreview.setPreviewSize({
      width: 240,
      height: 320
    }, this.success.bind(this, name), this.error.bind(this, name));
  },
  
  // フォーカス設定
  // ------------------------------------------------------------
  tapToFocus: function() {
    var name = this.startLog('プレビューサイズ設定');
    var xPoint = 50;
    var yPoint = 50;
    window.CameraPreview.tapToFocus(xPoint, yPoint, this.success.bind(this, name), this.error.bind(this, name));
  }
}

// 初期処理を実行する
app.init();