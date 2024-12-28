const emailTemplate = (code) => `
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Xác Thực</title>
</head>
<body style="font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f4f4f9;">
    <div style="width: 100%; max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
        <div style="text-align: center; margin-bottom: 20px;">
            <h1 style="font-size: 28px; color: #4CAF50; margin: 0;">Xác Thực Tài Khoản</h1>
        </div>
        <div style="font-size: 16px; color: #333333; line-height: 1.5; margin-bottom: 20px;">
            <p style="margin: 10px 0;">Chào bạn,</p>
            <p style="margin: 10px 0;">Cảm ơn bạn đã đăng ký tài khoản tại <strong>Website của chúng tôi</strong>.</p>
            <p style="margin: 10px 0;">Để hoàn tất quá trình đăng ký, vui lòng nhập mã xác thực dưới đây:</p>
            <div style="display: flex; justify-content: center; align-items: center; background-color: #f0f8ff; padding: 15px; border-radius: 8px; font-size: 24px; font-weight: bold; color: #007BFF; margin: 20px 0;">
                <span>${code}</span>
            </div>
            <p style="margin: 10px 0;">Mã xác thực này sẽ hết hạn sau 10 phút. Nếu bạn không yêu cầu mã xác thực này, vui lòng bỏ qua email này.</p>
        </div>
        <div style="text-align: center; font-size: 14px; color: #777777;">
            <p style="margin: 10px 0;">Chúc bạn một ngày tốt lành!</p>
            <p style="margin: 10px 0;"><a href="#" style="color: #007BFF; text-decoration: none;">Xem thêm thông tin tại đây</a></p>
        </div>
    </div>
</body>
</html>
`;

module.exports = emailTemplate