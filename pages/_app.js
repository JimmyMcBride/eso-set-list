import { AppWrapper } from "sriracha-ui";
import "sriracha-ui/css/main.css";
import "./styles.css";

function MyApp({ Component, pageProps }) {
  return (
    <AppWrapper>
      <Component {...pageProps} />
    </AppWrapper>
  );
}

export default MyApp;
