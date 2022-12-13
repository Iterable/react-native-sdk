'use strict'

import { IterableInAppMessage } from './IterableInAppMessage'

interface InboxRowViewModel {
  title: string
  subtitle?: string
  imageUrl?: string
  createdAt?: Date
  read: boolean
  inAppMessage: IterableInAppMessage
}

export default InboxRowViewModel
