# CordovaExamples

Cordova を使って iOS アプリを作成するサンプル。

# PluginConsole

cordova-plugin-console を導入すると XCode のコンソールに `console.log()` が出力されるようになる。

```sh
# プラグインのインストール
$ cordova plugin add cordova-plugin-console --save

# iOS アプリとしてビルド
$ cordova build ios
```

- `./platforms/ios/CordovaExamples.xcodeproj` を XCode で開く。
- View → Debug Area → Activate Console でコンソールウィンドウを開く。
- Product → Run で iOS シミュレータが起動する。
- XCode のコンソールに `console.log()` で記述した内容が出力されていることが分かる。
