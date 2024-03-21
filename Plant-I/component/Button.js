import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

const SigninBtn = () => {
    return (
        <TouchableOpacity
            style = {{
                backgroundColor: '#CBDDB4',
                width: 200,
                padding: 5,
                borderRadius: 20,
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 8
            }}
            onPress={() => alert('로그인')}
        >
            <Text style = {{
                fontSize: 20,
                fontWeight: 'bold'
            }}>로그인</Text>
        </TouchableOpacity>
    );
};

export default SigninBtn;

export const SignupBtn = () => {
    return (
        <TouchableOpacity
            style = {{
                backgroundColor: '#CDD0CB',
                width: 200,
                padding: 5,
                borderRadius: 20,
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 8
            }}
            onPress={() => alert('회원가입')}
        >
            <Text style = {{
                fontSize: 20,
                fontWeight: 'bold'
            }}>회원가입</Text>
        </TouchableOpacity>
    );
};