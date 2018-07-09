# CordovaExamples

Cordova を使って iOS アプリを作成するサンプル。


## How To Use?

Cordova というフレームワークを使用し iOS アプリをビルドするため、XCode および iOS シミュレータをインストールしておいてください。

Cordova プロジェクトの操作のため、npm にて Cordova をグローバルインストールする必要があります。本プロジェクトの開発には `cordova@7.0.1` を使用しています。

```sh
# Cordova のグローバルインストール
$ npm install -g cordova
```

__各ブランチは単独で動作するように、最小限のアプリを作っています。__

`git clone` 後、任意のブランチに切り替えたら、以下のようにして Cordova プロジェクトをビルドしてみてください。

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


## Author

[Neo](http://neo.s21.xrea.com/) ([@Neos21](https://twitter.com/Neos21))


## Links

- [Neo's World](http://neo.s21.xrea.com/)
- [Corredor](http://neos21.hatenablog.com/)
- [Murga](http://neos21.hatenablog.jp/)
- [El Mylar](http://neos21.hateblo.jp/)
- [Bit-Archer](http://bit-archer.hatenablog.com/)
- [GitHub - Neos21](https://github.com/Neos21/)
