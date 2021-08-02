'use strict'

import { NativeModules } from 'react-native'
import { IterableInAppMessage } from '.'
import { InboxMessageDataModel } from '.'

const RNIterableAPI = NativeModules.RNIterableAPI

class IterableInboxDataModel {
    inboxMessages: Array<InboxMessageDataModel> = []

    getItemCount() {
        return this.inboxMessages.length
    }

    deleteItem(row: number) {
        console.log("IterableInboxDataModel - delete item at row (not implemented)")
    }

    getItem(row: number) {
        console.log("IterableInboxDataModel - get item at row (not implemented)")
        this.inboxMessages[row]
    }

    setItemAsRead(row: number) {
        console.log("IterableInboxDataModel - set item at row as read (not implemented)")
    }
}

export { IterableInboxDataModel }