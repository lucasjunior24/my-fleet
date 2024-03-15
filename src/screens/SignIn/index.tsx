import {
  GoogleSignin,
  statusCodes,
} from "@react-native-google-signin/google-signin";

import { Container, Slogan, Title } from "./styles";
import backgroundImg from "../../assets/background.png";
import { Button } from "../../components/Button";
import { WEB_CLIENT_ID, ANDROID_CLIENT_ID } from "@env";
import { useEffect, useState } from "react";
import { Alert } from "react-native";
// GoogleSignin.configure({
//   scopes: ["email", "profile"],
//   webClientId: WEB_CLIENT_ID,
//   // androidClientId: ANDROID_CLIENT_ID,
// });
export function SignIn() {
  GoogleSignin.configure({
    scopes: ["https://www.googleapis.com/auth/drive.readonly"],
    webClientId: WEB_CLIENT_ID,
  });
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUsers] = useState("user");

  async function handleGoogleSingIn() {
    try {
      console.log("entrou");
      setIsAuthenticated(true);
      await GoogleSignin.hasPlayServices();
      const response = await GoogleSignin.signIn();
      console.log(response);
      setIsAuthenticated(false);
    } catch (error) {
      console.error(error);
      setIsAuthenticated(false);
      Alert.alert("Entrar", "Não foi possível conectar-se a sua conta google");
    }

    // try {
    //   await GoogleSignin.hasPlayServices();
    //   const userInfo = await GoogleSignin.signIn();
    //   console.log(userInfo);
    // } catch (error: any) {
    //   if (error.code === statusCodes.SIGN_IN_CANCELLED) {
    //     console.log("SIGN_IN_CANCELLED");
    //   } else if (error.code === statusCodes.IN_PROGRESS) {
    //     console.log("IN_PROGRESS");
    //   } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
    //     console.log("PLAY_SERVICES_NOT_AVAILABLE");
    //   } else {
    //     console.log("else");
    //   }
    //   console.log(error);
    // }
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
