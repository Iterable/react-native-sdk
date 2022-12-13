'use strict'

import { NativeModules } from 'react-native'
import {
  IterableInAppLocation,
  IterableInAppDeleteSource,
  IterableHtmlInAppContent
} from './IterableInAppClasses'

import { Iterable } from './Iterable'

import InboxImpressionRowInfo from './InboxImpressionRowInfo'
import InboxRowViewModel from './InboxRowViewModel'
import IterableInAppMessage from './IterableInAppMessage'

const RNIterableAPI = NativeModules.RNIterableAPI

class IterableInboxDataModel {
  filterFn?: (message: IterableInAppMessage) => boolean
  comparatorFn?: (message1: IterableInAppMessage, message2: IterableInAppMessage) => number
  dateMapperFn?: (message: IterableInAppMessage) => string | undefined

  set (
    filter?: (message: IterableInAppMessage) => boolean,
    comparator?: (message1: IterableInAppMessage,
      message2: IterableInAppMessage) => number,
    dateMapper?: (message: IterableInAppMessage) => string | undefined): void {
    this.filterFn = filter
    this.comparatorFn = comparator
    this.dateMapperFn = dateMapper
  }

  getFormattedDate (message: IterableInAppMessage): string | undefined {
    if (message.createdAt === undefined) {
      return ''
    }

    if (this.dateMapperFn != null) {
      return this.dateMapperFn(message)
    } else {
      return this.defaultDateMapper(message)
    }
  }

  async getHtmlContentForMessageId (id: string): Promise<IterableHtmlInAppContent> {
    Iterable.logger.log('IterableInboxDataModel.getHtmlContentForItem messageId: ' + id)

    return RNIterableAPI.getHtmlInAppContentForMessage(id).then(
      (content: any) => {
        return IterableHtmlInAppContent.fromDict(content)
      }
    )
  }

  setMessageAsRead (id: string): void {
    Iterable.logger.log('IterableInboxDataModel.setMessageAsRead')

    RNIterableAPI.setReadForMessage(id, true)
  }

  deleteItemById (id: string, deleteSource: IterableInAppDeleteSource): void {
    Iterable.logger.log('IterableInboxDataModel.deleteItemById')

    RNIterableAPI.removeMessage(id, IterableInAppLocation.inbox, deleteSource)
  }

  async refresh (): Promise<InboxRowViewModel[]> {
    return RNIterableAPI.getInboxMessages().then(
      (messages: IterableInAppMessage[]) => {
        return this.processMessages(messages)
      },
      () => {
        return []
      }
    )
  }

  // inbox session tracking functions

  startSession (visibleRows: InboxImpressionRowInfo[] = []): void {
    RNIterableAPI.startSession(visibleRows)
  }

  async endSession (visibleRows: InboxImpressionRowInfo[] = []): Promise<void> {
    await this.updateVisibleRows(visibleRows)
    RNIterableAPI.endSession()
  }

  updateVisibleRows (visibleRows: InboxImpressionRowInfo[] = []): void {
    RNIterableAPI.updateVisibleRows(visibleRows)
  }

  // private/internal

  private static readonly sortByMostRecent = (message1: IterableInAppMessage, message2: IterableInAppMessage): number => {
    const createdAt1 = message1.createdAt ?? new Date(0)
    const createdAt2 = message2.createdAt ?? new Date(0)

    if (createdAt1 < createdAt2) return 1
    if (createdAt1 > createdAt2) return -1

    return 0
  }

  private defaultDateMapper (message: IterableInAppMessage): string {
    if (message.createdAt === undefined) {
      return ''
    }

    let createdAt

    if (typeof message.createdAt === 'string') {
      createdAt = new Date(parseInt(message.createdAt))
    } else {
      createdAt = new Date(message.createdAt)
    }

    const defaultDateString = `${createdAt.toLocaleDateString()} at ${createdAt.toLocaleTimeString()}`

    return defaultDateString
  }

  private processMessages (messages: IterableInAppMessage[]): InboxRowViewModel[] {
    return this.sortAndFilter(messages).map(IterableInboxDataModel.getInboxRowViewModelForMessage)
  }

  private sortAndFilter (messages: IterableInAppMessage[]): IterableInAppMessage[] {
    let sortedFilteredMessages = messages.slice()

    if (this.filterFn !== undefined) {
      sortedFilteredMessages = sortedFilteredMessages.filter(this.filterFn)
    }

    if (this.comparatorFn !== undefined) {
      sortedFilteredMessages.sort(this.comparatorFn)
    } else {
      sortedFilteredMessages.sort(IterableInboxDataModel.sortByMostRecent)
    }

    return sortedFilteredMessages
  }

  private static getInboxRowViewModelForMessage (message: IterableInAppMessage): InboxRowViewModel {
    return {
      title: message.inboxMetadata?.title ?? '',
      subtitle: message.inboxMetadata?.subtitle,
      imageUrl: message.inboxMetadata?.icon,
      createdAt: message.createdAt,
      read: message.read,
      inAppMessage: message
    }
  }
}

export default IterableInboxDataModel
