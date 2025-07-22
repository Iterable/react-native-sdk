import { NativeModules } from 'react-native';

import { Iterable } from '../../core/classes/Iterable';
import {
  IterableHtmlInAppContent,
  IterableInAppDeleteSource,
  IterableInAppLocation,
  IterableInAppMessage,
  type IterableHtmlInAppContentRaw,
} from '../../inApp';
import type {
  IterableInboxImpressionRowInfo,
  IterableInboxRowViewModel,
} from '../types';
import { api, oldApi } from '../../api';

const RNIterableAPI = oldApi;
// const RNIterableAPI = NativeModules.RNIterableAPI;

/**
 * The `IterableInboxDataModel` class provides methods to manage and manipulate
 * inbox messages.
 */
export class IterableInboxDataModel {
  /**
   * Optional function to filter messages.
   *
   * This function takes an `IterableInAppMessage` as an argument and returns a boolean value.
   * It is used to determine whether a given message should be included based on custom criteria.
   *
   * @param message - The in-app message to be evaluated.
   * @returns A boolean indicating whether the message meets the filter criteria.
   */
  filterFn?: (message: IterableInAppMessage) => boolean;
  /**
   * Optional comparator function to determine the order of messages.
   *
   * @param message1 - The first message to compare.
   * @param message2 - The second message to compare.
   * @returns A negative number if `message1` should come before `message2`,
   *          a positive number if `message1` should come after `message2`,
   *          or 0 if they are considered equal.
   */
  comparatorFn?: (
    message1: IterableInAppMessage,
    message2: IterableInAppMessage
  ) => number;
  /**
   * Optional function to map an IterableInAppMessage to a date string or undefined.
   * This function can be used to extract and format the date from a message.
   *
   * @param message - The IterableInAppMessage object to be mapped.
   * @returns A string representing the date or undefined if no date is available.
   */
  dateMapperFn?: (message: IterableInAppMessage) => string | undefined;

  /**
   * Sets the filter, comparator, and date mapper functions for the inbox data model.
   *
   * @param filter - A function to filter messages. It takes an `IterableInAppMessage` as an argument and returns a boolean indicating whether the message should be included.
   * @param comparator - A function to compare two messages. It takes two `IterableInAppMessage` objects as arguments and returns a number indicating their relative order.
   * @param dateMapper - A function to map a message to a date string. It takes an `IterableInAppMessage` as an argument and returns a string representing the date, or undefined if no date is applicable.
   */
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

  /**
   * Formats the creation date of an in-app message.
   *
   * @param message - The in-app message object containing the creation date.
   * @returns The formatted date string. Returns an empty string if the creation date is undefined.
   */
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

  /**
   * Retrieves the HTML content for a given message ID.
   *
   * @param id - The ID of the message to retrieve HTML content for.
   * @returns  A promise that resolves to the HTML content of the specified message.
   */
  getHtmlContentForMessageId(id: string): Promise<IterableHtmlInAppContent> {
    Iterable?.logger?.log(
      'IterableInboxDataModel.getHtmlContentForItem messageId: ' + id
    );

    return RNIterableAPI.getHtmlInAppContentForMessage(id).then(
      (content: IterableHtmlInAppContentRaw) => {
        return IterableHtmlInAppContent.fromDict(content);
      }
    );
  }

  /**
   * Marks a message as read in the Iterable inbox.
   *
   * @param id - The unique identifier of the message to be marked as read.
   */
  setMessageAsRead(id: string) {
    Iterable?.logger?.log('IterableInboxDataModel.setMessageAsRead');

    RNIterableAPI.setReadForMessage(id, true);
  }

  /**
   * Deletes an item from the inbox by its ID.
   *
   * @param id - The unique identifier of the item to be deleted.
   * @param deleteSource - The source from which the delete action is initiated.
   */
  deleteItemById(id: string, deleteSource: IterableInAppDeleteSource) {
    Iterable?.logger?.log('IterableInboxDataModel.deleteItemById');

    RNIterableAPI.removeMessage(id, IterableInAppLocation.inbox, deleteSource);
  }

  /**
   * Refreshes the inbox data by fetching the latest messages from Iterable.
   *
   * @returns A promise that resolves to an array of processed inbox row view models.
   * If the fetch operation fails, the promise resolves to an empty array.
   */
  async refresh(): Promise<IterableInboxRowViewModel[]> {
    return api.getInboxMessages().then(
      (messages: IterableInAppMessage[]) => {
        return this.processMessages(messages);
      },
      () => {
        return [];
      }
    );
  }

