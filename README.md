# mizuho-link

JIS&T 連携テスト用 Web。  
ASWebAuthenticationSession (iOS) / Custom Tabs (Android) 向けに、**結果画面は出さず** 成功・失敗時すぐアプリへ redirect します。エラー表示は native（N018）側です。

## フロー

```
Mizuho App
  └─ ASWebAuthenticationSession / Custom Tabs
        └─ login.html
              ├─ 許可する（admin / admin）
              │     └─ mizuho://connect-account/result?status=success&linkageType=corporate_dc
              └─ 許可しない
                    └─ mizuho://connect-account/result?status=failure&errorCode=TEST-001
                          └─ App が callback URL を受け取り、N018 等で表示
```

## ログイン

| 項目 | 値 |
|------|-----|
| アカウント | `admin` |
| パスワード | `admin` |

- **許可する** + 正しい認証情報 → 成功 deep link（即 redirect）
- **許可しない** → 失敗 deep link（即 redirect）
- 認証情報が違う場合は Web 上にエラーを出し、アプリへは戻しません（再入力用）

## App が開く URL

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

`success.html` / `failure.html` を直接開いた場合も、同じ URL へ即 redirect します。

## ファイル

| ファイル | 用途 |
|----------|------|
| `login.html` | 認証スタブ（入口） |
| `choose.html` | テスト用。Success / Failure を即アプリへ返す |
| `success.html` | 即 success deep link |
| `failure.html` | 即 failure deep link |
| `js/auth.js` | ログイン判定 |
| `js/deeplink.js` | deep link redirect |
| `css/result.css` | 共通スタイル |

## ローカル確認

```bash
python3 -m http.server 3000
```

1. http://localhost:3000/login.html
2. `admin` / `admin` → 許可する → `mizuho://...status=success...`
3. 許可しない → `mizuho://...status=failure&errorCode=TEST-001`

実機では Custom Tabs / ASWebAuthenticationSession の callback に上記 scheme を設定してください。

## Deploy lên GitHub Pages

Repo: https://github.com/longpham1805/mizuho-link

### 1. Push code

```bash
git add .
git commit -m "Redirect success/failure straight back to the app"
git push origin main
```

### 2. Bật Pages

1. **Settings** → **Pages**
2. **Source**: **GitHub Actions** または **Deploy from a branch** (`main` / `/ (root)`)

> Repo cần **public** (hoặc tài khoản có GitHub Pages cho private).

### 3. URL sau khi deploy

Base: `https://longpham1805.github.io/mizuho-link/`

| Màn | URL |
|-----|-----|
| Login (入口) | https://longpham1805.github.io/mizuho-link/login.html |
| Success (即 redirect) | https://longpham1805.github.io/mizuho-link/success.html |
| Failure (即 redirect) | https://longpham1805.github.io/mizuho-link/failure.html |
