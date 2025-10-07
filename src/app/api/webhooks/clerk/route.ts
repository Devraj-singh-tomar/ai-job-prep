import { deleteUser, upsertUser } from "@/features/users/db";
import { verifyWebhook } from "@clerk/nextjs/webhooks";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const event = await verifyWebhook(request);

    switch (event.type) {
      case "user.created":

      case "user.updated":
        const clearData = event.data;
        const email = clearData.email_addresses.find(
          (e) => e.id === clearData.primary_email_address_id
        )?.email_address;

        // email == null
        // email == null || undefined

        if (!email) {
          return new Response("No primary email found", { status: 400 });
        }

        await upsertUser({
          id: clearData.id,
          email,
          name: `${clearData.first_name} ${clearData.last_name}`,
          imageUrl: clearData.image_url,
          createdAt: new Date(clearData.created_at),
          updatedAt: new Date(clearData.updated_at),
        });

        break;

      case "user.deleted":
        if (event.data.id == null) {
          return new Response("No user id found", { status: 400 });
        }

        await deleteUser(event.data.id);

        break;
    }
  } catch {
    return new Response("Invalid webhook", { status: 400 });
  }

  return new Response("Webhook received", { status: 200 });
}
