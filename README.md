# gxcert
gxcertのフロントWebアプリケーションです。

以下の技術を使用しています。
* IOTA
* React.js

以下のバージョンが必要です。
* Node.js v14.6.0
* npm 6.14.6


### 実行方法
**1. git clone**
```bash
git clone git@github.com:gaiax/gxcert-react.git
```

**2. npm install**
```bash
cd /path/to/gxcert-react
npm install
```

**3. start dev server**
```bash
npm start
```

**4. access local server**

ブラウザで以下のurlを開いてください。

http://localhost:3000

**5. Google login**

自分のgmailアカウントでログインしてください。

**6. Copy your address from developer console**

コピーしたアドレスが、そのアカウントに証明書を発行するためのアドレスです。

### 証明書の発行
1. Issueタブをクリック

2. Toに、証明書を発行する相手のアドレスを入力する

3. 証明書の画像を選択する

4. Issueボタンをクリックする

### 通信の種類
**getProfile**

params:
 - IOTA First Address

response:
 - name
 - thumbnail icon
 - RSA public key

**getCertificates**

params:
 - IOTA First Address

response:
 - certificates
   - IPFS Hash
   - timestamp
   - RSA signature
   - issueser

**registerName**

params:
 - name

**registerIcon**

params:
 - icon (IPFS Hash)

**registerPubKey**

params:
 - RSA public key

**getFirstAddress**

params:
 - IOTA Seed

**getBundles**

params:
 - IOTA First Address



