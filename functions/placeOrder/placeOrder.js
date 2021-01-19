const nodemailer = require('nodemailer');

const formatter = Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

function formatMoney(cents) {
  return formatter.format(cents / 100);
}

function generateOrderEmail({ order, total }) {
  return `<div>
      <h2>Your recent order for ${total}</h2>
      <p>Please start walking over, we will have your order total ready in the next 2o mins or whatever.</p>
      <ul>
        ${order
          .map(
            (item) => `<li>
          <img src="${item.thumbnail}" alt="${item.name}"/>
          ${item.size} ${item.name} - ${formatMoney(item.price)}
        </li>`
          )
          .join('')}
      </ul>
      <p>Your total is <strong>${total}</strong> due at pickup</p>
      <style>
        ul {
          list-style:none;
        }
      </style>

    </div> 
  `;
}

// create a transport for nodemailer
const transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  auth: {
    user: 'delaney.harvey@ethereal.email',
    pass: 'XAErzTyhHh1YWwH1fu',
  },
});

// TEST WAITING LOADING
function wait(ms = 0) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, ms);
  });
}

exports.handler = async (event, context) => {
  // validate the data is coming in correct

  // await wait(5000)

  const body = JSON.parse(event.body);
  // is they a bot check
  if (body.mapleSyrup) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: `beep boop bop zzzst goodbye - ERR 62531`,
      }),
    };
  }

  const requiredFields = ['email', 'name', 'order'];

  for (const field of requiredFields) {
    console.log(`Checking that ${field} is good`);
    if (!body[field]) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: `oops! You blew it! You missed the ${field} field`,
        }),
      };
    }
  }

  // make sure they actually have items in their order
  if (!body.order.length) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: `you ordered nothing. Whats wrong with you`,
      }),
    };
  }

  // send email

  const info = await transporter.sendMail({
    from: "Slick's Slices <slick@example.com>",
    to: `${body.name} <${body.email}>, orders@example.com`,
    subject: 'New Order!',
    html: generateOrderEmail({ order: body.order, total: body.total }),
  });

  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Success' }),
  };
};
