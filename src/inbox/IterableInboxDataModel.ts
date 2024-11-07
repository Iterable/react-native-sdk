import { NativeModules } from 'react-native';
import {
  IterableHtmlInAppContent,
  IterableInAppDeleteSource,
  IterableInAppLocation,
} from '../IterableInAppClasses';

import { Iterable } from '../Iterable';

import type { InboxImpressionRowInfo } from '../InboxImpressionRowInfo';
import type { InboxRowViewModel } from '../InboxRowViewModel';
import IterableInAppMessage from '../IterableInAppMessage';

const RNIterableAPI = NativeModules.RNIterableAPI;

// TODO: Comment
export class IterableInboxDataModel {
  filterFn?: (message: IterableInAppMessage) => boolean;
  comparatorFn?: (
    message1: IterableInAppMessage,
    message2: IterableInAppMessage
  ) => number;
  dateMapperFn?: (message: IterableInAppMessage) => string | undefined;

  constructor() {}

  set(
    filter?: (message: IterableInAppMessage) => boolean,
    comparator?: (
      message1: IterableInAppMessage,
      message2: IterableInAppMessage
    ) => number,
    dateMapper?: (message: IterableInAppMessage) => string | undefined
  ) {
    this.filterFn = filter;
    this.comparatorFn = comparator;
    this.dateMapperFn = dateMapper;
  }

  getFormattedDate(message: IterableInAppMessage) {
    if (message.createdAt === undefined) {
      return '';
    }

    if (this.dateMapperFn) {
      return this.dateMapperFn(message);
    } else {
      return this.defaultDateMapper(message);
    }
  }

  getHtmlContentForMessageId(id: string): Promise<IterableHtmlInAppContent> {
    Iterable.logger.log(
      'IterableInboxDataModel.getHtmlContentForItem messageId: ' + id
    );

    return RNIterableAPI.getHtmlInAppContentForMessage(id).then(
      (content: any) => {
        return IterableHtmlInAppContent.fromDict(content);
      }
    );
  }

  setMessageAsRead(id: string) {
    Iterable.logger.log('IterableInboxDataModel.setMessageAsRead');

    RNIterableAPI.setReadForMessage(id, true);
  }

  deleteItemById(id: string, deleteSource: IterableInAppDeleteSource) {
    Iterable.logger.log('IterableInboxDataModel.deleteItemById');

    RNIterableAPI.removeMessage(id, IterableInAppLocation.inbox, deleteSource);
  }

  async refresh(): Promise<Array<InboxRowViewModel>> {
    return RNIterableAPI.getInboxMessages().then(
      (messages: Array<IterableInAppMessage>) => {
        return this.processMessages(messages);
      },
      () => {
        return [];
      }
    );
  }

  // inbox session tracking functions

  startSession(visibleRows: Array<InboxImpressionRowInfo> = []) {
    RNIterableAPI.startSession(visibleRows);
  }

  async endSession(visibleRows: Array<InboxImpressionRowInfo> = []) {
    await this.updateVisibleRows(visibleRows);
    RNIterableAPI.endSession();
  }

  updateVisibleRows(visibleRows: Array<InboxImpressionRowInfo> = []) {
    RNIterableAPI.updateVisibleRows(visibleRows);
  }

  // private/internal

  private static sortByMostRecent = (
    message1: IterableInAppMessage,
    message2: IterableInAppMessage
  ) => {
    let createdAt1 = message1.createdAt ?? new Date(0);
    let createdAt2 = message2.createdAt ?? new Date(0);

    if (createdAt1 < createdAt2) return 1;
    if (createdAt1 > createdAt2) return -1;

    return 0;
  };

  private defaultDateMapper(message: IterableInAppMessage): string {
    if (message.createdAt === undefined) {
      return '';
    }

    let createdAt;

    if (typeof message.createdAt === 'string') {
      createdAt = new Date(parseInt(message.createdAt, 10));
    } else {
      createdAt = new Date(message.createdAt);
    }

    const defaultDateString = `${createdAt.toLocaleDateString()} at ${createdAt.toLocaleTimeString()}`;

    return defaultDateString;
  }

  private processMessages(
    messages: Array<IterableInAppMessage>
  ): Array<InboxRowViewModel> {
    return this.sortAndFilter(messages).map(
      IterableInboxDataModel.getInboxRowViewModelForMessage
    );
  }

  private sortAndFilter(
    messages: Array<IterableInAppMessage>
  ): Array<IterableInAppMessage> {
    let sortedFilteredMessages = messages.slice();

    // TODO: Figure out if this is purposeful
    // eslint-disable-next-line eqeqeq
    if (this.filterFn != undefined) {
      sortedFilteredMessages = sortedFilteredMessages.filter(this.filterFn);
    }

    // TODO: Figure out if this is purposeful
    // eslint-disable-next-line eqeqeq
    if (this.comparatorFn != undefined) {
      sortedFilteredMessages.sort(this.comparatorFn);
    } else {
      sortedFilteredMessages.sort(IterableInboxDataModel.sortByMostRecent);
    }

    return sortedFilteredMessages;
  }

  private static getInboxRowViewModelForMessage(
    message: IterableInAppMessage
  ): InboxRowViewModel {
    return {
      title: message.inboxMetadata?.title ?? '',
      subtitle: message.inboxMetadata?.subtitle,
      imageUrl: message.inboxMetadata?.icon,
      createdAt: message.createdAt,
      read: message.read,
      inAppMessage: message,
    };
  }
}

export default IterableInboxDataModel;
