'use strict'

import { IterableInAppMessage } from '.'

interface InboxRowViewModel {
  title: string
  subtitle?: string
  imageUrl?: string
  createdAt?: Date
  read: boolean
  inAppMessage: IterableInAppMessage
}

export default InboxRowViewModel
