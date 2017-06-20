# CordovaExamples

Cordova を使って iOS アプリを作成するサンプル。

# GoogleMaps

cordova-plugin-googlemaps を導入して、Google Maps を操作する。

Google Maps API にアクセスするため、事前に Google APIs で iOS アプリ用の API キーを払い出しておく必要がある。以下の Google Maps API のページにある「キーの取得」リンクから進められる。

- [Google Maps API](https://developers.google.com/maps/web/)
- 参考：[ねんでぶろぐ - Google Maps の APIキー を簡単に取得する](https://nendeb.com/276)

プラグインのインストール時に API キーが必要になる。この情報は `config.xml` に記載されるため、あとから修正することも可能。

```sh
# プラグインをインストールする
$ cordova plugin add cordova-plugin-googlemaps --variable API_KEY_FOR_IOS="ココに生成した API キーを入れる" --save
```

アプリを開いた時に Google マップの領域がグレーで、左下にロゴだけが出ている状態の場合は、API キーの認証が正しく通っていない場合が多い。`config.xml` に記載の API キーは正しいか、Google APIs に登録している「リクエストを受け入れる iOS アプリのバンドル ID」が `config.xml` に記載の識別子と一致しているか、などを確認したい。