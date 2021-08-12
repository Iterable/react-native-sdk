'use strict'

import { Component } from 'react'
import { NativeModules } from 'react-native'
import { IterableInAppMessage, IterableInAppLocation, IterableInAppDeleteSource, InboxMessageDataModel } from '.'

const RNIterableAPI = NativeModules.RNIterableAPI

interface InboxComponent {
    updateView(): void
}

class IterableInboxDataModel {
    inboxMessages: Array<InboxMessageDataModel> = []

    private listeners: Set<InboxComponent> = new Set()

    constructor(listener: InboxComponent) {
        this.addListener(listener)
        this.syncInboxMessages()
    }

    addListener(listener: InboxComponent) {
        console.log("IterableInboxDataModel.addListener")
        
        this.listeners.add(listener)
    }

    removeListener(listener: InboxComponent) {
        console.log("IterableInboxDataModel.removeListener")

        this.listeners.delete(listener)
    }

    getItemCount(): number {
        console.log("IterableInboxDataModel.getItemCount")

        return this.inboxMessages.length
    }

    getAllItems(): Array<InboxMessageDataModel> {
        console.log("IterableInboxDataModel.getAllItems")

        return this.inboxMessages
    }

    deleteItem(row: number, deleteSource: IterableInAppDeleteSource) {
        console.log("IterableInboxDataModel.deleteItem")

        this.inboxMessages.splice(row, 1)
        RNIterableAPI.removeMessage(this.idForRow(row), IterableInAppLocation.inbox, deleteSource)
        this.syncInboxMessages()
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

    private syncInboxMessages() {
        console.log("IterableInboxDataModel.syncInboxMessages")

        RNIterableAPI.getInboxMessages().then(
            (messages: Array<IterableInAppMessage>) => {
                this.inboxMessages = messages.map(IterableInboxDataModel.getDataModelForMessage)

                this.listeners.forEach(
                    (listener) => {
                        listener.updateView()
                    }
                )
            }
        )
    }

    //** not sure if this is correct yet */
    // async refresh(): Promise<Array<InboxMessageDataModel>> {
    //     return RNIterableAPI.getInboxMessages().then(
    //         (messages: Array<IterableInAppMessage>) => {
    //             this.inboxMessages = messages.map(IterableInboxDataModel.getDataModelForMessage)
    //             return this.inboxMessages
    //         },
    //         () => {
    //             return []
    //         }
    //     )
    // }

    private static getDataModelForMessage(message: IterableInAppMessage): InboxMessageDataModel {
        return new InboxMessageDataModel(message)
    }
}

export { IterableInboxDataModel }