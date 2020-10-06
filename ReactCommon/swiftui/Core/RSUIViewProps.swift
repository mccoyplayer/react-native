
import SwiftUI

@objc
public class RSUIViewProps: RSUIDynamicObject {

  public func get<T>(_ key: String, fallback: T) -> T? {
    return rawValue(key) as? T
  }

  public func string(_ key: String, _ fallback: String) -> String {
    return string(key) ?? fallback
  }

  public func cgFloat(_ key: String, _ fallback: CGFloat) -> CGFloat {
    return CGFloat(double(key, Double(fallback)))
  }

  public func cgFloat(_ key: String, _ fallback: Double = 0.0) -> CGFloat {
    return CGFloat(double(key, fallback))
  }

  public func array<T>(_ key: String, _ fallback: [T]) -> [T] {
    return rawValue(key) as? [T] ?? fallback
  }

  public func color(_ key: String, _ fallback: Color) -> Color {
    let colorInt = int(key, -1)

    guard colorInt > 0 else {
      return fallback
    }

    let ratio = 256.0
    let red = Double((colorInt >> 16) & 0xff) / ratio
    let green = Double((colorInt >> 8) & 0xff) / ratio
    let blue = Double((colorInt >> 0) & 0xff) / ratio
    let alpha = Double((colorInt >> 24) & 0xff) / ratio
    return Color(.sRGB, red: red, green: green, blue: blue, opacity: alpha)
  }

  public func alignment(_ key: String, _ fallback: Alignment) -> Alignment {
    switch string(key) {
    case "center":
      return .center
    case "left":
      return .leading
    case "right":
      return .trailing
    case "top":
      return .top
    case "bottom":
      return .bottom
    case "topLeft":
      return .topLeading
    case "topRight":
      return .topTrailing
    case "bottomLeft":
      return .bottomLeading
    case "bottomRight":
      return .bottomTrailing
    default:
      return .center
    }
  }

  public func lineCap(_ key: String) -> CGLineCap {
    switch string(key) {
    case "butt":
      return .butt
    case "square":
      return .square
    case "round":
      return .round
    default:
      return .square
    }
  }

  public func lineJoin(_ key: String) -> CGLineJoin {
    switch string(key) {
    case "bevel":
      return .bevel
    case "miter":
      return .miter
    case "round":
      return .round
    default:
      return .miter
    }
  }
}
