# CordovaExamples

Cordova を使って iOS アプリを作成するサンプル。

# Install Cordova Project

Cordova プロジェクトの導入コマンドは以下のとおり。

```javascript
# Cordova をグローバルインストールする
# バージョンアップによる影響を避けるため、バージョン固定で導入している
$ npm install -g cordova@7.0.1

# Cordova プロジェクトを作る
$ cordova create CordovaExamples com.example.cordova CordovaExamples

# 作成した Cordova プロジェクトに移動する
$ cd CordovaExamples/

# ターゲットプラットフォームに iOS を追加し、config.xml に追記する
$ cordova platform add ios --save

# ビルドコマンド
$ cordova build ios

# iOS シミュレータを起動する
$ cordova emulate ios
```
