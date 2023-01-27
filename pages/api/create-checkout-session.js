import Orders from "@/database/model/orders";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { items, email, name ,shippingAddress} = req.body;

    try {
      const transformedItems = items.map((item) => ({
        price_data: {
          currency: "usd",
          unit_amount: parseInt(item.price * 100),
          product_data: {
            name: item.name,
            images: [item.picture],
            description: item.categories,
          },
        },

        quantity: item.quantity,
      }));

      const order = await Orders.create({
        products: transformedItems,
        paid: 0,
        email: email,
        name: name,
        shipping: shippingAddress,
      });

      // send the transformed items to stripe
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        shipping_options: [
          {
            shipping_rate_data: {
              type: "fixed_amount",
              fixed_amount: { amount: 300, currency: "usd" },
              display_name: "Same Day Shipping",
              delivery_estimate: {
                minimum: { unit: "business_day", value: 1 },
                maximum: { unit: "business_day", value: 1 },
              },
            },
          },
        ],
        shipping_address_collection: {
          allowed_countries: ["US", "GB", "CA"],
        },
        line_items: transformedItems,
        mode: "payment",
        success_url: "http://localhost:3000/success",
        cancel_url: `${req.headers.origin}/cart`,
        customer_email: email,
        metadata: {
          email,
          orderId: order._id.toString(),
          images: JSON.stringify(items.map((item) => item.image)),
        },
      });

      res.status(200).json({ id: session.id });
    } catch (error) {
      console.log(error);
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
