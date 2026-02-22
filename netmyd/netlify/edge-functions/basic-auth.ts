export default async (request: Request, context: any) => {
  // ★ ここに好きなパスワードだけ設定してください ★
  const PASSWORD = '76063';

  const authHeader = request.headers.get('authorization');

  if (authHeader) {
    // 送られてきた暗号（Base64）を元に戻してチェックする
    const base64Credentials = authHeader.split(' ')[1];
    const decoded = atob(base64Credentials);
    const [username, password] = decoded.split(':');

    // ★ ユーザー名(username)は無視して、パスワードだけ確認する ★
    if (password === PASSWORD) {
      return context.next(); // パスワードが合っていればページを表示
    }
  }

  // 認証に失敗した、またはまだ入力していない場合はポップアップを出す
  return new Response('認証が必要です', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Secure Area"',
    },
  });
};