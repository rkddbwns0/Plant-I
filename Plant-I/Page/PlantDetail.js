import { useEffect, useState } from "react";
import { AntDesign } from "@expo/vector-icons";

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import axios from "axios";

const PlantDetail = ({ route }) => {
  const plantName = route.params; // 클릭한 식물의 이름을 가져옵니다.
  const [plantDetail, setPlantDetail] = useState(null); // 식물의 정보를 저장할 상태 변수
  const [isLiked, setIsLiked] = useState(false); // 좋아요 상태를 저장할 상태 변수

  useEffect(() => {
    // 클릭한 식물의 이름을 기반으로 서버에서 해당 식물의 정보를 가져오는 함수
    const fetchPlantDetail = async () => {
      try {
        const response = await axios.get(
          `http://10.0.2.2:8080/plants?name=${plantName}`
        ); // 서버로 요청을 보냅니다.
        setPlantDetail(response.data); // 받은 데이터를 상태 변수에 저장
      } catch (error) {
        console.log(error);
      }
    };

    fetchPlantDetail(); // 함수 호출
  }, [plantName]); // plantName이 변경될 때마다 실행

  const handleLike = () => {
    // 좋아요 상태를 토글합니다.
    setIsLiked(!isLiked);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.imageContainer}>
        {/* <Image
      source={plantDetail ? { uri: plantDetail.image_data_path } : null}
      style={styles.image}
        /> */}
      </View>
      <View style={styles.row}>
        <View style={styles.NameinfoContainer}>
          <Text style={{ fontWeight: "bold", fontSize: 23 }}>
            {plantDetail ? plantDetail.Pname : "Loading..."}
          </Text>
        </View>
        <TouchableOpacity onPress={handleLike}>
          <View style={styles.heart}>
            <AntDesign
              name={isLiked ? "heart" : "hearto"} // isLiked 상태에 따라 아이콘 변경
              size={30}
              color={isLiked ? "red" : "black"} // isLiked 상태에 따라 색상 변경
            />
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.infoContainer}>
        <Text style={[styles.text, styles.boldText]}>물주기: </Text>
        <Text style={styles.text}>
          {plantDetail ? plantDetail.Water_Period : "Loading..."}
        </Text>
      </View>

      <View style={styles.infoContainer}>
        <Text style={[styles.text, styles.boldText]}>적정 온도: </Text>
        <Text style={styles.text}>
          {plantDetail ? plantDetail.temperature : "Loading..."}
        </Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={[styles.text, styles.boldText]}>적정 광도: </Text>
        <Text style={styles.text}>
          {plantDetail ? plantDetail.Sunshine : "Loading..."}
        </Text>
      </View>
      <View style={styles.dot}>
        <Text style={styles.characterText}>
          {plantDetail ? plantDetail.PlantCharacter : "Loading..."}
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  imageContainer: {
    borderWidth: 2, // 테두리 두께
    borderColor: "black", // 테두리 색상
    marginBottom: 20,
    marginTop: 30,
    padding: 30, // 이미지 주위 공백
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  NameinfoContainer: {
    flexDirection: "row",
    backgroundColor: "#a4c47a",
    justifyContent: "center", // 수평 가운데 정렬
    alignItems: "center",
    marginBottom: 20,
    borderRadius: 6,
    padding: 8,
  },
  heart: {
    position: "absolute",
    right: -60,
    top: -30,
    padding: 8,
  },
  infoContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  boldText: {
    fontWeight: "bold",
  },
  text: {
    fontSize: 20,
    marginLeft: 5, // 정보 사이에 공백 추가
  },
  image: {
    width: 150, // 이미지의 너비
    height: 150, // 이미지의 높이
  },
  dot: {
    borderTopWidth: 2.5,
    borderTopColor: "black",
    borderStyle: "dotted",
  },
  characterText: {
    fontSize: 17,
    fontWeight: "900",
    padding: 30,
  },
});

export default PlantDetail;