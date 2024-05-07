import { useRef, useState } from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";

const quickFiltersArray = [
  {
    title: "Most Popular",
  },
  {
    title: "Meal Combos",
  },
  {
    title: "Beverages",
  },
  {
    title: "Sweets and Treats",
  },
];

export function QuickFilters({ filters }: { filters: { title: string }[] }) {
  const scrollRef = useRef<FlatList>(null);
  const [scrollIndex, setScrollIndex] = useState(0);

  const ScrollTo = (index: number) => {
    scrollRef.current?.scrollToIndex({
      index: index,
      viewOffset: 0.5,
      animated: true,
    });
    setScrollIndex(index);
  };

  const QuickFilterItem = ({
    item,
    index,
  }: {
    item: { title: string };
    index: number;
  }) => {
    return (
      <TouchableOpacity
        onPress={() => ScrollTo(index)}
        className={`pr-6 border-b-4 pb-4 ${
          index == scrollIndex ? "border-primary" : ""
        }`}
      >
        <Text className="font-semibold  text-[16px] ml-1">{item.title}</Text>
        {/* <View className="h-1 mt-2 bg-black/50"></View> */}
      </TouchableOpacity>
    );
  };

  return (
    <View className="py-2">
      <FlatList
        ref={scrollRef}
        initialScrollIndex={0}
        horizontal
        showsHorizontalScrollIndicator={false}
        data={filters}
        renderItem={({ item, index: Findex }) => (
          <QuickFilterItem index={Findex} item={item} />
        )}
      />
    </View>
  );
}
