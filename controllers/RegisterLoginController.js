const SendMail = require('../helpers/nodemailer')
const randomCode = require('../helpers/randomCode')

const Xacthuc = async (req, res) => {
    const email = req.body
    const code = randomCode
    const subject = 'CNCODE | MÃ XÁC THỰC EMAIL'
    const html = `
    <html>
        <body>
            <div class="email">
                <div class="content">
                    <h1>CNcode | Mã xác thực Email</h1> 
                    <div class="line"></div>
                    <h3>
                        Bên dưới là mã xác thực CNcode gửi đến bạn:
                        <br/> - Bạn không được gửi mã xác thực này đến bất kì người nào khác.
                        <br/> - Mã xác thực chỉ có thời hạn trong vòng 3 phút, nên bạn hãy cân nhắc.
                    </h3>
                    <div class="code">
                        <h2 class="text">${code}</h2>
                    </div>
                </div>
            </div>

            <style>
                body{
                margin:50px;
                }
            /* Container style */
            .email {
                margin: 0px auto;
                padding: 20px;
                border-radius: 10px;
                display: flex;
                justify-content: center;
                align-items: center;
                max-width: 400px;
                background-color: #fff;
                box-shadow: rgba(0, 0, 0, 0.1) 0px 5px 15px;
                font-family: 'Arial', sans-serif;
            }
            
            /* Title styling */
            h1 {
                font-size: 28px;
                text-align: center;
                color: #333;
                margin-bottom: 20px;
            }
            
            /* Content paragraph styling */
            h3 {
                font-size: 16px;
                color: #555;
                font-weight: 500;
                line-height: 1.5;
                margin-bottom: 30px;
            }

            /* Line under title */
            .line {
                width: 100%;
                height: 3px;
                background-color: #4CAF50;
                margin-bottom: 20px;
            }
            
            /* Code block style */
            .code {
                display: flex;
                justify-content: center;
                align-items: center;
                background-color: #f0f0f0;
                width: 150px;
                height: 50px;
                border-radius: 8px;
                margin: 0 auto;
                box-shadow: rgba(0, 0, 0, 0.1) 0px 3px 6px;
            }
            
            /* Code text style */
            h2.text {
                font-size: 24px;
                color: #333;
                font-weight: bold;
                margin: 0;
            }
            </style>
        </body>
    </html>`

    let send = await SendMail({
        email: email,
        subject: subject,
        html: html
    })

    if (send) {
        return {
            EM: 'Đã gửi mã xác thực đến Email của bạn',
            EC: 0,
            DT: ''
        }
    } else {
        return {
            EM: 'Không thể gửi mã xác thực đến Email của bạn',
            EC: -1,
            DT: ''
        }
    }
}

module.exports = {
    Xacthuc
}