import LoginPage from "./Login";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  Alert,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

export default function SignUp({ navigation }) {

  const SignUpPress = () => {
    axios.post("http://10.0.2.2:8080/userdb/insert", {
        id: id,
        pw: pw,
        name: Name,
        Nname: Nname,
      })
      .then((response => {
        if (checkId && checkPw && checkNname === true && Name !== '') {
          console.log("회원가입 완료", response.data);
          alert("회원가입이 완료되었습니다!");
        navigation.navigate("LoginPage");
        } else {
          console.log('회원가입 실패');
        }
      }))
      // 회원가입 성공 시 처리
      .catch((error) => {
        console.log(error);
      });
  };

  const CheckId = async () => {
    try {
      const response = await axios.get("http://10.0.2.2:8080/userdb/userId", {
        params: {
          id: id
        }
      })
      const data = response.data
      if (data && data.length > 0) {
        if(data[0].id === id) {
          setConfirmIdError("이미 사용 중인 아이디입니다.");
          setCheckId(false);
        }
      } else if (id === "") {
        setConfirmIdError("아이디를 입력해 주세요.");
        setCheckId(false);
      } 
      else {
        setConfirmIdError('사용 가능한 아이디입니다.');
        setCheckId(true);
      }
    }
    catch (error) {
      console.log(error);
    }
  };

  const CheckNname = async () => {
    try {
      const response = await axios.get("http://10.0.2.2:8080/userdb/nickname", {
        params: {
          Nname: Nname
        }
      })
      const data = response.data
      if (data && data.length > 0) {
        if(data[0].Nname === Nname) {
          setConfirmNnameError("이미 사용 중인 닉네임입니다!");
          setCheckNname(false);
        }
      } else if (Nname === ""){
        setConfirmNnameError("닉네임을 입력해 주세요.");
        setCheckNname(false);
      } else {
        setConfirmNnameError("사용 가능한 닉네임입니다!");
        setCheckNname(true);
      }
    }
    catch (error) {
      console.log(error);
    }
  }

  const validatePassword = () => {
    if (!isPasswordValid()) {
      setPasswordError("숫자, 영문자, 특수문자를 포함하여 8자리 이상");
      setCheckPw(false);
    } else {
      setPasswordError("사용가능한 비밀번호입니다!");
      setCheckPw(true);
    }
  };

  const CancelPress = () => {
    Alert.alert("", "회원가입을 취소하겠습니까?", [
      { text: "아니오", style: "cancel" }, // "아니오" 버튼
      { text: "예", onPress: () => navigation.navigate("LoginPage") },
    ]);
  };
  const [idLabelColor, setIdLabelColor] = useState("#8f8c8b");
  const [passwordLabelColor, setPasswordLabelColor] = useState("#8f8c8b");
  const [confirmPasswordLabelColor, setConfirmPasswordLabelColor] =
    useState("#8f8c8b");
  const [nicknameLabelColor, setNicknameLabelColor] = useState("#8f8c8b");

  const [ id, setId ] = useState("");
  const [ pw, setPw ] = useState("");
  const [ confirmPassword, setConfirmPassword ] = useState("");
  const [ Nname, setNname ] = useState("");
  const [ Name, setName ] = useState("");


  const [confirmIdError, setConfirmIdError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [confirmNnameError, setConfirmNnameError] = useState("");

  const [checkId, setCheckId] = useState(false);
  const [checkPw, setCheckPw] = useState(false);
  const [checkNname, setCheckNname] = useState(false);

  const onFocusChange = (field) => {
    switch (field) {
      case "id":
        setIdLabelColor("#000000");
        break;
      case "pw":
        setPasswordLabelColor("#000000");
        break;
      case "confirmPassword":
        setConfirmPasswordLabelColor("#000000");
        break;
      case "Nname":
        setNicknameLabelColor("#000000");
        break;
      default:
        break;
    }
  };

  const onBlurChange = () => {
    setIdLabelColor("#8f8c8b");
    setPasswordLabelColor("#8f8c8b");
    setConfirmPasswordLabelColor("#8f8c8b");
    setNicknameLabelColor("#8f8c8b");
  };

  const isPasswordValid = () => {
    const passwordRegex =
      /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(pw);
  };

  const isFormValid = () => {
    const isNameValid = /^[a-zA-Z가-힣]+$/;
    return (
      isPasswordValid() && pw === confirmPassword && isNameValid.test(Nname)
    );
  };

  const validateConfirmPassword = () => {
    if (pw !== confirmPassword) {
      setConfirmPasswordError(
        "비밀번호가 일치하지 않습니다. 다시 입력해주세요."
      );
    } else {
      setConfirmPasswordError("비밀번호가 일치합니다!");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.Title}>Plant-I</Text>

      <View style={styles.InputForm}>
        <TextInput
          style = { styles.input }
          value = { Name }
          onChangeText = { setName } 
          placeholder = "이름"
          placeholderTextColor = 'black'
        />

        <TextInput
          style={styles.input}
          value={ id }
          onChangeText={ setId }
          onFocus={() => onFocusChange("id")}
          onBlur={onBlurChange}
          placeholder = "아이디"
          placeholderTextColor = 'black'
        />

        {confirmIdError !== "" &&(
        <Text style = {[ styles.errorText, confirmIdError === "사용 가능한 아이디입니다." && styles.successText]}>{ confirmIdError }</Text>
        )}

        <TouchableOpacity onPress={ CheckId }>
          <Text>아이디 중복 확인</Text>
        </TouchableOpacity>

        <TextInput
          style={styles.input}
          secureTextEntry={true}
          value={pw}
          onChangeText={(text) => setPw(text)}
          onFocus={() => onFocusChange("pw")}
          onBlur={() => {
              onBlurChange();
              validatePassword();
          }}
          placeholder = "비밀번호"
          placeholderTextColor = 'black'
        />

          {passwordError !== "" && (
          <Text 
            style={[ styles.errorText, passwordError === "사용가능한 비밀번호입니다!" && styles.successText]}
          >
            {passwordError}
          </Text>
          )}

        <TextInput
          style={styles.input}     
          secureTextEntry={true}
          value={confirmPassword}
          onChangeText={(text) => setConfirmPassword(text)}
          onFocus={() => onFocusChange("confirmPassword")}
          onBlur={() => {
              onBlurChange();
              validateConfirmPassword();
          }}
          placeholder = "비밀번호 확인"
          placeholderTextColor = 'black'
        />
        {confirmPasswordError !== "" && (
        <Text 
          style = {[ styles.errorText, confirmPasswordError === '비밀번호가 일치합니다!' && styles.successText ]}
        >
          {confirmPasswordError}
        </Text>
        )}

        <TextInput
          style={styles.input}
          value={Nname}
          onChangeText={(text) => setNname(text)}
          onFocus={() => onFocusChange("Nname")}
          onBlur={onBlurChange}
          placeholder = "닉네임"
          placeholderTextColor = 'black'
        />
      </View>

      {confirmNnameError !== "" && (
      <Text 
        style = {[ styles.errorText, confirmNnameError === '사용 가능한 닉네임입니다!' && styles.successText ]}
      >
        {confirmNnameError}
      </Text>
      )}

      <TouchableOpacity onPress={CheckNname}>
        <Text>닉네임 확인</Text>
      </TouchableOpacity>
      
      <View style = { styles.Btn }>
        <TouchableOpacity
          style={[styles.SignupBtn]}
          onPress={isFormValid() ? SignUpPress : () => {}}
        >
          <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 2 }}>
            회원가입
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.CancleBtn} onPress={CancelPress}>
          <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 2 }}>
            취소
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  Title: {
    fontSize: 40,
    fontWeight: "900",
    position: "relative",
    bottom: 15,
    marginTop: 45
  },
  input: {
    marginVertical: 15,
    padding: 10,
    fontSize: 17,
    width: 300,
    height: 45,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: 'rgba(205, 208, 203, 1)',
    fontWeight: '700'
  },
  Btn: {
    marginTop: 20
  },
  SignupBtn: {
    backgroundColor: '#CBDDB4',
    width: 200,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
    height: 40
  },
  CancleBtn: {
    backgroundColor: '#CDD0CB',
    width: 200,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
    height: 40
  },
  errorText: {
    color: "#ff2727",
    fontSize: 13,
    fontWeight: 'bold'
  },
  successText: {
    color: "green",
    fontSize: 13,
    fontWeight: 'bold'
  }
});