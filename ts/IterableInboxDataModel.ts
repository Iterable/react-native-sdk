'use strict'

import { NativeModules } from 'react-native'
import { IterableInAppMessage, IterableInAppLocation, IterableInAppDeleteSource, InboxMessageDataModel } from '.'

const RNIterableAPI = NativeModules.RNIterableAPI

class IterableInboxDataModel {
    inboxMessages: Array<InboxMessageDataModel> = []

    constructor() {
        IterableInboxDataModel.syncInboxMessages()
    }

    getItemCount(): number {
        console.log("IterableInboxDataModel.getItemCount")
        return this.inboxMessages.length
    }

    deleteItem(row: number, deleteSource: IterableInAppDeleteSource) {
        console.log("IterableInboxDataModel.deleteItem")
        this.inboxMessages.splice(row, 1)
        RNIterableAPI.removeMessage(this.idForRow(row), IterableInAppLocation.inbox, deleteSource)
        IterableInboxDataModel.syncInboxMessages()
    }

    getItem(row: number): InboxMessageDataModel {
        console.log("IterableInboxDataModel.getItem")
        return this.inboxMessages[row]
    }

    setItemAsRead(row: number) {
        console.log("IterableInboxDataModel.setItemAsRead")
        this.inboxMessages[row].read = true
        RNIterableAPI.setReadForMessage(this.inboxMessages[row].inAppMessage)
    }

    private idForRow(row: number): string {
        return this.inboxMessages[row].inAppMessage.messageId
    }

    private static getDataModelForMessage(message: IterableInAppMessage): InboxMessageDataModel {
        return new InboxMessageDataModel(message)
    }

    private static syncInboxMessages() {
        RNIterableAPI.getInboxMessages().then(
            (messages: Array<IterableInAppMessage>) => messages.map(IterableInboxDataModel.getDataModelForMessage)
        )
    }
}

export { IterableInboxDataModel }