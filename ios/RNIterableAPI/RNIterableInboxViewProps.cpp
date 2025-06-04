#include "RNIterableInboxViewProps.h"
#include <react/renderer/core/propsConversions.h>

namespace facebook::react {

RNIterableInboxViewProps::RNIterableInboxViewProps(
    const PropsParserContext& context,
    const RNIterableInboxViewProps &sourceProps,
    const RawProps &rawProps)
    : ViewProps(context, sourceProps, rawProps),
      noMessagesTitle(convertRawProp(context, rawProps, "noMessagesTitle", sourceProps.noMessagesTitle, {})),
      noMessagesBody(convertRawProp(context, rawProps, "noMessagesBody", sourceProps.noMessagesBody, {})),
      showDate(convertRawProp(context, rawProps, "showDate", sourceProps.showDate, true)),
      showUnreadBadge(convertRawProp(context, rawProps, "showUnreadBadge", sourceProps.showUnreadBadge, true)),
      showInboxTitle(convertRawProp(context, rawProps, "showInboxTitle", sourceProps.showInboxTitle, true)),
      inboxTitle(convertRawProp(context, rawProps, "inboxTitle", sourceProps.inboxTitle, {})),
      showInboxOnAppear(convertRawProp(context, rawProps, "showInboxOnAppear", sourceProps.showInboxOnAppear, true)) {}

} // namespace facebook::react
