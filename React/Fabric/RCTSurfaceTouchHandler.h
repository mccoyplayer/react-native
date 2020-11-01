/*
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

#import <React/RCTUIKit.h>

NS_ASSUME_NONNULL_BEGIN

@interface RCTSurfaceTouchHandler : UIGestureRecognizer

- (void)attachToView:(RCTUIView *)view;
- (void)detachFromView:(RCTUIView *)view;

/*
 * Offset of the attached view relative to the root component in points.
 */
@property (nonatomic, assign) CGPoint viewOriginOffset;

@end

NS_ASSUME_NONNULL_END
