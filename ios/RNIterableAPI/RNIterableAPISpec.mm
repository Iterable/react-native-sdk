#import "RNIterableAPISpec.h"
#import <React/RCTFabricComponentsPlugins.h>
#import <React/RCTViewComponentView.h>
#import <React/RCTComponentViewFactory.h>

#import <React/RCTEventEmitter.h>
#import <React/RCTBridgeModule.h>

@implementation RNIterableAPISpec

RCT_EXPORT_MODULE(RNIterableAPI)

- (std::shared_ptr<facebook::react::ComponentDescriptor>)componentDescriptorForName:(NSString *)name
{
    return nullptr;
}

- (UIView *)createViewWithName:(NSString *)name
{
    return nil;
}

@end
