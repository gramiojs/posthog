import type { Context } from "gramio";

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
