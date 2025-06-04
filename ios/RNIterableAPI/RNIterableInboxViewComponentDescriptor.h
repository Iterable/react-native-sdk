#pragma once

#include <react/renderer/components/view/ViewComponentDescriptor.h>
#include "RNIterableInboxViewProps.h"

namespace facebook::react {

class RNIterableInboxViewComponentDescriptor final
    : public ViewComponentDescriptor {
 public:
  RNIterableInboxViewComponentDescriptor(
      ComponentDescriptorParameters const &parameters)
      : ViewComponentDescriptor(parameters) {}

  void adopt(ShadowNode::Unshared const &shadowNode) const override {
    concreteShadowNodeFromShadowNode(shadowNode);
    ViewComponentDescriptor::adopt(shadowNode);
  }

 protected:
  void appendChild(
      ShadowNode::Shared const &parentShadowNode,
      ShadowNode::Shared const &childShadowNode) const override {
    ViewComponentDescriptor::appendChild(parentShadowNode, childShadowNode);
  }

 private:
  friend class RNIterableInboxViewShadowNode;
};

} // namespace facebook::react
