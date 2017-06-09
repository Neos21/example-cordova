# CordovaExamples

Cordova を使って iOS アプリを作成するサンプル。

# SQLite Storage

cordova-sqlite-storage を使ってローカル DB を構築するサンプル。

```sh
# プラグインをインストールする
$ cordova plugin add cordova-sqlite-storage --save

# ブラウザで実装確認するには、ターゲットプラットフォームに「browser」を追加する
$ cordova platform add browser --save

# 以下で簡易サーバが起動し、http://localhost:8000/ で動作確認できるようになる
# ブラウザ利用時は window.openDatabase() を使用するため Chrome か Safari を推奨
$ cordova serve browser

# iOS シミュレータを起動して確認する
$ cordova emulate ios
```
