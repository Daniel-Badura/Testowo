export const setMailOptions = ({ from, to, subject, name, lastname, orderNumber, orderDate, orderItems, totalPrice }) => {
    const html = `
        <style>
            body {
                font-family: Arial, sans-serif;
            }
            h1 {
                color: #007BFF;
                margin-bottom: 20px;
            }
            table {
                width: 100%;
                margin-bottom: 20px;
                border-collapse: collapse;
            }
            th, td {
                padding: 10px;
                text-align: left;
                border-bottom: 1px solid #ddd;
            }
            th {
                width: 30%;
                font-weight: bold;
            }
            td {
                width: 70%;
            }
            p {
                margin-bottom: 10px;
            }
            .note {
                font-size: 12px;
                color: #777;
            }
        </style>
        <h1>Order Confirmation</h1>
        <p>Dear ${name} ${lastname},</p>
        <p>Thank you for placing an order with Web-Sklep! Your order has been confirmed and is being processed. Please find the order details below:</p>
        <table>
            <tr>
                <th>Order Number:</th>
                <td>${orderNumber}</td>
            </tr>
            <tr>
                <th>Order Date:</th>
                <td>${orderDate}</td>
            </tr>
            <tr>
                <th>Items:</th>
                <td>
                    <table>
                        ${orderItems.map(item => "<tr><td>" + item.name + "</td><td>" + item.quantity + " x " + item.price + "€ </td></tr>").join('')}
                    </table>
                </td>
            </tr>
            <tr>
                <th>Total Amount:</th>
                <td>${totalPrice}€</td>
            </tr>
        </table>
        <p>Thank you for choosing Web-Sklep for your online shopping needs. If you have any questions or concerns, please feel free to contact us.</p>
        <p class="note">Best regards,<br>Web-Sklep Team</p>
    `;

    return {
        from: from,
        to: to,
        subject: subject || 'Order Confirmation - Web-Sklep',
        html: html
    };
};