  /**
   * Starts a tracking session for the inbox with the given visible rows.
   *
   * @param visibleRows - An array of `IterableInboxImpressionRowInfo` objects representing the rows that are currently visible.
   */
  startSession(visibleRows: IterableInboxImpressionRowInfo[] = []) {
    RNIterableAPI.startSession(visibleRows);
  }

  /**
   * Ends the current tracking session and updates the visible rows.
   *
   * @param visibleRows - An array of `IterableInboxImpressionRowInfo` objects representing the rows that are currently visible. Defaults to an empty array.
   * @returns A promise that resolves when the session has ended and the visible rows have been updated.
   */
  async endSession(visibleRows: IterableInboxImpressionRowInfo[] = []) {
    await this.updateVisibleRows(visibleRows);
    RNIterableAPI.endSession();
  }

  /**
   * Updates the visible rows in the inbox.
   *
   * This method takes an array of `IterableInboxImpressionRowInfo` objects
   * representing the rows that are currently visible and updates the
   * visibility status. (REVIEW: Where does it update it?  In Iterable or in the
   * interface?)
   *
   * @param visibleRows - An array of `IterableInboxImpressionRowInfo` objects
   *                      representing the rows that are currently visible.
   *                      Defaults to an empty array if not provided.
   */
  updateVisibleRows(visibleRows: IterableInboxImpressionRowInfo[] = []) {
    RNIterableAPI.updateVisibleRows(visibleRows);
  }

  /**
   * A comparator function to sort `IterableInAppMessage` objects by their creation date in descending order.
   *
   * @param message1 - The first `IterableInAppMessage` object to compare.
   * @param message2 - The second `IterableInAppMessage` object to compare.
   * @returns A number indicating the sort order:
   *          - `1` if `message1` was created after `message2`
   *          - `-1` if `message1` was created before `message2`
   *          - `0` if both messages were created at the same time
   */
  private static sortByMostRecent = (
    message1: IterableInAppMessage,
    message2: IterableInAppMessage
  ) => {
    const createdAt1 = message1.createdAt ?? new Date(0);
    const createdAt2 = message2.createdAt ?? new Date(0);

    if (createdAt1 < createdAt2) return 1;
    if (createdAt1 > createdAt2) return -1;

    return 0;
  };

  /**
   * Maps the creation date of an IterableInAppMessage to a formatted string.
   *
   * @param message - The message object containing the creation date.
   * @returns A formatted string representing the creation date and time of the
   * message.  If the creation date is undefined, returns an empty string.
   */
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

  /**
   * Processes a list of in-app messages by sorting and filtering them,
   * and then mapping each message to an inbox row view model.
   *
   * @param messages - An array of `IterableInAppMessage` objects to be processed.
   * @returns An array of `IterableInboxRowViewModel` objects representing the processed messages.
   */
  private processMessages(
    messages: IterableInAppMessage[]
  ): IterableInboxRowViewModel[] {
    return this.sortAndFilter(messages).map(
      IterableInboxDataModel.getInboxRowViewModelForMessage
    );
  }

  /**
   * Sorts and filters an array of `IterableInAppMessage` objects.
   *
   * @param messages - The array of messages to be sorted and filtered.
   * @returns The sorted and filtered array of messages.
   */
  private sortAndFilter(
    messages: IterableInAppMessage[]
  ): IterableInAppMessage[] {
    let sortedFilteredMessages = messages.slice();

    // MOB-10424: Figure out if this is purposeful
    // eslint-disable-next-line eqeqeq
    if (this.filterFn != undefined) {
      sortedFilteredMessages = sortedFilteredMessages.filter(this.filterFn);
    }

    // MOB-10424: Figure out if this is purposeful
    // eslint-disable-next-line eqeqeq
    if (this.comparatorFn != undefined) {
      sortedFilteredMessages.sort(this.comparatorFn);
    } else {
      sortedFilteredMessages.sort(IterableInboxDataModel.sortByMostRecent);
    }

    return sortedFilteredMessages;
  }

  /**
   * Converts an `IterableInAppMessage` into an `IterableInboxRowViewModel`.
   *
   * @param message - The in-app message to convert.
   * @returns An object representing the inbox row view model.
   */
  private static getInboxRowViewModelForMessage(
    message: IterableInAppMessage
  ): IterableInboxRowViewModel {
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
