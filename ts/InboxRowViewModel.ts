'use strict'

import IterableInAppMessage from './IterableInAppMessage'

type InboxRowViewModel = {
    title: string
    subtitle?: string
    imageUrl?: string
    createdAt?: Date
    read: boolean
    last: boolean
    inAppMessage: IterableInAppMessage
}

export default InboxRowViewModel