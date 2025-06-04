#pragma once

#include <react/renderer/components/view/ViewProps.h>
#include <react/renderer/core/PropsParserContext.h>
#include <react/renderer/graphics/Color.h>
#include <string>

namespace facebook::react {

struct RNIterableInboxViewProps : public ViewProps {
    RNIterableInboxViewProps() = default;
    RNIterableInboxViewProps(const PropsParserContext& context, const RNIterableInboxViewProps &sourceProps, const RawProps &rawProps);

    std::string noMessagesTitle{};
    std::string noMessagesBody{};
    bool showDate{true};
    bool showUnreadBadge{true};
    bool showInboxTitle{true};
    std::string inboxTitle{};
    bool showInboxOnAppear{true};
};

} // namespace facebook::react
