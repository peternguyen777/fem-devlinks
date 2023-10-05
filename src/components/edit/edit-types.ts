import type { RouterOutputs } from "~/utils/api";

export type Profile = RouterOutputs["profile"]["getProfile"];

export type LinkState = RouterOutputs["profile"]["getProfile"]["links"][number];
