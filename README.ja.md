# TimeTreeからGoogleカレンダーへのコンバーター
TimeTreeの公開カレンダーをGoogleカレンダーにインポートするためのシンプルなウェブアプリケーションです。このプロジェクトは **Vite** と **React** で構築されています。

---

## 機能

-   **シームレスな連携**: TimeTreeの公開カレンダーのイベントを直接Googleカレンダーに変換し、移行します。
-   **使いやすいインターフェース**: TimeTreeの公開カレンダーURLを貼り付けて、ボタンをクリックするだけです。
-   **オープンソース**: このプロジェクトはオープンソースであり、誰でもコードを調べたり、貢献したり、自分で実行したりすることができます。

---

## 使い方

1.  GitHub Pagesで公開されているアプリケーションにアクセスします。
2.  TimeTreeの公開カレンダーのURL（例：`https://timetreeapp.com/public_calendars/hbn_187`）をコピーします。
3.  ページの入力欄にURLを貼り付けます。
4.  「Googleカレンダーに連携」ボタンをクリックします。
5.  画面の指示に従って認証を行い、イベントをGoogleカレンダーに追加します。

---

## 技術スタック

-   **フロントエンド**: React (Viteを使用)
-   **API連携**: TimeTree API、Google Calendar API
-   **スタイリング**: CSS

---

## 開発を始めるには

### 前提条件

-   Node.js (LTSバージョンを推奨)
-   npm または Yarn

### インストール

1.  リポジトリをクローンします:
    ```bash
    git clone [https://github.com/your-username/timetree-to-google-calendar-converter.git](https://github.com/your-username/timetree-to-google-calendar-converter.git)
    cd timetree-to-google-calendar-converter
    ```

2.  依存関係をインストールします:
    ```bash
    npm install
    # または yarn install
    ```

### ローカルでの実行

開発サーバーを起動するには:

```bash
npm run dev
# または yarn dev
npm run build
# または yarn build
```
アプリケーションは http://localhost:5173 で利用可能になります。

### 本番環境向けビルド
本番環境向けの静的サイトをビルドするには:

```bash
npm run build
# または yarn build
```
dist ディレクトリにビルドされたファイルが生成されます。これらのファイルをGitHub Pagesにデプロイできます。

# 貢献について
貢献を歓迎します！お気軽にIssueを作成したり、プルリクエストを送信したりしてください。

# ライセンス
このプロジェクトはMITライセンスで提供されています。