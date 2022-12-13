'use strict'

import { IterableInAppMessage } from '.'

type InboxRowViewModel = {
    title: string
    subtitle?: string
    imageUrl?: string
    createdAt?: Date
    read: boolean
    inAppMessage: IterableInAppMessage
}

export default InboxRowViewModel