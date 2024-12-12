#!/bin/bash

set -eo pipefail

echo export const iterableAPIKey = \"$ITERABLE_API_KEY\" > ./integration-testing/ts/Config.ts
echo export const sendInAppCampaignId = $SEND_IN_APP_CAMPAIGN_ID >> ./integration-testing/ts/Config.ts
echo export const skipInAppCampaignId = $SKIP_IN_APP_CAMPAIGN_ID >> ./integration-testing/ts/Config.ts
echo export const openDeepLinkCampaignId = $OPEN_DEEP_LINK_CAMPAIGN_ID >> ./integration-testing/ts/Config.ts
echo export const openSafariCampaignId = $OPEN_SAFARI_CAMPAIGN_ID >> ./integration-testing/ts/Config.ts
echo export const customActionCampaignId = $CUSTOM_ACTION_CAMPAIGN_ID >> ./integration-testing/ts/Config.ts

cd ./integration-testing/ios/
rm -rf build/

xcodebuild -workspace example.xcworkspace \
           -scheme example \
           -sdk iphonesimulator \
           -destination 'platform=iOS Simulator,name=iPhone 11' \
           -derivedDataPath ios/build \
           clean test | xcpretty