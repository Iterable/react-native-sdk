'use strict'

import { NativeModules } from 'react-native'
import { IterableInAppMessage, IterableInAppLocation, IterableInAppDeleteSource } from '.'
import { InboxMessageDataModel } from '.'

const RNIterableAPI = NativeModules.RNIterableAPI

class IterableInboxDataModel {
    inboxMessages: Array<InboxMessageDataModel> = []

    constructor() {
        // need to set the messages from RNIterableAPI.getInboxMessages() to inboxMessages as InboxMessageDataModel
        // RNIterableAPI.getInboxMessages().then
        
        // also need to figure out how to continually update inboxMessages when new messages arrive?
    }

    getItemCount(): number {
        console.log("IterableInboxDataModel.getItemCount")
        return this.inboxMessages.length
    }

    deleteItem(row: number, deleteSource: IterableInAppDeleteSource) {
        console.log("IterableInboxDataModel.deleteItem")
        this.inboxMessages.splice(row, 1)
        RNIterableAPI.remove(this.idForRow(row), IterableInAppLocation.inbox, deleteSource)
    }

    getItem(row: number): InboxMessageDataModel {
        console.log("IterableInboxDataModel.getItem")
        return this.inboxMessages[row]
    }

    setItemAsRead(row: number) {
        console.log("IterableInboxDataModel.setItemAsRead")
        RNIterableAPI.setReadForMessage(this.inboxMessages[row].inAppMessage)
    }

    private idForRow(row: number): string {
        return this.inboxMessages[row].inAppMessage.messageId
    }

    private getDataModel(message: IterableInAppMessage): InboxMessageDataModel {
        return new InboxMessageDataModel(message)
    }
}

export { IterableInboxDataModel }