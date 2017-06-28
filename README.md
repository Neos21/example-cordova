# CordovaExamples

Cordova を使って iOS アプリを作成するサンプル。

# cordova-plugin-dialogs

cordova-plugin-dialogs を使うと、アラートを表示させたりビープ音を鳴らしたりでる。

```sh
# プラグインをインストールする
$ cordova plugin add cordova-plugin-dialogs --save

# ブラウザでの確認時は window.alert・window.confirm・windor.prompt が使用される
$ cordova serve browser

# iOS シミュレータを起動して確認する
$ cordova emulate ios
```