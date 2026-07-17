# mizuho-link

JIS&T 連携の **結果画面のみ**（暫定フロー）。  
認証画面はまだ使わず、アプリから直接 success / failure を開き、ボタンでアプリへ戻します。

## 暫定フロー（認証スキップ）

```
Mizuho App
  └─ Linking.openURL( success.html or failure.html )
        └─ ブラウザで結果画面表示
              └─ 「アプリに戻る」 / 自動遷移
                    └─ mizuho://connect-account/result?...
                          └─ App の ConnectAccountResultScreen
```

## App が開く URL

| 結果 | 開くページ |
|------|------------|
| 成功 | `/success.html?linkageType=corporate_dc` |
| 失敗 | `/failure.html?errorCode=APP-MSG-ERR-0001` |

例（ローカル）:

```
http://localhost:3000/success.html?linkageType=corporate_dc
http://localhost:3000/failure.html?errorCode=TEST-001
```

## アプリへ返す Deep link

| 結果 | Deep link |
|------|-----------|
| 成功 | `mizuho://connect-account/result?status=success&linkageType={type}` |
| 失敗 | `mizuho://connect-account/result?status=failure&errorCode={code}` |

- ボタン「アプリに戻る」で発火
- 約 1.5 秒後に自動でも発火（`auto=0` で無効化可）

## ファイル

| ファイル | 用途 |
|----------|------|
| `success.html` | 成功画面 |
| `failure.html` | 失敗画面 |
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

ブラウザ確認（deep link を飛ばさない）:

- http://localhost:3000/success.html?linkageType=corporate_dc&auto=0
- http://localhost:3000/failure.html?errorCode=TEST-001&auto=0

実機では `auto=0` を外し、アプリから上記 URL を `Linking.openURL` で開いてください。

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
| Success | https://longpham1805.github.io/mizuho-link/success.html?linkageType=corporate_dc |
| Failure | https://longpham1805.github.io/mizuho-link/failure.html?errorCode=TEST-001 |

App mở URL này bằng `Linking.openURL(...)`.

## 今後

JIS&T 認証を挟む本番フローに戻すときは、認証完了後のコールバックから本ページを配信する想定です。現状はその手前の往復確認用です。
