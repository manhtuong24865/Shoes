const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();
const sendEmailCreateOrder = async (email, orderItems) => {
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true, // `true` for port 465, `false` for all other ports
        auth: {
            user: process.env.MAIL_ACCOUNT,
            pass: process.env.MAIL_PASSWORD,
        },
    });

    let listItem = ''
    const attachImage = []
    orderItems.forEach((order ,user) => {
        listItem += `<div>
        <div>Chúc mừng bạn lại có thêm một đơn hàng là <b>${order.name}</b> với số lượng: <b>${order.amount}</b> và giá là: <b>${order.price} đ</b></div>
        <div>Bạn hãy chuẩn bị và giao đến khách hàng nhé </div>
        <div>Chúc bạn 1 ngày tốt lành </div>
        </div>`
        attachImage.push({path:order.image})

    })


    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: process.env.MAIL_ACCOUNT, // sender address
        to: process.env.MAIL_ACCOUNT, // list of receivers
        subject: "Bạn có đơn hàng nữa nè 👻", // Subject line
        text: "Hello world?", // plain text body
        html: `<div><b>Bạn có đơn hàng nữa nè 👻</b></div>${listItem}`, // html body
        attachments:attachImage,
    });
}


module.exports = {
    sendEmailCreateOrder
}