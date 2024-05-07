import { StyleSheet, Text, View, SectionList, FlatList } from "react-native";
import React from "react";
import { StoreMenuCard } from "../../../components/cards";

type Props = {};

const RenderItem = ({ item }) => {
  return (
    <StoreMenuCard
      name={item.name}
      price={item.price}
      _id={item._id}
      vendor={item._id}
      image={item.image}
      description={item.description}
    />
  );
};

const StoreMenuSectionList = ({ data }: any) => {
  const scrollRef = React.useRef<SectionList>(null);

  const store_data = data?.map((category: any) => ({
    title: category.title,
    data: category.products,
  }));

  function scroll() {
    console.log(scrollRef.current?.state);
    scrollRef.current?.scrollToLocation({
      itemIndex: 0,
      sectionIndex: 0,
      viewPosition: 0,
    });
  }

  return (
    <SectionList
      ref={scrollRef}
      scrollEnabled={false}
      sections={store_data}
      keyExtractor={(item, index) => item._id}
      renderItem={({ item }) => <RenderItem item={item} />}
      renderSectionHeader={({ section: { title } }) => (
        <View className="py-2">
          <Text onPress={scroll} className="text-2xl font-medium text-dark">
            {title}
          </Text>
        </View>
      )}
    />
  );
};

export default StoreMenuSectionList;

const styles = StyleSheet.create({});
