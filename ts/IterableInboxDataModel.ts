'use strict'

import { NativeModules } from 'react-native'
import {
    IterableInAppMessage,
    IterableInAppLocation,
    IterableInAppDeleteSource,
    InboxRowViewModel,
    IterableHtmlInAppContent
} from '.'

const RNIterableAPI = NativeModules.RNIterableAPI

class IterableInboxDataModel {
    inboxMessages: Array<InboxRowViewModel> = []
    filterFn?: (message: IterableInAppMessage) => boolean
    comparatorFn?: (message1: IterableInAppMessage, message2: IterableInAppMessage) => number

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

    deleteItem(id: string, deleteSource: IterableInAppDeleteSource) {
        console.log("IterableInboxDataModel.deleteItem")

        RNIterableAPI.removeMessage(id, IterableInAppLocation.inbox, deleteSource)
        this.inboxMessages.filter(message => message.inAppMessage.messageId !== id)
        this.syncInboxMessages()
    }

    getItem(row: number): InboxRowViewModel {
        console.log("IterableInboxDataModel.getItem")

        return this.inboxMessages[row]
    }

    getHtmlContentForItem(row: number): Promise<IterableHtmlInAppContent> {
        console.log("IterableInboxDataModel.getHtmlContentForItem")

        return RNIterableAPI.getHtmlInAppContentForMessage(this.idForRow(row)).then(
            (content: any) => {
                return IterableHtmlInAppContent.fromDict(content)
            }
        )
    }

    setItemAsRead(row: number) {
        console.log("IterableInboxDataModel.setItemAsRead")

        this.inboxMessages[row].read = true
        RNIterableAPI.setReadForMessage(this.idForRow(row), true)
    }

    set(filter?: (message: IterableInAppMessage) => boolean,
        comparator?: (message1: IterableInAppMessage, message2: IterableInAppMessage) => number) {
        this.filterFn = filter
        this.comparatorFn = comparator
    }

    async refresh(): Promise<Array<InboxRowViewModel>> {
        return RNIterableAPI.getInboxMessages().then(
            (messages: Array<IterableInAppMessage>) => {
                this.inboxMessages = []
                this.inboxMessages = this.processMessages(messages)

                return this.inboxMessages
            },
            () => {
                return []
            }
        )
    }

    private static sortByMostRecent = (message1: IterableInAppMessage, message2: IterableInAppMessage) => {
        let createdAt1 = message1.createdAt ?? new Date(0)
        let createdAt2 = message2.createdAt ?? new Date(0)

        if (createdAt1 < createdAt2) return 1
        if (createdAt1 > createdAt2) return -1

        return 0
    }

    idForRow(row: number): string {
        console.log("row: ", row)
        console.log(this.inboxMessages)
        return this.inboxMessages[row].inAppMessage.messageId
    }

    private syncInboxMessages() {
        console.log("IterableInboxDataModel.syncInboxMessages")

        RNIterableAPI.getInboxMessages().then(
            (messages: Array<IterableInAppMessage>) => {
                this.inboxMessages = this.processMessages(messages)
            }
        )
    }

    private processMessages(messages: Array<IterableInAppMessage>): Array<InboxRowViewModel> {
        return this.sortAndFilter(messages).map(IterableInboxDataModel.getInboxRowViewModelForMessage)
    }

    private sortAndFilter(messages: Array<IterableInAppMessage>): Array<IterableInAppMessage> {
        var sortedFilteredMessages = messages.slice()

        if (this.filterFn != undefined) {
            sortedFilteredMessages = sortedFilteredMessages.filter(this.filterFn)
        }
        
        if (this.comparatorFn != undefined) {
            sortedFilteredMessages.sort(this.comparatorFn)
        } else {
            sortedFilteredMessages.sort(IterableInboxDataModel.sortByMostRecent)
        }

        return sortedFilteredMessages
    }

    private static getInboxRowViewModelForMessage(message: IterableInAppMessage): InboxRowViewModel {
        return {
            title: message.inboxMetadata?.title ?? "",
            subtitle: message.inboxMetadata?.subtitle,
            imageUrl: message.inboxMetadata?.icon,
            createdAt: message.createdAt,
            read: message.read,
            last: false,
            inAppMessage: message
        }
    }
}

export default IterableInboxDataModel