import IterableInAppMessage from './IterableInAppMessage'

type InboxRowViewModel = {
    title: string
    subtitle?: string
    imageUrl?: string
    createdAt?: Date
    read: boolean
    inAppMessage: IterableInAppMessage
}

export default InboxRowViewModel
