# ReactChatRoom
Vite + React + TypeScriptのチャットアプリケーションサンプル。

## Firebase
BackendはFirebase Authentication, Cloud Firestore, Storageを使用しているため、
FireBaseのConfigは.envで設定を行う。

## 使い方
```
docker-compose build
docker-compose up -d
```

## できること
- アカウント登録（メールアドレス+パスワード)
- ログイン、ログアウト
- 表示名設定、アイコン画像設定
- メッセージ送信
