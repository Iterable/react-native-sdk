'use strict'

import { NativeModules } from 'react-native'
import { IterableInAppMessage, IterableInAppTrigger, IterableInAppTriggerType } from '.'

const RNIterableAPI = NativeModules.RNIterableAPI

class IterableInboxDataModel {
    items: Array<IterableInAppMessage> = []

    constructor() {
        this.tempResetData()
    }

    tempResetData() {
        this.items = [new IterableInAppMessage("1", 1, new IterableInAppTrigger(IterableInAppTriggerType.immediate), undefined, undefined, true, undefined, null, false, 300.5)]
    }

    numRows() {
        return this.items.length
    }

    deleteItem(row: number) {
        console.log("IterableInboxDataModel - delete row (not implemented)")
    }
}

export { IterableInboxDataModel }