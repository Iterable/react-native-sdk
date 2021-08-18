'use strict'

import IterableInAppMessage from './IterableInAppMessage'

class InboxRowViewModel {
    title: string
    subtitle?: string
    imageUrl?: string
    createdAt?: Date
    read: boolean
    inAppMessage: IterableInAppMessage

    constructor(message: IterableInAppMessage) {
        this.title = message.inboxMetadata?.title ?? ""
        this.subtitle = message.inboxMetadata?.subtitle
        this.imageUrl = message.inboxMetadata?.icon
        this.createdAt = message.createdAt
        this.read = message.read
        this.inAppMessage = message
    }
}

export default InboxRowViewModel