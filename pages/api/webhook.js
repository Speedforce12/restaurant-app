// import * as admin from "firebase-admin";
import connectMongo from "@/database/connection";
import { buffer } from "micro";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const endpointSecret = process.env.STRIPE_SIGNIN_SECRET;

// const handleSuccessfulOrder = async (session) => {
//   return app
//     .firestore()
//     .collection("customers")
//     .doc(session.metadata.email)
//     .collection("orders")
//     .doc(session.id)
//     .set({
//       amount: session.amount_total / 100,
//       amount_shipping: session.total_details.amount_shipping / 100,
//       images: JSON.parse(session.metadata.images),
//       timestamps: admin.firestore.FieldValue.serverTimestamp(),
//     })
//     .then(() => {
//       console.log(
//         `SUCCESS: order ${session.id} was successfully added to the database`
//       );
//     });
// };

export default async function handler(req, res) {
    await connectMongo()
  if (req.method === "POST") {
    const requestBuffer = await buffer(req);
    const payload = requestBuffer.toString();
    const sig = req.headers["stripe-signature"];

    let event;

    // verify event came from stripe
    try {
      event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
    } catch (error) {
      console.error(error.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // handle successful checkout

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;

      return handleSuccessfulOrder(session)
        .then(() => res.status(200))
        .catch((err) => res.status(400).send(`webhook error : ${err.message}`));
    }
  }
}

export const config = {
    api: {
        bodyParser: false,
        externalResolver: true
    }
}
