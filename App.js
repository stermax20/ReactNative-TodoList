import { SafeAreaView, ScrollView, StatusBar, StyleSheet, TextInput, Text, View, TouchableOpacity } from 'react-native';
import * as React from 'react';

export default function App() {
    const [title, setTitle] = React.useState('');
    const [content, setContent] = React.useState('');
    const [data, setData] = React.useState([]);

    async function readData() {
        const response = await fetch('http://172.28.34.22:5000/sticky_notes/to_do_list')
            .then((response) => response.json())
            .then((json) => {
                setData(json);
            });
    }

    async function createData() {
        const response = await fetch('http://172.28.34.22:5000/sticky_notes/to_do_list', {
            method: 'POST',
            body: JSON.stringify({
                title: title,
                content: content,
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }

    async function deleteData(index) {
        const response = await fetch(`http://172.28.34.22:5000/sticky_notes/to_do_list/${index}`, {
            method: 'DELETE',
        });
        await readData();
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <Text style={styles.heading}>간단 메모장</Text>
                <TextInput
                    placeholder="제목을 입력해주세요."
                    style={styles.input}
                    onChangeText={(text) => {
                        setTitle(text);
                    }}
                    value={title}
                />
                <TextInput
                    placeholder="내용을 입력해주세요."
                    style={styles.input}
                    onChangeText={(text) => {
                        setContent(text);
                    }}
                    value={content}
                />
                <TouchableOpacity
                    onPress={async () => {
                        await createData();
                    }}
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>메모 저장</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={async () => {
                        await readData();
                    }}
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>메모 불러오기</Text>
                </TouchableOpacity>
                <StatusBar style="auto" />
                {data.map((item, index) => {
                    return (
                        <View style={styles.memoContainer} key={index}>
                            <Text style={styles.memoTitle}>{item.title}</Text>
                            <Text style={styles.memoContent}>{item.content}</Text>
                            <Text style={styles.memoTime}>{item.time}</Text>
                            <TouchableOpacity
                                onPress={async () => {
                                    await deleteData(index);
                                }}
                                style={styles.deleteButton}
                            >
                                <Text style={styles.deleteButtonText}>메모 삭제</Text>
                            </TouchableOpacity>
                        </View>
                    );
                })}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(122, 173, 76, 0.4)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    scrollViewContent: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    heading: {
        fontSize: 30,
        fontWeight: 'bold',
        color: 'blue',
        marginTop: 20,
        marginBottom: 10,
    },
    input: {
        marginTop: 20,
        width: 300,
        height: 60,
        textAlign: 'center',
        backgroundColor: '#BDC4CC',
    },
    button: {
        marginTop: 20,
        backgroundColor: '#000000',
        width: 200,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 20,
    },
    memoContainer: {
        width: '95%',
        borderColor: '#000000',
        borderWidth: 0.4,
        marginTop: 20,
        padding: 10,
    },
    memoTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    memoContent: {
        fontSize: 16,
        marginBottom: 5,
    },
    memoTime: {
        fontSize: 14,
        color: '#888888',
        marginBottom: 10,
    },
    deleteButton: {
        backgroundColor: '#FF0000',
        width: 100,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    deleteButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
    },
});
