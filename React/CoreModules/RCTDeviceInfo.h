/*
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

#import <React/RCTBridge.h>

#if !TARGET_OS_OSX // [TODO(macOS ISS#2323203) - RCTExportedDimensions is needed in RCTRootContentView
NSDictionary *RCTExportedDimensions(RCTBridge *bridge);
#else
#ifdef __cplusplus
extern "C"
#endif
NSDictionary *RCTExportedDimensions(RCTPlatformView *rootView);
#endif // ]TODO(macOS ISS#2323203)

@interface RCTDeviceInfo : NSObject <RCTBridgeModule>

@end
