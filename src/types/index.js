/**
 * These are all the accepted action types.
 * They all use the @@{fileName}/{actionName} pattern to make sure they are unique
 * This is good practice to avoid action name collisions in large applications
 */
export const START_GAME = "@@index/START";
export const DRAW_CARD = "@@index/DRAW";
export const FLIP_CARD = "@@index/FLIP";
export const END_TURN = "@@index/TURN";
export const END_GAME = "@@index/END";
