import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {
  Container,
  Header,
  Left,
  Body,
  Title,
  Button,
  Icon,
  Text,
  Content,
} from 'native-base';
import Form from '../components/Form';
import {FirebaseService, PathRecipe} from '../services/FirebaseService';
const NewRecipe = ({navigation}) => {
  const [state, setState] = useState({
    name: '',
    ingredients: [],
    steps: [],
    image: '',
  });
  const onSave = () => {
    if (state.image) {
      FirebaseService.pushFile(state.image, url => {
        state.image = url;
        FirebaseService.pushData(PathRecipe, state);
      });
    } else {
      FirebaseService.pushData(PathRecipe, state);
    }

    navigation.goBack();
  };
  return (
    <Container>
      <Header androidStatusBarColor="#573ea8" style={styles.header}>
        <Left>
          <Button transparent onPress={navigation.goBack}>
            <Icon name="arrow-back" />
          </Button>
        </Left>
        <Body>
          <Title>Nova Receita</Title>
        </Body>
      </Header>
      <Content style={styles.content}>
        <Form recipe={state} onChangeRecipe={recipe => setState(recipe)} />
        <Button onPress={onSave} full success style={styles.btnSave}>
          <Text>Salvar</Text>
        </Button>
      </Content>
    </Container>
  );
};

const styles = StyleSheet.create({
  content: {
    padding: 10,
  },
  btnSave: {
    marginTop: 20,
  },
});

export default NewRecipe;
