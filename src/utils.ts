import type { Context } from "gramio";
import type { PostHog } from "posthog-node";

export function extractFromContext(
	context: Context<any>,
	type: "chat_id" | "user_id",
) {
	if (type === "chat_id") {
		const chatId =
			"chat" in context &&
			typeof context.chat === "object" &&
			context.chat !== null &&
			"id" in context.chat &&
			typeof context.chat.id === "number"
				? context.chat.id
				: undefined;

		return chatId;
	}

	const senderId =
		"from" in context &&
		typeof context.from === "object" &&
		context.from !== null &&
		"id" in context.from &&
		typeof context.from.id === "number"
			? context.from.id
			: undefined;

	return senderId;
}

export type IsFeatureEnabledOptions = Parameters<
	PostHog["isFeatureEnabled"]
>[2];

export type GetFeatureFlagOptions = Parameters<PostHog["getFeatureFlag"]>[2];

export type GetFeatureFlagPayloadValue = Parameters<
	PostHog["getFeatureFlagPayload"]
>[2];

export type GetFeatureFlagPayloadOptions = Parameters<
	PostHog["getFeatureFlagPayload"]
>[3];

export type GetAllFlagsOptions = Parameters<PostHog["getAllFlags"]>[1];

export type GetAllFlagsPayloadOptions = Parameters<
	PostHog["getAllFlagsAndPayloads"]
>[1];

export type PostHogFlagsAndPayloadsResponse = Awaited<
	ReturnType<PostHog["getAllFlagsAndPayloads"]>
>;
