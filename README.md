# CordovaExamples

Cordova を使って iOS アプリを作成するサンプル。

# PluginStatusbar

cordova-plugin-statusbar を導入して、コンテンツがステータスバーに被らないようにする。

```sh
# プラグインのインストール
$ cordova plugin add cordova-plugin-statusbar --save
```

`config.xml` に以下のように設定を追加する。

```xml
<!-- コンテンツがステータスバーに被らないよう false を指定する -->
<preference name="StatusBarOverlaysWebView" value="false" />
<!-- ステータスバーの背景色 : 青くする -->
<preference name="StatusBarBackgroundColor" value="#0088ff" />
<!-- ステータスバーの文字色 : 白くする -->
<preference name="StatusBarStyle" value="lightcontent" />
```

```sh
# iOS 向けのビルドとシミュレータ起動
$ cordova emulate ios
```
