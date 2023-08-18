import { GiveawayService } from "@nft-types"

export type GiveawayFormFields = Omit<
	GiveawayService.Giveaway,
	"id" | "created_at" | "updated_at"
>

export enum GiveawayFormMode {
	EDIT = "EDIT",
	CREATE = "CREATE"
}
