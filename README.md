# ticketing 
## 説明
これは学習目的で開発したシンプルなチケッティングEコマースアプリケーションです。以下の機能をサポートしています。
- チケットの作成、編集、削除
- チケットの注文
- チケットの購入
<p align="center">
  <img width="793" alt="image" src="https://github.com/user-attachments/assets/bccd614c-57f8-4ad1-976d-a2cf001d2249">
</p>


## アプリ概要
このチケットアプリは小規模で独立したサービスからなるマイクロサービスアプリケーションです。バックグラウンドで動作するサービスは6つあり、Auth、Client、Tickets、Orders、Payments、Expirationです。
これらはKubernetesクラスタにデプロイされており、外部から各サービスへのトラフィックのロードバランシングはイングレスコントローラによって管理されています。
アプリはマイクロサービスアーキテクチャに従っているため、これらのサービスは直接通信しません。
代わりに、各サービスがタスクを実行するたびに発行するイベントは、イベントバスとして使用されるNATS-Streaming Serverに送信され、Pub-Subモデルを通じて適切なサービスに送信されます。
<p align="center">
  <img width="730" alt="image" src="https://github.com/user-attachments/assets/b1cf9126-1063-4c93-ba35-f1ca22b36fd3">
</p>

## Clientサービス

### 概要
ClientサービスはReactアプリを提供し、ユーザーアクションに応じて他のサービスと通信します。
例えば、ユーザーがタイトルと価格を入力してチケットを作成し、「Submit」ボタンをクリックすると、HTTP POSTリクエストがticketsサービスに送信されます。

## Authサービス
### 概要
Authサービスはユーザー認証に関する機能を提供します。
主な機能は、サインアップ（ユーザー登録）、サインイン、サインアウト、現在のユーザー情報の取得です。
サインアップ時には、ユーザー情報がデータベースに登録され、サーバー側でセッション管理用のJWTが生成されます。
また、JWTを使って認証済みユーザー情報をリクエストオブジェクトに付加するミドルウェアもあり、一度ログインすれば再度サインインする必要はありません。

### ルート
<p align="center">
  <img width="597" alt="image" src="https://github.com/user-attachments/assets/7ceab497-e749-45d8-8b84-05041ca224d0">
</p>

### データモデル
<p align="center">
  <img width="267" alt="image" src="https://github.com/user-attachments/assets/66026913-2b30-46c7-9a9b-9ea40ac0a5e3">
</p>

## Ticketsサービス

### 概要
Ticketsサービスはチケットの作成、取得、更新機能を提供し、イベントをNATS-Streaming Serverを通じて発行します。
また、作成・更新されたすべてのチケットを保存するためのMongoDBデータベースを保持しています。

### ルート
<p align="center">
  <img width="577" alt="image" src="https://github.com/user-attachments/assets/8a86319e-e9e0-4d14-8aef-e0f0589a87ea">
</p>

### データモデル
<p align="center">
  <img width="178" alt="image" src="https://github.com/user-attachments/assets/ad3cd0e9-8057-4dd1-91c7-4fc0c17fdb29">
</p>

### イベント
このサービスのイベントには以下の種類があり、他のサービスに対して以下のように発行されます。

### ticket:created
<p align="center">
  <img width="835" alt="image" src="https://github.com/user-attachments/assets/47fa7ce1-84b6-4ba5-9a46-82076c8016bf">
</p>

### ticket:updated
<p align="center">
  <img width="832" alt="image" src="https://github.com/user-attachments/assets/bbcf6a72-de83-4dfc-bb51-f7b631036e10">
</p>

## Ordersサービス

### 概要
Ordersサービスは、チケットの注文の作成、取得、削除機能を提供し、イベントをNATS-Streaming Serverを通じて発行します。
また、作成・更新されたすべての注文を保存するためのMongoDBデータベースを保持しています。

### ルート
<p align="center">
  <img width="594" alt="image" src="https://github.com/user-attachments/assets/e48c2402-4ea8-4a61-9a16-08caa38e6304">
</p>

### データモデル
<p align="center">
  <img width="427" alt="image" src="https://github.com/user-attachments/assets/abbac086-1dcd-4436-b789-436d8b2e8f48">
</p>

### イベント
このサービスのイベントには以下の種類があり、他のサービスに対して以下のように発行されます。

### order:created
<p align="center">
  <img width="917" alt="image" src="https://github.com/user-attachments/assets/ef7e3b09-45f1-4f12-ada9-558f14027188">
</p>

### order:cancelled
<p align="center">
  <img width="914" alt="image" src="https://github.com/user-attachments/assets/54921b60-7b0e-4bee-ae98-f8d5e9829707">
</p>

## Paymentsサービス

### 概要
Paymentsサービスは、ユーザーが注文に対して支払いを行う機能を提供し、Stripeを使用して決済を処理、支払い情報をデータベースに記録し、イベントをNATS-Streaming Serverを通じて発行します。

### ルート
<p align="center">
  <img width="672" alt="image" src="https://github.com/user-attachments/assets/059ce70c-99e4-4723-bd74-16d2dce629e7">
</p>

### データモデル
<p align="center">
  <img width="341" alt="image" src="https://github.com/user-attachments/assets/0dbc6d39-bc70-4de9-b2eb-3b8dbdf10525">
</p>

### イベント
このサービスのイベントには以下の種類があり、他のサービスに対して以下のように発行されます。

### payment:created
<p align="center">
  <img width="832" alt="image" src="https://github.com/user-attachments/assets/6f7492a6-59c5-4489-82e5-3b6ab90a4958">
</p>

## Expirationサービス

### 概要
Expirationサービスは、注文作成時にその有効期限を管理し、期限切れ時にorderStatusを更新するジョブをキューにスケジューリングします。

### イベント
このサービスのイベントには以下の種類があり、他のサービスに対して以下のように発行されます。

### expiration:complete
<p align="center">
  <img width="835" alt="image" src="https://github.com/user-attachments/assets/5953e6c2-d848-45a8-ac53-d42996aa9ae3">
</p>
