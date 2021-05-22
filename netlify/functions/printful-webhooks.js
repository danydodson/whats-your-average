require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})
const sgMail = require("@sendgrid/mail")
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

exports.handler = async ({ body }) => {
  let type
  let data

  // const test = JSON.parse(body)
  // console.log(JSON.stringify(test, null, 2))

  try {
    ;({ type, data } = JSON.parse(body)) //re-descture type and data from body (adds that bonkers semicolon)
  } catch (err) {
    console.error(err)
    return {
      statusCode: 500,
      body: "oops",
    }
  }

  const {
    id,
    shipping,
    recipient,
    items,
    incomplete_items,
    retail_costs,
    shipments,
    gift,
    packing_slip,
  } = data.order

  const templates = {
    order_created: process.env.SENDGRID_ORDER_CREATED,
    order_canceled: process.env.SENDGRID_ORDER_CANCELED,
    order_failed: process.env.SENDGRID_ORDER_FAILED,
    package_shipped: process.env.SENDGRID_PACKAGE_SHIPPED,
    package_returned: process.env.SENDGRID_PACKAGE_RETURNED,
  }

  const msg = {
    to: recipient.email,
    from: process.env.FROM_EMAIL_ADDRESS,
    templateId: templates[type],
    dynamicTemplateData: {
      subject: `${type} (noreply)`,
      id,
      recipient,
      shipping,
      items,
      incomplete_items,
      retail_costs,
      shipments,
      gift,
      packing_slip,
    },
  }

  if (type === "order_created") {
    const message = {
      ...msg,
      dynamicTemplateData: {
        ...msg.dynamicTemplateData,
        subject: `Your order has been created! (noreply)`,
      },
    }

    await sgMail
      .send(message)
      .then(res => console.log(res))
      .catch(err => console.error(err))
  } else if (["order_canceled", "order_failed"].includes(type)) {
    const { reason } = data

    const message = {
      ...msg,
      dynamicTemplateData: { ...msg.dynamicTemplateData, reason },
    }

    await sgMail
      .send(message)
      .then(res => console.log(res))
      .catch(err => console.error(err))
  } else if (type === "package_shipped") {
    const { shipment } = data

    const message = {
      ...msg,
      dynamicTemplateData: {
        ...msg.dynamicTemplateData,
        subject: `Your order No. ${id} has been shipped`,
        carrier: shipment.carrier,
        service: shipment.service,
        tracking_number: shipment.tracking_number,
        tracking_url: shipment.tracking_url,
        ship_date: shipment.ship_date,
        shipped_at: new Date(shipment.shipped_at).toLocaleString(),
        location: shipment.location,
        packing_slip_url: shipment.packing_slip_url,
        // estimated_delivery_dates: {
        //   from: new Date(
        //     shipments[0].estimated_delivery_dates.from
        //   ).toLocaleString(),
        //   to: new Date(
        //     shipments[0].estimated_delivery_dates.to
        //   ).toLocaleString(),
        // },
      },
    }

    await sgMail
      .send(message)
      .then(res => console.log(res))
      .catch(err => console.error(err))
  } else if (type === "package_returned") {
    const { shipment, reason } = data

    const message = {
      ...msg,
      dynamicTemplateData: { ...msg.dynamicTemplateData, shipment, reason },
    }

    await sgMail
      .send(message)
      .then(res => console.log(res))
      .catch(err => console.error(err))
  }

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
    },
    body,
  }
}
