/*
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

#import "RCTSegmentedControl.h"

#import "RCTConvert.h"
#import "RCTEventDispatcher.h"
#import "UIView+React.h"
#import "RCTUIKit.h" // TODO(macOS ISS#2323203)

@implementation RCTSegmentedControl

- (instancetype)initWithFrame:(CGRect)frame
{
  if ((self = [super initWithFrame:frame])) {
    _selectedIndex = self.selectedSegmentIndex;
#if !TARGET_OS_OSX // TODO(macOS ISS#2323203)
    [self addTarget:self action:@selector(didChange) forControlEvents:UIControlEventValueChanged];
#else // [TODO(macOS ISS#2323203)
    self.segmentStyle = NSSegmentStyleRounded;
    self.target = self;
    self.action = @selector(didChange);
#endif // ]TODO(macOS ISS#2323203)
  }
  return self;
}

- (void)setValues:(NSArray<NSString *> *)values
{
  _values = [values copy];
#if !TARGET_OS_OSX // TODO(macOS ISS#2323203)
  [self removeAllSegments];
  for (NSString *value in values) {
    [self insertSegmentWithTitle:value atIndex:self.numberOfSegments animated:NO];
  }
#else // [TODO(macOS ISS#2323203)
  self.segmentCount = values.count;
  for (NSUInteger i = 0; i < values.count; i++) {
    [self setLabel:values[i] forSegment:i];
  }
#endif // ]TODO(macOS ISS#2323203)
  self.selectedSegmentIndex = _selectedIndex; // TODO(macOS ISS#2323203)
}

- (void)setSelectedIndex:(NSInteger)selectedIndex
{
  _selectedIndex = selectedIndex;
  self.selectedSegmentIndex = selectedIndex; // TODO(macOS ISS#2323203)
}

- (void)setBackgroundColor:(RCTUIColor *)backgroundColor // TODO(macOS ISS#2323203)
{
#if defined(__IPHONE_OS_VERSION_MAX_ALLOWED) && defined(__IPHONE_13_0) && \
    __IPHONE_OS_VERSION_MAX_ALLOWED >= __IPHONE_13_0
  if (@available(iOS 13.0, *)) {
    [super setBackgroundColor:backgroundColor];
  }
#endif
}

- (void)setTextColor:(RCTUIColor *)textColor // TODO(macOS ISS#2323203)
{
#if defined(__IPHONE_OS_VERSION_MAX_ALLOWED) && defined(__IPHONE_13_0) && \
    __IPHONE_OS_VERSION_MAX_ALLOWED >= __IPHONE_13_0
  if (@available(iOS 13.0, *)) {
    [self setTitleTextAttributes:@{NSForegroundColorAttributeName : textColor} forState:UIControlStateNormal];
  }
#endif
}

#if !TARGET_OS_OSX // TODO(macOS ISS#2323203) - no concept of tintColor on macOS
- (void)setTintColor:(UIColor *)tintColor // TODO(macOS ISS#2323203)
{
  [super setTintColor:tintColor];
#if defined(__IPHONE_OS_VERSION_MAX_ALLOWED) && defined(__IPHONE_13_0) && \
    __IPHONE_OS_VERSION_MAX_ALLOWED >= __IPHONE_13_0
  if (@available(iOS 13.0, *)) {
    [self setSelectedSegmentTintColor:tintColor];
    [self setTitleTextAttributes:@{NSForegroundColorAttributeName : [UIColor whiteColor]}
                        forState:UIControlStateSelected];
    [self setTitleTextAttributes:@{NSForegroundColorAttributeName : tintColor} forState:UIControlStateNormal];
  }
#endif
}
#endif // TODO(macOS ISS#2323203)

- (void)didChange
{
  _selectedIndex = self.selectedSegmentIndex;
  if (_onChange) {
    _onChange(@{@"value" : [self titleForSegmentAtIndex:_selectedIndex], @"selectedSegmentIndex" : @(_selectedIndex)});
  }
}

#if TARGET_OS_OSX // [TODO(macOS ISS#2323203)

- (BOOL)isFlipped
{
  return YES;
}

- (void)setMomentary:(BOOL)momentary
{
  self.trackingMode = momentary ? NSSegmentSwitchTrackingMomentary : NSSegmentSwitchTrackingSelectOne;
}

- (BOOL)isMomentary
{
  return self.trackingMode == NSSegmentSwitchTrackingMomentary;
}

- (void)setSelectedSegmentIndex:(NSInteger)selectedSegmentIndex
{
  self.selectedSegment = selectedSegmentIndex;
}

- (NSInteger)selectedSegmentIndex
{
  return self.selectedSegment;
}

- (NSString *)titleForSegmentAtIndex:(NSUInteger)segment
{
  return [self labelForSegment:segment];
}

- (void)setNumberOfSegments:(NSInteger)numberOfSegments
{
  self.segmentCount = numberOfSegments;
}

- (NSInteger)numberOfSegments
{
  return self.segmentCount;
}

#endif // ]TODO(macOS ISS#2323203)

@end
