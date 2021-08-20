'use strict'

import { NativeModules } from 'react-native'
import { IterableInAppMessage, IterableInAppLocation, IterableInAppDeleteSource, InboxRowViewModel } from '.'

const RNIterableAPI = NativeModules.RNIterableAPI

class IterableInboxDataModel {
    inboxMessages: Array<InboxRowViewModel> = []

    constructor() {
        this.syncInboxMessages()
    }

    getItemCount(): number {
        console.log("IterableInboxDataModel.getItemCount")

        return this.inboxMessages.length
    }

    getAllItems(): Array<InboxRowViewModel> {
        console.log("IterableInboxDataModel.getAllItems")

        return this.inboxMessages
    }

    deleteItem(row: number, deleteSource: IterableInAppDeleteSource) {
        console.log("IterableInboxDataModel.deleteItem")

        this.inboxMessages.splice(row, 1)
        RNIterableAPI.removeMessage(this.idForRow(row), IterableInAppLocation.inbox, deleteSource)
        this.syncInboxMessages()
    }

    getItem(row: number): InboxRowViewModel {
        console.log("IterableInboxDataModel.getItem")

        return this.inboxMessages[row]
    }

    setItemAsRead(row: number) {
        console.log("IterableInboxDataModel.setItemAsRead")

        this.inboxMessages[row].read = true
        RNIterableAPI.setReadForMessage(this.inboxMessages[row].inAppMessage)
    }

    async refresh(): Promise<Array<InboxRowViewModel>> {
        return RNIterableAPI.getInboxMessages().then(
            (messages: Array<IterableInAppMessage>) => {
                this.inboxMessages = messages.map(IterableInboxDataModel.getInboxRowViewModelForMessage)
                return this.inboxMessages
            },
            () => {
                return []
            }
        )
    }

    private idForRow(row: number): string {
        return this.inboxMessages[row].inAppMessage.messageId
    }

    private syncInboxMessages() {
        console.log("IterableInboxDataModel.syncInboxMessages")

        RNIterableAPI.getInboxMessages().then(
            (messages: Array<IterableInAppMessage>) => {
                this.inboxMessages = messages.map(IterableInboxDataModel.getInboxRowViewModelForMessage)
            }
        )
    }

    private static getInboxRowViewModelForMessage(message: IterableInAppMessage): InboxRowViewModel {
        return {
            title: message.inboxMetadata?.title ?? "",
            subtitle: message.inboxMetadata?.subtitle,
            imageUrl: message.inboxMetadata?.icon,
            createdAt: message.createdAt,
            read: message.read,
            inAppMessage: message
        }
    }
}

export default IterableInboxDataModel