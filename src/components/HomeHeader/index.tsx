import { Container, Greetion, Message, Name, Picture } from "./styles";
import { TouchableOpacity } from "react-native";
import { Power } from "phosphor-react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import theme from "../../theme";
import { useApp, useUser } from "@realm/react";
export function HomeHeader() {
  const user = useUser();
  const app = useApp();

  const inserts = useSafeAreaInsets();
  const paddingTop = inserts.top + 32;

  function handleLogout() {
    app.currentUser?.logOut();
  }
  return (
    <Container style={{ paddingTop }}>
      <Picture
        source={{ uri: user?.profile.pictureurl }}
        placeholder="L184i9kCbIof00ayjZay~qj[ayj@"
      />
      <Greetion>
        <Message>Olá</Message>
        <Name>{user?.profile.name}</Name>
      </Greetion>

      <TouchableOpacity onPress={handleLogout} activeOpacity={0.7}>
        <Power size={32} color={theme.COLORS.GRAY_400} />
      </TouchableOpacity>
    </Container>
  );
}
