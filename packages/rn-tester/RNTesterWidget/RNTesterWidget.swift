
import WidgetKit
import SwiftUI
import Intents
import ReactSwiftUI

struct Provider: IntentTimelineProvider {
  let entryViewManager: RSUIEntryViewManager

  func placeholder(in context: Context) -> SimpleEntry {
    SimpleEntry(date: Date(), configuration: ConfigurationIntent())
  }

  func getSnapshot(for configuration: ConfigurationIntent, in context: Context, completion: @escaping (SimpleEntry) -> ()) {
    DispatchQueue.main.asyncAfter(deadline: .now() + 0.3) {
      let entry = SimpleEntry(date: Date(), configuration: configuration)
      completion(entry)
    }
  }

  func getTimeline(for configuration: ConfigurationIntent, in context: Context, completion: @escaping (Timeline<Entry>) -> ()) {
    DispatchQueue.main.asyncAfter(deadline: .now() + 0.3) {
      let entries = [SimpleEntry(date: Date(), configuration: configuration)]
      completion(
        Timeline(
          entries: entries,
          policy: .after(Calendar.current.date(byAdding: .minute, value: 5, to: Date())!)
        )
      )
    }
  }
}

struct SimpleEntry: TimelineEntry {
  let date: Date
  let configuration: ConfigurationIntent
}

struct RNTesterWidgetEntryView : View {
  var entry: Provider.Entry

  var entryViewManager: RSUIEntryViewManager

  var body: some View {
    entryViewManager.render()
  }
}

@main
struct RNTesterWidget: Widget {
  let kind: String = "RNTesterWidget"

  var entryViewManager: RSUIEntryViewManager = RSUIEntryViewManager()

  var body: some WidgetConfiguration {
    let provider = Provider(entryViewManager: entryViewManager)

    return IntentConfiguration(kind: kind, intent: ConfigurationIntent.self, provider: provider) { entry in
      RNTesterWidgetEntryView(entry: entry, entryViewManager: entryViewManager)
    }
    .configurationDisplayName("My Widget")
    .description("This is an example widget.")
    .supportedFamilies([.systemSmall, .systemMedium])
  }
}
