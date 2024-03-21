import React, { useState, useEffect } from "react";
import { Feather } from "@expo/vector-icons";
import {
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  Text,
  StyleSheet,
  Image,
  KeyboardAvoidingView
} from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showRecommendations, setShowRecommendations] = useState(true);
  const initialTags = ["#공기정화식물", "#희귀식물", "#플랜테리어"];
  const [tags, setTags] = useState(initialTags);
  const navigation = useNavigation();
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    try {
      // 검색 쿼리가 비어 있는 경우, 검색 결과를 초기화하고 반환합니다.
      if (!searchQuery.trim()) {
        setSearchResults([]);
        return;
      }

      // 검색 쿼리가 비어 있지 않은 경우, 실제 검색을 수행합니다.
      const response = await axios.get(
        'http://10.0.2.2:8080/search?query=${searchQuery}'
      );
      const data = response.data;
      setSearchResults(data);
      setTags(initialTags);
      setShowRecommendations(false);
    } catch (error) {
      console.error("Error searching:", error);
      setError("검색 중 오류가 발생했습니다.");
    }
  };
  const handleSearchInputChange = async (text) => {
    setSearchQuery(text);

    if (!text.trim()) {
      setSearchResults([]);
      setShowRecommendations(true);
      return;
    }

    try {
      // 데이터베이스에서 모든 식물 데이터를 가져옵니다.
      const allPlantData = await fetchPlantDataFromDatabase();

      // 입력된 검색어와 일치하는 식물들을 찾습니다.
      const matchedPlants = allPlantData.filter((plant) =>
        plant.Pname.toLowerCase().startsWith(text.toLowerCase())
      );

      // 찾은 식물들을 화면에 표시합니다.
      setSearchResults(matchedPlants);
      setShowRecommendations(false);
    } catch (error) {
      console.error("Error handling search input change:", error);
      setSearchResults([]);
    }
  };

  const fetchPlantDataFromDatabase = async () => {
    try {
      // 데이터베이스에서 식물 데이터를 가져오는 쿼리를 실행합니다.
      const response = await axios.get('http://10.0.2.2:8080/plantData');
      const data = response.data;
      return data;
    } catch (error) {
      console.error("Error fetching plant data:", error);
      return [];
    }
  };

  const Recommendations = () => {
    const recommendedPlants = ["몬스테라", "여인초", "고무나무", "율마"];
    const handleRecommendationPress = (recommendedPlant) => {
      setSearchQuery(recommendedPlant);
      handleSearch(); // 해당 검색어로 검색을 수행합니다.
    };
    return (
      <View>
        {showRecommendations && (
          <>
            <Text style={styles.recommendationsTitle}>추천 검색어</Text>
            <FlatList
              data={recommendedPlants}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.recommendationItem}
                  onPress={() => handleRecommendationPress(item)}
                >
                  <Text style={styles.recommendationItemText}>{item}</Text>
                </TouchableOpacity>
              )}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            />
          </>
        )}
        {showRecommendations && (
          <>
            <FlatList
              data={initialTags}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity style={styles.hashtagItem}>
                  <Text style={styles.hashtagItemText}>{item}</Text>
                </TouchableOpacity>
              )}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            />
          </>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView>
        <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder="식물을 검색해보세요"
              value={searchQuery}
              onChangeText={handleSearchInputChange}
              keyboardShouldPersistTaps="handled"
            />
            <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
              <Feather name="search" size={24} color="black" />
            </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
      <View style={styles.line}></View>

      {searchResults.length === 0 ? (
        <View style={styles.noResultsContainer}>
          <Text style={styles.noResultsText}>
            {searchQuery.trim() === ""
              ? "검색어를 입력해주세요."
              : "검색 결과가 없습니다. 다른 검색어를 시도해보세요."}
          </Text>
          {error && <Text style={styles.errorText}>{error}</Text>}
        </View>
      ) : (
        <FlatList
          data={searchResults}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[styles.resultItem, styles.imageContainer]}
              onPress={() => navigation.navigate("PlantDetail", item.Pname)}
            >
              {/* <Image
                source={
                  item.Pname === "레몬밤"
                    ? require("../assets/lemonbam.jpeg")
                    : item.Pname === "레몬버베나"
                    ? require("../assets/lemonbubena.jpeg")
                    : item.Pname === "몬스테라 아단소니"
                    ? require("../assets/mon.jpg")
                    : item.Pname === "몬스테라 델리오사"
                    ? require("../assets/del.jpg")
                    : require("../assets/noimage.jpeg")
                }
                style={styles.image}
              /> */}

              <Text style={styles.ItemName}>{item.Pname}</Text>
            </TouchableOpacity>
          )}
          horizontal={false}
          numColumns={2}
          style={styles.flatList}
        />
      )}
      <Recommendations />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  searchContainer: {
    flexShrink: 0,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    borderWidth: 1.5,
    borderColor: "#000000",
    borderRadius: 1,
    overflow: "hidden",
    backgroundColor: "#F0F0F0",
  },
  searchInput: {
    flex: 1,
    padding: 10,
  },
  searchButton: {
    padding: 10,
    backgroundColor: "#F0F0F0",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  line: {
    borderBottomWidth: 1,
    borderBottomColor: "#000000",
    marginBottom: 5,
  },
  resultItem: {
    flex: 0.5,
    width: 130,
    height: 175,
    marginTop: 10,
    marginRight: 10,
  },

  itemOdd: {
    flex: 0.5,
  },
  noResultsContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    flex: 1,
  },
  noResultsText: {
    fontSize: 16,
    color: "black",
    fontWeight: "bold",
  },
  recommendationsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  recommendationItem: {
    marginRight: 10,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    padding: 5,
    backgroundColor: "#ECEDEB",
    width: 85,
    height: 30,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    overflow: "hidden", // 추가된 속성
  },
  recommendationItemText: {
    fontSize: 15,
    color: "#000000",
    fontWeight: "bold",
    textAlign: "center", // 추가된 속성
  },
  hashtagItem: {
    marginRight: 10,
    marginTop: 10,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    padding: 5, // padding 값을 조절하여 내용이 잘리지 않도록 함
    backgroundColor: "#CBDDB4",
    width: 110,
    height: 30,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    alignSelf: "center",
  },
  hashtagItemText: {
    fontSize: 15,
    color: "#000000",
    fontWeight: "bold",
  },
  errorText: {
    color: "red",
    fontSize: 16,
    textAlign: "center",
    marginTop: 10,
  },
  image: {
    width: 150, // 이미지의 너비
    height: 140, // 이미지의 높이
  },
  ItemName: {
    fontWeight: "bold",
  },
  imageContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Search;

