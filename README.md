# CordovaExamples

Cordova を使って iOS アプリを作成するサンプル。

# How To Use?

Cordova というフレームワークを使用し iOS アプリをビルドするため、XCode および iOS シミュレータをインストールしておいてください。

Cordova プロジェクトの操作のため、npm にて Cordova をグローバルインストールする必要があります。本プロジェクトの開発には cordova@7.0.1 を使用しています。

```sh
# Cordova のグローバルインストール
$ npm install -g cordova
```

各ブランチ単独で動作するよう、最小限のアプリを作っています。`git clone` 後、任意のブランチに切り替えたら、以下のようにして Cordova プロジェクトをビルドしてみてください。

```sh
# config.xml に記載のプラットフォーム・プラグインを復元する
$ cordova prepare

# iOS 向けのビルドとシミュレータ起動
$ cordova serve ios
```

プラグインの対応状況によりますが、Mac のブラウザで簡易的な確認もできます。

```sh
# ブラウザ用にビルドし、簡易サーバを起動する
$ cordova serve browser
```