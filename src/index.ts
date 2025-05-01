/**
 * @module
 *
 * Posthog plugin for GramIO
 */
import { Plugin } from "gramio";
import type { PostHog } from "posthog-node";
import { extractFromContext } from "./utils.ts";

const events = [
	"message",
	"callback_query",
	"channel_post",
	"chat_join_request",
	"chosen_inline_result",
	"inline_query",
	"web_app_data",
	"successful_payment",
	"video_chat_started",
	"video_chat_ended",
	"video_chat_scheduled",
	"video_chat_participants_invited",
	"passport_data",
	"new_chat_title",
	"new_chat_photo",
	"pinned_message",
	"pre_checkout_query",
	"proximity_alert_triggered",
	"shipping_query",
	"group_chat_created",
	"delete_chat_photo",
	"location",
	"invoice",
	"message_auto_delete_timer_changed",
	"migrate_from_chat_id",
	"migrate_to_chat_id",
	"new_chat_members",
	"chat_shared",
] as const;

// TODO: Auto-trackable events
export function posthogPlugin(posthog: PostHog) {
	return new Plugin("@gramio/posthog")
		.onError(({ error, context }) => {
			const senderId = extractFromContext(context, "user_id");
			const chatId = extractFromContext(context, "chat_id");

			posthog.captureException(error, senderId?.toString(), {
				chat_id: chatId?.toString(),

				// biome-ignore lint/complexity/useLiteralKeys: this key is private
				update_type: context["updateType"],
			});
		})
		.derive(events, async (context) => {
			return {
				capture: (event: string, properties: Record<string, unknown>) => {
					posthog.capture({
						distinctId: context.from!.id!.toString(),
						event,
						properties,
					});
				},
			};
		});
}
