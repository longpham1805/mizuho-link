# mizuho-link

JIS&T 連携のテスト用 Web フロー。  
ログイン後に Success / Failure を選び、アプリへ deep link で戻します。

## フロー

```
Mizuho App
  └─ Linking.openURL( login.html )
        └─ ログイン（admin / admin）
              └─ choose.html で Success / Failure を選択
                    └─ 「アプリに戻る」 / 自動遷移
                          └─ mizuho://connect-account/result?...
```

## ログイン

| 項目 | 値 |
|------|-----|
| アカウント | `admin` |
| パスワード | `admin` |

未ログインで `success.html` / `failure.html` / `choose.html` を開くと `login.html` へリダイレクトされます。

## App が開く URL

入口:

```
https://longpham1805.github.io/mizuho-link/login.html
```

ローカル:

```
http://localhost:3000/login.html
```

## アプリへ返す Deep link（固定）

| 結果 | Deep link |
|------|-----------|
| 成功 | `mizuho://connect-account/result?status=success&linkageType=corporate_dc` |
| 失敗 | `mizuho://connect-account/result?status=failure&errorCode=TEST-001` |

- ボタン「アプリに戻る」で発火
- 約 1.5 秒後に自動でも発火（`auto=0` で無効化可）

## ファイル

| ファイル | 用途 |
|----------|------|
| `login.html` | ログイン画面 |
| `choose.html` | Success / Failure 選択 |
| `success.html` | 成功画面（要ログイン） |
| `failure.html` | 失敗画面（要ログイン） |
| `js/auth.js` | ログイン判定 |
| `js/deeplink.js` | deep link 組み立て・遷移 |
| `css/result.css` | 共通スタイル |

## オプションクエリ

| パラメータ | 説明 |
|------------|------|
| `auto=0` | 自動でアプリへ戻らない（ボタンのみ） |
| `delay=3000` | 自動遷移までの待ち時間（ms、既定 1500） |

## ローカル確認

```bash
python3 -m http.server 3000
```

ブラウザ確認:

1. http://localhost:3000/login.html → `admin` / `admin`
2. choose で Success / Failure を選択
3. 結果画面で deep link を飛ばさない場合は `?auto=0` を付与

実機ではアプリから `login.html` を `Linking.openURL` で開いてください。

## Deploy lên GitHub Pages

Repo: https://github.com/longpham1805/mizuho-link

### 1. Push code (nếu chưa)

```bash
git add .
git commit -m "Add result pages and GitHub Pages deploy"
git push origin main
```

### 2. Bật Pages trên GitHub

1. Mở **Settings** → **Pages**
2. **Source**: chọn **GitHub Actions**
3. Đợi workflow **Deploy GitHub Pages** chạy xong (tab **Actions**)

Hoặc cách đơn giản không cần Actions:

1. **Settings** → **Pages**
2. **Source**: **Deploy from a branch**
3. Branch: `main` / folder: `/ (root)` → **Save**

> Repo cần **public** (hoặc tài khoản có GitHub Pages cho private).

### 3. URL sau khi deploy

Base: `https://longpham1805.github.io/mizuho-link/`

| Màn | URL |
|-----|-----|
| Login (入口) | https://longpham1805.github.io/mizuho-link/login.html |
| Success | https://longpham1805.github.io/mizuho-link/success.html |
| Failure | https://longpham1805.github.io/mizuho-link/failure.html |

App mở **login.html** bằng `Linking.openURL(...)`.

## 今後

JIS&T 認証を挟む本番フローに戻すときは、認証完了後のコールバックから本ページを配信する想定です。現状はその手前の往復確認用です。
