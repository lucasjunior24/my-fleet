import { GoogleSignin } from "@react-native-google-signin/google-signin";
import Realm from "realm";
import { Container, Slogan, Title } from "./styles";
import backgroundImg from "../../assets/background.png";
import { Button } from "../../components/Button";
import { WEB_CLIENT_ID, ANDROID_CLIENT_ID } from "@env";
import { useEffect, useState } from "react";
import { Alert } from "react-native";
import { useApp } from "@realm/react";
GoogleSignin.configure({
  scopes: ["email", "profile"],
  webClientId: WEB_CLIENT_ID,
  // androidClientId: ANDROID_CLIENT_ID,
});
export function SignIn() {
  const app = useApp();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUsers] = useState("user");

  async function handleGoogleSingIn() {
    try {
      setIsAuthenticated(true);
      await GoogleSignin.hasPlayServices();
      const { idToken } = await GoogleSignin.signIn();

      if (idToken) {
        const credentials = Realm.Credentials.jwt(idToken);
        await app.logIn(credentials);
      } else {
        setIsAuthenticated(false);
        Alert.alert(
          "Entrar",
          "Não foi possível conectar-se a sua conta google"
        );
      }

      setIsAuthenticated(false);
    } catch (error) {
      console.error(error);
      setIsAuthenticated(false);
      Alert.alert("Entrar", "Não foi possível conectar-se a sua conta google");
    }
  }
  return (
    <Container source={backgroundImg}>
      <Title>{user}</Title>
      <Slogan>Gestão de uso de veículos</Slogan>
      <Button
        title="Entrar com Google"
        isLoading={isAuthenticated}
        onPress={handleGoogleSingIn}
      />
    </Container>
  );
}
