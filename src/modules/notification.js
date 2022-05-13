import { v4 as uuid } from "uuid"

/**
 * The default duration a Notification should be displayed, expresed in milliseconds
 * @type {number}
 */
const DEFAULT_NOTIFICATION_DURATION = 5000

/**
 * A configurable, enum-like list of Notification types
 * @type {{SUCCESS: string, ERROR: string}}
 */
export const NOTIFICATION_TYPES = {
  SUCCESS: "SUCCESS",
  ERROR: "ERROR",
}

/**
 * Generates a uniquely identifiable Notification
 * @param message
 * @param options
 * @returns {{id: (*|string), message, type}}
 */
function createNotification(message, options) {
  const id = uuid()
  return {
    id,
    message,
    type: options.type,
    duration: options.duration ?? DEFAULT_NOTIFICATION_DURATION,
  }
}

/**
 * Syntactic sugar for generating an Error Notification
 * @param message
 * @param [options]
 * @returns {{id: (*|string), message, type}}
 */
function createErrorNotification(message, options) {
  return createNotification(message, {
    ...options,
    type: NOTIFICATION_TYPES.ERROR,
  })
}

/**
 * Syntactic sugar for generating a Success Notification
 * @param message
 * @param [options]
 * @returns {{id: (*|string), message, type}}
 */
function createSuccessNotification(message, options) {
  return createNotification(message, {
    ...options,
    type: NOTIFICATION_TYPES.SUCCESS,
  })
}

export default { createErrorNotification, createSuccessNotification }
