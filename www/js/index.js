// アプリ唯一のグローバル変数
var app = {
  
  // 操作するファイル名
  // ------------------------------------------------------------
  fileName: 'Temp.txt',
  
  // 初期処理
  // ------------------------------------------------------------
  init: function() {
    console.log('初期処理');
    
    document.addEventListener("DOMContentLoaded", function() {
      console.log("DOM 構築完了 → イベント定義");
      
      document.getElementById('check').addEventListener('click', this.check.bind(this), false);
      document.getElementById('create').addEventListener('click', this.create.bind(this), false);
      document.getElementById('append').addEventListener('click', this.append.bind(this), false);
      document.getElementById('read').addEventListener('click', this.read.bind(this), false);
      document.getElementById('delete').addEventListener('click', this.delete.bind(this), false);
    }.bind(this), false);
  },

  // ファイル存在確認
  // ------------------------------------------------------------
  check: function() {
    console.log('ファイル存在確認 開始');
    
    window.resolveLocalFileSystemURL(cordova.file.tempDirectory + this.fileName, function(fileSystem) {
      if(fileSystem.isFile) {
        console.log('ファイル存在確認 存在する');
        document.getElementById('results').innerHTML = '<li>ファイルは存在します</li>';
        return true;
      }
      else {
        console.log('ファイル存在確認 存在しない');
        document.getElementById('results').innerHTML = '<li>ファイルは存在しません</li>';
        return false;
      }
    }.bind(this), function(error) {
      console.log('ファイル存在確認 Resolve エラー', error);
      if(error.code === 1) {
        document.getElementById('results').innerHTML = '<li class="error">ファイルは存在しません : ' + error.code + '</li>';
      }
      else {
        document.getElementById('results').innerHTML = '<li class="error">ファイル存在確認中にエラーが発生しました : ' + error.code + '</li>';
      }
    });
  },
  
  // ファイル生成 (既に存在している場合は新たに上書きする)
  // ------------------------------------------------------------
  create: function() {
    console.log('ファイル生成 開始');

    var options = {
      create: true,     // ファイルを新規生成する
      exclusive: false  // ファイルが存在する場合にエラーにしない
    }
    
    window.resolveLocalFileSystemURL(cordova.file.tempDirectory, function(fileSystem) {
      fileSystem.getFile(this.fileName, options, function(result) {
        console.log('ファイル生成 完了', result);
        document.getElementById('results').innerHTML = '<li>ファイル生成完了</li>';
      }, function(getFileError) {
        console.log('ファイル生成 GetFile エラー', getFileError);
        document.getElementById('results').innerHTML = '<li class="error">ファイルの新規生成中にエラーが発生しました : ' + getFileError.code + '</li>';
      });
    }.bind(this), function(error) {
      console.log('ファイル生成 Resolve エラー', error);
      document.getElementById('results').innerHTML = '<li class="error">ファイル取得処理中にエラーが発生しました : ' + error.code + '</li>';
    })
  },
  
  // ファイル追記
  // ------------------------------------------------------------
  append: function() {
    console.log('ファイル追記 開始');
    
    window.resolveLocalFileSystemURL(cordova.file.tempDirectory, function(fileSystem) {
      fileSystem.getFile(this.fileName, { create: false }, function(fileEntry) {
        fileEntry.createWriter(function(writer) {
          // ファイルの末尾まで移動する
          writer.seek(writer.length);
          // 書き込み終了時の処理
          writer.onwriteend = function(event) {
            if(this.error) {
              console.log('ファイル追記 追記エラー', this.error, event);
              document.getElementById('results').innerHTML = '<li class="error">ファイル追記に失敗しました : ' + this.error + '</li>';
            }
            else {
              console.log('ファイル追記 完了', event);
              document.getElementById('results').innerHTML = '<li>ファイル追記完了</li>';
            }
          };
          // 現在日時 + 改行コードを書き込む
          var text = new Date() + '¥n';
          writer.write(text);
        });
      }, function(getFileError) {
        console.log('ファイル追記 GetFile エラー', getFileError);
        if(getFileError.code === 1) {
          document.getElementById('results').innerHTML = '<li class="error">ファイルが存在しないため追記できません : ' + getFileError.code + '</li>';
        }
        else {
          document.getElementById('results').innerHTML = '<li class="error">ファイル追記処理中にエラーが発生しました : ' + getFileError.code + '</li>';
        }
      });
    }.bind(this), function(error) {
      console.log('ファイル追記 Resolve エラー', error);
      document.getElementById('results').innerHTML = '<li class="error">ファイル取得処理中にエラーが発生しました : ' + error.code + '</li>';
    });
  },
  
  // ファイル読込
  // ------------------------------------------------------------
  read: function() {
    console.log('ファイル読込 開始');
    
    window.resolveLocalFileSystemURL(cordova.file.tempDirectory, function(fileSystem) {
      fileSystem.getFile(this.fileName, { create: false }, function(fileEntry) {
        fileEntry.file(function(fileData) {
          var reader = new FileReader();
          // ファイル読込後の処理
          reader.onloadend = function(event) {
            if(event.target.result !== undefined || event.target.result !== null) {
              // 正常
              console.log('ファイル読込 完了', event.target.result, event);
              // 改行 ¥n を <br> に変換して表示する
              document.getElementById('results').innerHTML = '<li>ファイル読込完了 : <pre>' + event.target.result.replace(/(¥r¥n|¥n|¥r)/gm, '<br>') + '</pre></li>';
            }
            else if(event.target.error !== undefined || event.target.error !== null) {
              console.log('ファイル読込 エラー', event.target.error, event);
              document.getElementById('results').innerHTML = '<li class="error">ファイル読込エラー : ' + event.target.error + '</li>';
            }
            else {
              console.log('ファイル読込 原因不明エラー');
              document.getElementById('results').innerHTML = '<li class="error">ファイル読込エラー</li>';
            }
          };
          reader.readAsText(fileData);
        });
      }, function(getFileError) {
        console.log('ファイル読込 GetFile エラー', getFileError);
        if(getFileError.code === 1) {
          document.getElementById('results').innerHTML = '<li class="error">ファイルが存在しないため読込できません : ' + getFileError.code + '</li>';
        }
        else {
          document.getElementById('results').innerHTML = '<li class="error">ファイル読込処理中にエラーが発生しました : ' + getFileError.code + '</li>';
        }
      });
    }.bind(this), function(error) {
      console.log('ファイル読込 Resolve エラー', error);
      document.getElementById('results').innerHTML = '<li class="error">ファイル取得処理中にエラーが発生しました : ' + error.code + '</li>';
    });
  },
  
  // ファイル削除
  // ------------------------------------------------------------
  delete: function() {
    console.log('ファイル削除 開始');

    window.resolveLocalFileSystemURL(cordova.file.tempDirectory, function(fileSystem) {
      fileSystem.getFile(this.fileName, { create: false }, function(fileEntry) {
        fileEntry.remove(function() {
          console.log('ファイル削除 成功');
          document.getElementById('results').innerHTML = '<li>ファイル削除完了</li>';
        }, function(removeError) {
          console.log('ファイル削除 失敗', removeError);
          document.getElementById('results').innerHTML = '<li>ファイル削除に失敗しました : ' + removeError + '</li>';
        });
      }, function(getFileError) {
        console.log('ファイル削除 GetFile エラー', getFileError);
        if(getFileError.code === 1) {
          document.getElementById('results').innerHTML = '<li class="error">ファイルが存在しないため削除できません : ' + getFileError.code + '</li>';
        }
        else {
          document.getElementById('results').innerHTML = '<li class="error">ファイル削除処理中にエラーが発生しました : ' + getFileError.code + '</li>';
        }
      });
    }.bind(this), function(error) {
      console.log('ファイル削除 Resolve エラー', error);
      document.getElementById('results').innerHTML = '<li class="error">ファイル取得処理中にエラーが発生しました : ' + error.code + '</li>';
    });
  }
}

// 初期処理を実行する
app.init();