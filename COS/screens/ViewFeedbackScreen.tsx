import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

const feedbackData = [
    { id: '1', feedback: 'Great cake! Very delicious.' },
    { id: '2', feedback: 'Thanks for the delicious cake.' },
];

const ViewFeedbackScreen = () => {
    const renderFeedbackItem = ({ item }: { item: { id: string; feedback: string } }) => (
        <View style={styles.feedbackItem}>
            <Text style={styles.feedbackText}>{item.feedback}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Feedback</Text>
            <FlatList
                data={feedbackData}
                keyExtractor={(item) => item.id}
                renderItem={renderFeedbackItem}
                contentContainerStyle={styles.listContainer}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: 'lightblue',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        textAlign: 'center',
        color: 'black',
    },
    listContainer: {
        paddingBottom: 16,
    },
    feedbackItem: {
        backgroundColor: '#fff',
        padding: 16,
        marginBottom: 8,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    feedbackText: {
        fontSize: 16,
        color: '#333',
    },
});

export default ViewFeedbackScreen;